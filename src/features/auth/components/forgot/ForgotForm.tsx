import AuthButton from "@/shared/AuthButton";
import FormField from "@/shared/FormField";
import Title from "@/shared/Title";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Link } from "react-router-dom";
import LeftArrowIcon from "@/assets/icons/leftArrow.svg?react";
import CheckFill from "@/assets/icons/checkFill.svg?react";
import Button from "@/shared/Button";
import TimerIcon from "@/assets/icons/timer.svg?react";
import LockIcon from "@/assets/icons/lock.svg?react";
import { useState } from "react";
import { toast } from "react-toastify";

interface IForgotInput {
  email: string;
}

function ForgotForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { control, handleSubmit } = useForm<IForgotInput>({
    defaultValues: {
      email: "",
    },
  });

  const onSubmit: SubmitHandler<IForgotInput> = (data) => {
    toast.success('Password reset link sent successfully');
    setIsSubmitted(true);
  };

  return (
    <div className="w-full flex flex-col gap-y-6 md:gap-y-8">
      <div className="flex md:hidden items-center justify-center pt-2">
        <div className="w-12 h-12 rounded-xl bg-surface-low text-primary flex items-center justify-center">
          <LockIcon className="w-6 h-6 text-primary" />
        </div>
      </div>

      <div className="w-full">
        <Title
          title="Forgot password?"
          description="No worries, we'll send you reset instructions."
          align="center"
          className="md:text-start"
        />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-y-6">
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

      <div className="w-full flex justify-center  items-center">
        <Link to="/login" className="text-primary font-semibold hover:underline flex items-center gap-x-2 text-sm">
          <LeftArrowIcon className="w-4 h-4" />
          Back to log in
        </Link>
      </div>

    
      {isSubmitted && (
        <>
        
          <div className="hidden md:flex flex-col gap-y-6 pt-2">
            <div className="bg-success-mint/20 p-4 rounded-8px gap-3 flex items-start border border-success-mint/40">
              <CheckFill className="w-5 h-5 min-w-5 text-[#005235] mt-0.5 shrink-0" />
              <p className="text-xs text-[#005235] leading-relaxed font-medium">
                If an account exists with this email, we’ve sent a password reset link.
              </p>
            </div>

            <div className="flex flex-col items-center gap-y-3">
              <span className="text-label font-bold tracking-wider uppercase text-slate-medium">
                DIDN'T RECEIVE THE EMAIL?
              </span>
              <Button variant="tertiay" className="w-auto min-h-12 flex items-center justify-center gap-2 text-sm font-semibold">
                <TimerIcon className="w-4 h-4 text-[#737685] shrink-0" />
                <span className="text-[#737685]">Resend in 05:00</span>
              </Button>
            </div>
          </div>

          <div className="absolute top-full left-0 right-0 mt-4 flex md:hidden flex-col gap-y-3 bg-success-mint/30 p-4 rounded-8px border border-success-mint/80 w-full">
            <div className="gap-3 flex items-start">
              <CheckFill className="w-5 h-5 text-[#027A48] mt-0.5 shrink-0" />
              <p className="text-xs text-[#027A48] leading-relaxed font-medium">
                If an account exists with this email, we’ve sent a password reset link.
              </p>
            </div>

            <div className="flex flex-row items-center justify-between gap-x-2 pt-3 border-t border-success-mint/80">
              <span className="text-[10px] font-bold tracking-wider uppercase text-[#00523599]">
                DIDN'T RECEIVE EMAIL?
              </span>
              <button type="button" className="flex items-center gap-1.5 text-xs font-bold text-primary uppercase hover:underline cursor-pointer">
                <span>RESEND IN 05:00</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default ForgotForm;