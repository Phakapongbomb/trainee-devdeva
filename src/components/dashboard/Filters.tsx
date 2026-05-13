import { Search, X, ChevronDown } from 'lucide-react';

interface FiltersProps {
    searchQuery: string;
    setSearchQuery: (val: string) => void;
}

const FilterSelect = ({ options }: { options: string[] }) => (
    <div className="relative min-w-[140px]">
        <select className="w-full bg-white border border-slate-200 text-slate-600 text-sm rounded-lg py-2 pl-3 pr-8 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 appearance-none cursor-pointer">
            {options.map(opt => <option key={opt}>{opt}</option>)}
        </select>
        <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 pointer-events-none" />
    </div>
);

const Filters: React.FC<FiltersProps> = ({ searchQuery, setSearchQuery }) => (
    <div className="flex flex-col lg:flex-row gap-3">
        <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                placeholder="Filter tasks by name or project..."
                type="text"
            />
        </div>
        <div className="flex gap-3 overflow-x-auto pb-1 lg:pb-0 hide-scrollbar">
            <FilterSelect options={['All Priorities', 'High', 'Medium', 'Low']} />
            <FilterSelect options={['Status: All', 'To Do', 'In Progress', 'Done']} />
            <button className="bg-white border border-slate-200 text-slate-400 hover:text-slate-600 hover:bg-slate-50 px-3 py-2 rounded-lg shadow-sm transition-all flex items-center">
                <X className="w-4 h-4" />
            </button>
        </div>
    </div>
);

export default Filters;
