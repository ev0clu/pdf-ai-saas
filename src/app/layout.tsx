import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Toaster } from "sonner";
import { SessionProvider } from "next-auth/react";
import TanstackQueryProvider from "@/components/TanstackQueryProvider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Chat with any PDF document",
  description: "SaaS AI App let you chat with any PDF document",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-grainy relative flex min-h-screen flex-col antialiased`}
      >
        <SessionProvider>
          <TanstackQueryProvider>
            <Header />
            <div className="container mx-auto mt-14 flex flex-1 flex-col justify-center px-4 md:mt-28">
              <main className="flex flex-col items-center gap-5">
                {children}
              </main>
            </div>
            <Footer />
            <Toaster />
          </TanstackQueryProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
