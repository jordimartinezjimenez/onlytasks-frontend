import Footer from "@/components/Footer"
import Header from "@/components/Header"
import Logo from "@/components/Logo"
import { Outlet } from "react-router-dom"
import { ToastContainer } from "react-toastify"

export default function AuthLayout() {
    return (
        <>
            <Header />
            <section className="mt-10 py-10 lg:py-20 mx-auto w-[450px]">
                <Logo />
                <div className="mt-10">
                    <Outlet />
                </div>
            </section>
            <Footer />

            <ToastContainer
                pauseOnHover={false}
                pauseOnFocusLoss={false}
                style={{ userSelect: "none" }}
            />
        </>
    )
}
