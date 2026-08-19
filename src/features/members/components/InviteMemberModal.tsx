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

interface IProps {
    isOpen?: boolean;
    onClose: () => void;
}




function InviteMemberModal({ isOpen = true, onClose }: IProps) {
    const { isMobile } = useMobile(768);
    const {
        control,
        formState: { errors },
    } = useForm<TInviteMemberInput>({
        resolver: zodResolver(inviteMemberSchema),
        defaultValues: {
            email: '',
        },
    });


    const desktopView = (
        <section className=" hidden lg:flex flex-col min-h-96 bg-white rounded-lg p-8 max-w-[448px]">
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
            <form>
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
                        className="text-base! lg:rounded-lg! leading-5 w-fit!"
                    >
                        Send Invitation
                    </Button>
                </div>
            </form>


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
            <form>
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
                        icon={
                            <EmailIcon className="text-secondary-light size-4 -order-1" />
                        }
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <Button
                        type="submit"
                        className="text-base! lg:rounded-xs! leading-5"

                    >
                        Send Invitation
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