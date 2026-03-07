import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "THE D*AI*LY BRIEF | Enterprise AI Insights by Rajesh Beri",
  description: "Twice-weekly AI deep dives for engineering leaders. No hype, just insights from building AI at enterprise scale at Zscaler.",
  keywords: ["AI newsletter", "enterprise AI", "machine learning", "artificial intelligence", "engineering leadership", "AI insights"],
  authors: [{ name: "Rajesh Beri" }],
  creator: "Rajesh Beri",
  openGraph: {
    type: "website",
    title: "THE D*AI*LY BRIEF | Enterprise AI Insights",
    description: "Twice-weekly AI deep dives for engineering leaders. No hype, just insights from the trenches.",
    siteName: "THE D*AI*LY BRIEF",
  },
  twitter: {
    card: "summary_large_image",
    title: "THE D*AI*LY BRIEF",
    description: "Enterprise AI insights for engineering leaders",
    creator: "@rajeshberi",
  },
  robots: {
    index: true,
    follow: true,
  },
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
