import { useState } from 'react';
import {
    ModalAddTask,
    ModalDetailTask,
    TopNav,
    Header,
    Filters,
    KanbanColumn,
    Pagination
} from './';

// --- Data & Types ---
import { useSelector, useDispatch } from 'react-redux';
import type { Task } from '../../../types/task';
import { COLUMNS } from '../../../constants/mockData';
import { addTask, updateTask } from '../../../store/taskSlice';
import {
    setSearchQuery,
    setPriorityFilter,
    setStatusFilter,
    setCurrentPage
} from '../../../store/filterSlice';
import { selectFilteredTasks, selectFilterState } from '../../../store/selectors';

const Dashboard = () => {
    const dispatch = useDispatch();

    // Get tasks and filters from Redux
    const filteredTasks = useSelector(selectFilteredTasks);
    const { searchQuery, priorityFilter, statusFilter, currentPage } = useSelector(selectFilterState);

    const [modal, setModal] = useState<{
        type: 'add' | 'detail' | 'edit' | null;
        task: Task | null;
        status?: Task['status'];
    }>({ type: null, task: null });

    const itemsPerPage = 10;

    const totalPages = Math.max(
        ...COLUMNS.map(col => {
            const colTasksCount = filteredTasks.filter(t => t.status === col.status).length;
            return Math.ceil(colTasksCount / itemsPerPage);
        }),
        1
    );

    const handleTaskClick = (task: Task) => {
        setModal({ type: 'detail', task });
    };

    const handleAddTaskClick = (status?: Task['status']) => {
        setModal({ type: 'add', task: null, status });
    };

    const handleEditTaskClick = (task: Task) => {
        setModal({ type: 'edit', task });
    };

    const closeModal = () => setModal({ type: null, task: null });

    const handlePageChange = (page: number) => {
        dispatch(setCurrentPage(page));
    };

    return (
        <div className="h-full bg-[#f8fafc] font-sans text-slate-800 antialiased flex flex-col">
            <TopNav
                searchQuery={searchQuery}
                setSearchQuery={(val) => dispatch(setSearchQuery(val))}
            />
            <div className="flex-1 overflow-hidden flex flex-col">
                <main className="container mx-auto flex-1 overflow-hidden p-4 sm:p-6 flex flex-col gap-6">
                    <Header onNewTask={() => handleAddTaskClick('To Do')} />

                    <Filters
                        searchQuery={searchQuery}
                        setSearchQuery={(val) => dispatch(setSearchQuery(val))}
                        priorityFilter={priorityFilter}
                        setPriorityFilter={(val) => dispatch(setPriorityFilter(val))}
                        statusFilter={statusFilter}
                        setStatusFilter={(val) => dispatch(setStatusFilter(val))}
                    />

                    <div className="flex-1 flex gap-6 overflow-x-auto overflow-y-hidden pb-4 snap-x snap-mandatory hide-scrollbar">
                        {COLUMNS.map(column => {
                            const columnTasks = filteredTasks.filter(t => t.status === column.status);
                            const paginatedColumnTasks = columnTasks.slice(
                                (currentPage - 1) * itemsPerPage,
                                currentPage * itemsPerPage
                            );

                            return (
                                <KanbanColumn
                                    key={column.id}
                                    column={column}
                                    tasks={paginatedColumnTasks}
                                    onTaskClick={handleTaskClick}
                                    onAddTask={handleAddTaskClick}
                                />
                            );
                        })}
                    </div>

                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </main>

                {/* Modals */}
                <ModalAddTask
                    key={modal.type === 'edit' ? `edit-${modal.task?.id}` : (modal.type === 'add' ? `add-${modal.status}` : 'closed')}
                    isOpen={modal.type === 'add' || modal.type === 'edit'}
                    onClose={closeModal}
                    onAddTask={(task) => {
                        if (modal.type === 'edit') {
                            dispatch(updateTask(task));
                        } else {
                            dispatch(addTask(task));
                        }
                    }}
                    task={modal.type === 'edit' ? modal.task : null}
                    initialStatus={modal.status}
                />
                <ModalDetailTask
                    isOpen={modal.type === 'detail'}
                    task={modal.task}
                    onClose={closeModal}
                    onEdit={handleEditTaskClick}
                />
            </div>
        </div>
    );
};

export default Dashboard;