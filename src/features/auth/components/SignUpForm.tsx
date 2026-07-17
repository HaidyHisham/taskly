import AuthButton from "@/components/AuthButton"
import FormField from "@/components/FormField"
import Title from "@/components/Title"
import PasswordValidations from "@/features/auth/components/PasswordValidations"
import { signupSchema, type TSignupInput } from "@/features/auth/schemas/signup.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, type SubmitHandler } from "react-hook-form"
import { Link } from "react-router-dom"
import { signUpService } from "../services/signup.services"
import { toast } from "react-toastify"
import { useState } from "react"

function SignUpForm() {
  const [isLoading, setIsLoading] = useState(false)
  const {
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm<TSignupInput>({
    resolver: zodResolver(signupSchema),
    mode: 'onChange',
    defaultValues: {
      data: {
        name: '',
        job_title: '',
      },
      email: '',
      password: '',
      confirm_password: '',
    },
  });
  const watchedPassword = watch('password');
  const isPassLengthValid = /^.{8,}$/.test(watchedPassword);
  const isPassFormateValid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/.test(
    watchedPassword
  );
  const hasSpecialChar = /^(?=.*[!@#$%^&*(),.?":{}|<>]).+$/.test(
    watchedPassword
  );

  const onSubmit: SubmitHandler<TSignupInput> = async(formData) => {
    try{
      setIsLoading(true)
      const payload = {
        email: formData.email,
        password:formData.password,
        data:{
          name:formData.data.name,
          department:formData.data.job_title||'',
        },

      }
      
       await signUpService(payload);
      toast.success("Account created successfully!");
      reset();
    
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <div className="mb-6">
        <Title title="Create your workspace" description="Join the editorial approach to task management." />
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6">
        <FormField
          control={control}
          name="data.name"
          label="Name"
          type="text"
          placeholder="Enter your full name"
          fieldMsg={errors.data?.name?.message || "3-50 characters, letters only."}
          variant={errors.data?.name ? "error" : "default"}
          containerClassName="md:col-span-2"
         
        />
        <FormField
          control={control}
          name="email"
          label="Email"
          type="email"
        
          placeholder="yourname@company.com"
          fieldMsg={errors.email?.message}
          variant={errors.email ? "error" : "default"}
          containerClassName="md:col-span-2"
        
        />
        <FormField 
          label="Job Title (Optional)"
          control={control}
          name="data.job_title"
          type="text"
          placeholder="e.g. Project Manager"
          fieldMsg={errors.data?.job_title?.message}
          variant={errors.data?.job_title ? "error" : "default"}
          containerClassName="md:col-span-2"
          isOptional
         
        />
        <FormField
         control={control}
          name="password"
          label="Password"
          type="password"
     
          placeholder="Password"
          fieldMsg={errors.password?.message}
          variant={errors.password ? "error" : "default"}
          containerClassName="md:col-span-1"
       
        />
        <FormField
         control={control}
          name="confirm_password"
          label="confirm password"
          type="password"
       
          placeholder="Repeat your password"
          fieldMsg={errors.confirm_password?.message}
          variant={errors.confirm_password ? "error" : "default"}
          containerClassName="md:col-span-1"
          showPasswordToggle={false}
       
        />
        <div className="hidden md:block md:col-span-2 space-y-2 rounded-8px p-4 bg-surface-low">
          <PasswordValidations label="At least 8 characters" isValid={isPassLengthValid} />
          <PasswordValidations label="One uppercase, lowercase, and digit" isValid={isPassFormateValid} />
          <PasswordValidations label="One special character" isValid={hasSpecialChar} />
        </div>
        <div className="md:col-span-2 flex justify-center">
          <AuthButton disabled={isLoading}  className="py-3.5">{isLoading ? "Creating Account..." : "Create Account"}</AuthButton>
        </div>
        <div className="md:col-span-2 flex justify-center items-center gap-x-2">
          <span className="text-sm text-slate-medium">Already have an account?</span>
          <Link to="/sign-in" className="text-primary font-semibold">Log in</Link>
        </div>
      </form>
    </>
  )
}

export default SignUpForm