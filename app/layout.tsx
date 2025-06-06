import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { ReactQueryClientProvider } from "@/components/react-query-client-provider";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReactQueryClientProvider>
      <html lang="en">
        <body
          className={` ${geistSans.variable} ${geistMono.variable} antialiased px-4 bg-[#f4efe6] text-[#4b3e2a]`}
          style={{
            fontFamily: `'Georgia', serif`,
          }}
        >
          <Header />
          {children}
          <Footer />
        </body>
      </html>
    </ReactQueryClientProvider>
  );
}
