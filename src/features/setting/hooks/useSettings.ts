import { useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectProjects, selectColumns, selectUsers, selectPriorities } from '../../../store/selectors';
import { setProjects, setColumns, setPriorities, setUsers } from '../../../store/metadataSlice';
import { resetApp } from '../../../store/actions';
import { renameStatus, renamePriority, removeStatusFromTasks, removePriorityFromTasks, renameProject, removeProjectFromTasks } from '../../../store/taskSlice';
import { MOCK_PROJECTS, COLUMNS, MOCK_USERS, PRIORITIES } from '../../../constants/mockData';
import type { Column, Priority } from '../../../types/task';
import type { User } from '../../../types/user';

export const useSettings = () => {
    const dispatch = useDispatch();
    const reduxProjects = useSelector(selectProjects);
    const reduxColumns = useSelector(selectColumns);
    const reduxPriorities = useSelector(selectPriorities);
    const reduxUsers = useSelector(selectUsers);

    // Normalize projects to handle legacy object formats from local storage
    const normalizedReduxProjects = useMemo(() => 
        reduxProjects.map(p => typeof p === 'object' ? ((p as any).name || (p as any).id || String(p)) : p)
    , [reduxProjects]);

    // Local state for editing before saving
    const [projects, setLocalProjects] = useState<string[]>(normalizedReduxProjects);
    const [columns, setLocalColumns] = useState<Column[]>(reduxColumns);
    const [priorities, setLocalPriorities] = useState<Priority[]>(reduxPriorities);
    const [users, setLocalUsers] = useState<User[]>(reduxUsers);
    const [searchQuery, setSearchQuery] = useState('');
    
    // Track project modifications that affect existing tasks
    const [projectRenames, setProjectRenames] = useState<{oldName: string, newName: string}[]>([]);
    const [projectDeletes, setProjectDeletes] = useState<string[]>([]);

    const [modal, setModal] = useState<{
        type: 'save' | 'reset' | null;
    }>({ type: null });

    const isChanged = useMemo(() => {
        if (projects.length !== normalizedReduxProjects.length) return true;
        if (priorities.length !== reduxPriorities.length) return true;
        if (users.length !== reduxUsers.length) return true;
        return projects.some((p, i) => p !== normalizedReduxProjects[i]) ||
            JSON.stringify(priorities) !== JSON.stringify(reduxPriorities) ||
            JSON.stringify(columns) !== JSON.stringify(reduxColumns) ||
            JSON.stringify(users) !== JSON.stringify(reduxUsers);
    }, [projects, normalizedReduxProjects, columns, reduxColumns, priorities, reduxPriorities, users, reduxUsers]);

    const isNotDefault = useMemo(() => {
        return JSON.stringify(normalizedReduxProjects) !== JSON.stringify(MOCK_PROJECTS) ||
            JSON.stringify(reduxColumns) !== JSON.stringify(COLUMNS) ||
            JSON.stringify(reduxUsers) !== JSON.stringify(MOCK_USERS) ||
            JSON.stringify(reduxPriorities) !== JSON.stringify(PRIORITIES);
    }, [normalizedReduxProjects, reduxColumns, reduxUsers, reduxPriorities]);

    const handleSave = () => {
        // Sync Project Changes (Rename/Delete to taskSlice)
        projectDeletes.forEach(p => dispatch(removeProjectFromTasks(p)));
        projectRenames.forEach(r => dispatch(renameProject({ oldName: r.oldName, newName: r.newName })));

        // Sync Status Changes
        reduxColumns.forEach((oldCol) => {
            const stillExists = columns.some(c => c.id === oldCol.id);
            if (!stillExists) {
                dispatch(removeStatusFromTasks(oldCol.status));
            } else {
                const newCol = columns.find(c => c.id === oldCol.id);
                if (newCol && newCol.status !== oldCol.status) {
                    dispatch(renameStatus({ oldStatus: oldCol.status, newStatus: newCol.status }));
                }
            }
        });

        // Sync Priority Changes
        reduxPriorities.forEach((oldP) => {
            const stillExists = priorities.some(p => p.id === oldP.id);
            if (!stillExists) {
                dispatch(removePriorityFromTasks(oldP.value));
            } else {
                const newP = priorities.find(p => p.id === oldP.id);
                if (newP && newP.value !== oldP.value) {
                    dispatch(renamePriority({ oldPriority: oldP.value, newPriority: newP.value }));
                }
            }
        });

        dispatch(setProjects(projects));
        dispatch(setColumns(columns));
        dispatch(setPriorities(priorities));
        dispatch(setUsers(users));
        setModal({ type: null });
    };

    const confirmReset = () => {
        dispatch(resetApp());
        setLocalProjects(MOCK_PROJECTS);
        setLocalColumns(COLUMNS);
        setLocalPriorities(PRIORITIES);
        setLocalUsers(MOCK_USERS);
        setProjectRenames([]);
        setProjectDeletes([]);
        setModal({ type: null });
    };

    const handleConfirmProjects = (updatedProjects: string[], renames: {oldName: string, newName: string}[], deleted: string[]) => {
        setLocalProjects(updatedProjects);
        setProjectRenames(prev => [...prev, ...renames]);
        setProjectDeletes(prev => [...prev, ...deleted]);
    };

    return {
        reduxUsers,
        projects,
        setLocalProjects: handleConfirmProjects,
        columns,
        setLocalColumns,
        priorities,
        setLocalPriorities,
        users,
        setLocalUsers,
        searchQuery,
        setSearchQuery,
        modal,
        setModal,
        isChanged,
        isNotDefault,
        handleSave,
        confirmReset,
        handleAddUser: (newUser: User) => {
            setLocalUsers([...users, newUser]);
        },
        handleUpdateUser: (updatedUser: User) => {
            setLocalUsers(users.map(u => u.id === updatedUser.id ? updatedUser : u));
        }
    };
};
