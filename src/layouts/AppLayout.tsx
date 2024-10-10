import { Outlet } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Header from "@/components/Header"
import Footer from "@/components/Footer"

export default function AppLayout() {
    return (
        <div className="min-h-[calc(100vh+3.5rem)] bg-gradient-to-b from-teal-800 to-15% via-teal-900 to-neutral-900 text-slate-50 -mt-[3.5rem]">
            {/* <div className="bg-gradient-radial from-stone-800 via-stone-800 to-teal-700 min-h-screen"> */}
            <Header />
            <section className="max-w-screen-2xl mx-auto mt-10 p-5 pt-[7rem]">
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
