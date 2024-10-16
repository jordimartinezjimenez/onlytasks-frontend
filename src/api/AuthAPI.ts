import api from "@/lib/axios"
import { isAxiosError } from "axios"
import { ConfirmToken, ForgotPasswordForm, NewPasswordForm, RequestConfirmationCodeForm, UserLoginForm, UserSignupForm } from "@/types"

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

export async function forgotPassword(formData: ForgotPasswordForm) {
    try {
        const { data } = await api.post<string>('/auth/forgot-password', formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function validateToken(formData: ConfirmToken) {
    try {
        const { data } = await api.post<string>('/auth/validate-token', formData)
        console.log(data)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function updatePasswordWithToken({ formData, token }: { formData: NewPasswordForm, token: ConfirmToken['token'] }) {
    try {
        const { data } = await api.post<string>(`/auth/update-password/${token}`, formData)
        console.log(data)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}