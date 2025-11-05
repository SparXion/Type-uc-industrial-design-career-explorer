from typing import Optional
#!/usr/bin/env python3
import argparse, json, os, sys, datetime

EXCLUDE_DIR_NAMES = {"node_modules", "venv", "build", "dist", ".git", "__pycache__", ".next", ".turbo"}

APP_DIRS = [
  "UC App V1",
  "UC Conversational App V1",
  "conversational-ucid-app",
  "id-career-sorter",
  "id-career-sorter-v2",
]

def is_excluded_path(path: str) -> bool:
  parts = set(path.split(os.sep))
  return any(name in parts for name in EXCLUDE_DIR_NAMES)

def get_dir_times(root: str):
  min_birth = None
  max_mtime = None
  for dirpath, dirnames, filenames in os.walk(root):
    if is_excluded_path(dirpath):
      dirnames[:] = [d for d in dirnames if d not in EXCLUDE_DIR_NAMES]
      continue
    for fname in filenames:
      fpath = os.path.join(dirpath, fname)
      try:
        st = os.stat(fpath)
      except Exception:
        continue
      birth = getattr(st, "st_birthtime", None) or st.st_mtime
      if min_birth is None or birth < min_birth:
        min_birth = birth
      if max_mtime is None or st.st_mtime > max_mtime:
        max_mtime = st.st_mtime
  return min_birth, max_mtime

def iso(ts):
  if not ts:
    return None
  return datetime.datetime.fromtimestamp(ts).isoformat(timespec="seconds")

def proposed_name(app_name: str, created_iso: Optional[str], suffix_hint: Optional[str] = None) -> str:
  base = app_name.lower().replace(" ", "-")
  if not created_iso:
    return f"unknown-{base}"
  yyyy_mm = created_iso[:7]
  return f"{yyyy_mm}-{base}-{suffix_hint}" if suffix_hint else f"{yyyy_mm}-{base}"

def infer_suffix(app: str) -> Optional[str]:
  lowered = app.lower()
  if "id-career-sorter-v2" in lowered:
    return "v2"
  if "v3" in lowered:
    return "v3"
  if "v2" in lowered:
    return "v2"
  if "v1" in lowered:
    return "v1"
  if "conversational" in lowered:
    return "conversational"
  return None

def main():
  p = argparse.ArgumentParser()
  p.add_argument("--root", required=True)
  p.add_argument("--print", dest="do_print", action="store_true")
  p.add_argument("--write", dest="do_write", action="store_true")
  p.add_argument("--set-current", dest="set_current", action="store_true")
  args = p.parse_args()

  root = args.root
  projects_root = os.path.join(root, "Projects", "UCID-App")
  drafts_dir = os.path.join(root, "Drafts")
  os.makedirs(drafts_dir, exist_ok=True)

  results = []
  for app in APP_DIRS:
    src = os.path.join(root, app)
    if not os.path.exists(src):
      continue
    created_ts, modified_ts = get_dir_times(src)
    created_iso = iso(created_ts)
    modified_iso = iso(modified_ts)
    suffix = infer_suffix(app)
    proposed = proposed_name(app, created_iso, suffix)
    results.append({
      "name": app,
      "source_path": app,
      "created_at": created_iso,
      "last_modified_at": modified_iso,
      "proposed_folder": proposed,
      "status": "legacy"
    })

  latest = None
  for r in results:
    if r["created_at"] is None:
      continue
    if latest is None or r["created_at"] > latest["created_at"]:
      latest = r
  if latest:
    for r in results:
      r["status"] = "active" if r is latest else "legacy"

  registry = {
    "generated_at": datetime.datetime.now().isoformat(timespec="seconds"),
    "root": root,
    "projects_root": projects_root,
    "apps": results
  }

  changelog_lines = ["# UCID App Changelog (Draft)", ""]
  for r in sorted(results, key=lambda x: (x["created_at"] or "")):
    created = r["created_at"] or "unknown"
    status = r["status"]
    changelog_lines.append(f"- {created} — {r["name"]} → {r["proposed_folder"]} [{status}]")

  print("=== Proposed app names (by created date) ===")
  for r in sorted(results, key=lambda x: (x["created_at"] or "")):
    print(f"{r["name"]}  ->  {r["proposed_folder"]}  (created: {r[created_at]}, modified: {r[last_modified_at]}, status: {r[status]})")

  if args.set_current and latest:
    print(f"\nWould set symlink: {projects_root}/current -> {os.path.join(projects_root, latest[proposed_folder])}")

  print("\n=== STATUS.md (planned content) ===")
  for r in results:
    banner = "ACTIVE" if r["status"] == "active" else "DEPRECATED"
    current_note = ""
    if r["status"] != "active" and latest:
      current_note = f"\n\nSee current app at: Projects/UCID-App/{latest[proposed_folder]}\n"
    print(f"[{r["proposed_folder"]}/STATUS.md]\n{banner}{current_note}")

  if args.do_print:
    print("\n=== registry.json (draft) ===")
    print(json.dumps(registry, indent=2))
    print("\n=== CHANGELOG.md (draft) ===")
    print("\n".join(changelog_lines))

  if args.do_write:
    with open(os.path.join(drafts_dir, "registry.json"), "w") as f:
      json.dump(registry, f, indent=2)
    with open(os.path.join(drafts_dir, "CHANGELOG.md"), "w") as f:
      f.write("\n".join(changelog_lines))
    print(f"\nWrote drafts to: {drafts_dir}/registry.json and {drafts_dir}/CHANGELOG.md")

if __name__ == "__main__":
  main()
