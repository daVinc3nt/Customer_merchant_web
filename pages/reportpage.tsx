import React from 'react';
import { NextPage } from 'next';
import Report from '../components/ReportStatistic/Reportrun';

const ReportStatistic: NextPage = () => {
  return (
    <div className="rounded-xl h-screen ">
      <div className="h-5/6 bg-gradient-to-b from-gray-100 to-gray-300 rounded-xl overflow-y-scroll content-center mt-10">
        <Report/>
      </div>
    </div>
  );
}
export default ReportStatistic;