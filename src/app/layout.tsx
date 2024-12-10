import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Toaster } from "sonner";
import { SessionProvider } from "next-auth/react";
import TanstackQueryProvider from "@/components/TanstackQueryProvider";
import AppContextProvider from "@/components/AppContext";
import { getSubscriptionInformations } from "@/lib/stripe";
import { auth } from "@/auth";

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  const subscriptionInformations = await getSubscriptionInformations(
    session?.user.id,
  );

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-grainy relative flex min-h-screen flex-col antialiased`}
      >
        <SessionProvider>
          <AppContextProvider
            subscriptionInformations={subscriptionInformations}
            authSession={session}
          >
            <TanstackQueryProvider>
              <Header />
              {children}
              <Footer />
              <Toaster
                toastOptions={{
                  unstyled: true,
                  classNames: {
                    loading:
                      "text-amber-700 w-[356px] font-normal bg-white text-sm border-[1px] rounded-lg flex flex-row px-4 py-2 justify-start items-center gap-2",
                    error:
                      "text-rose-700 w-[356px] font-normal bg-white text-sm border-[1px] rounded-lg flex flex-row px-4 py-2 justify-start items-center gap-2",
                    success:
                      "text-green-700 w-[356px] font-normal bg-white text-sm border-[1px] rounded-lg flex flex-row px-4 py-2 justify-start items-center gap-2",
                    info: "text-blue-700 w-[356px] bg-white font-normal text-sm border-[1px] rounded-lg flex flex-row px-4 py-2 justify-start items-center gap-2",
                  },
                }}
              />
            </TanstackQueryProvider>
          </AppContextProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
