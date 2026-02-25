import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-dvh flex flex-col items-center justify-center px-6">
      <p className="text-5xl mb-6">📖</p>
      <h1 className="text-2xl font-light mb-2" style={{ color: "var(--text-primary)" }}>
        Page Not Found
      </h1>
      <p className="text-sm mb-8 text-center" style={{ color: "var(--text-secondary)" }}>
        This scroll seems to be missing from the library.
      </p>
      <Link
        href="/"
        className="text-sm px-5 py-2.5 rounded-xl transition-all active:scale-95"
        style={{ background: "var(--bg-card)", color: "var(--accent-gold)" }}
      >
        Return to the beginning
      </Link>
    </main>
  );
}
