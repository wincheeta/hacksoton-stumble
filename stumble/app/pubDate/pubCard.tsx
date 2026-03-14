'use client'
import { useDrag } from '@use-gesture/react';
import { useSpring, animated } from '@react-spring/web';

interface Props {
    pubName : string,
    image : string
}

export const PubCard = ( {pubName, image} : Props ) => {
    const [style, api] = useSpring(() => ({x : 0}));
    const bind = useDrag(({ down, movement: [mx]}) => {
      api.start({x: down ? mx : 0});
    })
    return (
      <animated.div {...bind()} className="w-4/5 flex flex-col items-left gap-8 px-10 py-10 self-center rounded-xl bg-gray-200 select-none drag-none" style={style}>
        <div className="text-6xl font-bold">
          {pubName}
        </div>
        <img src={image} className="w-max" draggable="false"></img>
      </animated.div>
      )
}