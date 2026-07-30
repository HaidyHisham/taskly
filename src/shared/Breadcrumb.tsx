import { useEffect } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import ChevronRightIcon from '@/assets/icons/chevron-right.svg?react';
import type { IProject } from '@/features/projects/components/ProjectCard';
import { useAppDispatch, useAppSelector } from '@/shared/store/store';
import { fetchProjectById } from '@/shared/store/slices/project.slice';

interface IProps {
  projectItem?: IProject;
}

const BreadCrumb = ({ projectItem }: IProps) => {
  const { pathname } = useLocation();
  const { projectId } = useParams();
  const dispatch = useAppDispatch();

  const { currentProject, projects, currentProjectLoading } = useAppSelector(
    (state) => state.project
  );

  const effectiveProject =
    projectItem ||
    (currentProject?.id === projectId
      ? currentProject
      : projects.find((p) => p.id === projectId));

  useEffect(() => {
    if (projectId && effectiveProject?.id !== projectId && currentProjectLoading !== 'pending') {
      dispatch(fetchProjectById(projectId));
    }
  }, [projectId, effectiveProject?.id, currentProjectLoading, dispatch]);

  const segments = pathname
    .split('/')
    .filter((item) => item !== '')
    .slice(1);

  return (
    <header className={`flex items-center gap-2 ${segments.length !== 0 && 'mb-4'}`}>
      {segments.length !== 0 && (
        <Link
          to={'/project'}
          className={`text-secondary/60 text-[12px] uppercase font-bold tracking-[1.2px]`}
        >
          Projects
        </Link>
      )}
      {segments.map((segment, index) => {
        const isLastSegment = index === segments.length - 1;

        const href = `/project/${segments.slice(0, index + 1).join('/')}`;
        let label = segment.replace(/-/g, ' ');

        if (segment === projectId) {
          if (effectiveProject?.name) {
            label = effectiveProject.name;
          } else if (currentProjectLoading === 'pending') {
            label = 'Loading...';
          }
        }

        label = label.includes('add') ? 'add new project' : label;

        return (
          <div className="flex items-center font-bold gap-2" key={segment}>
            <ChevronRightIcon className="text-secondary/40 w-3 h-3" />
            {!isLastSegment ? (
              <Link
                to={href}
                className={`text-secondary/60 text-[12px] uppercase tracking-[1.2px]`}
              >
                {label}
              </Link>
            ) : (
              <span className="text-primary text-[12px] uppercase tracking-[1.2px]">
                {label}
              </span>
            )}
          </div>
        );
      })}
    </header>
  );
};

export default BreadCrumb;