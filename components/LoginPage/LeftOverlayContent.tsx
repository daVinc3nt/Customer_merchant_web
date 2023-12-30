import React from 'react';
interface LeftOverlayContentProps {
  isAnimated: boolean;
  setIsAnimated: React.Dispatch<React.SetStateAction<boolean>>;
}
const LeftOverlayContent: React.FC<LeftOverlayContentProps> = ({ isAnimated, setIsAnimated }) => {
  return (
    <div className="ml-16 sm:ml-24 sm:p-8 text-center">
      <h1 className="text-xl sm:text-5xl font-bold text-white mb-2 sm:mb-5">
        Đã có tài khoản?
      </h1>

      <h5 className="text-xs sm:text-lg text-white">Đăng nhập bên này nè!</h5>
      <div className="mt-3 sm:mt-5">
      <button type="button" className="text-white text-xxs sm:text-sm uppercase ring-2 ring-white bg-transparent active:scale-110 font-bold rounded-full text-sm px-3 py-0.5 sm:px-5 sm:py-2.5 text-center inline-flex items-center transition-transform ease-in"
        onClick={(e) => {
          setIsAnimated(!isAnimated);
        }}
        >
          <svg className="w-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd"></path>
          </svg>
          Đăng nhập
        </button>
      </div>
    </div>
  );
};

export default LeftOverlayContent;
