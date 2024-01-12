import type { NextPage } from "next";
import OrderForm from "@/components/OrderForm/OrderForm";
import MapExport from "@/components/MapRender/MapExport";
const Order: NextPage = () => {
  return (
    <div className="relative  h-full w-full">
      <OrderForm />
      <MapExport />
    </div>
  );
};

export default Order;