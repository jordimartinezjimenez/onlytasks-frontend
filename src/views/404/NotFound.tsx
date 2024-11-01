import Header from "@/components/Header";
import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <>
            <Header />
            <h1 className="font-black text-center text-4xl mt-20">Page not found</h1>
            <p className="mt-10 text-center">
                You may want to return to {""}
                <Link
                    to="/"
                    className="text-primary font-bold">
                    Home
                </Link>
            </p>
        </>
    )
}
