import classNames from "classnames";
import React, { useState, useEffect } from "react";
import { CollapsIcon } from "../Icons";
import Link from "next/link";
import LocationForm from "./LocationForm";
import MoreDetailsForm from "./MoreDetailsForm";
import OrderNotification from "./OrderNotification";

const OrderForm = () => {
  const [toggleCollapse, setToggleCollapse] = useState(false);
  const [toggleCollapse2, setToggleCollapse2] = useState(false);
  const [currentForm, setCurrentForm] = useState<number>(0);
  const [showNotification, setShowNotification] = useState(false);

  const wrapperClasses = classNames(
    "relative bottom-0 px-4 pt-10 pb-4 bg-light flex justify-between flex-col rounded-2xl",
    {
      "h-[calc(100%)] sm:w-full md:w-5/6 lg:w-9/12 xl:w-[calc(45%)] w-full": !toggleCollapse,
      "w-20 h-[calc(5rem)]": toggleCollapse,
      "@media (min-width: 1152px)": {
        "w-7/12": !toggleCollapse,
      },
    }
  );

  const collapseIconClasses = classNames(
    "p-4 rounded bg-light-lighter hover:bg-gray-300 absolute left-0",
    {
      "rotate-180": toggleCollapse,
    }
  );

  const handleOrderFormToggle = () => {
    setToggleCollapse(!toggleCollapse);
  };

  const handleSubmitButton = () => {
    (currentForm < 1) ? setCurrentForm(currentForm + 1) : setShowNotification(true);
  };

  const handleGoBackButton = () => {
    setCurrentForm(currentForm - 1);
  }

  const handleNotificationClose = () => {
    setShowNotification(false);
    setCurrentForm(0);
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
      timer = setTimeout(() => {
        setToggleCollapse2(toggleCollapse);
      }, 200);
  
    return () => {
      clearTimeout(timer);
    };
  }, [toggleCollapse]);

  return (
    <div
      className={wrapperClasses}
      style={{ transition: "width 500ms cubic-bezier(0.2, 0, 0, 1) 0s, height 500ms cubic-bezier(0.2, 0, 0, 1) 0s"}}
    >
      <div className="flex flex-col grow h-36">
        <div className="flex items-center justify-between relative">
    
          <button
            className={collapseIconClasses}
            onClick={handleOrderFormToggle}
          >
            <CollapsIcon />
          </button>
            
        </div>
        {!toggleCollapse && !toggleCollapse2 && currentForm > 0 && (
          <div className="flex items-center justify-between relative">
    
          <button
            className="p-3 rounded bg-light-lighter text-gray-600 font-medium hover:bg-gray-300 absolute left-4 lg:left-16"
            onClick={handleGoBackButton}
          >
            Quay lại
          </button>
            
        </div>
        )}
        {!toggleCollapse && !toggleCollapse2 && currentForm == 0 &&(
          <LocationForm />
        )}
        {!toggleCollapse && !toggleCollapse2 && currentForm == 1 &&(
          <MoreDetailsForm />
        )}
        {!toggleCollapse && !toggleCollapse2 && currentForm < 2 &&(
          <div className="flex flex-col justify-start self-center w-full rounded-2xl">
            <div className="flex flex-col justify-start self-center w-full rounded-2xl">
                
              <h1 className="mt-4 text-xs pb-1 text-black cursor-default">Mức đền bù 
              tối đa cho sự cố 
              hư hỏng, mất hàng của TDLogistic là ... đồng.</h1>
              <Link href="/order" className="text-xs underline  text-red-500 text-nowrap">Chính sách đền bù</Link>

            </div>

            <button className="self-center w-full rounded-xl my-3 py-3 bg-red-600 hover:bg-RedGradient text-white" onClick={handleSubmitButton}>
              Tiếp tục
            </button>
          </div>
        )}
      </div>

      {showNotification && (
        <OrderNotification onClose={handleNotificationClose} />
      )}

    </div>
  );
};

export default OrderForm;