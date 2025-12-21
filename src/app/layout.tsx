import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })

export const metadata: Metadata = {
  title: 'GitWrap',
  description: 'Your year in code, wrapped.',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
  },
  icons: {
    apple: "/apple-touch-icon.png",
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
