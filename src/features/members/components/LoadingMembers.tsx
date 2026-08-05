

import { useMobile } from '@/shared/hooks/shared.hooks';
import MemberSkeleton from './MemberSkeleton';


const LoadingMembers: React.FC = () => {
  const { isMobile } = useMobile(768);

 
  const dummyRows = Array.from({ length: 4 });


  const desktopSkeletonView = (
    <table className="w-full hidden md:table table-fixed border-collapse rounded-lg overflow-hidden lg:max-w-5/6 xl:max-w-3/4 lg:mx-auto">
      <thead>
        <tr className="bg-surface-md/30 text-left">
          <th className="w-1/2 uppercase text-label-sm text-secondary px-12 py-5 font-semibold">
            Member
          </th>
          <th className="w-1/4 uppercase text-label-sm text-secondary px-12 py-5 font-semibold">
            Role
          </th>
          <th className="w-1/4 uppercase text-label-sm text-secondary px-12 py-5 font-semibold">
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        {dummyRows.map((_, index) => (
          <tr
            key={index}
            className="w-full bg-white border-b border-b-slate-lighter last:border-0 hidden md:table-row"
          >
            <MemberSkeleton />
          </tr>
        ))}
      </tbody>
    </table>
  );


  const mobileSkeletonView = (
    <div className="flex md:hidden flex-col gap-3">
      {dummyRows.map((_, index) => (
        <MemberSkeleton key={index} />
      ))}
    </div>
  );

  return (
    <section>

      <header className="justify-between items-center flex mb-5 lg:mb-10 animate-pulse">

        <div className="h-10 bg-slate-300 rounded-md w-48 max-w-full mx-auto lg:mx-0" />


        <div className="w-35 h-10 bg-slate-200 rounded-md hidden lg:flex" />
      </header>

   
      {isMobile ? mobileSkeletonView : desktopSkeletonView}
    </section>
  );
};

export default LoadingMembers;