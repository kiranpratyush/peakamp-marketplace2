import type { Metadata } from "next";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import "../globals.css";
import clsx from "clsx";
import { DM_Serif_Text, Inter, Roboto_Mono } from "next/font/google";
import { Providers } from "./provider";
import { Header } from "@/design-system/sections/header";
import { Footer } from "@/design-system/sections/footer";
import { ClerkProvider } from "@clerk/nextjs";
import { getToastNotification } from "@/lib/server-toast";
import { CookieNotifications } from "./notifications";

const inter = Inter({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-family-body",
});

const dmSerifText = DM_Serif_Text({
  display: "swap",
  subsets: ["latin"],
  weight: "400",
  variable: "--font-family-heading",
});

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-family-mono",
});

const fonts = [inter, dmSerifText, robotoMono];

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const toastNotificationCookieData = await getToastNotification();
  return (
    <html className={clsx(fonts.map((f) => f.variable))} lang="en">
      <body className="flex min-h-screen flex-col">
        <ClerkProvider>
          <NuqsAdapter>
            <Providers>
              {toastNotificationCookieData && (
                <CookieNotifications {...toastNotificationCookieData} />
              )}
              <Header />
              {children}
              <Footer />
            </Providers>
          </NuqsAdapter>
        </ClerkProvider>
      </body>
    </html>
  );
}
