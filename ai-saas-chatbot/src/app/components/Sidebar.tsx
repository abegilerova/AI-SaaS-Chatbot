"use client";
import React, { useState,useEffect } from "react";
import DashboardIcon from "../icons/dashboard-icon";
import { Menu, MessageSquare, Settings, Calendar, Mail } from "lucide-react";
import SidebarItem from "./SideBarItem";
import DomaninMenu from "./sidebar/domain-menu";




const Sidebar = ( ) => {
  const [domains, setDomains] = useState<{ id: string; name: string; icon: string | null }[]>([]);
  console.log("domains aika ", domains);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const fetchDomains = async () => {
      try {
        const response = await fetch("/api/domains"); // Create this API route
        const data = await response.json();
        setDomains(data);
      } catch (error) {
        console.error("Error fetching domains:", error);
      }
    };

    fetchDomains();
  }, []);

  return (
    <div className={`h-screen bg-gray-900 text-white transition-all duration-300 ${collapsed ? "w-16" : "w-64"} flex flex-col p-4`}>
      {/* Toggle Button */}
      <button 
        onClick={() => setCollapsed(!collapsed)} 
        className="mb-4 p-2 bg-gray-700 rounded-md flex items-center justify-center hover:bg-gray-600 transition"
      >
        <Menu className="h-6 w-6" />
      </button>

      {/* Menu Header */}
      {!collapsed && <h5 className="text-sm font-semibold text-gray-400 mb-4">MENU</h5>}

      {/* Navigation Items */}
      <ul className="space-y-3">
        <SidebarItem icon={<DashboardIcon />} text="Dashboard" collapsed={collapsed} />
        <SidebarItem icon={<MessageSquare className="h-5 w-5" />} text="Conversations" collapsed={collapsed} />
        <SidebarItem icon={<Calendar className="h-5 w-5" />} text="Appointments" collapsed={collapsed} />
        <SidebarItem icon={<Mail className="h-5 w-5" />} text="Email Marketing" collapsed={collapsed} />
        <SidebarItem icon={<Settings className="h-5 w-5" />} text="Settings" collapsed={collapsed} />
      </ul>
      <DomaninMenu domains={domains} />
    </div>
  );
};


export default Sidebar;
