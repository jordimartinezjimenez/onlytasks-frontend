import { Navigate, useNavigate, useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { getProjectById } from "@/api/ProjectAPI"
import AddTaskModal from "@/components/tasks/AddTaskModal"
import TaskList from "@/components/tasks/TaskList"
import EditTaskData from "@/components/tasks/EditTaskData"
import TaskDetailsModal from "@/components/tasks/TaskDetailsModal"


export default function ProjectDetailsView() {

    const navigate = useNavigate()
    const params = useParams()
    const projectId = params.projectId!

    const { data, isLoading, isError } = useQuery({
        queryKey: ["project", projectId],
        queryFn: () => getProjectById(projectId),
        retry: 1
    })

    if (isLoading) return "Loading..."
    if (isError) return <Navigate to={"404"} />

    if (data) return (
        <>
            <div className="max-w-7xl mx-auto">
                <h1 className="text-5xl font-black text-slate-50">{data.projectName}</h1>
                <div className='flex flex-col md:flex-row justify-between md:items-end gap-5'>
                    <p className="text-2xl font-light text-gray-400 mt-5 w-4/5 text-pretty">{data.description}</p>
                    <nav className="my-5 md:my-0">
                        <button
                            type="button"
                            onClick={() => navigate(location.pathname + "?newTask=true")}
                            className="bg-primary hover:bg-primary/80 px-5 py-3 text-slate-50 text-lg font-bold cursor-pointer transition-colors rounded-lg"
                        >Add Task</button>
                    </nav>
                </div>
                <TaskList
                    tasks={data.tasks}
                />
                <AddTaskModal />
                <EditTaskData />
                <TaskDetailsModal />
            </div>
        </>
    )
}
