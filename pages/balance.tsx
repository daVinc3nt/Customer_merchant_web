import type { NextPage } from "next";
import BalancePage from "../components/BalancePage/BalancePage";
const Order: NextPage = () => {
  return (
    <div className="relative h-full w-full bg-balanceBgColor-default">
      <BalancePage />
    </div>
  );
};

export default Order;