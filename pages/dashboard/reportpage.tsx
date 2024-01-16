import React from 'react';
import { NextPage } from 'next';
import Report from '@/components/ReportStatistic/Reportrun';

const ReportStatistic: NextPage = () => {
  return (
     <div className=" h-[calc(100vh-3rem)] w-full bg-gradient-to-b from-gray-100 to-gray-300  content-center  ">
        <Report/>
      </div>
  );
}
export default ReportStatistic;
