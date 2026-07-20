import AuthButton from "@/shared/AuthButton";
import FormField from "@/shared/FormField";
import Title from "@/shared/Title";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import LeftArrowIcon from "@/assets/icons/leftArrow.svg?react";
import CheckFill from "@/assets/icons/checkFill.svg?react";
import Button from "@/shared/Button";
import TimerIcon from "@/assets/icons/timer.svg?react";

function ForgotForm() {
    const { control } = useForm();

    return (
        <div className="w-full flex flex-col gap-y-8">
            
            <div className="w-full">
                <Title
                    title="Forgot password?"
                    description="No worries, we'll send you reset instructions."
                    align="left"
                    className="max-w-full"
                />
            </div>

          
            <form className="w-full flex flex-col gap-y-6">
                <FormField
                    control={control}
                    name="email"
                    label="EMAIL ADDRESS"
                    type="email"
                    placeholder="Enter your email"
                    containerClassName="w-full"
                />
                
                <AuthButton type="submit" className="py-3.5 w-full">
                    Send Reset Link
                </AuthButton>
            </form>

          
            <div className="w-full flex justify-center items-center">
                <Link to="/login" className="text-primary font-semibold hover:underline flex items-center gap-x-2 text-sm">
                    <LeftArrowIcon className="w-4 h-4" />
                    Back to log in
                </Link>
            </div>

            {/* Success Banner & Resend Section */}
            <div className="flex flex-col gap-y-6 pt-10 border-t border-slate-light/20">
                <div className="bg-[#82F9BE33] p-4 rounded-8px gap-3 flex items-start border border-[#52F7B5]/40">
                    <CheckFill className="w-5 h-5 min-w-5 text-[#005235] mt-0.5" />
                    <p className="text-xs text-[#005235] leading-relaxed font-medium">
                        If an account exists with this email, we’ve sent a password reset link.
                    </p>
                </div>

                <div className="flex flex-col items-center gap-y-3">
                    <span className="text-label font-bold tracking-wider uppercase text-slate-medium">
                        DIDN'T RECEIVE THE EMAIL?
                    </span>
                    <Button variant="tertiay" className=" w-auto min-h-[48px] flex items-center justify-center gap-2 text-sm font-semibold">
                        <TimerIcon className="w-4 h-4 shrink-0" />
                        <span className="text-[#737685]">Resend in 05:00</span>
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default ForgotForm;