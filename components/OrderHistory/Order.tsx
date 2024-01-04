import React, { useState } from 'react';
import AllOrder from './Navi/AllOrder';
import Cancel from './Navi/Cancel';
import Complete from './Navi/Complete';
import Delivering from './Navi/Delivering';
import LookingFor from './Navi/LookingFor';
import Received from './Navi/Received';
import WaitForConfirm from './Navi/WaitForConfirm';
import WaitForPay from './Navi/WaitForPay';
import Waiting from './Navi/Waiting';
import SearchBar from './SearchBar';
import TagDropDown from './TagDropDown';
import TimeDropDown from './TimeDropDown';
import ExportDropDown from './ExportDropDown';
const App = () => {
  const [view, setView] = useState('AllOrder');
  const [isOpen, setIsOpen] = useState(false);

  const toggleNav = () => {
    setIsOpen(!isOpen);
  };
  const renderView = () => {
    switch(view) {
        case 'AllOrder':
            return <AllOrder />;
        case 'Cancel':
            return <Cancel />;
        case 'Complete':
            return <Complete />;
        case 'Delivering':
            return <Delivering />;
        case 'LookingFor':
            return <LookingFor />;
        case 'Received':
            return <Received />;
        case 'WaitForConfirm':
            return <WaitForConfirm />;
        case 'WaitForPay':
            return <WaitForPay />;
        case 'Waiting':
            return <Waiting />;
      default:
        return <AllOrder />;
    }
  };

  return (
    <div className='relative'>
        <div >
        <div className="font-sans text-black antialiased rounded-xl">
        <nav className="justify-between flex-wrap bg-white p-6 rounded-xl">
        <div className="flex justify-between flex-shrink-0 text-black mr-6">
            <span className="font-semibold text-xl tracking-tight">Báo cáo thống kê</span>
            <div className=" block lg:hidden">
            <button onClick={toggleNav} className=" flex items-center px-3 py-2 border rounded text-black border-teal-400 hover:text-red-500 focus:text-red-500 hover:border-white">
            <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
            </button>
        </div>
        </div>

      <div className={` z-30 absolute  w-5/6 block flex-grow lg:flex lg:items-center lg:w-auto ${isOpen ? '' : 'hidden'}`}>
        <div className="text-sm lg:flex-grow bg-white  block rounded-xl">
          {/* Your buttons go here */}
            <button onClick={() => setView('AllOrder')} className=" rounded-xl z-30 block mt-4 lg:inline-block lg:mt-0 text-black hover:text-red-500 focus:text-red-500 mr-4">
                Tất cả đơn hàng
            </button>
            <button onClick={() => setView('Waiting')} className="  rounded-xl z-30 block mt-4 lg:inline-block lg:mt-0 text-black hover:text-red-500 focus:text-red-500 mr-4">
                Chờ lấy hàng
            </button>
            <button onClick={() => setView('LookingFor')} className="  rounded-xl z-30 block mt-4 lg:inline-block lg:mt-0 text-black hover:text-red-500 focus:text-red-500 mr-4">
                Đang lấy hàng
            </button>
            <button onClick={() => setView('Delivering')} className=" rounded-xl z-30 block mt-4 lg:inline-block lg:mt-0 text-black hover:text-red-500 focus:text-red-500 mr-4">
                Đang giao hàng
            </button>
            <button onClick={() => setView('WaitForConfirm')} className="  rounded-xl z-30 block mt-4 lg:inline-block lg:mt-0 text-black hover:text-red-500 focus:text-red-500 mr-4">
                Chờ xác nhận
            </button>
            <button onClick={() => setView('WaitForPay')} className=" rounded-xl z-30 block mt-4 lg:inline-block lg:mt-0 text-black hover:text-red-500 focus:text-red-500 mr-4">
                Chờ thanh toán
            </button>
            <button onClick={() => setView('Complete')} className=" rounded-xl z-30 block mt-4 lg:inline-block lg:mt-0 text-black hover:text-red-500 focus:text-red-500 mr-4">
                Hoàn thành
            </button>
            <button onClick={() => setView('Cancel')} className=" rounded-xl z-30 block mt-4 lg:inline-block lg:mt-0 text-black hover:text-red-500 focus:text-red-500 mr-4">
                Đã hủy
            </button>
            <button onClick={() => setView('Received')} className=" rounded-xl z-30 block mt-4 lg:inline-block lg:mt-0 text-black hover:text-red-500 focus:text-red-500 mr-4">
                Đã nhận
            </button>
        </div>
      </div>
    </nav>
            

        </div>
            <div className='my-4 '>
                <div>
                    <div >
                        <SearchBar/>
                    </div>
                    {/* <div>
                        <TagDropDown/>
                    </div> */}
                    <div className='flex justify-between'>
                        <div className='ml-4'>
                            <TimeDropDown/>
                        </div>
                        <div className='mr-4'>
                            <div className="relative p-4 z-20 ">
                                    <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-2
                                        w-24 h-8 
                                        sm:w-32 sm:h-10 
                                        rounded-full
                                        flex items-center justify-center
                                        ">
                                        <span
                                            className="text-xs "
                                        >Xuất dữ liệu</span>
                                    </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='place-content-center'>
                {renderView()}
                </div>
            </div>
        </div>
        
    </div>
  );
};

export default App;
