import classNames from "classnames";
import React, { useState, useEffect, useContext } from "react";
import { CollapsIcon } from "../Icons";
import Link from "next/link";
import LocationForm from "./component/LocationForm";
import MoreDetailsForm from "./component/MoreDetailsForm";
import OrderNotification from "./component/OrderNotification";
import { motion } from "framer-motion";
import { FormattedMessage, useIntl } from "react-intl";
import { Button } from "@nextui-org/react";
import { getCoordinates } from "../MapRender/GetCoordinates";
import axios from "axios";
import { DestinationContext } from "@/context/DestinationContext";
import { SourceContext } from "@/context/SourceContext";
import { debounce } from "lodash";
import { AdministrativeOperation, CalculatingFeeInfo, CreatingOrderByUserInformation, OrdersOperation, UsersAuthenticate } from "@/TDLib/tdlogistics";
import { io } from "socket.io-client";
import Loading from "./component/LoadingForm";
import FeeForm from "./component/FeeForm";
import { SocketContext } from "@/pages/_app";

interface City {
  Id: string;
  Name: string;
  Districts: District[];
}

interface District {
  Id: string;
  Name: string;
  Wards: Ward[];
}

interface Ward {
  Id: string;
  Name: string;
}



const OrderForm = ({ toggleCollapse, setToggleCollapse }) => {
  const [toggleCollapse2, setToggleCollapse2] = useState(false);
  const [currentForm, setCurrentForm] = useState<number>(0);
  const [showNotification, setShowNotification] = useState(false);
  const intl = useIntl();
  const [shake, setshake] = useState(false);
  const { source, setSource } = useContext(SourceContext);
  const { destination, setDestination } = useContext(DestinationContext);
  //State for LocationForm
  interface FormValues {
    name: string;
    phoneNum: string;
    address: string;
    province: string;
    district: string;
    town: string;
  }
  interface ErrorValues {
    name: string;
    phoneNum: string;
    address: string;
    province: string;
    district: string;
    town: string;
  }
  const initialValues: FormValues = {
    name: "",
    phoneNum: "",
    address: "",
    province: "",
    district: "",
    town: "",
  };
  const initialValues2: FormValues = {
    name: "",
    phoneNum: "",
    address: "",
    province: "",
    district: "",
    town: "",
  };
  const initialErrors: ErrorValues = {
    name: "",
    phoneNum: "",
    address: "",
    province: "",
    district: "",
    town: "",
  };
  const initialErrors2: ErrorValues = {
    name: "",
    phoneNum: "",
    address: "",
    province: "",
    district: "",
    town: "",
  };
  const [formValues, setFormValues] = useState<FormValues>(initialValues);
  const [formErrors, setFormErrors] = useState<ErrorValues>(initialErrors);
  const [formValues2, setFormValues2] = useState<FormValues>(initialValues2);
  const [formErrors2, setFormErrors2] = useState<ErrorValues>(initialErrors2);
  const [selectedOption1, setSelectedOption1] = useState<string>("");
  const [selectedOption2, setSelectedOption2] = useState<string>("");
  const adminOperation = new AdministrativeOperation();
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedWard, setSelectedWard] = useState("");

  const [districts2, setDistricts2] = useState([]);
  const [wards2, setWards2] = useState([]);
  const [selectedProvince2, setSelectedProvince2] = useState("");
  const [selectedDistrict2, setSelectedDistrict2] = useState("");
  const [selectedWard2, setSelectedWard2] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      const response = await adminOperation.get({});
      setProvinces(response.data);
    };
    fetchData();
  }, []);

  //State for MoreDetailsForm
  const [selectedOption3, setSelectedOption3] = useState<string>("");
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);
  const [length, setLength] = useState(0);
  const [mass, setMass] = useState(0);
  const [formErrors3, setFormErrors3] = useState({
    goods: "",
    mass: "",
    dimensions: "",
  });
  const [useT60Service, setUseT60Service] = useState(false);
  const [COD, setCOD] = useState(0);

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
    if (
      type == 2 &&
      (!values.address || !values.district || !values.province || !values.town)
    ) {
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
    if (
      type == 2 &&
      (!values.address || !values.district || !values.province || !values.town)
    ) {
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
    if (mass == 0) {
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
        setCurrentForm(2)
        handleCalculateFee();
      }
    }
    else if (currentForm == 3) {
      setCurrentForm(4)
      handleCreateOrder()
    }
  };

  const handleGoBackButton = () => {
    currentForm == 3 ? setCurrentForm(1) : setCurrentForm(currentForm - 1);
    setshake(false);
  };

  const handleNotificationClose = () => {
    setShowNotification(false);
    setCurrentForm(0);
  };

  const [message, setMessage] = useState("")

  const [fee, setFee] = useState(0)
  const handleConnect = () => {
  };

  const handleNotifyError = (message) => {
    setMessage("Error: " + message);
    setShowNotification(true);
  };

  const handleNotifySuccessCreatedNewOrder = (message) => {
    setMessage(intl.formatMessage({ id: "OrderForm.OrderNotification.detail" }));
    setShowNotification(true);
  };

  const handleNotifyFailCreatedNewOrder = (message) => {
    setMessage("Failed to create new order: " + message);
    setShowNotification(true);
  };

  const socket = useContext(SocketContext)
  useEffect(() => {
    socket.on("connect", handleConnect);
    socket.on("notifyError", handleNotifyError);
    socket.on("notifySuccessCreatedNewOrder", handleNotifySuccessCreatedNewOrder);
    socket.on("notifyFailCreatedNewOrder", handleNotifyFailCreatedNewOrder);

    // Dọn dẹp khi component bị hủy
    return () => {
      socket.off("connect", handleConnect);
      socket.off("notifyError", handleNotifyError);
      socket.off("notifySuccessCreatedNewOrder", handleNotifySuccessCreatedNewOrder);
      socket.off("notifyFailCreatedNewOrder", handleNotifyFailCreatedNewOrder);
    };
  }, []);

  const handleCalculateFee = async () => {
    const ordersOperation = new OrdersOperation();
    const calculateFeeInfo: CalculatingFeeInfo = {
      province_source: formValues.province,
      district_source: formValues.district,
      ward_source: formValues.town,
      detail_source: formValues.address,
      province_dest: formValues2.province,
      district_dest: formValues2.district,
      ward_dest: formValues2.town,
      detail_dest: formValues2.address,
      service_type: useT60Service == true ? "T60" : selectedOption3,
      length: length,
      width: width,
      height: height,
    }
    const data = await ordersOperation.calculateFee(calculateFeeInfo)
    if (!data.error) {
      setFee(data.data)
      setCurrentForm(3)
    }
    else console.log(data)
  }

  const handleCreateOrder = async () => {
    const ordersOperation = new OrdersOperation();
    const orderInfo: CreatingOrderByUserInformation = {
      name_sender: formValues.name,
      name_receiver: formValues2.name,
      phone_number_receiver: formValues2.phoneNum,
      mass: mass,
      height: height,
      width: width,
      length: length,
      province_source: formValues.province,
      district_source: formValues.district,
      ward_source: formValues.town,
      detail_source: formValues.address,
      province_dest: formValues2.province,
      district_dest: formValues2.district,
      ward_dest: formValues2.town,
      detail_dest: formValues2.address,
      long_source: source.lng,
      lat_source: source.lat,
      long_destination: destination.lng,
      lat_destination: destination.lat,
      COD: COD,
      service_type: useT60Service == true ? "T60" : selectedOption3,
    };
    ordersOperation.createByUser(socket, orderInfo);
  }

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
    const fetchCoordinates = debounce(() => {
      if (
        formValues.address &&
        formValues.province &&
        formValues.town &&
        formValues.district
      ) {
        getCoordinates(
          `${formValues.address}, ${formValues.town}, ${formValues.district}, ${formValues.province}`
        )
          .then((coordinates: any) => {
            if (coordinates) {
              setSource({
                lat: coordinates.lat,
                lng: coordinates.lng,
                name: `${formValues.address}, ${formValues.town}, ${formValues.district}, ${formValues.province}`,
                label: `${formValues.address}, ${formValues.town}`,
              });
            } else {
              setSource(null);
            }
          })
          .catch((error) => {
            console.error("Đã xảy ra lỗi khi tìm kiếm tọa độ:", error);
          });
      } else {
        setSource(null);
      }
    }, 1000);

    fetchCoordinates();

    return () => {
      fetchCoordinates.cancel();
    };
  }, [
    formValues.address,
    formValues.province,
    formValues.town,
    formValues.district,
  ]);

  useEffect(() => {
    const fetchCoordinates = debounce(() => {
      if (
        formValues2.address &&
        formValues2.province &&
        formValues2.town &&
        formValues2.district
      ) {
        getCoordinates(
          `${formValues2.address}, ${formValues2.town}, ${formValues2.district}, ${formValues2.province}`
        )
          .then((coordinates: any) => {
            if (coordinates) {
              setDestination({
                lat: coordinates.lat,
                lng: coordinates.lng,
                name: `${formValues2.address}, ${formValues2.town}, ${formValues2.district}, ${formValues2.province}`,
                label: `${formValues2.address}, ${formValues2.town}`,
              });
            } else {
              setDestination(null);
            }
          })
          .catch((error) => {
            console.error("Đã xảy ra lỗi khi tìm kiếm tọa độ:", error);
          });
      } else {
        setDestination(null);
      }
    }, 1000);

    fetchCoordinates();

    return () => {
      fetchCoordinates.cancel();
    };
  }, [
    formValues2.address,
    formValues2.province,
    formValues2.town,
    formValues2.district,
  ]);

  useEffect(() => {
    if (currentForm == 0) {
      if (
        formErrors.name == "" &&
        formErrors.phoneNum == "" &&
        formErrors.address == "" &&
        formErrors.district == "" &&
        formErrors.province == "" &&
        formErrors.town == "" &&
        formErrors2.name == "" &&
        formErrors2.phoneNum == "" &&
        formErrors2.address == "" &&
        formErrors2.district == "" &&
        formErrors2.province == "" &&
        formErrors2.town == ""
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
          {!toggleCollapse && !toggleCollapse2 && (currentForm == 1 || currentForm == 3) && (
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
              selectedCity={selectedProvince}
              setSelectedCity={setSelectedProvince}
              selectedDistrict={selectedDistrict}
              setSelectedDistrict={setSelectedDistrict}
              selectedWard={selectedWard}
              setSelectedWard={setSelectedWard}
              selectedCity2={selectedProvince2}
              setSelectedCity2={setSelectedProvince2}
              selectedDistrict2={selectedDistrict2}
              setSelectedDistrict2={setSelectedDistrict2}
              selectedWard2={selectedWard2}
              setSelectedWard2={setSelectedWard2}
              cities={provinces}
              districts={districts}
              setDistricts={setDistricts}
              wards={wards}
              setWards={setWards}
              districts2={districts2}
              setDistricts2={setDistricts2}
              wards2={wards2}
              setWards2={setWards2}
            />
          )}
          {!toggleCollapse && !toggleCollapse2 && currentForm == 1 && (
            <MoreDetailsForm
              selectedOption3={selectedOption3}
              setSelectedOption3={setSelectedOption3}
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
              mass={mass}
              setMass={setMass}
              useT60Service={useT60Service}
              setUseT60Service={setUseT60Service}
              COD={COD}
              setCOD={setCOD}
            />
          )}
          {!toggleCollapse && !toggleCollapse2 && currentForm == 2 && <Loading currentForm={currentForm} />}
          {!toggleCollapse && !toggleCollapse2 && currentForm == 3 && <FeeForm
            name_sender={formValues.name}
            phone_number_sender={formValues.phoneNum}
            name_receiver={formValues2.name}
            phone_number_receiver={formValues2.phoneNum}
            mass={mass}
            height={height}
            width={width}
            length={length}
            province_source={formValues.province}
            district_source={formValues.district}
            ward_source={formValues.town}
            detail_source={formValues.address}
            province_dest={formValues2.province}
            district_dest={formValues2.district}
            ward_dest={formValues2.town}
            detail_dest={formValues2.address}
            COD={COD}
            service_type={useT60Service == true ? "T60" : selectedOption3}
            fee={fee} />}
          {!toggleCollapse && !toggleCollapse2 && currentForm == 4 && <Loading currentForm={currentForm} />}
          {!toggleCollapse && !toggleCollapse2 && currentForm < 4 && currentForm != 2 && (
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

              <Button
                className={`self-center w-full rounded-lg mt-3 py-3 bg-buttonColorForm-default hover:bg-buttonColorForm-hover text-buttonColorForm-text ${shake ? "animate-shake bg-gray-500 hover:bg-gray-500" : ""
                  }`}
                onClick={handleSubmitButton}
              >
                {currentForm == 3 ? <FormattedMessage id="OrderForm.ConfirmCreate" /> : <FormattedMessage id="OrderForm.Continue" />}
              </Button>
            </div>
          )}
        </div>

        {showNotification && (
          <OrderNotification onClose={handleNotificationClose} message={message} />
        )}
      </div>
    </div>
  );
};

export default OrderForm;
