import React, { useState, useRef, useContext } from "react";
import { HiOutlineChevronDown } from "react-icons/hi";
import { FaUserCircle, FaMobile } from "react-icons/fa";
import CommonDropdown from "./ListBox";
import { motion, Variants } from "framer-motion";
import { FormattedMessage, useIntl } from "react-intl";
import Notification2 from "./Notification2";
import { AdministrativeOperation } from "@/TDLib/tdlogistics";
import { Select, SelectItem } from "@nextui-org/react";

const LocationForm = ({
  formValues,
  setFormValues,
  formErrors,
  setFormErrors,
  formValues2,
  setFormValues2,
  formErrors2,
  setFormErrors2,
  selectedOption1,
  setSelectedOption1,
  selectedOption2,
  setSelectedOption2,
  selectedCity,
  setSelectedCity,
  selectedDistrict,
  setSelectedDistrict,
  selectedWard,
  setSelectedWard,
  selectedCity2,
  setSelectedCity2,
  selectedDistrict2,
  setSelectedDistrict2,
  selectedWard2,
  setSelectedWard2,
  cities,
  districts,
  setDistricts,
  wards,
  setWards,
  districts2,
  setDistricts2,
  wards2,
  setWards2,
}) => {
  const [showNotification, setShowNotification] = useState(false);
  const intl = useIntl();
  const locationOptions = [
    intl.formatMessage({ id: "OrderForm.LocationForm.locationOption1" }),
    intl.formatMessage({ id: "OrderForm.LocationForm.locationOption2" }),
    intl.formatMessage({ id: "OrderForm.LocationForm.locationOption3" }),
    intl.formatMessage({ id: "OrderForm.LocationForm.locationOption4" }),
    intl.formatMessage({ id: "OrderForm.LocationForm.locationOption5" }),
  ];
  const languageText = [
    intl.formatMessage({ id: "OrderForm.LocationForm.enterPickupAddress" }),
    intl.formatMessage({ id: "OrderForm.LocationForm.detailsPickupLocation" }),
    intl.formatMessage({ id: "OrderForm.LocationForm.enterDeliveryAddress" }),
    intl.formatMessage({
      id: "OrderForm.LocationForm.detailsDeliveryLocation",
    }),
  ];

  //Context

  const [isAtBottom, setIsAtBottom] = useState(false);
  const containerRef1 = useRef<HTMLDivElement>(null);

  const tabContentVariants: Variants = {
    initial: { x: -20, opacity: 0 },
    enter: { x: 0, opacity: 1 },
    exit: { x: -20, opacity: 0 },
  };

  const handleInputChange = (key: string, value: string) => {
    setFormValues((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };
  const adminOperation = new AdministrativeOperation();
  const handleProvinceChange = async (e) => {
    setSelectedCity(e.target.value);
    const a = { province: e.target.value }
    handleInputChange("province", e.target.value);
    const response = await adminOperation.get(a);
    setDistricts(response.data);
  };

  const handleDistrictChange = async (e) => {
    setSelectedDistrict(e.target.value);
    const a = { province: selectedCity, district: e.target.value }
    handleInputChange("district", e.target.value);
    const response = await adminOperation.get(a);
    setWards(response.data);
  };
  const handleWardChange = (e) => {
    setSelectedWard(e.target.value);
    handleInputChange("town", e.target.value);
  };

  const handleInputChange2 = (key: string, value: string) => {
    setFormValues2((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleProvinceChange2 = async (e) => {
    setSelectedCity2(e.target.value);
    const a = { province: e.target.value }
    handleInputChange2("province", e.target.value);
    const response = await adminOperation.get(a);
    setDistricts2(response.data);
  };

  const handleDistrictChange2 = async (e) => {
    setSelectedDistrict2(e.target.value);
    const a = { province: selectedCity2, district: e.target.value }
    handleInputChange2("district", e.target.value);
    const response = await adminOperation.get(a);
    setWards2(response.data);
  };
  const handleWardChange2 = (e) => {
    setSelectedWard2(e.target.value);
    handleInputChange2("town", e.target.value);
  };

  const handleAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const updatedFormValues = { ...formValues, address: value };
    setFormValues(updatedFormValues);
    setFormErrors({ ...formErrors, address: validate(updatedFormValues, 2) });
  };

  const handleAddress2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const updatedFormValues = { ...formValues2, address: value };
    setFormValues2(updatedFormValues);
    setFormErrors2({ ...formErrors2, address: validate(updatedFormValues, 2) });
  };

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const updatedFormValues = { ...formValues, name: value };
    setFormValues(updatedFormValues);
    setFormErrors({ ...formErrors, name: validate(updatedFormValues, 1) });
  };

  const handleNum = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedFormValues = { ...formValues, phoneNum: value };
    setFormValues(updatedFormValues);
    setFormErrors({ ...formErrors, phoneNum: validate(updatedFormValues, 3) });
  };

  const handleName2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const updatedFormValues = { ...formValues2, name: value };
    setFormValues2(updatedFormValues);
    setFormErrors2({ ...formErrors2, name: validate(updatedFormValues, 1) });
  };

  const handleNum2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedFormValues = { ...formValues2, phoneNum: value };
    setFormValues2(updatedFormValues);
    setFormErrors2({
      ...formErrors2,
      phoneNum: validate(updatedFormValues, 3),
    });
  };

  const validate = (values, type: number): string => {
    var errors: string = "";
    const PhoneRegex = /^\d+$/;
    if (type == 1 && !values.name) {
      errors = intl.formatMessage({ id: "OrderForm.LocationForm.error1" });
    }
    if (type == 2 && !values.address) {
      errors = intl.formatMessage({ id: "OrderForm.LocationForm.error2" });
    }
    if (type == 3) {
      if (values.phoneNum === "") {
        errors = intl.formatMessage({ id: "OrderForm.LocationForm.error3" });
      } else if (
        values.phoneNum[0] != "0" ||
        !PhoneRegex.test(values.phoneNum)
      ) {
        errors = intl.formatMessage({ id: "OrderForm.LocationForm.error4" });
      } else if (values.phoneNum.length < 10) {
        errors = intl.formatMessage({ id: "OrderForm.LocationForm.error5" });
      } else if (values.phoneNum.length > 10) {
        errors = intl.formatMessage({ id: "OrderForm.LocationForm.error6" });
      }
    }
    return errors;
  };

  return (
    <div className="relative h-full w-full mt-4 lg:mt-8 border-2 border-formBorder-parent rounded-md">
      {!isAtBottom && (
        <motion.button
          variants={{ initial: { opacity: 0 }, enter: { opacity: 1 } }}
          initial="initial"
          animate="enter"
          whileTap={{ opacity: 0, transition: { duration: 0 } }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bg-scrollBottomBt-default p-1 rounded-3xl bottom-3 hover:bg-scrollBottomBt-hover
              right-[calc(50%-1rem)] text-center text-buttonColorForm-text z-30 animate-bounce
              outline outline-scrollBottomBt-outline"
          onClick={() => {
            if (containerRef1.current) {
              containerRef1.current.scrollTo({
                top: containerRef1.current.scrollHeight,
                behavior: "smooth",
              });
            }
          }}
        >
          <HiOutlineChevronDown />
        </motion.button>
      )}
      <div
        ref={containerRef1}
        onScroll={(e) => {
          const target = e.target as HTMLElement;
          const isBottom =
            Math.abs(
              target.scrollHeight - target.scrollTop - target.clientHeight
            ) < 1;
          setIsAtBottom(isBottom);
        }}
        className="bg-formBgColor-firstChild absolute flex flex-col h-full w-full overflow-y-scroll rounded no-scrollbar"
      >
        {showNotification && (
          <Notification2
            onClose={() => {
              setShowNotification(false);
            }}
          />
        )}
        <motion.h1
          variants={tabContentVariants}
          initial="initial"
          animate="enter"
          exit="exit"
          transition={{ duration: 0.5 }}
          className="mt-2 text-2xl pl-4 xs:pl-6 text-headlineText-default font-bold text-nowrap cursor-default"
        >
          <FormattedMessage id="OrderForm.LocationForm.location" />
        </motion.h1>

        <motion.div
          variants={tabContentVariants}
          initial="initial"
          animate="enter"
          exit="exit"
          transition={{ duration: 0.5 }}
          className="bg-formBgColor-secondChild flex flex-col items-stretch self-center w-full xs:w-11/12 mb-5 mt-2 bg-transparent xs:rounded-2xl border-y-2 xs:border-2 border-formBorder-children pb-6"
        >
          <h1 className="mt-4 text-sm font-bold pl-5 text-headlineText-default text-nowrap cursor-default">
            <FormattedMessage id="OrderForm.LocationForm.pickupLocation" />
          </h1>

          <div
            className={`relative self-center w-11/12 ${formErrors.address ? "mb-7" : "mb-2"
              } mt-3`}
          >
            <div className="relative self-center sm:grow w-full">
              <input
                id="sourceAddress"
                name="sourceAddress"
                type="text"
                value={formValues.address}
                onChange={handleAddress}
                placeholder=""
                className={`peer h-12 self-center w-full border border-gray-300 rounded focus:outline-none truncate bg-formBgColor-secondChild
                    ${formErrors.address
                    ? "ring-2 ring-red-500 focus:ring-2 focus:ring-red-500"
                    : "focus:ring-2 focus:ring-blue-500"
                  } 
                    text-left placeholder-transparent pl-3 pt-2 text-headlineText-default pr-12`}
              />
              <label
                htmlFor="sourceAddress"
                className={`absolute left-3 -top-0 text-xxs leading-5 text-gray-600 transition-all 
                    peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-700 peer-placeholder-shown:top-3.5 
                    peer-focus:-top-0 peer-focus:leading-5 peer-focus:text-xxs truncate
                    ${formErrors.address
                    ? "peer-focus:text-red-500"
                    : "peer-focus:text-blue-600"
                  }`}
              >
                <FormattedMessage id="OrderForm.LocationForm.pickupAddress" />
              </label>
              <p className="text-red-500 absolute text-sm overflow-hidden pt-1 truncate">
                {formErrors.address}
              </p>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-2 lg:gap-3 w-11/12 self-center mb-2">
            <Select
              placeholder={intl.formatMessage({ id: "OrderForm.LocationForm.SelectProvince" })}
              classNames={{
                listboxWrapper: "max-h-[300px] min-w-[150px] no-scrollbar",
                trigger: `text-xs md:text-sm text-black h-12 border border-gray-300 focus:outline-none rounded-xl w-full text-center text-black ${formErrors.address ? 'ring-2 ring-red-500 focus:ring-2 focus:ring-red-500' : 'focus:ring-2 focus:ring-blue-500'}`
              }}
              listboxProps={{
                itemClasses: {
                  base: [
                    "rounded-md text-black transition-opacity hover:text-blue-500",
                  ],
                },
              }}
              popoverProps={{
                classNames: {
                  base: "before:bg-white",
                  content: "p-0 bg-white rounded-xl border border-gray-300 min-w-[150px]",
                },
              }}
              id="city"
              aria-label=".form-select-sm"
              value={selectedCity}
              onChange={handleProvinceChange}
            >
              {cities?.map((city) => (
                <SelectItem key={city} value={city}>
                  {city}
                </SelectItem>
              ))}
            </Select>

            <Select
              placeholder={intl.formatMessage({ id: "OrderForm.LocationForm.SelectDistrict" })}
              classNames={{
                listboxWrapper: "max-h-[300px] no-scrollbar",
                trigger: `text-xs md:text-sm text-black h-12 border border-gray-300 focus:outline-none rounded-xl w-full text-center text-black ${formErrors.address ? 'ring-2 ring-red-500 focus:ring-2 focus:ring-red-500' : 'focus:ring-2 focus:ring-blue-500'}`,
              }}
              listboxProps={{
                itemClasses: {
                  base: [
                    "rounded-md text-black transition-opacity hover:text-blue-500",
                  ],
                },
              }}
              popoverProps={{
                classNames: {
                  base: "before:bg-white",
                  content: "p-0 bg-white rounded-xl border border-gray-300",
                },
              }}
              id="district"
              aria-label=".form-select-sm"
              value={selectedDistrict}
              onChange={handleDistrictChange}
            >
              {districts?.map((district) => (
                <SelectItem key={district} value={district}>
                  {district}
                </SelectItem>
              ))}
            </Select>

            <Select
              placeholder={intl.formatMessage({ id: "OrderForm.LocationForm.SelectWard" })}
              classNames={{
                listboxWrapper: "max-h-[300px] no-scrollbar",
                trigger: `text-xs md:text-sm text-black h-12 border border-gray-300 focus:outline-none rounded-xl w-full text-center text-black ${formErrors.address ? 'ring-2 ring-red-500 focus:ring-2 focus:ring-red-500' : 'focus:ring-2 focus:ring-blue-500'}`,
              }}
              listboxProps={{
                itemClasses: {
                  base: [
                    "rounded-md text-black transition-opacity hover:text-blue-500",
                  ],
                },
              }}
              popoverProps={{
                classNames: {
                  base: "before:bg-white",
                  content: "p-0 bg-white rounded-xl border border-gray-300",
                },
              }}
              id="ward"
              aria-label=".form-select-sm"
              value={selectedWard}
              onChange={handleWardChange}
            >
              {wards?.map((ward) => (
                <SelectItem key={ward} value={ward}>
                  {ward}
                </SelectItem>
              ))}
            </Select>
          </div>

          <CommonDropdown
            name={languageText[1]}
            options={locationOptions}
            selectedOption={selectedOption1}
            setSelectedOption={setSelectedOption1}
          />

          <div className="flex flex-col sm:flex-row justify-center self-center w-11/12 rounded-2xl">
            <div className="relative self-center sm:grow w-full">
              <input
                id="orderName"
                name="orderName"
                type="text"
                className={`peer h-12 self-center w-full border border-gray-300 rounded focus:outline-none truncate bg-formBgColor-secondChild
                    ${formErrors.name
                    ? "ring-2 ring-red-500 focus:ring-2 focus:ring-red-500"
                    : "focus:ring-2 focus:ring-blue-500"
                  } 
                    text-left placeholder-transparent pl-3 pt-2 text-headlineText-default pr-12`}
                placeholder=""
                onChange={handleName}
                value={formValues.name}
              />
              <label
                htmlFor="orderName"
                className={`absolute left-3 -top-0 text-xxs leading-5 text-gray-600 transition-all 
                    peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-700 peer-placeholder-shown:top-3.5 
                    peer-focus:-top-0 peer-focus:leading-5 peer-focus:text-xxs truncate
                    ${formErrors.name
                    ? "peer-focus:text-red-500"
                    : "peer-focus:text-blue-600"
                  }`}
              >
                <FormattedMessage id="OrderForm.LocationForm.sendersName" />
              </label>
              <p className="text-red-500 absolute text-sm overflow-hidden pt-1 truncate">
                {formErrors.name}
              </p>
              <button
                className="absolute top-1/2 h-12 w-10 right-0 flex items-center pointer-event-stroke
                    -translate-y-1/2
                    rounded-r-xl"
              >
                <FaUserCircle
                  className={`flex text-gray-500 w-full border-l-2 ${formErrors.name ? "border-red-500" : ""
                    }`}
                />
              </button>
            </div>

            <div
              className={`relative self-center sm:grow sm:pl-4 w-full ${formErrors.name ? "mt-7 sm:mt-0" : "mt-4 sm:mt-0"
                }`}
            >
              <input
                id="orderPhoneNum"
                name="orderPhoneNum"
                type="text"
                className={`peer h-12 self-center w-full border border-gray-300 rounded focus:outline-none truncate bg-formBgColor-secondChild
                    ${formErrors.phoneNum
                    ? "ring-2 ring-red-500 focus:ring-2 focus:ring-red-500"
                    : "focus:ring-2 focus:ring-blue-500"
                  } 
                    text-left placeholder-transparent pl-3 pt-2 text-headlineText-default pr-12`}
                placeholder=""
                onChange={handleNum}
                value={formValues.phoneNum}
              />
              <button
                className="absolute top-1/2 h-12 w-10 right-0 flex items-center pointer-event-stroke
                    -translate-y-1/2
                    rounded-r-xl"
              >
                <FaMobile
                  className={`flex text-gray-500 w-full border-l-2 ${formErrors.phoneNum ? "border-red-500" : ""
                    }`}
                />
              </button>
              <label
                htmlFor="orderPhoneNum"
                className={`sm:left-7 absolute left-3 -top-0 text-xxs leading-5 text-gray-600 transition-all 
                    peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-700 peer-placeholder-shown:top-3.5 
                    peer-focus:-top-0 peer-focus:leading-5 peer-focus:text-xxs truncate 
                    ${formErrors.phoneNum
                    ? "peer-focus:text-red-500"
                    : "peer-focus:text-blue-600"
                  }`}
              >
                <FormattedMessage id="OrderForm.LocationForm.sendersNum" />
              </label>
              <p className="text-red-500 absolute text-sm overflow-hidden pt-1 truncate">
                {formErrors.phoneNum}
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={tabContentVariants}
          initial="initial"
          animate="enter"
          exit="exit"
          transition={{ duration: 0.5 }}
          className="bg-formBgColor-secondChild flex flex-col items-stretch self-center w-full xs:w-11/12 mb-5 mt-2 xs:rounded-2xl border-y-2 xs:border-2 border-formBorder-children"
        >
          <h1 className="mt-4 text-sm font-bold pl-5 text-headlineText-default text-nowrap cursor-default">
            <FormattedMessage id="OrderForm.LocationForm.deliveryLocation" />
          </h1>
          <div
            className={`relative self-center w-11/12 ${formErrors2.address ? "mb-7" : "mb-2"
              } mt-3`}
          >
            <input
              id="desAddress"
              name="desAddress"
              type="text"
              value={formValues2.address}
              onChange={handleAddress2}
              placeholder=""
              className={`peer h-12 self-center w-full border border-gray-300 rounded focus:outline-none truncate bg-formBgColor-secondChild
                    ${formErrors2.address
                  ? "ring-2 ring-red-500 focus:ring-2 focus:ring-red-500"
                  : "focus:ring-2 focus:ring-blue-500"
                } 
                    text-left placeholder-transparent pl-3 pt-2 text-headlineText-default pr-12`}
            />
            <label
              htmlFor="desAddress"
              className={`absolute left-3 -top-0 text-xxs leading-5 text-gray-600 transition-all 
                    peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-700 peer-placeholder-shown:top-3.5 
                    peer-focus:-top-0 peer-focus:leading-5 peer-focus:text-xxs truncate
                    ${formErrors2.address
                  ? "peer-focus:text-red-500"
                  : "peer-focus:text-blue-600"
                }`}
            >
              <FormattedMessage id="OrderForm.LocationForm.deliveryAddress" />
            </label>
            <p className="text-red-500 absolute text-sm overflow-hidden pt-1 truncate">
              {formErrors2.address}
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-2 lg:gap-3 w-11/12 self-center mb-2">
            <Select
              placeholder={intl.formatMessage({ id: "OrderForm.LocationForm.SelectProvince" })}
              classNames={{
                listboxWrapper: "max-h-[300px] no-scrollbar",
                trigger: `text-xs md:text-sm text-black h-12 border border-gray-300 focus:outline-none rounded-xl w-full text-center text-black ${formErrors2.address ? 'ring-2 ring-red-500 focus:ring-2 focus:ring-red-500' : 'focus:ring-2 focus:ring-blue-500'}`
              }}
              listboxProps={{
                itemClasses: {
                  base: [
                    "rounded-md text-black transition-opacity hover:text-blue-500",
                  ],
                },
              }}
              popoverProps={{
                classNames: {
                  base: "before:bg-white",
                  content: "p-0 bg-white rounded-xl border border-gray-300",
                },
              }}
              id="city2"
              aria-label=".form-select-sm"
              value={selectedCity2}
              onChange={handleProvinceChange2}
            >
              {cities?.map((city) => (
                <SelectItem key={city} value={city}>
                  {city}
                </SelectItem>
              ))}
            </Select>

            <Select
              placeholder={intl.formatMessage({ id: "OrderForm.LocationForm.SelectDistrict" })}
              classNames={{
                listboxWrapper: "max-h-[300px] no-scrollbar",
                trigger: `text-xs md:text-sm text-black h-12 border border-gray-300 focus:outline-none rounded-xl w-full text-center text-black ${formErrors2.address ? 'ring-2 ring-red-500 focus:ring-2 focus:ring-red-500' : 'focus:ring-2 focus:ring-blue-500'}`,
              }}
              listboxProps={{
                itemClasses: {
                  base: [
                    "rounded-md text-black transition-opacity hover:text-blue-500",
                  ],
                },
              }}
              popoverProps={{
                classNames: {
                  base: "before:bg-white",
                  content: "p-0 bg-white rounded-xl border border-gray-300",
                },
              }}
              id="district2"
              aria-label=".form-select-sm"
              value={selectedDistrict2}
              onChange={handleDistrictChange2}
            >
              {districts2?.map((district) => (
                <SelectItem key={district} value={district}>
                  {district}
                </SelectItem>
              ))}
            </Select>

            <Select
              placeholder={intl.formatMessage({ id: "OrderForm.LocationForm.SelectWard" })}
              classNames={{
                listboxWrapper: "max-h-[300px] no-scrollbar",
                trigger: `text-xs md:text-sm text-black h-12 border border-gray-300 focus:outline-none rounded-xl w-full text-center text-black ${formErrors2.address ? 'ring-2 ring-red-500 focus:ring-2 focus:ring-red-500' : 'focus:ring-2 focus:ring-blue-500'}`,
              }}
              listboxProps={{
                itemClasses: {
                  base: [
                    "rounded-md text-black transition-opacity hover:text-blue-500",
                  ],
                },
              }}
              popoverProps={{
                classNames: {
                  base: "before:bg-white",
                  content: "p-0 bg-white rounded-xl border border-gray-300",
                },
              }}
              id="ward2"
              aria-label=".form-select-sm"
              value={selectedWard2}
              onChange={handleWardChange2}
            >
              {wards2?.map((ward) => (
                <SelectItem key={ward} value={ward}>
                  {ward}
                </SelectItem>
              ))}
            </Select>
          </div>

          <CommonDropdown
            name={languageText[3]}
            options={locationOptions}
            selectedOption={selectedOption2}
            setSelectedOption={setSelectedOption2}
          />

          <div className="flex flex-col sm:flex-row justify-center self-center w-11/12 rounded-2xl pb-6">
            <div className="relative self-center sm:grow w-full">
              <input
                id="receiverName"
                name="receiverName"
                type="text"
                className={`peer h-12 self-center w-full border border-gray-300 rounded focus:outline-none truncate bg-formBgColor-secondChild
                    ${formErrors2.name
                    ? "ring-2 ring-red-500 focus:ring-2 focus:ring-red-500"
                    : "focus:ring-2 focus:ring-blue-500"
                  }  
                    text-left placeholder-transparent pl-3 pt-2 text-headlineText-default pr-12`}
                placeholder=""
                onChange={handleName2}
                value={formValues2.name}
              />
              <label
                htmlFor="receiverName"
                className={`absolute left-3 -top-0 text-xxs leading-5 text-gray-600 transition-all 
                    peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-700 peer-placeholder-shown:top-3.5 
                    peer-focus:-top-0 peer-focus:leading-5 peer-focus:text-xxs truncate 
                    ${formErrors2.name
                    ? "peer-focus:text-red-500"
                    : "peer-focus:text-blue-600"
                  }`}
              >
                <FormattedMessage id="OrderForm.LocationForm.recipientsName" />
              </label>
              <p className="text-red-500 absolute text-sm overflow-hidden truncate pt-1">
                {formErrors2.name}
              </p>
              <button
                className="absolute top-1/2 h-12 w-10 right-0 flex items-center pointer-event-stroke
                    -translate-y-1/2
                    rounded-r-xl"
              >
                <FaUserCircle
                  className={`flex text-gray-500 w-full border-l-2 ${formErrors2.name ? "border-red-500" : ""
                    }`}
                />
              </button>
            </div>

            <div
              className={`relative self-center sm:grow sm:pl-4 w-full ${formErrors2.name ? "mt-7 sm:mt-0" : "mt-4 sm:mt-0"
                }`}
            >
              <input
                id="receiverPhoneNum"
                name="receiverPhoneNum"
                type="text"
                className={`peer h-12 self-center w-full border border-gray-300 rounded focus:outline-none bg-formBgColor-secondChild truncate
                    ${formErrors2.phoneNum
                    ? "ring-2 ring-red-500 focus:ring-2 focus:ring-red-500"
                    : "focus:ring-2 ring-blue-500"
                  } 
                    text-left placeholder-transparent pl-3 pt-2 text-headlineText-default pr-12`}
                placeholder=""
                onChange={handleNum2}
                value={formValues2.phoneNum}
              />
              <button
                className="absolute top-1/2 h-12 w-10 right-0 flex items-center pointer-event-stroke
                    -translate-y-1/2
                    rounded-r-xl"
              >
                <FaMobile
                  className={`flex text-gray-500 w-full border-l-2 ${formErrors2.phoneNum ? "border-red-500" : ""
                    }`}
                />
              </button>
              <label
                htmlFor="receiverPhoneNum"
                className={`sm:left-7 absolute left-3 -top-0 text-xxs leading-5 text-gray-600 transition-all
                    peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-700 peer-placeholder-shown:top-3.5 
                    peer-focus:-top-0 peer-focus:leading-5 peer-focus:text-xxs truncate 
                    ${formErrors2.phoneNum
                    ? "peer-focus:text-red-500"
                    : "peer-focus:text-blue-600"
                  }`}
              >
                <FormattedMessage id="OrderForm.LocationForm.recipientsNum" />
              </label>
              <p className="text-red-500 absolute text-sm overflow-hidden pt-1 truncate">
                {formErrors2.phoneNum}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LocationForm;
