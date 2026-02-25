"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const CHAPTER_TITLES: Record<number, string> = {
  1: "The Word Became Flesh",
  2: "Water to Wine · Temple Cleansed",
  3: "You Must Be Born Again",
  4: "Woman at the Well",
  5: "Pool of Bethesda",
  6: "Bread of Life",
  7: "Rivers of Living Water",
  8: "The Light of the World",
  9: "Man Born Blind",
  10: "The Good Shepherd",
  11: "Lazarus Raised",
  12: "The Triumphal Entry",
  13: "The Last Supper",
  14: "I Am the Way",
  15: "The True Vine",
  16: "The Spirit of Truth",
  17: "Jesus Prays",
  18: "Betrayal & Arrest",
  19: "Crucifixion",
  20: "The Resurrection",
  21: "Breakfast on the Shore",
};

export default function JohnOverview() {
  const chapters = Array.from({ length: 21 }, (_, i) => i + 1);
  const [available, setAvailable] = useState<Set<number>>(new Set());

  useEffect(() => {
    // Check which chapter files exist
    const basePath = process.env.NODE_ENV === "production" ? "/the-source-text" : "";
    chapters.forEach((ch) => {
      fetch(`${basePath}/data/john/${ch}.json`, { method: "HEAD" })
        .then((res) => {
          if (res.ok) setAvailable((prev) => new Set(prev).add(ch));
        })
        .catch(() => {});
    });
  }, []);

  const availableCount = available.size;

  return (
    <main className="min-h-dvh px-6 py-8 max-w-lg mx-auto">
      {/* Header */}
      <Link href="/" className="text-sm mb-8 inline-block active:opacity-60 transition-opacity" style={{ color: "var(--text-muted)" }}>
        ← Books
      </Link>

      <div className="mb-8">
        <h1 className="text-3xl font-light mb-2" style={{ color: "var(--text-primary)" }}>
          The Gospel of John
        </h1>
        <p className="text-lg mb-1" style={{ color: "var(--accent-gold)" }}>
          Κατὰ Ἰωάννην · Kata Iōannēn
        </p>
        <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
          &ldquo;According to John&rdquo;
        </p>
      </div>

      {/* Book info */}
      <div className="rounded-xl p-5 mb-6" style={{ background: "var(--bg-card)" }}>
        <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
          Written by John (Ἰωάννης / Yohanan — &ldquo;God is gracious&rdquo;), son of Zebedee,
          one of the twelve apostles. Called &ldquo;the disciple whom Jesus loved.&rdquo;
          Written ~85-95 AD from Ephesus — the last gospel composed, decades after Matthew, Mark, and Luke.
          John goes deeper theologically than the other gospels, opening with the nature of Christ
          as the eternal Logos rather than a birth narrative.
        </p>
      </div>

      {/* Progress */}
      <div className="rounded-xl p-4 mb-6" style={{ background: "var(--bg-card)" }}>
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs tracking-widest uppercase" style={{ color: "var(--text-muted)" }}>Progress</p>
          <p className="text-xs" style={{ color: "var(--accent-green)" }}>
            {availableCount} of 21 chapters
          </p>
        </div>
        <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.05)" }}>
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{ width: `${(availableCount / 21) * 100}%`, background: "var(--accent-green)" }}
          />
        </div>
      </div>

      {/* Chapter list */}
      <p className="text-xs tracking-widest uppercase mb-4" style={{ color: "var(--text-muted)" }}>
        Chapters
      </p>
      <div className="space-y-2">
        {chapters.map((ch) => {
          const isAvailable = available.has(ch);
          const title = CHAPTER_TITLES[ch] || "";
          return isAvailable ? (
            <Link
              key={ch}
              href={`/john/${ch}`}
              className="flex items-center gap-4 p-4 rounded-xl transition-all hover:scale-[1.01] active:scale-[0.98]"
              style={{ background: "var(--bg-card)" }}
            >
              <span className="text-lg w-8 text-center" style={{ color: "var(--accent-gold)" }}>{ch}</span>
              <div className="flex-1">
                <p className="text-sm" style={{ color: "var(--text-primary)" }}>{title}</p>
              </div>
              <span className="text-xs" style={{ color: "var(--text-muted)" }}>→</span>
            </Link>
          ) : (
            <div
              key={ch}
              className="flex items-center gap-4 p-4 rounded-xl opacity-30 cursor-not-allowed"
              style={{ background: "var(--bg-card)" }}
            >
              <span className="text-lg w-8 text-center" style={{ color: "var(--text-muted)" }}>{ch}</span>
              <div className="flex-1">
                <p className="text-sm" style={{ color: "var(--text-muted)" }}>{title}</p>
              </div>
              <span className="text-[10px]" style={{ color: "var(--text-muted)" }}>soon</span>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="mt-12 text-center pb-8">
        <p className="text-xs" style={{ color: "var(--text-muted)" }}>
          New chapters added regularly
        </p>
      </div>
    </main>
  );
}
