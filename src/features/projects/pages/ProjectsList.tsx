import { useState, useEffect } from "react";
import AddProjectCard from "../components/AddProjectCard";
import ProjectCard, { type IProject } from "../components/ProjectCard";
import ProjectsHeader from "../components/ProjectHeader";
import { getAccessToken } from "@/features/auth/utils/auth";
import { getProjects } from "../services/project.services";

function ProjectsList() {
  const [projects, setProjects] = useState<IProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const token = getAccessToken();
        if (!token) {
          throw new Error("No authenticated user found. Please login.");
        }
        const data = await getProjects({ accessToken: token });
        setProjects(data || []);
      } catch (err: any) {
        setError(err.message || "Failed to retrieve projects.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <section className="flex flex-col gap-10">
      <ProjectsHeader />
      
      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
        </div>
      ) : error ? (
        <div className="p-4 bg-error/10 text-error rounded-lg font-medium">
          {error}
        </div>
      ) : (
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 pb-10 lg:pb-20">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
          <AddProjectCard />
        </section>
      )}
    </section>
  );
}

export default ProjectsList