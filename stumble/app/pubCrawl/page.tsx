"use client";

import { useState } from "react";
import { calculateRoute, Pub } from "./getRoute";
import { decodeRoutePolyline } from "./polylineDecoder";
import MapComponent from "./mapComponent";
import { useContext } from "react";
import { ChoiceContext } from "../layout";

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
//   console.log(choices);

  function makeList()
  {
    return choices.map(c => <li key={c.name}>{c.name}</li>);
  }

  return (
    <main style={{ fontFamily: 'sans-serif', padding: '2rem' }}>      
      <button 
        onClick={handleShowRoute} 
        style={{ padding: '8px 16px', marginBottom: '16px', cursor: 'pointer' }}
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
  );
}