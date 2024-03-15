import React, { useEffect, useState } from "react";
import { FaPlus, FaMinus } from 'react-icons/fa';
import Dropdown from "./Dropdown";
import { motion, Variants } from "framer-motion";
import { FormattedMessage, useIntl } from "react-intl";
import Notification2 from "./Notification2";

const MoreDetailsForm = ({ selectedOption3, setSelectedOption3, length, setLength, width, setWidth, height,
  setHeight, formErrors3, setFormErrors3, setshake, currentForm, mass, setMass, useT60Service, setUseT60Service, COD, setCOD }) => {
  const intl = useIntl();
  const [showNotification, setShowNotification] = useState(false)
  const typesOfDelivery = [
    { value: 'CPN', text: intl.formatMessage({ id: 'OrderForm.MoreDetailsForm.typesOfDelivery1' }) },
    { value: 'TTK', text: intl.formatMessage({ id: 'OrderForm.MoreDetailsForm.typesOfDelivery3' }) },
    { value: 'HTT', text: intl.formatMessage({ id: 'OrderForm.MoreDetailsForm.typesOfDelivery4' }) }
  ];

  const tabContentVariants: Variants = {
    initial: { x: 20, opacity: 0 },
    enter: { x: 0, opacity: 1 },
    exit: { x: -20, opacity: 0 }
  }

  useEffect(() => {
    if (selectedOption3 !== 'CPN') {
      setUseT60Service(false);
    }
  }, [selectedOption3]);

  const handleIncrement = () => {
    setLength((prevValue) => (prevValue + 1));
    validate(3, (length + 1), width, height, selectedOption3, mass);
  };

  const handleDecrement = () => {
    setLength((prevValue) => Math.max(prevValue - 1, 0));
    validate(3, Math.max(length - 1, 0), width, height, selectedOption3, mass);
  };
  const handleIncrement1 = () => {
    setWidth((prevValue) => (prevValue + 1));
    validate(3, length, (width + 1), height, selectedOption3, mass);
  };

  const handleDecrement1 = () => {
    setWidth((prevValue) => Math.max(prevValue - 1, 0));
    validate(3, length, Math.max(width - 1, 0), height, selectedOption3, mass);
  };

  const handleIncrement2 = () => {
    setHeight((prevValue) => (prevValue + 1));
    validate(3, length, width, (height + 1), selectedOption3, mass);
  };

  const handleDecrement2 = () => {
    setHeight((prevValue) => Math.max(prevValue - 1, 0));
    validate(3, length, width, Math.max(height - 1, 0), selectedOption3, mass);
  };

  const handleIncrement3 = () => {
    setMass((prevValue) => (prevValue + 1));
    validate(2, length, width, height, selectedOption3, (mass + 1));
  };

  const handleDecrement3 = () => {
    setMass((prevValue) => Math.max(prevValue - 1, 0));
    validate(2, length, width, height, selectedOption3, Math.max(mass - 1, 0))
  };

  const validate = (type: number, index: number, index1: number, index2: number, drop1: string, index3: number) => {
    if (type == 1 && drop1 == '') {
      formErrors3.goods = intl.formatMessage({ id: 'OrderForm.MoreDetailsForm.error1' });
    } else if (type == 1) formErrors3.goods = ''
    if (type == 2 && index3 == 0) {
      formErrors3.mass = intl.formatMessage({ id: 'OrderForm.MoreDetailsForm.error2' });
    } else if (type == 2) formErrors3.mass = ''
    if (type == 3 && (index == 0 || index1 == 0 || index2 == 0)) {
      formErrors3.dimensions = intl.formatMessage({ id: 'OrderForm.MoreDetailsForm.error3' });
    } else if (type == 3) formErrors3.dimensions = ''

    if (currentForm == 1) {
      if (formErrors3.mass == '' && formErrors3.goods == '' && formErrors3.dimensions == '') {
        setshake(false);
      }
    }
  };

  const handleSelectOption3 = (index: string) => {
    setSelectedOption3(index);
    validate(1, length, width, height, index, mass);
  }

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    if (inputValue === "") {
      event.target.value = 0;
      setCOD(0);
    } else {
      const numericValue = inputValue.replace(/\D/g, '');
      event.target.value = numericValue;
      const value = parseInt(event.target.value);
      setCOD(typeof value === "number" ? value : 0);
    }
  }


  useEffect(() => {
    if (useT60Service == true && (length * height * width) / 6000 < 5) {
      setUseT60Service(false);
      setShowNotification(true)
    }
  }, [useT60Service, length, width, height]);

  return <div className="flex flex-col h-full w-full mt-4 lg:mt-8 border-2 border-red-500 rounded-md overflow-y-auto no-scrollbar scroll-smooth">
    <motion.h1
      variants={tabContentVariants}
      initial="initial"
      animate="enter"
      exit="exit"
      transition={{
        duration: .5
      }}
      className="mt-2 text-2xl font-bold px-4 xs:px-6 text-black text-nowrap cursor-default">
      <FormattedMessage id="OrderForm.MoreDetailsForm.moreDetails" />
    </motion.h1>
    <motion.div
      variants={tabContentVariants}
      initial="initial"
      animate="enter"
      exit="exit"
      transition={{
        duration: .5
      }}
      className="flex flex-col items-stretch self-center w-full xs:w-11/12 mb-5 mt-2 bg-formBgColor-firstChild rounded-2xl"
    >
      <h1 className={`text-sm font-bold pl-5 text-black text-nowrap cursor-default flex flex-col sm:flex-row`}>
        <FormattedMessage id="OrderForm.MoreDetailsForm.CODTitle" />
      </h1>
      <div className="relative self-center w-11/12 mt-4 mb-2">
        <input
          id="COD"
          name="COD"
          type="text"
          value={Intl.NumberFormat('vi-VN', { currency: 'VND' }).format(COD)}
          onChange={(e) => { handleInputChange(e) }}
          className="h-12 self-center w-full border border-gray-300 
                          rounded focus:outline-none focus:ring-2 cursor-default
                          placeholder-gray focus:ring-blue-500 text-black px-3"
          placeholder="Value"
        />
        <label
          htmlFor="COD"
          className="absolute left-3 -top-2.5 bg-white px-1 text-xxs leading-5 text-gray-600 transition-all 
                      peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-700 peer-placeholder-shown:top-3.5 
                      peer-focus:-top-0 peer-focus:leading-5 peer-focus:text-red-500 peer-focus:text-xxs rounded-3xl"
        >
          <FormattedMessage id="OrderForm.MoreDetailsForm.COD" />
        </label>
      </div>

      <h1 className={`text-sm font-bold pl-5 text-black text-nowrap cursor-default flex flex-col sm:flex-row`}>
        <FormattedMessage id="OrderForm.MoreDetailsForm.totalMass" /><p className="text-red-500 text-sm overflow-hidden pr-5 font-normal truncate sm:ml-2">{formErrors3.mass}</p>
      </h1>
      <div className="relative self-center w-11/12 mt-4 mb-2">
        <input
          id="mass"
          name="mass"
          type="text"
          value={mass}
          onChange={(e) => {
            setMass(parseFloat(e.target.value) ? Math.max(parseFloat(e.target.value), 0) : 0);
            validate(2, length, width, height, selectedOption3, parseFloat(e.target.value) ? Math.max(parseFloat(e.target.value), 0) : 0);
          }}
          className="h-12 self-center w-full border border-gray-300 
                          rounded focus:outline-none focus:ring-2 cursor-default
                          placeholder-gray focus:ring-blue-500 text-center text-black"
          placeholder="Value"
        />
        <label
          htmlFor="mass"
          className="absolute left-3 -top-2.5 bg-white px-1 text-xxs leading-5 text-gray-600 transition-all 
                      peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-700 peer-placeholder-shown:top-3.5 
                      peer-focus:-top-0 peer-focus:leading-5 peer-focus:text-red-500 peer-focus:text-xxs rounded-3xl"
        >
          <FormattedMessage id="OrderForm.MoreDetailsForm.mass" />
        </label>
        <button
          className="absolute top-1/2 h-12 w-10 right-0 flex items-center pointer-event-stroke
                          -translate-y-1/2 text-xs hover:text-sm
                          rounded-r-xl"
          onClick={handleIncrement3}
        >
          <FaPlus className="flex text-black w-full border-l-2" />
        </button>
        <button
          className="absolute top-1/2 h-12 w-10 left-0 flex items-center pointer-event-stroke
                          -translate-y-1/2 text-xs hover:text-sm
                          rounded-l-xl"
          onClick={handleDecrement3}
        >
          <FaMinus className="flex text-black w-full border-r-2" />
        </button>
      </div>


      <h1 className={`text-sm font-bold pl-5 text-black text-nowrap cursor-default flex flex-col sm:flex-row`}>
        <FormattedMessage id="OrderForm.MoreDetailsForm.dimensions" /><p className="text-red-500 text-sm overflow-hidden pr-5 font-normal truncate sm:ml-2">{formErrors3.dimensions}</p>
      </h1>
      <div className="flex flex-col sm:flex-row justify-center self-center w-11/12 rounded-2xl my-4">

        <div className="relative self-center sm:grow w-full">
          <input
            id="orderLength1"
            name="orderLength1"
            type="text"
            value={length}
            onChange={(e) => {
              setLength(parseFloat(e.target.value) ? Math.max(parseFloat(e.target.value), 0) : 0);
              validate(3, parseFloat(e.target.value) ? Math.max(parseFloat(e.target.value), 0) : 0, width, height, selectedOption3, mass);
            }}
            className="h-12 self-center w-full border border-gray-300 
                          rounded focus:outline-none focus:ring-2 cursor-default
                          placeholder-gray focus:ring-blue-500 text-center text-black"
            placeholder="Value"
          />
          <label
            htmlFor="orderLength1"
            className="absolute left-3 -top-2.5 bg-white px-1 text-xxs leading-5 text-gray-600 transition-all 
                      peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-700 peer-placeholder-shown:top-3.5 
                      peer-focus:-top-0 peer-focus:leading-5 peer-focus:text-red-500 peer-focus:text-xxs rounded-3xl"
          >
            <FormattedMessage id="OrderForm.MoreDetailsForm.length" />
          </label>
          <button
            className="absolute top-1/2 h-12 w-10 right-0 flex items-center pointer-event-stroke
                          -translate-y-1/2 text-xs hover:text-sm
                          rounded-r-xl"
            onClick={handleIncrement}
          >
            <FaPlus className="flex text-black w-full border-l-2" />
          </button>
          <button
            className="absolute top-1/2 h-12 w-10 left-0 flex items-center pointer-event-stroke
                          -translate-y-1/2 text-xs hover:text-sm
                          rounded-l-xl"
            onClick={handleDecrement}
          >
            <FaMinus className="flex text-black w-full border-r-2" />
          </button>
        </div>

        <div className="relative self-center sm:grow sm:ml-4 w-full mt-4 sm:mt-0">
          <input
            id="orderLength2"
            name="orderLength2"
            type="text"
            value={width}
            onChange={(e) => {
              setWidth(parseFloat(e.target.value) ? Math.max(parseFloat(e.target.value), 0) : 0);
              validate(3, length, parseFloat(e.target.value) ? Math.max(parseFloat(e.target.value), 0) : 0, height, selectedOption3, mass);
            }}
            className="h-12 self-center w-full border border-gray-300 
                          rounded focus:outline-none focus:ring-2 cursor-default
                          placeholder-gray focus:ring-blue-500 text-center text-black"
            placeholder="Value"
          />
          <label
            htmlFor="orderLength2"
            className="absolute left-3 -top-2.5 bg-white px-1 text-xxs leading-5 text-gray-600 transition-all 
                      peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-700 peer-placeholder-shown:top-3.5 
                      peer-focus:-top-0 peer-focus:leading-5 peer-focus:text-red-500 peer-focus:text-xxs rounded-3xl"
          >
            <FormattedMessage id="OrderForm.MoreDetailsForm.width" />
          </label>
          <button
            className="absolute top-1/2 h-12 w-10 right-0 flex items-center pointer-event-stroke
                          -translate-y-1/2 text-xs hover:text-sm
                          rounded-r-xl"
            onClick={handleIncrement1}
          >
            <FaPlus className="flex text-black w-full border-l-2" />
          </button>
          <button
            className="absolute top-1/2 h-12 w-10 left-0 flex items-center pointer-event-stroke
                          -translate-y-1/2 text-xs hover:text-sm
                          rounded-l-xl"
            onClick={handleDecrement1}
          >
            <FaMinus className="flex text-black w-full border-r-2" />
          </button>
        </div>

        <div className="relative self-center sm:grow sm:ml-4 w-full mt-4 sm:mt-0">
          <input
            id="orderLength3"
            name="orderLength3"
            type="text"
            value={height}
            onChange={(e) => {
              setHeight(parseFloat(e.target.value) ? Math.max(parseFloat(e.target.value), 0) : 0);
              validate(3, length, width, parseFloat(e.target.value) ? Math.max(parseFloat(e.target.value), 0) : 0, selectedOption3, mass);
            }}
            className="h-12 self-center w-full border border-gray-300 
                          rounded focus:outline-none focus:ring-2 cursor-default
                          placeholder-gray focus:ring-blue-500 text-center text-black"
            placeholder="Value"
          />
          <label
            htmlFor="orderLength3"
            className="absolute left-3 -top-2.5 bg-white px-1 text-xxs leading-5 text-gray-600 transition-all 
                      peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-700 peer-placeholder-shown:top-3.5 
                      peer-focus:-top-0 peer-focus:leading-5 peer-focus:text-red-500 peer-focus:text-xxs rounded-3xl"
          >
            <FormattedMessage id="OrderForm.MoreDetailsForm.height" />
          </label>
          <button
            className="absolute top-1/2 h-12 w-10 right-0 flex items-center pointer-event-stroke
                          -translate-y-1/2 text-xs hover:text-sm
                          rounded-r-xl"
            onClick={handleIncrement2}
          >
            <FaPlus className="flex text-black w-full border-l-2" />
          </button>
          <button
            className="absolute top-1/2 h-12 w-10 left-0 flex items-center pointer-event-stroke
                          -translate-y-1/2 text-xs hover:text-sm
                          rounded-l-xl"
            onClick={handleDecrement2}
          >
            <FaMinus className="flex text-black w-full border-r-2" />
          </button>
        </div>
      </div>
      <h1 className={`text-sm font-bold pl-5 text-black text-nowrap cursor-default flex flex-col sm:flex-row`}>
        <FormattedMessage id="OrderForm.MoreDetailsForm.typesofdelivery" /><p className="text-red-500 text-sm overflow-hidden pr-5 font-normal truncate sm:ml-2">{formErrors3.goods}</p>
      </h1>
      <Dropdown name={intl.formatMessage({ id: 'OrderForm.MoreDetailsForm.delivery' })} options={typesOfDelivery} selectedOption={selectedOption3} setSelectedOption={handleSelectOption3} />
      {selectedOption3 == 'CPN' && (
        <div className="flex items-center mb-3 justify-center px-2">
          <input
            id="useT60Service"
            type="checkbox"
            checked={useT60Service}
            onChange={() => setUseT60Service(!useT60Service)}
            className="mr-2 cursor-pointer"
          />
          <label htmlFor="useT60Service" className="text-sm text-black cursor-pointer">
            <FormattedMessage id="OrderForm.MoreDetailsForm.typesOfDelivery2" />
          </label>
        </div>
      )}
    </motion.div>
    {showNotification && (
      <Notification2 onClose={() => setShowNotification(false)} />
    )}
  </div>
}

export default MoreDetailsForm;