import { pubs } from "../pubDate/pubs";
import { Pub } from "./getRoute";

interface Props {
    routeSequence: Pub[];
    legDurations: number[];
}

export default function RouteViewer({ routeSequence, legDurations }: Props) {
    if (!routeSequence || routeSequence.length === 0) return null;

    const timeToMinutes = (timeStr: string) => {
        const [hours, minutes] = timeStr.split(':').map(Number);
        let total = hours * 60 + minutes;
        if (hours < 10) total += 24 * 60; 
        return total;
    };

    const minutesToTime = (totalMinutes: number) => {
        let normalized = totalMinutes;
        while (normalized < 0) normalized += 24 * 60;
        normalized = normalized % (24 * 60); 

        const hours = Math.floor(normalized / 60);
        const minutes = normalized % 60;
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    };

    const lastPub = routeSequence[routeSequence.length - 1];
    const lastPubInfo = pubs.find((p) => p.name === lastPub.name);
    
    let closingTimeStr = "23:00"; 
    
    if (lastPubInfo) {
        const dayOfWeek = new Date().getDay(); 
        const todayIndex = dayOfWeek === 0 ? 6 : dayOfWeek - 1; 
        const todayTimes = lastPubInfo.opening_times[todayIndex];

        if (todayTimes && todayTimes !== "Closed" && todayTimes.includes("-")) {
            closingTimeStr = todayTimes.split("-")[1]; 
        }
    }

    const arrivalTimes: string[] = [];
    
    const timeInPub = 45;

    let currentMinutes = Math.min(timeToMinutes(closingTimeStr),timeToMinutes("00:00")) - timeInPub; // dont arrive later the midnight that would be silly
    arrivalTimes[routeSequence.length - 1] = minutesToTime(currentMinutes);

    for (let i = routeSequence.length - 2; i >= 0; i--) {
        const walkTime = legDurations[i] || 0; 
        
        currentMinutes = currentMinutes - walkTime - 45;
        arrivalTimes[i] = minutesToTime(currentMinutes);
    }

    return (
        <div className="flex max-w-3xl flex-col bg-neutral-700 sm:items-start gap-5 h-120 overflow-auto my-43 rounded-lg pr-5">
            <h2 className="text-2xl font-bold text-yellow-200">Your Route</h2>
            {routeSequence.map((pub, i) => (
                <div key={i} className="flex flex-col gap-2 w-full">
                    <div className="flex flex-row bg-yellow-200 sm:items-center p-6 justify-between rounded-lg text-neutral-800 font-semibold w-full">
                        <div className="flex flex-row items-center">
                            <span className="mr-2 font-bold whitespace-nowrap">
                                {i === 0 ? "Start:" : i === routeSequence.length - 1 ? "End:" : `Stop ${i + 1}:`}
                            </span>
                            <span>{pub.name}</span>
                        </div>
                        <div className="flex flex-col items-end ml-4">
                            <span className="text-sm text-neutral-600 font-medium whitespace-nowrap">Arrival</span>
                            <span className="text-lg font-bold text-neutral-900">{arrivalTimes[i]}</span>
                        </div>
                    </div>

                    {i < routeSequence.length - 1 && (
                        <div className="flex justify-center w-full text-yellow-200 text-sm font-medium opacity-80 py-1">
                            ↓ {i < 2 ? "walk" : "stumble"} for {legDurations[i] || 0} mins ↓
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}