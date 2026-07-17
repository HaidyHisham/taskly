
import { useLocation } from 'react-router-dom';

function Navbar() {
  const location = useLocation();

  const getPageTitle = (): string => {
    const currentPath = location.pathname.split("/").pop();
    switch (currentPath) {
      case "projects":
        return "Projects";
      case "epics":
        return "Project Epics";
      case "tasks":
        return "Project Tasks";
      case "members":
        return "Project Members";
      case "details":
        return "Project Details";
      default:
        return "Dashboard";
    }
  };

  return (
    <header className="hidden md:flex h-16 border-b border-slate-100 px-8 items-center justify-between shrink-0">
      <h1 className="text-lg font-bold text-slate-dark">{getPageTitle()}</h1>
      <div className="flex items-center gap-3">
        <div className="text-right flex flex-col">
          <span className="text-sm font-semibold text-slate-dark leading-tight">
            Mahmoud Taha
          </span>
          <span className="text-[10px] font-bold text-slate-medium uppercase tracking-[0.5px]">
            PROJECT MANAGER
          </span>
        </div>
        <div className="w-10 h-10 rounded-lg bg-primary text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-xs uppercase">
          MT
        </div>
      </div>
    </header>
  );
}

export default Navbar;
