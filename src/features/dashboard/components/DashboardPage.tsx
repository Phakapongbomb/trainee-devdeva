import { useState } from 'react';
import {
    ModalAddTask,
    ModalDetailTask,
    TopNav,
    Header,
    Filters,
    KanbanTaskLayout,
    Pagination,
    TableTaskLayout
} from '../index';
import { FadeIn } from '../../../components/common';

// --- Data & Types ---
import { useSelector, useDispatch } from 'react-redux';
import type { Task } from '../../../types/task';
import { COLUMNS } from '../../../constants/mockData';
import { addTask, updateTask } from '../../../store/taskSlice';
import {
    setNavSearch,
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
    const { navSearch, searchQuery, priorityFilter, statusFilter, currentPage } = useSelector(selectFilterState);

    const [view, setView] = useState<'kanban' | 'table'>('kanban');

    const [modal, setModal] = useState<{
        type: 'add' | 'detail' | 'edit' | null;
        task: Task | null;
        status?: Task['status'];
    }>({ type: null, task: null });

    const itemsPerPage = 10;

    const totalPages = view === 'kanban'
        ? Math.max(
            ...COLUMNS.map(col => {
                const colTasksCount = filteredTasks.filter(t => t.status === col.status).length;
                return Math.ceil(colTasksCount / itemsPerPage);
            }),
            1
        )
        : Math.ceil(filteredTasks.length / itemsPerPage);

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

    const handleViewChange = (newView: 'kanban' | 'table') => {
        setView(newView);
        dispatch(setCurrentPage(1));
    };

    return (
        <div className="h-full bg-[#f8fafc] font-sans text-slate-800 antialiased flex flex-col">
            <TopNav
                searchQuery={navSearch}
                setSearchQuery={(val) => dispatch(setNavSearch(val))}
            />
            <FadeIn className="flex-1 overflow-hidden flex flex-col">
                <main className="container mx-auto flex-1 overflow-hidden p-4 sm:p-6 flex flex-col gap-6">
                    <Header
                        onNewTask={() => handleAddTaskClick('To Do')}
                        view={view}
                        setView={handleViewChange}
                    />

                    <Filters
                        searchQuery={searchQuery}
                        setSearchQuery={(val) => dispatch(setSearchQuery(val))}
                        priorityFilter={priorityFilter}
                        setPriorityFilter={(val) => dispatch(setPriorityFilter(val))}
                        statusFilter={statusFilter}
                        setStatusFilter={(val) => dispatch(setStatusFilter(val))}
                    />

                    {view === 'kanban' ? (
                        <KanbanTaskLayout
                            tasks={filteredTasks}
                            currentPage={currentPage}
                            itemsPerPage={itemsPerPage}
                            onTaskClick={handleTaskClick}
                            onAddTask={handleAddTaskClick}
                        />
                    ) : (
                        <TableTaskLayout
                            tasks={filteredTasks.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)}
                            onTaskClick={handleTaskClick}
                        />
                    )}

                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </main>

            </FadeIn>

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
    );
};

export default Dashboard;