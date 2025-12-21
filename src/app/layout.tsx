import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })

export const metadata: Metadata = {
  title: 'GitWrap',
  description: 'Your year in code, wrapped.',
  manifest: '/manifest.json',
  openGraph: {
    title: 'GitWrap',
    description: 'Your year in code, wrapped.',
    images: [
      {
        url: '/og-gitwrap.png',
        width: 1200,
        height: 630,
        alt: 'GitWrap - Your year in code, wrapped.',
      },
    ],
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
      </head>
      <body className={`font-sans ${inter.variable} antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
