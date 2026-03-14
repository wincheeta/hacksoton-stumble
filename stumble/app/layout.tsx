import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { createContext, useState } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Stumble",
  description: "Dating app for pub crawls",
};

const ChoiceContext = createContext<{choices : number[], setChoices : (choices: number[]) => void}>( {
  choices: [],
  setChoices: () => {}
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const [choices, setChoices] = useState([-999]);

  return (
    <html lang="en">
      <ChoiceContext.Provider value={ {choices, setChoices} }>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          {children}
        </body>
      </ChoiceContext.Provider>
    </html>
  );
}
