import Button from "@/shared/Button"
import FormField from "@/shared/FormField"
import Title from "@/shared/Title"
import { useForm } from "react-hook-form"
import { Link, useSearchParams, useNavigate } from "react-router-dom"
import PasswordValidations from "@/features/auth/components/PasswordValidations"
import { zodResolver } from "@hookform/resolvers/zod"
import { resetSchema, type TResetInput } from "@/features/auth/schemas/resert.schema"
import { resetPassword } from "../../services/forgot.services"
import { useState, useEffect } from "react"
import { toast } from "react-toastify"

function ResetForm() {
  const [searchParams] = useSearchParams();
  const hashParams = new URLSearchParams(window.location.hash.substring(1));
  const accessToken = hashParams.get("access_token") || searchParams.get("access_token") || "";

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<TResetInput>({
    resolver: zodResolver(resetSchema),
    mode: "onChange",
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    if (!accessToken) {
      toast.error("Invalid or expired reset link.");
    }
  }, [accessToken]);

  const watchedPassword = watch("password") || "";
  const isLengthValid = watchedPassword.length >= 8 && watchedPassword.length <= 64;
  const isLowercaseValid = /[a-z]/.test(watchedPassword);
  const isUppercaseValid = /[A-Z]/.test(watchedPassword);
  const isDigitValid = /\d/.test(watchedPassword);
  const isSpecialValid = /[!@#$%^&*(),.?":{}|<>]/.test(watchedPassword);

  const OnSubmit = async (data: TResetInput) => {
    if (!accessToken) {
      toast.error("No active reset session found. Please request a new password reset link.");
      return;
    }
    try {
      setIsLoading(true);
      await resetPassword(accessToken, data.password);
      setIsSuccess(true);
      toast.success("Your password has been updated successfully. You can now log in");
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to reset password");
      setIsLoading(false);
    }
  };

  if (!accessToken) {
    return (
      <div className="relative w-full max-w-[512px] bg-white border border-slate-light/30 rounded-8px p-6 md:p-10 shadow-lg flex flex-col items-center justify-center text-center gap-y-4">
        <p className="text-body font-semibold text-error">
          Invalid or expired reset link.
        </p>
        <Link to="/login" className="text-primary font-semibold hover:underline text-sm transition-colors duration-200">
          Back to sign in
        </Link>
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-[512px] bg-white border border-slate-light/30 rounded-8px p-6 md:p-10 shadow-lg flex flex-col">
      <div className="w-full mb-6">
        <Title
          title="Create a New Password"
          description="Create a new, strong password to secure your workstation access."
          align="left"
        />
      </div>
      <form onSubmit={handleSubmit(OnSubmit)} className="w-full flex flex-col gap-6">
        <FormField
          control={control}
          name="password"
          label="New Password"
          type="password"
          placeholder="Enter new password"
          reset
          disabled={isLoading || isSuccess}
          fieldMsg={errors.password?.message}
          variant={errors.password ? "error" : "default"}
          containerClassName="w-full"
        />
        <FormField
          control={control}
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          placeholder="Confirm new password"
          reset
          disabled={isLoading || isSuccess}
          fieldMsg={errors.confirmPassword?.message}
          variant={errors.confirmPassword ? "error" : "default"}
          containerClassName="w-full"
        />


        <div className="w-full space-y-3 rounded-8px p-4 bg-surface-low/50 border border-slate-light/10">
          <p className="text-label-sm font-semibold tracking-[0.55px] uppercase text-slate-medium border-b border-slate-light/20 pb-2">
            Security Requirements
          </p>
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 ">
            <div className="flex flex-col gap-y-2">
              <PasswordValidations label="8-64 characters" isValid={isLengthValid} />
              <PasswordValidations label="Lowercase letter" isValid={isLowercaseValid} />
              <PasswordValidations label="Special character" isValid={isSpecialValid} />
            </div>
            <div className="flex flex-col gap-y-2">
              <PasswordValidations label="Uppercase letter" isValid={isUppercaseValid} />
              <PasswordValidations label="One digit" isValid={isDigitValid} />
            </div>
          </div>
        </div>

        <Button
          type="submit"
          className="w-full py-3.5 cursor-pointer"
          disabled={isLoading || isSuccess || !accessToken}
        >
          {isLoading || isSuccess ? "Updating..." : "Update Password"}
        </Button>
      </form>

      <div className="mt-6 flex justify-center">
        <Link to="/login" className="text-primary font-semibold hover:underline text-sm transition-colors duration-200">
          Back to sign in
        </Link>
      </div>
    </div>
  )
}

export default ResetForm