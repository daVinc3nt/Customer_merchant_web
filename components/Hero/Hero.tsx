import React from "react";
import Link from "next/link";

interface Props {
  heading: string;
  message: string;
}

const Hero = ({ heading, message }: Props) => {
  return (
    <div className="flex items-center justify-center h-screen mb-12 bg-fixed bg-center bg-cover custom-img">
      <div className="absolute top-0 left-0 right-0 bottom-0 bg-black/70 z-[2]" />
      <div className="p-5 text-white z-[2] mt-[-10rem]">
        <h2 className="text-7xl font-bold">{heading}</h2>
        <p className="py-5 text-xl">{message}</p>
        <a href='/#gallery' className=" rounded-full mt-10 text-center bg-gray-200 text-black font-semibold px-8 py-3 transition-colors duration-300 hover:bg-transparent hover:border-gray-200 hover:border-2 hover:text-white">
          Vào việc thôi!
        </a>
      </div>
    </div>
  );
};

export default Hero;
