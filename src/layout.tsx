import { Outlet } from "react-router";
import NavBar from "./components/NavBar";
import { useSidebarResize } from "./hooks/useSidebarResize";

export default function Layout() {
    const { width, isResizing, startResizing } = useSidebarResize(240, 180, 600);

    return (
        <div className={`h-screen flex bg-gray-50 ${isResizing ? 'cursor-col-resize select-none' : ''}`}>
            <NavBar width={width} startResizing={startResizing} />
            <main className="p-8 flex-1 overflow-y-auto">
                <Outlet />
            </main>
        </div>
    )
}