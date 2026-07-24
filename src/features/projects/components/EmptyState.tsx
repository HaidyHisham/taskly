import emptyProjectImg from '@/assets/empty-project.png';
import PlusBorderIcon from '@/assets/icons/plusborder.svg?react';
import LinkButton from '@/shared/LinkButton';
const EmptyProjects: React.FC = ({}) => {
  return (
    <section className="lg:min-h-[80vh] flex items-center justify-center sm:max-w-1/2 xl:max-w-[40%] sm:mx-auto">
      <div className="flex flex-col justify-center items-center gap-11">
        <img
          src={emptyProjectImg}
          width={250}
          height={250}
          alt="Empty projects"
        />
        <div className="flex flex-col justify-center items-center gap-4">
          <h1 className="font-semibold text-slate-dark text-[36px] tracking-[-0.9px] leading-[40px]">
            No Projects
          </h1>
          <p className="text-center text-secondary text-[18px] leading-[29.25px] font-normal">
            You don’t have any projects yet. Start by defining your first
            architectural workspace to begin tracking tasks and epics.
          </p>
        </div>
        <LinkButton to="/project/add">
          <PlusBorderIcon className="text-white! size-5!" />
          Create New Project
        </LinkButton>
      </div>
    </section>
  );
};

export default EmptyProjects;