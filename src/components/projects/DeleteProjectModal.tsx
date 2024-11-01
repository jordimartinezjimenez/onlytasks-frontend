import { Fragment } from 'react'
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useForm } from "react-hook-form"
import ErrorMessage from "../ErrorMessage"
import { CheckPasswordForm } from '@/types'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { checkPassword } from '@/api/AuthAPI'
import { toast } from 'react-toastify'
import { deleteProject } from '@/api/ProjectAPI'

export default function DeleteProjectModal() {
    const initialValues: CheckPasswordForm = {
        password: ''
    }
    const location = useLocation()
    const navigate = useNavigate()

    const queryParams = new URLSearchParams(location.search);
    const deleteProjectId = queryParams.get('deleteProject')!;
    const show = deleteProjectId ? true : false

    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues })

    const checkUserPasswordMutation = useMutation({
        mutationFn: checkPassword,
        onError: (error) => {
            toast.error(error.message)
        }
    })

    const queryClient = useQueryClient()
    const deleteProjectMutation = useMutation({
        mutationFn: deleteProject,
        onSuccess: (res) => {
            queryClient.invalidateQueries({ queryKey: ["projects"] })
            toast.success(res)
            navigate(location.pathname, { replace: true })
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })

    const handleForm = async (formData: CheckPasswordForm) => {
        await checkUserPasswordMutation.mutateAsync(formData)
        await deleteProjectMutation.mutateAsync(deleteProjectId)
    }

    return (
        <Transition appear show={show} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={() => navigate(location.pathname, { replace: true })}>
                <TransitionChild
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/60" />
                </TransitionChild>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <TransitionChild
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <DialogPanel className="w-full max-w-4xl transform overflow-hidden rounded-2xl text-slate-50 bg-neutral-900/80 text-left align-middle shadow-xl transition-all p-16">

                                <DialogTitle
                                    as="h3"
                                    className="font-black text-4xl  my-5"
                                >Delete Project</DialogTitle>
                                <p className="text-xl font-bold">Confirm the deletion of the project {''}
                                    <span className="text-primary">by entering your password</span>
                                </p>
                                <form
                                    className="mt-10 space-y-5"
                                    onSubmit={handleSubmit(handleForm)}
                                    noValidate
                                >
                                    <div className="flex flex-col gap-3">
                                        <label
                                            className="font-normal text-2xl"
                                            htmlFor="password"
                                        >Password</label>
                                        <input
                                            id="password"
                                            type="password"
                                            placeholder="Your Password"
                                            className="w-full p-3 border-gray-200 bg-neutral-800 border"
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
                                        className="bg-primary hover:bg-primary/90 w-full p-3 uppercase cursor-pointer transition-colors rounded-lg"
                                        value='Delete Project'
                                    />
                                </form>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}