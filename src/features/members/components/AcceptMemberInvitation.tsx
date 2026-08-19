import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getAccessToken, isAuthenticated } from "@/features/auth/utils/auth";
import { acceptInvitation, ApiError } from "../services/members.services";
import Button from "@/shared/Button";
import Badge from "@/shared/Badge";
import Logo from "@/shared/Logo";
import FolderIcon from "@/assets/icons/folder.svg?react";

function AcceptMemberInvitation() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const invitationToken = searchParams.get("token");

    const [isLoading, setIsLoading] = useState(false);

    const handleAccept = async (e: React.FormEvent) => {
        e.preventDefault();

        if (isLoading) return;

        if (!invitationToken) {
            toast.error("Invalid invitation token!");
            return;
        }

        if (!isAuthenticated()) {
            toast.error("Unauthorized: Please log in to accept this invitation.");
            navigate(`/login?redirectTo=/invite?token=${invitationToken}`);
            return;
        }

        const accessToken = getAccessToken();
        if (!accessToken) {
            toast.error("Session expired. Please log in again.");
            navigate(`/login?redirectTo=/invite?token=${invitationToken}`);
            return;
        }

        try {
            setIsLoading(true);

            await acceptInvitation({
                token: invitationToken,
                accessToken,
            });

            toast.success("Invitation accepted successfully!");
            navigate("/project");
        } catch (err) {
            if (err instanceof ApiError) {
                if (err.status === 401) {
                    toast.error("Unauthorized: Please log in to accept this invitation.");
                    navigate(`/login?redirect=${encodeURIComponent(`/invite?token=${invitationToken}`)}`);
                    return;
                }
                if (err.status === 403) {
                    toast.error("Forbidden: You do not have permission to accept this invitation.");
                    return;
                }
            }
            const message = err instanceof Error ? err.message : "Failed to accept invitation";
            toast.error(message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="dark-gradient flex flex-col items-center justify-center gap-12 p-4 sm:p-6 lg:p-8 min-h-screen">
            <div className="flex items-center justify-center">
                <Logo />
            </div>

            <section className="rounded-lg shadow-form-sm bg-white w-full max-w-[576px] overflow-hidden">
                <div className="w-full h-1 primary-gradient"></div>
                <div className="p-8 sm:p-12 flex flex-col items-center gap-6">
                    <Badge className="bg-surface-md! py-1.5! px-3! flex items-center gap-1.5 rounded-full!">
                        <FolderIcon className="text-secondary w-3.5 h-3.5 shrink-0" />
                        <span className="text-secondary text-label-sm uppercase">
                            New Project Invitation
                        </span>
                    </Badge>

                    <h1 className="text-slate-dark font-semibold leading-9 letter-spacing-sm text-2xl sm:text-3xl text-center">
                        You've been invited to join new project
                    </h1>

                    <form onSubmit={handleAccept} className="w-full">
                        <Button type="submit" disabled={isLoading} className="w-full">
                            {isLoading ? "Accepting Invitation..." : "Accept Invitation"}
                        </Button>
                    </form>
                </div>
            </section>
        </main>
    );
}

export default AcceptMemberInvitation;