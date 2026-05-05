import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Synexis Technologies - Enterprise Intelligence Solutions',
  description: 'We deliver scalable software, intelligent automation, and data-driven transformation for global enterprises seeking technical excellence at scale.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
