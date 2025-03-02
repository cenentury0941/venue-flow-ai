"use client";

import Flow from "@/components/flow";
import Toolbar from "@/components/toolbar";

const Layout = ({ children }) => {
  return (
    <div className="w-screen h-screen overflow-hidden">
      <Toolbar />
      <main className="grid grid-cols-3 w-full h-full ">
      <div className="col-span-2 px-5 pb-24"><div className="h-full w-full border-2 border-gray-400/30 rounded-[20px]"><Flow /></div></div>
      <div className="h-[90vh]">{children}</div>
      </main>
    </div>
  );
};

export default Layout;
