import { useState } from "react";
import { useParams } from "react-router-dom";
import LinkButton from "@/shared/LinkButton";
import PlusIcon from "@/assets/icons/plus.svg?react";
import EpicItem from "../components/EpicItem";
import Search from "@/shared/Search";
import Button from "@/shared/Button";
import ChevronLeftIcon from '@/assets/icons/chevron-left.svg?react';
import ChevronRightIcon from '@/assets/icons/chevron-right.svg?react';
import LoadingEpics from "../components/LoadingEpics";
import ErrorState from "@/shared/ErrorState";
import EmptyEpics from "../components/EmptyEpics";
import EpicModal from "../components/EpicModal";
import { useGetEpicsQuery } from "../services/epicsApi";
import { useHandlePagination } from "@/shared/hooks/useHandlePagination";
import type { IEpics } from "../types/epics.types";

function EpicList() {
    const { projectId, epicId } = useParams();

    const [currentPage, setCurrentPage] = useState<number>(1);
    const limit = 6;

    const { data: epics, isLoading, isFetching, isError, error, refetch } = useGetEpicsQuery(
        {
            projectId: projectId || "",
            page: currentPage,
            limit,
        },
        {
            skip: !projectId,
            refetchOnMountOrArgChange: true,
        }
    );

    const incomingEpics = epics?.project_epics || [];
    const totalCount = epics?.totalCount || 0;
    const totalPages = Math.ceil(totalCount / limit);
    const meta = { totalPages, totalCount };

    const {
        isMobile,
        hasMore,
        observerTarget,
        accumulatedList,
        handleCurrentPage,
    } = useHandlePagination<IEpics>({
        incomingData: incomingEpics,
        meta,
        isFetching,
        setCurrentPage,
        currentPage,
    });

    const getPageNumbers = (current: number, total: number) => {
        if (total <= 5) {
            return Array.from({ length: total }, (_, i) => i + 1);
        }
        if (current <= 3) {
            return [1, 2, 3, '...', total];
        }
        if (current >= total - 2) {
            return [1, '...', total - 2, total - 1, total];
        }
        return [1, '...', current, '...', total];
    };

    const displayList = isMobile ? accumulatedList : incomingEpics;
    const selectedEpic = displayList.find((epic) => epic.id === epicId);

    if (isLoading || (!isMobile && isFetching)) return <LoadingEpics />;
    if (incomingEpics.length === 0 && !isFetching) return <EmptyEpics />;
    if (isError) {
        return (
            <ErrorState
                item="project epics"
                message={(error as any)?.data?.message || "Failed to load epics"}
                reset={() => refetch()}
            />
        );
    }

    return (
        <section>
            {/* page header */}
            <header className="lg:justify-between lg:items-center flex gap-4 flex-col lg:flex-row mb-5 lg:mb-10">
                <h1 className="font-semibold text-slate-dark text-[30px] leading-10 tracking-[-0.9px] capitalize flex-1 w-full">
                    project epics
                </h1>
                <div className="lg:gap-8 lg:flex lg:items-start">
                    <Search placeholder="search epics..." />
                    <LinkButton
                        to={`/project/${projectId}/epics/new`}
                        className="w-fit! gap-2! hidden lg:flex"
                    >
                        <PlusIcon className="text-white w-2.75" />
                        new epic
                    </LinkButton>

                    <LinkButton
                        to={`/project/${projectId}/epics/new`}
                        btnClassName="lg:hidden fixed bottom-20 inset-e-6 z-99999 rounded-xl! size-14! shadow-sm!"
                    >
                        <PlusIcon className="text-white size-3.5" />
                    </LinkButton>
                </div>
            </header>

            {/* epic items */}
            <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-6 mb-10 min-h-90">
                {displayList?.map((epic) => (
                    <EpicItem epicItem={epic} key={epic?.id} />
                ))}
            </div>

            {/* pagination with footer on desktop */}
            <footer className="hidden lg:flex flex-col lg:flex-row justify-center items-center gap-6 lg:justify-between lg:items-center mt-8 pb-10">
                <p className="font-medium text-secondary text-[12px]">
                    Showing {incomingEpics?.length} of {meta?.totalCount} active epics
                </p>
                {meta?.totalPages > 1 && (
                    <div className="flex gap-2 items-center">
                        {/* Previous Button */}
                        <Button
                            variant="ghost"
                            className="text-secondary! rounded-[2px]! size-[32px]! border border-slate-light p-0! font-bold! text-[12px]! disabled:opacity-50"
                            disabled={currentPage === 1 || isFetching}
                            onClick={() => handleCurrentPage(Math.max(currentPage - 1, 1))}
                        >
                            <ChevronLeftIcon className="w-1" />
                        </Button>

                        {/* Page Numbers */}
                        {getPageNumbers(currentPage, meta.totalPages).map((page, idx) =>
                            typeof page === 'number' ? (
                                <Button
                                    key={idx}
                                    variant="ghost"
                                    className={`rounded-[2px]! size-[32px]! p-0! font-bold! text-[12px]! ${page === currentPage
                                        ? 'bg-primary! text-white! border border-primary!'
                                        : 'bg-[#f4f6fa] text-secondary border-0 hover:bg-slate-light/20'
                                        }`}
                                    disabled={isFetching}
                                    onClick={() => handleCurrentPage(page)}
                                >
                                    {page}
                                </Button>
                            ) : (
                                <span
                                    key={idx}
                                    className="size-[32px] flex items-center justify-center text-secondary text-[12px] font-bold"
                                >
                                    ...
                                </span>
                            )
                        )}

                        {/* Next Button */}
                        <Button
                            variant="ghost"
                            className="text-secondary! rounded-[2px]! size-[32px]! border border-slate-light p-0! font-bold! text-[12px]! disabled:opacity-50"
                            disabled={currentPage >= meta.totalPages || isFetching}
                            onClick={() => handleCurrentPage(currentPage + 1)}
                        >
                            <ChevronRightIcon className="w-1" />
                        </Button>
                    </div>
                )}
            </footer>

            {/* loadmore on mobile */}
            {hasMore && !isFetching && (
                <div ref={observerTarget} className="mt-auto lg:hidden w-full text-center py-4 text-secondary text-sm font-medium">
                    Loading More...
                </div>
            )}

            {selectedEpic && <EpicModal epic={selectedEpic} />}
        </section>
    );
}

export default EpicList;