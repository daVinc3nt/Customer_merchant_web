import "@/styles/globals.css";
import type { AppProps } from "next/app";
import NavBar from "@/components/NavigationBar/NavBar";
import Wrapper from "@/components/LayoutWrapper";
import { LoginPage } from "@/components/LoginPage";
import { useRouter } from "next/router";
import { IntlProvider } from "react-intl";
import * as en from "@/lang/en.json"
import * as vi from "@/lang/vi.json"
import { UserLocationContext } from "@/context/UserLocationContext";
import { useState, useEffect } from "react";

interface UserLocation {
  lat: number;
  lng: number;
}

interface UserLocationContextProps {
  userLocation: UserLocation;
  updateUserLocation: (newLocation: UserLocation) => void;
}

function MyApp({ Component, pageProps }: AppProps) {
  const { locale } = useRouter();
  const messages = {
    vi,
    en
  };

  const [userLocation, setUserLocation] = useState<UserLocation>({
    lat: 10.46,
    lng: 106.4,
  });

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
    <IntlProvider locale={locale} messages={messages[locale]}>
       <Wrapper>
        <UserLocationContext.Provider
          value={{ userLocation, setUserLocation }}
        >
          <Component {...pageProps} />
        </UserLocationContext.Provider>
      </Wrapper>
    </IntlProvider>
  );
}

export default MyApp;
