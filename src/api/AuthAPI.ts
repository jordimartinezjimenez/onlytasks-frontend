import api from "@/lib/axios"
import { isAxiosError } from "axios"
import { ConfirmToken, RequestConfirmationCodeForm, UserLoginForm, UserSignupForm } from "@/types"

export async function createAccount(formData: UserSignupForm) {
    try {
        const { data } = await api.post<string>('/auth/create-account', formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function confirmAccount(formData: ConfirmToken) {
    try {
        const { data } = await api.post<string>('/auth/confirm-account', formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function requestConfirmatioCode(formData: RequestConfirmationCodeForm) {
    try {
        const { data } = await api.post<string>('/auth/request-code', formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function login(formData: UserLoginForm) {
    try {
        const { data } = await api.post<string>('/auth/login', formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}