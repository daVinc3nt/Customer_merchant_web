import React from "react";
import { HiDotsHorizontal } from 'react-icons/hi';
import { FaUserCircle, FaMobile } from "react-icons/fa";
import Dropdown from "./ListBox";

const LocationForm = () => {
    const locationOptions = ['Mặt tiền/Mặt phố', 'Bãi xe', 'Hẻm/Ngõ 2m', 'Hẻm/Ngõ 3m' , 'Hẻm/Ngõ ô tô'];

    return <div className="flex flex-col h-5/6 w-full mt-8 bg-red-400 border-2 border-red-500 overflow-y-scroll rounded-md">
            
    <h1 className="mt-2 text-2xl font-medium pl-6 text-white text-nowrap cursor-default" style={{ textShadow: '-1px -1px 0 red, 1px -1px 0 red, -1px 1px 0 black, 1px 1px 0 red' }}>Địa điểm</h1>
    <div className="flex flex-col items-stretch self-center w-11/12 mb-5 mt-2 bg-light rounded-2xl">
      
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
      
      <div className="flex flex-col self-center items-left h-6 w-11/12 mt-1 mb-4 z-40">
        <button className="h-6 w-2/6 bg-light pointer-event-stroke text-xs text-left text-black hover:text-orange-600" style={{ whiteSpace: 'nowrap' }}>+ Chi tiết địa chỉ
        </button>
      </div>

      <div className="flex flex-col sm:flex-row justify-center self-center w-11/12 rounded-2xl">
      
        <div className="relative self-center sm:grow w-full">
          <input
            type="text"
            className="h-12 self-center w-full border border-gray-300 
                      rounded focus:outline-none focus:ring-2 
                      placeholder-gray focus:ring-red-500 text-left pl-3 text-black sm:pr-12"
            placeholder="Tên người gửi..."
          />
          <button className="absolute top-1/2 h-12 w-10 right-0 flex items-center pointer-event-stroke
                      -translate-y-1/2
                      rounded-r-xl">
            <FaUserCircle className="hidden sm:flex text-gray-500 w-full border-l-2" />
          </button>
        </div>

        <div className="relative self-center sm:grow sm:pl-4 w-full mt-4 sm:mt-0">
          <input
            type="text"
            className="h-12 self-center w-full border border-gray-300 
                      rounded focus:outline-none focus:ring-2 
                      placeholder-gray focus:ring-red-500 text-left pl-3 text-black sm:pr-12"
            placeholder="Số điện thoại..."
          />
          <button className="absolute top-1/2 h-12 w-10 right-0 flex items-center pointer-event-stroke
                      -translate-y-1/2
                      rounded-r-xl">
            <FaMobile className="hidden sm:flex text-gray-500 w-full border-l-2" />
          </button>
        </div>

      </div>

      <button className="self-center w-11/12 rounded-xl mb-4 mt-4 py-3 bg-red-600 hover:bg-RedGradient">
        Xác nhận
      </button>

    </div>

    <div className="flex flex-col items-stretch self-center w-11/12 mb-5 mt-2 bg-light rounded-2xl">
      
      <h1 className="mt-4 text-sm font-bold pl-5 text-black text-nowrap cursor-default">Địa điểm giao hàng</h1>
      
      <div className="relative self-center w-11/12 mt-3 mb-2">
        <input
          type="text"
          className="h-12 self-center w-full border border-gray-300 
                    rounded focus:outline-none focus:ring-2 
                    placeholder-gray focus:ring-red-500 text-left pl-3 pr-12 text-black"
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
            type="text"
            className="h-12 self-center w-full border border-gray-300 
                      rounded focus:outline-none focus:ring-2 
                      placeholder-gray focus:ring-red-500 text-left pl-3 text-black sm:pr-12"
            placeholder="Tên người nhận..."
          />
          <button className="absolute top-1/2 h-12 w-10 right-0 flex items-center pointer-event-stroke
                      -translate-y-1/2
                      rounded-r-xl">
            <FaUserCircle className="hidden sm:flex text-gray-500 w-full border-l-2" />
          </button>
        </div>

        <div className="relative self-center sm:grow sm:pl-4 w-full mt-4 sm:mt-0">
          <input
            type="text"
            className="h-12 self-center w-full border border-gray-300 
                      rounded focus:outline-none focus:ring-2 
                      placeholder-gray focus:ring-red-500 text-left pl-3 text-black sm:pr-12"
            placeholder="Số điện thoại..."
          />
          <button className="absolute top-1/2 h-12 w-10 right-0 flex items-center pointer-event-stroke
                      -translate-y-1/2
                      rounded-r-xl">
            <FaMobile className="hidden sm:flex text-gray-500 w-full border-l-2" />
          </button>
        </div>

      </div>

      <button className="self-center w-11/12 rounded-xl mb-4 mt-4 py-3 bg-red-600 hover:bg-RedGradient">
        Xác nhận
      </button>

    </div>

  </div>
}

export default LocationForm;