"use client"
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { useState, createContext } from "react";
import { PubInfo } from "./pubinfo";

export const ChoiceContext = createContext<{choices: PubInfo[]; setChoices: (choices: PubInfo[]) => void}>({choices: [], setChoices: (x : any) => {}});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const [choices, setChoices] = useState<PubInfo[]>([]);

  return (
    <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <ChoiceContext.Provider value={ {choices, setChoices} }>
                      {children}
          </ChoiceContext.Provider>
        </body>
    </html>
  );
}
