import { Navigate, Outlet } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { useAuth } from "@/hooks/useAuth"
import Spinner from "@/components/Spinner/Spinner"

export default function AppLayout() {

    const { data, isError, isLoading } = useAuth()

    if (isLoading) return <Spinner />
    if (isError) return <Navigate to={"/auth/login"} />

    if (data) return (
        // <div className="min-h-[calc(100vh+3.5rem)] bg-gradient-to-b from-teal-800 to-15% via-teal-900 to-neutral-900 text-slate-50 -mt-[3.5rem]">
        // <div className="min-h-[calc(100vh+3.5rem)] bg-[#09090b] text-slate-50 -mt-[3.5rem]">
        <div>
            {/* <div className="bg-gradient-radial from-stone-800 via-stone-800 to-teal-700 min-h-screen"> */}
            <Header />
            <section className="max-w-screen-2xl mx-auto mt-10 p-5 pt-20">
                <Outlet />
            </section>
            <Footer />

            <ToastContainer
                pauseOnHover={false}
                pauseOnFocusLoss={false}
                style={{ userSelect: "none" }}
            />
        </div>
    )
}
