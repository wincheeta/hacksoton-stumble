import Map from 'react-map-gl';
import maplibregl from 'maplibre-gl';
// import 'maplibre-gl/dist/maplibre-gl.css';

function App() {
  return ( 
  <div className="absolute overflow-hidden inset-0 bg-mapBg" ref={viewportRef}>
      {allPlacesBounds && (
        <Map
          // {...throttledSetViewState}
          initialViewState={allPlacesBounds}
          ref={e => setMap && setMap(e || undefined)}
          onError={e => onMapError(e)}
          onLoad={onLoad}
          onMove={onMapMove}
          style={{ width: viewportWidth, height: viewportHeight }}
          mapStyle={`https://api.maptiler.com/maps/basic-v2/style.json?key=${AppConfig.map.tileKey}`}
          reuseMaps
          // disable map rotation since it's not correctly calculated into the bounds atm :')
          dragRotate={false}
        >
          {/* <Popups />
          {markerJSXRendering ? <Markers /> : <Layers />}
          <MapControls />
          <SettingsBox />
          <Sidebar />
          <TopBar /> */}
        </Map>
      )}
      {!isMapGlLoaded && (
        <div className="absolute inset-0 bg-mapBg flex justify-center items-center">
          Loading Map...
        </div>
      )}
    </div>
    );
}

export default App;