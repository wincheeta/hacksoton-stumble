import { useContext } from "react"
import { ChoiceContext } from "../layout"
import { pubs } from "../pubDate/pubs"

export default function RouteViewer({ order } : { order : number[] }) {

    const {choices, setChoices} = useContext(ChoiceContext);

    return (
        <div className="flex max-w-3xl flex-col bg-neutral-700 sm:items-start gap-5 h-120 overflow-auto my-43 rounded-lg pr-5">
            { order.map( (x,i) => ( <div key={i} className="flex flex-row bg-yellow-200 sm:items-start p-6 justify-start rounded-lg"> Pub {i + 1}: {pubs[choices[x]].name} </div> ) ) }
        </div>
    )
}