import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query"
import { RequestConfirmationCodeForm } from "../../types"
import ErrorMessage from "@/components/ErrorMessage"
import { requestConfirmatioCode } from "@/api/AuthAPI";
import { toast } from "react-toastify";

export default function RegisterView() {
    const initialValues: RequestConfirmationCodeForm = {
        email: ''
    }

    const { register, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues: initialValues });

    const { mutate } = useMutation({
        mutationFn: requestConfirmatioCode,
        onSuccess: (res) => {
            toast.success(res)
            reset()
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })

    const handleRequestCode = (formData: RequestConfirmationCodeForm) => {
        mutate(formData)
    }

    return (
        <>
            <h1 className="text-5xl font-black text-center text-balance">Request Confirmation Code</h1>
            <p className="text-2xl font-light mt-5 text-center text-balance">
                Enter your e-mail address to receive {''}
                <span className=" text-primary font-bold"> a new code</span>
            </p>

            <form
                onSubmit={handleSubmit(handleRequestCode)}
                className="space-y-8 p-10 rounded-lg bg-neutral-900/80 mt-10"
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
                        placeholder="Email de Registro"
                        className="w-full p-3 rounded-lg bg-neutral-800 border-gray-200 border"
                        {...register("email", {
                            required: "El Email de registro es obligatorio",
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: "E-mail no válido",
                            },
                        })}
                    />
                    {errors.email && (
                        <ErrorMessage>{errors.email.message}</ErrorMessage>
                    )}
                </div>

                <input
                    type="submit"
                    value='Send Code'
                    className="bg-primary hover:bg-primary/90 w-full p-3 rounded-lg text-xl cursor-pointer"
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
                        to="/auth/forgot-password"
                        className="text-center text-gray-300 font-normal group-hover:text-gray-300/90 transition-colors"
                    >Forgot your password? <span className=" text-primary group-hover:text-primary/90 font-bold transition-colors">Reset</span></Link>
                </div>
            </nav>
        </>
    )
}