import classNames from "classnames";
import React, { useState, useEffect, useContext } from "react";
import { CollapsIcon } from "../Icons";
import Link from "next/link";
import LocationForm from "./LocationForm";
import MoreDetailsForm from "./MoreDetailsForm";
import OrderNotification from "./OrderNotification";
import { motion } from "framer-motion";
import { FormattedMessage, useIntl } from "react-intl";
import { DestinationContext } from "@/context/DestinationContext";
import { SourceContext } from "@/context/SourceContext";

const OrderForm = ({toggleCollapse, setToggleCollapse}) => {
  const [toggleCollapse2, setToggleCollapse2] = useState(false);
  const [currentForm, setCurrentForm] = useState<number>(0);
  const [showNotification, setShowNotification] = useState(false);
  const intl = useIntl();
  const [shake, setshake] = useState(false);
  const { source, setSource } = useContext(SourceContext);
  const { destination, setDestination } = useContext(DestinationContext);

  //State for LocationForm
  interface FormValues { name: string; phoneNum: string; address: string; }
  interface ErrorValues { name: string; phoneNum: string; address: string; }
  const initialValues: FormValues = { name: "", phoneNum: "", address: "" };
  const initialValues2: ErrorValues = { name: "", phoneNum: "", address: "" };
  const [formValues, setFormValues] = useState<FormValues>(initialValues);
  const [formErrors, setFormErrors] = useState<ErrorValues>(initialValues2);
  const [formValues2, setFormValues2] = useState<FormValues>(initialValues);
  const [formErrors2, setFormErrors2] = useState<ErrorValues>(initialValues2);
  const [valueSourceSearchBox, setValueSourceSearchBox] = useState(null);
  const [valueDestinationSearchBox, setValueDestinationSearchBox] = useState(null);
  const [selectedOption1, setSelectedOption1] = useState<string>('');
  const [selectedOption2, setSelectedOption2] = useState<string>('');

  //State for MoreDetailsForm
  const [selectedOption3, setSelectedOption3] = useState<string>('');
  const [selectedOption4, setSelectedOption4] = useState<string>('');
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);
  const [length, setLength] = useState(0);

  const wrapperClasses = classNames(
    "relative bottom-0 px-4 pt-10 pb-4 ml-2 lg:ml-4  mt-2 lg:mt-4 bg-formBgColor-parent flex flex-col justify-between rounded-2xl z-20",
    {
      "h-[calc(100%-1rem)] sm:w-[calc(100%-1rem)] lg:h-[calc(100%-2rem)] md:w-4/6 lg:w-7/12 xl:w-[calc(45%)] w-[calc(100%-1rem)]": !toggleCollapse,
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
    console.log(`1111 ${values}`)
    if (type == 1 && !values.name) {
      formErrors.name = intl.formatMessage({ id: 'OrderForm.LocationForm.error1' });
    }
    if (type == 2 && !values.address) {
      formErrors.address = intl.formatMessage({ id: 'OrderForm.LocationForm.error2' });
      console.log(formErrors.address)
    } 
    else if (type == 2 && values.address) {formErrors.address = ""}
    if (type == 3) {
      if (values.phoneNum === "") {
        formErrors.phoneNum = intl.formatMessage({ id: 'OrderForm.LocationForm.error3' });
      } else if (values.phoneNum[0] != "0" || !PhoneRegex.test(values.phoneNum)) {
        formErrors.phoneNum = intl.formatMessage({ id: 'OrderForm.LocationForm.error4' });
      } else if (values.phoneNum.length < 10) {
        formErrors.phoneNum = intl.formatMessage({ id: 'OrderForm.LocationForm.error5' });
      } else if (values.phoneNum.length > 10) {
        formErrors.phoneNum = intl.formatMessage({ id: 'OrderForm.LocationForm.error6' });
      }
    }
  };

  const validate2 = (values: FormValues, type: number) => {
    const PhoneRegex = /^\d+$/;
    console.log(values)
    if (type == 1 && !values.name) {
      formErrors2.name = intl.formatMessage({ id: 'OrderForm.LocationForm.error1' });
    }
    if (type == 2 && !values.address) {
      formErrors2.address = intl.formatMessage({ id: 'OrderForm.LocationForm.error2' });
    } else if (type == 2 && values.address) {formErrors2.address = ""}
    if (type == 3) {
      if (values.phoneNum === "") {
        formErrors2.phoneNum = intl.formatMessage({ id: 'OrderForm.LocationForm.error3' });
      } else if (values.phoneNum[0] != "0" || !PhoneRegex.test(values.phoneNum)) {
        formErrors2.phoneNum = intl.formatMessage({ id: 'OrderForm.LocationForm.error4' });
      } else if (values.phoneNum.length < 10) {
        formErrors2.phoneNum = intl.formatMessage({ id: 'OrderForm.LocationForm.error5' });
      } else if (values.phoneNum.length > 10) {
        formErrors2.phoneNum = intl.formatMessage({ id: 'OrderForm.LocationForm.error6' });
      }
    }
  };

  const handleAddress = async () => {
    const value = valueSourceSearchBox && valueSourceSearchBox.label ? valueSourceSearchBox.label : "";
    const updatedFormValues = { ...formValues, address: value };
    setFormValues(updatedFormValues);
    validate(formValues, 2);
  };
  
  const handleAddress2 = async () => {
    const value = valueDestinationSearchBox && valueDestinationSearchBox.label ? valueDestinationSearchBox.label : "";
    const updatedFormValues = { ...formValues2, address: value };
    setFormValues2(updatedFormValues);
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
    handleAddress();
    handleName();
    handleNum();
    handleAddress2();
    handleName2();
    handleNum2();
  
    let { name, phoneNum, address } = formErrors;
    if (name !== "" || phoneNum !== "" || address !== "") {
      setshake(true);
      return;
    } else {
      let { name: name2, phoneNum: phoneNum2, address: address2 } = formErrors2;
      if (name2 !== "" || phoneNum2 !== "" || address2 !== "") {
        setshake(true);
        return;
      }
      else {
        setshake(false);
        currentForm < 1 ? setCurrentForm(currentForm + 1) : setShowNotification(true);
      }
    }
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
    <div className="absolute top-0 h-[calc(100%)] w-full">
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
                <FormattedMessage id="OrderForm.GoBack"/>
              </motion.button>

            </div>
          )}
          {!toggleCollapse && !toggleCollapse2 && currentForm == 0 && (
            <LocationForm value={valueSourceSearchBox} 
                          setValue={setValueSourceSearchBox}
                          value2={valueDestinationSearchBox}
                          setValue2={setValueDestinationSearchBox}
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
                          setSelectedOption2={setSelectedOption2}/>
          )}
          {!toggleCollapse && !toggleCollapse2 && currentForm == 1 && (
            <MoreDetailsForm selectedOption3={selectedOption3}
                             setSelectedOption3={setSelectedOption3}
                             selectedOption4={selectedOption4}
                             setSelectedOption4={setSelectedOption4}
                             value={height}
                             setValue={setHeight}
                             value1={width}
                             setValue1={setWidth}
                             value2={length}
                             setValue2={setLength}/>
          )}
          {!toggleCollapse && !toggleCollapse2 && currentForm < 2 && (
            <div className="flex flex-col justify-start self-center w-full rounded-2xl">
              <div className="flex flex-col justify-start self-center w-full rounded-2xl">

                <h1 className="mt-2 xs:mt-2 text-xs text-black cursor-default hidden sm:block"><FormattedMessage id="OrderForm.Compensation"/></h1>
                <Link href="/order" className="text-xs underline pt-2 sm:pt-1 text-link-text text-nowrap">
                  <FormattedMessage id="OrderForm.Policy"/>
                </Link>

              </div>

              <button className={`self-center w-full rounded-lg mt-3 py-3 bg-buttonColorForm-default hover:bg-buttonColorForm-hover text-buttonColorForm-text ${shake? 'animate-shake bg-gray-500 hover:bg-gray-500':''}`} onClick={handleSubmitButton}>
                <FormattedMessage id="OrderForm.Continue"/>
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