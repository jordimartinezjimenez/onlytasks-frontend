import type { ConfirmToken, NewPasswordForm } from "../../types"
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { useMutation } from "@tanstack/react-query"
import ErrorMessage from "@/components/ErrorMessage"
import { updatePasswordWithToken } from "@/api/AuthAPI"
import { toast } from "react-toastify"

type NewPasswordFormProps = {
    token: ConfirmToken['token']
}

export default function NewPasswordForm({ token }: NewPasswordFormProps) {
    const navigate = useNavigate()
    const initialValues: NewPasswordForm = {
        password: '',
        confirmPassword: '',
    }
    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm({ defaultValues: initialValues });

    const { mutate } = useMutation({
        mutationFn: updatePasswordWithToken,
        onSuccess: (res) => {
            toast.success(res)
            reset()
            navigate('/auth/login')
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })

    const handleNewPassword = (formData: NewPasswordForm) => {
        const data = {
            formData,
            token
        }
        mutate(data)
    }

    const password = watch('password');

    return (
        <>
            <form
                onSubmit={handleSubmit(handleNewPassword)}
                className="space-y-8 p-10 rounded-lg bg-neutral-900/80 mt-10"
                noValidate
            >

                <div className="flex flex-col gap-5">
                    <label
                        className="font-normal text-2xl"
                    >New Password</label>

                    <input
                        type="password"
                        placeholder="Your new password"
                        className="w-full p-3 bg-neutral-800 border-gray-200 border"
                        {...register("password", {
                            required: "Password is required",
                            minLength: {
                                value: 8,
                                message: 'El Password debe ser mínimo de 8 caracteres'
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
                    >Repeat New Password</label>

                    <input
                        id="confirmPassword"
                        type="password"
                        placeholder="Repeat your new password"
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
                    value='Change Password'
                    className="bg-primary hover:bg-primary/90 w-full p-3 text-xl cursor-pointer rounded-lg"
                />
            </form>
        </>
    )
}