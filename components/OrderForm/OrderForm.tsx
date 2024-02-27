import classNames from "classnames";
import React, { useState, useEffect, useContext } from "react";
import { CollapsIcon } from "../Icons";
import Link from "next/link";
import LocationForm from "./LocationForm";
import MoreDetailsForm from "./MoreDetailsForm";
import OrderNotification from "./OrderNotification";
import { motion } from "framer-motion";
import { FormattedMessage, useIntl } from "react-intl";

const OrderForm = ({ toggleCollapse, setToggleCollapse }) => {
  const [toggleCollapse2, setToggleCollapse2] = useState(false);
  const [currentForm, setCurrentForm] = useState<number>(0);
  const [showNotification, setShowNotification] = useState(false);
  const intl = useIntl();
  const [shake, setshake] = useState(false);

  //State for LocationForm
  interface FormValues {
    name: string;
    phoneNum: string;
    address: string;
  }
  interface ErrorValues {
    name: string;
    phoneNum: string;
    address: string;
  }
  const initialValues: FormValues = { name: "", phoneNum: "", address: "" };
  const initialValues2: FormValues = { name: "", phoneNum: "", address: "" };
  const [formValues, setFormValues] = useState<FormValues>(initialValues);
  const [formErrors, setFormErrors] = useState<ErrorValues>(initialValues);
  const [formValues2, setFormValues2] = useState<FormValues>(initialValues2);
  const [formErrors2, setFormErrors2] = useState<ErrorValues>(initialValues2);
  const [selectedOption1, setSelectedOption1] = useState<string>("");
  const [selectedOption2, setSelectedOption2] = useState<string>("");

  //State for MoreDetailsForm
  const [selectedOption3, setSelectedOption3] = useState<string>("");
  const [selectedOption4, setSelectedOption4] = useState<string>("");
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);
  const [length, setLength] = useState(0);
  const [formErrors3, setFormErrors3] = useState({
    goods: "",
    mass: "",
    dimensions: "",
  });

  const wrapperClasses = classNames(
    "relative bottom-0 px-4 pt-10 pb-4 ml-2 lg:ml-4  mt-2 lg:mt-4 bg-formBgColor-parent flex flex-col justify-between rounded-2xl z-20",
    {
      "h-[calc(100%-1rem)] sm:w-[calc(100%-1rem)] lg:h-[calc(100%-2rem)] md:w-4/6 lg:w-7/12 xl:w-[calc(45%)] w-[calc(100%-1rem)]":
        !toggleCollapse,
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

  const validate = (values: FormValues, type: number) => {
    const PhoneRegex = /^\d+$/;
    if (type == 1 && !values.name) {
      formErrors.name = intl.formatMessage({
        id: "OrderForm.LocationForm.error1",
      });
    }
    if (type == 2 && !values.address) {
      formErrors.address = intl.formatMessage({
        id: "OrderForm.LocationForm.error2",
      });
    }
    if (type == 3) {
      if (values.phoneNum === "") {
        formErrors.phoneNum = intl.formatMessage({
          id: "OrderForm.LocationForm.error3",
        });
      } else if (
        values.phoneNum[0] != "0" ||
        !PhoneRegex.test(values.phoneNum)
      ) {
        formErrors.phoneNum = intl.formatMessage({
          id: "OrderForm.LocationForm.error4",
        });
      } else if (values.phoneNum.length < 10) {
        formErrors.phoneNum = intl.formatMessage({
          id: "OrderForm.LocationForm.error5",
        });
      } else if (values.phoneNum.length > 10) {
        formErrors.phoneNum = intl.formatMessage({
          id: "OrderForm.LocationForm.error6",
        });
      }
    }
  };

  const validate2 = (values: FormValues, type: number) => {
    const PhoneRegex = /^\d+$/;
    if (type == 1 && !values.name) {
      formErrors2.name = intl.formatMessage({
        id: "OrderForm.LocationForm.error1",
      });
    }
    if (type == 2 && !values.address) {
      formErrors2.address = intl.formatMessage({
        id: "OrderForm.LocationForm.error2",
      });
    }
    if (type == 3) {
      if (values.phoneNum === "") {
        formErrors2.phoneNum = intl.formatMessage({
          id: "OrderForm.LocationForm.error3",
        });
      } else if (
        values.phoneNum[0] != "0" ||
        !PhoneRegex.test(values.phoneNum)
      ) {
        formErrors2.phoneNum = intl.formatMessage({
          id: "OrderForm.LocationForm.error4",
        });
      } else if (values.phoneNum.length < 10) {
        formErrors2.phoneNum = intl.formatMessage({
          id: "OrderForm.LocationForm.error5",
        });
      } else if (values.phoneNum.length > 10) {
        formErrors2.phoneNum = intl.formatMessage({
          id: "OrderForm.LocationForm.error6",
        });
      }
    }
  };

  const validate3 = () => {
    if (selectedOption3 == "") {
      formErrors3.goods = intl.formatMessage({
        id: "OrderForm.MoreDetailsForm.error1",
      });
    } else formErrors3.goods = "";
    if (selectedOption4 == "") {
      formErrors3.mass = intl.formatMessage({
        id: "OrderForm.MoreDetailsForm.error2",
      });
    } else formErrors3.mass = "";
    if (height == 0 || length == 0 || width == 0) {
      formErrors3.dimensions = intl.formatMessage({
        id: "OrderForm.MoreDetailsForm.error3",
      });
    } else formErrors3.dimensions = "";
  };

  const handleAddress = async () => {
    validate(formValues, 2);
  };

  const handleAddress2 = async () => {
    validate2(formValues2, 2);
  };

  const handleName = async () => {
    validate(formValues, 1);
  };

  const handleNum = async () => {
    validate(formValues, 3);
  };

  const handleName2 = async () => {
    validate2(formValues2, 1);
  };

  const handleNum2 = async () => {
    validate2(formValues2, 3);
  };

  const handleSubmitButton = () => {
    if (currentForm == 0) {
      handleAddress();
      handleName();
      handleNum();
      handleAddress2();
      handleName2();
      handleNum2();

      if (
        formErrors.name !== "" ||
        formErrors.phoneNum !== "" ||
        formErrors.address !== ""
      ) {
        setshake(true);
        return;
      } else if (
        formErrors2.name !== "" ||
        formErrors2.phoneNum !== "" ||
        formErrors2.address !== ""
      ) {
        setshake(true);
        return;
      } else {
        setshake(false);
        setCurrentForm(currentForm + 1);
      }
    } else if (currentForm == 1) {
      validate3();
      if (
        formErrors3.mass != "" ||
        formErrors3.goods != "" ||
        formErrors3.dimensions != ""
      ) {
        setshake(true);
        return;
      } else {
        setshake(false);
        setShowNotification(true);
      }
    }
  };

  const handleGoBackButton = () => {
    setCurrentForm(currentForm - 1);
    setshake(false);
  };

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

  useEffect(() => {
    if (currentForm == 0) {
      if (
        formErrors.name == "" &&
        formErrors.phoneNum == "" &&
        formErrors.address == "" &&
        formErrors2.name == "" &&
        formErrors2.phoneNum == "" &&
        formErrors2.address == ""
      ) {
        setshake(false);
      }
    }
  }, [formErrors, formErrors2]);

  return (
    <div className="absolute top-0 h-full w-full">
      <div
        className={wrapperClasses}
        style={{
          transition:
            "width 500ms cubic-bezier(0.2, 0, 0, 1) 0s, height 500ms cubic-bezier(0.2, 0, 0, 1) 0s",
        }}
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
                <FormattedMessage id="OrderForm.GoBack" />
              </motion.button>
            </div>
          )}
          {!toggleCollapse && !toggleCollapse2 && currentForm == 0 && (
            <LocationForm
              formValues={formValues}
              setFormValues={setFormValues}
              formErrors={formErrors}
              setFormErrors={setFormErrors}
              formValues2={formValues2}
              setFormValues2={setFormValues2}
              formErrors2={formErrors2}
              setFormErrors2={setFormErrors2}
              selectedOption1={selectedOption1}
              setSelectedOption1={setSelectedOption1}
              selectedOption2={selectedOption2}
              setSelectedOption2={setSelectedOption2}
            />
          )}
          {!toggleCollapse && !toggleCollapse2 && currentForm == 1 && (
            <MoreDetailsForm
              selectedOption3={selectedOption3}
              setSelectedOption3={setSelectedOption3}
              selectedOption4={selectedOption4}
              setSelectedOption4={setSelectedOption4}
              height={height}
              setHeight={setHeight}
              width={width}
              setWidth={setWidth}
              length={length}
              setLength={setLength}
              formErrors3={formErrors3}
              setFormErrors3={setFormErrors3}
              currentForm={currentForm}
              setshake={setshake}
            />
          )}
          {!toggleCollapse && !toggleCollapse2 && currentForm < 2 && (
            <div className="flex flex-col justify-start self-center w-full rounded-2xl">
              <div className="flex flex-col justify-start self-center w-full rounded-2xl">
                <h1 className="mt-2 xs:mt-2 text-xs text-black cursor-default hidden sm:block">
                  <FormattedMessage id="OrderForm.Compensation" />
                </h1>
                <Link
                  href="/order"
                  className="text-xs underline pt-2 sm:pt-1 text-link-text text-nowrap"
                >
                  <FormattedMessage id="OrderForm.Policy" />
                </Link>
              </div>

              <button
                className={`self-center w-full rounded-lg mt-3 py-3 bg-buttonColorForm-default hover:bg-buttonColorForm-hover text-buttonColorForm-text ${
                  shake ? "animate-shake bg-gray-500 hover:bg-gray-500" : ""
                }`}
                onClick={handleSubmitButton}
              >
                <FormattedMessage id="OrderForm.Continue" />
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
