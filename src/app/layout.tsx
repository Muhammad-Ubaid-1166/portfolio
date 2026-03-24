import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://muhammad.dev'),
  title: 'Muhammad | AI/Backend Engineer',
  description: 'Portfolio of Muhammad - A passionate Data Science student specializing in Machine Learning, Deep Learning, and NLP. Building intelligent systems that solve real-world problems.',
  keywords: ['Muhammad', 'AI Engineer', 'Backend Engineer', 'Machine Learning', 'Deep Learning', 'NLP', 'Portfolio', 'Developer'],
  authors: [{ name: 'Muhammad' }],
  creator: 'Muhammad',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://muhammad.dev',
    title: 'Muhammad | AI/Backend Engineer',
    description: 'Building Intelligent Systems, One Model at a Time',
    siteName: 'Muhammad Portfolio',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Muhammad - AI/Backend Engineer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Muhammad | AI/Backend Engineer',
    description: 'Building Intelligent Systems, One Model at a Time',
    creator: '@muhammad',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          forcedTheme="dark"
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          {children}
          <Toaster richColors position="bottom-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
