import { createContext } from 'react';
import type { Task } from '../types/task';

export interface TaskContextType {
    tasks: Task[];
    addTask: (task: Task) => void;
    updateTask: (task: Task) => void;
    deleteTask: (taskId: string) => void;
}

export const TaskContext = createContext<TaskContextType | undefined>(undefined);