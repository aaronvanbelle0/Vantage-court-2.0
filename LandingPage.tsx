import type { Metadata } from "next";
import { BUSINESS } from "@/lib/business";
import {
  localBusinessSchema,
  websiteSchema,
  breadcrumbSchema,
  faqSchema,
  serviceSchemas,
  combinedSchema,
} from "@/lib/schema";
import LandingPage from "@/components/LandingPage";

// ------------------------------------------------------------
// PAGE METADATA — overrides root defaults for the homepage
// ------------------------------------------------------------
export const metadata: Metadata = {
  title: `Sports Court Construction & Resurfacing in NW Washington | ${BUSINESS.name}`,
  description:
    "Premium tennis, pickleball, and basketball court construction and resurfacing across Whatcom, Skagit, Snohomish, Island, and San Juan Counties. Studio in Lynden, WA.",
  alternates: { canonical: "/" },
  openGraph: {
    title: `Sports Court Construction & Resurfacing | ${BUSINESS.name}`,
    description:
      "Elite court construction and resurfacing for the Pacific Northwest. Tennis, pickleball, basketball, and custom multi-sport surfaces.",
    url: BUSINESS.url,
    type: "website",
  },
};

// ------------------------------------------------------------
// HOMEPAGE
// ------------------------------------------------------------
export default function HomePage() {
  // Build the combined schema graph — single <script> tag, multiple entities
  const schemaGraph = combinedSchema([
    localBusinessSchema(),
    websiteSchema(),
    breadcrumbSchema([{ name: "Home", url: BUSINESS.url }]),
    faqSchema(),
    ...serviceSchemas(),
  ]);

  return (
    <>
      {/* JSON-LD structured data — rendered server-side for crawlers */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaGraph) }}
      />

      <LandingPage />
    </>
  );
}
