import type { Metadata } from "next";
import "./globals.css";
import GoogleAnalytics from "./components/GoogleAnalytics";

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
    <html lang="en" className="scroll-smooth">
      <head>
        <GoogleAnalytics />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
