import { useForm } from "react-hook-form";
import { UserLoginForm } from "@/types/index";
import ErrorMessage from "@/components/ErrorMessage"
import { Link } from "react-router-dom"
import { useMutation } from "@tanstack/react-query"
import { login } from "@/api/AuthAPI";
import { toast } from "react-toastify";

export default function LoginView() {

    const initialValues: UserLoginForm = {
        email: '',
        password: '',
    }
    const { register, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues: initialValues })

    const { mutate } = useMutation({
        mutationFn: login,
        onSuccess: (res) => {
            toast.success(res)
            reset()
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })

    const handleLogin = (formData: UserLoginForm) => {
        mutate(formData)
    }

    return (
        <>
            <form
                onSubmit={handleSubmit(handleLogin)}
                className="space-y-8 p-10 bg-neutral-900/80 rounded-lg"
                noValidate
            >
                <div className="flex flex-col gap-5">
                    <label
                        className="font-normal text-2xl"
                    >Email</label>

                    <input
                        id="email"
                        type="email"
                        placeholder="Your Email"
                        className="w-full p-3 bg-neutral-800 border-gray-200 border"
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: "Invalid email",
                            },
                        })}
                    />
                    {errors.email && (
                        <ErrorMessage>{errors.email.message}</ErrorMessage>
                    )}
                </div>

                <div className="flex flex-col gap-5">
                    <label
                        className="font-normal text-2xl"
                    >Password</label>

                    <input
                        type="password"
                        placeholder="Your Password"
                        className="w-full p-3 bg-neutral-800 border-gray-200 border"
                        {...register("password", {
                            required: "Password is required",
                        })}
                    />
                    {errors.password && (
                        <ErrorMessage>{errors.password.message}</ErrorMessage>
                    )}
                </div>

                <input
                    type="submit"
                    value='Log in'
                    className="bg-primary hover:bg-primary/90 w-full p-3 text-xl cursor-pointer rounded-lg"
                />
            </form>

            <nav className="mt-10 flex flex-col space-y-4 group">
                <Link
                    to="/auth/signup"
                    className="text-center text-gray-300 font-normal group-hover:text-gray-300/90 transition-colors"
                >Don't have an account? <span className=" text-primary group-hover:text-primary/90 font-bold transition-colors">Create one</span></Link>
            </nav>
        </>
    )
}