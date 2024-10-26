import { useMutation, useQueryClient } from "@tanstack/react-query"
import { TeamMember } from "@/types"
import { addUserToProject } from "@/api/TeamAPI"
import { toast } from "react-toastify"
import { useNavigate, useParams } from "react-router-dom"

type SearchResultProps = {
    user: TeamMember
    reset: () => void
}

export default function SearchResult({ user, reset }: SearchResultProps) {

    const navigate = useNavigate()
    const params = useParams()
    const projectId = params.projectId!

    const queryClient = useQueryClient()
    const { mutate } = useMutation({
        mutationFn: addUserToProject,
        onSuccess: (res) => {
            toast.success(res)
            reset()
            navigate(location.pathname, { replace: true })
            queryClient.invalidateQueries({ queryKey: ["projectTeam", projectId] })
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })

    const handleAddUserToProject = () => {
        const data = { projectId, id: user._id }
        mutate(data)
    }

    return (
        <>
            <p className="mt-10 text-center font-bold">Result:</p>
            <div className="flex justify-between items-center">
                <p>{user.name}</p>
                <button
                    className="text-primary border border-transparent hover:border-primary/80 px-3 py-2 font-bold cursor-pointer transition-colors rounded-lg"
                    onClick={handleAddUserToProject}
                >
                    Add to Project
                </button>
            </div>
        </>
    )
}
