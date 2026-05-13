import { MoreHorizontal, Plus } from 'lucide-react';
import type { Task, Column } from '../../types/task';
import TaskCard from './TaskCard';

interface KanbanColumnProps {
    column: Column;
    tasks: Task[];
    onTaskClick: (task: Task) => void;
}

const KanbanColumn: React.FC<KanbanColumnProps> = ({ column, tasks, onTaskClick }) => {
    const themes = {
        slate: "bg-slate-100 text-slate-600 border-slate-200",
        blue: "bg-blue-50 text-blue-700 border-blue-100",
        green: "bg-green-50 text-green-700 border-green-100"
    };

    const dotColors = {
        slate: "bg-slate-400",
        blue: "bg-blue-500",
        green: "bg-green-500"
    };

    return (
        <section className="flex-1 min-w-[320px] max-w-sm flex flex-col gap-4 snap-center h-full">
            <div className={`flex items-center justify-between px-4 py-2.5 rounded-xl border ${themes[column.theme]} shadow-sm`}>
                <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${dotColors[column.theme]}`}></span>
                    <span className="font-bold text-sm tracking-wide uppercase">{column.title}</span>
                    <span className="ml-2 bg-white/50 px-2 py-0.5 rounded-md text-xs font-bold">{tasks.length}</span>
                </div>
                <button className="p-1 hover:bg-black/5 rounded-md transition-colors">
                    <MoreHorizontal className="w-4 h-4" />
                </button>
            </div>

            <div className="flex-1 flex flex-col gap-4 overflow-y-auto pr-1 pb-4 hide-scrollbar min-h-0">
                {tasks.map(task => <TaskCard key={task.id} task={task} onClick={() => onTaskClick(task)} />)}
                <button className="w-full py-3 border-2 border-dashed border-slate-200 rounded-xl text-slate-400 hover:text-slate-500 hover:border-slate-300 hover:bg-slate-50 transition-all flex items-center justify-center gap-2 text-sm font-medium">
                    <Plus className="w-4 h-4" /> Add Task
                </button>
            </div>
        </section>
    );
};

export default KanbanColumn;
