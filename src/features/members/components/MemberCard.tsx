import type { IMember } from "../types/members.types";
import Badge from "@/shared/Badge";
import Button from "@/shared/Button";
import DotsIcon from "@/assets/icons/dots.svg?react";

interface IProps {
    member: IMember;
}

const roleStyle: Record<string, string> = {
    viewer: 'bg-surface-low text-secondary',
    member: 'bg-surface-highest text-secondary',
    owner: 'bg-primary-container text-white',
    admin: 'bg-surface-highest text-primary-container',
};

const getMemberInitials = (name?: string) => {
    if (!name) return '??';
    const parts = name.split(' ');
    return parts.length > 1
        ? parts.slice(0, 2).map((w) => w[0]).join('')
        : name.slice(0, 2);
};

const MemberCard = ({ member }: IProps) => {
    const memberInitials = getMemberInitials(member?.metadata?.name);

    return (
        <div className="flex justify-between items-center gap-4 bg-white rounded-lg p-4 border border-slate-lighter">
            <div className="flex gap-4 items-center">
                <div className="flex items-center justify-center rounded-lg size-12 shrink-0 bg-initials-bg text-primary-container">
                    <span className="font-bold text-sm uppercase">{memberInitials}</span>
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
            <div className="flex gap-2 items-center">
                <Badge className={`${roleStyle[member?.role] || 'bg-surface-low text-secondary'} rounded-full!`}>
                    {member?.role}
                </Badge>
                {member?.role !== 'owner' && (
                    <Button variant="ghost" className="p-1!">
                        <DotsIcon className="text-secondary w-1 h-3.5" />
                    </Button>
                )}
            </div>
        </div>
    );
};

export default MemberCard;