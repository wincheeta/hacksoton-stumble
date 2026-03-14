export interface RouteInfo {
  distance: string;
  duration: string;
  distanceValue: number;
  durationValue: number;
  polyline?: string;
}

export const calculateRoute = async (
  origin: { latitude: number; longitude: number },
  destination: { latitude: number; longitude: number }
): Promise<RouteInfo | null> => {
  const apiKey =
    process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ||
    process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!apiKey) return null;

  const response = await fetch(
    'https://routes.googleapis.com/directions/v2:computeRoutes',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': "AIzaSyDdOFS4s2OAzrb2pRBzltg71Jre2ow28po",
        'X-Goog-FieldMask':
          'routes.duration,routes.distanceMeters,routes.polyline.encodedPolyline',
      },
      body: JSON.stringify({
        origin: { location: { latLng: origin } },
        destination: { location: { latLng: destination } },
        travelMode: 'DRIVE',
        routingPreference: 'TRAFFIC_AWARE',
        units: 'METRIC',
        computeAlternativeRoutes: false,
        routeModifiers: {
          "avoidTolls": false,
          "avoidHighways": false,
          "avoidFerries": false
        },
      }),
    }
  );

  const data = await response.json();
  if (!data.routes?.length) return null;

  const route = data.routes[0];

  return {
    distance: `${(route.distanceMeters / 1000).toFixed(1)} km`,
    duration: `${Math.round(
      parseInt(route.duration.replace('s', '')) / 60
    )} min`,
    distanceValue: route.distanceMeters,
    durationValue: parseInt(route.duration.replace('s', '')),
    polyline: route.polyline?.encodedPolyline,
  };
};