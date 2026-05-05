import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

const siteUrl = 'https://synexis.tech'
const siteName = 'Synexis Technologies'
const description = 'We deliver scalable software, intelligent automation, and data-driven transformation for global enterprises seeking technical excellence at scale.'

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} - Enterprise Intelligence Solutions`,
    template: `%s | ${siteName}`,
  },
  description,
  keywords: ['enterprise software', 'AI automation', 'SAP', 'Power BI', 'Apigee', 'n8n', 'mobile development', 'web development', 'Karachi', 'Pakistan'],
  authors: [{ name: siteName }],
  creator: siteName,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName,
    title: `${siteName} - Enterprise Intelligence Solutions`,
    description,
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: siteName,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteName} - Enterprise Intelligence Solutions`,
    description,
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
    },
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
