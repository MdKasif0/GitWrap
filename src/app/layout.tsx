import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })

export const metadata: Metadata = {
  title: 'GitWrap 2025 - Your GitHub Year in Review | Free GitHub Wrapped',
  description: 'Create your personalized GitHub Wrapped 2025! Discover your coding stats, top languages, contribution streaks, and get hilariously roasted by AI. Free GitHub year in review tool inspired by Spotify Wrapped.',
  keywords: ['github wrapped', 'github stats', 'github year in review', 'developer stats', 'coding analytics', 'github 2025'],
  authors: [{ name: 'GitWrap' }],
  creator: 'GitWrap',
  publisher: 'GitWrap',
  robots: 'index, follow',
  alternates: {
    canonical: 'https://gitwrap.netlify.app'
  },
  manifest: '/manifest.json',
  openGraph: {
    title: 'GitWrap 2025 - Your GitHub Year in Review',
    description: 'Create your personalized GitHub Wrapped 2025! Discover your coding stats, top languages, contribution streaks, and get hilariously roasted by AI.',
    url: 'https://gitwrap.netlify.app',
    siteName: 'GitWrap',
    images: [
      {
        url: 'https://gitwrap.netlify.app/og-gitwrap.png',
        width: 1200,
        height: 630,
        alt: 'GitWrap - Your year in code, wrapped.',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GitWrap 2025 - Your GitHub Year in Review',
    description: 'Create your personalized GitHub Wrapped 2025! Discover your coding stats, top languages, contribution streaks, and get hilariously roasted by AI.',
    creator: '@GitWrap',
    images: ['https://gitwrap.netlify.app/og-gitwrap.png'],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
  },
  icons: {
    apple: "/gitwrap.png",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta name="theme-color" content="#0a0a0a" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#8b5cf6" />
        <meta httpEquiv="content-language" content="en-US" />
        <meta name="author" content="GitWrap" />
        <meta name="referrer" content="origin-when-cross-origin" />
        <meta name="format-detection" content="telephone=no" />

      </head>
      <body className={`font-sans ${inter.variable} antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
