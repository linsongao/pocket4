import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pocket 4 × Pocket 4P｜一场关于看见的想象",
  description: "以 Pocket 4 实拍素材展开的沉浸式影像叙事与 Pocket 4P 概念推演。",
};

export default function Home() {
  return (
    <main className="site-shell">
      <iframe
        className="site-frame"
        src="/experience.html"
        title="Pocket 4 × Pocket 4P 沉浸式影像体验"
      />
    </main>
  );
}
