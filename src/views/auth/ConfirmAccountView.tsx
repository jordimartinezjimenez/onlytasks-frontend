import { Link } from "react-router-dom"
import { PinInput, PinInputField } from "@chakra-ui/pin-input"
import { useState } from "react"
import { ConfirmToken } from "@/types"
import { useMutation } from "@tanstack/react-query"
import { confirmAccount } from "@/api/AuthAPI"
import { toast } from "react-toastify"

export default function ConfirmAccountView() { 

    const [token, setToken] = useState<ConfirmToken['token']>("")

    const { mutate } = useMutation({
        mutationFn: confirmAccount,
        onSuccess: (res) => {
            toast.success(res)
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })

    const handleChange = (token: ConfirmToken['token']) => {
        setToken(token)
    }

    const handleComplete = (token: ConfirmToken['token']) => {
        mutate({ token })
    }

    return (
        <>
            <h1 className="text-5xl font-black text-center text-balance">Confirm your Account</h1>
            <p className="text-2xl font-light mt-5 text-center text-balance">
                Enter the code you received {''}
                <span className=" text-primary font-bold"> by email</span>
            </p>
            <form
                className="space-y-8 p-10 bg-neutral-900/80 rounded-lg mt-10"
            >
                <label
                    className="font-normal text-2xl text-center block"
                >6-digit code</label>
                <div className="flex justify-center gap-5">
                    <PinInput
                        value={token}
                        onChange={handleChange}
                        onComplete={handleComplete}
                        type="number"
                    >
                        <PinInputField
                            className="text-center w-10 h-10 p-3 rounded-lg border-gray-200 border bg-neutral-800"
                        />
                        <PinInputField
                            className="text-center w-10 h-10 p-3 rounded-lg border-gray-200 border bg-neutral-800"
                        />
                        <PinInputField
                            className="text-center w-10 h-10 p-3 rounded-lg border-gray-200 border bg-neutral-800"
                        />
                        <PinInputField
                            className="text-center w-10 h-10 p-3 rounded-lg border-gray-200 border bg-neutral-800"
                        />
                        <PinInputField
                            className="text-center w-10 h-10 p-3 rounded-lg border-gray-200 border bg-neutral-800"
                        />
                        <PinInputField
                            className="text-center w-10 h-10 p-3 rounded-lg border-gray-200 border bg-neutral-800"
                        />
                    </PinInput>
                </div>
            </form>

            <nav className="mt-10 flex flex-col space-y-4 group">
                <Link
                    to='/auth/request-code'
                    className="text-center text-gray-300 font-normal group-hover:text-gray-300/90 transition-colors"
                >
                    Request a <span className=" text-primary group-hover:text-primary/90 font-bold transition-colors">new Code</span>
                </Link>
            </nav>

        </>
    )
}