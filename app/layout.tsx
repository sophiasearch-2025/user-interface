import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import { Mukta_Vaani, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/Footer";

const muktaVaani = Mukta_Vaani({
  variable: "--font-mukta",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sophia Search",
  description: "",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${muktaVaani.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}>
        <Navbar />

        <main className="grow">{children}</main>

        <Footer />
      </body>
    </html>
  );
}
