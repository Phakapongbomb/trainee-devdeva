import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Column } from '../types/task';
import type { User } from '../types/user';
import { getInitialUsers, getInitialProjects, getInitialColumns } from './hydration';
import { resetApp } from './actions';

interface MetadataState {
    users: User[];
    projects: string[];
    columns: Column[];
}

const initialState: MetadataState = {
    users: getInitialUsers(),
    projects: getInitialProjects(),
    columns: getInitialColumns(),
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

export const { setUsers, setProjects, setColumns, updateColumn } = metadataSlice.actions;
export default metadataSlice.reducer;
