import React, { ReactNode } from "react";
interface NavProps {
  children: ReactNode;
} 
const LayoutWrapper = ({ children }: NavProps) => {
  return (
      <div className="relative flex flex-col justify-between">
          <header className="fixed z-10 flex w-full items-center justify-between bg-white px-4 xl:px-0">
              <div className="flex items-center justify-between text-base leading-5">
                  <div className="sm:block lg:flex lg:items-center">
                  </div>
              </div>
          </header>
      </div>
  )
}

export default LayoutWrapper
