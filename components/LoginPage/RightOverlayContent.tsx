import React from 'react';
interface RightOverlayContentProps {
  isAnimated: boolean;
  setIsAnimated: React.Dispatch<React.SetStateAction<boolean>>;
}
const RightOverlayContent: React.FC<RightOverlayContentProps> = ({ isAnimated, setIsAnimated }) => {
  return (
    <div className="p-4 lg:p-8 text-center">
      <h1 className="text-xl sm:text-5xl font-bold text-white mb-2 sm:mb-5">
        Chưa có tài khoản?
      </h1>

      <h5 className="text-xs sm:text-lg text-white">Đăng ký mới nhé!</h5>
      <div className="mt-3 sm:mt-5">
        <button type="button" className="text-white text-xs sm:text-sm uppercase ring-2 ring-white bg-transparent active:scale-110 font-bold rounded-full px-3 py-1.5 sm:px-5 sm:py-2.5 text-center inline-flex items-center transition-transform ease-in"
        onClick={(e) => {
          setIsAnimated(!isAnimated);
        }}
        >
          Đăng ký 
          <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default RightOverlayContent;
