import React from "react";
import { HiDotsHorizontal,HiOutlineChevronDown } from 'react-icons/hi';
import Dropdown from "./ListBox";

const MoreDetailsForm = () => {
    const typesOfGoods = ['Mỹ phẩm', 'Dược phẩm', 'Thực phẩm', 'Đồ uống' , 'Vật liệu phục vụ sản xuất' , 'Thiết bị, máy móc, đồ điện tử' , 'Nội thất, trang trí' , 'Bao bì, may mặc'];
    const weightOptions = ['Dưới 500kg', '500 - 1000kg', '1001 - 1500kg', 'Trên 1500kg'];

    return <div className="flex flex-col h-5/6 w-full mt-8 border-2 border-red-500 rounded-md overflow-y-hidden">  
    <h1 className="mt-2 text-2xl font-bold pl-6 text-black text-nowrap cursor-default">Thêm chi tiết</h1>
    <div className="flex flex-col items-stretch self-center w-11/12 mb-5 mt-2 bg-light rounded-2xl">
      
      <h1 className="mt-4 text-sm font-bold pl-5 text-black text-nowrap cursor-default">Thời gian lấy hàng</h1>
      
      <div className="relative self-center w-11/12 mt-2 mb-4">
        <input
          type="text"
          className="h-12 self-center w-full border border-gray-300 
                    rounded focus:outline-none focus:ring-2 
                    placeholder-gray focus:ring-red-500 text-left pl-3 text-black"
          placeholder="Giao ngay..."
        />
        <button className="absolute top-1/2 h-12 w-10 right-0 flex items-center pointer-event-stroke
                    -translate-y-1/2
                    rounded-r">
          <HiOutlineChevronDown className="text-gray-400 w-full border-l-2" />
        </button>
      </div>

      <Dropdown name="Loại hàng hóa" options={typesOfGoods}/>

      <Dropdown name="Tổng trọng lượng" options={weightOptions}/>

      <h1 className="text-sm font-bold pl-5 text-black text-nowrap cursor-default">Kích thước (không bắt buộc)</h1>

      <div className="flex flex-col sm:flex-row justify-center self-center w-11/12 rounded-2xl my-4">
      
        <div className="relative self-center sm:grow w-full">
          <input
            type="text"
            className="h-12 self-center w-full border border-gray-300 
                      rounded focus:outline-none focus:ring-2 
                      placeholder-gray focus:ring-red-500 text-left pl-3 text-black pr-12"
            placeholder="Dài (m)"
          />
          <button className="absolute top-1/2 h-12 w-10 right-0 flex items-center pointer-event-stroke
                      -translate-y-1/2
                      rounded-r-xl">
            <HiDotsHorizontal className="flex text-gray-500 w-full border-l-2" />
          </button>
        </div>

        <div className="relative self-center sm:grow sm:pl-4 w-full mt-4 sm:mt-0">
          <input
            type="text"
            className="h-12 self-center w-full border border-gray-300 
                      rounded focus:outline-none focus:ring-2 
                      placeholder-gray focus:ring-red-500 text-left pl-3 text-black pr-12"
            placeholder="Rộng (m)"
          />
          <button className="absolute top-1/2 h-12 w-10 right-0 flex items-center pointer-event-stroke
                      -translate-y-1/2
                      rounded-r-xl">
            <HiDotsHorizontal className="flex text-gray-500 w-full border-l-2" />
          </button>
        </div>

        <div className="relative self-center sm:grow sm:pl-4 w-full mt-4 sm:mt-0">
          <input
            type="text"
            className="h-12 self-center w-full border border-gray-300 
                      rounded focus:outline-none focus:ring-2 
                      placeholder-gray focus:ring-red-500 text-left pl-3 text-black pr-12"
            placeholder="Cao (m)"
          />
          <button className="absolute top-1/2 h-12 w-10 right-0 flex items-center pointer-event-stroke
                      -translate-y-1/2
                      rounded-r-xl">
            <HiDotsHorizontal className="flex text-gray-500 w-full border-l-2" />
          </button>
        </div>

      </div>

    </div>

  </div>
}

export default MoreDetailsForm;