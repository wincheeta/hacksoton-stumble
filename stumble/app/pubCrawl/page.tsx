"use client";

import { useState, useContext } from "react";
import { calculateRoute, Pub } from "./getRoute";
import { decodeRoutePolyline } from "./polylineDecoder";
import MapComponent from "./mapComponent";
import { ChoiceContext } from "../layout";
import RouteViewer from "./routeViewer";
import { PubInfo } from "../pubinfo";
import { pubs } from "../pubDate/pubs";
import { getFurthest, getClosestCluster, getLatestClosingPub, getFurthestfrom } from "./calculate_route";
import Link from "next/link";
import { href } from "react-router";
import Image from "next/image";

export default function PubCrawl() {
    const [routeGeoJSON, setRouteGeoJSON] = useState<any>(null);
    const [origin, setOrigin] = useState<Pub | null>(null);
    const [destination, setDestination] = useState<Pub | null>(null);
    const [otherPubs, setotherPubs] = useState<Pub[]>([]);
    const [optimisedPubs, setoptimisedPubs] = useState<number[]>([]);
    const [routeSequence, setRouteSequence] = useState<Pub[]>([]); 
    const [routeLegs, setRouteLegs] = useState<number[]>([]);
    
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
      if (choices.length < 2) {
          alert("Please select at least 2 pubs first!");
          return;
      }

      const allPubs : Pub[] = choices.map( p => extractLocation(p) );

      const maxPubs = 6; // increase to 1000 if you want to get rid of clustering

      const clusteredPubs = getClosestCluster(allPubs, maxPubs); // get closes 6 pubs
      const latest = getLatestClosingPub(clusteredPubs); // find last pub - pub that closes last
      const furthestFromLatest = getFurthestfrom(latest!, clusteredPubs); // start further away from there

      const start : Pub = furthestFromLatest;
      const end : Pub = latest;
      const other: Pub[] = clusteredPubs.filter(pub => pub !== start && pub !== end);

      setOrigin(start);
      setDestination(end);
      setotherPubs(other);

      const route = await calculateRoute(start, end, other);
      
      if (!route?.polyline) return;
      setRouteLegs(route.legDurations || []);
      
      const optOrder = route.optimizedOrder || [];
      setoptimisedPubs(optOrder);

      const orderedIntermediates = optOrder.length > 0 
          ? optOrder.map((index) => other[index])
          : other;
      
      setRouteSequence([start, ...orderedIntermediates, end]);

      const geoJSON = decodeRoutePolyline(
          route.polyline,
          route.distance,
          route.duration
      );

      setRouteGeoJSON(geoJSON);
    };

  return (
    <div className="inline-flex w-full min-h-screen items-center justify-center bg-neutral-700">
      <RouteViewer routeSequence={routeSequence} legDurations={routeLegs} /> 
      <main className="flex gap-10 min-h-screen w-full max-w-3xl flex-col items-center justify-start py-10 px-13 bg-neutral-700 sm:items-start">
        <Image src="/StumbledWithText.svg" alt="Stumble Logo" width={200} height={200} className="my-5 w-1/2 self-center" onClick={() => window.location.href="/"} />     
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