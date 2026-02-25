#!/usr/bin/env python3
"""
Merge chapter data and copy to public/data/john/ for the Next.js app.
Run from the bible-app root directory.
"""
import json
import os
import shutil

DATA_DIR = os.path.join(os.path.dirname(__file__), '..', 'data', 'john')
PUBLIC_DIR = os.path.join(os.path.dirname(__file__), '..', 'app', 'public', 'data', 'john')

os.makedirs(PUBLIC_DIR, exist_ok=True)

# Check if we need to merge john 1 (existing 1-18 + new 19-51)
ch1_path = os.path.join(DATA_DIR, '1.json')
ch1_rest_path = os.path.join(DATA_DIR, '1-verses-19-51.json')

if os.path.exists(ch1_path) and os.path.exists(ch1_rest_path):
    print("Merging John 1...")
    with open(ch1_path) as f:
        ch1 = json.load(f)
    with open(ch1_rest_path) as f:
        rest = json.load(f)
    
    # rest could be just an array of verses or a full chapter object
    if isinstance(rest, list):
        new_verses = rest
    elif isinstance(rest, dict) and 'verses' in rest:
        new_verses = rest['verses']
    else:
        print(f"  WARNING: unexpected format in {ch1_rest_path}")
        new_verses = []
    
    existing_nums = {v['verseNumber'] for v in ch1['verses']}
    added = 0
    for v in new_verses:
        if v['verseNumber'] not in existing_nums:
            ch1['verses'].append(v)
            added += 1
    
    ch1['verses'].sort(key=lambda v: v['verseNumber'])
    
    with open(ch1_path, 'w') as f:
        json.dump(ch1, f, ensure_ascii=False, indent=2)
    print(f"  John 1 now has {len(ch1['verses'])} verses (added {added})")

# Copy all chapter files to public
for fname in sorted(os.listdir(DATA_DIR)):
    if fname.endswith('.json') and not fname.startswith('1-'):
        src = os.path.join(DATA_DIR, fname)
        dst = os.path.join(PUBLIC_DIR, fname)
        shutil.copy2(src, dst)
        
        with open(src) as f:
            d = json.load(f)
        
        if isinstance(d, dict) and 'verses' in d:
            print(f"  {fname}: {len(d['verses'])} verses ✓")
        else:
            print(f"  {fname}: copied (format unclear)")

print("\nDone! Run 'cd app && npm run build' to rebuild.")
