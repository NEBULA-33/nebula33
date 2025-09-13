import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "İkinci Beyin",
  description: "Nebula tarafından geliştirildi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className={inter.className}>
        {children}
        
        {/* Sağ alttaki yazı */}
        <div className="fixed bottom-0 right-0 p-4 text-xs text-gray-500 z-50">
          This software was developed with contributions from Nebula.
        </div>
      </body>
    </html>
  );
}