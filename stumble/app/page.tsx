import Image from "next/image";
import { PubCard } from "./pubDate/pubCard";
import Link from "next/link";


export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans items-center">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-start py-10 px-13 bg-zinc-50 sm:items-start">

        <Image src="/Stumble.svg" alt="Stumble Logo" width={200} height={200} className="mb-10" />
        <h1 className="text-9xl center text-center w-full mb-20">stumble</h1>

        <Link href="/pubDate" className="flex flex-row w-full h-20 justify-center items-center text-3xl font-bold rounded-xl bg-gray-200 py-5 mb-20">
            Swipe time
        </Link>

      </main>
    </div>
  );
}
