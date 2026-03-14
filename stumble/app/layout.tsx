"use client"
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ContextBaby from "./contextBaby";
import { useState, useContext, createContext, Component} from "react";

export const ChoiceContext = createContext<{choices: number[]; setChoices: (choices: number[]) => void}>({choices: [], setChoices: (x : any) => {}});

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

  const [choices, setChoices] = useState<number[]>([]);

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
