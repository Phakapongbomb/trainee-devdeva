import React from 'react';
import { KanbanColumn } from '../index';
import { useSelector } from 'react-redux';
import { selectColumns } from '../../../store/selectors';
import type { Task } from '../../../types/task';

interface KanbanTaskLayoutProps {
    tasks: Task[];
    currentPage: number;
    itemsPerPage: number;
    onTaskClick: (task: Task) => void;
    onAddTask: (status?: Task['status']) => void;
}

/**
 * KanbanTaskLayout handles the visual arrangement of tasks in columns.
 * It encapsulates the column mapping and pagination logic for the Kanban view.
 */
const KanbanTaskLayout: React.FC<KanbanTaskLayoutProps> = ({
    tasks,
    currentPage,
    itemsPerPage,
    onTaskClick,
    onAddTask
}) => {
    const columns = useSelector(selectColumns);
    return (
        <div className="flex-1 flex gap-6 overflow-x-auto overflow-y-hidden pb-4 snap-x snap-mandatory hide-scrollbar">
            {columns.map(column => {
                // Filter tasks for this specific column
                const columnTasks = tasks.filter(t => t.status === column.status);

                // Apply pagination for tasks within this column
                const paginatedColumnTasks = columnTasks.slice(
                    (currentPage - 1) * itemsPerPage,
                    currentPage * itemsPerPage
                );

                return (
                    <KanbanColumn
                        key={column.id}
                        column={column}
                        tasks={paginatedColumnTasks}
                        onTaskClick={onTaskClick}
                        onAddTask={onAddTask}
                    />
                );
            })}
        </div>
    );
};

export default KanbanTaskLayout;
