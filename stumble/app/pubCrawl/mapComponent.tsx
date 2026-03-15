"use client";

import React, { useRef, useEffect } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { Pub } from "./getRoute";

interface MapData {
  routeGeoJSON?: any;
  origin?: Pub | null;
  destination?: Pub | null;
  otherPubs?: Pub[];
  optimisedPubs?: number[];
}

const createNumberedMarker = (name: string) => {
  const el = document.createElement('div');
  el.className = 'marker numbered-marker';
  el.innerText = name;
  el.style.width = '30px';
  el.style.height = '30px';
  el.style.borderRadius = '50%';
  el.style.backgroundColor = '#2563eb';
  el.style.color = 'white';
  el.style.display = 'flex';
  el.style.alignItems = 'center';
  el.style.justifyContent = 'center';
  el.style.fontWeight = 'bold';
  el.style.fontSize = '14px';
  el.style.border = '2px solid white';
  el.style.boxShadow = '0 2px 4px rgba(0,0,0,0.3)';
  el.style.cursor = 'pointer';
  return el;
};

const MapComponent: React.FC<MapData> = ({ 
  routeGeoJSON, 
  origin,
  destination,
  otherPubs = [], 
  optimisedPubs = [] 
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const markersRef = useRef<maplibregl.Marker[]>([]);

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    mapRef.current = new maplibregl.Map({
        container: mapContainerRef.current,
        style: `https://api.maptiler.com/maps/streets-v4/style.json?key=U8lzjiOI789TRj3qlYQ7`,
        center: [-1.404415387462445,50.91117832144455], // Southampton coordinates
        zoom: 13,
    //   pitch: 45,
    //   bearing: -17.6, 
    });

    return () => {
      mapRef.current?.remove();
      mapRef.current = null;
    };
    }, []);

    useEffect(() => {
    const map = mapRef.current;
    
    if (!map || !routeGeoJSON) return;

    const updateRouteAndMarkers = () => {
    // Clean up existing layers if they exist
    const source = map.getSource("route") as maplibregl.GeoJSONSource;

    if (source) {
    source.setData(routeGeoJSON);
    } else {
        map.addSource("route", { type: "geojson", data: routeGeoJSON });

        map.addLayer({
            id: "route-border",
            type: "line",
            source: "route",
            paint: { "line-color": "#1e40af", "line-width": 7, "line-opacity": 0.4 },
        });

        map.addLayer({
            id: "route-line",
            type: "line",
            source: "route",
            paint: { "line-color": "#3b82f6", "line-width": 5, "line-opacity": 0.9 },
        });
      }
    };

    markersRef.current.forEach((marker) => marker.remove());
    const newMarkers: maplibregl.Marker[] = [];

    if (otherPubs.length > 0) {
        const pubsToDraw = optimisedPubs.length > 0 
            ? optimisedPubs.map((index) => otherPubs[index])
            : otherPubs;
        
            
        pubsToDraw.unshift(origin!);
        pubsToDraw.push(destination!);
        pubsToDraw.forEach((pub, i) => {
            const markerEl = createNumberedMarker(i + 1);
            const popup = new maplibregl.Popup({ offset: 25 }).setHTML(`<strong>Pub ${i + 1}: ${pub.name}</strong>`);
            
            const marker = new maplibregl.Marker({ element: markerEl })
                .setLngLat([pub.longitude, pub.latitude])
                .setPopup(popup)
                .addTo(map);
            newMarkers.push(marker);
        });
      }

    markersRef.current = newMarkers;      

    if (map.isStyleLoaded()) {
        updateRouteAndMarkers();
    } else {
        map.once("load", updateRouteAndMarkers);
    }
  }, [routeGeoJSON, origin, destination, otherPubs, optimisedPubs]);

  return (
    <div className='w-full h-full'>
      <div
        ref={mapContainerRef}
        style={{ width: '100%', maxWidth: '800px', height: '500px', borderRadius: '12px' }}
      />
    </div>
  );
};

export default MapComponent;