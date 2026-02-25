import ChapterClient from "./ChapterClient";

export function generateStaticParams() {
  return Array.from({ length: 21 }, (_, i) => ({ chapter: String(i + 1) }));
}

export default function ChapterPage({ params }: { params: Promise<{ chapter: string }> }) {
  return <ChapterClient params={params} />;
}
