import type { Task, Column, User } from '../types/task';

export const MOCK_USERS: User[] = [
    { id: '1', fullName: 'Alexander Thompson', nickname: 'Alex', avatar: 'https://i.pravatar.cc/150?u=1' },
    { id: '2', fullName: 'Brittany Watkins', nickname: 'Brit', avatar: 'https://i.pravatar.cc/150?u=2' },
    { id: '3', fullName: 'Christopher Miller', nickname: 'Chris', avatar: 'https://i.pravatar.cc/150?u=3' },
    { id: '4', fullName: 'Danielle Cooper', nickname: 'Dani', avatar: 'https://i.pravatar.cc/150?u=4' },
    { id: '5', fullName: 'Ethan Sullivan', nickname: 'Ethan', avatar: 'https://i.pravatar.cc/150?u=5' },
    { id: '6', fullName: 'Fiona Gallagher', nickname: 'Fi', avatar: 'https://i.pravatar.cc/150?u=6' },
    { id: '7', fullName: 'George Harrison', nickname: 'Geo', avatar: 'https://i.pravatar.cc/150?u=7' },
    { id: '8', fullName: 'Hannah Abbott', nickname: 'Han', avatar: 'https://i.pravatar.cc/150?u=8' },
    { id: '9', fullName: 'Isaac Newton', nickname: 'Isaac', avatar: 'https://i.pravatar.cc/150?u=9' },
    { id: '10', fullName: 'Jessica Jones', nickname: 'Jess', avatar: 'https://i.pravatar.cc/150?u=10' },
    { id: '11', fullName: 'Kevin Parker', nickname: 'Kevin', avatar: 'https://i.pravatar.cc/150?u=11' },
    { id: '12', fullName: 'Laura Palmer', nickname: 'Laura', avatar: 'https://i.pravatar.cc/150?u=12' },
    { id: '13', fullName: 'Michael Scott', nickname: 'Mike', avatar: 'https://i.pravatar.cc/150?u=13' },
    { id: '14', fullName: 'Natalie Portman', nickname: 'Nat', avatar: 'https://i.pravatar.cc/150?u=14' },
    { id: '15', fullName: 'Oscar Martinez', nickname: 'Oscar', avatar: 'https://i.pravatar.cc/150?u=15' },
    { id: '16', fullName: 'Pam Beesly', nickname: 'Pam', avatar: 'https://i.pravatar.cc/150?u=16' },
    { id: '17', fullName: 'Quinn Fabray', nickname: 'Quinn', avatar: 'https://i.pravatar.cc/150?u=17' },
    { id: '18', fullName: 'Ryan Howard', nickname: 'Ryan', avatar: 'https://i.pravatar.cc/150?u=18' },
    { id: '19', fullName: 'Sarah Connor', nickname: 'Sarah', avatar: 'https://i.pravatar.cc/150?u=19' },
    { id: '20', fullName: 'Tony Stark', nickname: 'Tony', avatar: 'https://i.pravatar.cc/150?u=20' },
    { id: '21', fullName: 'Ursula Buffay', nickname: 'Urs', avatar: 'https://i.pravatar.cc/150?u=21' },
    { id: '22', fullName: 'Victor Stone', nickname: 'Vic', avatar: 'https://i.pravatar.cc/150?u=22' },
    { id: '23', fullName: 'Wanda Maximoff', nickname: 'Wanda', avatar: 'https://i.pravatar.cc/150?u=23' },
    { id: '24', fullName: 'Xavier Woods', nickname: 'X', avatar: 'https://i.pravatar.cc/150?u=24' },
    { id: '25', fullName: 'Yara Greyjoy', nickname: 'Yara', avatar: 'https://i.pravatar.cc/150?u=25' },
    { id: '26', fullName: 'Zack Morris', nickname: 'Zack', avatar: 'https://i.pravatar.cc/150?u=26' },
    { id: '27', fullName: 'Amy Pond', nickname: 'Amy', avatar: 'https://i.pravatar.cc/150?u=27' },
    { id: '28', fullName: 'Ben Solo', nickname: 'Ben', avatar: 'https://i.pravatar.cc/150?u=28' },
    { id: '29', fullName: 'Clara Oswald', nickname: 'Clara', avatar: 'https://i.pravatar.cc/150?u=29' },
    { id: '30', fullName: 'David Rose', nickname: 'David', avatar: 'https://i.pravatar.cc/150?u=30' },
];

export const MOCK_PROJECTS = [
    'Web App Redesign',
    'Mobile Banking App',
    'AI Integration',
    'Marketing Campaign',
    'Cloud Migration',
    'Security Audit',
    'Customer Portal',
    'E-commerce Launch',
    'Data Analytics',
    'Internal Tooling'
];

export const INITIAL_TASKS: Task[] = Array.from({ length: 30 }, (_, i) => {
    const id = (i + 1).toString();
    const priorities: Task['priority'][] = ['High', 'Medium', 'Low'];
    const types = ['Feature', 'Bug', 'Design', 'Refactor'];
    
    let status: Task['status'] = 'To Do';
    if (i >= 15 && i < 23) status = 'In Progress';
    if (i >= 23) status = 'Done';

    // Assign 1-3 users from MOCK_USERS
    const userCount = (i % 3) + 1;
    const taskUsers = Array.from({ length: userCount }, (_, j) => MOCK_USERS[(i + j) % MOCK_USERS.length]);
    const avatars = taskUsers.map(user => user.avatar);

    return {
        id,
        title: `Task ${id}: ${[
            'Implement Dark Mode', 'Fix Login Bug', 'Refactor Auth Flow', 
            'Design New Landing', 'API Integration', 'Update Documentation',
            'Mobile Optimization', 'Performance Audit', 'Security Patch',
            'Add Unit Tests'
        ][i % 10]}`,
        project: MOCK_PROJECTS[i % MOCK_PROJECTS.length],
        type: types[i % types.length],
        priority: priorities[i % priorities.length],
        date: `${20 + (i % 10)}/10/2026`,
        status,
        progress: status === 'Done' ? 100 : (status === 'In Progress' ? 45 : 0),
        avatars,
        assignees: taskUsers,
        description: `<p>Detailed description for Task ${id}. This task focuses on improving the user experience through ${types[i % types.length].toLowerCase()} work.</p><ul><li>Step 1: Analysis</li><li>Step 2: Implementation</li></ul>`
    };
});

export const COLUMNS: Column[] = [
    { id: 'todo', title: 'To Do', status: 'To Do', theme: 'slate' },
    { id: 'in-progress', title: 'In Progress', status: 'In Progress', theme: 'blue' },
    { id: 'done', title: 'Done', status: 'Done', theme: 'green' }
];
