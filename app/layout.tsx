// Deploy trigger: 2026-03-08 02:37 UTC
import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";

export const metadata: Metadata = {
  title: "THE D[AI]LY BRIEF | Enterprise AI Insights by Rajesh Beri",
  description: "The AI newsletter 2,000+ engineering leaders read. Real benchmarks, vendor comparisons, and ROI frameworks — from someone who deploys AI at enterprise scale.",
  keywords: ["AI newsletter", "enterprise AI", "machine learning", "artificial intelligence", "engineering leadership", "AI insights"],
  authors: [{ name: "Rajesh Beri" }],
  creator: "Rajesh Beri",
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  },
  openGraph: {
    type: "website",
    title: "THE D[AI]LY BRIEF | Enterprise AI Insights",
    description: "Real AI benchmarks and vendor analysis for engineering leaders. No hype, just signal.",
    siteName: "THE D[AI]LY BRIEF",
  },
  twitter: {
    card: "summary_large_image",
    title: "THE D[AI]LY BRIEF",
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased">
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-NZ3YZHQPJ9"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-NZ3YZHQPJ9');
          `}
        </Script>
        {children}
      </body>
    </html>
  );
}
