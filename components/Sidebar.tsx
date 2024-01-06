import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useMemo } from "react";
import siteMetadata from '../data/siteMetadata'
import Image from "next/image";
import MobileMenu from "./NavigationBar/MobileMenu";
import {
  ArticleIcon,
  CollapsIcon,
  HomeIcon,
  LogoIcon,
  LogoutIcon,
  UsersIcon,
  VideosIcon,
  TruckIcon,
  HistoryIcon,
  GraphIcon,
  AddIcon,
  CompassIcon,
  WalletIcon
} from "./Icons";
import { log } from "console";

const menuItems = [
  { id: 1, label: "Thêm mới", icon: AddIcon, link: "/order" },
  { id: 2, label: "Định vị", icon: CompassIcon, link: "/posts" },
  { id: 3, label: "Số dư", icon: WalletIcon, link: "/balance" },
  { id: 4, label: "Lịch sử", icon: HistoryIcon, link: "/orderhistory" },
  { id: 5, label: "Thống kê", icon: GraphIcon, link: "/reportpage"},
];
interface MyComponentProps {
  toggleCollapseMobile: boolean;
}
const Sidebar: React.FC<MyComponentProps> = ({ toggleCollapseMobile })  => {
  const [toggleCollapse, setToggleCollapse] = useState(false);
  // const [toggleCollapseMobile, setToggleCollapseMobile] = useState(false);
  const [isCollapsible, setIsCollapsible] = useState(false);

  const router = useRouter();

  const activeMenu = useMemo(
    () => menuItems.find((menu) => menu.link === router.pathname),
    [router.pathname]
  );

  const wrapperClasses = classNames(
    "h-screen hidden z-50 lg:px-4 lg:flex pt-8 pb-4 bg-ligth justify-between flex-col",
    {
      ["lg:w-80"]: !toggleCollapse,
      ["lg:w-20"]: toggleCollapse,
    }
  );
  const wrapperClassesMobile = classNames(
    "h-screen flex z-50 fixed  lg:hidden px-4 pt-8 pb-4 bg-light justify-between flex-col",
    {
      ["w-60"]: !toggleCollapseMobile,
      ["w-0 px-0"]: toggleCollapseMobile,
    }
  );

  const collapseIconClasses = classNames(
    "p-4 rounded bg-light-lighter absolute right-0 hidden lg:block",
    {
      "rotate-180": toggleCollapse,
    }
  );

  const getNavItemClasses = (menu : any) => {
    return classNames(
      "flex items-center cursor-pointer hover:bg-light-lighter rounded w-full overflow-hidden whitespace-nowrap",
      {
        ["bg-light-lighter"]: activeMenu?.id === menu.id,
      }
    );
  };

  const onMouseOver = () => {
    setIsCollapsible(!isCollapsible);
  };

  const handleSidebarToggle = () => {
    setToggleCollapse(!toggleCollapse);
  };
  // const handleSidebarToggleMobile = () => {
  //   setToggleCollapseMobile(!toggleCollapseMobile);
  // };

  return (
    <>
    <div
      className={wrapperClasses}
      onMouseEnter={onMouseOver}
      onMouseLeave={onMouseOver}
      style={{ transition: "width 200ms cubic-bezier(0.2, 0, 0, 1) 0s" }}
    >
      <div className="flex flex-col">
        <div className="flex  items-center justify-between relative">
          <div className="flex items-center pl-1 gap-4">
            <LogoIcon />
            <span
              className={classNames("mt-2 text-2xl font-bold text-text", {
              hidden: toggleCollapse,
              })}
            >
              {siteMetadata.title}
            </span>
          </div>
          {isCollapsible && (
            <button
              className={collapseIconClasses}
              onClick={handleSidebarToggle}
            >
              <CollapsIcon />
            </button>
          )}
        </div>

        {!toggleCollapse && (
        <div className="flex rounded-lg overflow-hidden items-center mt-10 p-3 w-full h-24 bg-LitghRedGradient">
          <div style={!toggleCollapse? { width: "5rem" }: { width: "0rem" }}>
            <Image
              className="rounded-full object-cover overflow-hidden"
              // src={user.img || "/noavatar.png"}
              src={"/SunGlass.jpg"}
              alt=""
              width="70"
              height="70"
            />
          </div>
          {!toggleCollapse && (
          <div className="flex flex-col overflow-hidden">
            <span className="font-bold text-xl text-white overflow-hidden">Trần Vĩ Quang</span>
            <span className="text-xs text-white overflow-hidden">Thành viên</span>
          </div>
          )}
        </div>
        )}
        
        <div className="flex flex-col items-start mt-10">
          {menuItems.map(({ icon: Icon, ...menu }) => {
            const classes = getNavItemClasses(menu);
            return (
              <div key={menu.id} className={classes}>
                <Link href={menu.link}>
                  <div className="flex py-4 px-3 items-center w-full h-full">
                    <div style={!toggleCollapse? { width: "2.5rem" }: { width: "0rem" }}>
                      <Icon />
                    </div>
                    {!toggleCollapse && (
                      <span
                        className={classNames(
                          "text-md font-medium text-black"
                        )}
                      >
                        {menu.label}
                      </span>
                    )}
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
      <div className={`${getNavItemClasses({})}`}>
        <div className="flex py-4 px-3 items-center w-full h-full">
          <div style={ !toggleCollapse? { width: "2.5rem" }: { width: "0rem" }}>
            <LogoutIcon />
          </div>
          {!toggleCollapse && (
            <span
              className={classNames(
                "text-md font-medium text-black"
              )}
            >
              Đăng xuất
            </span>
          )}
        </div>
      </div>
    </div>
    
    <div
      className={wrapperClassesMobile}
      onMouseEnter={onMouseOver}
      onMouseLeave={onMouseOver}
      style={{ transition: "width 200ms cubic-bezier(0.2, 0, 0, 1) 0s" }}
    >
      <div className="flex flex-col">
        <div className="flex items-center justify-between relative">
          <div className="flex items-center pl-1 gap-4">
            <LogoIcon />
            <span
              className={classNames("mt-2 text-2xl font-bold text-text", {
              hidden: toggleCollapseMobile,
              })}
            >
              {siteMetadata.title}
            </span>
          </div>
          {isCollapsible && (
            <button
              className={collapseIconClasses}
              onClick={handleSidebarToggle}
            >
              <CollapsIcon />
            </button>
          )}
        </div>

        {!toggleCollapseMobile && (
        <div className="flex rounded-lg items-center mt-10 p-2 w-full h-24 bg-LitghRedGradient">
          <div style={!toggleCollapseMobile? { width: "5rem" }: { width: "0rem" }}>
            <Image
              className="rounded-full object-cover"
              // src={user.img || "/noavatar.png"}
              src={"/SunGlass.jpg"}
              alt=""
              width="60"
              height="60"
            />
          </div>
          {!toggleCollapseMobile && (
          <div className="flex flex-col">
            <span className="font-bold text-md text-white">Trần Vĩ Quang</span>
            <span className="text-xs text-white">Thành viên</span>
          </div>
          )}
        </div>
        )}

        <div className="flex flex-col items-start mt-10">
          {menuItems.map(({ icon: Icon, ...menu }) => {
            const classes = getNavItemClasses(menu);
            return (
              <div key={menu.id} className={classes}>
                <Link href={menu.link}>
                  <div className="flex py-4 px-3 items-center w-full h-full">
                    <div style={!toggleCollapseMobile? { width: "2.5rem" }: { width: "0rem", display: "false"}}>
                      <Icon />
                    </div>
                    {!toggleCollapseMobile && (
                      <span
                        className={classNames(
                          "text-md font-medium text-black"
                        )}
                      >
                        {menu.label}
                      </span>
                    )}
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      <div className={`${getNavItemClasses({})}`}>
        <div className="flex py-4 px-3 items-center w-full h-full">
        {!toggleCollapseMobile && <div style={ { width: "2.5rem" }}>
            <LogoutIcon />
          </div>}
          {!toggleCollapseMobile && (
            <span
              className={classNames(
                "text-md font-medium text-black"
              )}
            >
              Đăng xuất
            </span>
          )}
        </div>
      </div>
    </div>
    </>
  );
};

export default Sidebar;
