import { createSelector } from '@reduxjs/toolkit';
import { type RootState } from './index';

/**
 * Basic selectors to get raw slices of state
 */
const selectTasks = (state: RootState) => state.tasks.tasks;
const selectFilters = (state: RootState) => state.filters;

/**
 * Memoized selector that returns filtered tasks based on search query, 
 * priority, and status filters.
 * 
 * It re-computes only when either the tasks list or the filter state changes.
 */
export const selectFilteredTasks = createSelector(
    [selectTasks, selectFilters],
    (tasks, filters) => {
        const { navSearch, searchQuery, priorityFilter, statusFilter } = filters;

        return tasks.filter(task => {
            // 1. TopNav "Smart Search" Logic (Title OR Priority OR Status)
            const navLower = navSearch.toLowerCase();
            const matchesNav = !navSearch || 
                task.title.toLowerCase().includes(navLower) ||
                task.priority.toLowerCase().includes(navLower) ||
                task.status.toLowerCase().includes(navLower);

            // 2. Specific Local Filter Search Logic
            const queryLower = searchQuery.toLowerCase();
            const matchesLocalSearch = !searchQuery || 
                task.title.toLowerCase().includes(queryLower) ||
                task.project.toLowerCase().includes(queryLower);

            // 3. Dropdown Filters Logic
            const matchesPriority = priorityFilter === 'All Priorities' || task.priority === priorityFilter;
            const matchesStatus = statusFilter === 'Status: All' || task.status === statusFilter;

            // Combine all with AND logic
            return matchesNav && matchesLocalSearch && matchesPriority && matchesStatus;
        });
    }
);

/**
 * Returns the filter state directly.
 */
export const selectFilterState = (state: RootState) => state.filters;
