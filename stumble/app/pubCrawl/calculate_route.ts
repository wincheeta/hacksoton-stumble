import { Pub } from "./getRoute";

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