import { Fragment } from "react"
import { Task } from "@/types"
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from "@headlessui/react"
import { EllipsisVerticalIcon } from "@heroicons/react/24/solid"
import { useNavigate, useParams } from "react-router-dom"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-toastify"
import { deleteTask } from "@/api/TaskAPI"

type TaskCardProps = {
    task: Task
}

export default function TaskCard({ task }: TaskCardProps) {

    const navigate = useNavigate()
    const params = useParams()
    const projectId = params.projectId!

    const queryClient = useQueryClient()
    const { mutate } = useMutation({
        mutationFn: deleteTask,
        onSuccess: (res) => {
            queryClient.invalidateQueries({ queryKey: ["project", projectId] })
            toast.success(res)
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })

    return (
        <li className="p-5 bg-neutral-900/80 flex justify-between gap-3">
            <div className="min-w-0 flex flex-col gap-y-4">
                <button
                    type="button"
                    className="text-xl font-bold text-left"
                >{task.name}</button>
                <p className="text-gray-400 text-pretty">{task.description}</p>
            </div>
            <div>
                <div className="flex shrink-0 items-center gap-x-6">
                    <Menu as="div" className="relative flex-none">
                        <MenuButton className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-600">
                            <span className="sr-only">opciones</span>
                            <EllipsisVerticalIcon className="h-9 w-9" aria-hidden="true" />
                        </MenuButton>
                        <Transition as={Fragment} enter="transition ease-out duration-100" enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100" leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100" leaveTo="transform opacity-0 scale-95">
                            <MenuItems
                                className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-neutral-800 py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none"
                            >
                                <MenuItem>
                                    <button type='button' className='block px-3 py-1 text-sm leading-6 hover:text-gray-300'>
                                        Show Task
                                    </button>
                                </MenuItem>
                                <MenuItem>
                                    <button
                                        type='button'
                                        onClick={() => navigate(`${location.pathname}?editTask=${task._id}`)}
                                        className='block px-3 py-1 text-sm leading-6 hover:text-gray-300'>
                                        Edit Task
                                    </button>
                                </MenuItem>

                                <MenuItem>
                                    <button
                                        type='button'
                                        onClick={() => mutate({ projectId, taskId: task._id })}
                                        className='block px-3 py-1 text-sm leading-6 text-rose-500 hover:text-rose-600'>
                                        Delete Task
                                    </button>
                                </MenuItem>
                            </MenuItems>
                        </Transition>
                    </Menu>
                </div>
            </div>
        </li>
    )
}
