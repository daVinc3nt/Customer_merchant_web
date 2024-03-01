import React, { useContext, useRef, useEffect, useState } from "react";
import {
  DirectionsRenderer,
  GoogleMap,
  MarkerF,
  OverlayView,
  OverlayViewF,
} from "@react-google-maps/api";
import { motion } from "framer-motion";
import { FiZoomOut, FiZoomIn } from "react-icons/fi";
import { SourceContext } from "@/context/SourceContext";
import { DestinationContext } from "@/context/DestinationContext";
import { Button } from "@nextui-org/react";
import MapNotification from "./MapNoti/mapNoti";
import { FormattedMessage } from "react-intl";

const MapExport = ({ toggleCollapse }) => {
  const { source, setSource } = useContext(SourceContext);
  const { destination, setDestination } = useContext(DestinationContext);
  const [center, setCenter] = useState({
    lat: 10.816360162758764,
    lng: 106.62860159222816,
  });
  const [openMap, setOpenMap] = useState(false);
  const [type, setType] = useState(null);

  const mapRef = useRef(null);

  const containerStyle = {
    width: "100%",
    height: "100%",
  };

  const mapOptions = {
    disableDefaultUI: true,
    minZoom: 4,
    maxZoom: 18,
  };

  const handleOpenMap = (type: string) => {
    setType(type);
    setOpenMap(true);
  };

  const handleCloseMap = () => {
    setOpenMap(false);
  };

  const calculateDistance = (point1, point2) => {
    const R = 6371;
    const dLat = (point2.lat - point1.lat) * (Math.PI / 180);
    const dLng = (point2.lng - point1.lng) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(point1.lat * (Math.PI / 180)) *
        Math.cos(point2.lat * (Math.PI / 180)) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  useEffect(() => {
    const map = mapRef.current?.state.map;
    if (map) {
      const projection = map.getProjection();

      const getNewLng = (point, offsetX) => {
        const sourcePixel = projection.fromLatLngToPoint(point);
        return projection
          .fromPointToLatLng({
            x: sourcePixel.x - offsetX * (1 / Math.pow(2, map.getZoom())),
            y: sourcePixel.y,
          })
          .lng();
      };

      if (destination && !source) {
        map.setZoom(12);
        map.panTo({
          lat: destination.lat,
          lng: getNewLng(destination, !toggleCollapse ? 250 : 0),
        });
      } else if (source && !destination) {
        map.setZoom(12);
        map.panTo({
          lat: source.lat,
          lng: getNewLng(source, !toggleCollapse ? 250 : 0),
        });
      } else if (source && destination) {
        const midLat = (source.lat + destination.lat) / 2;
        const midLng = (source.lng + destination.lng) / 2;
        const distance = calculateDistance(source, destination);
        const newLng = getNewLng(
          { lat: midLat, lng: midLng },
          !toggleCollapse ? 250 : 0
        );
        map.panTo({ lat: midLat, lng: newLng });
        map.setZoom(
          distance > 1000
            ? distance > 2000
              ? distance > 3000
                ? 3
                : 4
              : 5
            : 7
        );
      }
    }
  }, [source, destination, toggleCollapse]);

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
      {openMap && <MapNotification onClose={handleCloseMap} type={type} />}
      <GoogleMap
        ref={mapRef}
        mapContainerStyle={containerStyle}
        options={mapOptions}
        center={center}
        zoom={11}
      >
        {source && (
          <MarkerF
            position={source}
            icon={{
              url: "/placeHolder.png",
              scaledSize: { equals: null, width: 30, height: 50 },
            }}
          >
            <OverlayViewF
              position={source}
              mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
            >
              <div className="p-2 bg-white whitespace-nowrap border-2 border-red-500 rounded-xl font-semibold text-xs truncate max-w-10">
                <p>{source.label}</p>
                <div className="text-center mt-2">
                  <FormattedMessage id="OrderForm.LocationForm.WrongLocation" />
                </div>
                <div className="w-full flex justify-center">
                  <Button
                    onClick={() => handleOpenMap("source")}
                    className="p-2 mt-1 rounded text-white bg-red-500 hover:bg-red-600"
                  >
                    <FormattedMessage id="OrderForm.LocationForm.ChooseAgain" />
                  </Button>
                </div>
              </div>
            </OverlayViewF>
          </MarkerF>
        )}
        {destination && (
          <MarkerF
            position={destination}
            icon={{
              url: "/placeHolder.png",
              scaledSize: { equals: null, width: 30, height: 50 },
            }}
          >
            <OverlayViewF
              position={destination}
              mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
            >
              <div className="p-2 bg-white whitespace-nowrap border-2 border-red-500 rounded-xl font-semibold text-xs truncate max-w-10">
                <p>{destination.label}</p>
                <div className="text-center mt-2">
                  <FormattedMessage id="OrderForm.LocationForm.WrongLocation" />
                </div>
                <div className="w-full flex justify-center">
                  <Button
                    onClick={() => {
                      handleOpenMap("destination");
                    }}
                    className="p-2 mt-1 rounded text-white bg-red-500 hover:bg-red-600"
                  >
                    <FormattedMessage id="OrderForm.LocationForm.ChooseAgain" />
                  </Button>
                </div>
              </div>
            </OverlayViewF>
          </MarkerF>
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
          <FiZoomOut />
        </motion.button>
      </div>
    </div>
  );
};

export default MapExport;
