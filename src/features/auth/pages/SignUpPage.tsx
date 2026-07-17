import SignUpForm from "@/features/auth/components/signup/SignUpForm"
import AuthLayout from "@/layouts/AuthLayout"

function SignUpPage() {
  return (
    <AuthLayout>
      <SignUpForm />
    </AuthLayout>
  )
}

export default SignUpPage