import { Link, Navigate, useNavigate, useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { getFullProject } from "@/api/ProjectAPI"
import AddTaskModal from "@/components/tasks/AddTaskModal"
import TaskList from "@/components/tasks/TaskList"
import EditTaskData from "@/components/tasks/EditTaskData"
import TaskDetailsModal from "@/components/tasks/TaskDetailsModal"
import { useAuth } from "@/hooks/useAuth"
import { isManager } from "@/utils/policies"
import { useMemo } from "react"
import Spinner from "@/components/Spinner/Spinner"


export default function ProjectDetailsView() {

    const { data: user, isLoading: authLoading } = useAuth()
    const navigate = useNavigate()
    const params = useParams()
    const projectId = params.projectId!

    const { data, isLoading, isError } = useQuery({
        queryKey: ["project", projectId],
        queryFn: () => getFullProject(projectId),
        retry: false
    })

    const canEdit = useMemo(() => data?.manager === user?._id, [data, user])

    if (isLoading && authLoading) return <Spinner />
    if (isError) return <Navigate to={"404"} />

    if (data && user) return (
        <>
            <div className="max-w-7xl mx-auto">
                <h1 className="text-5xl font-black text-slate-50">{data.projectName}</h1>
                <div className='flex flex-col md:flex-row justify-between md:items-end gap-5'>
                    <p className="text-2xl font-light text-gray-400 mt-5 w-4/5 text-pretty">{data.description}</p>
                    {isManager(data.manager, user._id) && (
                        <nav className="my-5 md:my-0 flex gap-2 w-full sm:w-4/5 md:w-3/5 lg:w-2/5 xl:w-1/5 items-end md:justify-end">
                            <button
                                type="button"
                                onClick={() => navigate(location.pathname + "?newTask=true")}
                                className="bg-primary hover:bg-primary/80 px-5 py-3 text-slate-50 text-lg font-bold cursor-pointer transition-colors rounded-lg"
                            >Add Task</button>
                            <Link
                                to={`/projects/${projectId}/team`}
                                className="bg-teal-700 hover:bg-teal-700/80 px-5 py-3 text-slate-50 text-lg font-bold cursor-pointer transition-colors rounded-lg"
                            >
                                Members
                            </Link>
                        </nav>
                    )}
                </div>
                <TaskList
                    tasks={data.tasks}
                    canEdit={canEdit}
                />
                <AddTaskModal />
                <EditTaskData />
                <TaskDetailsModal />
            </div>
        </>
    )
}
