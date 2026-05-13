import type { Task, Column } from '../types/task';

export const INITIAL_TASKS: Task[] = [
    {
        id: '1',
        title: 'Implement Dark Mode',
        project: 'Web App Redesign',
        type: 'Feature',
        priority: 'Medium',
        date: 'Oct 28',
        status: 'To Do',
        progress: 0,
        avatars: ["https://i.pravatar.cc/150?u=1", "https://i.pravatar.cc/150?u=2", "https://i.pravatar.cc/150?u=3"],
        description: "<p>Implement a full dark mode theme across the entire application.</p><ul><li>Define color tokens</li><li>Update UI components</li></ul>"
    },
    {
        id: '2',
        title: 'Implement Compliance',
        project: 'Web App Redesign',
        type: 'Feature',
        priority: 'Low',
        date: 'Oct 28',
        status: 'To Do',
        progress: 0,
        avatars: ["https://i.pravatar.cc/150?u=4", "https://i.pravatar.cc/150?u=5"],
        description: "<p>Ensure all components follow accessibility standards.</p>"
    },
    {
        id: '3',
        title: 'Implement Dark Mode Toggle',
        project: 'Web App Redesign',
        type: 'Feature',
        priority: 'Medium',
        date: 'Oct 28',
        status: 'In Progress',
        progress: 45,
        avatars: ["https://i.pravatar.cc/150?u=7", "https://i.pravatar.cc/150?u=8"],
        description: "<p>Create a switch component to toggle between light and dark modes.</p>"
    },
    {
        id: '4',
        title: 'Implement Dark Mode Litora',
        project: 'Web App Redesign',
        type: 'Feature',
        priority: 'Medium',
        date: 'Oct 28',
        status: 'In Progress',
        progress: 45,
        avatars: ["https://i.pravatar.cc/150?u=10", "https://i.pravatar.cc/150?u=11"],
        description: "<p>Integrate Litora design system with dark mode tokens.</p>"
    },
    {
        id: '5',
        title: 'Promise t:lear determination',
        project: 'Web App Redesign',
        type: 'Feature',
        priority: 'High',
        date: 'Oct 28',
        status: 'Done',
        progress: 100,
        avatars: ["https://i.pravatar.cc/150?u=13", "https://i.pravatar.cc/150?u=14"],
        description: "<p>Final review and determination of project scope.</p>"
    },
    {
        id: '6',
        title: 'Deploy to Production',
        project: 'Web App Redesign',
        type: 'Feature',
        priority: 'High',
        date: 'Oct 28',
        status: 'Done',
        progress: 100,
        avatars: ["https://i.pravatar.cc/150?u=15", "https://i.pravatar.cc/150?u=16"],
        description: "<p>Successful deployment of the redesigned web app.</p>"
    }
];

export const COLUMNS: Column[] = [
    { id: 'todo', title: 'To Do', status: 'To Do', theme: 'slate' },
    { id: 'in-progress', title: 'In Progress', status: 'In Progress', theme: 'blue' },
    { id: 'done', title: 'Done', status: 'Done', theme: 'green' }
];
