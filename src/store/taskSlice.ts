import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Task } from '../types/task';
import { getInitialTasks } from './hydration';
import { resetApp } from './actions';

interface TaskState {
    tasks: Task[];
}

const initialState: TaskState = {
    tasks: getInitialTasks(),
};

const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask: (state, action: PayloadAction<Task>) => {
            state.tasks.unshift(action.payload);
        },
        updateTask: (state, action: PayloadAction<Task>) => {
            const index = state.tasks.findIndex(t => t.id === action.payload.id);
            if (index !== -1) {
                state.tasks[index] = action.payload;
            }
        },
        renameProject: (state, action: PayloadAction<{ oldName: string, newName: string }>) => {
            state.tasks.forEach(t => {
                if (t.project === action.payload.oldName) {
                    t.project = action.payload.newName;
                }
            });
        },
        removeProjectFromTasks: (state, action: PayloadAction<string>) => {
            state.tasks.forEach(t => {
                if (t.project === action.payload) {
                    t.project = 'Unassigned';
                }
            });
        },
        renamePriority: (state, action: PayloadAction<{ oldPriority: string, newPriority: string }>) => {
            state.tasks.forEach(t => {
                if (t.priority === action.payload.oldPriority) {
                    t.priority = action.payload.newPriority;
                }
            });
        },
        removePriorityFromTasks: (state, action: PayloadAction<string>) => {
            state.tasks.forEach(t => {
                if (t.priority === action.payload) {
                    t.priority = 'Medium'; // Default back to Medium
                }
            });
        },
        renameStatus: (state, action: PayloadAction<{ oldStatus: string, newStatus: string }>) => {
            state.tasks.forEach(t => {
                if (t.status === action.payload.oldStatus) {
                    t.status = action.payload.newStatus;
                }
            });
        },
        removeStatusFromTasks: (state, action: PayloadAction<string>) => {
            state.tasks.forEach(t => {
                if (t.status === action.payload) {
                    t.status = 'To Do';
                }
            });
        },
        deleteTask: (state, action: PayloadAction<string>) => {
            state.tasks = state.tasks.filter(t => t.id !== action.payload);
        },
    },
    extraReducers: (builder) => {
        builder.addCase(resetApp, () => initialState);
    },
});

export const { 
    addTask, 
    updateTask, 
    deleteTask, 
    renameProject, 
    removeProjectFromTasks,
    renameStatus,
    removeStatusFromTasks,
    renamePriority,
    removePriorityFromTasks
} = taskSlice.actions;
export default taskSlice.reducer;
