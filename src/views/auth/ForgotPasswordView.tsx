import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query"
import { ForgotPasswordForm } from "../../types";
import ErrorMessage from "@/components/ErrorMessage";
import { forgotPassword } from "@/api/AuthAPI";
import { toast } from "react-toastify";

export default function ForgotPasswordView() {
    const initialValues: ForgotPasswordForm = {
        email: ''
    }
    const { register, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues: initialValues });

    const { mutate } = useMutation({
        mutationFn: forgotPassword,
        onSuccess: (res) => {
            toast.success(res)
            reset()
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })

    const handleForgotPassword = (formData: ForgotPasswordForm) => {
        mutate(formData)
    }

    return (
        <>
            <p className="text-2xl font-light text-center mt-5 text-balance">
                Forgot your password? Enter your email and {''}
                <span className=" text-primary font-bold">reset it</span>
            </p>
            <form
                onSubmit={handleSubmit(handleForgotPassword)}
                className="space-y-8 p-10 bg-neutral-900/80 rounded-lg mt-10"
                noValidate
            >
                <div className="flex flex-col gap-5">
                    <label
                        className="font-normal text-2xl"
                        htmlFor="email"
                    >Email</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Your email"
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

                <input
                    type="submit"
                    value='Send Email'
                    className="bg-primary hover:bg-primary/90 w-full p-3 text-xl cursor-pointer rounded-lg"
                />
            </form>

            <nav className="mt-10 space-y-4">
                <div className="group flex flex-col">
                    <Link
                        to="/auth/login"
                        className="text-center text-gray-300 font-normal group-hover:text-gray-300/90 transition-colors"
                    >Already have an account? <span className=" text-primary group-hover:text-primary/90 font-bold transition-colors">Log in</span></Link>
                </div>
                <div className="group flex flex-col">
                    <Link
                        to="/auth/signup"
                        className="text-center text-gray-300 font-normal group-hover:text-gray-300/90 transition-colors"
                    >Don't have an account? <span className=" text-primary group-hover:text-primary/90 font-bold transition-colors">Create one</span></Link>
                </div>
            </nav>
        </>
    )
}