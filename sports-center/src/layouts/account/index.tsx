// import * as React from "react";
import { Outlet } from "react-router-dom";
import Appbar from "./Appbar";
// import { DefaultSidebar } from "./Sidebar";

const AccountLayout = () => {
  return (
    <>
      <Appbar />
      {/* <DefaultSidebar /> */}
      <main>
        <div className=" m-5 py-4 sm:px-6 lg:px-1 ">
          {/* <div className="mx-16  py-6 sm:px-6 lg:px-1"> */}
          <Outlet />
        </div>
      </main>
    </>
  );
};

export default AccountLayout;
