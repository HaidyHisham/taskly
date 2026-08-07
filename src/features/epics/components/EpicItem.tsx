import Badge from "@/shared/Badge";
import { type IEpics } from "../types/epics.types";
import Button from "@/shared/Button";
import DotsIcon from "@/assets/icons/dots.svg?react";
import CreatedByIcon from "@/assets/icons/createdby.svg?react";
import CalenderIcon from "@/assets/icons/Calendar.svg?react";
import { Link } from "react-router-dom";
interface IProps {
    epicItem: IEpics;
}
function EpicItem({ epicItem }: IProps) {
    const formatedDeadline = new Date(epicItem?.deadline).toLocaleDateString(
        'en-GB',
        {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        }
    );
    const assigneeInitials = epicItem?.assignee?.name
        ?.split(' ')
        .slice(0, 2)
        .map((w) => w[0])
        .join('')
        .toUpperCase() || '??';




    const desktopView = (
        <div className="hidden lg:flex flex-col gap-4 bg-white border-s-4 border-s-border-dark shadow-sm p-4 rounded-lg lg:justify-between">
            {/* header */}
            <header className="flex justify-between items-center">
                <Badge className="bg-success text-green-dark rounded-xs px-2.5 py-1">
                    {epicItem.epic_id}
                </Badge>
                <div>
                    <Button variant="ghost" className="p-1! justify-end w-fit! ">
                        <DotsIcon className="w-1 text-slate-dark/20" />
                    </Button>
                </div>
            </header>

            {/*info*/}
            <div className="flex flex-col gap-3">
                <h2 className="font-semibold text-[20px] text-slate-dark">{epicItem.title}</h2>
                <div className="gap-3 flex">
                    <div className="text-green-dark rounded-xl bg-success-dark size-10 flex items-center justify-center">
                        <span className="font-bold">
                            {' '}
                            {epicItem?.assignee?.name ? assigneeInitials : 'NA'}
                        </span>
                    </div>
                    <div className="flex flex-col">
                        <span className="font-medium text-[12px] text-secondary">
                            Assignee
                        </span>
                        <h3 className="text-slate-dark font-semibold capitalize">
                            {epicItem?.assignee?.name ? epicItem?.assignee?.name : '---'}
                        </h3>
                    </div>

                </div>

            </div>
            {/* epic footer */}
            <footer className="border-t border-t-surface-low flex justify-between items-end mt-auto pt-4">
                <div className="flex gap-2 items-center">
                    <CreatedByIcon className="text-secondary/80 w-3 " />
                    <span className="text-secondary/80 text-label text-xs">Created by:</span>
                    <span className="capitalize text-slate-dark text-label font-semibold">
                        {epicItem?.created_by?.name}
                    </span>
                </div>
                <div className="flex gap-2 items-center">
                    <CalenderIcon className="w-3 text-secondary/80" />
                    <span className="text-secondary/80 text-label font-semibold">
                        {epicItem?.deadline ? formatedDeadline : '---'}
                    </span>
                </div>
            </footer>
        </div>

    );
    const mobileView = (
        <div className="lg:hidden flex flex-col gap-4 bg-white shadow-sm p-4 rounded-lg min-h-48">
            {/* header */}
            <header className="flex justify-between items-center">

                <Badge className="bg-initials-bg text-primary py-1! px-2.5! rounded-xs">
                    {epicItem.epic_id}
                </Badge>


                <Button variant="ghost" className="p-1! justify-end w-fit! rotate-90">
                    <DotsIcon className="w-1 text-slate-dark/20" />
                </Button>
            </header>

            {/* info */}
            <div className="flex flex-col gap-3 h-full">
                <h2 className="font-semibold text-slate-dark text-[20px]">
                    {epicItem.title}
                </h2>

                {/* assignee & deadline */}
                <div className="flex justify-between items-center mt-auto">

                    <div className="flex gap-3">

                        <div className="size-7 bg-primary text-white flex items-center justify-center rounded-lg">
                            <span className="font-bold text-[10px]">
                                {epicItem?.assignee?.name ? assigneeInitials : 'NA'}
                            </span>
                        </div>
                        {/* assignee info */}
                        <div className="flex flex-col">
                            <h3 className="text-slate-dark font-medium text-[12px] capitalize">
                                {epicItem?.assignee?.name ? epicItem?.assignee?.name : '---'}
                            </h3>
                            <span className="text-[10px] text-secondary-light">Assignee</span>
                        </div>
                    </div>
                </div>
                {/* due date */}
                <div className="flex flex-col items-end">
                    <span className="uppercase font-bold text-[10px] text-secondary-light">
                        deadline
                    </span>
                    <span className="text-secondary/80 font-semibold">
                        {epicItem?.deadline ? formatedDeadline : '---'}
                    </span>
                </div>
            </div>
        </div>
    );

    return (
        <>
            <Link to={`/project/${epicItem?.project_id}/epics/${epicItem?.id}`}>
                {desktopView}
                {mobileView}
            </Link>
        </>
    );

}

export default EpicItem