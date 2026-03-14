'use client'
import { useDrag } from '@use-gesture/react';
import { useSpring, animated } from '@react-spring/web';
import { PubInfo } from "../pubinfo"
import { useState } from 'react';
import Image from 'next/image';

interface Props {
    info: PubInfo
    choiceFunc: (choice: String, pub: number) => void
    ind: number
}

export const PubCard = ( { info, choiceFunc, ind } : Props ) => {
    
    const [style, api] = useSpring(() => ({x : 0}));
    const bind = useDrag(({ active, down, movement: [mx], direction: [xDir] }) => {
      if (mx > 500 && !active) 
      {
        console.log("Nah");
        choiceFunc("No", ind)
      }
      else if (mx < -500 && !active)
      {
        console.log("Yah");
        choiceFunc("Yes", ind)
      }
      api.start({x: down ? mx : 0});
    })


    return (
      <animated.div {...bind()} className="w-full flex flex-col items-left gap-5 px-5 py-5 self-center rounded-xl bg-neutral-500 select-none drag-none absolute" style={ {...style, ...{zIndex: ind} } }>
        <div className='flex flex-col w-full self-center select-none drag-none relative'>
            <div className="text-4xl font-bold text-yellow-200 px-5 py-5 rounded-lg w-max absolute bottom-0 left-0">
                {info.name}
                {info.wetherspoons ? <Image src={"/spoonsCheck.svg"} alt="Wetherspoons" /> : null}
            </div>
                <img src={info.image} className="w-full self-center rounded-lg overlap max-h-70 object-cover" draggable="false"></img>
            
        </div>
        <div className="text-2xl text-yellow-200 rounded-lg w-max">
            Position: {info.location}
            <br></br>
            Rating: {info.rating} / 5.0
        </div>
        <div className = "flex flex-row gap-5 justify-start">
            { info.darts ? <img src="/drunkDarts.svg" className='icon'></img> : null }
            { info.pool ? <img src="/drunkPool.svg" className='icon'></img> : null }
            { info.gambling ? <img src="/drunkGambling.svg" className='icon'></img> : null }
            <div className="icon"></div>
        </div>
      </animated.div>
      )
}
