import { useForm } from "react-hook-form";
import { UserSignupForm } from "@/types/index"
import { useMutation } from "@tanstack/react-query"
import ErrorMessage from "@/components/ErrorMessage"
import { Link } from "react-router-dom";
import { createAccount } from "@/api/AuthAPI";
import { toast } from "react-toastify";

export default function SignupView() {

    const initialValues: UserSignupForm = {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    }

    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm<UserSignupForm>({ defaultValues: initialValues });

    const { mutate } = useMutation({
        mutationFn: createAccount,
        onSuccess: (res) => {
            toast.success(res)
            reset()
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })

    const password = watch('password');

    const handleRegister = (formData: UserSignupForm) => {
        mutate(formData)
    }

    return (
        <>
            {/* <h1 className="text-5xl font-black text-white">Sign Up</h1> */}
            <p className="text-2xl font-light text-center mt-5">
                Fill out the form to {''}
                <span className=" text-primary font-bold">create your account</span>
            </p>

            <form
                onSubmit={handleSubmit(handleRegister)}
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
                    >Name</label>
                    <input
                        type="name"
                        placeholder="Your Name"
                        className="w-full p-3 bg-neutral-800 border-gray-200 border"
                        {...register("name", {
                            required: "Name is required",
                        })}
                    />
                    {errors.name && (
                        <ErrorMessage>{errors.name.message}</ErrorMessage>
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
                            minLength: {
                                value: 8,
                                message: 'Password must be at least 8 characters'
                            }
                        })}
                    />
                    {errors.password && (
                        <ErrorMessage>{errors.password.message}</ErrorMessage>
                    )}
                </div>

                <div className="flex flex-col gap-5">
                    <label
                        className="font-normal text-2xl"
                    >Confirm Password</label>

                    <input
                        id="confirmPassword"
                        type="password"
                        placeholder="Repeat your password"
                        className="w-full p-3 bg-neutral-800 border-gray-200 border"
                        {...register("confirmPassword", {
                            required: "Confirm password is required",
                            validate: value => value === password || 'Password are not equal'
                        })}
                    />

                    {errors.confirmPassword && (
                        <ErrorMessage>{errors.confirmPassword.message}</ErrorMessage>
                    )}
                </div>

                <input
                    type="submit"
                    value='Sign up'
                    className="bg-primary hover:bg-primary/90 w-full p-3 text-xl cursor-pointer rounded-lg"
                />
            </form>

            <nav className="mt-10 flex flex-col space-y-4 group">
                <Link
                    to="/auth/login"
                    className="text-center text-gray-300 font-normal group-hover:text-gray-300/90 transition-colors"
                >Already have an account? <span className=" text-primary group-hover:text-primary/90 font-bold transition-colors">Log in</span></Link>
            </nav>
        </>
    )
}