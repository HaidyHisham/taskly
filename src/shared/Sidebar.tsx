import  { useState } from "react";
import { NavLink } from "react-router-dom";

import ProjectsIcon from "@/assets/icons/projects.svg?react";
import EpicsIcon from "@/assets/icons/Epics.svg?react";
import TasksIcon from "@/assets/icons/Tasks.svg?react";
import MembersIcon from "@/assets/icons/Members.svg?react";
import DetailsIcon from "@/assets/icons/Details.svg?react";
import LogoutIcon from "@/assets/icons/logout.svg?react";
import CollapseIcon from "@/assets/icons/Collapse.svg?react";
import LogoIcon from "@/assets/icons/logo.svg?react";
import Logo from "./Logo";

interface SidebarProps {
  isMobileOpen: boolean;
  setIsMobileOpen: (open: boolean) => void;
}

function Sidebar({ isMobileOpen, setIsMobileOpen }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const menuItems = [
    { path: "projects", label: "Projects", Icon: ProjectsIcon },
    { path: "epics", label: "Project Epics", Icon: EpicsIcon },
    { path: "tasks", label: "Project Tasks", Icon: TasksIcon },
    { path: "members", label: "Project Members", Icon: MembersIcon },
    { path: "details", label: "Project Details", Icon: DetailsIcon },
  ];

  return (
    <>
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-dark/40 backdrop-blur-xs md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

     
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex flex-col h-full bg-surface-low border-r border-slate-200 transition-all duration-300 ease-in-out shrink-0 md:static md:translate-x-0 ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        } ${isCollapsed ? "md:w-20" : "md:w-64"} w-64`}
      >
        <div className="h-16 flex items-center px-6 ">
          {isCollapsed ? (
            <LogoIcon className="w-6 h-6 text-primary shrink-0" />
          ) : (
            <Logo />
          )}
        </div>

        <nav className="flex-1 px-3 py-6 space-y-1">
          {menuItems.map(({ path, label, Icon }) => (
            <NavLink
              key={path}
              to={path}
              onClick={() => setIsMobileOpen(false)} 
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? "bg-white text-primary shadow-[0_2px_4px_rgba(0,0,0,0.03)]"
                    : "text-slate-dark hover:bg-slate-200/40 hover:text-primary"
                }`
              }
            >
              <Icon className="w-5 h-5 shrink-0" />
              {!isCollapsed && <span className="whitespace-nowrap">{label}</span>}
            </NavLink>
          ))}
        </nav>

        <div className="p-3 border-t border-slate-200">
         
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold text-slate-dark hover:bg-slate-light/40 w-full text-left cursor-pointer hidden md:flex"
          >
            <CollapseIcon
              className={`w-5 h-5 transition-transform duration-300 ${
                isCollapsed ? "rotate-180" : ""
              }`}
            />
            {!isCollapsed && <span>Collapse</span>}
          </button>

      
          <a
            href="#"
            className="flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg text-sm font-semibold"
          >
            <LogoutIcon className="w-5 h-5 shrink-0" />
            {!isCollapsed && <span className="whitespace-nowrap">Logout</span>}
          </a>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;