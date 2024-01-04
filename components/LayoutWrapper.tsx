import React, { ReactNode, useState } from "react";
import Sidebar from "./Sidebar";
import MobileMenu from "./NavigationBar/MobileMenu";
import {
  NotifyIcon,
  GlobseIcon
} from "../components/Icons"
import { FaCarSide } from "react-icons/fa";
interface LayoutProps {
  children: ReactNode;
} 
//reactNode is a dataType of react, its can be JSX, 
//component or any fragment

const Wrapper = ({ children }: LayoutProps) => {
  const [toggleCollapseMobile, setToggleCollapseMobile] = useState(false);
  const handleSidebarToggleMobile = () => {
    setToggleCollapseMobile(!toggleCollapseMobile);
  };
  return (
    <div className="flex">
      <Sidebar toggleCollapseMobile={toggleCollapseMobile}/>
      <div className="flex-1 flex flex-col h-screen  bg-RedGradient">
        <div className="flex flex-col">
          <header className="h-12 flex justify-end w-full items-center px-4 xl:px-0">
                <div className="flex items-center">
                  <NotifyIcon/>
                  <MobileMenu toggle ={handleSidebarToggleMobile}/>
                </div>
          </header>
        </div>
        {!toggleCollapseMobile && 
        <div className="lg:hidden flex-1 flex z-40 fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm">
        </div>}

        <div className="bg-primary flex flex-1 text-black">
            {children}
        </div>
      </div>
    </div>
  );
};

export default Wrapper;
