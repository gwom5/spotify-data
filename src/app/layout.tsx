import React from "react";
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { Inter } from "next/font/google";
import "./globals.css";
import ReactQueryProvider from "@/lib/Providers/ReactQueryProvider";
import NavigationBar from "@/app/components/Sidebar/NavigationBar";
import { cn } from "@/lib/utils"
import SessionProvider from "@/app/components/SessionProvider/SessionProvider";
import AuthButton from "@/components/AuthButton";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Spotify Data",
  description: "Built by gwom5",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const session = await getServerSession();

  return (
    <html lang="en">
      <body className={cn(`${inter.className} relative flex flex-col  md:flex-row bg-gray-800`, inter.variable)}>
      <ReactQueryProvider>
          <SessionProvider session={session}>
              {session ? (
                  <>
                      <header>
                          <NavigationBar />
                      </header>
                      <main className="container relative md:ml-28 my-6 flex-grow text-white">
                          <div>
                              {children}
                          </div>
                      </main>
                  </>

              ) : (
                      <div className="container flex items-center justify-center">
                        <AuthButton />
                      </div>
                  )}
          </SessionProvider>
      </ReactQueryProvider>
      </body>
    </html>
  );
}
