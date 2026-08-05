import { useState, useEffect } from 'react';
import Sidebar from '@/shared/Sidebar';
import { Outlet, Navigate, useParams } from 'react-router-dom';
import { MobileHeader, MobileBottomNav } from "@/shared/MobileNav";
import Navbar from '@/shared/Navbar';
import { isAuthenticated } from '@/features/auth/utils/auth';
import { useAppDispatch, useAppSelector } from '@/shared/store/store';
import { fetchProjectById } from '@/shared/store/slices/project.slice';
import BreadCrumb from '@/shared/Breadcrumb';

function MasterLayout() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { projectId } = useParams();
  const dispatch = useAppDispatch();
  const currentProject = useAppSelector((state) => state.project.currentProject);

  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  useEffect(() => {
    if (projectId && currentProject?.id !== projectId) {
      dispatch(fetchProjectById(projectId));
    }
  }, [projectId, currentProject, dispatch]);

  return (
    <div className="flex h-screen w-screen overflow-hidden font-sans">
      <Sidebar isMobileOpen={isMobileOpen} setIsMobileOpen={setIsMobileOpen} />

      <main className="flex-1 flex flex-col h-full overflow-hidden  pb-16 md:pb-0">
        <MobileHeader onMenuClick={() => setIsMobileOpen(true)} />
        <Navbar />
        <div className="flex-1 overflow-auto bg-slate-50/50 p-8">
          <BreadCrumb projectItem={currentProject || undefined} />
          <Outlet />
        </div>

        <MobileBottomNav />
      </main>
    </div>
  );
}

export default MasterLayout;