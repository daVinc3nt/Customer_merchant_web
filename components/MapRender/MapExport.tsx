import React, { useContext, useRef, useEffect } from "react";
import { LoadScript, GoogleMap, MarkerF } from "@react-google-maps/api";
import { UserLocationContext } from "context/UserLocationContext";
import { motion } from "framer-motion";
import { FiZoomOut, FiZoomIn } from "react-icons/fi";

const MapExport = () => {
  const userLocationContext = useContext(UserLocationContext);

  if (!userLocationContext) {
    throw new Error("UserLocationContext not provided!");
  }

  const { userLocation, setUserLocation } = userLocationContext;
  const mapRef = useRef(null);

  const containerStyle = {
    width: "100%",
    height: "100%",
  };

  const mapOptions = {
    disableDefaultUI: true,
  };

  useEffect(() => {
    if (userLocation && mapRef.current) {
      const map = mapRef.current.state.map;
      const currentLatLng = map.getCenter().toJSON();

      const distance = Math.sqrt(
        Math.pow(currentLatLng.lat - userLocation.lat, 2) +
          Math.pow(currentLatLng.lng - userLocation.lng, 2)
      );

      const duration = Math.min(1000, distance * 200);
        
      map.panTo(userLocation, { duration });
    }
  }, [userLocation]);

  const onMapClick = (event) => {
    setUserLocation({
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    });
  };

  const handleZoomIn = () => {
    const currentZoom = mapRef.current.state.map.getZoom();
    if (currentZoom < 18) {
      mapRef.current.state.map.setZoom(currentZoom + 1);
    }
  };

  const handleZoomOut = () => {
    const currentZoom = mapRef.current.state.map.getZoom();
    if (currentZoom > 8) {
      mapRef.current.state.map.setZoom(currentZoom - 1);
    }
  };

  return (
    <div className="w-full h-full bg-white">
      <LoadScript googleMapsApiKey="AIzaSyDQ0pDRDKSyAO4lm10ttEXa2_uoZmWQzHc">
        <GoogleMap
          ref={mapRef}
          mapContainerStyle={containerStyle}
          options={mapOptions}
          center={userLocation}
          zoom={13}
          onClick={onMapClick}
        >
          {userLocation && (
            <MarkerF
              position={userLocation}
              icon={{
                url: "/placeHolder.png",
                scaledSize: { equals: null, width: 30, height: 50 },
              }}
            />
          )}
        </GoogleMap>

        <div className="absolute bottom-9 right-5 flex flex-col invisible xs:visible">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="text-white text-2xl bg-red-500 p-1 rounded-xl outline outline-white"
            onClick={handleZoomIn}
          >
            <FiZoomIn />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="text-white text-2xl bg-red-500 p-1 rounded-xl mt-1 outline outline-white"
            onClick={handleZoomOut}
          >
            <FiZoomOut/>
          </motion.button>
        </div>
      </LoadScript>
    </div>
  );
};

export default MapExport;
