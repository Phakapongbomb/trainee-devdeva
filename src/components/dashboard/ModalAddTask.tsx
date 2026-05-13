import React, { useState } from 'react';
import {
    X,
    ChevronDown,
    Plus,
    Calendar,
    Bold,
    Italic,
    List,
    Paperclip
} from 'lucide-react';
import type { Task } from '../../types/task';

interface ModalAddTaskProps {
    isOpen: boolean;
    onClose: () => void;
    onAddTask: (task: Task) => void;
}

const ModalAddTask: React.FC<ModalAddTaskProps> = ({ isOpen, onClose, onAddTask }) => {
    const [formData, setFormData] = useState({
        title: '',
        project: '',
        priority: 'Medium' as Task['priority'],
        status: 'To Do' as Task['status'],
        date: '',
        description: ''
    });

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.title) return;

        const newTask: Task = {
            id: Math.random().toString(36).substr(2, 9),
            title: formData.title,
            project: formData.project || 'General',
            type: 'Feature',
            priority: formData.priority,
            date: formData.date || 'Today',
            status: formData.status,
            progress: 0,
            avatars: ["https://i.pravatar.cc/150?u=new"]
        };

        onAddTask(newTask);
        setFormData({
            title: '',
            project: '',
            priority: 'Medium',
            status: 'To Do',
            date: '',
            description: ''
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
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center overflow-y-auto p-4 sm:p-6"
            onClick={handleBackdropClick}
        >
            {/* Modal Container */}
            <form
                onSubmit={handleSubmit}
                className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl flex flex-col overflow-hidden my-auto animate-in fade-in zoom-in duration-200"
            >

                {/* Header */}
                <header className="flex items-center justify-between border-b border-gray-100 px-6 py-5 bg-white sticky top-0 z-10">
                    <div className="flex items-center gap-3">
                        <div className="w-2 h-6 bg-[#ec5b13] rounded-full"></div>
                        <h2 className="text-gray-900 text-xl font-bold leading-tight tracking-tight">Create New Task</h2>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="flex items-center justify-center rounded-full h-9 w-9 hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-all active:scale-90"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </header>

                {/* Form Content */}
                <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">

                    {/* Task Name */}
                    <div className="space-y-1.5">
                        <label className="block text-sm font-semibold text-gray-700">
                            Task Name <span className="text-[#ec5b13]">*</span>
                        </label>
                        <input
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-[#ec5b13] focus:ring-4 focus:ring-[#ec5b13]/10 focus:outline-none transition-all outline-none"
                            placeholder="e.g., Design new landing page"
                            type="text"
                            required
                        />
                    </div>

                    {/* Project & Assignee Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="space-y-1.5">
                            <label className="block text-sm font-semibold text-gray-700">Project Name</label>
                            <div className="relative">
                                <select
                                    value={formData.project}
                                    onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                                    className="w-full appearance-none rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 pr-10 text-gray-900 focus:border-[#ec5b13] focus:ring-4 focus:ring-[#ec5b13]/10 focus:outline-none transition-all outline-none cursor-pointer"
                                >
                                    <option value="">Select project</option>
                                    <option value="Website Redesign">Website Redesign</option>
                                    <option value="Mobile App V2">Mobile App V2</option>
                                    <option value="Marketing">Marketing Campaign</option>
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                            </div>
                        </div>
                        <div className="space-y-1.5">
                            <label className="block text-sm font-semibold text-gray-700">Assign To</label>
                            <div className="relative flex items-center group">
                                <div className="absolute left-3 flex -space-x-2">
                                    <div className="w-7 h-7 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs font-medium text-gray-600 overflow-hidden shadow-sm">
                                        <img
                                            alt="Avatar"
                                            className="w-full h-full object-cover"
                                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuA5qLL2Xl4RAp_wM8lVjtebDcZ6CCBmKTSnxYr1jEUXc1LSjrAB1QPyGGSk0rbMsbe0Dsb2CbyFVw6ROJGFmQh8c6abkvz4g5BoQsWv7jqEWPLe2Q3-WLzQPzbZyaN7sT1LNAgqC1c_g7VkDxkc0mz6XGjVQJwVk1TqzjaW8S50WIxypPHco_XeOrZNbqvfha-NyKP25n7Y82ygFTnhku2LQwqmZNVcfXI9gmsO-g8XlZVkZqsxoV0gLuRoXqdt9AKxZgjgc_OWNu9-"
                                        />
                                    </div>
                                    <div className="w-7 h-7 rounded-full bg-white border-2 border-gray-100 flex items-center justify-center text-[#ec5b13] shadow-sm">
                                        <Plus className="w-3.5 h-3.5" />
                                    </div>
                                </div>
                                <input
                                    className="w-full rounded-xl border border-gray-200 bg-gray-50/50 py-3 pl-14 pr-4 text-gray-900 placeholder-gray-400 focus:border-[#ec5b13] focus:ring-4 focus:ring-[#ec5b13]/10 focus:outline-none transition-all outline-none cursor-pointer"
                                    placeholder="Add assignees..."
                                    readOnly
                                    type="text"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Priority & Status Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="space-y-1.5">
                            <label className="block text-sm font-semibold text-gray-700">Priority</label>
                            <div className="relative">
                                <select
                                    value={formData.priority}
                                    onChange={(e) => setFormData({ ...formData, priority: e.target.value as Task['priority'] })}
                                    className="w-full appearance-none rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 pr-10 text-gray-900 focus:border-[#ec5b13] focus:ring-4 focus:ring-[#ec5b13]/10 focus:outline-none transition-all outline-none cursor-pointer"
                                >
                                    <option value="Low">Low</option>
                                    <option value="Medium">Medium</option>
                                    <option value="High">High</option>
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                            </div>
                        </div>
                        <div className="space-y-1.5">
                            <label className="block text-sm font-semibold text-gray-700">Status</label>
                            <div className="relative">
                                <select
                                    value={formData.status}
                                    onChange={(e) => setFormData({ ...formData, status: e.target.value as Task['status'] })}
                                    className="w-full appearance-none rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 pr-10 text-gray-900 focus:border-[#ec5b13] focus:ring-4 focus:ring-[#ec5b13]/10 focus:outline-none transition-all outline-none cursor-pointer"
                                >
                                    <option value="To Do">To Do</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Done">Done</option>
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                            </div>
                        </div>
                    </div>

                    {/* Due Date */}
                    <div className="space-y-1.5">
                        <label className="block text-sm font-semibold text-gray-700">Due Date</label>
                        <div className="relative flex items-stretch rounded-xl border border-gray-200 bg-gray-50/50 focus-within:border-[#ec5b13] focus-within:ring-4 focus-within:ring-[#ec5b13]/10 transition-all">
                            <input
                                value={formData.date}
                                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                className="flex-1 appearance-none rounded-l-xl border-0 bg-transparent px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-0"
                                placeholder="Select date (e.g. Oct 24)"
                                type="text"
                            />
                            <div className="flex items-center justify-center px-4 text-gray-400 border-l border-gray-100">
                                <Calendar className="w-5 h-5" />
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="space-y-1.5">
                        <label className="block text-sm font-semibold text-gray-700">Description</label>
                        <div className="rounded-xl border border-gray-200 bg-gray-50/50 overflow-hidden focus-within:border-[#ec5b13] focus-within:ring-4 focus-within:ring-[#ec5b13]/10 transition-all">
                            <textarea
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                className="w-full bg-transparent px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none transition-shadow resize-y min-h-[120px]"
                                placeholder="Add more details about this task..."
                            ></textarea>
                            {/* Formatting Toolbar */}
                            <div className="flex items-center gap-1 p-2 bg-white border-t border-gray-100 text-gray-400">
                                <button className="p-1.5 hover:bg-gray-100 hover:text-gray-600 rounded-lg transition-all" type="button"><Bold className="w-4 h-4" /></button>
                                <button className="p-1.5 hover:bg-gray-100 hover:text-gray-600 rounded-lg transition-all" type="button"><Italic className="w-4 h-4" /></button>
                                <button className="p-1.5 hover:bg-gray-100 hover:text-gray-600 rounded-lg transition-all" type="button"><List className="w-4 h-4" /></button>
                                <div className="w-px h-4 bg-gray-200 mx-1"></div>
                                <button className="p-1.5 hover:bg-gray-100 hover:text-gray-600 rounded-lg transition-all" type="button"><Paperclip className="w-4 h-4" /></button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Actions */}
                <footer className="flex items-center justify-end gap-3 border-t border-gray-100 px-6 py-5 bg-gray-50/50 sticky bottom-0 z-10">
                    <button
                        onClick={onClose}
                        className="px-6 py-2.5 text-sm font-bold text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:text-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-100 transition-all active:scale-95"
                        type="button"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-8 py-2.5 text-sm font-bold text-white bg-[#ec5b13] rounded-xl hover:bg-[#d65211] shadow-lg shadow-[#ec5b13]/20 focus:outline-none focus:ring-4 focus:ring-[#ec5b13]/20 transition-all active:scale-95"
                    >
                        Create Task
                    </button>
                </footer>
            </form>
        </div>
    );
};

export default ModalAddTask;