import { Link } from "react-router-dom"

export default function DashboardView() {
    return (
        <>
            <div className="max-w-3xl mx-auto">
                <h1 className="text-5xl font-black text-primary">My Projects</h1>
                <p className="text-2xl font-light text-gray-500 mt-5">Manage and administer your projects</p>
                <nav className="my-5">
                    <Link
                        to="/projects/create"
                        className="bg-primary hover:bg-primary/80 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors rounded-lg"
                    >New Project</Link>
                </nav>
            </div>
        </>
    )
}
