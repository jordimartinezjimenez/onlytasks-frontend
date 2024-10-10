import { Link } from "react-router-dom";
import Logo from "./Logo";
import NavMenu from "./NavMenu";

export default function Header() {
    return (
        // <header className="bg-[#74d3d1] py-5 animate-fade-down">
        //     <div className="max-w-screen-2xl mx-auto flex flex-col lg:flex-row justify-between items-center">
        //         <div className="w-64">
        //             <Logo />
        //         </div>
        //     </div>
        // </header>md:
        // <header className="border-2 border-primary py-5  max-w-screen-md mx-auto rounded-3xl animate-fade-down bg-stone-800">
        // <header className="py-2 px-2 md:py-5 sm:px-5">
        //     <div className="flex flex-col lg:flex-row justify-between items-center px-5 py-5 max-w-screen-md mx-auto rounded-3xl animate-fade-down bg-neutral-900 shadow-2xl border-b border-b-white">
        //         <div className="w-40">
        //             <Logo />
        //         </div>
        //         <NavMenu />
        //     </div>
        // </header>
        // <header className="fixed left-0 top-0 z-50 w-full translate-y-[-1rem] animate-fade-in border-b backdrop-blur-[12px] [--animation-delay:600ms]">
        //     <div className="container flex h-[3.5rem] items-center justify-between">
        //         <a className="text-md flex items-center" href="/">Magic UI</a>
        //         <div className="ml-auto flex h-full items-center">
        //             <a className="mr-6 text-sm" href="/signin">Log in</a>
        //             <a className="inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 h-9 px-4 py-2 mr-6 text-sm" href="/signup">Sign up</a>
        //         </div>
        //         <button className="ml-6 md:hidden">
        //             <span className="sr-only">Toggle menu</span>
        //             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-align-justify ">
        //                 <line x1="3" x2="21" y1="6" y2="6"></line><line x1="3" x2="21" y1="12" y2="12"></line><line x1="3" x2="21" y1="18" y2="18"></line></svg>
        //         </button>
        //     </div>
        // </header>
        <header className="fixed left-0 top-0 z-50 w-full animate-fade-down border-b border-b-slate-500 backdrop-blur-[12px]">
            <div className="container flex items-center justify-around sm:justify-between mx-auto h-[3.5rem]">
                <Link to="/" className="text-md">OnlyTasks</Link>
                <div className="flex gap-x-2 items-center">
                    <a className="text-sm" href="#">Log in</a>
                    <a className="text-sm px-4 py-2 rounded-md bg-neutral-800 hover:bg-neutral-800/90" href="#">Sign up</a>
                    <NavMenu />
                </div>
                {/* <button className="md:hidden">
                <span className="">Toggle menu</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-align-justify ">
                    <line x1="3" x2="21" y1="6" y2="6"></line><line x1="3" x2="21" y1="12" y2="12"></line><line x1="3" x2="21" y1="18" y2="18"></line></svg>
            </button> */}
            </div>
        </header>
    )
}
