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
    <div>
    <div className="font-sans text-black antialiased rounded-xl">
    <nav className="flex items-center justify-between flex-wrap bg-white p-6 rounded-xl">
      <div className="flex items-center flex-shrink-0 text-black mr-6">
        <span className="font-semibold text-xl tracking-tight">Báo cáo thống kê</span>
      </div>
      <div className="block lg:hidden">
        <button onClick={toggleNav} className="flex items-center px-3 py-2 border rounded text-black border-teal-400 hover:text-red-500 focus:text-red-500 hover:border-white">
          <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
        </button>
      </div>
      <div className={`w-full block flex-grow lg:flex lg:items-center lg:w-auto ${isOpen ? '' : 'hidden'}`}>
        <div className="text-sm lg:flex-grow">
          {/* Your buttons go here */}
          <button onClick={() => setView('overview')} className="block mt-4 lg:inline-block lg:mt-0 text-black hover:text-red-500 focus:text-red-500 mr-4">
            Tổng quan
          </button>
          <button onClick={() => setView('distribution')} className="block mt-4 lg:inline-block lg:mt-0 text-black hover:text-red-500 focus:text-red-500 mr-4">
            Phân phối
          </button>
          <button onClick={() => setView('performance')} className="block mt-4 lg:inline-block lg:mt-0 text-black hover:text-red-500 focus:text-red-500 mr-4">
            Hiệu suất
          </button>
        </div>
      </div>
    </nav>
        

    </div>
        <div className='text-black font-medium ml-3 border-d border mr-3 '>
          <div className='py-4'>
            <p>Thời gian</p>
            <input
                className="shadow appearance-none border rounded w-full  px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline py-3"
                type="text"
                placeholder= {"Nhập thời gian"}
            />
            </div>
            <div className='py-4'>
            <p>Nhân viên</p>
            <input
                className="shadow appearance-none border rounded w-full  px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline py-3"
                type="text"
                placeholder= {"Tất cả nhân viên"}
            />
            </div>
            <div className='py-4'>
            <p>Dịch vụ</p>
            <input
                className="shadow appearance-none border rounded w-full  px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline py-3"
                type="text"
                placeholder= {"Tất cả dịch vụ"}
            />
            </div>
        </div>
    {renderView()}
    </div>
  );
};

export default App;
