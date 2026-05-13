import { useState } from 'react';
import ModalAddTask from './ModalAddTask';
import ModalDetailTask from './ModalDetailTask';

// --- Modular Components ---
import TopNav from './TopNav';
import Header from './Header';
import Filters from './Filters';
import KanbanColumn from './KanbanColumn';
import Pagination from './Pagination';

// --- Data & Types ---
import type { Task } from '../../types/task';
import { COLUMNS } from '../../constants/mockData';
import { useSelector, useDispatch } from 'react-redux';
import { type RootState } from '../../store';
import { addTask, updateTask } from '../../store/taskSlice';

const Dashboard = () => {
    const tasks = useSelector((state: RootState) => state.tasks.tasks);
    const dispatch = useDispatch();

    // Search states
    const [globalSearchQuery, setGlobalSearchQuery] = useState('');
    const [localSearchQuery, setLocalSearchQuery] = useState('');

    // Filter states
    const [priorityFilter, setPriorityFilter] = useState('All Priorities');
    const [statusFilter, setStatusFilter] = useState('Status: All');

    const [modal, setModal] = useState<{
        type: 'add' | 'detail' | 'edit' | null;
        task: Task | null;
        status?: Task['status'];
    }>({ type: null, task: null });

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Helper to reset page when filters change
    const handleFilterChange = <T,>(setter: (val: T) => void) => (val: T) => {
        setter(val);
        setCurrentPage(1);
    };

    const filteredTasks = tasks.filter(task => {
        // 1. Global Search (TopNav) - title, priority, status
        const gQuery = globalSearchQuery.toLowerCase();
        const matchesGlobal = !gQuery ||
            task.title.toLowerCase().includes(gQuery) ||
            task.priority.toLowerCase().includes(gQuery) ||
            task.status.toLowerCase().includes(gQuery);

        // 2. Local Search (Filters) - title, project
        const lQuery = localSearchQuery.toLowerCase();
        const matchesLocal = !lQuery ||
            task.title.toLowerCase().includes(lQuery) ||
            task.project.toLowerCase().includes(lQuery);

        // 3. Priority Filter
        const matchesPriority = priorityFilter === 'All Priorities' || task.priority === priorityFilter;

        // 4. Status Filter
        const statusMap: Record<string, string> = {
            'To Do': 'To Do',
            'In Progress': 'In Progress',
            'Done': 'Done'
        };
        const actualStatus = statusMap[statusFilter] || null;
        const matchesStatus = statusFilter === 'Status: All' || task.status === actualStatus;

        return matchesGlobal && matchesLocal && matchesPriority && matchesStatus;
    });

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
        setCurrentPage(page);
    };

    return (
        <div className="h-full bg-[#f8fafc] font-sans text-slate-800 antialiased flex flex-col">
            <TopNav
                searchQuery={globalSearchQuery}
                setSearchQuery={handleFilterChange(setGlobalSearchQuery)}
            />
            <div className="flex-1 overflow-hidden flex flex-col">
                <main className="container mx-auto flex-1 overflow-hidden p-4 sm:p-6 flex flex-col gap-6">
                    <Header onNewTask={() => handleAddTaskClick('To Do')} />

                    <Filters
                        searchQuery={localSearchQuery}
                        setSearchQuery={handleFilterChange(setLocalSearchQuery)}
                        priorityFilter={priorityFilter}
                        setPriorityFilter={handleFilterChange(setPriorityFilter)}
                        statusFilter={statusFilter}
                        setStatusFilter={handleFilterChange(setStatusFilter)}
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