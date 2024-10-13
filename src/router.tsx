import { BrowserRouter, Routes, Route } from "react-router-dom"
import AppLayout from "@/layouts/AppLayout"
import DashboardView from "@/views/DashboardView"
import IndexView from "@/views/IndexView"
import CreateProjectView from "./views/projects/CreateProjectView"
import EditProjectView from "./views/projects/EditProjectView"
import ProjectDetailsView from "./views/projects/ProjectDetailsView"

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AppLayout />}>
                    <Route path="/" element={<IndexView />} index />
                    {/* <Route path="/" element={<DashboardView />} index /> */}
                    <Route path="/projects" element={<DashboardView />} />
                    <Route path="/projects/create" element={<CreateProjectView />} />
                    <Route path="/projects/:projectId" element={<ProjectDetailsView />} />
                    <Route path="/projects/:projectId/edit" element={<EditProjectView />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}