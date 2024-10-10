import { Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
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

    const handleForm = async (formData: ProjectFormData) => {
        const res = await createProject(formData)
        toast.success(res)
        navigate("/projects")
    }

    return (
        <>
            <div className="max-w-3xl mx-auto">
                <h1 className="text-5xl font-black text-primary">New Project</h1>
                <p className="text-2xl font-light text-gray-500 mt-5">Fill out the following form to create a project</p>
                <nav className="my-5">
                    <Link
                        to="/projects"
                        className="bg-primary hover:bg-primary/80 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors rounded-lg"
                    >Back to projects</Link>
                </nav>

                <form
                    className="mt-10 bg-slate-50 shadow-lg p-10 rounded-lg text-neutral-900"
                    onSubmit={handleSubmit(handleForm)}
                    noValidate
                >
                    <ProjectForm
                        register={register}
                        errors={errors}
                    />
                    <input type="submit" value="Create project"
                        className="bg-primary hover:bg-primary/90 w-full p-3 text-white uppercase font-bol cursor-pointer transition-colors rounded-lg"
                    />
                </form>
            </div>
        </>
    )
}
