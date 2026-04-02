import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { FaUser, FaDatabase } from "react-icons/fa";
import { RiAdminFill } from "react-icons/ri";
import type { ReactNode } from "react";
import type { user } from "../type/user";
import Cookies from "js-cookie";

type Page = {
  title: string;
  icon: ReactNode;
  path: string;
};

const MainLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const pages: Page[] = [
    {
      title: "User",
      icon: <FaUser />,
      path: "/",
    },
    {
      title: "Data",
      icon: <FaDatabase />,
      path: "/data",
    },
  ];

  

  let userData: user | null = null;
  const cookie = Cookies.get("user");
  userData = cookie ? JSON.parse(cookie) : null;

  return (
    <div className="flex h-screen bg-gray-50">
      <aside className="w-[260px] bg-white border-r border-gray-200 flex flex-col">
        <div  className="flex items-center justify-center h-[80px] gap-2 py-5 border-b border-gray-200">
          <RiAdminFill className="text-xl text-blue-600" />
          <h1 className="text-lg font-semibold text-gray-700">
            Admin Panel
          </h1>
        </div>

        <div className="flex flex-col gap-1 p-3">
          {pages.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <div
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer transition-all
                  ${
                    isActive
                      ? "bg-blue-100 text-blue-600 font-medium"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span className="capitalize">{item.title}</span>
              </div>
            );
          })}
        </div>
      </aside>

      <div className="flex-1 flex flex-col">
        <div className="flex justify-end items-center px-5 py-5 h-[80px] bg-white border-b border-gray-200 relative">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => {}}
          >
                
           <div className="w-12 h-12 rounded-full bg-indigo-500 text-white flex items-center justify-center text-lg font-bold">
            {userData?.user?.charAt(0)?.toUpperCase() || "?"}
          </div>
            <span className="text-gray-700 text-lg font-medium">Admin</span>
          </div>
        </div>

        <main className="flex-1 p-5 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;