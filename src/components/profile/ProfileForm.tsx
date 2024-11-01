import { useForm } from "react-hook-form"
import ErrorMessage from "../ErrorMessage"
import { User, UserProfileForm } from "@/types"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateProfile } from "@/api/ProfileAPI"
import { toast } from "react-toastify"

type ProfileFormProps = {
    data: User
}

export default function ProfileForm({ data }: ProfileFormProps) {

    const { register, handleSubmit, formState: { errors } } = useForm<UserProfileForm>({ defaultValues: data })

    const queryClient = useQueryClient()
    const { mutate } = useMutation({
        mutationFn: updateProfile,
        onSuccess: (res) => {
            toast.success(res)
            queryClient.invalidateQueries({ queryKey: ["user"] })
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })

    const handleEditProfile = (formData: UserProfileForm) => {
        mutate(formData)
    }

    return (
        <>
            <div className="mx-auto max-w-3xl g">
                <h1 className="text-5xl font-black ">My Profile</h1>
                <p className="text-2xl font-light text-gray-400 mt-5">Here you can update your information</p>

                <form
                    onSubmit={handleSubmit(handleEditProfile)}
                    className=" mt-14 space-y-5 bg-neutral-900/80 shadow-lg p-10 rounded-lg"
                    noValidate
                >
                    <div className="mb-5 space-y-3">
                        <label
                            className="text-sm uppercase font-bold"
                            htmlFor="name"
                        >Name</label>
                        <input
                            id="name"
                            type="text"
                            placeholder="Your Name"
                            className="w-full p-3 border border-gray-200 bg-neutral-800"
                            {...register("name", {
                                required: "Name of the user is required",
                            })}
                        />
                        {errors.name && (
                            <ErrorMessage>{errors.name.message}</ErrorMessage>
                        )}
                    </div>

                    <div className="mb-5 space-y-3">
                        <label
                            className="text-sm uppercase font-bold"
                            htmlFor="password"
                        >Email</label>
                        <input
                            id="text"
                            type="email"
                            placeholder="Your Email"
                            className="w-full p-3 border border-gray-200 bg-neutral-800"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /\S+@\S+\.\S+/,
                                    message: "Invalid Email",
                                },
                            })}
                        />
                        {errors.email && (
                            <ErrorMessage>{errors.email.message}</ErrorMessage>
                        )}
                    </div>
                    <input
                        type="submit"
                        value='Save Changes'
                        className="bg-primary hover:bg-primary/90 w-full p-3 uppercase cursor-pointer transition-colors rounded-lg"
                    />
                </form>
            </div>
        </>
    )
}