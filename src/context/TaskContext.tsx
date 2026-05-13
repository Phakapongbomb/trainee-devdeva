import React, { useState, type ReactNode } from 'react';
import { INITIAL_TASKS } from '../constants/mockData';
import type { Task } from '../types/task';
import { TaskContext } from './taskContextInstance';

export const TaskProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);

    const addTask = (task: Task) => {
        setTasks(prev => [task, ...prev]);
    };

    const updateTask = (updatedTask: Task) => {
        setTasks(prev => prev.map(t => t.id === updatedTask.id ? updatedTask : t));
    };

    const deleteTask = (taskId: string) => {
        setTasks(prev => prev.filter(t => t.id !== taskId));
    };

    return (
        <React.Fragment>
            <TaskContext.Provider value={{ tasks, addTask, updateTask, deleteTask }}>
                {children}
            </TaskContext.Provider>
        </React.Fragment>
    );
};
