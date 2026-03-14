"use client"
import { useState } from "react";
import { PubCard } from "./pubCard";
import { pubs } from "./pubs"
import Image from "next/image";
import { publicEncrypt } from "crypto";

export default function Home() {

  const info = useState(() => {
    const i = Math.floor(Math.random() * pubs.length)
    return pubs[i]
  })[0]

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-700 items-center">
        <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-start py-10 px-13 bg-neutral-700 sm:items-start">
    
        <Image src="/StumbledWithText.svg" alt="Stumble Logo" width={200} height={200} className="my-10 w-1/2 self-center" />
    
        <PubCard info={info} />
      </main>
    </div>
  );
}
