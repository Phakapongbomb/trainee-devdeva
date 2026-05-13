import React, { useState, useEffect, useRef } from 'react';
import {
    X,
    ChevronDown,
    Plus,
    Calendar
} from 'lucide-react';
import RichTextEditor from '../common/RichTextEditor';
import { MOCK_USERS, MOCK_PROJECTS } from '../../constants/mockData';
import type { Task } from '../../types/task';

interface ModalAddTaskProps {
    isOpen: boolean;
    onClose: () => void;
    onAddTask: (task: Task) => void;
    initialStatus?: Task['status'];
    task?: Task | null; // Add optional task prop for editing
}

const ModalAddTask: React.FC<ModalAddTaskProps> = ({ isOpen, onClose, onAddTask, initialStatus = 'To Do', task }) => {
    const [formData, setFormData] = useState({
        title: task?.title || '',
        project: task?.project || '',
        priority: task?.priority || 'Medium' as Task['priority'],
        type: task?.type || 'Feature',
        status: task?.status || initialStatus,
        date: task?.date || '',
        description: task?.description || ''
    });

    const [selectedUserIds, setSelectedUserIds] = useState<string[]>(() => {
        if (!task) return [];
        return MOCK_USERS
            .filter(u => task.avatars.includes(u.avatar))
            .map(u => u.id);
    });
    const [showUserDropdown, setShowUserDropdown] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);


    // Handle click outside to close dropdown
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowUserDropdown(false);
            }
        };

        if (showUserDropdown) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showUserDropdown]);

    if (!isOpen) return null;

    const toggleUser = (userId: string) => {
        setSelectedUserIds(prev =>
            prev.includes(userId)
                ? prev.filter(id => id !== userId)
                : [...prev, userId]
        );
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.title) return;

        const selectedAvatars = MOCK_USERS
            .filter(u => selectedUserIds.includes(u.id))
            .map(u => u.avatar);

        const updatedTask: Task = {
            id: task ? task.id : Math.random().toString(36).substr(2, 9),
            title: formData.title,
            project: formData.project || 'General',
            type: formData.type,
            priority: formData.priority,
            date: formData.date || 'Today',
            status: formData.status,
            progress: task ? task.progress : 0,
            avatars: selectedAvatars.length > 0 ? selectedAvatars : ["https://i.pravatar.cc/150?u=guest"],
            description: formData.description
        };

        onAddTask(updatedTask);
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
                        <h2 className="text-gray-900 text-xl font-bold leading-tight tracking-tight">
                            {task ? 'Edit Task' : 'Create New Task'}
                        </h2>
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
                                    {MOCK_PROJECTS.map(project => (
                                        <option key={project} value={project}>{project}</option>
                                    ))}
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                            </div>
                        </div>
                        <div className="space-y-1.5 relative" ref={dropdownRef}>
                            <label className="block text-sm font-semibold text-gray-700">Assign To</label>
                            <div className="relative flex items-center group">
                                <div className="absolute left-3 flex -space-x-2 z-10">
                                    {selectedUserIds.slice(0, 3).map(id => {
                                        const user = MOCK_USERS.find(u => u.id === id);
                                        return (
                                            <div key={id} className="w-7 h-7 rounded-full bg-gray-200 border-2 border-white overflow-hidden shadow-sm">
                                                <img
                                                    alt="Avatar"
                                                    className="w-full h-full object-cover"
                                                    src={user?.avatar}
                                                />
                                            </div>
                                        );
                                    })}
                                    {selectedUserIds.length > 3 && (
                                        <div className="w-7 h-7 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-[10px] font-bold text-gray-600 shadow-sm">
                                            +{selectedUserIds.length - 3}
                                        </div>
                                    )}
                                    {selectedUserIds.length === 0 && (
                                        <div className="w-7 h-7 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-gray-400 shadow-sm">
                                            <Plus className="w-3.5 h-3.5" />
                                        </div>
                                    )}
                                </div>
                                <div
                                    onClick={() => setShowUserDropdown(!showUserDropdown)}
                                    className="w-full rounded-xl border border-gray-200 bg-gray-50/50 py-3 pl-14 pr-4 text-gray-900 placeholder-gray-400 focus:border-[#ec5b13] focus:ring-4 focus:ring-[#ec5b13]/10 focus:outline-none transition-all outline-none cursor-pointer min-h-[46px] flex items-center"
                                >
                                    {selectedUserIds.length === 0 ? <span className="text-gray-400 text-sm">Add assignees...</span> : null}
                                </div>
                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                            </div>

                            {/* User Dropdown */}
                            {showUserDropdown && (
                                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-100 rounded-xl shadow-xl z-20 max-h-60 overflow-y-auto p-2 space-y-1 animate-in fade-in slide-in-from-top-2 duration-200">
                                    {MOCK_USERS.map(user => (
                                        <div
                                            key={user.id}
                                            onClick={() => toggleUser(user.id)}
                                            className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-colors ${selectedUserIds.includes(user.id) ? 'bg-orange-50' : 'hover:bg-gray-50'
                                                }`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <img src={user.avatar} alt="" className="w-8 h-8 rounded-full object-cover" />
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-bold text-gray-900">{user.fullName}</span>
                                                    <span className="text-[10px] text-gray-500">@{user.nickname}</span>
                                                </div>
                                            </div>
                                            {selectedUserIds.includes(user.id) && (
                                                <div className="w-4 h-4 rounded-full bg-[#ec5b13] flex items-center justify-center">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Priority, Status & Type Row */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
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
                        <div className="space-y-1.5">
                            <label className="block text-sm font-semibold text-gray-700">Task Type</label>
                            <div className="relative">
                                <select
                                    value={formData.type}
                                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                    className="w-full appearance-none rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 pr-10 text-gray-900 focus:border-[#ec5b13] focus:ring-4 focus:ring-[#ec5b13]/10 focus:outline-none transition-all outline-none cursor-pointer"
                                >
                                    <option value="Feature">Feature</option>
                                    <option value="Bug">Bug</option>
                                    <option value="Design">Design</option>
                                    <option value="Refactor">Refactor</option>
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
                        <RichTextEditor
                            content={formData.description}
                            onChange={(content) => setFormData({ ...formData, description: content })}
                            placeholder="Add more details about this task..."
                        />
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
                        {task ? 'Update Task' : 'Create Task'}
                    </button>
                </footer>
            </form>
        </div>
    );
};

export default ModalAddTask;