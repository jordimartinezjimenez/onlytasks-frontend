import { Link, NavLink } from "react-router-dom";
import NavMenu from "./NavMenu";
import { useAuth } from "@/hooks/useAuth";

export default function Header() {

    const { data } = useAuth()

    return (
        <header className="fixed left-0 top-0 z-50 w-full animate-fade-down border-b border-b-slate-500 backdrop-blur-[12px]">
            <div className="container flex items-center justify-around sm:justify-between mx-auto h-[3.5rem]">
                <Link to="/" className="text-md">OnlyTasks</Link>
                <div className="flex gap-x-2 items-center">
                    {!data ?
                        <>
                            <NavLink className="text-sm" to="/auth/login">Log in</NavLink>
                            <NavLink className="text-sm px-4 py-2 rounded-md bg-neutral-800 hover:bg-neutral-800/90" to="/auth/signup">Sign up</NavLink>
                        </>
                        : <NavMenu name={data.name} />
                    }
                </div>
            </div>
        </header>
    )
}
