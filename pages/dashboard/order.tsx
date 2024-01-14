import type { NextPage } from "next";
import OrderForm from "@/components/OrderForm/OrderForm";
import MapExport from "@/components/MapRender/MapExport";
import { UserLocationContext } from "@/context/UserLocationContext";
import { useState, useEffect } from "react";
import { SourceContext } from "@/context/SourceContext";
import { DestinationContext } from "@/context/DestinationContext";

interface UserLocation {
  lat: number;
  lng: number;
}

const Order: NextPage = () => {
  const [toggleCollapse, setToggleCollapse] = useState(false);
  const [userLocation, setUserLocation] = useState<UserLocation>({
    lat: 10.816360162758764,
    lng: 106.62860159222816,
  });
  const [source, setSource] = useState(null);
  const [destination, setDestination] = useState(null);

  const getUserLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setUserLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  };

  useEffect(() => {
    getUserLocation();
  }, []);
  return (
    <SourceContext.Provider value={{source, setSource}}>
      <DestinationContext.Provider value={{destination, setDestination}}>
        <UserLocationContext.Provider value={{ userLocation, setUserLocation }}>
          <div className="relative h-full w-full">
            <OrderForm toggleCollapse={toggleCollapse} setToggleCollapse={setToggleCollapse}/>
            <MapExport toggleCollapse={toggleCollapse}/>
          </div>
        </UserLocationContext.Provider>
      </DestinationContext.Provider>
    </SourceContext.Provider>
    

  );
};

export default Order;