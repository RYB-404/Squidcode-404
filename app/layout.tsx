import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SquidCode - Turn hackathon ideas into build-ready projects',
  description:
    'SquidCode helps non-coders transform hackathon, grant, and bounty opportunities into project ideas, MVP plans, coding prompts, pitches, demo scripts, and submission checklists.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
