import { useContext } from "react"
import { ChoiceContext } from "../layout"
import { pubs } from "../pubDate/pubs"

export default function RouteViewer() {

    const {choices, setChoices} = useContext(ChoiceContext);

    return (
        <div className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-start py-10 px-13 bg-neutral-700 sm:items-start">
            { choices.map( (x,i) => ( <div key={i}> {pubs[x].name} </div> ) ) }
        </div>
    )
}