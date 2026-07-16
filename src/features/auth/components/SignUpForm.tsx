import AuthButton from "@/components/AuthButton"
import FormFields from "@/components/FormFields"
import Title from "@/components/Title"
import PasswordValidations from "@/features/auth/components/PasswordValidations"
import { Link } from "react-router-dom"

function SignUpForm() {
    return (
        <>
        <div className="mb-6">
        <Title title="Create your workspace" description="Join the editorial approach to task management."/>
        </div>
        <form className="w-full grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6">
            <FormFields label="Name" type="text" required placeholder="Enter your full name"
             fieldMsg="3-50 characters, letters only." containerClassName="md:col-span-2"/>
            <FormFields label="Email" type="email" required placeholder="yourname@company.com" containerClassName="md:col-span-2"/>
            <FormFields label = "Job Title (Optional)" type="text" placeholder="e.g. Project Manager" containerClassName="md:col-span-2"/>
            <FormFields 
             name="password"
             label="Password"
             type="password"
             required placeholder="Password"
             containerClassName="md:col-span-1"
             />
             <FormFields 
               name="confirm_password"
               label="confirm password"
             type="password"
             required placeholder="Repeat your password"
             containerClassName="md:col-span-1"
             showPasswordToggle={false}
             />
             <div className="hidden md:block md:col-span-2 space-y-2 rounded-8px p-4 bg-surface-low">
               <PasswordValidations label="At least 8 characters" isValid/>
               <PasswordValidations label="One uppercase, lowercase, and digit"/>
               <PasswordValidations label="One special character"/>
             </div>
             <div className="md:col-span-2 flex justify-center">
                <AuthButton className="py-3.5">Create Account</AuthButton>
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