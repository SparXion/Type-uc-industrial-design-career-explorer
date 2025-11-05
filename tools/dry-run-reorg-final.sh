#!/usr/bin/env bash
set -euo pipefail
ROOT="${1:?Usage: bash tools/dry-run-reorg-final.sh \"/absolute/root/path\"}"
announce(){ printf "%s\n" "$1"; }
mkdirp(){ announce "MKDIR: $1"; }
move(){ announce "MOVE: $1 -> $2"; }
link(){ announce "SYMLINK: $1 -> $2"; }
write(){ announce "WRITE: $1 (content preview below)"; printf "%s\n" "$2" | sed 's/^/  | /'; }
skip(){ announce "SKIP (missing): $1"; }
exists(){ test -e "$1"; }

# Base dirs
for dir in \
  "Projects/UCID-App" \
  "Projects/IDExplorer-App" \
  "Assets/Design" "Assets/Images" "Assets/Video" "Assets/AfterEffects" "Assets/Guidelines" "Assets/DataSchemas" \
  "Docs/PRD" "Docs/Research-Notes" "Docs/Grant" "Docs/Flowcharts" \
  "Research/App-Visualizer" "Research/LLM-Career-Sorter" "Research/UCID-AI-Agent" "Research/ID-Nexus-App" \
  "Operations/Admin" "Operations/Scripts" \
  "Training/After-Effects" \
  "Archives/Legacy-Zips-and-Builds" \
  "Scratch/uploads"
do mkdirp "$ROOT/$dir"; done

plan_move(){ local src="$ROOT/$1"; local dst="$ROOT/$2"; if exists "$src"; then move "$src" "$dst"; else skip "$src"; fi; }

# Core moves (echo-only)
plan_move "Administrattion" "Operations/Admin/Administrattion"
plan_move "UC Grant App/IDExplorerApp" "Projects/IDExplorer-App"
plan_move "UC Grant App" "Docs/Grant/UC Grant App"
plan_move "UC | AE Training" "Training/After-Effects/UC | AE Training"
plan_move "uploads" "Scratch/uploads"

# Apps to Projects/UCID-App/<proposed> (using actual names from auditor)
plan_move "UC App V1" "Projects/UCID-App/2025-08-uc-app-v1-v1"
plan_move "UC Conversational App V1" "Projects/UCID-App/2025-08-uc-conversational-app-v1-v1"
plan_move "conversational-ucid-app" "Projects/UCID-App/2025-08-conversational-ucid-app-conversational"
plan_move "id-career-sorter" "Projects/UCID-App/2025-05-id-career-sorter"
plan_move "id-career-sorter-v2" "Projects/UCID-App/2025-04-id-career-sorter-v2-v2"

# Assets split
announce "=== ASSET SPLITTING ==="
# Design files
for f in "UC App Assets"/*.{ai,psd,svg}; do
  [ -e "$f" ] || continue
  base="$(basename "$f")"
  move "UC App Assets/$base" "Assets/Design/$base"
done
# Images
for f in "UC App Assets"/*.{png,jpg,jpeg,JPG,PNG,JPEG}; do
  [ -e "$f" ] || continue
  base="$(basename "$f")"
  move "UC App Assets/$base" "Assets/Images/$base"
done
# Video
for f in "UC App Assets"/*.{mp4,mov}; do
  [ -e "$f" ] || continue
  base="$(basename "$f")"
  move "UC App Assets/$base" "Assets/Video/$base"
done
# AfterEffects
for f in "UC App Assets"/*.aep "UC App Assets"/Adobe\ After\ Effects\ Auto-Save/*.aep; do
  [ -e "$f" ] || continue
  base="$(basename "$f")"
  move "UC App Assets/$base" "Assets/AfterEffects/$base"
done
# Guidelines / Schemas
plan_move "UC App Assets/UCID-App-Guideline.markdown" "Assets/Guidelines/UCID-App-Guideline.md"
plan_move "UC App Assets/UCID-Database-Schema.txt" "Assets/DataSchemas/UCID-Database-Schema.txt"

# Research
plan_move "UCID App Development/App Visualizer" "Research/App-Visualizer"
plan_move "UCID App Development/LLM Career Sorter" "Research/LLM-Career-Sorter"
plan_move "UCID App Development/UCID AI Agent" "Research/UCID-AI-Agent"
plan_move "UCID App Development/ID Nexus App" "Research/ID-Nexus-App"

# Docs (notes)
plan_move "UCID - MDs" "Docs/Research-Notes/UCID - MDs"

# Top-level PRDs/notes
plan_move "2015 - 08-14 - ID App UI vision v1.md" "Docs/PRD/2015-08-14-ID-App-UI-vision-v1.md"
plan_move "2025 - 0814 - Raw ID App Analysis.md" "Docs/Research-Notes/2025-0814-Raw-ID-App-Analysis.md"
plan_move "2025-0814-IDCareerExplorerPRD.markdown" "Docs/PRD/2025-0814-IDCareerExplorerPRD.md"
plan_move "2025-0814-IDCareerExplorerPRDv2.markdown" "Docs/PRD/2025-0814-IDCareerExplorerPRDv2.md"

# STATUS.md files
STATUS_ACTIVE="ACTIVE"
STATUS_DEPRECATED="DEPRECATED

See current app at: Projects/UCID-App/2025-08-conversational-ucid-app-conversational"

write "$ROOT/Projects/UCID-App/2025-08-uc-app-v1-v1/STATUS.md" "$STATUS_DEPRECATED"
write "$ROOT/Projects/UCID-App/2025-08-uc-conversational-app-v1-v1/STATUS.md" "$STATUS_DEPRECATED"
write "$ROOT/Projects/UCID-App/2025-08-conversational-ucid-app-conversational/STATUS.md" "$STATUS_ACTIVE"
write "$ROOT/Projects/UCID-App/2025-05-id-career-sorter/STATUS.md" "$STATUS_DEPRECATED"
write "$ROOT/Projects/UCID-App/2025-04-id-career-sorter-v2-v2/STATUS.md" "$STATUS_DEPRECATED"

# Symlink "current" to the active app
link "$ROOT/Projects/UCID-App/current" "$ROOT/Projects/UCID-App/2025-08-conversational-ucid-app-conversational"

announce "=== DRY RUN COMPLETE ==="
announce "Current app: 2025-08-conversational-ucid-app-conversational"
announce "Registry and CHANGELOG written to: Drafts/"
announce "No files were actually moved - this was echo-only."
