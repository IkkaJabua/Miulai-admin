import type { Metadata } from "next";
import "./globals.scss";
import styles from './layout.module.scss';
import { Plus_Jakarta_Sans } from 'next/font/google';

export const metadata: Metadata = {
  title: "Miulai Admin",
  description: "Music App",
};

const PlusJakartaSans = Plus_Jakarta_Sans({
  weight: [],
  subsets: ['latin'],
  variable: '--font-Plus-Jakarta-sans'
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${styles.container} ${PlusJakartaSans.className}`}>
        {children}
      </body>
    </html>
  );
}
