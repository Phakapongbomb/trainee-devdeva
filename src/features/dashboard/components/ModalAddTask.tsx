import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Calendar, RichTextEditor, Input, Select, type SelectOption } from '../../../components/common';
import { MOCK_USERS, MOCK_PROJECTS } from '../../../constants/mockData';
import type { Task } from '../../../types/task';
import { useDispatch } from 'react-redux';
import { addTask, updateTask } from '../../../store/taskSlice';
import { parseSafeDate, formatDateDisplay } from '../../../utils/dateUtils';
import { PRIORITY_THEME, STATUS_THEME } from '../../../constants/theme';

interface ModalAddTaskProps {
    isOpen: boolean;
    onClose: () => void;
    onAddTask: (task: Task) => void;
    initialStatus?: Task['status'];
    task?: Task | null;
}

type TaskFormData = Omit<Task, 'id' | 'progress' | 'assignees' | 'avatars' | 'date'> & {
    assigneeIds: string[];
    date: string | Date;
    description: string;
};

const ModalAddTask: React.FC<ModalAddTaskProps> = ({ isOpen, onClose, task, initialStatus = 'To Do' }) => {
    const dispatch = useDispatch();

    const [formData, setFormData] = useState<TaskFormData>({
        title: task?.title || '',
        project: task?.project || '',
        priority: task?.priority || 'Medium',
        type: task?.type || 'Feature',
        status: task?.status || initialStatus,
        assigneeIds: task?.assignees?.map(u => u.id) || [],
        date: parseSafeDate(task?.date || '') || '',
        description: task?.description || ''
    });

    const [errors, setErrors] = useState<Partial<Record<keyof TaskFormData, string>>>({});

    const validate = () => {
        const newErrors: Partial<Record<keyof TaskFormData, string>> = {};
        if (!formData.title.trim()) newErrors.title = 'Task name is required';
        if (!formData.project) newErrors.project = 'Project is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        // Map IDs back to full User objects and Avatar strings
        const selectedUsers = MOCK_USERS.filter(u => formData.assigneeIds.includes(u.id));
        const selectedAvatars = selectedUsers.map(u => u.avatar);

        const newTask: Task = {
            id: task?.id || Math.floor(Math.random() * 10000).toString(),
            title: formData.title,
            project: formData.project,
            priority: formData.priority,
            type: formData.type,
            status: formData.status,
            description: formData.description,
            assignees: selectedUsers,
            avatars: selectedAvatars.length > 0 ? selectedAvatars : ["https://i.pravatar.cc/150?u=guest"],
            progress: task?.progress || 0,
            date: formatDateDisplay(formData.date)
        };

        if (task) {
            dispatch(updateTask(newTask));
        } else {
            dispatch(addTask(newTask));
        }
        onClose();
    };

    const projectOptions: SelectOption<string>[] = MOCK_PROJECTS.map(p => ({
        id: p,
        label: p,
        value: p
    }));

    const assigneeOptions: SelectOption<string>[] = MOCK_USERS.map(u => ({
        id: u.id,
        label: u.fullName,
        subLabel: `@${u.nickname}`,
        value: u.id,
        image: u.avatar
    }));

    const priorityOptions: SelectOption<Task['priority']>[] = Object.keys(PRIORITY_THEME).map(key => ({
        id: key,
        label: key,
        value: key as Task['priority']
    }));

    const statusOptions: SelectOption<Task['status']>[] = Object.keys(STATUS_THEME).map(key => ({
        id: key,
        label: key,
        value: key as Task['status']
    }));

    const typeOptions: SelectOption<Task['type']>[] = [
        { id: 'Feature', label: 'Feature', value: 'Feature' },
        { id: 'Bug', label: 'Bug', value: 'Bug' },
        { id: 'Design', label: 'Design', value: 'Design' },
        { id: 'Refactor', label: 'Refactor', value: 'Refactor' }
    ];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" onClick={onClose} />

            <form
                onSubmit={handleSubmit}
                className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden animate-in fade-in zoom-in duration-300"
            >
                {/* Header */}
                <header className="flex items-center justify-between px-6 py-5 border-b border-gray-100 sticky top-0 bg-white z-10">
                    <div className="flex items-center gap-3">
                        <div className="w-2 h-6 bg-blue-600 rounded-full" />
                        <h2 className="text-xl font-bold text-gray-900">
                            {task ? 'Edit Task' : 'Create New Task'}
                        </h2>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </header>

                {/* Content */}
                <div className="flex-1 overflow-y-auto px-6 pt-6 pb-32 space-y-6">
                    <Input
                        label="Task Name"
                        required
                        placeholder="e.g., Design new landing page"
                        value={formData.title}
                        onChange={(e) => {
                            setFormData({ ...formData, title: e.target.value });
                            if (errors.title) setErrors({ ...errors, title: '' });
                        }}
                        error={errors.title}
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <Select<string>
                            label="Project Name"
                            options={projectOptions}
                            value={formData.project}
                            onChange={(val) => {
                                setFormData({ ...formData, project: val });
                                if (errors.project) setErrors({ ...errors, project: '' });
                            }}
                            placeholder="Select project"
                            required
                            error={errors.project}
                        />
                        <Select<string>
                            label="Assign To"
                            options={assigneeOptions}
                            value={formData.assigneeIds}
                            onChange={(val) => setFormData({ ...formData, assigneeIds: val })}
                            multiple
                            showAvatars
                            placeholder="Add assignees..."
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <Select<Task['priority']>
                            label="Priority"
                            options={priorityOptions}
                            value={formData.priority}
                            onChange={(val) => setFormData({ ...formData, priority: val })}
                        />
                        <Select<Task['status']>
                            label="Status"
                            options={statusOptions}
                            value={formData.status}
                            onChange={(val) => setFormData({ ...formData, status: val })}
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <Calendar
                            label="Due Date"
                            selectedDate={formData.date instanceof Date ? formData.date : null}
                            onChange={(date) => setFormData({ ...formData, date: date || '' })}
                        />
                        <Select
                            label="Task Type"
                            options={typeOptions}
                            value={formData.type}
                            onChange={(val) => setFormData({ ...formData, type: val })}
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label className="block text-sm font-semibold text-gray-700">Description</label>
                        <RichTextEditor
                            content={formData.description}
                            onChange={(content) => setFormData({ ...formData, description: content })}
                            placeholder="Add more details about this task..."
                        />
                    </div>
                </div>

                {/* Footer */}
                <footer className="flex items-center justify-end gap-3 border-t border-gray-100 px-6 py-5 bg-gray-50/50 sticky bottom-0 z-10">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-6 py-2.5 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-100 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-8 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-200 transition-all active:scale-95"
                    >
                        {task ? 'Update Task' : 'Create Task'}
                    </button>
                </footer>
            </form>
        </div>
    );
};

export default ModalAddTask;