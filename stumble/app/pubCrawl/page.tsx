"use client";

import { useState } from "react";
import { calculateRoute, RouteInfo } from "./getRoute";
import { decodeRoutePolyline } from "./polylineDecoder";
import MapComponent from "./mapComponent";
import { useContext } from "react";
import { ChoiceContext } from "../layout";

export default function PubCrawl() {
  const [routeGeoJSON, setRouteGeoJSON] = useState<any>(null);

  const handleShowRoute = async () => {
    const route = await calculateRoute(
      {
          longitude: -1.404415387462445, // origin giddy
          latitude: 50.91117832144455,
      },
      {
        longitude:  -1.3951937604809677, // dest hobbit
        latitude: 50.91894825435929,
      }
    );
    console.log("Raw Route Info:", route);
    if (!route?.polyline) return;

    const geoJSON = decodeRoutePolyline(
      route.polyline,
      route.distance,
      route.duration
    );

    console.log("Decoded GeoJSON:", geoJSON);

    setRouteGeoJSON(geoJSON);
  };

  const {choices, setChoices} = useContext(ChoiceContext);

  return (
    <main style={{ fontFamily: 'sans-serif', padding: '2rem' }}>      
      <button 
        onClick={handleShowRoute} 
        style={{ padding: '8px 16px', marginBottom: '16px', cursor: 'pointer' }}
      >
        Show Route
      </button>

      <div>
        {choices}
      </div>
      
      <MapComponent routeGeoJSON={routeGeoJSON} />
    </main>
  );
}