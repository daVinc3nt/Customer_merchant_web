import React, { useContext, useRef, useEffect, useState } from "react";
import { DirectionsRenderer, GoogleMap, MarkerF, OverlayView, OverlayViewF } from "@react-google-maps/api";
import { motion } from "framer-motion";
import { FiZoomOut, FiZoomIn } from "react-icons/fi";
import { SourceContext } from "@/context/SourceContext";
import { DestinationContext } from "@/context/DestinationContext";

const MapExport = () => {
  const { source, setSource } = useContext(SourceContext);
  const { destination, setDestination } = useContext(DestinationContext);
  const [center, setCenter] = useState({
    lat: 10.816360162758764,
    lng: 106.62860159222816,
  })
  const [directionRoutePoints, setdirectionRoutePoints] = useState<google.maps.DirectionsResult>();

  const mapRef = useRef(null);

  const containerStyle = {
    width: "100%",
    height: "100%",
  };

  const mapOptions = {
    disableDefaultUI: true,
  };

  const directionRoute = () => {
    const DirectionsService = new google.maps.DirectionsService();
  
    DirectionsService.route({
      origin: { lat: source.lat, lng: source.lng },
      destination: { lat: destination.lat, lng: destination.lng },
      travelMode: google.maps.TravelMode.DRIVING,
    }, (result, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        setdirectionRoutePoints(result);
      } else {
        console.error("Directions request failed with status:", status);
      }
    });
  }

  useEffect(()=>{
    if(source && mapRef.current && mapRef.current.state.map){
      const map = mapRef.current.state.map;
      const currentLatLng = map.getCenter().toJSON();

      const distance = Math.sqrt(
        Math.pow(currentLatLng.lat - source.lat, 2) +
          Math.pow(currentLatLng.lng - source.lng, 2)
      );

      const duration = Math.min(1000, distance * 200);
      
      map.panTo({
        lat: source.lat,
        lng: source.lng,
      }, { duration });
    }
  },[source])

  useEffect(()=>{
    if(destination && mapRef.current && mapRef.current.state.map){
      const map = mapRef.current.state.map;
      const currentLatLng = map.getCenter().toJSON();

      const distance = Math.sqrt(
        Math.pow(currentLatLng.lat - destination.lat, 2) +
          Math.pow(currentLatLng.lng - destination.lng, 2)
      );

      const duration = Math.min(1000, distance * 200);

      map.panTo({
        lat: destination.lat,
        lng: destination.lng,
      }, { duration });
    }
  },[destination])

  useEffect(() => {
    if (source && destination) {
      directionRoute();
    }
  }, [source, destination, mapRef.current]);

  const handleZoomIn = () => {
    const currentZoom = mapRef.current.state.map.getZoom();
    if (currentZoom < 18) {
      mapRef.current.state.map.setZoom(currentZoom + 1);
    }
  };

  const handleZoomOut = () => {
    const currentZoom = mapRef.current.state.map.getZoom();
    if (currentZoom > 4) {
      mapRef.current.state.map.setZoom(currentZoom - 1);
    }
  };

  return (
    <div className="w-full h-full bg-white">
      <GoogleMap
        ref={mapRef}
        mapContainerStyle={containerStyle}
        options={mapOptions}
        center={center}
        zoom={11}
      >
        {source && <MarkerF
          position={source}
          icon={{
            url: "/placeHolder.png",
            scaledSize: { equals: null, width: 30, height: 50 },
          }}
        >
          <OverlayViewF position={source} mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}>
            <div className="p-2 bg-white whitespace-nowrap border-2 border-red-500 rounded font-semibold text-sm">{source.label}</div>
          </OverlayViewF>
        </MarkerF>}
        {destination && <MarkerF
          position={destination}
          icon={{
            url: "/placeHolder.png",
            scaledSize: { equals: null, width: 30, height: 50 },
          }}
        >
          <OverlayViewF position={destination} mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}>
            <div className="p-2 bg-white whitespace-nowrap border-2 border-red-500 rounded font-semibold text-sm">{destination.label}</div>
          </OverlayViewF>
        </MarkerF>}
        {source && destination && <DirectionsRenderer directions={directionRoutePoints} options={{
          suppressMarkers:true,
        }} />}
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
    </div>
  );
};

export default MapExport;
