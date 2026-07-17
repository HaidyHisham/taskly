
import { useAppSelector } from "@/store/hooks";

function Navbar() {
 
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
      <div className="flex items-center gap-3 ml-auto">
        <div className="text-right flex flex-col">
          <span className="text-sm font-semibold text-slate-dark leading-tight">
            {displayName}
          </span>
          <span className="text-[10px] font-bold text-slate-medium uppercase tracking-[0.5px]">
            {displayRole}
          </span>
        </div>
        <div className="w-10 h-10 rounded-lg bg-primary text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-xs uppercase">
          {getInitials(displayName)}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
