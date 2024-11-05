import { Fragment } from 'react'
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react'
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { getProjects } from "@/api/ProjectAPI"
import { useAuth } from '@/hooks/useAuth'
import { isManager } from '@/utils/policies'
import DeleteProjectModal from '@/components/projects/DeleteProjectModal'
import Spinner from '@/components/Spinner/Spinner'

export default function DashboardView() {

    const location = useLocation()
    const navigate = useNavigate()
    const { data: user, isLoading: authLoading } = useAuth()
    const { data, isLoading } = useQuery({
        queryKey: ["projects"],
        queryFn: getProjects,
    })

    if (isLoading && authLoading) return <Spinner />

    if (data && user) return (
        <>
            <div className="max-w-7xl mx-auto">
                <h1 className="text-5xl font-black text-slate-50">My Projects</h1>
                <div className='flex flex-col md:flex-row justify-between'>
                    <p className="text-2xl font-light text-gray-400 mt-5">Manage and administer your projects</p>
                    <nav className="my-5">
                        <Link
                            to="/projects/create"
                            className="bg-primary hover:bg-primary/80 px-5 py-3 text-slate-50 text-lg font-bold cursor-pointer transition-colors rounded-lg"
                        >New Project</Link>
                    </nav>
                </div>
                {data.length ? (
                    <ul role="list" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5 text-slate-50">
                        {data.map((project) => (
                            // <li key={project._id} className="flex justify-between gap-x-6 px-5 py-10 shadow-[inset_0rem_0.2rem_0.4rem_0_rgb(0,0,0,0.1)] bg-[#3d4552] rounded-lg border-b border-b-slate-600 ">
                            <li key={project._id} className="flex justify-between gap-x-6 px-5 py-10 bg-neutral-900/80 backdrop-blur rounded-lg">
                                <div className="flex min-w-0 gap-x-4">
                                    <div className="min-w-0 flex-auto space-y-2">
                                        <div>
                                            {isManager(project.manager, user._id) ?
                                                <p className='font-bold text-xs uppercase bg-primary/10 text-primary border select-none border-primary rounded-lg inline-block py-1 px-5'
                                                >Manager</p> :
                                                <p className='font-bold text-xs uppercase bg-gray-400/10 text-gray-400 border select-none border-gray-400 rounded-lg inline-block py-1 px-5'
                                                >Member</p>
                                            }
                                        </div>
                                        <Link to={`/projects/${project._id}`}
                                            className=" cursor-pointer hover:underline text-3xl font-bold"
                                        >{project.projectName}</Link>
                                        <p className="text-sm text-gray-400">
                                            Client: {project.clientName}
                                        </p>
                                        <p className="text-sm text-gray-400 text-ellipsis line-clamp-3 overflow-hidden text-pretty">
                                            {project.description}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex shrink-0 items-center gap-x-6">
                                    <Menu as="div" className="relative flex-none">
                                        <MenuButton className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-600">
                                            <span className="sr-only">options</span>
                                            <EllipsisVerticalIcon className="h-9 w-9" aria-hidden="true" />
                                        </MenuButton>
                                        <Transition as={Fragment} enter="transition ease-out duration-100"
                                            enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100"
                                            leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100"
                                            leaveTo="transform opacity-0 scale-95">
                                            <MenuItems
                                                className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-neutral-800 py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none"
                                            >
                                                <MenuItem>
                                                    <Link to={`/projects/${project._id}`}
                                                        className='block px-3 py-1 text-sm leading-6 hover:text-gray-300'>
                                                        View Project
                                                    </Link>
                                                </MenuItem>
                                                {isManager(project.manager, user._id) && (
                                                    <>
                                                        <MenuItem>
                                                            <Link to={`/projects/${project._id}/edit`}
                                                                className='block px-3 py-1 text-sm leading-6 hover:text-gray-300'>
                                                                Edit Project
                                                            </Link>
                                                        </MenuItem>
                                                        <MenuItem>
                                                            <button
                                                                type='button'
                                                                className='block px-3 py-1 text-sm leading-6 text-rose-500 hover:text-rose-600'
                                                                onClick={() => navigate(location.pathname + `?deleteProject=${project._id}`)}
                                                            >
                                                                Delete Project
                                                            </button>
                                                        </MenuItem></>
                                                )}
                                            </MenuItems>
                                        </Transition>
                                    </Menu>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-center py-20">There are no projects yet. {''}
                        <Link to="/projects/create" className="text-primary hover:text-primary/80 font-bold">Create Project</Link>
                    </p>
                )}
            </div >
            <DeleteProjectModal />
        </>
    )
}
