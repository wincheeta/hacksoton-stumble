"use client";

import { useState } from "react";
import { calculateRoute, Pub } from "./getRoute";
import { decodeRoutePolyline } from "./polylineDecoder";
import MapComponent from "./mapComponent";
import { useContext } from "react";
import { ChoiceContext } from "../layout";
import RouteViewer from "./routeViewer";
import { PubInfo } from "../pubinfo";
import { pubs } from "../pubDate/pubs";
import { getFurthest } from "./calculate_route";
import { all } from "axios";
import { set } from "@elevenlabs/elevenlabs-js/core/schemas";


export default function PubCrawl() {
    const [routeGeoJSON, setRouteGeoJSON] = useState<any>(null);
    const [origin, setOrigin] = useState<Pub | null>(null);
    const [destination, setDestination] = useState<Pub | null>(null);
    const [otherPubs, setotherPubs] = useState<Pub[]>([]);
    const [optimisedPubs, setoptimisedPubs] = useState<number[]>([]);
    const {choices, setChoices} = useContext(ChoiceContext);

    const extractLocation = (pubIndex: number): Pub => {
        const pubData : PubInfo = pubs[pubIndex];
        return {
            name: pubData.name,
            latitude: pubData.coordinates[0],
            longitude: pubData.coordinates[1],
        };
    }

    const handleShowRoute = async () => {
      const allPubs : Pub[] = choices.map( p => extractLocation(p) );

      const furthest: [Pub, Pub] = getFurthest(allPubs);
      const start : Pub = furthest[0];
      const end : Pub = furthest[1];
      const other : Pub[] = allPubs.slice(2);

      setOrigin(start);
      setDestination(end);
      setotherPubs(other);

      const route = await calculateRoute(start, end, other);

      if (!route?.polyline) return;
      
      // console.log("Optimal Order:", route.optimizedOrder); 
      setoptimisedPubs(route.optimizedOrder || []);

      const geoJSON = decodeRoutePolyline(
          route.polyline,
          route.distance,
          route.duration
      );

      setRouteGeoJSON(geoJSON);
      };

  return (
    <div className="inline-flex w-full min-h-screen justify-center bg-neutral-700 items-start">
      <RouteViewer order={optimisedPubs}></RouteViewer>
      <main className="flex gap-10 min-h-screen w-full max-w-3xl flex-col items-start justify-start py-10 px-13 bg-neutral-700 sm:items-start">      
        <button 
          onClick={handleShowRoute} 
          className="flex flex-row w-full h-20 justify-center items-center text-3xl font-bold rounded-xl bg-yellow-200 text-neutral-700 py-5"
        >
          Show Route
        </button>
        
        <MapComponent 
          routeGeoJSON={routeGeoJSON}
          origin={origin}
          destination={destination}
          otherPubs={otherPubs}
          optimisedPubs={optimisedPubs}
          />
      </main>
    </div>
  );
}