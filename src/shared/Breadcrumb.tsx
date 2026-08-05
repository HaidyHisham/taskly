
import React from 'react';
import ChevronRightIcon from '@/assets/icons/chevron-right.svg?react';

import type { IProject } from '@/features/projects/components/ProjectCard';
import { Link, useLocation, useParams } from 'react-router-dom';

interface IProps {
  projectItem?: IProject;
}

const BreadCrumb: React.FC<IProps> = ({ projectItem }) => {
  const pathname = useLocation().pathname;
  const { projectId, epicId } = useParams();

  const segments = pathname
    .split('/')
    .filter((item) => item !== '')
    .slice(1);

  return (
    <header className={`flex gap-2 ${segments.length !== 0 && 'mb-4'}`}>
      {segments.length !== 0 && (
        <Link
          to={'/project'}
          className={`text-secondary/60 text-body-sm uppercase font-bold letter-spacing-xl`}
        >
          Projects
        </Link>
      )}
      {segments.map((segment, index) => {
        if (segment === epicId) return;

        const isLastSegment = index === segments.length - 1;

        const to =
          segment === projectId
            ? `/project/${projectId}/edit`
            : `/project/${segments.slice(0, index + 1).join('/')}`;

        let label =
          segment === projectId && projectItem?.name
            ? projectItem?.name
            : segment.replace(/-/g, ' ');

        if (label.includes('add') && segments[index - 1] === 'project') {
          label = 'add new project';
        }

        if (label.includes('new') && segments[index - 1] === 'epics') {
          label = 'new epic';
        }
        if (label.includes('new') && segments[index - 1] === 'tasks') {
          label = 'new task';
        }

        return (
          <div className="flex font-bold gap-2" key={label}>
            <ChevronRightIcon className="text-secondary/40 w-1" />
            {!isLastSegment ? (
              <Link
                to={to}
                className={`text-secondary/60 text-body-sm uppercase letter-spacing-xl`}
              >
                {label}
              </Link>
            ) : (
              <span className="text-primary text-body-sm uppercase letter-spacing-xl">
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