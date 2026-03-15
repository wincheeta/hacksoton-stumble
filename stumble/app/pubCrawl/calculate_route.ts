import { Pub } from "./getRoute";
import { pubs } from "../pubDate/pubs";

export const getFurthest = (pubs: Pub[]): [Pub, Pub] => {
    if (!pubs || pubs.length < 2) {
        return [{name: "mitre", latitude: 50.9267580317646, longitude: -1.3909037625748435 }, {name: "jesters", latitude: 50.91819492126443, longitude: -1.3952395822603454, }]; 
    }

    let maxDistance = -1;
    let furthestPair: [Pub, Pub] = [pubs[0], pubs[1]];

    for (let i = 0; i < pubs.length; i++) {
        for (let j = i + 1; j < pubs.length; j++) {
            const p1 = pubs[i];
            const p2 = pubs[j];
            
            const distance = Math.sqrt(
                Math.pow(p1.latitude - p2.latitude, 2) + 
                Math.pow(p1.longitude - p2.longitude, 2)
            );

            if (distance > maxDistance) {
                maxDistance = distance;
                furthestPair = [p1, p2];
            }
        }
    }
    return furthestPair;
};

export const getFurthestfrom = (origin: Pub, pubs: Pub[]): Pub => {
    if (!pubs || pubs.length < 2) {
        return {name: "jesters", latitude: 50.91819492126443, longitude: -1.3952395822603454, }; 
    }

    let maxDistance = -1;
    let furthest: Pub = pubs[0];

    for (let i = 0; i < pubs.length; i++) {
            const p2 = pubs[i];
            
            const distance = Math.sqrt(
                Math.pow(origin.latitude - p2.latitude, 2) + 
                Math.pow(origin.longitude - p2.longitude, 2)
            );

            if (distance > maxDistance) {
                maxDistance = distance;
                furthest = p2;
            }
    }
    return furthest;
};

export const getLatestClosingPub = (selectedPubs: Pub[]): Pub => {
    if (!selectedPubs || selectedPubs.length === 0) {
        return {name: "jesters", latitude: 50.91819492126443, longitude: -1.3952395822603454, }; 
    }

    const getClosingMinutes = (timeStr: string): number => {
        if (!timeStr || timeStr === "Closed" || !timeStr.includes("-")) return -1;
        
        const closingPart = timeStr.split("-")[1];
        const [hoursStr, minutesStr] = closingPart.split(":");
        let hours = parseInt(hoursStr, 10);
        const minutes = parseInt(minutesStr, 10);


        if (hours < 10) {
            hours += 24;
        }

        return hours * 60 + minutes;
    };

    const dayOfWeek = new Date().getDay();
    const todayIndex = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

    let latestPub: Pub | null = null;
    let maxClosingTime = -1;

    for (const pub of selectedPubs) {
        const pubData = pubs.find(p => p.name === pub.name);
        
        if (pubData) {
            const todayTimes = pubData.opening_times[todayIndex];
            const closingMinutes = getClosingMinutes(todayTimes);

            if (closingMinutes > maxClosingTime) {
                maxClosingTime = closingMinutes;
                latestPub = pub;
            }
        }
    }

    return latestPub || selectedPubs[0];
};

export const getDistance = (p1: Pub, p2: Pub): number => {
    return Math.sqrt(
                Math.pow(p1.latitude - p2.latitude, 2) + 
                Math.pow(p1.longitude - p2.longitude, 2)
            ); 
};

export const getClosestCluster = (pubs: Pub[], targetCount: number = 6): Pub[] => {
    if (pubs.length <= targetCount) return pubs;

    let bestCluster: Pub[] = [];
    let minClusterScore = Infinity;

    for (const centerPub of pubs) {
        const sortedByDistance = [...pubs].sort((a, b) => 
            getDistance(centerPub, a) - getDistance(centerPub, b)
        );
        
        const candidateCluster = sortedByDistance.slice(0, targetCount);
        
        const score = candidateCluster.reduce((sum, p) => sum + getDistance(centerPub, p), 0);
        
        if (score < minClusterScore) {
            minClusterScore = score;
            bestCluster = candidateCluster;
        }
    }

    return bestCluster;
};