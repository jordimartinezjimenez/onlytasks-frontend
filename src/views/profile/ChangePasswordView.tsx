import { useForm } from "react-hook-form"
import ErrorMessage from "@/components/ErrorMessage"
import { UpdateCurrentUserPasswordForm } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { changePassword } from "@/api/ProfileAPI";
import { toast } from "react-toastify";

export default function ChangePasswordView() {
    const initialValues: UpdateCurrentUserPasswordForm = {
        currentPassword: '',
        password: '',
        confirmPassword: ''
    }

    const { register, handleSubmit, watch, formState: { errors } } = useForm({ defaultValues: initialValues })

    const { mutate } = useMutation({
        mutationFn: changePassword,
        onSuccess: (res) => {
            toast.success(res)
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })

    const password = watch('password');

    const handleChangePassword = (formData: UpdateCurrentUserPasswordForm) => {
        mutate(formData)
    }

    return (
        <>
            <div className="mx-auto max-w-3xl">
                <h1 className="text-5xl font-black ">Change Password</h1>
                <p className="text-2xl font-light text-gray-400 mt-5">Use this form to change your password</p>
                <form
                    onSubmit={handleSubmit(handleChangePassword)}
                    className=" mt-14 space-y-5 bg-neutral-900/80 shadow-lg p-10 rounded-lg"
                    noValidate
                >
                    <div className="mb-5 space-y-3">
                        <label
                            className="text-sm uppercase font-bold"
                            htmlFor="currentPassword"
                        >Current Password</label>
                        <input
                            id="currentPassword"
                            type="password"
                            placeholder="Current Password"
                            className="w-full p-3 border border-gray-200 bg-neutral-800"
                            {...register("currentPassword", {
                                required: "Current Password is required",
                            })}
                        />
                        {errors.currentPassword && (
                            <ErrorMessage>{errors.currentPassword.message}</ErrorMessage>
                        )}
                    </div>
                    <div className="mb-5 space-y-3">
                        <label
                            className="text-sm uppercase font-bold"
                            htmlFor="password"
                        >New Password</label>
                        <input
                            id="password"
                            type="password"
                            placeholder="New Password"
                            className="w-full p-3 border border-gray-200 bg-neutral-800"
                            {...register("password", {
                                required: "New Password is required",
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
                    <div className="mb-5 space-y-3">
                        <label
                            htmlFor="confirmPassword"
                            className="text-sm uppercase font-bold"
                        >Confirm Password</label>
                        <input
                            id="confirmPassword"
                            type="password"
                            placeholder="Repeat Password"
                            className="w-full p-3 border border-gray-200 bg-neutral-800"
                            {...register("confirmPassword", {
                                required: "Confirm Password is required",
                                validate: value => value === password || 'Password are not equal'
                            })}
                        />
                        {errors.confirmPassword && (
                            <ErrorMessage>{errors.confirmPassword.message}</ErrorMessage>
                        )}
                    </div>
                    <input
                        type="submit"
                        value='Change Password'
                        className="bg-primary hover:bg-primary/90 w-full p-3 uppercase cursor-pointer transition-colors rounded-lg"
                    />
                </form>
            </div>
        </>
    )
}