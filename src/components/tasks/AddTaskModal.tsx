import { Fragment } from 'react';
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import TaskForm from './TaskForm';
import { TaskFormData } from '@/types';
import { createTask } from '@/api/TaskAPI';
import { toast } from 'react-toastify';

export default function AddTaskModal() {

    const navigate = useNavigate()

    // Know if Modal exists
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const modalTask = queryParams.get("newTask")
    // const show = modalTask ? true : false

    // Get projectId
    const params = useParams()
    const projectId = params.projectId!

    const initialValues: TaskFormData = {
        name: "",
        description: ""
    }
    const { register, handleSubmit, reset, formState: { errors } } = useForm<TaskFormData>({ defaultValues: initialValues })

    const queryClient = useQueryClient()
    const { mutate } = useMutation({
        mutationFn: createTask,
        onSuccess: (res) => {
            queryClient.invalidateQueries({ queryKey: ["project", projectId] })
            toast.success(res)
            reset()
            navigate(location.pathname, { replace: true })
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })

    const handleCreateTask = (formData: TaskFormData) => {
        const data = {
            formData,
            projectId
        }
        mutate(data)
    }

    return (
        <Transition appear show={!!modalTask} as={Fragment}>
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
                            <DialogPanel className="w-full max-w-4xl transform overflow-hidden rounded-2xl text-slate-50 bg-neutral-900/80 backdrop-blur text-left align-middle shadow-xl transition-all p-16">
                                <DialogTitle
                                    as="h3"
                                    className="font-black text-4xl  my-5"
                                >
                                    New Task
                                </DialogTitle>

                                <p className="text-xl font-bold">Fill out the form and create  {''}
                                    <span className="text-primary">a task</span>
                                </p>
                                <form
                                    className='mt-10 space-y-3'
                                    noValidate
                                    onSubmit={handleSubmit(handleCreateTask)}
                                >
                                    <TaskForm
                                        register={register}
                                        errors={errors}
                                    />
                                    <input
                                        type="submit"
                                        value="Add task"
                                        className="bg-primary hover:bg-primary/90 w-full p-3 uppercase cursor-pointer transition-colors rounded-lg"
                                    />
                                </form>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}