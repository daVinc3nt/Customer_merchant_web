import * as React from "react";
import Image from "next/image";
import siteMetadata from "../../data/siteMetadata";
function Logo({ fill = "#3B81F6", ...rest }) {
  return (
    <Image
    src={siteMetadata.logoScr}
    alt="/"
    width="40"
    height="40"
    style={{objectFit: "cover"}}
  />
  );
}

export default Logo;
