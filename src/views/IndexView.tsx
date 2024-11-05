// import { ArrowLongRightIcon } from "@heroicons/react/20/solid";
import Badge from "@/components/Badge"
import Footer from "@/components/Footer"
import Header from "@/components/Header"
import { ArrowLongRightIcon } from "@heroicons/react/24/solid"
import { Link } from "react-router-dom"

export default function IndexView() {
    return (
        <>
            <Header />
            <div className="max-w-screen-2xl mx-auto mt-10 p-5 pt-20">
                <section className="max-w-7xl mx-auto text-center flex flex-col justify-center items-center gap-y-5 md:gap-y-10">
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
                            <img src="ss.webp" alt="" className="rounded-lg" />
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </>
    )
}