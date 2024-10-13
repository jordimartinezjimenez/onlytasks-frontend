import { Navigate, useNavigate, useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { getProjectById } from "@/api/ProjectAPI"
import AddTaskModal from "@/components/tasks/AddTaskModal"


export default function ProjectDetailsView() {

    const navigate = useNavigate()
    const params = useParams()
    const projectId = params.projectId!

    const { data, isLoading, isError } = useQuery({
        queryKey: ["editProject", projectId],
        queryFn: () => getProjectById(projectId),
        retry: 1
    })

    if (isLoading) return "Loading..."
    if (isError) return <Navigate to={"404"} />

    if (data) return (
        <>
            <div className="max-w-5xl mx-auto">
                <h1 className="text-5xl font-black text-slate-50">{data.projectName}</h1>
                <p className="text-2xl font-light text-gray-400 mt-5">{data.description}</p>
                <nav className="my-5 flex gap-3">
                    <button
                        type="button"
                        onClick={() => navigate(location.pathname + "?newTask=true")}
                        className="bg-primary hover:bg-primary/80 px-5 py-3 text-slate-50 text-lg font-bold cursor-pointer transition-colors rounded-lg"
                    >Add Task</button>
                </nav>

                <AddTaskModal />
            </div>
        </>
    )
}
