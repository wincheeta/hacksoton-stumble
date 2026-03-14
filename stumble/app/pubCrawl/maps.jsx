"use Client";

import {GoogleMap, Marker, useLoadScript, Circle, StandaloneSearchBox} from "@react-google-maps/api"
import {useMemo, useState, useEffect, useRef} from "react"

const GoogleMaps = ({
    radius,
    setLatitude,
    setLongitude,
    style,
    address,
    setAddress,
    latitude,
    longitude,
  }) => {
  const [map, setMap] = useState(null);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyDdOFS4s2OAzrb2pRBzltg71Jre2ow28po",
    libraries: ["places"],
  })
  
  const center = useMemo(() => ({lat: latitude, lng: longitude}), [latitude, longitude])

  const changeCoordinate = (coord, index) => {
    const { latLng } = coord;
    const lat = latLng.lat();
    const lng = latLng.lng();
    setLatitude(lat);
    setLongitude(lng);
  }

  useEffect (() => {
    map?.panTo({ lat: latitude, lng: longitude})
  }, [latitude, longitude])

  const inputRef = useRef();

  const handlePlaceChange= () => {
    const [place] = inputRef.current.getPlaces();
    if (place) {
      setAddress(place.formatted_address)
      setLatitude(place.geometry.location.lat())
      setLongitude(place.geometry.location.lng())
    }
  }

  return (
    <div clasname="w-full h-full">
      {
        !isLoaded ? (
          <h1>Loading...</h1>
        ) : (
          <GoogleMap mapContainerClassName="mapContainer"
          center={center}
          zoom={15}
          onLoad={(map) => setMap(map)}
          >
            <StandaloneSearchBox 
              onLoad={ref => inputRef.current = ref} 
              onPlacesChanged={handlePlaceChange}
            >
              <div className="relative ml48 mt-[10px] w-[500px]">
                <input
                  type="text"
                  className={"form-control w-full rounded-md border-0 bg-white/5 py-1.5 pl-3 pr-3 text-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-white/20 sm:leading-6"}
                  value={address}
                  placeholder="Search for a location"
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
            </StandaloneSearchBox>

            <button
            className=""
            onClick={() => map.panTo({ lat: latitude, lng: longitude})}>
              <span className="material-symbols-outlined">my_location</span>
            </button>
            <Marker
              draggable={true}
              animation={google.maps.Animation.DROP}
              onDrag={changeCoordinate}
              position={{ lat: latitude, lng: longitude }}
              />
              <Circle
                center={{ lat: latitude, lng: longitude }}
                radius={radius}
                fillColor="#FF0000"
                strokeOpacity={0.8}
                strokeColor="#FF0000"
                strokeWeight={2}
                fillOpacity={0.35}
              />
          </GoogleMap>
        )
      }
    </div>
  )
}

export default GoogleMaps