'use client'
import { useDrag } from '@use-gesture/react';
import { useSpring, animated } from '@react-spring/web';
import { PubInfo } from "../pubinfo"
import { useState } from 'react';

interface Props {
    info: PubInfo
    choiceFunc: (choice: String, pub: String) => void
}

export const PubCard = ( { info, choiceFunc } : Props ) => {
    
    const [style, api] = useSpring(() => ({x : 0}));
    const bind = useDrag(({ active, down, movement: [mx], direction: [xDir] }) => {
      if (mx > 500 && !active) 
      {
        console.log("Nah");
        choiceFunc("No", info.name)
      }
      else if (mx < -500 && !active)
      {
        console.log("Yah");
        choiceFunc("Yes", info.name)
      }
      api.start({x: down ? mx : 0});
    })
    return (
      <animated.div {...bind()} className={`w-4/5 flex flex-col items-left gap-8 px-10 py-10 self-center rounded-xl bg-gray-200 select-none drag-none touch-none ${info.name.length > 0 ? '' : 'hidden'}`} style={style}>
        <div className="text-6xl font-bold">
          {info.name}
        </div>
        <img src={info.image} className="w-max self-center rounded-lg" draggable="false"></img>
      </animated.div>
      )
}
