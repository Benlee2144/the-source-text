#!/usr/bin/env python3
"""
Merge chapter data and copy to public/data/john/ for the Next.js app.
"""
import json, os, re, glob

DATA_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'data', 'john')
PUBLIC_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'app', 'public', 'data', 'john')
os.makedirs(PUBLIC_DIR, exist_ok=True)

def load_json_safe(path):
    """Load JSON, attempting to repair truncated files."""
    with open(path) as f:
        text = f.read()
    try:
        return json.loads(text)
    except json.JSONDecodeError:
        # Try to repair by finding last complete verse
        verse_starts = [m.start() for m in re.finditer(r'\{\s*"verseNumber"', text)]
        for i in range(len(verse_starts)-1, 0, -1):
            candidate = text[:verse_starts[i]].rstrip().rstrip(',')
            for suffix in ['\n]}', '\n]']:
                try:
                    return json.loads(candidate + suffix)
                except:
                    continue
        return None

def merge_verses_into(chapter_data, extra_verses):
    """Merge extra verses into a chapter's verse list."""
    if isinstance(extra_verses, dict) and 'verses' in extra_verses:
        extra_verses = extra_verses['verses']
    if not isinstance(extra_verses, list):
        return 0
    existing = {v['verseNumber'] for v in chapter_data['verses']}
    added = 0
    for v in extra_verses:
        if v.get('verseNumber') and v['verseNumber'] not in existing:
            chapter_data['verses'].append(v)
            added += 1
    chapter_data['verses'].sort(key=lambda v: v['verseNumber'])
    return added

# Process chapter 1 — merge all fragments
ch1_path = os.path.join(DATA_DIR, '1.json')
if os.path.exists(ch1_path):
    ch1 = load_json_safe(ch1_path)
    if ch1:
        for frag in sorted(glob.glob(os.path.join(DATA_DIR, '1-verses-*.json'))):
            extra = load_json_safe(frag)
            if extra:
                added = merge_verses_into(ch1, extra)
                if added: print(f"  Merged {added} verses from {os.path.basename(frag)}")
        with open(ch1_path, 'w') as f:
            json.dump(ch1, f, ensure_ascii=False, indent=2)
        print(f"John 1: {len(ch1['verses'])} verses (1-{ch1['verses'][-1]['verseNumber']})")

# Process other chapters — merge any *-remaining.json files
for ch_num in range(2, 22):
    ch_path = os.path.join(DATA_DIR, f'{ch_num}.json')
    remaining_path = os.path.join(DATA_DIR, f'{ch_num}-remaining.json')
    
    if not os.path.exists(ch_path):
        continue
    
    ch_data = load_json_safe(ch_path)
    if not ch_data:
        print(f"John {ch_num}: CORRUPTED, skipping")
        continue
    
    if os.path.exists(remaining_path):
        extra = load_json_safe(remaining_path)
        if extra:
            added = merge_verses_into(ch_data, extra)
            if added:
                print(f"  Merged {added} remaining verses into chapter {ch_num}")
                with open(ch_path, 'w') as f:
                    json.dump(ch_data, f, ensure_ascii=False, indent=2)
    
    print(f"John {ch_num}: {len(ch_data['verses'])} verses")

# Copy all clean chapter files to public
print("\nCopying to public/data/john/...")
for ch_num in range(1, 22):
    src = os.path.join(DATA_DIR, f'{ch_num}.json')
    if os.path.exists(src):
        data = load_json_safe(src)
        if data and isinstance(data, dict) and 'verses' in data and len(data['verses']) > 0:
            dst = os.path.join(PUBLIC_DIR, f'{ch_num}.json')
            with open(dst, 'w') as f:
                json.dump(data, f, ensure_ascii=False)
            print(f"  {ch_num}.json → {len(data['verses'])} verses ✓")

print("\nDone!")
