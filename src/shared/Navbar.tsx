import { useState } from 'react';
import { useAppSelector } from "@/store/hooks";
import LogoutBtn from "./LogoutBtn";

function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const user = useAppSelector((state) => state.auth.user);
  const displayName = user?.name || "User Name";
  const displayRole = user?.job_title || "Job Title";

  const getInitials = (name: string): string => {
    const parts = name.trim().split(/\s+/);
    if (parts.length === 0) return "MT";
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  return (
    <header className="hidden md:flex h-16 bg-background border-b border-black/10 px-6 items-center shrink-0">
      <div className="flex items-center gap-3 ml-auto relative">
        <div className="text-right flex flex-col">
          <span className="text-sm font-semibold text-slate-dark leading-tight">
            {displayName}
          </span>
          <span className="text-[10px] font-bold text-slate-medium uppercase tracking-[0.5px]">
            {displayRole}
          </span>
        </div>
        
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="w-10 h-10 rounded-lg bg-primary text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-xs uppercase cursor-pointer focus:outline-hidden"
        >
          {getInitials(displayName)}
        </button>

        {isDropdownOpen && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsDropdownOpen(false)}
            />
            <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-slate-200 rounded-lg shadow-lg p-1 z-50">
              <LogoutBtn />
            </div>
          </>
        )}
      </div>
    </header>
  );
}

export default Navbar;
