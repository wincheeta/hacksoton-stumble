'use client'
import { useDrag } from '@use-gesture/react';
import { useSpring, animated } from '@react-spring/web';
import { PubInfo } from "../pubinfo"

interface Props {
    info: PubInfo
}

export const PubCard = ( { info } : Props ) => {
    const [style, api] = useSpring(() => ({x : 0}));
    const bind = useDrag(({ down, movement: [mx]}) => {
      api.start({x: down ? mx : 0});
    })
    return (
      <animated.div {...bind()} className="w-4/5 flex flex-col items-left gap-8 px-10 py-10 self-center rounded-xl bg-gray-200 select-none drag-none" style={style}>
        <div className="text-6xl font-bold">
          {info.name}
        </div>
        <img src={info.image} className="w-max self-center rounded-lg" draggable="false"></img>
      </animated.div>
      )
}
