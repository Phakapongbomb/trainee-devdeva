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
 * Performance Optimization (Rule 5): 
 * Pre-calculating lower-case versions of search strings OUTSIDE the filter loop
 * to prevent O(N) redundant string operations.
 */
export const selectFilteredTasks = createSelector(
    [selectTasks, selectFilters],
    (tasks, filters) => {
        const { navSearch, searchQuery, priorityFilter, statusFilter } = filters;

        // 1. Pre-calculate lower-case search strings ONCE before filtering
        const navLower = navSearch.toLowerCase();
        const queryLower = searchQuery.toLowerCase();

        return tasks.filter(task => {
            // 2. Use pre-calculated strings for the "Smart Search" (TopNav)
            const matchesNav = !navSearch || 
                task.title.toLowerCase().includes(navLower) ||
                task.priority.toLowerCase().includes(navLower) ||
                task.status.toLowerCase().includes(navLower);

            // 3. Use pre-calculated strings for the specific Local Search (Filters)
            const matchesLocalSearch = !searchQuery || 
                task.title.toLowerCase().includes(queryLower) ||
                task.project.toLowerCase().includes(queryLower);

            // 4. Standard Dropdown Filters
            const matchesPriority = priorityFilter === 'All Priorities' || task.priority === priorityFilter;
            const matchesStatus = statusFilter === 'Status: All' || task.status === statusFilter;

            return matchesNav && matchesLocalSearch && matchesPriority && matchesStatus;
        });
    }
);

/**
 * Returns the filter state directly.
 */
export const selectFilterState = (state: RootState) => state.filters;
