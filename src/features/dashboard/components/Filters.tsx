import React from 'react';
import { X } from 'lucide-react';
import { Input, Select, type SelectOption } from '../../../components/common';

interface FiltersProps {
    searchQuery: string;
    setSearchQuery: (val: string) => void;
    priorityFilter: string;
    setPriorityFilter: (val: string) => void;
    statusFilter: string;
    setStatusFilter: (val: string) => void;
}

const priorityOptions: SelectOption<string>[] = [
    { id: 'all', label: 'All Priorities', value: 'All Priorities' },
    { id: 'high', label: 'High', value: 'High' },
    { id: 'medium', label: 'Medium', value: 'Medium' },
    { id: 'low', label: 'Low', value: 'Low' },
];

const statusOptions: SelectOption<string>[] = [
    { id: 'all', label: 'Status: All', value: 'Status: All' },
    { id: 'todo', label: 'To Do', value: 'To Do' },
    { id: 'inprogress', label: 'In Progress', value: 'In Progress' },
    { id: 'done', label: 'Done', value: 'Done' },
];

const Filters: React.FC<FiltersProps> = ({
    searchQuery,
    setSearchQuery,
    priorityFilter,
    setPriorityFilter,
    statusFilter,
    setStatusFilter
}) => {
    const handleClearAll = () => {
        setSearchQuery('');
        setPriorityFilter('All Priorities');
        setStatusFilter('Status: All');
    };

    return (
        <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Input */}
            <div className="flex-1 min-w-0">
                <Input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Filter tasks by name or project..."
                    className="!bg-white !py-2.5 !rounded-lg border-slate-200"
                />
            </div>

            {/* Select Filters */}
            <div className="flex items-center gap-3 pb-1 lg:pb-0 hide-scrollbar">
                <div className="min-w-[160px]">
                    <Select<string>
                        options={priorityOptions}
                        value={priorityFilter}
                        onChange={setPriorityFilter}
                        placeholder="Priority"
                    />
                </div>
                <div className="min-w-[160px]">
                    <Select<string>
                        options={statusOptions}
                        value={statusFilter}
                        onChange={setStatusFilter}
                        placeholder="Status"
                    />
                </div>

                {/* Clear Button */}
                <button
                    onClick={handleClearAll}
                    className="bg-white border border-slate-200 text-slate-400 hover:text-slate-600 hover:bg-slate-50 px-3 h-[46px] rounded-xl shadow-sm transition-all flex items-center shrink-0"
                    title="Clear filters"
                >
                    <X className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
};

export default Filters;
