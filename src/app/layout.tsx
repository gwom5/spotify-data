import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import React from "react";
import ReactQueryProvider from "@/lib/Providers/ReactQueryProvider";
import NavigationBar from "@/app/components/Sidebar/NavigationBar";
import { cn } from "@/lib/utils"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Spotify Data",
  description: "Built by gwom5",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <ReactQueryProvider>
        <html lang="en">
          <body className={cn(`${inter.className} relative flex flex-col  md:flex-row bg-gray-800`, inter.variable)}>
              <header>
                  <NavigationBar />
              </header>
              <main className="container relative md:ml-28 my-6 flex-grow text-white">
                  <div>
                      {children}
                  </div>
              </main>
          </body>
        </html>
      </ReactQueryProvider>
  );
}
