
import InitializeIcon from "@/assets/icons/initialize.svg?react"
import AddProjectForm from "../components/AddProjectForm";
import ProTipIcon from "@/assets/icons/protip.svg?react";
import Breadcrumb from "@/shared/Breadcrumb";

interface ProjectPageProps {
  mode: 'add' | 'edit';
}

function ProjectPage({ mode }: ProjectPageProps) {
  const isAddForm = mode === 'add';
  const isEditForm = mode === 'edit';

  const breadcrumbItems = [
    { label: 'projects', path: '/project' },
    { label: isAddForm ? 'add new project' : isEditForm ? 'edit project' : '' }
  ];

  return (

    <section>
        <Breadcrumb items={breadcrumbItems} />

        <h1 className="font-semibold text-[36px] leading-10 tracking-[-0.9px] capitalize flex-1 w-full hidden lg:flex mb-8">
          {isAddForm ? 'add new project' : isEditForm ? 'edit project' : ''}
        </h1>
        <section className="lg:bg-white rounded-t-lg lg:max-w-4/5 xl:max-w-3/4 2xl:max-w-1/2 2xl:mx-auto px-6 lg:p-0 mb-10">
        <div className="pb-12 lg:pb-10 lg:p-8">
            <header className="flex items-center gap-4 pb-6 border-b border-surface-low mb-8 lg:mb-10">
                <div className="items-center justify-center bg-primary-container/10 p-3 rounded-sm hidden lg:flex">
                    <InitializeIcon className="text-primary-container w-5.5 " />
                </div>
                <div>
                    <h2 className="font-semibold text-2xl leading-8 text-slate-dark capitalize">Initialize New Project</h2>
                    <p className="text-slate-medium text-sm leading-5 font-normal">Define the scope and foundational details of your project.</p>
                </div>
            </header>
              
          {/* form */}
          {isAddForm ? <AddProjectForm /> : null}
        </div>
        <div className="p-6 bg-surface-low rounded-b-lg text-slate-medium items-center">
            <p className="text-xs flex flex-col gap-2 lg:block ">
                <span className="font-bold">
                    <ProTipIcon className="w-3 hidden lg:inline-block me-1.5" /> Pro Tip:{' '}
                </span>
                <span className="text-xs ">You can invite project members and assign epics immediately after the initial creation process.</span>
            </p>
            
        </div>
        

        </section>
    </section>
  )
}

export default ProjectPage