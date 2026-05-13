import { Plus } from 'lucide-react';

interface HeaderProps {
    onNewTask: () => void;
}

const Header: React.FC<HeaderProps> = ({ onNewTask }) => (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold text-slate-900">Project Overview</h2>
        <button
            onClick={onNewTask}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-sm transition-all flex items-center gap-2 active:scale-95"
        >
            <Plus className="w-4 h-4" /> New Task
        </button>
    </div>
);

export default Header;
