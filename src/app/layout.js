import { Suspense } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SiteChrome from "@/components/site-chrome";
import SiteFooter from "@/components/site-footer";
import ToastProvider from "@/components/toast-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "বাজার দর | আজকের বাজারদর",
  description: "বাংলাদেশের নিত্যপ্রয়োজনীয় পণ্যের আজকের দাম, বাজারভিত্তিক তুলনা ও দৈনিক পরিবর্তন এক জায়গায়।",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="bn"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <div id="top" />
        <Suspense fallback={<div className="chrome-loading" aria-hidden="true" />}>
          <SiteChrome />
        </Suspense>
        {children}
        <SiteFooter />
        <ToastProvider />
      </body>
    </html>
  );
}
