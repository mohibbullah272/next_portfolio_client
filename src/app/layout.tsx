import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ParticlesBackground from "@/components/ParticlesBackground";
import  { Toaster } from 'react-hot-toast';
import AuthProvider from "@/providers/AuthProvider";

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
        className={ ` dark ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ParticlesBackground></ParticlesBackground>
    
        <main className="relative z-10 ">
          <AuthProvider>
          {children}
          </AuthProvider>
          
          </main>
    <Toaster></Toaster>
      </body>
    </html>
  );
}
