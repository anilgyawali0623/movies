import React from "react";
import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <div className="relative min-h-screen bg-cover bg-center pt-32">
      {/* Ensures all pages inside <Outlet /> appear above the background */}
      <div className="relative z-10 text-white">
        <Outlet />
      </div>
    </div>
  );
}

export default MainLayout;
