import { Outlet } from "react-router";
import NavBar from "./components/NavBar";
import { useSidebarResize } from "./hooks/useSidebarResize";

export default function Layout() {
    const { width, isResizing, startResizing } = useSidebarResize(240, 180, 600);

    return (
        <div className={`h-screen flex flex-col md:flex-row bg-gray-50 ${isResizing ? 'cursor-col-resize select-none' : ''}`}>
            {/* Mobile Header */}
            <header className="md:hidden bg-[#0f172a] text-white p-4 flex items-center justify-between border-b border-white/5">
                <div className="flex items-center gap-3">
                    <div className="bg-blue-600 p-1.5 rounded-lg">
                        <svg fill="none" height="18" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" viewBox="0 0 24 24" width="18">
                            <polyline points="4 7 4 4 20 4 20 7"></polyline>
                            <line x1="9" x2="15" y1="20" y2="20"></line>
                            <line x1="12" x2="12" y1="4" y2="20"></line>
                        </svg>
                    </div>
                    <span className="font-bold tracking-tight text-lg">TaskFlow</span>
                </div>
            </header>

            <NavBar width={width} startResizing={startResizing} />
            <main className="p-4 sm:p-8 flex-1 overflow-y-auto">
                <Outlet />
            </main>
        </div>
    )
}
