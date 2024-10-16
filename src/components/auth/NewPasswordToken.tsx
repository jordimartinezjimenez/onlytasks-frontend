import { validateToken } from '@/api/AuthAPI';
import { ConfirmToken } from '@/types';
import { PinInput, PinInputField } from '@chakra-ui/pin-input'
import { useMutation } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

type NewPasswordTokenProps = {
    token: ConfirmToken['token']
    setToken: React.Dispatch<React.SetStateAction<string>>
    setIsValidToken: React.Dispatch<React.SetStateAction<boolean>>
}

export default function NewPasswordToken({ token, setToken, setIsValidToken }: NewPasswordTokenProps) {

    const { mutate } = useMutation({
        mutationFn: validateToken,
        onSuccess: (res) => {
            toast.success(res)
            setIsValidToken(true)
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
            <form
                className="space-y-8 p-10 rounded-lg bg-neutral-900/80 mt-10"
            >
                <label
                    className="font-normal text-2xl text-center block"
                >6-digit code</label>
                <div className="flex justify-center gap-5">
                    <PinInput
                        type="number"
                        value={token}
                        onChange={handleChange}
                        onComplete={handleComplete}
                    >
                        {
                            Array.from({ length: 6 }, (_, i) => (
                                <PinInputField key={i} className="text-center w-10 h-10 p-3 rounded-lg border-gray-200 border bg-neutral-800" />
                            ))
                        }
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