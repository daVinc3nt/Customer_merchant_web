import type { NextPage } from "next";
import OrderForm from "../components/OrderForm/OrderForm";
const Order: NextPage = () => {
  return (
    <div className="relative bg-black h-full w-full">
      <OrderForm />
    </div>
  );
};

export default Order;