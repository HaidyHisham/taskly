import { useState } from "react";
import type { IMember } from "../types/members.types";
import { useMobile } from "@/shared/hooks/shared.hooks";
import Badge from "@/shared/Badge";
import Button from "@/shared/Button";
import DotsIcon from "@/assets/icons/dots.svg?react";

interface IProps {
    member: IMember;
}

const MemberDetails = ({ member }: IProps) => {
    const [avatarBg, _] = useState(Math.round(Math.random() * 255));
    const { isMobile } = useMobile(768);

    const memberInitials =
        member?.metadata.name.split(' ').length > 1
            ? member?.metadata.name
                .split(' ')
                .slice(0, 2)
                .map((w) => w[0])
                .join('')
            : member?.metadata.name.split('').slice(0, 2).join('');

    const roleStyle = {
        viewer: 'bg-slate-lighter text-secondary',
        member: 'bg-surface-highest text-secondary',
        owner: 'bg-primary-container text-white',
        admin: 'bg-slate-dark text-slate-medium',
    };

    const memberInfo = (
        <div className="flex gap-4">
            <div className={`flex items-center justify-center rounded-lg size-12`}
                style={{ backgroundColor: `#${avatarBg}` }}>
                <span className="text-surface-medium font-bold uppercase">
                    {memberInitials}
                </span>

            </div>
            <div>
                <h3 className="font-semibold text-slate-dark capitalize">
                    {member?.metadata.name}
                </h3>
                <span className="text-label text-secondary">
                    {member?.metadata.email}
                </span>
            </div>


        </div>
    );
    const desktopView = (
        <>
          
            <td className="w-1/2 px-9 py-5">{memberInfo}</td>
            {/* role */}
            <td className="text-center w-1/4 px-9 py-5">
                <Badge
                    className={`${roleStyle[member.role]} rounded-full! py-1! px-3!`}
                >
                    {' '}
                    {member.role}{' '}
                </Badge>
            </td>
            
            <td className=" w-1/4 px-9 py-5">
                {member.role !== 'owner' && (
                    <Button variant="ghost" className="p-1! justify-end">
                        <DotsIcon className="text-secondary w-0.75" />
                    </Button>
                )}
            </td>

        </>
    );
    const mobileView = (
        <div className="flex justify-between gap-4 bg-white rounded-lg p-4 md:hidden">
            {memberInfo}
          
            <div className="flex gap-1 items-start">
             
                <Badge className={`${roleStyle[member.role]}`}>{member.role}</Badge>
                {member.role !== 'owner' && (
                    <Button variant="ghost" className="p-1!">
                        <DotsIcon className="text-secondary w-0.75" />
                    </Button>
                )}
            </div>
        </div>
    );
    return <>{isMobile ? mobileView : desktopView}</>;
};

export default MemberDetails;

