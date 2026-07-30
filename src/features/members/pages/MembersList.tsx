import Button from "@/shared/Button";
import InviteMemeberIcon from "@/assets/icons/invite-member.svg?react";
import { useMobile } from "@/shared/hooks/shared.hooks";
import MemberDetails from "../components/MemberDetails";
import type { IMember } from "../types/members.types";

const dummyMember: IMember = {
    member_id: "1",
    project_id: "proj-1",
    user_id: "user-1",
    role: "owner",
    metadata: {
        sub: "user-1",
        name: "Haidy Hesham",
        email: "haidy@example.com",
        job_title: "Frontend Developer",
        email_verified: true,
        phone_verified: false,
    },
};
const MembersList = () => {
    const { isMobile } = useMobile(768);
  
    const desktopMembersView = (
        <table className="w-full hidden md:table table-fixed border-collapse rounded-lg overflow-hidden lg:max-w-5/6 xl:max-w-3/4 lg:mx-auto">
            <thead>
                <tr className="bg-surface-md/30 text-left">
                    <th className="w-1/2 uppercase text-label-sm text-secondary px-12 py-5 font-semibold">
                        Member
                    </th>

                    <th className="w-1/4 uppercase text-label-sm text-secondary px-12 py-5 font-semibold text-center">
                        Role
                    </th>

                    <th className="w-1/4 uppercase text-label-sm text-secondary px-12 py-5 font-semibold">actions</th>
                </tr>
            </thead>
            <tbody>
                <tr className="w-full bg-white border-b border-b-slate-lighter last:border-0 hidden md:table-row">

                    <MemberDetails member={dummyMember} />

                </tr>
            </tbody>
        </table>

    );
  
    const mobileMembersView = (
        <div className="flex md:hidden flex-col gap-3">
            <MemberDetails member={dummyMember} />
        </div>
    );

    return (
        <section>
            {/* page header */}
            <header className="justify-between items-center flex mb-5 lg:mb-10">
                <h1 className="font-semibold text-[36px] leading-10 tracking-[-0.9px] capitalize flex-1 text-center lg:text-start w-full">
                    project members
                </h1>
                <Button className="w-fit! gap-2! hidden lg:flex">
                    <InviteMemeberIcon className="text-white w-4.5" />
                    Invite member
                </Button>
            </header>
            {/* members */}
            {isMobile ? mobileMembersView : desktopMembersView}
        </section>
    );
};

export default MembersList;