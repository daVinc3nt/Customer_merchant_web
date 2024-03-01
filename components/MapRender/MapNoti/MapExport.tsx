import React, { useContext, useRef, useEffect, useState } from "react";
import {
  GoogleMap,
  MarkerF,
  OverlayView,
  OverlayViewF,
} from "@react-google-maps/api";
import { motion } from "framer-motion";
import { FiZoomOut, FiZoomIn } from "react-icons/fi";
import { SourceContext } from "@/context/SourceContext";
import { DestinationContext } from "@/context/DestinationContext";
import { MdOutlineMyLocation } from "react-icons/md";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { getCoordinates } from "../GetCoordinates";
import { getGeocode } from "../GetLocationAdress";
const MapExport = ({ type }) => {
  const [valueSearchBox, setValueSearchBox] = useState();
  const { source, setSource } = useContext(SourceContext);
  const { destination, setDestination } = useContext(DestinationContext);
  const [center, setCenter] = useState({
    lat: type === "source" ? source.lat : destination.lat,
    lng: type === "source" ? source.lng : destination.lng,
  });

  const [sour, setSour] = useState<any>();
  const [des, setDes] = useState<any>();

  useEffect(() => {
    if (type === "source") {
      getGeocode(source.lat, source.lng)
        .then((address: any) => {
          setSour(address ? address : "");
        })
        .catch((error) => {
          console.error("Đã xảy ra lỗi khi tìm kiếm tọa độ:", error);
        });
    } else if (type === "destination") {
      getGeocode(destination.lat, destination.lng)
        .then((address: any) => {
          setDes(address ? address : "");
        })
        .catch((error) => {
          console.error("Đã xảy ra lỗi khi tìm kiếm tọa độ:", error);
        });
    }
  }, [source, destination]);

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

  const handleMyLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const map = mapRef.current?.state.map;
          if (map) {
            if (type == "destination") {
              setDestination((rest) => ({
                ...rest,
                lat: latitude,
                lng: longitude,
              }));
              map.setZoom(16);
              map.panTo({ lat: destination.lat, lng: destination.lng });
            } else if (type == "source") {
              setSource((rest) => ({
                ...rest,
                lat: latitude,
                lng: longitude,
              }));
              map.setZoom(16);
              map.panTo({ lat: source.lat, lng: source.lng });
            }
          }
        },
        (error) => {
          console.error("Error getting current position:", error);
        }
      );
    }
  };

  const handleSearch = (place: any) => {
    if (place && place?.label) {
      getCoordinates(place.label)
        .then((coordinates: any) => {
          if (coordinates) {
            if (type === "source") {
              setSource((rest) => ({
                ...rest,
                lat: coordinates.lat,
                lng: coordinates.lng,
              }));
            } else if (type === "destination") {
              setDestination((rest) => ({
                ...rest,
                lat: coordinates.lat,
                lng: coordinates.lng,
              }));
            }
          } else {
          }
        })
        .catch((error) => {
          console.error("Đã xảy ra lỗi khi tìm kiếm tọa độ:", error);
        });
    }
  };

  useEffect(() => {
    const map = mapRef.current?.state.map;
    if (map) {
      if (type == "destination") {
        map.setZoom(16);
        map.panTo({ lat: destination.lat, lng: destination.lng });
      } else if (type == "source") {
        map.setZoom(16);
        map.panTo({ lat: source.lat, lng: source.lng });
      }
    }
  }, [source, destination]);

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

  const handleMapClick = (e) => {
    if (type === "source") {
      setSource((rest) => ({
        ...rest,
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
      }));
    } else if (type === "destination") {
      setDestination((rest) => ({
        ...rest,
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
      }));
    }
  };

  return (
    <div className="w-full h-full bg-white">
      <GoogleMap
        ref={mapRef}
        mapContainerStyle={containerStyle}
        options={mapOptions}
        center={center}
        zoom={16}
        onClick={handleMapClick}
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
              <div className="p-1 bg-white whitespace-nowrap border-2 border-[#14141a] rounded font-semibold text-xs truncate max-w-10">
                {sour}
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
              <div className="p-1 px-1 bg-white whitespace-nowrap border-2 border-[#14141a] rounded font-semibold text-xs">
                {des}
              </div>
            </OverlayViewF>
          </MarkerF>
        )}
      </GoogleMap>

      <div className="absolute top-5 left-5 w-[calc(100%-80px)] sm:w-1/2 self-start">
        <GooglePlacesAutocomplete
          selectProps={{
            id: "searchOnMap",
            onChange: (place: any) => {
              setValueSearchBox(place);
              handleSearch(place);
            },
            value: valueSearchBox,
            placeholder: "Search...",
            isClearable: true,
            className: `h-12 w-full border border-gray-300 focus:border-blue-300 rounded text-left pt-1 bg-white`,
            components: {
              DropdownIndicator: null,
              LoadingIndicator: null,
            },
            styles: {
              control: (provided, state) => ({
                ...provided,
                border: "none",
                boxShadow: state.isFocused ? "none" : provided.boxShadow,
                "&:hover": {
                  border: "none",
                },
              }),
              placeholder: (provided) => ({
                ...provided,
                color: "#4a5568",
                fontSize: "0.875rem",
              }),
            },
          }}
        />
      </div>

      <div className="absolute bottom-1/2 translate-y-1/2 right-5 flex flex-col invisible xs:visible items-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className="text-white text-2xl bg-red-500 p-1 rounded-full outline outline-white w-8 h-8"
          onClick={handleZoomIn}
        >
          <FiZoomIn />
        </motion.button>
        <motion.button
          onClick={handleMyLocationClick}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className="text-white text-2xl w-10 h-10 bg-red-500 p-1 rounded-full mt-2 outline outline-white flex justify-center items-center"
        >
          <MdOutlineMyLocation className="w-7 h-7" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className="text-white text-2xl bg-red-500 p-1 rounded-full mt-2 outline outline-white w-8 h-8"
          onClick={handleZoomOut}
        >
          <FiZoomOut />
        </motion.button>
      </div>
    </div>
  );
};

export default MapExport;
