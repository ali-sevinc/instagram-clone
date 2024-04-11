import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/features/layout/Header";
import SessionWrapper from "@/features/auth/SessionWrapper";
import Main from "@/features/ui/Main";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Instagram with NextJS",
  description: "an Instagram clone built with NextJS and TailwindCSS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionWrapper>
      <html lang="en">
        <body className={inter.className}>
          <Header />
          <Main>{children}</Main>
        </body>
      </html>
    </SessionWrapper>
  );
}
