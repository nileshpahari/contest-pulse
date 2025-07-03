import type { Metadata } from "next";
import "@/app/globals.css";
import { Navbar } from "@/components/Navbar";
import { Providers } from "@/components/Providers";
import { GoogleAnalytics as Analytics } from "@next/third-parties/google"

export const metadata: Metadata = {
  title: "Contest Pulse",
  description: "Track upcoming coding contests from Codeforces, LeetCode, CodeChef and more. Bookmark, get notified, and stay prepared.",
  keywords: [
    "contest pulse",
    "coding contests",
    "contest tracker",
    "codeforces",
    "leetcode",
    "codechef",
    "coding calendar",
    "contest calendar",
    "upcoming contests",
    "contest reminders",
    "competitive programming",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className="flex flex-col min-h-screen" suppressHydrationWarning={true}>
        <Providers>
          <Navbar />
          {children}
        </Providers>
        <Analytics gaId="G-W5W68SDS8R" />
      </body>
    </html>
  );
}
