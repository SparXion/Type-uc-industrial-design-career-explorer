#!/usr/bin/env python3
import os
import sys
import datetime
from pathlib import Path

ROOT = Path("/Users/johnviolette/Library/Mobile Documents/com~apple~CloudDocs/Insanity Folder/UC | App Design Master")
ICEBREAKER = ROOT / "Docs/Research-Notes/UCID-IceBreaker-Questions-Combined.markdown"
CURRENT_DIR = ROOT / "Docs/Current-Markdowns"

EXTS = {".md", ".markdown"}
EXCLUDE_DIR_NAMES = {
    ".git", "node_modules", "venv", "build", "dist", "__pycache__",
    ".next", ".turbo", "site-packages"
}


def file_birth_or_mtime(p: Path) -> float:
    st = p.stat()
    birth = getattr(st, "st_birthtime", None)
    return float(birth if birth is not None else st.st_mtime)


def should_skip_dir(dirpath: Path) -> bool:
    parts = set(dirpath.parts)
    return any(name in parts for name in EXCLUDE_DIR_NAMES)


def main() -> int:
    if not ICEBREAKER.exists():
        print(f"ERROR: Icebreaker file not found: {ICEBREAKER}")
        return 1

    ice_date = datetime.datetime.fromtimestamp(file_birth_or_mtime(ICEBREAKER)).date()

    candidates: list[Path] = []

    # Walk the entire ROOT for markdowns, excluding heavy/system folders
    for dirpath, dirnames, filenames in os.walk(ROOT):
        dirpath_p = Path(dirpath)
        if should_skip_dir(dirpath_p):
            # Prune excluded directories from traversal
            dirnames[:] = [d for d in dirnames if d not in EXCLUDE_DIR_NAMES]
            continue
        # Also prune by name for the next levels
        dirnames[:] = [d for d in dirnames if d not in EXCLUDE_DIR_NAMES]
        for fname in filenames:
            p = dirpath_p / fname
            if p.suffix not in EXTS:
                continue
            try:
                d = datetime.datetime.fromtimestamp(file_birth_or_mtime(p)).date()
            except Exception:
                continue
            if d == ice_date:
                candidates.append(p)

    # Ensure destination dir exists and clear previous symlinks/index
    CURRENT_DIR.mkdir(parents=True, exist_ok=True)
    for child in CURRENT_DIR.iterdir():
        try:
            if child.is_symlink() or child.is_file():
                child.unlink()
        except Exception:
            pass

    # Create symlinks and build index lines
    index_lines = [
        "# Current Markdowns",
        f"Date anchor: {ice_date.isoformat()}",
        "",
        "This folder contains symlinks to markdowns created on the same day as the Icebreaker combined file.",
        "",
    ]

    for p in sorted(set(candidates)):
        try:
            rel_from_root = p.relative_to(ROOT)
        except ValueError:
            rel_from_root = p
        link_path = CURRENT_DIR / p.name
        if link_path.exists() or link_path.is_symlink():
            try:
                link_path.unlink()
            except Exception:
                pass
        try:
            target_rel = os.path.relpath(p, CURRENT_DIR)
            os.symlink(target_rel, link_path)
        except FileExistsError:
            pass
        index_lines.append(f"- {p.name} — `{rel_from_root}`")

    # Write index
    (CURRENT_DIR / "INDEX.md").write_text("\n".join(index_lines), encoding="utf-8")

    print(f"Created {len(set(candidates))} symlinks in: {CURRENT_DIR}")
    print(f"Index written to: {CURRENT_DIR / 'INDEX.md'}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
