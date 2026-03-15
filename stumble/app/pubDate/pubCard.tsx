'use client'
import { useDrag } from '@use-gesture/react';
import { useSpring, animated } from '@react-spring/web';
import { PubInfo } from "../pubinfo"
import { ElevenLabsClient, play } from '@elevenlabs/elevenlabs-js';
import { useEffect, useState } from 'react';
import Image from 'next/image';

interface Props {
    info: PubInfo
    choiceFunc: (id: number, b : boolean) => void
    ind: number
}

export const PubCard = ( { info, choiceFunc, ind } : Props ) => {

    const elevenlabs = new ElevenLabsClient({
        apiKey: "sk_c3f70490da750098ba9bc8b9c13dcdc931a987deb68a6994",
    });
    
    /*useEffect(() => {
        const f = async () => {
            const audio = await elevenlabs.textToSpeech.convert(
                'lKMAeQD7Brvj7QCWByqK',
                {
                    text: info.name,
                    modelId: 'eleven_multilingual_v2',
                    outputFormat: 'mp3_44100_128',
                }
            );
            // @ts-expect-error
            await play(audio);
        }
        f()
    })*/
    
    const [style, api] = useSpring(() => ({x : 0}));
    const bind = useDrag(({ active, down, movement: [mx], direction: [xDir] }) => {
      if (mx > 500 && !active) 
      {
        choiceFunc(info.id, false)
      }
      else if (mx < -500 && !active)
      {
        choiceFunc(info.id, true)
      }
      api.start({x: down ? mx : 0});
    })


    return (
      <animated.div {...bind()} className="w-full flex flex-col items-left gap-5 px-5 py-5 self-center rounded-xl bg-neutral-500 select-none drag-none absolute" style={ {...style, ...{zIndex: ind, y: "19rem"} } }>
        <div className='flex flex-col w-full self-center select-none drag-none relative'>
            <div className="flex flex-row gap-4 text-4xl font-bold text-yellow-200 px-5 py-5 rounded-lg w-max absolute bottom-0 left-0">
                <p className="rounded-xl bg-black p-2">{info.name}</p>
                {info.wetherspoons ? <img className="icon" src={"/spoonsCheck.svg"} alt="Wetherspoons" draggable="false"></img> : null}
            </div>
                <img src={info.image} className="w-full self-center rounded-lg overlap max-h-70 object-cover min-h-70" draggable="false"></img>
            
        </div>
        <div className="text-2xl text-yellow-200 rounded-lg w-max">
            <p className="text-wrap w-8/10">Position: {info.location}</p>
            <br></br>
            Rating: {info.rating} / 5.0
        </div>
        <div className = "flex flex-row gap-5 justify-start">
            { info.darts ? <img src="/drunkDarts.svg" className='icon' draggable="false"></img> : null }
            { info.pool ? <img src="/drunkPool.svg" className='icon' draggable="false"></img> : null }
            { info.gambling ? <img src="/drunkGambling.svg" className='icon' draggable="false"></img> : null }
            <div className="icon"></div>
        </div>
      </animated.div>
      )
}
