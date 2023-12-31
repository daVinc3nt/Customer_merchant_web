import React, { ReactNode } from "react";
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
  return (
    <div className="h-screen w-screen flex bg-RedGradient">
      <Sidebar/>
      <NotifyIcon />
      <div className="bg-primary flex-1 p-4 text-white">
          {children}
      </div>
    </div>
  );
};

export default Wrapper;
