import React, { useState } from 'react';
import { Plus as PlusIcon, Folder as FolderIcon, X as CloseIcon } from 'lucide-react';
import { BaseModal, Input } from '../../../components/common';

interface ProjectModalProps {
    isOpen: boolean;
    onClose: () => void;
    projects: string[];
    onConfirm: (updatedProjects: string[]) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ isOpen, onClose, projects, onConfirm }) => {
    const [draftProjects, setDraftProjects] = useState<string[]>(projects);
    const [validationError, setValidationError] = useState<string | null>(null);

    const handleAddNewProject = () => {
        setDraftProjects([...draftProjects, '']);
        setValidationError(null);
    };

    const handleRemoveProject = (indexToRemove: number) => {
        setDraftProjects(draftProjects.filter((_, index) => index !== indexToRemove));
        setValidationError(null);
    };

    const validateAndConfirm = () => {
        const cleanedProjects = draftProjects.map(projectName => projectName.trim());
        
        // Validation Logic
        if (cleanedProjects.some(name => name === "")) {
            setValidationError("Project names cannot be empty.");
            return;
        }
        
        const uniqueProjects = new Set(cleanedProjects);
        if (uniqueProjects.size !== cleanedProjects.length) {
            setValidationError("Project names must be unique.");
            return;
        }

        onConfirm(cleanedProjects);
        onClose();
    };

    return (
        <BaseModal isOpen={isOpen} onClose={onClose} maxWidth="max-w-xl">
            <div className="p-8">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                        <FolderIcon className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-gray-900">Manage Projects</h3>
                        <p className="text-sm text-gray-500">Add, rename or delete your workspace projects.</p>
                    </div>
                </div>

                <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
                    {draftProjects.map((projectName, index) => (
                        <div key={`project-${index}`} className="flex items-end gap-3 group animate-in fade-in slide-in-from-bottom-2 duration-300">
                            <div className="flex-grow">
                                <Input
                                    label={`Project #${index + 1}`}
                                    value={projectName}
                                    onChange={(e) => {
                                        const newDraft = [...draftProjects];
                                        newDraft[index] = e.target.value;
                                        setDraftProjects(newDraft);
                                        setValidationError(null);
                                    }}
                                    placeholder="Enter project name..."
                                />
                            </div>
                            <button
                                onClick={() => handleRemoveProject(index)}
                                className="mb-[2px] p-3 text-red-500 hover:bg-red-100 rounded-xl transition-all opacity-0 group-hover:opacity-100"
                            >
                                <CloseIcon className="w-5 h-5" />
                            </button>
                        </div>
                    ))}
                </div>

                {validationError && (
                    <div className="mt-4 p-3 bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl animate-in shake duration-300">
                        {validationError}
                    </div>
                )}

                <div className="mt-8 flex flex-col sm:flex-row gap-3">
                    <button
                        onClick={handleAddNewProject}
                        className="flex-1 flex items-center justify-center gap-2 py-3 border-2 border-dashed border-gray-200 text-gray-500 rounded-xl font-bold hover:border-blue-400 hover:text-blue-600 transition-all"
                    >
                        <PlusIcon className="w-4 h-4" />
                        Add Another
                    </button>
                    <button
                        onClick={validateAndConfirm}
                        className="flex-1 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
                    >
                        Confirm Changes
                    </button>
                </div>
            </div>
        </BaseModal>
    );
};
