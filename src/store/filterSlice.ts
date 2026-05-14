import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { FILTER_ALL_PRIORITIES, FILTER_ALL_STATUSES } from '../constants/filters';
import { resetApp } from './actions';

export interface FilterState {
    navSearch: string;
    searchQuery: string;
    priorityFilter: string;
    statusFilter: string;
    currentPage: number;
}

const initialState: FilterState = {
    navSearch: '',
    searchQuery: '',
    priorityFilter: FILTER_ALL_PRIORITIES,
    statusFilter: FILTER_ALL_STATUSES,
    currentPage: 1,
};

const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setNavSearch: (state, action: PayloadAction<string>) => {
            state.navSearch = action.payload;
            state.currentPage = 1;
        },
        setSearchQuery: (state, action: PayloadAction<string>) => {
            state.searchQuery = action.payload;
            state.currentPage = 1;
        },
        setPriorityFilter: (state, action: PayloadAction<string>) => {
            state.priorityFilter = action.payload;
            state.currentPage = 1;
        },
        setStatusFilter: (state, action: PayloadAction<string>) => {
            state.statusFilter = action.payload;
            state.currentPage = 1;
        },
        setCurrentPage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload;
        },
        resetFilters: () => {
            return initialState;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(resetApp, () => initialState);
    },
});

export const {
    setNavSearch,
    setSearchQuery,
    setPriorityFilter,
    setStatusFilter,
    setCurrentPage,
    resetFilters
} = filterSlice.actions;

export default filterSlice.reducer;
