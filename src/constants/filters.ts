export const FILTER_ALL_PRIORITIES = 'All Priorities';
export const FILTER_ALL_STATUSES = 'Status: All';

export const PRIORITY_OPTIONS = [
    FILTER_ALL_PRIORITIES,
    'High',
    'Medium',
    'Low'
];

export const VIEW_MODES = {
    KANBAN: 'Kanban',
    TABLE: 'Table'
} as const;

export type ViewMode = typeof VIEW_MODES[keyof typeof VIEW_MODES];
