import { deleteNote } from "@/api/NoteAPI"
import { useAuth } from "@/hooks/useAuth"
import { Note } from "@/types"
import { formatDateNumeric } from "@/utils/utils"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useMemo } from "react"
import { useLocation, useParams } from "react-router-dom"
import { toast } from "react-toastify"
import Spinner from "../Spinner/Spinner"

type NoteDetailProps = {
    note: Note
}

export default function NoteDetail({ note }: NoteDetailProps) {

    const { data, isLoading } = useAuth()
    const canDelete = useMemo(() => data?._id === note.createdBy._id, [data])

    const params = useParams()
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)

    const projectId = params.projectId!
    const taskId = queryParams.get("viewTask")!

    const queryClient = useQueryClient()
    const { mutate } = useMutation({
        mutationFn: deleteNote,
        onSuccess: (res) => {
            queryClient.invalidateQueries({ queryKey: ["task", taskId] })
            toast.success(res)
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })

    if (isLoading) return <Spinner />

    return (
        <div className="flex justify-between items-center p-3 ">
            <div>
                <p className="">{note.content}</p>
                <p className="text-gray-400"><span className="font-medium">{note.createdBy.name}</span> - {formatDateNumeric(note.createdAt)}</p>
            </div>
            {canDelete && (
                <button
                    type="button"
                    onClick={() => mutate({ projectId, taskId, noteId: note._id })}
                    className="text-rose-400 border border-transparent hover:border-rose-400/80 px-2 py-1 font-bold cursor-pointer transition-colors rounded-lg"
                >Delete</button>
            )}
        </div>
    )
}
