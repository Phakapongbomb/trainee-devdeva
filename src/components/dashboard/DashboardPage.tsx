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
import { useTaskContext } from '../../hooks/useTaskContext';

const Dashboard = () => {
    const { tasks, addTask } = useTaskContext();
    const [searchQuery, setSearchQuery] = useState('');
    const [priorityFilter, setPriorityFilter] = useState('All Priorities');
    const [statusFilter, setStatusFilter] = useState('Status: All');
    const [modal, setModal] = useState<{
        type: 'add' | 'detail' | null;
        task: Task | null;
        status?: Task['status'];
    }>({ type: null, task: null });

    const filteredTasks = tasks.filter(task => {
        const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                             task.project.toLowerCase().includes(searchQuery.toLowerCase());
        
        const matchesPriority = priorityFilter === 'All Priorities' || task.priority === priorityFilter;
        
        // Map statusFilter to actual task status values
        const statusMap: Record<string, string> = {
            'To Do': 'To Do',
            'In Progress': 'In Progress',
            'Done': 'Done'
        };
        const actualStatus = statusMap[statusFilter] || null;
        const matchesStatus = statusFilter === 'Status: All' || task.status === actualStatus;

        return matchesSearch && matchesPriority && matchesStatus;
    });

    const handleTaskClick = (task: Task) => {
        setModal({ type: 'detail', task });
    };

    const handleAddTaskClick = (status?: Task['status']) => {
        setModal({ type: 'add', task: null, status });
    };

    const closeModal = () => setModal({ type: null, task: null });

    return (
        <div className="h-full bg-[#f8fafc] font-sans text-slate-800 antialiased flex flex-col">
            <TopNav />
            <div className="flex-1 overflow-hidden flex flex-col">
                <main className="container mx-auto flex-1 overflow-hidden p-4 sm:p-6 flex flex-col gap-6">
                    <Header onNewTask={() => handleAddTaskClick('To Do')} />

                    <Filters
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                        priorityFilter={priorityFilter}
                        setPriorityFilter={setPriorityFilter}
                        statusFilter={statusFilter}
                        setStatusFilter={setStatusFilter}
                    />

                    <div className="flex-1 flex gap-6 overflow-x-auto overflow-y-hidden pb-4 snap-x snap-mandatory hide-scrollbar">
                        {COLUMNS.map(column => (
                            <KanbanColumn
                                key={column.id}
                                column={column}
                                tasks={filteredTasks.filter(t => t.status === column.status)}
                                onTaskClick={handleTaskClick}
                                onAddTask={handleAddTaskClick}
                            />
                        ))}
                    </div>

                    <Pagination />
                </main>

                {/* Modals */}
                <ModalAddTask 
                    key={modal.type === 'add' ? `add-${modal.status}` : 'closed'}
                    isOpen={modal.type === 'add'} 
                    onClose={closeModal} 
                    onAddTask={addTask}
                    initialStatus={modal.status}
                />
                <ModalDetailTask
                    isOpen={modal.type === 'detail'}
                    task={modal.task}
                    onClose={closeModal}
                />
            </div>
        </div>
    );
};

export default Dashboard;