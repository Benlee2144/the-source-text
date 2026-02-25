# The Source Text — Bible App

## Vision
A Bible app that shows what the original text actually says. Every word tappable to reveal the Hebrew/Greek original, literal meaning, why translators changed it, and full historical context. Not a study tool for scholars — a reading experience for everyone.

## Tech Stack
- **Framework:** Next.js 14 (App Router) with static export for fast mobile experience
- **Styling:** Tailwind CSS — dark mode default, clean typography
- **Data:** JSON files per chapter with word-level annotations
- **Deployment:** GitHub Pages (free) initially, then App Store later
- **PWA:** Progressive Web App so it works like a native app on iPhone

## Design Principles
- Dark mode by default (dark bg, warm text, easy on eyes)
- Typography-first — beautiful readable text, not cluttered UI
- Tap any word → slide-up panel with original language, meaning, notes
- Tap verse number → context card with history, cross-refs, translation flags
- Minimal chrome — the text is the hero
- Mobile-first — designed for iPhone, works everywhere
- Fast. No loading spinners. Everything feels instant.

## Data Structure

### Word-level annotation (per word):
```json
{
  "english": "Word",
  "original": "λόγος",
  "transliteration": "logos",
  "pronunciation": "LOH-gos",
  "strongs": "G3056",
  "partOfSpeech": "noun",
  "literalMeaning": "word, speech, reason, divine expression",
  "definition": "Full definition text...",
  "translationNote": "Why this English word was chosen and what's lost/changed",
  "twisted": false,
  "twistedExplanation": null
}
```

### Verse-level context:
```json
{
  "reference": "John 1:1",
  "verseText": "In the beginning was the Word...",
  "freshTranslation": "A more accurate rendering...",
  "historicalContext": "What was happening when this was written",
  "audience": "Who was this written to and why",
  "crossRefs": ["Genesis 1:1", "Revelation 19:13"],
  "crossRefExplanations": "Why these connect...",
  "twistedFlag": false,
  "twistedExplanation": null
}
```

## Pages
- **/** — Home/book selector
- **/john** — Book overview
- **/john/1** — Chapter reading view (the main experience)

## Phase 1 — Gospel of John
Build the complete reading experience with John Chapter 1 fully annotated as the demo. Every word. Every verse. No shortcuts.

## Color Palette
- Background: #0a0a0a (near black)
- Primary text: #e8e0d4 (warm cream)
- Greek/Hebrew text: #c4956a (warm gold/amber)
- Accent: #6b9080 (muted sage green)
- Twisted flag: #c45c5c (muted red)
- Verse numbers: #666666 (subtle gray)
- Cards/panels: #151515 (slightly lighter dark)
