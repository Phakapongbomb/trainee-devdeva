import React, { useState } from 'react';
import { Plus as PlusIcon, AlertTriangle as PriorityIcon, X as CloseIcon } from 'lucide-react';
import { BaseModal, Input } from '../../../components/common';
import type { Priority } from '../../../types/task';

interface PriorityModalProps {
    isOpen: boolean;
    onClose: () => void;
    priorities: Priority[];
    onConfirm: (updatedPriorities: Priority[]) => void;
}

export const PriorityModal: React.FC<PriorityModalProps> = ({ isOpen, onClose, priorities, onConfirm }) => {
    const [draftPriorities, setDraftPriorities] = useState<Priority[]>(priorities);
    const [validationError, setValidationError] = useState<string | null>(null);

    const handleAddNewPriority = () => {
        const uniqueId = `priority-${Date.now()}`;
        setDraftPriorities([...draftPriorities, { id: uniqueId, label: '', value: '' }]);
        setValidationError(null);
    };

    const handleRemovePriority = (indexToRemove: number) => {
        setDraftPriorities(draftPriorities.filter((_, index) => index !== indexToRemove));
        setValidationError(null);
    };

    const validateAndConfirm = () => {
        const validatedPriorities = draftPriorities.map(priority => ({
            ...priority,
            label: priority.label.trim(),
            value: priority.label.trim(),
        }));

        if (validatedPriorities.some(priority => priority.label === "")) {
            setValidationError("Priority names cannot be empty.");
            return;
        }

        const uniqueLabels = new Set(validatedPriorities.map(p => p.label));
        if (uniqueLabels.size !== validatedPriorities.length) {
            setValidationError("Priority names must be unique.");
            return;
        }

        onConfirm(validatedPriorities);
        onClose();
    };

    return (
        <BaseModal isOpen={isOpen} onClose={onClose} maxWidth="max-w-xl">
            <div className="p-8">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                        <PriorityIcon className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-gray-900">Manage Priorities</h3>
                        <p className="text-sm text-gray-500">Add, rename or delete task priorities.</p>
                    </div>
                </div>

                <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
                    {draftPriorities.map((priority, index) => (
                        <div key={priority.id} className="flex items-end gap-3 group animate-in fade-in slide-in-from-bottom-2 duration-300">
                            <div className="flex-grow">
                                <Input
                                    label={`Priority #${index + 1}`}
                                    value={priority.label}
                                    onChange={(e) => {
                                        const updated = [...draftPriorities];
                                        updated[index] = {
                                            ...updated[index],
                                            label: e.target.value,
                                            value: e.target.value,
                                        };
                                        setDraftPriorities(updated);
                                        setValidationError(null);
                                    }}
                                    placeholder="Enter priority name..."
                                />
                            </div>
                            <button
                                onClick={() => handleRemovePriority(index)}
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
                        onClick={handleAddNewPriority}
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
