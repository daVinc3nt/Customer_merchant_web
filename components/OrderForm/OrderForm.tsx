import classNames from "classnames";
import React, { useState, useEffect } from "react";
import { CollapsIcon } from "../Icons";
import Link from "next/link";
import LocationForm from "./LocationForm";
import MoreDetailsForm from "./MoreDetailsForm";
import OrderNotification from "./OrderNotification";
import { motion } from "framer-motion";

const OrderForm = () => {
  const [toggleCollapse, setToggleCollapse] = useState(false);
  const [toggleCollapse2, setToggleCollapse2] = useState(false);
  const [currentForm, setCurrentForm] = useState<number>(0);
  const [showNotification, setShowNotification] = useState(false);

  const wrapperClasses = classNames(
    "relative bottom-0 px-4 pt-10 pb-4 ml-2 lg:ml-4  mt-2 lg:mt-4 bg-formBgColor-parent flex flex-col justify-between rounded-2xl",
    {
      "h-[calc(100%-1rem)] sm:w-[calc(100%-1rem)] lg:h-[calc(100%-2rem)] md:w-5/6 lg:w-9/12 xl:w-[calc(45%)] w-[calc(100%-1rem)]": !toggleCollapse,
      "w-16 lg:w-20 h-[calc(4rem)] lg:h-[calc(5rem)]": toggleCollapse,
      "@media (min-width: 1152px)": {
        "w-7/12": !toggleCollapse,
      },
    }
  );

  const collapseIconClasses = classNames(
    "-bottom-2 lg:-bottom-6 p-2 lg:p-4 rounded bg-goBackNCollapse-default hover:bg-goBackNCollapse-hover absolute left-0",
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
    <div className="absolute h-[calc(100%)] w-full">
      <div
        className={wrapperClasses}
        style={{ transition: "width 500ms cubic-bezier(0.2, 0, 0, 1) 0s, height 500ms cubic-bezier(0.2, 0, 0, 1) 0s" }}
      >
        <div className="flex flex-col grow h-full">
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

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="px-2 py-1 lg:p-3 rounded bg-goBackNCollapse-default text-goBackNCollapse-text font-medium 
                        hover:bg-goBackNCollapse-hover absolute left-10 lg:left-16 -bottom-2 lg:-bottom-6"
                onClick={handleGoBackButton}
              >
                Quay lại
              </motion.button>

            </div>
          )}
          {!toggleCollapse && !toggleCollapse2 && currentForm == 0 && (
            <LocationForm />
          )}
          {!toggleCollapse && !toggleCollapse2 && currentForm == 1 && (
            <MoreDetailsForm />
          )}
          {!toggleCollapse && !toggleCollapse2 && currentForm < 2 && (
            <div className="flex flex-col justify-start self-center w-full rounded-2xl">
              <div className="flex flex-col justify-start self-center w-full rounded-2xl">

                <h1 className="mt-4 text-xs pb-1 text-black cursor-default">Mức đền bù
                  tối đa cho sự cố
                  hư hỏng, mất hàng của TDLogistic là ... đồng.</h1>
                <Link href="/order" className="text-xs underline  text-link-text text-nowrap">
                  Chính sách đền bù
                </Link>

              </div>

              <button className="self-center w-full rounded-xl my-3 py-3 bg-buttonColorForm-default hover:bg-buttonColorForm-hover text-buttonColorForm-text" onClick={handleSubmitButton}>
                Tiếp tục
              </button>
            </div>
          )}
        </div>

        {showNotification && (
          <OrderNotification onClose={handleNotificationClose} />
        )}

      </div>
    </div>

  );
};

export default OrderForm;