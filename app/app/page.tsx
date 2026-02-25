import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-dvh flex flex-col items-center justify-center px-6 py-12">
      {/* Ambient glow */}
      <div className="fixed inset-0 pointer-events-none z-0"
        style={{ background: "radial-gradient(ellipse 60% 40% at 50% 20%, rgba(196,149,106,0.04), transparent 70%)" }}
      />

      {/* Title */}
      <div className="text-center mb-16 relative z-10">
        <div className="mb-6">
          <span className="text-5xl">📖</span>
        </div>
        <h1 className="text-4xl font-light tracking-wide mb-3" style={{ color: "var(--text-primary)" }}>
          The Source Text
        </h1>
        <p className="text-sm tracking-widest uppercase mb-2" style={{ color: "var(--text-muted)" }}>
          Scripture in its original words
        </p>
        <p className="text-xs mt-4 max-w-xs mx-auto leading-relaxed" style={{ color: "var(--text-secondary)" }}>
          Tap any word to see the original Hebrew or Greek. Tap any verse for history and context. No agenda — just what the text actually says.
        </p>
      </div>

      {/* Books */}
      <div className="w-full max-w-sm space-y-3 relative z-10">
        <p className="text-xs tracking-widest uppercase mb-4" style={{ color: "var(--text-muted)" }}>
          Available
        </p>

        <Link
          href="/john"
          className="block w-full p-5 rounded-xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] border"
          style={{ background: "var(--bg-card)", borderColor: "rgba(196,149,106,0.15)" }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-light mb-1" style={{ color: "var(--text-primary)" }}>
                The Gospel of John
              </h2>
              <p className="text-sm" style={{ color: "var(--accent-gold)" }}>
                Κατὰ Ἰωάννην
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>21 chapters</p>
              <p className="text-xs" style={{ color: "var(--accent-green)" }}>In progress</p>
            </div>
          </div>
        </Link>

        <p className="text-xs tracking-widest uppercase mt-8 mb-4 pt-4" style={{ color: "var(--text-muted)" }}>
          Coming Soon
        </p>

        {[
          { name: "Genesis", greek: "Βερεσιθ", lang: "Hebrew" },
          { name: "Romans", greek: "Πρὸς Ῥωμαίους", lang: "Greek" },
          { name: "Revelation", greek: "Ἀποκάλυψις", lang: "Greek" },
          { name: "Psalms", greek: "תהילים", lang: "Hebrew" },
        ].map((book) => (
          <div
            key={book.name}
            className="block w-full p-5 rounded-xl opacity-25 cursor-not-allowed"
            style={{ background: "var(--bg-card)" }}
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-light" style={{ color: "var(--text-primary)" }}>{book.name}</h2>
                <p className="text-xs" style={{ color: "var(--text-muted)" }}>{book.greek}</p>
              </div>
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>Soon</p>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-20 text-center relative z-10">
        <p className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>
          Every word. Every meaning. No agenda.
        </p>
        <p className="text-[10px] mt-2" style={{ color: "rgba(102,102,102,0.5)" }}>
          Built with reverence for the original text
        </p>
      </div>
    </main>
  );
}
