import { Fragment } from 'react'
import { Popover, PopoverButton, PopoverPanel, Transition } from '@headlessui/react'
import { Bars3Icon } from '@heroicons/react/20/solid'
import { Link } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'

type NavMenuProps = {
    name: string
}

export default function NavMenu({ name }: NavMenuProps) {

    const queryClient = useQueryClient()
    const logout = () => {
        localStorage.removeItem('AUTH_TOKEN')
        queryClient.invalidateQueries({ queryKey: ["user"] })
        location.reload()
    }

    return (
        <Popover className="relative">
            <PopoverButton className="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 p-1 rounded-lg border border-teal-800">
                <Bars3Icon className='w-8 h-8' />
            </PopoverButton>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
            >
                <PopoverPanel className="absolute z-10 mt-4 flex min-w-52 lg:max-w-min -translate-x-40 md:-translate-x-48 pr-3">
                    <div className="w-full lg:w-56 shrink rounded-xl bg-neutral-800 p-4 text-sm font-semibold leading-6 shadow-lg ring-1 ring-gray-900/5">
                        <p className='text-center'>Hola: {name}</p>
                        <Link
                            to='/projects'
                            className='block p-2 hover:text-slate-50/90'
                        >Projects</Link>
                        <Link
                            to='/profile'
                            className='block p-2 hover:text-slate-50/90'
                        >My Profile</Link>
                        <button
                            className='block p-2 hover:text-slate-50/90'
                            type='button'
                            onClick={logout}
                        >
                            Logout
                        </button>
                    </div>
                </PopoverPanel>
            </Transition>
        </Popover>
    )
}