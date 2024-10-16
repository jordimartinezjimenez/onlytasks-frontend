import NewPasswordToken from "@/components/auth/NewPasswordToken"
import NewPasswordForm from "@/components/auth/NewPasswordForm"
import { useState } from "react"
import { ConfirmToken } from "@/types"

export default function NewPasswordView() {
    const [token, setToken] = useState<ConfirmToken['token']>("")
    const [isValidToken, setIsValidToken] = useState(false)

    return (
        <>
            <p className="text-2xl font-light text-center mt-5 text-balance">
                Enter the code you received by email to {''}
                <span className=" text-primary font-bold">reset your password</span>
            </p>

            {!isValidToken ?
                <NewPasswordToken
                    token={token}
                    setToken={setToken}
                    setIsValidToken={setIsValidToken}
                />
                : <NewPasswordForm token={token} />}
        </>
    )
}
