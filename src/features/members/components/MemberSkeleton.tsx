

import DotsIcon from '@/assets/icons/dots.svg?react';

import { useMobile } from '@/shared/hooks/shared.hooks';
import Button from '@/shared/Button';

const MemberSkeleton = () => {
    const { isMobile } = useMobile(768);


    const memberInfoSkeleton = (
        <div className="flex gap-4 items-center animate-pulse">

            <div className="rounded-lg size-12 bg-slate-200" />


            <div className="flex flex-col gap-1.5 flex-1">
                <div className="h-4 bg-slate-200 rounded w-24 max-w-full" />
                <div className="h-3 bg-slate-100 rounded w-36 max-w-full" />
            </div>
        </div>
    );


    const desktopView = (
        <>

            <td className="w-1/2 px-9 py-5">{memberInfoSkeleton}</td>


            <td className="text-center w-1/4 px-9 py-5">
                <div className="inline-block h-6 w-16 bg-slate-200 rounded-full! animate-pulse" />
            </td>


            <td className="w-1/4 px-9 py-5">
                <div className="flex justify-end animate-pulse">
                    <Button
                        variant="ghost"
                        className="p-1! justify-end pointer-events-none opacity-40"
                    >
                        <DotsIcon className="text-secondary w-0.75" />
                    </Button>
                </div>
            </td>
        </>
    );


    const mobileView = (
        <div className="flex justify-between gap-4 bg-white rounded-lg p-4px md:hidden items-center">
            {memberInfoSkeleton}


            <div className="flex gap-1 items-center animate-pulse">

                <div className="h-6 w-14 bg-slate-200 rounded" />


                <Button variant="ghost" className="p-1! pointer-events-none opacity-40">
                    <DotsIcon className="text-secondary w-0.75" />
                </Button>
            </div>
        </div>
    );

    return <>{isMobile ? mobileView : desktopView}</>;
};

export default MemberSkeleton;