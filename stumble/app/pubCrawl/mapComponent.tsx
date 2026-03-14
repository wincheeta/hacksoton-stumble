"use client";

import React, { useRef, useEffect } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

// Define the props to accept routeGeoJSON
interface MapComponentProps {
  routeGeoJSON?: any;
}

const MapComponent: React.FC<MapComponentProps> = ({ routeGeoJSON }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    mapRef.current = new maplibregl.Map({
      container: mapContainerRef.current,
      style: `https://api.maptiler.com/maps/uk-openzoomstack-road/style.json?key=U8lzjiOI789TRj3qlYQ7`,
      center: [-1.404415387462445,50.91117832144455], // Southampton coordinates
      zoom: 13,
    //   pitch: 45, // Tilt the camera to see 3D buildings better
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

    const addRoute = () => {
      // Clean up existing layers if they exist
      if (map.getSource('route')) {
        if (map.getLayer('route-line')) map.removeLayer('route-line');
        if (map.getLayer('route-border')) map.removeLayer('route-border');
        map.removeSource('route');
      }

      // Add source and layers
      map.addSource('route', {
        type: 'geojson',
        data: routeGeoJSON,
      });

      map.addLayer({
        id: 'route-border',
        type: 'line',
        source: 'route',
        paint: {
          'line-color': '#1e40af',
          'line-width': 7,
          'line-opacity': 0.4,
        },
      });

      map.addLayer({
        id: 'route-line',
        type: 'line',
        source: 'route',
        paint: {
          'line-color': '#3b82f6',
          'line-width': 5,
          'line-opacity': 0.9,
        },
      });
    };

    if (map.isStyleLoaded()) {
      addRoute();
    } else {
      map.once('load', addRoute);
    }

  }, [routeGeoJSON]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div
        ref={mapContainerRef}
        style={{ width: '100%', maxWidth: '800px', height: '500px', borderRadius: '12px' }}
      />
    </div>
  );
};

export default MapComponent;