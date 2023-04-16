import React, { useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
export default function Seller() {
  const nav = useNavigate();

  useEffect(() => {
    const isLoggedIn = Cookies.get("seller");
    if (!isLoggedIn) {
      return nav("/login");
    }
  }, []);
  const handleLogout = async () => {
    Cookies.remove("seller");
    window.alert("Log Out");
  };
  return (
    <>
      <button
        data-drawer-target="separator-sidebar"
        data-drawer-toggle="separator-sidebar"
        aria-controls="separator-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clip-rule="evenodd"
            fill-rule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      <aside
        id="separator-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform text-lg -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 text-white dark:bg-orange-500">
          <ul>
            <li>
              <NavLink
                to=""
                className="flex items-center px-3 text-white py-2 dark:text-white dark:hover:text-orange-500   rounded-lg dark:hover:bg-white overflow-hidden"
              >
                <i className="fa-solid fa-house dark:hover:text-slate-800"></i>
                <span className="ml-3">Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/seller/addproduct"
                className="flex items-center px-3 text-white py-2 dark:text-white dark:hover:text-orange-500  rounded-lg dark:hover:bg-white overflow-hidden"
              >
                <i className="fa-solid fa-user-plus dark:hover:text-slate-800"></i>
                <span className=" ml-3 ">Add Product</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/seller/addshow"
                className="flex items-center px-3 text-white py-2 dark:text-white dark:hover:text-orange-500  rounded-lg dark:hover:bg-white overflow-hidden"
              >
                <i className="fa-solid fa-user-plus dark:hover:text-slate-800"></i>
                <span className=" ml-3 ">Add Show</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/seller/productreport"
                className="flex items-center px-3 text-white py-2 dark:text-white dark:hover:text-orange-500  rounded-lg dark:hover:bg-white overflow-hidden"
              >
                <i class="fa-solid fa-address-book  dark:hover:text-slate-800"></i>
                <span className=" ml-3 ">Product Report</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/"
                className="flex items-center px-3 text-white py-2 dark:text-white dark:hover:text-orange-500 hover:bg-green-400 rounded-lg dark:hover:bg-white overflow-hidden"
              >
                <i className="fa-solid fa-right-from-bracket dark:hover:text-slate-800"></i>
                <span className="flex-1 ml-3 " onClick={handleLogout}>
                  Logout
                </span>
              </NavLink>
            </li>
          </ul>
        </div>
      </aside>

      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
          <Outlet />
        </div>
      </div>
    </>
  );
}
