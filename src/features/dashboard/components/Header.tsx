import { Plus, LayoutGrid, List } from 'lucide-react';

interface HeaderProps {
    onNewTask: () => void;
    view: 'kanban' | 'table';
    setView: (view: 'kanban' | 'table') => void;
}

const Header: React.FC<HeaderProps> = ({ onNewTask, view, setView }) => (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold text-slate-900">Project Overview</h2>
        
        <div className="flex items-center gap-3">
            <div className="flex items-center bg-slate-200/50 p-1 rounded-xl w-fit">
                <button 
                    onClick={() => setView('kanban')}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${view === 'kanban' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                >
                    <LayoutGrid className="w-3.5 h-3.5" /> Kanban
                </button>
                <button 
                    onClick={() => setView('table')}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${view === 'table' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                >
                    <List className="w-3.5 h-3.5" /> Table
                </button>
            </div>

            <button
                onClick={onNewTask}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-sm transition-all flex items-center gap-2 active:scale-95 whitespace-nowrap"
            >
                <Plus className="w-4 h-4" /> New Task
            </button>
        </div>
    </div>
);

export default Header;
