import { getProjectTeam, removeUserFromProject } from '@/api/TeamAPI'
import AddMemberModal from '@/components/team/AddMemberModal'
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react'
import { EllipsisVerticalIcon } from '@heroicons/react/24/solid'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Fragment } from 'react/jsx-runtime'

export default function ProjectTeamView() {

    const navigate = useNavigate()
    const params = useParams()
    const projectId = params.projectId!


    const { data, isLoading, isError } = useQuery({
        queryKey: ["projectTeam", projectId],
        queryFn: () => getProjectTeam(projectId),
        retry: false
    })

    const queryClient = useQueryClient()
    const { mutate } = useMutation({
        mutationFn: removeUserFromProject,
        onSuccess: (res) => {
            toast.success(res)
            queryClient.invalidateQueries({ queryKey: ["projectTeam", projectId] })
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })

    if (isLoading) return "Loading..."
    if (isError) return <Navigate to={"/404"} />

    if (data) return (
        <>
            <div className="max-w-7xl mx-auto">
                <h1 className="text-5xl font-black text-slate-50">Manage Members</h1>
                <div className='flex flex-col md:flex-row justify-between md:items-end gap-5'>
                    <p className="text-2xl font-light text-gray-400 mt-5 text-pretty">Manage the team working on this project</p>
                    <nav className="my-5 md:my-0 flex gap-2 items-end w-full sm:w-4/5 md:w-3/5 lg:w-2/5 md:justify-end">
                        <button
                            type="button"
                            onClick={() => navigate(location.pathname + "?addMember=true")}
                            className="bg-primary hover:bg-primary/80 px-5 py-3 text-slate-50 text-lg font-bold cursor-pointer transition-colors rounded-lg"
                        >Add Member</button>
                        <Link
                            to={`/projects/${projectId}`}
                            className="bg-teal-700 hover:bg-teal-700/80 px-5 py-3 text-slate-50 text-lg font-bold cursor-pointer transition-colors rounded-lg"
                        >
                            Back to Projects
                        </Link>
                    </nav>
                </div>
                <h2 className="text-5xl font-black my-10">Members</h2>
                {data.length ? (
                    <ul role="list" className="grid grid-cols-1 gap-5 mt-10">
                        {data?.map((member) => (
                            <li key={member._id} className="flex justify-between gap-x-6 px-5 py-10 bg-neutral-900/80 backdrop-blur rounded-lg shadow-lg">
                                <div className="flex min-w-0 gap-x-4">
                                    <div className="min-w-0 flex-auto space-y-2">
                                        <p className="text-2xl font-black ">
                                            {member.name}
                                        </p>
                                        <a href={`mailto:${member.email}`} className="text-sm text-gray-400 hover:text-gray-500">
                                            {member.email}
                                        </a>
                                    </div>
                                </div>
                                <div className="flex shrink-0 items-center gap-x-6">
                                    <Menu as="div" className="relative flex-none">
                                        <MenuButton className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-600">
                                            <span className="sr-only">options</span>
                                            <EllipsisVerticalIcon className="h-9 w-9" aria-hidden="true" />
                                        </MenuButton>
                                        <Transition
                                            as={Fragment}
                                            enter="transition ease-out duration-100"
                                            enterFrom="transform opacity-0 scale-95"
                                            enterTo="transform opacity-100 scale-100"
                                            leave="transition ease-in duration-75"
                                            leaveFrom="transform opacity-100 scale-100"
                                            leaveTo="transform opacity-0 scale-95"
                                        >
                                            <MenuItems className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-neutral-800 py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                                                <MenuItem>
                                                    <button
                                                        type='button'
                                                        className='block px-3 py-1 text-sm leading-6 text-rose-500 hover:text-rose-600'
                                                        onClick={() => mutate({ projectId, userId: member._id })}
                                                    >
                                                        Remove from Project
                                                    </button>
                                                </MenuItem>
                                            </MenuItems>
                                        </Transition>
                                    </Menu>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className='text-center py-20'>There are no members in this team</p>
                )}
                <AddMemberModal />
            </div>
        </>
    )
}
