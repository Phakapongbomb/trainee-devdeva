import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface FilterState {
    navSearch: string;
    searchQuery: string;
    priorityFilter: string;
    statusFilter: string;
    currentPage: number;
}

const initialState: FilterState = {
    navSearch: '',
    searchQuery: '',
    priorityFilter: 'All Priorities',
    statusFilter: 'Status: All',
    currentPage: 1,
};

export const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setNavSearch: (state, action: PayloadAction<string>) => {
            state.navSearch = action.payload;
        },
        setSearchQuery: (state, action: PayloadAction<string>) => {
            state.searchQuery = action.payload;
            state.currentPage = 1; // Reset to first page on search
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
        resetFilters: (state) => {
            state.searchQuery = '';
            state.priorityFilter = 'All Priorities';
            state.statusFilter = 'Status: All';
            state.currentPage = 1;
        },
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
