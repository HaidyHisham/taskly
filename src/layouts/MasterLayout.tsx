import  { useState } from 'react';
import Sidebar from '@/shared/Sidebar';
import { Outlet, Navigate } from 'react-router-dom';
import { MobileHeader, MobileBottomNav } from "@/shared/MobileNav";
import Navbar from '@/shared/Navbar';
import { isAuthenticated } from '@/features/auth/utils/auth';

function MasterLayout() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex h-screen w-screen overflow-hidden font-sans">
      <Sidebar isMobileOpen={isMobileOpen} setIsMobileOpen={setIsMobileOpen} />

      <main className="flex-1 flex flex-col h-full overflow-hidden  pb-16 md:pb-0">
        <MobileHeader onMenuClick={() => setIsMobileOpen(true)} />
        <Navbar />
        <div className="flex-1 overflow-auto bg-slate-50/50 p-8">
          <Outlet />
        </div>

        <MobileBottomNav />
      </main>
    </div>
  );
}

export default MasterLayout;