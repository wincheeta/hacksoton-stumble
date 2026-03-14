import { PubInfo } from "../pubinfo"

interface Props {
    info: PubInfo
}

export function PubCard({ info }: Props) {
    return (<div className="w-4/5 flex flex-col items-left gap-8 px-10 py-10 self-center rounded-xl bg-gray-200">
        <div className="text-6xl font-bold">
            {info.name}
        </div>
        <img src={info.image} className="w-max"></img>
    </div>)
}
