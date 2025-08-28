import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Synopsize - AI-Powered Text & PDF Summarizer",
  description:
    "Synopsize helps you extract and summarize text from PDFs, images, and documents instantly. Upload your files and get clean, structured insights powered by OCR and AI. Perfect for research, study, and productivity.",
  keywords: [
    "PDF summarizer",
    "image text extractor",
    "OCR tool",
    "document summarizer",
    "AI summaries",
    "text extraction"
  ],
  authors: [{ name: "Uday Singh" }],
  openGraph: {
    title: "Synopsize – AI-Powered Text & PDF Summarizer",
    description:
      "Extract text from PDFs, images, and documents instantly with Synopsize. Get structured AI summaries for study, research, and productivity.",
    url: "https://synopsize-six.vercel.app/", 
    siteName: "Synopsize",
    locale: "en_US",
    type: "website"
  },
  category: "Productivity",
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NavBar />
        {children}
      </body>
    </html>
  );
}
