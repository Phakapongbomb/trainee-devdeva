import React from 'react';
import {
    X,
    Edit2,
    Calendar,
    CheckCircle2,
    MoreHorizontal,
    Trash2
} from 'lucide-react';
import type { Task } from '../../types/task';
import { priorityConfig } from '../../utils/taskStyles';
import { useTaskContext } from '../../hooks/useTaskContext';

interface ModalDetailTaskProps {
    isOpen: boolean;
    task: Task | null;
    onClose: () => void;
}

const ModalDetailTask: React.FC<ModalDetailTaskProps> = ({ isOpen, task, onClose }) => {
    const { deleteTask, updateTask } = useTaskContext();

    if (!isOpen || !task) return null;

    const config = priorityConfig[task.priority];

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            deleteTask(task.id);
            onClose();
        }
    };

    const handleMarkComplete = () => {
        let nextStatus: Task['status'];
        let nextProgress: number;

        if (task.status === 'To Do') {
            nextStatus = 'In Progress';
            nextProgress = 45;
        } else if (task.status === 'In Progress') {
            nextStatus = 'Done';
            nextProgress = 100;
        } else {
            nextStatus = 'To Do';
            nextProgress = 0;
        }

        updateTask({
            ...task,
            status: nextStatus,
            progress: nextProgress
        });
        onClose();
    };

    // Handle backdrop click
    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
            onClick={handleBackdropClick}
        >
            {/* Modal Container */}
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl flex flex-col max-h-[90vh] overflow-hidden animate-in fade-in zoom-in duration-200">

                {/* Header */}
                <header className="flex items-center justify-between border-b border-gray-100 px-6 py-4 bg-white shrink-0">
                    <div className="flex items-center gap-3">
                        <CheckCircle2 className={`w-5 h-5 ${task.status === 'Done' ? 'text-green-500' : 'text-gray-400'}`} />
                        <h2 className="text-gray-900 text-lg font-bold leading-tight">Task Detail</h2>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={handleDelete}
                            className="flex items-center justify-center rounded-xl h-9 w-9 bg-red-50 hover:bg-red-100 text-red-500 transition-all active:scale-90"
                            title="Delete Task"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                        <button className="flex items-center justify-center rounded-xl h-9 w-9 bg-gray-50 hover:bg-gray-100 text-gray-500 hover:text-blue-600 transition-all active:scale-90">
                            <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                            onClick={onClose}
                            className="flex items-center justify-center rounded-xl h-9 w-9 bg-gray-50 hover:bg-gray-100 text-gray-500 hover:text-red-600 transition-all active:scale-90"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                </header>

                {/* Scrollable Content */}
                <div className="overflow-y-auto flex-1 p-8 space-y-8">
                    <div>
                        <h3 className={`text-gray-900 text-3xl font-extrabold leading-tight tracking-tight mb-4 ${task.status === 'Done' ? 'line-through decoration-gray-300 opacity-60' : ''}`}>
                            {task.title}
                        </h3>

                        {/* Tags */}
                        <div className="flex gap-2.5 flex-wrap">
                            <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold tracking-wide uppercase">
                                {task.project}
                            </span>
                            <span className={`px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase ${config.bg} ${config.text}`}>
                                {task.priority} Priority
                            </span>
                            <span className="px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-bold tracking-wide uppercase">
                                {task.type}
                            </span>
                        </div>
                    </div>

                    {/* Details Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 border-y border-gray-50 py-8">
                        <div className="space-y-2">
                            <p className="text-gray-400 text-[10px] font-bold uppercase tracking-[0.1em]">Due Date</p>
                            <div className="text-gray-900 text-sm font-semibold flex items-center gap-2.5 bg-gray-50/50 w-fit px-3 py-2 rounded-lg">
                                <Calendar className="w-4 h-4 text-gray-400" />
                                {task.date}
                            </div>
                        </div>
                        <div className="space-y-2">
                            <p className="text-gray-400 text-[10px] font-bold uppercase tracking-[0.1em]">Assignees</p>
                            <div className="flex items-center gap-3">
                                <div className="flex -space-x-3">
                                    {task.avatars.map((url, i) => (
                                        <img
                                            key={i}
                                            src={url}
                                            alt="Assignee"
                                            className="h-9 w-9 rounded-full border-2 border-white ring-1 ring-gray-100 object-cover"
                                        />
                                    ))}
                                    {task.avatars.length > 3 && (
                                        <div className="h-9 w-9 rounded-full border-2 border-white bg-gray-50 flex items-center justify-center text-[10px] text-gray-500 font-bold ring-1 ring-gray-100">
                                            +{task.avatars.length - 3}
                                        </div>
                                    )}
                                </div>
                                <button className="text-blue-600 text-xs font-bold hover:underline">Add More</button>
                            </div>
                        </div>
                    </div>

                    {/* Progress */}
                    <div className="space-y-3">
                        <div className="flex justify-between items-end">
                            <h4 className="text-gray-900 text-sm font-bold tracking-tight">Project Progress</h4>
                            <span className="text-blue-600 text-sm font-black">{task.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden p-0.5">
                            <div
                                className="bg-blue-500 h-full rounded-full transition-all duration-700 ease-out shadow-sm"
                                style={{ width: `${task.progress}%` }}
                            ></div>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h4 className="text-gray-900 text-lg font-bold tracking-tight">Task Description</h4>
                            <button className="text-gray-400 hover:text-gray-600"><MoreHorizontal className="w-4 h-4" /></button>
                        </div>
                        <div className="text-gray-600 text-sm leading-relaxed space-y-5 bg-gray-50/30 p-5 rounded-2xl border border-gray-50">
                            <p>We need to implement a full dark mode theme across the entire application to improve accessibility and user comfort in low-light environments.</p>
                            <div className="space-y-3">
                                <p className="font-bold text-gray-800">Key Requirements:</p>
                                <ul className="grid grid-cols-1 gap-2.5">
                                    {[
                                        'Define dark mode color tokens in Tailwind config.',
                                        'Update Top Navigation and Sidebar components.',
                                        'Ensure text contrast meets WCAG AA standards.'
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Actions */}
                <footer className="border-t border-gray-100 p-6 bg-gray-50/50 flex justify-end gap-3 shrink-0">
                    <button
                        onClick={handleMarkComplete}
                        className={`px-8 py-2.5 rounded-xl text-white font-bold text-sm shadow-lg transition-all active:scale-95 ${task.status === 'To Do' ? 'bg-blue-600 hover:bg-blue-700 shadow-blue-500/20' :
                                task.status === 'In Progress' ? 'bg-green-600 hover:bg-green-700 shadow-green-500/20' :
                                    'bg-slate-500 hover:bg-slate-600 shadow-slate-500/20'
                            }`}
                    >
                        {task.status === 'To Do' ? 'Start Progress' :
                            task.status === 'In Progress' ? 'Mark as Done' :
                                'Restart Task'}
                    </button>
                </footer>
            </div>
        </div>
    );
};

export default ModalDetailTask;
