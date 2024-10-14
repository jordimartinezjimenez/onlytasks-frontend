import { Fragment } from 'react';
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import { useNavigate, useParams } from 'react-router-dom';
import { Task, TaskFormData } from '@/types';
import { useForm } from 'react-hook-form';
import TaskForm from './TaskForm';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { updateTask } from '@/api/TaskAPI';

type EditTaskModalProps = {
    data: Task,
    taskId: Task['_id']
}

export default function EditTaskModal({ data, taskId }: EditTaskModalProps) {

    const navigate = useNavigate()
    const params = useParams()
    const projectId = params.projectId!

    const initialValues: TaskFormData = {
        name: data.name,
        description: data.description,
        // status: data.status
    }
    const { register, handleSubmit, reset, formState: { errors } } = useForm<TaskFormData>({ defaultValues: initialValues })

    const queryClient = useQueryClient()
    const { mutate } = useMutation({
        mutationFn: updateTask,
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

    const handleEditTask = (formData: TaskFormData) => {
        const data = {
            formData,
            projectId,
            taskId
        }
        mutate(data)
    }

    return (
        <Transition appear show={true} as={Fragment}>
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
                            <DialogPanel className="w-full max-w-4xl transform overflow-hidden rounded-2xl text-slate-50 bg-neutral-900/90 text-left align-middle shadow-xl transition-all p-16">
                                <DialogTitle
                                    as="h3"
                                    className="font-black text-4xl  my-5"
                                >
                                    Edit Task
                                </DialogTitle>

                                <p className="text-xl font-bold">Make changes to this form to edit {''}
                                    <span className="text-primary">a task</span>
                                </p>
                                <form
                                    className='mt-10 space-y-3'
                                    noValidate
                                    onSubmit={handleSubmit(handleEditTask)}
                                >
                                    <TaskForm
                                        register={register}
                                        errors={errors}
                                    />
                                    <input
                                        type="submit"
                                        value="Add task"
                                        className="bg-primary hover:bg-primary/90 w-full p-3 text-slate-50 uppercase font-bol cursor-pointer transition-colors rounded-lg"
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