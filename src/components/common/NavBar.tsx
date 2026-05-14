import React from 'react';
import { Link, useLocation } from 'react-router';

interface MenuItem {
  title: string;
  path: string;
  icon: React.ReactNode;
}

const menuItems: MenuItem[] = [
  {
    title: 'Dashboard',
    path: '/',
    icon: (
      <svg fill="none" height="18" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="18">
        <rect height="7" rx="1" width="7" x="3" y="3"></rect>
        <rect height="7" rx="1" width="7" x="14" y="3"></rect>
        <rect height="7" rx="1" width="7" x="14" y="14"></rect>
        <rect height="7" rx="1" width="7" x="3" y="14"></rect>
      </svg>
    )
  },
  {
    title: 'Chart JS',
    path: '/chart',
    icon: (
      <svg fill="none" height="18" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="18">
        <path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path>
        <path d="M22 12A10 10 0 0 0 12 2v10z"></path>
      </svg>
    )
  },
  {
    title: 'Settings',
    path: '/setting',
    icon: (
      <svg fill="none" height="18" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="18">
        <circle cx="12" cy="12" r="3"></circle>
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
      </svg>
    )
  }
];

const NavLink = ({ to, icon, children, isActive }: {
  to: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  isActive: boolean;
}) => (
  <Link
    to={to}
    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group ${isActive
      ? 'bg-blue-600 text-white font-medium shadow-md shadow-blue-500/20'
      : 'text-slate-400 hover:bg-white/5 hover:text-white'
      }`}
  >
    <span className={`${isActive ? 'opacity-100' : 'opacity-70 group-hover:opacity-100'}`}>
      {icon}
    </span>
    {children}
  </Link>
);

export default function NavBar({ width, startResizing }: { width: number; startResizing: () => void }) {
  const location = useLocation();

  return (
    <aside
      className="hidden md:flex bg-[#0f172a] text-slate-300 flex-col shrink-0 relative border-r border-white/5 h-screen overflow-hidden"
      style={{ width: `${width}px` }}
    >
      {/* Logo and App Name */}
      <div className="p-6 pb-8 flex items-center gap-3">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-2 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
          <svg fill="none" height="20" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg">
            <polyline points="4 7 4 4 20 4 20 7"></polyline>
            <line x1="9" x2="15" y1="20" y2="20"></line>
            <line x1="12" x2="12" y1="4" y2="20"></line>
          </svg>
        </div>
        <span className="text-white font-bold text-xl tracking-tight">TaskFlow</span>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-4 py-2 space-y-1.5 overflow-y-auto">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            icon={item.icon}
            isActive={location.pathname === item.path}
          >
            {item.title}
          </NavLink>
        ))}
      </nav>

      {/* Resizer Handle */}
      <div
        onMouseDown={startResizing}
        className="resizer-handle absolute top-0 right-0 w-1 h-full bg-transparent hover:bg-blue-500/50 active:bg-blue-500 transition-all cursor-col-resize z-10"
      />
    </aside>
  );
}