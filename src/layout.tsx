import { Outlet } from "react-router";
import { NavBar } from "./components/common";
import { useSidebarResize } from "./hooks/useSidebarResize";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Layout() {
    const { width, isResizing, startResizing } = useSidebarResize(240, 180, 600);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <div className={`h-screen flex flex-col md:flex-row bg-gray-50 ${isResizing ? 'cursor-col-resize select-none' : ''}`}>
            {/* Mobile Header */}
            <header className="md:hidden bg-[#0f172a] text-white p-4 flex items-center justify-between border-b border-white/5 sticky top-0 z-50">
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
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="p-2 text-slate-300 hover:text-white transition-colors"
                >
                    {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </header>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            <div className={`${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 fixed md:relative z-50 md:z-auto transition-transform duration-300 ease-in-out`}>
                <NavBar width={width} startResizing={startResizing} onMobileClick={() => setIsMobileMenuOpen(false)} />
            </div>
            <main className="flex-1 flex flex-col overflow-hidden relative">
                <Outlet />
            </main>
        </div>
    )
}

