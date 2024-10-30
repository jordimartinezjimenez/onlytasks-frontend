import { NoteFormData } from "@/types"
import { useForm } from "react-hook-form"
import ErrorMessage from "../ErrorMessage"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createNote } from "@/api/NoteAPI"
import { toast } from "react-toastify"
import { useLocation, useParams } from "react-router-dom"

export default function AddNoteForm() {

    const params = useParams()
    const projectId = params.projectId!
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const taskId = queryParams.get("viewTask")!

    const initialValues: NoteFormData = {
        content: ""
    }

    const { register, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues: initialValues })

    const queryClient = useQueryClient()
    const { mutate } = useMutation({
        mutationFn: createNote,
        onSuccess: (res) => {
            toast.success(res)
            queryClient.invalidateQueries({ queryKey: ["task", taskId] })
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })

    const handleAddNote = (formData: NoteFormData) => {
        mutate({ projectId, taskId, formData })
        reset()
    }

    return (
        <form
            onSubmit={handleSubmit(handleAddNote)}
            noValidate
            className="space-y-3 mt-5"
        >
            <div className="flex flex-col gap-2">
                <label className="font-bold" htmlFor="content">New Note</label>
                <input
                    type="text"
                    id="content"
                    placeholder="Note content"
                    className="w-full p-3 border border-gray-200 bg-neutral-800"
                    {...register("content", {
                        required: "Content of the note is required",
                    })}
                />
                {errors.content && (
                    <ErrorMessage>{errors.content.message}</ErrorMessage>
                )}
            </div>
            <input
                type="submit"
                value="Create Note"
                className="bg-primary hover:bg-primary/90 w-full p-3 uppercase cursor-pointer transition-colors rounded-lg"
            />
        </form>
    )
}
