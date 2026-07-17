import AuthButton from "@/shared/AuthButton"
import FormField from "@/shared/FormField"
import Title from "@/shared/Title"
import { loginSchema, type TLoginInput } from "../../schemas/login.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, type SubmitHandler } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import { loginService } from "../../services/login.services"
import { toast } from "react-toastify"
import { useState } from "react"
import { useAppDispatch } from "@/store/hooks"
import { setCredentials } from "../../store/authSlice"

function LoginForm() {
    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const {
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm<TLoginInput>({
        resolver: zodResolver(loginSchema),
        mode: 'onChange',
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const onSubmit: SubmitHandler<TLoginInput> = async (formData) => {
        try {
            setIsLoading(true)
            const result = await loginService(formData);
            toast.success("Welcome back!");

            if (result && result.access_token) {
                dispatch(
                    setCredentials({
                        user: {
                            id: result.user.id,
                            email: result.user.email,
                            name: result.user.user_metadata?.name || "",
                            job_title: result.user.user_metadata?.department || "",
                        },
                        accessToken: result.access_token,
                        refreshToken: result.refresh_token,
                    })
                );
                navigate("/");
            }
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
                <Title
                    title="Welcome back"
                    description="Enter your credentials to access your workspace."

                />
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="w-full grid grid-cols-1 gap-y-6">
                <FormField
                    control={control}
                    name="email"
                    label="Email"
                    type="email"
                    placeholder="yourname@company.com"
                    fieldMsg={errors.email?.message}
                    variant={errors.email ? "error" : "default"}
                    containerClassName="w-full"
                />

                <FormField
                    control={control}
                    name="password"
                    label="Password"
                    type="password"
                    placeholder="Enter your password"
                    fieldMsg={errors.password?.message}
                    variant={errors.password ? "error" : "default"}
                    containerClassName="w-full"
                />

                <div className="flex justify-between items-center w-full text-sm">
                    <label className="flex items-center gap-x-2 text-slate-medium cursor-pointer">
                        <input
                            type="checkbox"
                            className="w-4 h-4 rounded border-slate-light text-primary focus:ring-primary accent-primary"
                        />
                        <span>Remember Me</span>
                    </label>
                    <Link to="/forgot-password" className="text-primary font-semibold hover:underline">
                        Forgot Password?
                    </Link>
                </div>

                <div className="w-full flex justify-center mt-2">
                    <AuthButton disabled={isLoading} className="py-3.5 w-full">{isLoading ? "Logging in..." : "Log In"}</AuthButton>
                </div>

                <div className="w-full flex justify-center items-center gap-x-2">
                    <span className="text-sm text-slate-medium">Don't have an account?</span>
                    <Link to="/sign-up" className="text-primary font-semibold">Sign Up</Link>
                </div>
            </form>
        </>
    )
}

export default LoginForm