import { Link, useNavigate } from "react-router-dom";
import ProjectForm from "./ProjectForm";
import { Project, ProjectFormData } from "@/types";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateProject } from "@/api/ProjectAPI"
import { toast } from "react-toastify";

type EditProjectFormProps = {
    data: ProjectFormData
    projectId: Project['_id']
}

export default function EditProjectForm({ data, projectId }: EditProjectFormProps) {

    const navigate = useNavigate()

    const initialValues: ProjectFormData = {
        projectName: data.projectName,
        clientName: data.clientName,
        description: data.description
    }
    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues })

    const queryClient = useQueryClient()
    const { mutate } = useMutation({
        mutationFn: updateProject,
        onSuccess: (res) => {
            queryClient.invalidateQueries({ queryKey: ["projects"] })
            queryClient.invalidateQueries({ queryKey: ["editProject", projectId] })
            toast.success(res)
            navigate("/projects")
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })

    const handleForm = (formData: ProjectFormData) => {
        const data = {
            formData,
            projectId
        }
        mutate(data)
    }

    return (
        <>
            <div className="max-w-3xl mx-auto">
                <h1 className="text-5xl font-black">Edit Project</h1>
                <div className="flex flex-col md:flex-row justify-between">
                    <p className="text-2xl font-light text-gray-400 mt-5">Fill out the following form to edit the project</p>
                    <nav className="my-5">
                        <Link
                            to="/projects"
                            className="bg-primary hover:bg-primary/80 px-5 py-3 text-lg font-bold cursor-pointer transition-colors rounded-lg"
                        >Back to projects</Link>
                    </nav>
                </div>
                <form
                    className="mt-10 bg-neutral-900/90 shadow-lg p-10 rounded-lg"
                    onSubmit={handleSubmit(handleForm)}
                    noValidate
                >
                    <ProjectForm
                        register={register}
                        errors={errors}
                    />
                    <input type="submit" value="Save changes"
                        className="bg-primary hover:bg-primary/90 w-full p-3 uppercase font-bol cursor-pointer transition-colors rounded-lg"
                    />
                </form>
            </div>
        </>
    )
}
