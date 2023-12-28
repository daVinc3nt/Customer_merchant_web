import React, { ReactNode } from "react";
import Sidebar from "./Sidebar";
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
    <div className="h-screen flex flex-row justify-start bg-RedGradient">
      <Sidebar/>
      <div className="flex-1 flex flex-col">
        <div className="flex justify-end">
          <NotifyIcon />
        </div>
        <div className="bg-primary flex-1 p-4 text-white">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Wrapper;
