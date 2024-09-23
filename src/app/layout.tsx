import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.scss";
import styles from './layout.module.scss';
import { Inter, Plus_Jakarta_Sans } from 'next/font/google'
import './styles/ant.tab.scss'

export const metadata: Metadata = {
  title: "Miulai Admin",
  description: "Music App",
  icons: {
    icon: '/icon/tab-icon.svg',
  },
};


const inter = Inter({ subsets: ["latin"] });
const PlusJakartaSans = Plus_Jakarta_Sans({
  weight: [],
  subsets: ['latin'],
  variable: '--font-Plus-Jakarta-sans'
})



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
