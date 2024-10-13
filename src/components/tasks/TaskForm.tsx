import { FieldErrors, UseFormRegister } from "react-hook-form"
import { TaskFormData } from "@/types/index";
import ErrorMessage from "../ErrorMessage";

type TaskFormProps = {
    errors: FieldErrors<TaskFormData>
    register: UseFormRegister<TaskFormData>
}

export default function TaskForm({ errors, register }: TaskFormProps) {
    return (
        <>
            <div className="flex flex-col gap-5">
                <label
                    className="font-normal text-2xl"
                    htmlFor="name"
                >Name</label>
                <input
                    id="name"
                    type="text"
                    placeholder="Name of the task"
                    className="w-full p-3 border-gray-200 bg-neutral-800 border"
                    {...register("name", {
                        required: "Name of the task is required",
                    })}
                />
                {errors.name && (
                    <ErrorMessage>{errors.name.message}</ErrorMessage>
                )}
            </div>

            <div className="flex flex-col gap-5">
                <label
                    className="font-normal text-2xl"
                    htmlFor="description"
                >Description</label>
                <textarea
                    id="description"
                    placeholder="Description of the task"
                    className="w-full p-3 border-gray-200 bg-neutral-800 border"
                    {...register("description", {
                        required: "Description of the task is required",
                    })}
                />
                {errors.description && (
                    <ErrorMessage>{errors.description.message}</ErrorMessage>
                )}
            </div>
        </>
    )
}