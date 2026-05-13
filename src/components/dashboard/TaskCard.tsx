import { Calendar, MoreHorizontal } from 'lucide-react';
import type { Task } from '../../types/task';
import { priorityConfig } from '../../utils/taskStyles';

interface TaskCardProps {
    task: Task;
    onClick: () => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onClick }) => {
    const config = priorityConfig[task.priority];
    const isDone = task.status === 'Done';
    const PriorityIcon = config.icon;

    return (
        <article
            onClick={onClick}
            className={`group bg-white p-4 pb-5 rounded-2xl shadow-sm border border-slate-200 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 cursor-pointer flex flex-col gap-4 relative overflow-hidden shrink-0 ${isDone ? 'opacity-80' : ''}`}
        >
            {isDone && <div className="absolute top-0 left-0 w-1 h-full bg-green-500" />}
            {task.status === 'In Progress' && <div className="absolute top-0 left-0 w-1 h-full bg-blue-500" />}

            <div className="flex justify-between items-start">
                <div>
                    <h3 className={`font-bold text-slate-900 group-hover:text-blue-600 transition-colors ${isDone ? 'line-through decoration-slate-300' : ''}`}>
                        {task.title}
                    </h3>
                    <p className="text-xs font-medium text-slate-400 mt-0.5">{task.project}</p>
                </div>
                <button className="text-slate-300 hover:text-slate-500 transition-colors">
                    <MoreHorizontal className="w-4 h-4" />
                </button>
            </div>

            <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-500">
                    {task.type}
                </span>
                <span className={`flex items-center gap-1.5 px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${config.bg} ${config.text}`}>
                    <PriorityIcon className="w-3 h-3" /> {task.priority}
                </span>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-50">
                <div className="flex items-center gap-3 text-xs text-slate-400 font-medium">
                    <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {task.date}</span>
                </div>
                <div className="flex -space-x-2">
                    {task.avatars.map((url, i) => (
                        <img
                            key={i}
                            src={url}
                            alt="Team"
                            className="w-7 h-7 rounded-full border-2 border-white ring-1 ring-slate-100 object-cover"
                        />
                    ))}
                </div>
            </div>

            {task.progress > 0 && (
                <div className="space-y-2">
                    <div className="flex justify-between text-[10px] font-bold uppercase text-slate-400">
                        <span>Progress</span>
                        <span>{task.progress}%</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                        <div
                            className={`h-full rounded-full transition-all duration-500 ${isDone ? 'bg-green-500' : 'bg-blue-500'}`}
                            style={{ width: `${task.progress}%` }}
                        />
                    </div>
                </div>
            )}
        </article>
    );
};

export default TaskCard;
