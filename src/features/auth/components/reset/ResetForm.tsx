import Button from "@/shared/Button"
import FormField from "@/shared/FormField"
import Title from "@/shared/Title"
import { useForm } from "react-hook-form"
import { Link } from "react-router-dom"
import PasswordValidations from "@/features/auth/components/PasswordValidations"

function ResetForm() {
  const {
    control,
    handleSubmit,
    watch,
  } = useForm({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const watchedPassword = watch("password") || "";
  const isLengthValid = watchedPassword.length >= 8 && watchedPassword.length <= 64;
  const isLowercaseValid = /[a-z]/.test(watchedPassword);
  const isUppercaseValid = /[A-Z]/.test(watchedPassword);
  const isDigitValid = /\d/.test(watchedPassword);
  const isSpecialValid = /[!@#$%^&*(),.?":{}|<>]/.test(watchedPassword);

  const OnSubmit = (data: any) => {
    console.log("Reset Password data submitted:", data)
  };

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
          containerClassName="w-full"
        />
        <FormField
          control={control}
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          placeholder="Confirm new password"
          reset
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
        >
          Update Password
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