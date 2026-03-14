"use client";

import { useState } from "react";
import { calculateRoute, RouteInfo } from "./getRoute";
import { decodeRoutePolyline } from "./polylineDecoder";
import MapComponent from "./mapComponent";

export default function PubCrawl() {
  // 1. Create state to hold the decoded GeoJSON
  const [routeGeoJSON, setRouteGeoJSON] = useState<any>(null);

  const handleShowRoute = async () => {
    const route = await calculateRoute(
      {
        latitude: -1.404415387462445, // origin
        longitude: 50.91117832144455,
      },
      {
        latitude: 37.42796133580664, // destination
        longitude: -122.085749655962,
      }
    );

    if (!route?.polyline) return;

    const geoJSON = decodeRoutePolyline(
      route.polyline,
      route.distance,
      route.duration
    );

    console.log("Route Info:", route);
    console.log("Decoded GeoJSON:", geoJSON);

    // 2. Save the GeoJSON into state so it triggers a re-render
    setRouteGeoJSON(geoJSON);
  };

  return (
    <main style={{ fontFamily: 'sans-serif', padding: '2rem' }}>      
      <button 
        onClick={handleShowRoute} 
        style={{ padding: '8px 16px', marginBottom: '16px', cursor: 'pointer' }}
      >
        Show Route
      </button>
      
      {/* 4. Pass the GeoJSON data into the map component as a prop */}
      <MapComponent routeGeoJSON={routeGeoJSON} />
    </main>
  );
}