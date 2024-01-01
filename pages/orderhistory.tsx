import React from 'react';
import { NextPage } from 'next';
import Order from '../components/OrderHistory/Order';

const OrderHistory: NextPage = () => {
  return (
    <div className="rounded-xl h-screen ">
    <div className="h-5/6 bg-gradient-to-b from-gray-100 to-gray-300 rounded-xl overflow-y-scroll content-center mt-10">
        <Order/>
      </div>
    </div>
  );
};

export default OrderHistory;
