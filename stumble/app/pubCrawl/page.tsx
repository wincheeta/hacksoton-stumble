"use client";

import { useState } from "react";
import { calculateRoute, Pub } from "./getRoute";
import { decodeRoutePolyline } from "./polylineDecoder";
import MapComponent from "./mapComponent";
import { useContext } from "react";
import { ChoiceContext } from "../layout";
import RouteViewer from "./routeViewer";

export default function PubCrawl() {
  const [routeGeoJSON, setRouteGeoJSON] = useState<any>(null);
  const [origin, setOrigin] = useState<Pub | null>(null);
  const [destination, setDestination] = useState<Pub | null>(null);
  const [otherPubs, setotherPubs] = useState<Pub[]>([]);
  const [optimisedPubs, setoptimisedPubs] = useState<number[]>([]);

    const handleShowRoute = async () => {
        const start : Pub = {name: "mitre", latitude: 50.9267580317646, longitude: -1.3909037625748435 }; 
        const end : Pub = {name: "jesters", latitude: 50.91819492126443, longitude: -1.3952395822603454, };
        
        const pubs : Pub[]= [
            { name: "giddy", latitude: 50.91099766491743, longitude:  -1.4044846195047285 }, 
            { name: "hobbit", latitude: 50.91917963101398, longitude: -1.395235639641838 },
            { name: "london house brewery", latitude: 50.91258583312872, longitude: -1.403600277820489 },
            { name: "the stag", latitude: 50.93473942771124, longitude: -1.3973102315799517},
            { name: "brewhouse and kitchen", latitude: 50.93140505168394, longitude: -1.3998451997593504}
        ];

        setOrigin(start);
        setDestination(end);
        setotherPubs(pubs);

        const route = await calculateRoute(start, end, pubs);

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

  const {choices, setChoices} = useContext(ChoiceContext);
  console.log(choices);

  function makeList()
  {
    return choices.map(c => <li key={c.name}>{c.name}</li>);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-700 items-center">
      <main className="flex gap-10 min-h-screen w-full max-w-3xl flex-col items-center justify-start py-10 px-13 bg-neutral-700 sm:items-start">      
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
      <RouteViewer></RouteViewer>
    </div>
  );
}