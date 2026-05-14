import React from 'react';
import { Bell, ChevronDown } from 'lucide-react';
import { Input } from './index';

interface TopNavProps {
    title?: string;
    searchQuery?: string;
    setSearchQuery?: (query: string) => void;
    placeholder?: string;
    showSearch?: boolean;
    userName?: string;
    userAvatar?: string;
}

const TopNav: React.FC<TopNavProps> = ({
    title,
    searchQuery = '',
    setSearchQuery,
    placeholder = "Search name, priority, or status...",
    showSearch = true,
    userName = 'Alex Chen',
    userAvatar
}) => {
    return (
        <header className="bg-white border-b border-slate-200 py-3 sticky top-0 z-20 shrink-0">
            <div className="container mx-auto px-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    {title && (
                        <h1 className="text-xl font-bold text-slate-900 tracking-tight">{title}</h1>
                    )}
                </div>

                <div className="flex items-center gap-6">
                    {showSearch && setSearchQuery && (
                        <div className="hidden sm:block">
                            <Input
                                showSearchIcon={true}
                                className="!bg-slate-50 !py-1.5 !rounded-lg border-slate-200 w-64 focus:!ring-blue-500/20 focus:!border-blue-500 transition-all"
                                placeholder={placeholder}
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    )}

                    <div className="flex items-center gap-4">
                        <button className="relative p-2 text-slate-500 hover:text-slate-700 transition-colors rounded-full hover:bg-slate-100 group">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white group-hover:scale-110 transition-transform"></span>
                        </button>

                        <div className="h-6 w-px bg-slate-200 hidden sm:block"></div>

                        <div className="flex items-center gap-3 cursor-pointer hover:bg-slate-50 p-1.5 rounded-xl transition-all border border-transparent hover:border-slate-100 group">
                            <div className="relative">
                                {userAvatar ? (
                                    <img src={userAvatar} alt={userName} className="w-8 h-8 rounded-full object-cover shadow-sm" />
                                ) : (
                                    <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold shadow-sm group-hover:scale-105 transition-transform">
                                        {userName.split(' ').map(n => n[0]).join('')}
                                    </div>
                                )}
                                <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></div>
                            </div>
                            <div className="hidden md:block">
                                <p className="text-xs font-bold text-slate-700 leading-none mb-1">{userName}</p>
                                <div className="flex items-center gap-1">
                                    <span className="text-[10px] text-slate-400 font-medium">Standard Account</span>
                                    <ChevronDown className="text-slate-300 w-3 h-3" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default TopNav;
