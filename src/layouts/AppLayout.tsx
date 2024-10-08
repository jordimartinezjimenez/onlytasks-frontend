import { Outlet } from "react-router-dom"
import Header from "@/components/Header"
import Footer from "@/components/Footer"

export default function AppLayout() {
    return (
        <>
            <Header />
            <section className="max-w-screen-2xl mx-auto mt-10 p-5">
                <Outlet />
            </section>
            <Footer />
        </>
    )
}
