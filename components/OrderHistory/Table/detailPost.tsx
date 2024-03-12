import React, { useRef, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import { Button } from "@nextui-org/react";
import { FaTrash, FaPen } from "react-icons/fa";
import { FormattedMessage, useIntl } from "react-intl";
import moment from "moment-timezone";
import {
  StaffsOperation,
  AgencyOperation,
  UpdatingAgencyCondition,
  UpdatingAgencyInfo,
} from "@/TDLib/tdlogistics";
import axios from "axios";
import { set } from "date-fns";
import { CheckCheck, TruckIcon, Kanban } from "lucide-react";
interface Orderdetail {
  order_id: string;
  user_id: string;
  agency_id: string;
  order_time: string;
  COD: number;
  fee: number;
  height: number;
  length: number;
  width: number;
  last_update: string;
  parent: string;
  mass: number;
  miss: number;
  journey: [string];
  service_type: number;
  status_code: number;

  detail_dest: string;
  district_dest: string;
  ward_dest: string;
  province_dest: string;
  phone_number_receiver: string;
  name_receiver: string;

  detail_source: string;
  district_source: string;
  ward_source: string;
  province_source: string;
  phone_number_sender: string;
  name_sender: string;

  shipper: string;
}

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
const staff = new StaffsOperation();

interface DetailAgencyProps {
  onClose: () => void;
  dataInitial: Orderdetail;
}

const DetailPost: React.FC<DetailAgencyProps> = ({ onClose, dataInitial }) => {
  const intl = useIntl();
  const [isShaking, setIsShaking] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [cities, setCities] = useState<City[]>([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [role, setRole] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await staff.getAuthenticatedStaffInfo();
      setRole(res.data.role);
    };

    fetchData();
  }, []);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      notificationRef.current &&
      !notificationRef.current.contains(event.target as Node)
    ) {
      setIsShaking(true);
      setTimeout(() => {
        setIsShaking(false);
      }, 300);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleAnimationComplete = () => {
    if (!isVisible) {
      onClose();
    }
  };

  const userTimezone = moment.tz.guess();
  const userlocal = navigator.language;
  console.log(userlocal);
  return (
    <motion.div
      className={`fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-60 z-50 text-[#545e7b]`}
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      onAnimationComplete={handleAnimationComplete}
      style={{
        backdropFilter: "blur(12px)",
      }}
    >
      <motion.div
        ref={notificationRef}
        className={`relative w-[98%] sm:w-9/12 bg-white rounded-xl p-4 overflow-y-auto
          ${isShaking ? "animate-shake" : ""}`}
        initial={{ scale: 0 }}
        animate={{ scale: isVisible ? 1 : 0 }}
        exit={{ scale: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative items-center justify-center flex-col flex h-10 w-full border-b-2 border-[#545e7b]">
          <div className="font-bold text-lg sm:text-2xl pb-2 text-black w-full text-center">
            Thông tin đơn hàng
          </div>
          <Button
            className="absolute right-0 w-8 h-8 rounded-full mb-2 hover:bg-gray-300"
            onClick={handleClose}
          >
            <IoMdClose className="w-5/6 h-5/6 " />
          </Button>
        </div>
        <div className="h-screen_3/5 overflow-y-scroll border border-[#545e7b] mt-4 no-scrollbar  bg-white p-2 rounded-md text-black place-content-center">
          <div className="">
            <div className="flex place-content-center text-black font-bold text-xl">
              Thông tin người gửi
            </div>
            <div className="grid grid-cols-2 mt-5 gap-3">
              <div className="flex flex-row ">
                <div className="text-base font-bold text-black">
                  Số nhà/Đường:{" "}
                </div>
                <div className="ml-2 text-base">
                  {dataInitial.detail_source}
                </div>
              </div>
              <div className="flex flex-row ">
                <div className="text-base font-bold text-black">
                  Quận/Huyện:{" "}
                </div>
                <div className="ml-2 text-base">
                  {dataInitial.district_source}
                </div>
              </div>
              <div className="flex flex-row ">
                <div className="text-base font-bold text-black">
                  Phường/Xã:{" "}
                </div>
                <div className="ml-2 text-base">{dataInitial.ward_source}</div>
              </div>
              <div className="flex flex-row ">
                <div className="text-base font-bold text-black">
                  Tỉnh/Thành Phố:{" "}
                </div>
                <div className="ml-2 text-base">
                  {dataInitial.province_source}
                </div>
              </div>
              <div className="flex flex-row ">
                <div className="text-base font-bold text-black">
                  Số điện thoại người gửi:{" "}
                </div>
                <div className="ml-2 text-base">
                  {dataInitial.phone_number_sender}
                </div>
              </div>
              <div className="flex flex-row ">
                <div className="text-base font-bold text-black">
                  Tên người gửi:{" "}
                </div>
                <div className="ml-2 text-base">{dataInitial.name_sender}</div>
              </div>
            </div>
          </div>
          <div>
            <div className="flex place-content-center text-black font-bold text-xl mt-5">
              Thông tin người nhận
            </div>
            <div className="grid grid-cols-2 mt-5 gap-3">
              <div className="flex flex-row ">
                <div className="text-base font-bold text-black">
                  Số nhà/Đường:{" "}
                </div>
                <div className="ml-2 text-base">{dataInitial.detail_dest}</div>
              </div>
              <div className="flex flex-row ">
                <div className="text-base font-bold text-black">
                  Quận/Huyện:{" "}
                </div>
                <div className="ml-2 text-base">
                  {dataInitial.district_dest}
                </div>
              </div>
              <div className="flex flex-row ">
                <div className="text-base font-bold text-black">
                  Phường/Xã:{" "}
                </div>
                <div className="ml-2 text-base">{dataInitial.ward_dest}</div>
              </div>
              <div className="flex flex-row ">
                <div className="text-base font-bold text-black">
                  Tỉnh/Thành Phố:{" "}
                </div>
                <div className="ml-2 text-base">
                  {dataInitial.province_dest}
                </div>
              </div>
              <div className="flex flex-row ">
                <div className="text-base font-bold text-black">
                  Số điện thoại người nhận:{" "}
                </div>
                <div className="ml-2 text-base">
                  {dataInitial.phone_number_receiver}
                </div>
              </div>
              <div className="flex flex-row ">
                <div className="text-base font-bold text-black">
                  Tên người nhận:{" "}
                </div>
                <div className="ml-2 text-base">
                  {dataInitial.name_receiver}
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="flex place-content-center text-black font-bold text-xl mt-5">
              Thông tin đơn hàng
            </div>
            <div className="grid grid-cols-2 mt-5 gap-3">
              <div className="flex flex-row ">
                <div className="text-base font-bold text-black">
                  Mã đơn hàng{" "}
                </div>

                <div className="ml-2 text-base">{dataInitial.order_id}</div>
              </div>

              <div className="flex flex-row ">
                <div className="text-base font-bold text-black">
                  Thời gian tạo:{" "}
                </div>
                <div className="ml-2 text-base">
                  {moment(dataInitial.order_time)
                    .tz(userTimezone)
                    .locale(userlocal)
                    .format("DD-MM-YYYY HH:mm ")}
                </div>
              </div>
              <div className="flex flex-row ">
                <div className="text-base font-bold text-black">Phí COD: </div>
                <div className="ml-2 text-base">{dataInitial.COD} (vnđ)</div>
              </div>
              <div className="flex flex-row ">
                <div className="text-base font-bold text-black">
                  Phí vận chuyển:{" "}
                </div>
                <div className="ml-2 text-base">{dataInitial.fee} (vnđ)</div>
              </div>
              <div className="flex flex-row ">
                <div className="text-base font-bold text-black">Chiều cao:</div>
                <div className="ml-2 text-base">{dataInitial.height} (cm)</div>
              </div>
              <div className="flex flex-row ">
                <div className="text-base font-bold text-black">
                  Chiều dài:{" "}
                </div>
                <div className="ml-2 text-base">{dataInitial.length} (cm)</div>
              </div>
              <div className="flex flex-row ">
                <div className="text-base font-bold text-black">
                  Chiều rộng:{" "}
                </div>
                <div className="ml-2 text-base">{dataInitial.width} (cm)</div>
              </div>
              <div className="flex flex-row ">
                <div className="text-base font-bold text-black">
                  Cập nhật lần cuối:{" "}
                </div>
                <div className="ml-2 text-base">
                  {moment(dataInitial.last_update)
                    .tz(userTimezone)
                    .locale(userlocal)
                    .format("DD-MM-YYYY HH:mm ")}
                </div>
              </div>

              <div className="flex flex-row ">
                <div className="text-base font-bold text-black">
                  Khối lượng:{" "}
                </div>
                <div className="ml-2 text-base">{dataInitial.mass} (gram)</div>
              </div>
              <div className="flex flex-row ">
                <div className="text-base font-bold text-black">
                  Số lần lỡ đơn:{" "}
                </div>
                <div className="ml-2 text-base">{dataInitial.miss}</div>
              </div>
            </div>
            <div className="flex flex-col mt-3">
              <div className=" font-bold">Hành trình di chuyển :</div>
              {dataInitial.journey.map((journey, index) => {
                return (
                  <div
                    className={`flex flex-row gap-3 mt-3 ${
                      index === 0 ? "text-green-700" : "text-gray-400"
                    }`}
                  >
                    {index === 0 && (
                      <TruckIcon className="w-6 h-6 text-red-600" />
                    )}
                    {index !== 0 && <Kanban className="w-6 h-6 " />}
                    {/* <CheckCheck className="w-6 h-6 text-green-600" /> */}
                    ---
                    <div className="flex flex-col ">
                      {index === 0 ? "Đang di chuyển : " : ""}
                      <div key={index} className="ml-2 text-base">
                        {moment(journey.date)
                          .tz(userTimezone)
                          .locale(userlocal)
                          .format("DD-MM-YYYY HH:mm ")}
                      </div>
                      <div className="ml-2">
                        | Nhận bởi bưu cục :{" "}
                        <span className={`index === 0 ? "text-green-700" : ""`}>
                          {journey.managed_by}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default DetailPost;
