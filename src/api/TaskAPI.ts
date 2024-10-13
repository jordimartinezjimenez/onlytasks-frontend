import api from "@/lib/axios"
import { isAxiosError } from "axios"
import { Project, TaskFormData } from "@/types"

type TaskAPI = {
    formData: TaskFormData
    projectId: Project['_id']
}
export async function createTask({ formData, projectId }: Pick<TaskAPI, "formData" | "projectId">) {
    try {
        const { data } = await api.post<string>(`/projects/${projectId}/tasks`, formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}