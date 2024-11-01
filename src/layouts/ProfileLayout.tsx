import Tabs from "@/components/profile/tabs"
import { Outlet } from "react-router-dom"

export default function ProfileLayout() {
    return (
        <>
            <Tabs />
            <Outlet />
        </>
    )
}
