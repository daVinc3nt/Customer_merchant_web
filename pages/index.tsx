import type { NextPage } from "next";
import Head from "next/head";
import Hero from "../components/Hero/Hero";
import Slider from "../components/Slider/Slider";
import { SliderData } from "../components/Slider/SliderData";
import Instagram from "../components/InstagramGallery/Instagram";
import Portfolio from "../components/Portfolio/Portfolio";
// import Footer from "../components/Footer/Footer";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>TDlogistics</title>
        <meta
          name="description"
          content="Created as template for future work"
        />
        <link rel="icon" href="/tabLogo.png" />
      </Head>
      {/* <Slider slides={SliderData} />
      <Instagram />
      <Portfolio /> */}
    </>
  );
};

export default Home;
