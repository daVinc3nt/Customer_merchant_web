import React, { useState } from 'react';
import Overview from './OverView';
import Distribution from './Distribution';
import Performance from './Performenta';



const App = () => {
  const [view, setView] = useState('overview');
  const [isOpen, setIsOpen] = useState(false);

  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  const renderView = () => {
    switch(view) {
      case 'overview':
        return <Overview />;
      case 'distribution':
        return <Distribution />;
      case 'performance':
        return <Performance />;
      default:
        return <Overview />;
    }
  };

  return (
      <div className='w-full ' >
      <div className="font-sans text-black antialiased rounded-xl">
      <nav className="justify-between flex-wrap bg-white p-6 rounded-xl">
      <div className="flex justify-between  flex-shrink-0 text-black mr-6">
        <span className="font-semibold text-xl tracking-tight">Báo cáo thống kê</span>
        <div className="block lg:hidden">
        <button onClick={toggleNav} className="flex items-center px-3 py-2 border rounded text-black border-teal-400 hover:text-red-100 focus:text-red-100 hover:border-white">
          <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
        </button>
      </div>
      </div>
      
      <div className={` z-10 absolute  w-5/6 block flex-grow lg:flex lg:items-center lg:w-auto ${isOpen ? '' : 'hidden'}`}>
        <div className="text-sm lg:flex-grow bg-white  block rounded-xl">
          {/* Your buttons go here */}
          <button onClick={() => setView('overview')} className="rounded-xl block mt-4 z-10 lg:inline-block lg:mt-0 text-black hover:text-red-100 focus:text-red-100 mr-4">
            Tổng quan
          </button>
          <button onClick={() => setView('distribution')} className="rounded-xl block mt-4 z-10 lg:inline-block lg:mt-0 text-black hover:text-red-100 focus:text-red-100 mr-4">
            Phân phối
          </button>
          <button onClick={() => setView('performance')} className="rounded-xl block mt-4 z-10 lg:inline-block lg:mt-0 text-black hover:text-red-100 focus:text-red-100 mr-4">
            Hiệu suất
          </button>
        </div>
      </div>
    </nav>
        

    </div>
    <div >
        <div className='text-black font-semibold text-sm ml-6 border-d border mr-6  '>
          <div className=''>
            <p>Thời gian</p>
            <input
                className="shadow appearance-none border rounded w-full  px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline py-3"
                type="text"
                placeholder= {"Nhập thời gian"}
            />
            </div>
            <div className=''>
            <p>Nhân viên</p>
            <input
                className="shadow appearance-none border rounded w-full  px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline py-3"
                type="text"
                placeholder= {"Tất cả nhân viên"}
            />
            </div>
            <div className=''>
            <p>Dịch vụ</p>
            <input
                className="shadow appearance-none border rounded w-full  px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline py-3"
                type="text"
                placeholder= {"Tất cả dịch vụ"}
            />
            </div>
        </div>
          <div
          className='overflow-y-scroll mt-2
          h-screen_1/3
          xxs:h-screen_1/3
          xs:h-screen_2/5
          s:h-screen_1/2
          sm:h-screen_1/2
          md:h-screen_3/5
          lg:h-screen_3/5
          xl:h-screen_3/5
          2xl:h-screen_4/5
          3xl:h-screen_4/5
          mb-2
          '
          >
            {renderView()}
          </div>
        </div>
    </div>
  );
};

export default App;
