import React from 'react';
import { X } from 'lucide-react';
import { Input, Select, type SelectOption } from '../../../components/common';
import { useSelector } from 'react-redux';
import { selectColumns, selectPriorities } from '../../../store/selectors';
import { useMemo } from 'react';

import { FILTER_ALL_PRIORITIES, FILTER_ALL_STATUSES } from '../../../constants/filters';

interface FiltersProps {
    searchQuery: string;
    setSearchQuery: (val: string) => void;
    priorityFilter: string;
    setPriorityFilter: (val: string) => void;
    statusFilter: string;
    setStatusFilter: (val: string) => void;
}



const Filters: React.FC<FiltersProps> = ({
    searchQuery,
    setSearchQuery,
    priorityFilter,
    setPriorityFilter,
    statusFilter,
    setStatusFilter
}) => {
    const columns = useSelector(selectColumns);
    const priorities = useSelector(selectPriorities);

    const dynamicPriorityOptions = useMemo(() => [
        { id: 'all', label: FILTER_ALL_PRIORITIES, value: FILTER_ALL_PRIORITIES },
        ...priorities
    ], [priorities]);

    const dynamicStatusOptions = useMemo(() => [
        { id: 'all', label: FILTER_ALL_STATUSES, value: FILTER_ALL_STATUSES },
        ...columns.map(col => ({
            id: col.id,
            label: col.title,
            value: col.status
        }))
    ], [columns]);

    const handleClearAll = () => {
        setSearchQuery('');
        setPriorityFilter(FILTER_ALL_PRIORITIES);
        setStatusFilter(FILTER_ALL_STATUSES);
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
                        options={dynamicPriorityOptions}
                        value={priorityFilter}
                        onChange={setPriorityFilter}
                        placeholder="Priority"
                    />
                </div>
                <div className="min-w-[160px]">
                    <Select<string>
                        options={dynamicStatusOptions}
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
