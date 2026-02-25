"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

interface WordData {
  english: string;
  original: string;
  transliteration: string;
  pronunciation: string;
  strongs: string;
  partOfSpeech: string;
  literalMeaning: string;
  definition: string;
  translationNote: string;
  twisted: boolean;
  twistedExplanation: string | null;
}

interface CrossRef {
  ref: string;
  explanation: string;
}

interface VerseData {
  verseNumber: number;
  verseText: string;
  freshTranslation: string;
  historicalContext: string;
  crossRefs: CrossRef[];
  words: WordData[];
}

interface ChapterData {
  book: string;
  bookGreek: string;
  chapter: number;
  author: string;
  audience: string;
  historicalContext: string;
  verses: VerseData[];
}

// Word detail panel
function WordPanel({ word, onClose }: { word: WordData; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <div className="fixed inset-0 z-50" onClick={onClose}>
      <div className="absolute inset-0 bg-black/70 fade-in" />
      <div
        className="absolute bottom-0 left-0 right-0 max-h-[85vh] overflow-y-auto rounded-t-2xl slide-up"
        style={{ background: "var(--bg-elevated)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 pt-3 pb-2 flex justify-center z-10" style={{ background: "var(--bg-elevated)" }}>
          <div className="w-10 h-1 rounded-full" style={{ background: "var(--text-muted)" }} />
        </div>

        <div className="px-6 pb-10">
          {/* English word */}
          <p className="text-xs tracking-widest uppercase mb-1" style={{ color: "var(--text-muted)" }}>English</p>
          <p className="text-xl mb-5" style={{ color: "var(--text-primary)" }}>&ldquo;{word.english}&rdquo;</p>

          {/* Original language card */}
          <div className="rounded-xl p-5 mb-5" style={{ background: "var(--bg-card)" }}>
            <p className="text-3xl mb-2 text-center" style={{ color: "var(--accent-gold)" }}>{word.original}</p>
            <p className="text-center text-sm mb-1" style={{ color: "var(--text-secondary)" }}>
              {word.transliteration} · <span style={{ color: "var(--text-muted)" }}>{word.pronunciation}</span>
            </p>
            <p className="text-center text-xs" style={{ color: "var(--text-muted)" }}>
              {word.partOfSpeech} · {word.strongs}
            </p>
          </div>

          {/* Literal meaning */}
          <Section label="Literal Meaning" color="var(--accent-gold)">
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-primary)" }}>{word.literalMeaning}</p>
          </Section>

          {/* Full definition */}
          <Section label="What This Word Really Means" color="var(--accent-green)">
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{word.definition}</p>
          </Section>

          {/* Translation note */}
          {word.translationNote && !["Accurate.", "Accurately translated.", "Standard translation."].includes(word.translationNote) && (
            <Section label="Translation Note" color="var(--accent-blue)">
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{word.translationNote}</p>
            </Section>
          )}

          {/* Twisted flag */}
          {word.twisted && word.twistedExplanation && (
            <div className="rounded-xl p-4 mb-5 border" style={{ background: "#1a1212", borderColor: "var(--accent-red)" }}>
              <p className="text-xs tracking-widest uppercase mb-2" style={{ color: "var(--accent-red)" }}>
                ⚠ Translation Issue
              </p>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                {word.twistedExplanation}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Section({ label, color, children }: { label: string; color: string; children: React.ReactNode }) {
  return (
    <div className="mb-5">
      <p className="text-xs tracking-widest uppercase mb-2" style={{ color }}>{label}</p>
      {children}
    </div>
  );
}

// Verse context panel
function VersePanel({ verse, onClose }: { verse: VerseData; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <div className="fixed inset-0 z-50" onClick={onClose}>
      <div className="absolute inset-0 bg-black/70 fade-in" />
      <div
        className="absolute bottom-0 left-0 right-0 max-h-[85vh] overflow-y-auto rounded-t-2xl slide-up"
        style={{ background: "var(--bg-elevated)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 pt-3 pb-2 flex justify-center z-10" style={{ background: "var(--bg-elevated)" }}>
          <div className="w-10 h-1 rounded-full" style={{ background: "var(--text-muted)" }} />
        </div>

        <div className="px-6 pb-10">
          <p className="text-xs tracking-widest uppercase mb-5" style={{ color: "var(--text-muted)" }}>
            Verse {verse.verseNumber} · Context
          </p>

          <Section label="Traditional Translation" color="var(--accent-gold)">
            <p className="text-base italic leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              &ldquo;{verse.verseText}&rdquo;
            </p>
          </Section>

          <Section label="Fresh Translation" color="var(--accent-green)">
            <p className="text-base leading-relaxed" style={{ color: "var(--text-primary)" }}>
              &ldquo;{verse.freshTranslation}&rdquo;
            </p>
          </Section>

          <Section label="Historical Context" color="var(--accent-blue)">
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              {verse.historicalContext}
            </p>
          </Section>

          {verse.crossRefs && verse.crossRefs.length > 0 && (
            <Section label="Connected Passages" color="var(--accent-gold)">
              <div className="space-y-3">
                {verse.crossRefs.map((ref, i) => (
                  <div key={i} className="rounded-lg p-3" style={{ background: "var(--bg-card)" }}>
                    <p className="text-sm font-medium mb-1" style={{ color: "var(--accent-gold)" }}>{ref.ref}</p>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{ref.explanation}</p>
                  </div>
                ))}
              </div>
            </Section>
          )}
        </div>
      </div>
    </div>
  );
}

// Tappable word
function TappableWord({ word, onClick }: { word: WordData; onClick: () => void }) {
  return (
    <span
      onClick={onClick}
      className="cursor-pointer transition-colors duration-150 active:opacity-60"
      style={{
        borderBottom: word.twisted
          ? "2px dotted var(--accent-red)"
          : "1px dotted rgba(102,102,102,0.4)",
        color: "var(--text-secondary)",
      }}
    >
      {word.english}
    </span>
  );
}

// Chapter navigation
function ChapterNav({ current }: { current: number }) {
  const prev = current > 1 ? current - 1 : null;
  const next = current < 21 ? current + 1 : null;
  return (
    <div className="flex items-center justify-between py-8 mt-8 border-t" style={{ borderColor: "rgba(102,102,102,0.2)" }}>
      {prev ? (
        <Link href={`/john/${prev}`} className="flex items-center gap-2 text-sm px-4 py-2 rounded-xl transition-all active:scale-95"
          style={{ background: "var(--bg-card)", color: "var(--accent-gold)" }}>
          ← Chapter {prev}
        </Link>
      ) : <div />}
      <Link href="/john" className="text-xs" style={{ color: "var(--text-muted)" }}>All Chapters</Link>
      {next ? (
        <Link href={`/john/${next}`} className="flex items-center gap-2 text-sm px-4 py-2 rounded-xl transition-all active:scale-95"
          style={{ background: "var(--bg-card)", color: "var(--accent-gold)" }}>
          Chapter {next} →
        </Link>
      ) : <div />}
    </div>
  );
}

// Reading progress
function ReadingProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(h > 0 ? (window.scrollY / h) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-40 h-[2px]" style={{ background: "var(--bg)" }}>
      <div className="h-full transition-all duration-150" style={{ width: `${progress}%`, background: "var(--accent-gold)" }} />
    </div>
  );
}

// Skeleton loader
function LoadingSkeleton() {
  return (
    <main className="min-h-dvh px-5 py-6 max-w-lg mx-auto fade-in">
      <div className="h-4 w-16 rounded mb-8" style={{ background: "var(--bg-card)" }} />
      <div className="h-8 w-32 rounded mb-2" style={{ background: "var(--bg-card)" }} />
      <div className="h-4 w-48 rounded mb-10" style={{ background: "var(--bg-card)" }} />
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="mb-6">
          <div className="h-5 rounded mb-2" style={{ background: "var(--bg-card)", width: `${70 + Math.random() * 30}%` }} />
          <div className="h-5 rounded mb-2" style={{ background: "var(--bg-card)", width: `${50 + Math.random() * 40}%` }} />
          <div className="h-4 rounded mt-2" style={{ background: "var(--bg-card)", width: `${60 + Math.random() * 30}%`, opacity: 0.5 }} />
        </div>
      ))}
    </main>
  );
}

export default function ChapterClient({ params }: { params: Promise<{ chapter: string }> }) {
  const [data, setData] = useState<ChapterData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedWord, setSelectedWord] = useState<WordData | null>(null);
  const [selectedVerse, setSelectedVerse] = useState<VerseData | null>(null);
  const [showBookInfo, setShowBookInfo] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);
  const [resolvedParams, setResolvedParams] = useState<{ chapter: string } | null>(null);

  useEffect(() => {
    params.then(setResolvedParams);
  }, [params]);

  useEffect(() => {
    if (!resolvedParams) return;
    const ch = parseInt(resolvedParams.chapter);
    if (isNaN(ch) || ch < 1 || ch > 21) {
      setError("Invalid chapter number");
      return;
    }

    const basePath = process.env.NODE_ENV === "production" ? "/the-source-text" : "";
    fetch(`${basePath}/data/john/${ch}.json`)
      .then((res) => {
        if (!res.ok) throw new Error("Chapter not available yet");
        return res.json();
      })
      .then(setData)
      .catch(() => setError(`John ${ch} is not available yet. Check back soon!`));
  }, [resolvedParams]);

  // Dismiss instructions after first tap
  const handleWordTap = useCallback((word: WordData) => {
    setShowInstructions(false);
    setSelectedWord(word);
  }, []);

  if (error) {
    return (
      <main className="min-h-dvh flex flex-col items-center justify-center px-6">
        <p className="text-lg mb-4" style={{ color: "var(--text-primary)" }}>📖</p>
        <p className="text-sm mb-6 text-center" style={{ color: "var(--text-secondary)" }}>{error}</p>
        <Link href="/john" className="text-sm px-4 py-2 rounded-xl" style={{ background: "var(--bg-card)", color: "var(--accent-gold)" }}>
          ← Back to John
        </Link>
      </main>
    );
  }

  if (!data) return <LoadingSkeleton />;

  const chapterNum = data.chapter;

  return (
    <>
      <ReadingProgress />
      <main className="min-h-dvh px-5 py-6 max-w-lg mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Link href="/john" className="text-sm active:opacity-60 transition-opacity" style={{ color: "var(--text-muted)" }}>
            ← John
          </Link>
          <button
            onClick={() => setShowBookInfo(!showBookInfo)}
            className="text-xs px-3 py-1.5 rounded-full transition-all active:scale-95"
            style={{ background: "var(--bg-card)", color: "var(--text-muted)" }}
          >
            {showBookInfo ? "✕ Close" : "ℹ About"}
          </button>
        </div>

        {/* Chapter title */}
        <div className="mb-8">
          <h1 className="text-2xl font-light" style={{ color: "var(--text-primary)" }}>
            John {chapterNum}
          </h1>
          <p className="text-sm mt-1" style={{ color: "var(--accent-gold)" }}>
            {data.bookGreek} · Chapter {chapterNum}
          </p>
        </div>

        {/* Book info (expandable) */}
        {showBookInfo && (
          <div className="rounded-xl p-5 mb-8 fade-in" style={{ background: "var(--bg-card)" }}>
            <Section label="Author" color="var(--accent-gold)">
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{data.author}</p>
            </Section>
            <Section label="Audience" color="var(--accent-green)">
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{data.audience}</p>
            </Section>
            <Section label="Chapter Context" color="var(--accent-blue)">
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{data.historicalContext}</p>
            </Section>
          </div>
        )}

        {/* Reading instructions (dismissable) */}
        {showInstructions && (
          <div className="rounded-xl p-4 mb-8 fade-in relative" style={{ background: "var(--bg-card)" }}>
            <button
              onClick={() => setShowInstructions(false)}
              className="absolute top-2 right-3 text-xs"
              style={{ color: "var(--text-muted)" }}
            >✕</button>
            <p className="text-xs text-center leading-relaxed" style={{ color: "var(--text-muted)" }}>
              Tap any <span style={{ borderBottom: "1px dotted var(--text-muted)" }}>underlined word</span> for the original Greek
              · Tap a <span style={{ color: "var(--accent-gold)" }}>verse number</span> for history &amp; context
            </p>
            <p className="text-xs text-center mt-1" style={{ color: "var(--accent-red)" }}>
              Dotted red underline = translation issue worth knowing
            </p>
          </div>
        )}

        {/* Verses */}
        <div className="space-y-7">
          {data.verses.map((verse) => (
            <div key={verse.verseNumber}>
              {/* Fresh translation (main text) */}
              <div className="leading-[1.95] mb-2">
                <span
                  onClick={() => setSelectedVerse(verse)}
                  className="cursor-pointer text-sm font-medium mr-2 align-super transition-colors active:opacity-60"
                  style={{ color: "var(--accent-gold)", fontSize: "0.7em" }}
                >
                  {verse.verseNumber}
                </span>
                <span style={{ color: "var(--text-primary)" }}>
                  {verse.freshTranslation}
                </span>
              </div>

              {/* Tappable Greek-backed words */}
              <div className="text-sm leading-[2]">
                {verse.words.map((word, i) => (
                  <span key={i}>
                    <TappableWord word={word} onClick={() => handleWordTap(word)} />
                    {i < verse.words.length - 1 && " "}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Chapter navigation */}
        <ChapterNav current={chapterNum} />

        {/* Panels */}
        {selectedWord && <WordPanel word={selectedWord} onClose={() => setSelectedWord(null)} />}
        {selectedVerse && <VersePanel verse={selectedVerse} onClose={() => setSelectedVerse(null)} />}
      </main>
    </>
  );
}
