'use client'
import { JSX, useState } from "react";
import { PubCard } from "./pubCard";
import { pubs } from "./pubs"
import Image from "next/image";
import AiJail from "../aiJail/page";
import { useEffect, useContext } from "react";
import Link from "next/link";
import { ChoiceContext } from "../layout";

export default function Home() {

  const info = useState(() => {
    const i = Math.floor(Math.random() * pubs.length)
    return pubs[i]
  })[0];

  const [pubList, setPubList] = useState<JSX.Element[]>([]);
  const {choices, setChoices} = useContext(ChoiceContext);

  function addPubChoice(choice : String, pub : number)
  {
    console.log(choice, pub);
    console.log(pubs)
    const pubInfo = pubs[pub]
    console.log(pubInfo)
    setChoices( p => p.concat(pubInfo) );
    setPubList( p => p.filter( (x,i) => x.key != pub.toString() ) );
    console.log(choices)
  }

  useEffect(() => {
    const indList = Array.from({ length: pubs.length}, (_, i) => i);
    indList.sort(() => Math.random() - 0.5);
    const indexList = pubs.map( (i, ind) => ( <PubCard info={i} choiceFunc={addPubChoice} key={ind} ind={ind}/> ) );
    setPubList(indexList);
    }, [])

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-700 items-center">
        <Link href="/aiJail" className = "flex flex-row h-20 justify-center items-center text-3xl font-bold rounded-xl bg-yellow-200 text-neutral-700 py-5 ">
          AI Jail
        </Link>
        <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-start py-10 px-13 bg-neutral-700 sm:items-start">
        <Image src="/StumbledWithText.svg" alt="Stumble Logo" width={200} height={200} className="my-10 w-1/2 self-center" />
        <div className="flex flex-col w-full items-center gap-10">
            <div className="w-full self-center select-none drag-none relative">
            {pubList}
            </div>
        </div>
        <div className = "h-60"></div>
        <div className = "h-60"></div>
        <div className = "h-40"></div>
        <Link href="/pubCrawl" className = "flex flex-row w-full h-20 justify-center items-center text-3xl font-bold rounded-xl bg-yellow-200 text-neutral-700 py-5">
            Make my crawl!
        </Link>
      </main>
    </div>
  );
}
