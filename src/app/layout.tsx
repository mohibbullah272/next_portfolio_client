import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ParticlesBackground from "@/components/ParticlesBackground";
import  { Toaster } from 'react-hot-toast';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "M.Dev",
  description: "Full Stack Developer Personal Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={ `max-w-7xl mx-auto dark ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ParticlesBackground></ParticlesBackground>
    
        <main className="relative z-10 ">{children}</main>
    <Toaster></Toaster>
      </body>
    </html>
  );
}
