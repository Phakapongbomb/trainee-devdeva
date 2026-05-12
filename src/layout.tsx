import { Outlet } from "react-router";
import NavBar from "./components/NavBar";

export default function Layout() {
    return (
        <div className="h-screen flex bg-gray-50">
            <NavBar />
            <main className="p-8 flex-1 overflow-y-auto">
                <Outlet />
            </main>
        </div>
    )
}