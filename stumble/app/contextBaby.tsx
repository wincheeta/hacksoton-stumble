"use client"

// oh my sweet context baby

import { useState, useContext, createContext, Component} from "react";

export const ChoiceContext = createContext<{choices: number[]; setChoices: (choices: number[]) => void}>({choices: [], setChoices: (x : any) => {}});

export default function ContextBaby( therestofthefucking : React.ReactNode ) {
    
    const [choices, setChoices] = useState<number[]>([-999]);

    return (
        <ChoiceContext.Provider value={ {choices, setChoices} }>
            {therestofthefucking}
        </ChoiceContext.Provider>
    )
}