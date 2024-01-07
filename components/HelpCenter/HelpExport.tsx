import React from 'react'
import HelpOther from './HelpOther'
import HelpProblem from './HelpProblem'
import HelpQuick from './HelpQuick'
import classNames from 'classnames'
import { useState, useEffect } from 'react'
import { CollapsIcon } from '../Icons'
const Data ='Nguyễn Văn A'
const HelpExport = () => {
  
  const [toggleCollapse, setToggleCollapse] = useState(false);
  const collapseIconClasses = classNames(
    "-bottom-2 lg:-bottom-6 p-2 lg:p-4 rounded bg-light-lighter hover:bg-gray-300 absolute left-0",
    {
      "rotate-180": toggleCollapse,
    }
  );
  const handleOrderFormToggle = () => {
    setToggleCollapse(!toggleCollapse);
  };
  const wrapperClasses = classNames(
    "relative bottom-0 px-4 pt-10 pb-4 bg-light flex justify-between flex-col rounded-2xl",
    {
      "h-full w-full ": !toggleCollapse,
      "w-16 lg:w-20 h-[calc(4rem)] lg:h-[calc(5rem)]": toggleCollapse,
      "@media (min-width: 1152px)": {
        "w-full": !toggleCollapse,
      },
    }
  );
  const [toggleCollapse2, setToggleCollapse2] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
      timer = setTimeout(() => {
        setToggleCollapse2(toggleCollapse);
      }, 200);
  
    return () => {
      clearTimeout(timer);
    };
  }, [toggleCollapse]);
  return (
    <div 
    className={wrapperClasses}
    style={{ transition: "width 500ms cubic-bezier(0.2, 0, 0, 1) 0s, height 500ms cubic-bezier(0.2, 0, 0, 1) 0s"}}
    >
      <div className="flex items-center justify-between relative">    
        <button
          className={collapseIconClasses}
          onClick={handleOrderFormToggle}
        >
          <CollapsIcon />
        </button>
      </div>
      {!toggleCollapse &&!toggleCollapse2&& (
          <div className='bg-gradient-to-b from-gray-100 to-gray-300 rounded-xl content-center overflow-y-auto no-scrollbar h-[calc(100vh-3rem)] w-full'>
            <div className='bg-gradient-to-tr from-white to-white h-20 flex place-content-start rounded-xl'>
              <p className='self-center 
              text-lg
              xl:text-3xl 
              font-semibold
              text-black mx-5 rounded-xl'>
                {`Xin chào ${Data} , chúng tôi có thể giúp gì cho bạn?`}
              </p>
            </div>
            <div className='my-10 flex place-items-center '>
              <div className='flex flex-col gap-5 place-items-center'>
                <div className='bg-gradient-to-tr from-white to-slate-100 rounded-lg w-11/12'>
                  <HelpOther/>
                </div>
                <div className='bg-gradient-to-tr from-white to-slate-100 rounded-lg w-11/12'>
                  <HelpProblem/>
                </div>
                <div className='bg-gradient-to-tr from-white to-slate-100 rounded-lg w-11/12'>
                  <HelpQuick/>
                </div>
              </div>
            </div>
          </div>
      )}
    </div>
  )
}

export default HelpExport