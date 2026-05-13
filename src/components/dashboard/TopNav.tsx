import { Search, Bell, ChevronDown } from 'lucide-react';

interface TopNavProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
}

const TopNav: React.FC<TopNavProps> = ({ searchQuery, setSearchQuery }) => (
    <header className="bg-white border-b border-slate-200 py-3 sticky top-0 z-20 shrink-0">
        <div className="container mx-auto px-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
                <h1 className="text-xl font-bold text-slate-900 tracking-tight">Dashboard</h1>
            </div>
            <div className="flex items-center gap-4">
                <div className="relative hidden sm:block">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <input
                        className="pl-9 pr-4 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 w-64 transition-all"
                        placeholder="Search name, priority, or status..."
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <button className="relative p-2 text-slate-500 hover:text-slate-700 transition-colors rounded-full hover:bg-slate-100">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                </button>
                <div className="flex items-center gap-2 cursor-pointer hover:bg-slate-50 p-1 rounded-lg transition-colors border border-transparent hover:border-slate-200">
                    <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-semibold shadow-sm">AD</div>
                    <ChevronDown className="text-slate-400 w-3 h-3" />
                </div>
            </div>
        </div>
    </header>
);

export default TopNav;
