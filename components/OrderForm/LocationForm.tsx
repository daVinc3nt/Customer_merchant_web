import React, { useState, useRef, useEffect, useContext } from "react";
import { HiDotsHorizontal, HiOutlineChevronDown } from 'react-icons/hi';
import { FaUserCircle, FaMobile } from "react-icons/fa";
import Dropdown from "./ListBox";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { FormattedMessage, useIntl } from "react-intl";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { SourceContext } from "@/context/SourceContext";
import { DestinationContext } from "@/context/DestinationContext";
import { getGeocode } from "../MapRender/GetLocationAdress";
import Notification2 from "./Notification2";

const LocationForm = ({ value, setValue, value2, setValue2,
  formValues, setFormValues, formErrors, setFormErrors,
  formValues2, setFormValues2, formErrors2, setFormErrors2,
  selectedOption1, setSelectedOption1, selectedOption2, setSelectedOption2 }) => {
  const [showNotification, setShowNotification] = useState(false);
  const intl = useIntl();
  const locationOptions = [
    intl.formatMessage({ id: 'OrderForm.LocationForm.locationOption1' }),
    intl.formatMessage({ id: 'OrderForm.LocationForm.locationOption2' }),
    intl.formatMessage({ id: 'OrderForm.LocationForm.locationOption3' }),
    intl.formatMessage({ id: 'OrderForm.LocationForm.locationOption4' }),
    intl.formatMessage({ id: 'OrderForm.LocationForm.locationOption5' }),
  ];
  const languageText = [
    intl.formatMessage({ id: 'OrderForm.LocationForm.enterPickupAddress' }),
    intl.formatMessage({ id: 'OrderForm.LocationForm.detailsPickupLocation' }),
    intl.formatMessage({ id: 'OrderForm.LocationForm.enterDeliveryAddress' }),
    intl.formatMessage({ id: 'OrderForm.LocationForm.detailsDeliveryLocation' }),
  ];

  //Context
  const { source, setSource } = useContext(SourceContext);
  const { destination, setDestination } = useContext(DestinationContext);
  const [isAtBottom, setIsAtBottom] = useState(false);

  const containerRef1 = useRef<HTMLDivElement>(null);
  const dropdownRef1 = useRef<HTMLDivElement>(null);
  const [isOpen1, setIsOpen1] = useState(false);
  const dropdownRef2 = useRef<HTMLDivElement>(null);
  const [isOpen2, setIsOpen2] = useState(false);

  const getCurrentLocation = (type) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLat = position.coords.latitude;
          const userLng = position.coords.longitude;
          getGeocode(userLat, userLng)
            .then((name) => {
              const currentLocation = {
                lat: userLat,
                lng: userLng,
                name: name,
                label: name,
              };
              type == "source" ? setSource(currentLocation) : setDestination(currentLocation);
              type == "source" ? setValue({ label: name, value: currentLocation }) : setValue2({ label: name, value: currentLocation });
              if (type == "source") {
                setFormValues({...formValues, address: name});
                setFormErrors({...formErrors, address:validate(formValues,2)});
              }  else {
                setFormValues2({...formValues2, address: name});
                setFormErrors2({...formErrors2, address:validate(formValues2,2)});
              }
            })
            .catch((error) => {
              console.error("Error getting geocode:", error);
            });
        },
        (error) => {
          console.error("Error getting current location:", error.message);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef1.current && event.target && !dropdownRef1.current.contains(event.target as HTMLElement) &&
        ((event.target as HTMLElement).id !== `orderAddress`)
      ) {
        setIsOpen1(false);
      }
      if (dropdownRef2.current && event.target && !dropdownRef2.current.contains(event.target as HTMLElement) &&
        ((event.target as HTMLElement).id !== `orderAddress2`)
      ) {
        setIsOpen2(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const tabContentVariants: Variants = {
    initial: { x: -20, opacity: 0 },
    enter: { x: 0, opacity: 1 },
    exit: { x: -20, opacity: 0 }
  }

  const getLatandLng = (place, type) => {
    if (place) {
      const placeId = place.value.place_id;
      const service = new google.maps.places.PlacesService(document.createElement('div'));
      service.getDetails({ placeId }, (place, status) => {
        if (status === "OK" && place.geometry && place.geometry.location) {
          if (type == "source") {
            setSource({
              lat: place.geometry.location.lat(),
              lng: place.geometry.location.lng(),
              name: place.formatted_address,
              label: place.name
            })
            setFormValues({...formValues, address:place.name})
            setFormErrors({...formErrors, address:validate(formValues,2)})
          }
          else {
            setDestination({
              lat: place.geometry.location.lat(),
              lng: place.geometry.location.lng(),
              name: place.formatted_address,
              label: place.name
            })
            setFormValues2({...formValues2, address:place.name})
            setFormErrors2({...formErrors2, address:validate(formValues2,2)})
          }
        }
      })
    }
    else {
      if (type == "source"){
        setSource(null);
        setFormValues({...formValues, address: ""})
        setFormErrors({...formErrors, address:validate(formValues,2)})
      } else {
        setDestination(null);
        setFormValues2({...formValues2, address: ""})
        setFormErrors2({...formErrors2, address:validate(formValues2,2)})
      }
    }
  }

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
    setFormErrors2({ ...formErrors2, phoneNum: validate(updatedFormValues, 3) });
  };

  const validate = (values, type: number): string => {
    var errors: string = "";
    const PhoneRegex = /^\d+$/;
    if (type == 1 && !values.name) {
      errors = intl.formatMessage({ id: 'OrderForm.LocationForm.error1' });
    }
    if (type == 2 && values.address != "") {
      errors = intl.formatMessage({ id: 'OrderForm.LocationForm.error2' });
    }
    if (type == 3) {
      if (values.phoneNum === "") {
        errors = intl.formatMessage({ id: 'OrderForm.LocationForm.error3' });
      } else if (values.phoneNum[0] != "0" || !PhoneRegex.test(values.phoneNum)) {
        errors = intl.formatMessage({ id: 'OrderForm.LocationForm.error4' });
      } else if (values.phoneNum.length < 10) {
        errors = intl.formatMessage({ id: 'OrderForm.LocationForm.error5' });
      } else if (values.phoneNum.length > 10) {
        errors = intl.formatMessage({ id: 'OrderForm.LocationForm.error6' });
      }
    }
    return errors;
  };

  return <div className="relative h-5/6 w-full mt-4 lg:mt-8 border-2 border-formBorder-parent rounded-md">
    {!isAtBottom && (<motion.button
      variants={{ initial: { opacity: 0 }, enter: { opacity: 1 } }}
      initial="initial" animate="enter"
      whileTap={{ opacity: 0, transition: { duration: 0 } }}
      transition={{ duration: 1, delay: 1 }}
      className="absolute bg-scrollBottomBt-default p-1 rounded-3xl bottom-3 hover:bg-scrollBottomBt-hover
              right-[calc(50%-1rem)] text-center text-buttonColorForm-text z-30 animate-bounce
              outline outline-scrollBottomBt-outline"
      onClick={() => {
        if (containerRef1.current) {
          containerRef1.current.scrollTo({
            top: containerRef1.current.scrollHeight,
            behavior: 'smooth',
          })
        }
      }}
    >
      <HiOutlineChevronDown />
    </motion.button>)}
    <div ref={containerRef1}
      onScroll={(e) => {
        const target = e.target as HTMLElement;
        const isBottom = Math.abs(target.scrollHeight - target.scrollTop - target.clientHeight) < 1;
        setIsAtBottom(isBottom);
      }}
      className="bg-formBgColor-firstChild absolute flex flex-col h-full w-full overflow-y-scroll rounded no-scrollbar"
    >
      {showNotification && (
          <Notification2 onClose={()=>{setShowNotification(false)}} />
        )}
      <motion.h1
        variants={tabContentVariants}
        initial="initial" animate="enter" exit="exit"
        transition={{ duration: .5 }}
        className="mt-2 text-2xl pl-4 xs:pl-6 text-headlineText-default font-bold text-nowrap cursor-default">
        <FormattedMessage id="OrderForm.LocationForm.location"/>
      </motion.h1>

      <motion.div
        variants={tabContentVariants}
        initial="initial" animate="enter" exit="exit"
        transition={{ duration: .5 }}
        className="bg-formBgColor-secondChild flex flex-col items-stretch self-center w-full xs:w-11/12 mb-5 mt-2 bg-transparent xs:rounded-2xl border-y-2 xs:border-2 border-formBorder-children pb-6"
      >

        <h1 className="mt-4 text-sm font-bold pl-5 text-headlineText-default text-nowrap cursor-default"><FormattedMessage id="OrderForm.LocationForm.pickupLocation"/></h1>

        <div className={`relative self-center w-11/12 ${formErrors.address ? 'mb-5' : 'mb-2'} mt-3`} onClick={() => setIsOpen1(!isOpen1)} >
          <GooglePlacesAutocomplete
            selectProps={{
              id: "orderAddress",
              onChange: (place) => {
                getLatandLng(place, "source");
                setValue(place);
              },
              value: value,
              placeholder: languageText[0],
              isClearable: true,
              className: `peer h-12 self-center w-full border border-gray-300 focus:border-blue-300 rounded text-left pt-1 pr-10
              ${formErrors.address ? 'ring-2 ring-red-500 focus:ring-2 focus:ring-red-500' : 'focus:ring-2 focus:ring-blue-500'}`,
              components: {
                DropdownIndicator: null,
                LoadingIndicator: null,
              },
              styles: {
                control: (provided, state) => ({
                  ...provided,
                  backgroundColor: "transparent",
                  border: "none",
                  boxShadow: state.isFocused ? "none" : provided.boxShadow,
                  "&:hover": {
                    border: "none",
                  },
                }),
                placeholder: (provided) => ({
                  ...provided,
                  color: "#4a5568",
                  fontSize: "0.875rem",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }),
              },
            }}
          />
          <label
            className={`absolute left-3 -top-2.5 bg-formBgColor-secondChild px-1 text-xxs leading-5 transition-all rounded-3xl
            ${formErrors.address ? 'text-red-500' : 'text-gray-600'}`}
          >
            <FormattedMessage id="OrderForm.LocationForm.pickupAddress"/>
          </label>
          <p className="text-red-500 absolute text-sm overflow-hidden pt-1 truncate">{formErrors.address}</p>
          <button id="orderAddress" className="absolute top-1/2 h-12 w-10 right-0 flex items-center pointer-event-stroke
                  -translate-y-1/2
                  rounded-r-xl"
            onClick={() => { setIsOpen1(!isOpen1) }}>
            <HiDotsHorizontal id="orderAddress" className={`text-gray-400 w-full border-l-2 ${formErrors.address ? 'border-red-500' : ''}`} />
          </button>
          <AnimatePresence>
            {isOpen1 && (
              <motion.div
                ref={dropdownRef1}
                initial="initial" animate="animate" exit="exit"
                variants={{ initial: { opacity: 0, scale: 0.9 }, animate: { opacity: 1, scale: 1 }, exit: { opacity: 0, scale: 0.9 } }}
                transition={{ duration: 0.3 }}
                className={`right-0 -top-10 absolute w-full xs:w-1/2 rounded bg-white border-[1px] border-gray-300`}
              >
                <ul
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu"
                  className={`rounded z-30`}
                >
                  <li key={1}>
                    <button
                      type="button"
                      className={`block h-9 w-full text-sm z-20 text-center rounded border-gray-300 hover:bg-gray-100 hover:rounded-t text-gray-700}`}
                      onClick={() => {
                        setIsOpen1(false);
                        getCurrentLocation("source");
                      }}
                    >
                      <FormattedMessage id="OrderForm.LocationForm.currentLocation"/>
                    </button>
                  </li>
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <Dropdown name={languageText[1]} options={locationOptions} selectedOption={selectedOption1} setSelectedOption={setSelectedOption1} />

        <div className="flex flex-col self-center items-left h-6 w-11/12 mb-4">
          <button className="h-6 w-2/6 bg-formBgColor-secondChild pointer-event-stroke text-xs text-left text-headlineText-default hover:text-orange-600" 
          onClick={() => setShowNotification(true)}
          style={{ whiteSpace: 'nowrap' }}>
            + <FormattedMessage id="OrderForm.LocationForm.detailsPickupAddress"/>
          </button>
        </div>

        <div className="flex flex-col sm:flex-row justify-center self-center w-11/12 rounded-2xl">

          <div className="relative self-center sm:grow w-full">
            <input
              id="orderName"
              name="orderName"
              type="text"
              className={`peer h-12 self-center w-full border border-gray-300 rounded focus:outline-none truncate bg-formBgColor-secondChild
                    ${formErrors.name ? 'ring-2 ring-red-500 focus:ring-2 focus:ring-red-500' : 'focus:ring-2 focus:ring-blue-500'} 
                    text-left placeholder-transparent pl-3 pt-2 text-headlineText-default pr-12`}
              placeholder=""
              onChange={handleName}
              value={formValues.name}
            />
            <label
              htmlFor="orderName"
              className={`absolute left-3 -top-0 text-xxs leading-5 text-gray-600 transition-all 
                    peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-700 peer-placeholder-shown:top-3.5 
                    peer-focus:-top-0 peer-focus:leading-5 peer-focus:text-xxs
                    ${formErrors.name ? 'peer-focus:text-red-500' : 'peer-focus:text-blue-600'}`}
            >
              <FormattedMessage id="OrderForm.LocationForm.sendersName"/>
            </label>
            <p className="text-red-500 absolute text-sm overflow-hidden pt-1 truncate">{formErrors.name}</p>
            <button className="absolute top-1/2 h-12 w-10 right-0 flex items-center pointer-event-stroke
                    -translate-y-1/2
                    rounded-r-xl">
              <FaUserCircle className={`flex text-gray-500 w-full border-l-2 ${formErrors.name ? 'border-red-500' : ''}`} />
            </button>
          </div>

          <div className={`relative self-center sm:grow sm:pl-4 w-full ${formErrors.name ? 'mt-7 sm:mt-0' : 'mt-4 sm:mt-0'}`}>
            <input
              id="orderPhoneNum"
              name="orderPhoneNum"
              type="text"
              className={`peer h-12 self-center w-full border border-gray-300 rounded focus:outline-none truncate bg-formBgColor-secondChild
                    ${formErrors.phoneNum ? 'ring-2 ring-red-500 focus:ring-2 focus:ring-red-500' : 'focus:ring-2 focus:ring-blue-500'} 
                    text-left placeholder-transparent pl-3 pt-2 text-headlineText-default pr-12`}
              placeholder=""
              onChange={handleNum}
              value={formValues.phoneNum}
            />
            <button className="absolute top-1/2 h-12 w-10 right-0 flex items-center pointer-event-stroke
                    -translate-y-1/2
                    rounded-r-xl">
              <FaMobile className={`flex text-gray-500 w-full border-l-2 ${formErrors.phoneNum ? 'border-red-500' : ''}`} />
            </button>
            <label
              htmlFor="orderPhoneNum"
              className={`sm:left-7 absolute left-3 -top-0 text-xxs leading-5 text-gray-600 transition-all 
                    peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-700 peer-placeholder-shown:top-3.5 
                    peer-focus:-top-0 peer-focus:leading-5 peer-focus:text-xxs 
                    ${formErrors.phoneNum ? 'peer-focus:text-red-500' : 'peer-focus:text-blue-600'}`}
            >
              <FormattedMessage id="OrderForm.LocationForm.sendersNum"/>
            </label>
            <p className="text-red-500 absolute text-sm overflow-hidden pt-1 truncate">{formErrors.phoneNum}</p>
          </div>

        </div>

      </motion.div>

      <motion.div
        variants={tabContentVariants}
        initial="initial" animate="enter" exit="exit"
        transition={{ duration: .5 }}
        className="bg-formBgColor-secondChild flex flex-col items-stretch self-center w-full xs:w-11/12 mb-5 mt-2 xs:rounded-2xl border-y-2 xs:border-2 border-formBorder-children"
      >

        <h1 className="mt-4 text-sm font-bold pl-5 text-headlineText-default text-nowrap cursor-default"><FormattedMessage id="OrderForm.LocationForm.deliveryLocation"/></h1>

        <div className={`relative self-center w-11/12 ${formErrors2.address ? 'mb-5' : 'mb-2'} mt-3`} onClick={() => { setIsOpen2(!isOpen2) }}>
          <GooglePlacesAutocomplete
            selectProps={{
              id: "orderAddress2",
              value: value2,
              onChange: (place) => {
                getLatandLng(place, "destination");
                setValue2(place)
              },
              placeholder: languageText[2],
              isClearable: true,
              className: `peer h-12 self-center w-full border border-gray-300 focus:border-blue-300 rounded text-left pt-1 pr-10
              ${formErrors2.address ? 'ring-2 ring-red-500 focus:ring-2 focus:ring-red-500' : 'focus:ring-2 focus:ring-blue-500'}`,
              components: {
                DropdownIndicator: null,
                LoadingIndicator: null,
              },
              styles: {
                control: (provided, state) => ({
                  ...provided,
                  backgroundColor: "transparent",
                  border: "none",
                  boxShadow: state.isFocused ? "none" : provided.boxShadow,
                  "&:hover": {
                    border: "none"
                  }
                }),
                placeholder: (provided) => ({
                  ...provided,
                  color: "#4a5568",
                  fontSize: "0.875rem",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }),
              },
            }}
          />
          <label
            className={`absolute left-3 -top-2.5 bg-formBgColor-secondChild px-1 text-xxs leading-5 transition-all rounded-3xl
            ${formErrors2.address ? 'text-red-500' : 'text-gray-600'}`}
          >
            <FormattedMessage id="OrderForm.LocationForm.deliveryAddress"/>
          </label>
          <p className="text-red-500 absolute text-sm overflow-hidden pt-1 truncate">{formErrors2.address}</p>
          <button className="absolute top-1/2 h-12 w-10 right-0 flex items-center pointer-event-stroke
                  -translate-y-1/2
                  rounded-r-xl"
            onClick={() => {setIsOpen2(!isOpen2)}}>
            <HiDotsHorizontal className={`text-gray-400 w-full border-l-2 ${formErrors2.address ? 'border-red-500' : ''}`} />
          </button>
          <AnimatePresence>
            {isOpen2 && (
              <motion.div
                ref={dropdownRef2}
                initial="initial" animate="animate" exit="exit"
                variants={{ initial: { opacity: 0, scale: 0.9 }, animate: { opacity: 1, scale: 1 }, exit: { opacity: 0, scale: 0.9 } }}
                transition={{ duration: 0.3 }}
                className={`right-0 -top-10 absolute w-full xs:w-1/2 rounded bg-white border-[1px] border-gray-300`}
              >
                <ul
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu"
                  className={`rounded z-30`}
                >
                  <li key={1}>
                    <button
                      type="button"
                      className={`block h-9 w-full text-sm z-20 text-center rounded border-gray-300 hover:bg-gray-100 hover:rounded-t text-gray-700}`}
                      onClick={() => {
                        setIsOpen2(false);
                        getCurrentLocation("destination");
                      }}
                    >
                      <FormattedMessage id="OrderForm.LocationForm.currentLocation"/>
                    </button>
                  </li>
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <Dropdown name={languageText[3]} options={locationOptions} selectedOption={selectedOption2} setSelectedOption={setSelectedOption2} />

        <div className="flex flex-col self-center items-left h-6 w-11/12 mb-4">
          <button className="h-6 w-2/6 bg-formBgColor-secondChild pointer-event-stroke text-xs text-left text-headlineText-default hover:text-orange-600" 
            onClick={() => setShowNotification(true)}
            style={{ whiteSpace: 'nowrap' }}>
              + <FormattedMessage id="OrderForm.LocationForm.detailsDeliveryAddress"/>
          </button>
        </div>

        <div className="flex flex-col sm:flex-row justify-center self-center w-11/12 rounded-2xl pb-6">

          <div className="relative self-center sm:grow w-full">
            <input
              id="receiverName"
              name="receiverName"
              type="text"
              className={`peer h-12 self-center w-full border border-gray-300 rounded focus:outline-none truncate bg-formBgColor-secondChild
                    ${formErrors2.name ? 'ring-2 ring-red-500 focus:ring-2 focus:ring-red-500' : 'focus:ring-2 focus:ring-blue-500'}  
                    text-left placeholder-transparent pl-3 pt-2 text-headlineText-default pr-12`}
              placeholder=""
              onChange={handleName2}
              value={formValues2.name}
            />
            <label
              htmlFor="receiverName"
              className={`absolute left-3 -top-0 text-xxs leading-5 text-gray-600 transition-all 
                    peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-700 peer-placeholder-shown:top-3.5 
                    peer-focus:-top-0 peer-focus:leading-5 peer-focus:text-xxs 
                    ${formErrors2.name ? 'peer-focus:text-red-500' : 'peer-focus:text-blue-600'}`}
            >
              <FormattedMessage id="OrderForm.LocationForm.recipientsName"/>
            </label>
            <p className="text-red-500 absolute text-sm overflow-hidden truncate pt-1">{formErrors2.name}</p>
            <button className="absolute top-1/2 h-12 w-10 right-0 flex items-center pointer-event-stroke
                    -translate-y-1/2
                    rounded-r-xl">
              <FaUserCircle className={`flex text-gray-500 w-full border-l-2 ${formErrors2.name ? 'border-red-500' : ''}`} />
            </button>
          </div>

          <div className={`relative self-center sm:grow sm:pl-4 w-full ${formErrors2.name ? 'mt-7 sm:mt-0' : 'mt-4 sm:mt-0'}`}>
            <input
              id="receiverPhoneNum"
              name="receiverPhoneNum"
              type="text"
              className={`peer h-12 self-center w-full border border-gray-300 rounded focus:outline-none bg-formBgColor-secondChild truncate
                    ${formErrors2.phoneNum ? 'ring-2 ring-red-500 focus:ring-2 focus:ring-red-500' : 'focus:ring-2 ring-blue-500'} 
                    text-left placeholder-transparent pl-3 pt-2 text-headlineText-default pr-12`}
              placeholder=""
              onChange={handleNum2}
              value={formValues2.phoneNum}
            />
            <button className="absolute top-1/2 h-12 w-10 right-0 flex items-center pointer-event-stroke
                    -translate-y-1/2
                    rounded-r-xl">
              <FaMobile className={`flex text-gray-500 w-full border-l-2 ${formErrors2.phoneNum ? 'border-red-500' : ''}`} />
            </button>
            <label
              htmlFor="receiverPhoneNum"
              className={`sm:left-7 absolute left-3 -top-0 text-xxs leading-5 text-gray-600 transition-all
                    peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-700 peer-placeholder-shown:top-3.5 
                    peer-focus:-top-0 peer-focus:leading-5 peer-focus:text-xxs 
                    ${formErrors2.phoneNum ? 'peer-focus:text-red-500' : 'peer-focus:text-blue-600'}`}
            >
              <FormattedMessage id="OrderForm.LocationForm.recipientsNum"/>
            </label>
            <p className="text-red-500 absolute text-sm overflow-hidden pt-1 truncate">{formErrors2.phoneNum}</p>
          </div>

        </div>

      </motion.div>

    </div></div>
}

export default LocationForm;
