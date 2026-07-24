import ProjectSkeletonCard from '@/features/projects/components/ProjectsSkeletonCard';

export default function Loading() {
  return (
    <section className="flex flex-col gap-10">
   
      <header className="flex justify-between items-end">
        <div className="flex flex-col gap-[4px]">
           <h1 className="text-headline-lg text-slate-dark capitalize">
            Projects
          </h1>
          <p className="text-secondary">Manage and curate your projects</p>
        </div>
      
        <div className="w-52 h-10 rounded-[4px] bg-slate-lighter animate-pulse hidden lg:block"></div>
      </header>
      {/* skeleton */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 pb-10 lg:pb-20">
        {Array.from({ length: 9 })?.map((_, idx) => (
          <ProjectSkeletonCard key={idx} />
        ))}
      </section>
    </section>
  );
}
