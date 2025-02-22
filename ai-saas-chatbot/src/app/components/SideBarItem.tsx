"use client"
import React, { useState } from "react";

const SidebarItem = ({ icon, text, collapsed }: { icon: React.ReactNode; text: string; collapsed: boolean }) => (
    <li>
      <button className="flex items-center w-full p-2 rounded-md hover:bg-gray-700 transition">
        {icon}
        {!collapsed && <span className="ml-3">{text}</span>}
      </button>
    </li>
  );

  export default SidebarItem;