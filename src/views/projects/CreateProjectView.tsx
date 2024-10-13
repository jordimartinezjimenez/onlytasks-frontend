import { Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { useMutation } from "@tanstack/react-query"
import { toast } from "react-toastify"
import ProjectForm from "@/components/projects/ProjectForm"
import { ProjectFormData } from "@/types"
import { createProject } from "@/api/ProjectAPI"

export default function CreateProjectView() {

    const navigate = useNavigate()
    const initialValues: ProjectFormData = {
        projectName: "",
        clientName: "",
        description: ""
    }
    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues })

    const { mutate } = useMutation({
        mutationFn: createProject,
        onSuccess: (res) => {
            toast.success(res)
            navigate("/projects")
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })

    const handleForm = (formData: ProjectFormData) => {
        mutate(formData)
    }

    // const handleForm = async (formData: ProjectFormData) => {
    //     const res = await createProject(formData)
    //     toast.success(res)
    //     navigate("/projects")
    // }

    return (
        <>
            <div className="max-w-3xl mx-auto">
                <h1 className="text-5xl font-black">New Project</h1>
                <div className="flex flex-col md:flex-row justify-between">
                    <p className="text-2xl font-light text-gray-400 mt-5">Fill out the following form to create a project</p>
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
                    <input type="submit" value="Create project"
                        className="bg-primary hover:bg-primary/90 w-full p-3 uppercase font-bol cursor-pointer transition-colors rounded-lg"
                    />
                </form>
            </div>
        </>
    )
}
