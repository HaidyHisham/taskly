import Button from "@/shared/Button";
import InviteMemeberIcon from "@/assets/icons/invite-member.svg?react";
import { useMobile } from "@/shared/hooks/shared.hooks";
import MemberDetails from "../components/MemberDetails";
import LoadingMembers from "../components/LoadingMembers";
import ErrorState from "@/shared/ErrorState";
import { useAppDispatch, useAppSelector } from "@/shared/store/store";
import { useParams, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { fetchMembers, resetMembers } from "@/shared/store/slices/members.slice";
import InviteMemberModal from "../components/InviteMemberModal";
import MemberCard from "../components/MemberCard";


const MembersList = () => {
    const { members, loading, error } = useAppSelector((state) => state.members);
    const dispatch = useAppDispatch();
    const { projectId } = useParams();
    const { isMobile } = useMobile(768);
    const [searchParams, setSearchParams] = useSearchParams();
    const isInviteMemberModalOpen = searchParams.get('invite-member');

    const handleRetry = () => {
        if (projectId) {
            dispatch(fetchMembers(projectId as string));
        }
    };

    useEffect(() => {
        if (projectId) {
            dispatch(fetchMembers(projectId as string));
        }

        return () => {
            dispatch(resetMembers());
        };
    }, [dispatch, projectId]);

    if (loading === 'rejected') {
        return (
            <ErrorState
                item="project members"
                message={error || undefined}
                reset={handleRetry}
            />
        );
    }

    if (loading === 'pending' && members.length === 0) {
        return <LoadingMembers />;
    }

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
                <th className="w-1/4 uppercase text-label-sm text-secondary px-12 py-5 font-semibold">
                    actions
                </th>
            </tr>
        </thead>
      <tbody>
    {members.map((member) => (
        <MemberDetails key={member?.member_id} member={member} />
    ))}
</tbody>
    </table>
);
const mobileMembersView = (
    <div className="flex md:hidden flex-col gap-3">
        {members.map((member) => (
            <MemberCard key={member?.member_id} member={member} />
        ))}
    </div>
);

    const handleOpenInviteModal = () => {
        const newParams = new URLSearchParams(searchParams);
        newParams.set('invite-member', 'true');
        setSearchParams(newParams);
    };

    const handleCloseInviteModal = () => {
        const newParams = new URLSearchParams(searchParams);
        newParams.delete('invite-member');
        setSearchParams(newParams);
    };

    return (
        <section>
            {/* page header */}
            <header className="justify-between items-center flex mb-5 lg:mb-10">
                <h1 className="font-semibold text-[36px] leading-10 tracking-[-0.9px] capitalize flex-1 text-center lg:text-start w-full">
                    project members
                </h1>
                <Button className="w-fit! gap-2! hidden lg:flex" onClick={handleOpenInviteModal}>
                    <InviteMemeberIcon className="text-white w-4.5" />
                    Invite member
                </Button>
            </header>
            {/* members */}
            {isMobile ? mobileMembersView : desktopMembersView}
            {isInviteMemberModalOpen && (
                <InviteMemberModal isOpen={Boolean(isInviteMemberModalOpen)} onClose={handleCloseInviteModal} />
            )}
        </section>
    );

};

export default MembersList;