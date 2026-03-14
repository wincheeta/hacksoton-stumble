
interface Props {
    pubName : string,
    image : string
}

export const PubCard = ( {pubName, image} : Props ) => {
    return (<div className="w-4/5 flex flex-col items-left gap-8 px-10 py-10 self-center rounded-xl bg-gray-200">
        <div className="text-6xl font-bold">
            {pubName}
        </div>
        <img src={image} className="w-max"></img>
    </div>)
}