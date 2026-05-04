import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { BUSINESS } from "@/lib/business";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  weight: ["200", "300", "400", "500", "600"],
  variable: "--font-inter",
});

// ------------------------------------------------------------
// Default metadata applied to every page (overridable per-page)
// ------------------------------------------------------------
export const metadata: Metadata = {
  metadataBase: new URL(BUSINESS.url),
  title: {
    default: `${BUSINESS.name} — ${BUSINESS.tagline}`,
    template: `%s | ${BUSINESS.name}`,
  },
  description: BUSINESS.description,
  applicationName: BUSINESS.name,
  authors: [{ name: BUSINESS.name }],
  generator: "Next.js",
  keywords: [
    "tennis court construction",
    "pickleball court construction",
    "basketball court installation",
    "court resurfacing",
    "sports court contractor",
    "Bellingham WA",
    "Lynden WA",
    "Whatcom County",
    "Skagit County",
    "Pacific Northwest sports courts",
    "residential tennis court",
    "backyard pickleball court",
    "court striping Washington",
  ],
  creator: BUSINESS.name,
  publisher: BUSINESS.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BUSINESS.url,
    siteName: BUSINESS.name,
    title: `${BUSINESS.name} — ${BUSINESS.tagline}`,
    description: BUSINESS.description,
    images: [
      {
        url: BUSINESS.ogImagePath,
        width: 1200,
        height: 630,
        alt: `${BUSINESS.name} — Sports Court Construction in the Pacific Northwest`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${BUSINESS.name} — ${BUSINESS.tagline}`,
    description: BUSINESS.shortDescription,
    images: [BUSINESS.ogImagePath],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  verification: {
    // Add when you set up Google Search Console:
    // google: "your-verification-token",
  },
  category: "Construction",
};

export const viewport: Viewport = {
  themeColor: "#0A0A0B",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/* Preconnect to Unsplash for faster image hydration */}
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
      </head>
      <body
        className="bg-[#0A0A0B] text-white antialiased"
        style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}
      >
        {children}
      </body>
    </html>
  );
}
