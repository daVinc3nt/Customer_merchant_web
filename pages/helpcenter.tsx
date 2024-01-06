import type { NextPage } from "next";
import HelpExport from "../components/HelpCenter/HelpExport";
const Helpcenter: NextPage = () => {
  return (
    <div className="rounded-xl h-full w-full  ">
      <div className="h-[calc(93%)] bg-gradient-to-b from-gray-100 to-gray-300 rounded-xl  content-center mt-10 overflow-y-scroll">
        <HelpExport/>
      </div>
    </div>
  );
};

export default Helpcenter;