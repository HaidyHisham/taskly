import AuthLayout from "@/layouts/AuthLayout";
import LoginForm from "../components/login/loginForm";

export default function LoginPage() {
    return (
        <AuthLayout>
            <LoginForm />
        </AuthLayout>
    )
}