import AddProjectCard from "../components/AddProjectCard";
import ProjectCard, { type IProject } from "../components/ProjectCard";
import ProjectsHeader from "../components/ProjectHeader";
import Pagination from "@/shared/Pagination";
import LinkButton from "@/shared/LinkButton";
import PlusIcon from "@/assets/icons/plus.svg?react";
import Loading from "../components/Loading";
import ErrorState from "@/shared/ErrorState";
import EmptyState from "../components/EmptyState";
import ProjectSkeletonCard from "../components/ProjectsSkeletonCard";
import { useHandlePagination } from "../hooks/project.hook";

function ProjectsList() {
    const {
        hasMore,
        
        loading,
        projects,
        totalCount,
        isMobile,
        observerTarget,
    } = useHandlePagination();

    
    if (loading === 'rejected') {
        return (
            <ErrorState
                item="projects"
                reset={() => window.location.reload()}
            />
        );
    }

    // Initial request loading
    if (loading === 'pending' && (!projects || projects.length === 0)) {
        return <Loading />;
    }

    // Empty state
    if (loading === 'success' && (!projects || projects.length === 0)) {
        return <EmptyState />;
    }

    return (
        <section className="flex flex-col gap-10">
        
            <ProjectsHeader />

          
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 pb-10 lg:pb-20">
                {projects?.map((project: IProject) => (
                    <ProjectCard project={project} key={project.id} />
                ))}
                <AddProjectCard />

                {/* loading skeleton on mobile */}
                {isMobile && loading === 'pending' && <ProjectSkeletonCard />}
            </section>

            {/* pagination with footer on desktop */}
            {!isMobile && (
                <footer className="flex flex-col lg:flex-row justify-center items-center gap-6 lg:justify-between lg:items-center">
                    <p className="font-medium text-secondary text-[12px]">
                        Showing {projects?.length} of {totalCount} active projects
                    </p>
                    <Pagination />
                </footer>
            )}

          
            {isMobile && hasMore && <div ref={observerTarget} className="h-4"></div>}

          
            <LinkButton
                to={'/project/add'}
                btnClassName="lg:hidden fixed bottom-20 inset-e-[24px] z-99999 rounded-[12px]! size-14!"
            >
                <PlusIcon className="text-white size-3.5" />
            </LinkButton>
        </section>
    );
}

export default ProjectsList;
