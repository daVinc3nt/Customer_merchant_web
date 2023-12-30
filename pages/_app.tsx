import "../styles/globals.css";
import type { AppProps } from "next/app";
import NavBar from "../components/NavigationBar/NavBar";
import Wrapper from "../components/LayoutWrapper";
import { LoginPage } from "../components/LoginPage";
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
    <Wrapper>
      <Component {...pageProps} />
    </Wrapper>
    </>
  );
}

export default MyApp;
