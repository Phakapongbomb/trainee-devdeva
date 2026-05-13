import { AlertCircle, Clock, CheckCircle2 } from 'lucide-react';

export type Priority = 'High' | 'Medium' | 'Low';

/**
 * Design tokens and configurations for task priorities.
 * Includes background, text, border colors, icons, and labels.
 */
export const PRIORITY_THEME = {
    High: {
        bg: 'bg-red-50',
        text: 'text-red-700',
        border: 'border-red-100',
        icon: AlertCircle,
        label: 'High Priority'
    },
    Medium: {
        bg: 'bg-orange-50',
        text: 'text-orange-700',
        border: 'border-orange-100',
        icon: Clock,
        label: 'Medium Priority'
    },
    Low: {
        bg: 'bg-green-50',
        text: 'text-green-700',
        border: 'border-green-100',
        icon: CheckCircle2,
        label: 'Low Priority'
    }
} as const;

/**
 * Design tokens and configurations for task statuses.
 * Defines visual styles for various task states in the Kanban board.
 */
export const STATUS_THEME = {
    'To Do': {
        color: 'slate',
        dot: 'bg-slate-400',
        bg: 'bg-slate-100',
        text: 'text-slate-600',
        border: 'border-slate-200'
    },
    'In Progress': {
        color: 'blue',
        dot: 'bg-blue-500',
        bg: 'bg-blue-50',
        text: 'text-blue-700',
        border: 'border-blue-100'
    },
    'Done': {
        color: 'green',
        dot: 'bg-green-500',
        bg: 'bg-green-50',
        text: 'text-green-700',
        border: 'border-green-100'
    }
} as const;
