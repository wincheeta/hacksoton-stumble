import Image from "next/image";
import { PubCard } from "./pubCard";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans items-center">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-start py-10 px-13 bg-zinc-50 sm:items-start">

        <h1 className="text-9xl center text-center w-full mb-20">stumble</h1>

        <PubCard 
          pubName="Jesters" 
          image="window.svg"
        />

      </main>
    </div>
  );
}
