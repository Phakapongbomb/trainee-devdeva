import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = () => (
    <div className="flex justify-center items-center gap-2 mt-4">
        <button className="w-9 h-9 flex items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-400 hover:bg-slate-50 disabled:opacity-50 transition-all shadow-sm" disabled>
            <ChevronLeft className="w-4 h-4" />
        </button>
        <button className="w-9 h-9 flex items-center justify-center rounded-xl bg-blue-600 text-white font-bold text-sm shadow-lg shadow-blue-500/20 transition-all hover:scale-105 active:scale-95">
            1
        </button>
        <button className="w-9 h-9 flex items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-400 hover:bg-slate-50 hover:text-slate-600 transition-all shadow-sm">
            <ChevronRight className="w-4 h-4" />
        </button>
    </div>
);

export default Pagination;
