import React, { useState, useMemo } from 'react';
import {
    Save as SaveIcon,
    Plus as PlusIcon,
    Folder as FolderIcon,
    BarChart3 as AnalyticsIcon,
    AlertTriangle as PriorityIcon,
    Settings as SettingsGear,
    Globe as GlobeIcon,
    Smartphone as MobileIcon,
    RotateCcw,
    SearchIcon
} from 'lucide-react';
import { TopNav, FadeIn, ConfirmModal } from '../../components/common';
import { useSettings } from './hooks/useSettings';
import { ProjectModal } from './components/ProjectModal';
import { StatusModal } from './components/StatusModal';
import { PriorityModal } from './components/PriorityModal';
import { UserModal } from './components/UserModal';
import type { User } from '../../types/user';

const SettingPage: React.FC = () => {
    const {
        projects,
        setLocalProjects,
        columns,
        setLocalColumns,
        priorities,
        setLocalPriorities,
        users,
        searchQuery,
        setSearchQuery,
        modal,
        setModal,
        isChanged,
        isNotDefault,
        handleSave,
        confirmReset,
        handleAddUser,
        handleUpdateUser
    } = useSettings();

    const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
    const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
    const [isPriorityModalOpen, setIsPriorityModalOpen] = useState(false);
    const [isUserModalOpen, setIsUserModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<User | null>(null);

    const openAddUser = () => {
        setEditingUser(null);
        setIsUserModalOpen(true);
    };

    const openEditUser = (user: User) => {
        setEditingUser(user);
        setIsUserModalOpen(true);
    };

    const filteredProjects = useMemo(() =>
        projects.filter(p => p.toLowerCase().includes(searchQuery.toLowerCase())),
        [projects, searchQuery]);

    const filteredStatuses = useMemo(() =>
        columns.filter(c => c.title.toLowerCase().includes(searchQuery.toLowerCase())),
        [columns, searchQuery]);

    const filteredPriorities = useMemo(() =>
        priorities.filter(p => p.label.toLowerCase().includes(searchQuery.toLowerCase())),
        [priorities, searchQuery]);

    const filteredUsers = useMemo(() =>
        users.filter(u =>
            u.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            u.nickname.toLowerCase().includes(searchQuery.toLowerCase())
        ),
        [users, searchQuery]);

    const hasResults = filteredProjects.length > 0 ||
        filteredStatuses.length > 0 ||
        filteredPriorities.length > 0 ||
        filteredUsers.length > 0;

    return (
        <div className="flex flex-col h-full bg-[#faf8ff] overflow-hidden">
            <TopNav
                placeholder="Search settings..."
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
            />
            <div className="flex-1 overflow-y-auto">
                <FadeIn className="p-4 sm:p-6 lg:p-8 container mx-auto w-full">
                    {/* Page Title */}
                    <div className="mb-8">
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">Settings</h1>
                        <p className="text-sm sm:text-base text-gray-500 mt-1">Configure your workspace preferences and project parameters.</p>
                    </div>

                    {!hasResults ? (
                        <div className="flex flex-col items-center justify-center py-20 animate-in fade-in zoom-in duration-500">
                            <div className="w-20 h-20 bg-gray-50 rounded-3xl flex items-center justify-center mb-4 ring-1 ring-gray-100">
                                <SearchIcon className="w-10 h-10 text-gray-300" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900">No results found</h3>
                            <p className="text-gray-500 max-w-xs text-center mt-1">
                                We couldn't find anything matching "<span className="text-blue-600 font-semibold">{searchQuery}</span>".
                                Please try a different keyword.
                            </p>
                            <button
                                onClick={() => setSearchQuery('')}
                                className="mt-6 text-sm font-bold text-blue-600 hover:text-blue-700 underline underline-offset-4"
                            >
                                Clear search
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-12 gap-8">

                            {/* Main Settings Section */}
                            <div className="col-span-12 xl:col-span-8 space-y-8">
                                {/* Active Projects */}
                                {filteredProjects.length > 0 && (
                                    <section className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <FolderIcon className="text-blue-600 w-5 h-5" />
                                                <h2 className="text-xl font-bold text-gray-900">Active Projects</h2>
                                            </div>
                                            <button
                                                onClick={() => setIsProjectModalOpen(true)}
                                                className="cursor-pointer flex items-center gap-1.5 px-4 py-2 border-2 border-blue-600 text-blue-600 rounded-xl font-bold hover:bg-blue-50 transition-all text-sm whitespace-nowrap"
                                            >
                                                Manage Projects
                                            </button>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
                                            {filteredProjects.map((project, idx) => (
                                                <div key={`${project}-${idx}`} className="bg-white border border-gray-100 rounded-2xl p-5 hover:border-blue-200 transition-all group shadow-sm hover:shadow-md">
                                                    <div className="flex items-start justify-between mb-4">
                                                        <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                                                            {idx % 2 === 0 ? <GlobeIcon className="text-blue-600 w-5 h-5" /> : <MobileIcon className="text-purple-600 w-5 h-5" />}
                                                        </div>
                                                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${idx % 2 === 0 ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'}`}>
                                                            {idx % 2 === 0 ? 'Active' : 'In Review'}
                                                        </span>
                                                    </div>
                                                    <div className="mb-4">
                                                        <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{project}</h3>
                                                    </div>
                                                    <div className="space-y-2">
                                                        <div className="flex justify-between text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                                            <span>Health</span>
                                                            <span className="text-blue-600">{idx % 2 === 0 ? '85%' : '42%'}</span>
                                                        </div>
                                                        <div className="w-full bg-gray-50 h-1.5 rounded-full overflow-hidden">
                                                            <div
                                                                className={`h-full rounded-full ${idx % 2 === 0 ? 'bg-blue-500' : 'bg-amber-500'}`}
                                                                style={{ width: idx % 2 === 0 ? '85%' : '42%' }}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </section>
                                )}

                                {/* Statuses Configuration */}
                                {filteredStatuses.length > 0 && (
                                    <section className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                                        <div className="flex items-center justify-between mb-6">
                                            <div className="flex items-center gap-2">
                                                <AnalyticsIcon className="text-blue-600 w-5 h-5" />
                                                <h2 className="text-lg font-bold text-gray-900">Task Statuses</h2>
                                            </div>
                                            <button
                                                onClick={() => setIsStatusModalOpen(true)}
                                                className="cursor-pointer flex items-center gap-1.5 px-4 py-2 border-2 border-blue-600 text-blue-600 rounded-xl font-bold hover:bg-blue-50 transition-all text-sm whitespace-nowrap"
                                            >
                                                Manage Statuses
                                            </button>
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
                                            {filteredStatuses.map((col) => (
                                                <div key={col.id} className="flex items-center justify-between p-4 bg-gray-50/50 rounded-xl border border-gray-100 group">
                                                    <div className="flex items-center gap-3">
                                                        <span className="font-bold text-gray-700">{col.title}</span>
                                                    </div>
                                                    <div className="flex items-center gap-3">
                                                        <div className={`w-3 h-3 rounded-full ${col.theme === 'blue' ? 'bg-blue-500' :
                                                            col.theme === 'green' ? 'bg-green-500' :
                                                                col.theme === 'amber' ? 'bg-amber-500' :
                                                                    col.theme === 'purple' ? 'bg-purple-500' :
                                                                        col.theme === 'red' ? 'bg-red-500' :
                                                                            col.theme === 'pink' ? 'bg-pink-500' : 'bg-slate-400'
                                                            }`} />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </section>
                                )}
                            </div>

                            {/* Sidebar Settings Section */}
                            <div className="col-span-12 xl:col-span-4 space-y-8">
                                {/* Priorities Management */}
                                {filteredPriorities.length > 0 && (
                                    <section className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                                        <div className="flex items-center justify-between gap-2 mb-6">
                                            <div className='flex items-center gap-2'>
                                                <PriorityIcon className="text-blue-600 w-5 h-5" />
                                                <h2 className="text-lg font-bold text-gray-900">Priorities</h2>
                                            </div>
                                            <button
                                                onClick={() => setIsPriorityModalOpen(true)}
                                                className="cursor-pointer w-full sm:w-auto flex items-center justify-center gap-1.5 px-4 py-2 border-2 border-blue-600 text-blue-600 rounded-xl font-bold hover:bg-blue-50 transition-all text-sm whitespace-nowrap"
                                            >
                                                Manage Priorities
                                            </button>
                                        </div>
                                        <div className="space-y-5">
                                            {filteredPriorities.map((p, i) => (
                                                <div key={i} className="space-y-1.5 animate-in fade-in slide-in-from-left duration-300" style={{ animationDelay: `${i * 100}ms` }}>
                                                    <div className="flex justify-between items-center px-1">
                                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Priority Level</label>
                                                        <span className="text-[10px] font-bold text-blue-600">Level {i + 1}</span>
                                                    </div>
                                                    <div className="flex items-center gap-3">
                                                        <div className={`w-10 h-10 rounded-xl shadow-sm flex-shrink-0 ${p.value === 'High' ? 'bg-red-500' :
                                                            p.value === 'Medium' ? 'bg-blue-500' :
                                                                p.value === 'Low' ? 'bg-slate-400' : 'bg-amber-500'
                                                            }`} />
                                                        <div className="flex-grow bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5 text-sm font-bold text-gray-700">
                                                            {p.label}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </section>
                                )}

                                {/* Team Members Management */}
                                {filteredUsers.length > 0 && (
                                    <section className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                                            <div className="flex items-center gap-2">
                                                <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 font-bold text-xs">
                                                    {filteredUsers.length}
                                                </div>
                                                <h2 className="text-lg font-bold text-gray-900">Team</h2>
                                            </div>
                                            <button
                                                onClick={openAddUser}
                                                className="cursor-pointer w-full sm:w-auto flex items-center justify-center gap-1.5 px-4 py-2 border-2 border-blue-600 text-blue-600 rounded-xl font-bold hover:bg-blue-50 transition-all text-sm whitespace-nowrap"
                                            >
                                                <PlusIcon className="w-4 h-4" />
                                                Add People
                                            </button>
                                        </div>
                                        <div className="max-h-[300px] overflow-y-auto hide-scrollbar space-y-4 pr-1">
                                            {filteredUsers.map((user, idx) => (
                                                <div key={`${user.id}-${idx}`} className="flex items-center justify-between group">
                                                    <div className="flex items-center gap-3">
                                                        <img src={user.avatar} alt={user.fullName} className="w-10 h-10 rounded-full object-cover ring-2 ring-transparent group-hover:ring-blue-100 transition-all" />
                                                        <div>
                                                            <p className="text-sm font-bold text-gray-900">{user.fullName}</p>
                                                            <p className="text-[10px] text-gray-400 font-medium uppercase tracking-tighter">{user.role || 'Member'}</p>
                                                        </div>
                                                    </div>
                                                    <button
                                                        onClick={() => openEditUser(user)}
                                                        className="cursor-pointer opacity-0 group-hover:opacity-100 p-1.5 hover:bg-gray-50 rounded-lg text-gray-400 transition-all"
                                                    >
                                                        <SettingsGear className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </section>
                                )}
                            </div>
                        </div>
                    )}
                </FadeIn>
            </div>


            {/* Floating Action Widget */}
            {(isChanged || isNotDefault) && (
                <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 w-[calc(100%-2rem)] max-w-2xl animate-in fade-in slide-in-from-bottom-8 duration-500">
                    <div className="bg-white/80 backdrop-blur-xl border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.15)] rounded-3xl p-4 flex items-center justify-between gap-4 ring-1 ring-black/5">
                        <div className="hidden sm:block px-2">
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Unsaved Changes</p>
                            <p className="text-[10px] text-gray-400">Review your settings before applying</p>
                        </div>
                        <div className="flex items-center gap-3 w-full sm:w-auto">
                            {isNotDefault && (
                                <button
                                    onClick={() => setModal({ type: 'reset' })}
                                    className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-3 bg-white border border-red-100 text-red-500 rounded-2xl font-bold hover:bg-red-50 transition-all active:scale-95 text-sm ring-1 ring-red-50"
                                >
                                    <RotateCcw className="w-4 h-4" />
                                    <span className="whitespace-nowrap">Reset</span>
                                </button>
                            )}
                            {isChanged && (
                                <button
                                    onClick={() => setModal({ type: 'save' })}
                                    className="flex-grow sm:flex-none flex items-center justify-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all active:scale-95 shadow-xl shadow-blue-500/20 text-sm"
                                >
                                    <SaveIcon className="w-4 h-4" />
                                    <span className="whitespace-nowrap">Save Changes</span>
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Common Modals */}
            <ConfirmModal
                isOpen={modal.type === 'save'}
                onClose={() => setModal({ type: null })}
                onConfirm={handleSave}
                title="Settings Saved"
                description="Your workspace preferences and project parameters have been successfully updated."
                confirmText="Got it"
                type="info"
            />

            <ConfirmModal
                isOpen={modal.type === 'reset'}
                onClose={() => setModal({ type: null })}
                onConfirm={confirmReset}
                title="Reset All Data?"
                description="This will clear all tasks, filters, and settings back to their default state. This action cannot be undone."
                confirmText="Reset Everything"
                type="danger"
            />

            {/* Domain-Specific Modals */}
            {isProjectModalOpen && (
                <ProjectModal
                    isOpen={isProjectModalOpen}
                    onClose={() => setIsProjectModalOpen(false)}
                    projects={projects}
                    onConfirm={setLocalProjects}
                />
            )}

            {isStatusModalOpen && (
                <StatusModal
                    isOpen={isStatusModalOpen}
                    onClose={() => setIsStatusModalOpen(false)}
                    columns={columns}
                    onConfirm={setLocalColumns}
                />
            )}

            {isPriorityModalOpen && (
                <PriorityModal
                    isOpen={isPriorityModalOpen}
                    onClose={() => setIsPriorityModalOpen(false)}
                    priorities={priorities}
                    onConfirm={setLocalPriorities}
                />
            )}

            {isUserModalOpen && (
                <UserModal
                    isOpen={isUserModalOpen}
                    onClose={() => setIsUserModalOpen(false)}
                    initialUser={editingUser}
                    onConfirm={editingUser ? handleUpdateUser : handleAddUser}
                />
            )}
        </div>
    );
};

export default SettingPage;