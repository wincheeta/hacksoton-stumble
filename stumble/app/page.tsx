import Image from "next/image";
import Link from "next/link";


export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-700 items-center">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-start py-10 px-13 bg-neutral-700 sm:items-start">

        <Image src="/StumbledWithText.svg" alt="Stumble Logo" width={200} height={200} className="my-10 w-full center" />

        <div className="flex flex-col w-full items-center gap-10">
          <Link href="/pubDate" className = "flex flex-row w-full h-20 justify-center items-center text-3xl font-bold rounded-xl bg-yellow-200 text-neutral-700 py-5 ">
            Make a new pub crawl
          </Link>
          <Link href="/pubCrawl" className = "flex flex-row w-full h-20 justify-center items-center text-3xl font-bold rounded-xl bg-yellow-200 text-neutral-700 py-5">
            View a pub crawl
          </Link>
        </div>
        

      </main>
    </div>
  );
}
