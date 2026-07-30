import type { IMember } from "../types/members.types";
import { useMobile } from "@/shared/hooks/shared.hooks";
import Badge from "@/shared/Badge";
import Button from "@/shared/Button";
import DotsIcon from "@/assets/icons/dots.svg?react";

interface IProps {
    member: IMember;
}

const MemberDetails = ({ member }: IProps) => {
    const { isMobile } = useMobile(768);

    const memberInitials =
        member?.metadata?.name?.split(' ').length > 1
            ? member?.metadata?.name
                .split(' ')
                .slice(0, 2)
                .map((w) => w[0])
                .join('')
            : member?.metadata?.name?.slice(0, 2) || '??';

    const roleStyle: Record<string, string> = {
        viewer: 'bg-surface-low text-secondary',
        member: 'bg-surface-highest text-secondary',
        owner: 'bg-primary-container text-white',
        admin: 'bg-surface-highest text-primary-container',
    };

    const memberInfo = (
        <div className="flex gap-4 items-center">
            <div className="flex items-center justify-center rounded-lg size-12 shrink-0 bg-initials-bg text-primary-container">
                <span className="font-bold text-sm uppercase">
                    {memberInitials}
                </span>
            </div>
            <div className="flex flex-col">
                <h3 className="font-semibold text-slate-dark text-sm capitalize leading-tight">
                    {member?.metadata?.name}
                </h3>
                <span className="text-xs text-secondary mt-0.5">
                    {member?.metadata?.email}
                </span>
            </div>
        </div>
    );

    const desktopView = (
        <>
            {/* member details */}
            <td className="w-1/2 px-9 py-4 text-left">{memberInfo}</td>
            {/* role */}
            <td className="w-1/4 px-9 py-4 text-center">
                <Badge
                    className={`${roleStyle[member?.role] || 'bg-surface-low text-secondary'} rounded-full! py-1! px-3.5! inline-block`}
                >
                    {member?.role}
                </Badge>
            </td>
            {/* action */}
            <td className="w-1/4 px-9 py-4 text-right">
                {member?.role !== 'owner' && (
                    <Button variant="ghost" className="p-1.5! ms-auto">
                        <DotsIcon className="text-secondary w-1 h-3.5" />
                    </Button>
                )}
            </td>
        </>
    );

    const mobileView = (
        <div className="flex justify-between items-center gap-4 bg-white rounded-lg p-4 md:hidden border border-slate-lighter">
            {memberInfo}
            {/* actions & role */}
            <div className="flex gap-2 items-center">
                <Badge className={`${roleStyle[member?.role] || 'bg-surface-low text-secondary'} rounded-full!`}>{member?.role}</Badge>
                {member?.role !== 'owner' && (
                    <Button variant="ghost" className="p-1!">
                        <DotsIcon className="text-secondary w-1 h-3.5" />
                    </Button>
                )}
            </div>
        </div>
    );

    return <>{isMobile ? mobileView : desktopView}</>;
};

export default MemberDetails;

