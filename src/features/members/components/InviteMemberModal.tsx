import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import Modal from "@/shared/Modal";
import Button from "@/shared/Button";
import MemberIcon from "@/assets/icons/member.svg?react";
import CloseIcon from "@/assets/icons/close.svg?react";
import FormField from "@/shared/FormField";
import Label from "@/shared/Label";
import EmailIcon from "@/assets/icons/email.svg?react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { inviteMemberSchema, type TInviteMemberInput } from "../schemas/InviteMemberFormSchema";
import { useMobile } from "@/shared/hooks/shared.hooks";
import { getAccessToken } from "@/features/auth/utils/auth";
import { inviteMember } from "@/features/members/services/members.services";
import { useAppDispatch } from "@/shared/store/store";
import { fetchMembers } from "@/shared/store/slices/members.slice";
import CheckIcon from "@/assets/icons/check.svg?react";

interface IProps {
    isOpen?: boolean;
    onClose: () => void;
}



function InviteMemberModal({ isOpen: propIsOpen, onClose }: IProps) {
    const [searchParams] = useSearchParams();
    const isOpen = propIsOpen ?? !!searchParams.get('invite-member');
    const { isMobile } = useMobile(1024);
    const { projectId } = useParams<{ projectId?: string }>();
    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const successMsg = (
        <div className="flex items-center justify-center py-2 bg-success-dark/30 rounded-lg mt-6">
            <div className="flex gap-2 items-center">
                <CheckIcon className="size-4 " />
                <p className="font-semibold text-green-dark text-base">
                    Invitation sent successfully!
                </p>
            </div>
        </div>
    );

   

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<TInviteMemberInput>({
        resolver: zodResolver(inviteMemberSchema),
        mode: "onBlur",
        defaultValues: {
            email: '',
        },
    });

    const onSubmit = async (data: TInviteMemberInput) => {
        try {
            setIsLoading(true);
            const token = getAccessToken();
            if (!token) {
                throw new Error("No authenticated user found. Please login.");
            }
            if (!projectId) {
                throw new Error("Project ID is missing.");
            }

            await inviteMember({
                projectId,
                email: data.email,
                accessToken: token,
            });

            setIsSuccess(true);
            toast.success("Invitation sent successfully!");
            dispatch(fetchMembers(projectId));
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Failed to send invitation");
        } finally {
            setIsLoading(false);
        }
    };

    const desktopView = (
        <section className=" hidden lg:flex flex-col min-h-96 bg-white rounded-lg p-8 max-w-[448px] w-full">
            <header className="flex flex-col gap-2 mb-6">
                <div className="flex justify-between items-center">
                    <div className="bg-surface-low size-12 rounded-lg flex items-center justify-center">
                        <MemberIcon className="w-5.5 text-primary" />
                    </div>
                    <Button
                        variant="ghost"
                        className="w-fit! p-0.5!"
                        onClick={onClose}
                    >
                        <CloseIcon className="size-3.5 text-secondary-light" />
                    </Button>
                </div>
                <h2 className="font-bold text-slate-dark leading-8 letter-spacing-sm text-heading-4">
                    Invite Team Member
                </h2>
                <p className="text-secondary leading-5">
                    Send an invitation to join the Architectural Studio workspace.
                </p>
            </header>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-1.5 md:col-span-2 mb-10">
                    <Label
                        htmlFor="email address"
                        activeVariant={errors.email ? 'error' : 'default'}
                    >
                        email address
                    </Label>
                    <FormField
                        control={control}
                        name="email"
                        id="email address"
                        placeholder="Enter your email"
                        fieldMsg={errors.email?.message}
                        variant={errors.email ? 'error' : 'default'}
                        icon={<EmailIcon className="text-secondary-light size-4" />}
                    />
                </div>
                <div className="flex items-center justify-end gap-3 mt-6">
                    <Button
                        variant="ghost"
                        type="button"
                        onClick={onClose}
                        className="font-semibold! text-slate-md! text-base! w-fit!"
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        disabled={isLoading}
                        className="text-base! lg:rounded-lg! leading-5 w-fit!"
                    >
                        {isLoading ? 'Sending...' : 'Send Invitation'}
                    </Button>
                </div>
            </form>
            {isSuccess && successMsg}
        </section>
    );

    const mobileView = (
        <section className="rounded-t-3xl bg-white max-h-[70vh] self-end lg:hidden p-8 w-full">
            <div className="bg-slate-lighter mx-auto w-12 h-1.5 rounded-xl mb-3"></div>
            <header className="flex flex-col gap-2 mb-6">
                <div className="flex justify-end items-center">
                    <Button
                        variant="ghost"
                        className="w-fit! p-0.5!"
                        onClick={onClose}
                    >
                        <CloseIcon className="size-3.5 text-secondary" />
                    </Button>
                </div>
                <h2 className="font-bold text-slate-dark leading-8 letter-spacing-sm text-heading-4">
                    Invite Team Member
                </h2>
                <p className="text-secondary leading-5">
                    Send an invitation to join the Architectural Studio workspace.
                </p>
            </header>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-1.5 md:col-span-2 mb-6">
                    <Label
                        htmlFor="email address"
                        activeVariant={errors.email ? 'error' : 'default'}
                    >
                        email address
                    </Label>
                    <FormField
                        control={control}
                        name="email"
                        id="email address"
                        placeholder="Enter your email"
                        fieldMsg={errors.email?.message}
                        variant={errors.email ? 'error' : 'default'}
                        icon={
                            <EmailIcon className="text-secondary-light size-4 -order-1" />
                        }
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <Button
                        type="submit"
                        disabled={isLoading}
                        className="text-base! lg:rounded-xs! leading-5"
                    >
                        {isLoading ? 'Sending...' : 'Send Invitation'}
                    </Button>
                    <Button
                        variant="ghost"
                        type="button"
                        
                        onClick={onClose}
                        className="font-semibold! text-slate-md! text-base!"
                    >
                        Cancel
                    </Button>
                </div>
            </form>
            {isSuccess && successMsg}
        </section>
    );

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            className="w-full max-w-[448px] p-4 lg:p-0 self-end lg:self-center"
        >
            {isMobile ? mobileView : desktopView}
        </Modal>
    );
}

export default InviteMemberModal;