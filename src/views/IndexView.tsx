// import { ArrowLongRightIcon } from "@heroicons/react/20/solid";
import Badge from "@/components/Badge";
import { ArrowLongRightIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

export default function IndexView() {
    return (
        // <div className="grid grid-cols-1 md:grid-cols-2 w-full h-[80vh] px-5 md:px-10 lg:px-20">
        // <div className="grid grid-cols-1 md:grid-cols-2 w-full">
        //     <div className="flex flex-col justify-center gap-y-5">
        //         <h1 className="text-3xl lg:text-6xl font-bold">Managing Project Tasks</h1>
        //         <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus, enim sint quia, quaerat adipisci, repellendus eum officiis vitae atque libero repudiandae esse totam dolorem? Saepe expedita harum modi repellat omnis.</p>
        //         <Link
        //             to="/projects"
        //             className="bg-teal-500 text-white px-4 py-2 rounded-full text-center max-w-40"
        //         >My Projects</Link>
        //     </div>
        //     <div className="flex justify-center items-center">
        //         <div className="relative">
        //             <img src="blob-haikei.svg" className="" />
        //             <img src="tasks.svg" alt="" className="scale-x-[-1] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        //         </div>
        //     </div>
        // </div>
        <section className="max-w-[80rem] mx-auto text-center flex flex-col justify-center items-center gap-y-5 md:gap-y-10 mt-16">
            <Badge />
            <h1
                className="text-balance text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-medium text-transparent py-6 leading-none tracking-tighter bg-gradient-to-br from-white from-30% to-white/40 bg-clip-text"
            >OnlyTasks is the best way to manage tasks of projects.</h1>
            <p className="text-balance text-lg md:text-xl tracking-tight text-gray-400">
                Beautifully designed, animated components and templates built with <br className="hidden md:block" />Tailwind CSS, React, and Framer Motion.
            </p>
            {/* <button className="bg-teal-800 hover:bg-teal-800/90 px-4 py-2 rounded-lg text-sm font-medium shadow"><span>Get Started for Free</span></button> */}
            <Link
                to={"/projects"}
                className="bg-teal-800 hover:bg-teal-800/90 px-4 py-2 rounded-lg text-sm font-medium shadow flex items-center justify-center gap-x-1"
            >
                <span>Get Started for Free</span><ArrowLongRightIcon className="w-5 h-5" />
            </Link>
            <div className="relative rounded-lg dark-box before:bg-gradient-to-b from-transparent to-80% to-neutral-950">
                <div className="inner">
                    <img src="ss.png" alt="" className="rounded-lg" />
                </div>
            </div>
        </section>
    )
}