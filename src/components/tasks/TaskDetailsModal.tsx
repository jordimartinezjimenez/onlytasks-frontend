import { Fragment } from 'react';
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react'
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom'
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { getTaskById, updateStatus } from '@/api/TaskAPI';
import { toast } from 'react-toastify';
import { formatDate, formatDateNumeric } from '@/utils/utils';
import { statusTranslations } from '@/locales/en';
import { TaskStatus } from '@/types';


export default function TaskDetailsModal() {

    const navigate = useNavigate()
    const params = useParams()
    const projectId = params.projectId!

    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const taskId = queryParams.get("viewTask")!

    const { data, isError, error } = useQuery({
        queryKey: ["task", taskId],
        queryFn: () => getTaskById({ projectId, taskId }),
        enabled: !!taskId,
        retry: false
    })

    const queryClient = useQueryClient()
    const { mutate } = useMutation({
        mutationFn: updateStatus,
        onSuccess: (res) => {
            queryClient.invalidateQueries({ queryKey: ["project", projectId] })
            queryClient.invalidateQueries({ queryKey: ["task", taskId] })
            toast.success(res)
        },
        onError: (error) => {
            toast.error(error.message, { toastId: "error" })
        }
    })

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const status = e.target.value as TaskStatus
        const data = { projectId, taskId, status }
        mutate(data)
    }

    if (isError) {
        toast.error(error.message, { toastId: "error" })
        return <Navigate to={`/projects/${projectId}`} />
    }

    if (data) return (
        <>
            <Transition appear show={!!taskId} as={Fragment}>
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
                                <DialogPanel className="w-full max-w-4xl transform overflow-hidden rounded-2xl text-slate-50 bg-neutral-900/90 backdrop-blur text-left align-middle shadow-xl transition-all p-16">
                                    <p className='text-sm text-gray-400'>Added on: {formatDate(data.createdAt)}</p>
                                    <p className='text-sm text-gray-400'>Last update: {formatDate(data.updatedAt)}</p>
                                    <DialogTitle
                                        as="h3"
                                        className="font-black text-4xl my-5"
                                    >{data.name}
                                    </DialogTitle>
                                    <p className='text-lg text-gray-400 mb-5 text-pretty'>{data.description}</p>

                                    <div className='mb-5 space-y-3'>
                                        <label className='font-bold'>Current Status:</label>
                                        <select
                                            defaultValue={data.status}
                                            onChange={handleChange}
                                            className='w-full p-3 border border-gray-200 bg-neutral-800 rounded-md'
                                        >
                                            {Object.entries(statusTranslations).map(([key, value]) => (
                                                <option key={key} value={key}>{value}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <p className='font-bold'>History of changes</p>
                                    <ul className='list-decimal list-inside text-gray-400'>
                                        {data.completedBy.map(log => (
                                            <li
                                                key={log._id}
                                                className='text-sm'
                                            >
                                                <span className='font-medium'>{statusTranslations[log.status]} by:</span> <span className='text-slate-50'>{log.user.name} - {formatDateNumeric(log.updatedAt)}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </DialogPanel>
                            </TransitionChild>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}