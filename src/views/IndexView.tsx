import { Link } from "react-router-dom";

export default function IndexView() {
    return (
        // <div className="grid grid-cols-1 md:grid-cols-2 w-full h-[80vh] px-5 md:px-10 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-2 w-full">
            <div className="flex flex-col justify-center gap-y-5">
                <h1 className="text-3xl lg:text-6xl font-bold">Managing Project Tasks</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus, enim sint quia, quaerat adipisci, repellendus eum officiis vitae atque libero repudiandae esse totam dolorem? Saepe expedita harum modi repellat omnis.</p>
                <Link
                    to="/projects"
                    className="bg-teal-500 text-white px-4 py-2 rounded-full text-center max-w-40"
                >My Projects</Link>
            </div>
            <div className="flex justify-center items-center">
                <div className="relative">
                    <img src="blob-haikei.svg" className="" />
                    <img src="tasks.svg" alt="" className="scale-x-[-1] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                </div>
            </div>
        </div>
    )
}
