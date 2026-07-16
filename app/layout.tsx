import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pocket 4 × Pocket 4P",
  description: "一场关于轻盈影像与未来相机的概念研究。",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
