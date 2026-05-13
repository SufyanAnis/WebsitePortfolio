import type { Metadata, Viewport } from "next";
import { Syne, DM_Sans } from "next/font/google";
import { LenisProvider } from "@/lib/lenis-provider";
import { CustomCursor } from "@/components/animations/custom-cursor";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-syne",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-dm-sans",
  display: "swap",
});

const SITE_URL = "https://swiftlabs.dev";
const SITE_NAME = "Swift Labs";
const SITE_DESCRIPTION =
  "Swift Labs is a digital studio shipping web, mobile, UI/UX, SAP ABAP, Jira, AGI, CI/CD, Apigee, marketing, and social work for ambitious teams. Engineered in Karachi, shipped worldwide.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Digital products, engineered.`,
    template: `%s · ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "digital agency",
    "website development",
    "mobile app development",
    "UI UX design",
    "SAP ABAP development",
    "Jira implementation",
    "AGI integration",
    "AI agents",
    "CI CD pipeline",
    "Apigee API integration",
    "performance marketing",
    "social media management",
    "Next.js studio",
    "Karachi",
    "Swift Labs",
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Digital products, engineered.`,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: SITE_NAME,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Digital products, engineered.`,
    description: SITE_DESCRIPTION,
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${dmSans.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-base text-primary font-body antialiased">
        <LenisProvider>{children}</LenisProvider>
        <CustomCursor />
      </body>
    </html>
  );
}
