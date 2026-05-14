import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Column, Priority } from '../types/task';
import type { User } from '../types/user';
import { getInitialUsers, getInitialProjects, getInitialColumns, getInitialPriorities } from './hydration';
import { resetApp } from './actions';

export interface MetadataState {
    users: User[];
    projects: string[];
    columns: Column[];
    priorities: Priority[];
}

const initialState: MetadataState = {
    users: getInitialUsers(),
    projects: getInitialProjects(),
    columns: getInitialColumns(),
    priorities: getInitialPriorities(),
};

const metadataSlice = createSlice({
    name: 'metadata',
    initialState,
    reducers: {
        setUsers: (state, action: PayloadAction<User[]>) => {
            state.users = action.payload;
        },
        setProjects: (state, action: PayloadAction<string[]>) => {
            state.projects = action.payload;
        },
        setColumns: (state, action: PayloadAction<Column[]>) => {
            state.columns = action.payload;
        },
        setPriorities: (state, action: PayloadAction<Priority[]>) => {
            state.priorities = action.payload;
        },
        updateColumn: (state, action: PayloadAction<Column>) => {
            const index = state.columns.findIndex(c => c.id === action.payload.id);
            if (index !== -1) {
                state.columns[index] = action.payload;
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(resetApp, () => initialState);
    },
});

export const { setUsers, setProjects, setColumns, setPriorities, updateColumn } = metadataSlice.actions;
export default metadataSlice.reducer;
