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
        deleteTask: (state, action: PayloadAction<string>) => {
            state.tasks = state.tasks.filter(t => t.id !== action.payload);
        },
    },
    extraReducers: (builder) => {
        builder.addCase(resetApp, () => initialState);
    },
});

export const { addTask, updateTask, deleteTask } = taskSlice.actions;
export default taskSlice.reducer;
