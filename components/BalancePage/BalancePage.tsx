import React, { useState } from 'react';
const BalancePage = () => {
  return (
    <div className='relative flex flex-col sm:flex-row w-full h-full overflow-y-scroll'>
        <div className='w-96 h-200 flex flex-col p-2'>
          <div className="h-48   mx-1 mt-1 mb-2 bg-white rounded-2xl flex flex-col" style={{
            'boxShadow': '8px 8px 6px -1px rgba(0, 0, 0, 0.1)',
          }}>
            <div className="h-32 bg-orange-500 rounded-t-2xl"></div>
          </div>
          <div className="h-48 my-2 bg-white rounded"></div>
          <div className="h-48 my-2 bg-white rounded"></div>
          <div className="h-48 mt-2 mb-1 bg-white rounded"></div>
        </div>
        <div className='fixed sm:static w-full sm:grow p-3 h-200'>
          <div className="h-[calc(49rem)] sm:h-full bg-white rounded-xl"></div>
        </div>
    </div>
  );
};

export default BalancePage;
