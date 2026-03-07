import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "THE D*AI*LY BRIEF | AI Newsletter by Rajesh Beri",
  description: "Twice-weekly AI deep dives for engineering leaders and tech decision-makers. No hype, just insights that matter.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
