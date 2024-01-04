import React from 'react';
import { NextPage } from 'next';
import Order from '../components/OrderHistory/Order';

const OrderHistory: NextPage = () => {
  return (
    <div className="rounded-xl h-full w-full">
    <div className="h-[calc(93%)] bg-gradient-to-b from-gray-100 to-gray-300 rounded-2xl content-center mt-10">
        <Order/>
      </div>
    </div>
  );
};

export default OrderHistory;
