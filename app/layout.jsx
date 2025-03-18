import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "react-hot-toast";
import { Toaster as ToasterSonner } from "sonner";
import { Analytics } from "@vercel/analytics/react";
import Footer from "@/components/footer";
import Adsense from "@/components/adsense";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "InterviewAI",
  description: "It is InterviewAI - website to practice interview!",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />
          <link rel="icon" href="/favicon.ico" />
          <link rel="manifest" href="/site.webmanifest" />

          <meta
            name="google-adsense-account"
            content="ca-pub-9989342385772910"
          />
        </head>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          {children}
          <Analytics />
          <Adsense />
          <Footer />

          <Toaster />
          <ToasterSonner />
        </body>
      </html>
    </ClerkProvider>
  );
}
