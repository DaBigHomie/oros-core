import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'DJ Jaytek Music - Learn DJing & Music Production',
  description: 'Master the art of DJing and music production with courses from world-class instructors. Join our community of aspiring DJs and producers.',
  keywords: 'DJ courses, music production, DJ lessons, electronic music, music academy',
  authors: [{ name: 'DJ Jaytek Music' }],
  openGraph: {
    title: 'DJ Jaytek Music - Learn DJing & Music Production',
    description: 'Master the art of DJing and music production with courses from world-class instructors.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased">
        {/* Skip to main content link for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-indigo-600 focus:text-white focus:rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Skip to main content
        </a>

        <main id="main-content" role="main">
          {children}
        </main>
      </body>
    </html>
  );
}
