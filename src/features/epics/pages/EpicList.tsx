import { useEffect } from "react";
import { useParams } from "react-router-dom";
import LinkButton from "@/shared/LinkButton";
import PlusIcon from "@/assets/icons/plus.svg?react";
import EpicItem from "../components/EpicItem";
import { useAppDispatch, useAppSelector } from "@/shared/store/store";
import { fetchEpics, resetEpics } from "@/shared/store/slices/epics.slice";
import Search from "@/shared/Search";
import Button from "@/shared/Button";
import ChevronLeftIcon from '@/assets/icons/chevron-left.svg?react';
import ChevronRightIcon from '@/assets/icons/chevron-right.svg?react';
import LoadingEpics from "../components/LoadingEpics";
import ErrorState from "@/shared/ErrorState";
import EmptyEpics from "../components/EmptyEpics";

function EpicList() {
    const { projectId } = useParams();
    const dispatch = useAppDispatch();
    const { epics, loading, error } = useAppSelector((state) => state.epics);

    useEffect(() => {
        if (projectId) {
            dispatch(fetchEpics(projectId));
        }
        return () => {
            dispatch(resetEpics());
        };
    }, [dispatch, projectId]);
    if (loading === 'pending') return <LoadingEpics />;

    if (loading === 'rejected') {
        return (
            <ErrorState
                item="project epics"
                message={error || undefined}
                reset={() => {
                    if (projectId) dispatch(fetchEpics(projectId));
                }}
            />
        );
    }

    if (epics.length === 0) {
        return <EmptyEpics />;
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
                        className="w-fit! gap-2! hidden lg:flex">
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

            <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-6 mb-10">
                {epics.map((epic) => (
                    <EpicItem key={epic.id} epicItem={epic} />
                ))}
            </div>

            <footer className="flex flex-col lg:flex-row justify-center items-center gap-6 lg:justify-between lg:items-center mt-8 pb-10">
                <p className="font-medium text-secondary text-[12px]">
                    Showing {epics.length} of {epics.length} active epics
                </p>
                <div className="flex gap-2">
                    <Button
                        variant="ghost"
                        className="text-secondary! rounded-[2px]! size-[32px]! border border-slate-light p-0! font-bold! text-[12px]! disabled:opacity-50"
                        disabled
                    >
                        <ChevronLeftIcon className="w-1" />
                    </Button>
                    <Button
                        variant="ghost"
                        className="text-secondary! rounded-[2px]! size-[32px]! border border-slate-light p-0! font-bold! text-[12px]! bg-primary! text-white!"
                    >
                        1
                    </Button>
                    <Button
                        variant="ghost"
                        className="text-secondary! rounded-[2px]! size-[32px]! border border-slate-light p-0! font-bold! text-[12px]! disabled:opacity-50"
                        disabled
                    >
                        <ChevronRightIcon className="w-1" />
                    </Button>
                </div>
            </footer>
        </section>
    );
}

export default EpicList;