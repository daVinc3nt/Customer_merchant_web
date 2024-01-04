import React from 'react';
import { NextPage } from 'next';
import Report from '../components/ReportStatistic/Reportrun';

const ReportStatistic: NextPage = () => {
  return (
    <div className="rounded-xl h-full w-full ">
      <div className="h-[calc(93%)] bg-gradient-to-b from-gray-100 to-gray-300 rounded-xl  content-center mt-10">
        <Report/>
      </div>
    </div>
  );
}
export default ReportStatistic;
