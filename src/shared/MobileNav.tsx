import React from "react";
import { NavLink } from "react-router-dom";


import ProjectsIcon from "@/assets/icons/projects.svg?react";
import EpicsIcon from "@/assets/icons/Epics.svg?react";
import TasksIcon from "@/assets/icons/Tasks.svg?react";
import MembersIcon from "@/assets/icons/Members.svg?react";
import DetailsIcon from "@/assets/icons/Details.svg?react";
import LogoIcon from "@/assets/icons/logo.svg?react";
import BurgerIcon from "@/assets/icons/burger.svg?react";
import { useAppSelector } from "@/store/hooks";


interface MobileHeaderProps {
  
  onMenuClick?: () => void;
}

export const MobileHeader: React.FC<MobileHeaderProps> = ({ onMenuClick }) => {
  const user = useAppSelector((state) => state.auth.user);
    const displayName = user?.name || "User Name";
     const getInitials = (name: string): string => {
    const parts = name.trim().split(/\s+/);
    if (parts.length === 0) return "MT";
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };
  return (
    <header className="flex h-16 items-center justify-between px-6 border-b border-black/10 md:hidden shrink-0 bg-[#F9F9FF]">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="text-slate-dark text-2xl p-1 cursor-pointer focus:outline-hidden"
        >
          <BurgerIcon/>
        </button>
        <div className="flex items-center gap-2">
          <LogoIcon className="w-5 h-5 text-primary" />
          <span className="text-sm font-bold tracking-[-0.3px] text-slate-dark uppercase">
            Taskly
          </span>
        </div>
      </div>
      <div className="w-9 h-9 rounded-lg bg-primary text-white flex items-center justify-center font-bold text-xs shadow-xs uppercase shrink-0">
        {getInitials(displayName)}
      </div>
    </header>
  );
};

export const MobileBottomNav: React.FC = () => {
  const menuItems = [
    { path: "projects", label: "Projects", Icon: ProjectsIcon },
    { path: "epics", label: "Epics", Icon: EpicsIcon },
    { path: "tasks", label: "Tasks", Icon: TasksIcon },
    { path: "members", label: "Members", Icon: MembersIcon },
    { path: "details", label: "Details", Icon: DetailsIcon },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 bg-surface-low border-t border-slate-200/80 flex items-center justify-around md:hidden z-30 px-2 pb-safe">
      {menuItems.map(({ path, label, Icon }) => (
        <NavLink
          key={path}
          to={path}
          className={({ isActive }) =>
            `flex flex-col items-center justify-center gap-1.5 flex-1 py-1 transition-colors ${
              isActive ? "text-primary" : "text-slate-medium hover:text-slate-dark"
            }`
          }
        >
          <Icon className="w-5 h-5" />
          <span className="text-[10px] font-semibold">{label}</span>
        </NavLink>
      ))}
    </nav>
  );
};
