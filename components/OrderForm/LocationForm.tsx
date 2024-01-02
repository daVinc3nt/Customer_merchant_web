import React , { useState } from "react";
import { HiDotsHorizontal } from 'react-icons/hi';
import { FaUserCircle, FaMobile } from "react-icons/fa";
import Dropdown from "./ListBox";

const LocationForm = () => {
    interface FormValues {
      name: string;
      phoneNum: string;
    }
    interface ErrorValues {
      name: string;
      phoneNum: string;
    }
    const locationOptions = ['Mặt tiền/Mặt phố', 'Bãi xe', 'Hẻm/Ngõ 2m', 'Hẻm/Ngõ 3m' , 'Hẻm/Ngõ ô tô'];
    const initialValues: FormValues = { name: "", phoneNum: "" };
    const initialValues2: ErrorValues = { name: "", phoneNum: "" };
    const [formValues, setFormValues] = useState<FormValues>(initialValues);
    const [formErrors, setFormErrors] = useState<ErrorValues>(initialValues2);
    const [formValues2, setFormValues2] = useState<FormValues>(initialValues);
    const [formErrors2, setFormErrors2] = useState<ErrorValues>(initialValues2);

    const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      const updatedFormValues = { ...formValues, name: value };
      setFormValues(updatedFormValues);
      setFormErrors({...formErrors, name: validate(updatedFormValues, 1)});
    };

    const handleNum = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      const updatedFormValues = { ...formValues, phoneNum: value };
      setFormValues(updatedFormValues);
      setFormErrors({...formErrors, phoneNum: validate(updatedFormValues, 3)});
    };

    const handleName2 = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      const updatedFormValues = { ...formValues2, name: value };
      setFormValues2(updatedFormValues);
      setFormErrors2({...formErrors2, name: validate(updatedFormValues, 1)});
    };

    const handleNum2 = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      const updatedFormValues = { ...formValues2, phoneNum: value };
      setFormValues2(updatedFormValues);
      setFormErrors2({...formErrors2, phoneNum: validate(updatedFormValues, 3)});
    };

    const validate = (values: FormValues, type: number): string => {
      var errors: string = "";
      const EmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
      const PhoneRegex = /^\d+$/;
      if (type == 1 && !values.name) {
        errors = "Thiếu tên mất rồi.";
      }
      if (type ==3 )
      {
        if (values.phoneNum === "") {
        errors = "Nhập số điện thoại vào nè!";
      } else if (!PhoneRegex.test(values.phoneNum)) {
        errors= "Số này không hợp lệ rồi!";
      } else if (values.phoneNum.length < 10) {
        errors = "Hình như bạn nhập thiếu số rồi!";
      } else if (values.phoneNum.length > 10) {
        errors = "Bạn mình ơi, dư số nào rồi!";
      }
    }
      return errors;
    };

    return <div className="flex flex-col h-5/6 w-full mt-8 border-2 border-red-500 overflow-y-scroll rounded-md">
            
    <h1 className="mt-2 text-2xl pl-6 text-black font-bold text-nowrap cursor-default">
        Địa điểm
    </h1>
    <div className="flex flex-col items-stretch self-center w-11/12 mb-5 mt-2 bg-transparent rounded-2xl border-2 border-gray-300">
      
      <h1 className="mt-4 text-sm font-bold pl-5 text-black text-nowrap cursor-default">Địa điểm lấy hàng</h1>
      
      <div className="relative self-center w-11/12 mt-3 mb-2">
        <input
          type="text"
          className="h-12 self-center w-full border border-gray-300 
                    rounded focus:outline-none focus:ring-2 
                    placeholder-gray focus:ring-red-500 text-left pl-3 pr-12 text-black overflow-hidden"
          placeholder="Địa chỉ..."
        />
        <button className="absolute top-1/2 h-12 w-10 right-0 flex items-center pointer-event-stroke
                    -translate-y-1/2
                    rounded-r-xl">
          <HiDotsHorizontal className="text-gray-400 w-full border-l-2" />
        </button>
      </div>

      <Dropdown name="Chi tiết địa điểm" options={locationOptions}/>
      
      <div className="flex flex-col self-center items-left h-6 w-11/12 mt-1 mb-4 z-[5]">
        <button className="h-6 w-2/6 bg-light pointer-event-stroke text-xs text-left text-black hover:text-orange-600" style={{ whiteSpace: 'nowrap' }}>+ Chi tiết địa chỉ
        </button>
      </div>

      <div className="flex flex-col sm:flex-row justify-center self-center w-11/12 rounded-2xl">
      
        <div className="relative self-center sm:grow w-full">
          <input
            id="orderName"
            name="orderName"
            type="text"
            className={`peer h-12 self-center w-full border border-gray-300 rounded focus:outline-none 
                      ${formErrors.name ? 'ring-2 ring-red-500' : 'focus:ring-2 focus:ring-red-500'} 
                      text-left placeholder-transparent pl-3 pt-2 text-black sm:pr-12`}
            placeholder="Tên người gửi"
            onChange={handleName} 
          />
          <label
            htmlFor="orderName"
            className="absolute left-3 -top-0 text-xxs leading-5 text-gray-600 transition-all 
                      peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-700 peer-placeholder-shown:top-3.5 
                      peer-focus:-top-0 peer-focus:leading-5 peer-focus:text-red-500 peer-focus:text-xxs"
          >
            Tên người gửi
          </label>
          <p className="text-red-500 absolute text-sm overflow-hidden pt-1">{formErrors.name}</p>
          <button className="absolute top-1/2 h-12 w-10 right-0 flex items-center pointer-event-stroke
                      -translate-y-1/2
                      rounded-r-xl">
            <FaUserCircle className={`flex text-gray-500 w-full border-l-2 ${formErrors.name ? 'border-red-500' : ''}`} />
          </button>
        </div>

        <div className="relative self-center sm:grow sm:pl-4 w-full mt-6 sm:mt-0">
          <input
            id="orderPhoneNum"
            name="orderPhoneNum"
            type="text"
            className={`peer h-12 self-center w-full border border-gray-300 rounded focus:outline-none 
                      ${formErrors.phoneNum ? 'ring-2 ring-red-500' : 'focus:ring-2 focus:ring-red-500'} 
                      text-left placeholder-transparent pl-3 pt-2 text-black sm:pr-12`}
            placeholder="Số điện thoại"
            onChange={handleNum} 
          />
          <button className="absolute top-1/2 h-12 w-10 right-0 flex items-center pointer-event-stroke
                      -translate-y-1/2
                      rounded-r-xl">
            <FaMobile className={`flex text-gray-500 w-full border-l-2 ${formErrors.phoneNum ? 'border-red-500' : ''}`} />
          </button>
          <label
            htmlFor="orderPhoneNum"
            className="sm:left-7 absolute left-3 -top-0 text-xxs leading-5 text-gray-600 transition-all 
                      peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-700 peer-placeholder-shown:top-3.5 
                      peer-focus:-top-0 peer-focus:leading-5 peer-focus:text-red-500 peer-focus:text-xxs"
          >
            Số điện thoại
          </label>
          <p className="text-red-500 absolute text-sm overflow-hidden pt-1">{formErrors.phoneNum}</p>
        </div>

      </div>

      <button className="self-center w-11/12 rounded-xl mb-4 mt-7 py-3 bg-red-600 hover:bg-RedGradient">
        Xác nhận
      </button>

    </div>

    <div className="flex flex-col items-stretch self-center w-11/12 mb-5 mt-2 bg-light rounded-2xl border-2 border-gray-300">
      
      <h1 className="mt-4 text-sm font-bold pl-5 text-black text-nowrap cursor-default">Địa điểm giao hàng</h1>
      
      <div className="relative self-center w-11/12 mt-3 mb-2">
        <input
          type="text"
          className="h-12 self-center w-full border border-gray-300 
                    rounded focus:outline-none focus:ring-2 focus:ring-red-500 text-left pl-3 pr-12 text-black"
          placeholder="Địa chỉ..."
        />
        <button className="absolute top-1/2 h-12 w-10 right-0 flex items-center pointer-event-stroke
                    -translate-y-1/2
                    rounded-r-xl">
          <HiDotsHorizontal className="text-gray-400 w-full border-l-2" />
        </button>
      </div>
      
      <Dropdown name="Chi tiết địa điểm" options={locationOptions}/>
      
      <div className="flex flex-col self-center items-left h-6 w-11/12 mt-1 mb-4">
        <button className="h-6 w-2/6 bg-light pointer-event-stroke text-xs text-left text-black hover:text-orange-600" style={{ whiteSpace: 'nowrap' }}>+ Chi tiết địa chỉ
        </button>
      </div>

      <div className="flex flex-col sm:flex-row justify-center self-center w-11/12 rounded-2xl">
      
      <div className="relative self-center sm:grow w-full">
          <input
            id="receiverName"
            name="receiverName"
            type="text"
            className={`peer h-12 self-center w-full border border-gray-300 rounded focus:outline-none 
                      ${formErrors2.name ? 'ring-2 ring-red-500' : 'focus:ring-2 focus:ring-red-500'} 
                      text-left placeholder-transparent pl-3 pt-2 text-black sm:pr-12`}
            placeholder="Tên người nhận"
            onChange={handleName2} 
          />
          <label
            htmlFor="receiverName"
            className="absolute left-3 -top-0 text-xxs leading-5 text-gray-600 transition-all 
                      peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-700 peer-placeholder-shown:top-3.5 
                      peer-focus:-top-0 peer-focus:leading-5 peer-focus:text-red-500 peer-focus:text-xxs"
          >
            Tên người nhận
          </label>
          <p className="text-red-500 absolute text-sm overflow-hidden pt-1">{formErrors2.name}</p>
          <button className="absolute top-1/2 h-12 w-10 right-0 flex items-center pointer-event-stroke
                      -translate-y-1/2
                      rounded-r-xl">
            <FaUserCircle className={`flex text-gray-500 w-full border-l-2 ${formErrors2.name ? 'border-red-500' : ''}`} />
          </button>
        </div>

        <div className="relative self-center sm:grow sm:pl-4 w-full mt-6 sm:mt-0">
          <input
            id="receiverPhoneNum"
            name="receiverPhoneNum"
            type="text"
            className={`peer h-12 self-center w-full border border-gray-300 rounded focus:outline-none 
                      ${formErrors2.phoneNum ? 'ring-2 ring-red-500' : 'focus:ring-2 focus:ring-red-500'} 
                      text-left placeholder-transparent pl-3 pt-2 text-black sm:pr-12`}
            placeholder="Số điện thoại"
            onChange={handleNum2} 
          />
          <button className="absolute top-1/2 h-12 w-10 right-0 flex items-center pointer-event-stroke
                      -translate-y-1/2
                      rounded-r-xl">
            <FaMobile className={`flex text-gray-500 w-full border-l-2 ${formErrors2.phoneNum ? 'border-red-500' : ''}`} />
          </button>
          <label
            htmlFor="receiverPhoneNum"
            className="sm:left-7 absolute left-3 -top-0 text-xxs leading-5 text-gray-600 transition-all 
                      peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-700 peer-placeholder-shown:top-3.5 
                      peer-focus:-top-0 peer-focus:leading-5 peer-focus:text-red-500 peer-focus:text-xxs"
          >
            Số điện thoại
          </label>
          <p className="text-red-500 absolute text-sm overflow-hidden pt-1 text-clip">{formErrors2.phoneNum}</p>
        </div>

      </div>

      <button className="self-center w-11/12 rounded-xl mb-4 mt-7 py-3 bg-red-600 hover:bg-RedGradient">
        Xác nhận
      </button>

    </div>

  </div>
}

export default LocationForm;