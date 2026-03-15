import { Pub } from "./getRoute";

interface Props {
    routeSequence: Pub[];
}

export default function RouteViewer({ routeSequence }: Props) {
    if (!routeSequence || routeSequence.length === 0) return null;

    return (
        <div className="flex min-h-screen max-w-3xl flex-col items-center justify-start py-10 px-13 bg-neutral-700 sm:items-start gap-5">
            <h2 className="text-2xl font-bold text-yellow-200">Your Route</h2>
            {routeSequence.map((pub, i) => (
                <div key={i} className="flex flex-row bg-yellow-200 sm:items-start p-6 justify-start rounded-lg text-neutral-800 font-semibold w-full">
                    <span className="mr-2 font-bold">
                        {i === 0 ? "Start:" : i === routeSequence.length - 1 ? "End:" : `Stop ${i + 1}:`}
                    </span>
                    {pub.name}
                </div>
            ))}
        </div>
    );
}