export interface RouteInfo {
  distance: string;
  duration: string;
  distanceValue: number;
  durationValue: number;
  polyline?: string;
  optimizedOrder?: number[];
  legDurations?: number[];
}
export interface Pub{
    name: string;
    latitude: number;
    longitude: number;
    }

export const calculateRoute = async (
  origin: Pub,
  destination: Pub,
  pubs: Pub[] = []
): Promise<RouteInfo | null> => {
  
  const Norigin = { latitude: origin.latitude, longitude: origin.longitude };
  const Ndestination = { latitude: destination.latitude, longitude: destination.longitude };
  const intermediates = pubs.map(pb => ({
    location: { latLng: { latitude: pb.latitude, longitude: pb.longitude } }
  }));

  const apiKey = "AIzaSyDdOFS4s2OAzrb2pRBzltg71Jre2ow28po"; //hardcoded like a genius

  if (!apiKey) {
    console.error("Google Maps API key is missing!");
    return null;
  }

  const response = await fetch(
    'https://routes.googleapis.com/directions/v2:computeRoutes',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': apiKey,
        'X-Goog-FieldMask':
          'routes.duration,routes.distanceMeters,routes.polyline.encodedPolyline,routes.optimizedIntermediateWaypointIndex,routes.legs.duration',
      },
      body: JSON.stringify({
        origin: { location: { latLng: Norigin } },
        destination: { location: { latLng: Ndestination } },
        intermediates: intermediates, 
        optimizeWaypointOrder: true,  // api to optimises order of pubs inbetween
        travelMode: 'WALK',
        units: 'METRIC',
      }),
    }
  );

  const data = await response.json();

  if (data.error) {
    console.error("Google API Error:", data.error);
    return null;
  }

  if (!data.routes?.length) return null;

  const route = data.routes[0];

  const legDurationsMins = route.legs 
    ? route.legs.map((leg: any) => Math.round(parseInt(leg.duration.replace('s', '')) / 60))
    : [];

  return {
    distance: `${(route.distanceMeters / 1000).toFixed(1)} km`,
    duration: `${Math.round(parseInt(route.duration.replace('s', '')) / 60)} min`,
    distanceValue: route.distanceMeters,
    durationValue: parseInt(route.duration.replace('s', '')),
    polyline: route.polyline?.encodedPolyline,
    optimizedOrder: route.optimizedIntermediateWaypointIndex,
    legDurations: legDurationsMins,
  };
};
