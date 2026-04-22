import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Anit Choudhary — AI Product Manager",
  description: "Every wave changed the world. He was already on it. AI Product Manager at OpenAnalyst Inc., shaping the future of agentic AI systems.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ background: '#03010a' }}>{children}</body>
    </html>
  );
}
