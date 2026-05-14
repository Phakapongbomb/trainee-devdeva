import React from 'react';
import { Calendar, List } from 'lucide-react';
import type { Task } from '../../../types/task';
import { PRIORITY_THEME, STATUS_THEME } from '../../../constants/theme';

interface TableTaskLayoutProps {
    tasks: Task[];
    onTaskClick: (task: Task) => void;
}

const TableTaskLayout: React.FC<TableTaskLayoutProps> = ({
    tasks,
    onTaskClick
}) => {
    return (
        <div className="flex-1 overflow-auto bg-white border border-slate-200 rounded-xl shadow-sm">
            <table className="w-full text-left border-collapse min-w-[900px]">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 text-xs uppercase tracking-wider sticky top-0 z-10">
                    <tr>
                        <th className="py-4 px-6 font-semibold">Task Name</th>
                        <th className="py-4 px-6 font-semibold">Project</th>
                        <th className="py-4 px-6 font-semibold">Priority</th>
                        <th className="py-4 px-6 font-semibold">Status</th>
                        <th className="py-4 px-6 font-semibold">Due Date</th>
                        <th className="py-4 px-6 font-semibold min-w-[140px]">Progress</th>
                        <th className="py-4 px-6 font-semibold text-right">Assignees</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                    {tasks.map((task) => {
                        const priorityConfig = PRIORITY_THEME[task.priority as keyof typeof PRIORITY_THEME] || PRIORITY_THEME.Medium;
                        const statusConfig = STATUS_THEME[task.status as keyof typeof STATUS_THEME] || STATUS_THEME['To Do'];
                        const isDone = task.status === 'Done';

                        return (
                            <tr
                                key={task.id}
                                onClick={() => onTaskClick(task)}
                                className={`hover:bg-slate-50 transition-colors group cursor-pointer ${isDone ? 'opacity-70' : ''}`}
                            >
                                <td className="py-4 px-6">
                                    <span className={`font-bold text-slate-900 group-hover:text-blue-600 transition-colors ${isDone ? 'line-through decoration-slate-400' : ''}`}>
                                        {task.title}
                                    </span>
                                </td>
                                <td className="py-4 px-6 text-slate-500">
                                    {typeof task.project === 'object' ? (task.project as any).name : task.project}
                                </td>
                                <td className="py-4 px-6">
                                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${priorityConfig.bg} ${priorityConfig.text}`}>
                                        <priorityConfig.icon className="w-3 h-3" />
                                        {task.priority}
                                    </span>
                                </td>
                                <td className="py-4 px-6">
                                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${statusConfig.bg} ${statusConfig.text} border ${statusConfig.border}`}>
                                        <span className={`w-1.5 h-1.5 rounded-full ${statusConfig.dot}`} />
                                        {task.status}
                                    </span>
                                </td>
                                <td className="py-4 px-6 text-slate-500 whitespace-nowrap font-medium">
                                    <div className="flex items-center gap-1.5">
                                        <Calendar className="w-3.5 h-3.5" />
                                        {task.date}
                                    </div>
                                </td>
                                <td className="py-4 px-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-full bg-slate-100 rounded-full h-1.5 flex-1 overflow-hidden">
                                            <div
                                                className={`h-1.5 rounded-full transition-all duration-500 ${isDone ? 'bg-green-500' : 'bg-blue-600'}`}
                                                style={{ width: `${task.progress}%` }}
                                            />
                                        </div>
                                        <span className="text-[10px] font-bold text-slate-400 w-8 text-right">{task.progress}%</span>
                                    </div>
                                </td>
                                <td className="py-4 px-6">
                                    <div className="flex justify-end -space-x-2">
                                        {task.avatars.map((avatar, idx) => (
                                            <img
                                                key={idx}
                                                alt="Avatar"
                                                className="w-7 h-7 rounded-full border-2 border-white ring-1 ring-slate-100 object-cover"
                                                src={avatar}
                                            />
                                        ))}
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            {tasks.length === 0 && (
                <div className="py-12 flex flex-col items-center justify-center text-slate-400">
                    <List className="w-12 h-12 mb-2 opacity-20" />
                    <p>No tasks found matching your filters</p>
                </div>
            )}
        </div>
    );
};

export default TableTaskLayout;
