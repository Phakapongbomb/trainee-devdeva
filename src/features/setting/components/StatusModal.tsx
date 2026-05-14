import React, { useState } from 'react';
import { Plus as PlusIcon, BarChart3 as AnalyticsIcon, X as CloseIcon } from 'lucide-react';
import { BaseModal, Input } from '../../../components/common';
import type { Column } from '../../../types/task';

interface StatusModalProps {
    isOpen: boolean;
    onClose: () => void;
    columns: Column[];
    onConfirm: (updatedColumns: Column[]) => void;
}

const STATUS_THEME_PALETTE: Column['theme'][] = ['slate', 'blue', 'green', 'amber', 'purple', 'red'];

export const StatusModal: React.FC<StatusModalProps> = ({ isOpen, onClose, columns, onConfirm }) => {
    const [draftColumns, setDraftColumns] = useState<Column[]>(columns);
    const [validationError, setValidationError] = useState<string | null>(null);

    const handleAddNewStatus = () => {
        const uniqueId = `status-${Date.now()}`;
        setDraftColumns([...draftColumns, { id: uniqueId, title: '', status: '', theme: 'slate' }]);
        setValidationError(null);
    };

    const handleRemoveStatus = (indexToRemove: number) => {
        setDraftColumns(draftColumns.filter((_, index) => index !== indexToRemove));
        setValidationError(null);
    };

    const handleUpdateTheme = (columnIndex: number, selectedTheme: Column['theme']) => {
        const updatedColumns = [...draftColumns];
        updatedColumns[columnIndex] = { ...updatedColumns[columnIndex], theme: selectedTheme };
        setDraftColumns(updatedColumns);
    };

    const validateAndConfirm = () => {
        const cleanedColumns = draftColumns.map(column => ({
            ...column,
            title: column.title.trim(),
            status: column.title.trim()
        }));

        if (cleanedColumns.some(col => col.title === "")) {
            setValidationError("Status names cannot be empty.");
            return;
        }

        const uniqueTitles = new Set(cleanedColumns.map(col => col.title));
        if (uniqueTitles.size !== cleanedColumns.length) {
            setValidationError("Status names must be unique.");
            return;
        }

        onConfirm(cleanedColumns);
        onClose();
    };

    return (
        <BaseModal isOpen={isOpen} onClose={onClose} maxWidth="max-w-xl">
            <div className="p-8">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                        <AnalyticsIcon className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-gray-900">Manage Statuses</h3>
                        <p className="text-sm text-gray-500">Add, rename or delete task statuses.</p>
                    </div>
                </div>

                <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
                    {draftColumns.map((column, index) => (
                        <div key={column.id} className="flex items-end gap-3 group animate-in fade-in slide-in-from-bottom-2 duration-300">
                            <div className="flex-grow">
                                <Input
                                    label={`Status #${index + 1}`}
                                    value={column.title}
                                    onChange={(e) => {
                                        const updated = [...draftColumns];
                                        updated[index] = { ...updated[index], title: e.target.value, status: e.target.value };
                                        setDraftColumns(updated);
                                        setValidationError(null);
                                    }}
                                    placeholder="Enter status name..."
                                />
                            </div>
                            <div className="flex items-center gap-2 mb-[10px]">
                                {STATUS_THEME_PALETTE.map((themeOption) => (
                                    <button
                                        key={themeOption}
                                        onClick={() => handleUpdateTheme(index, themeOption)}
                                        className={`w-6 h-6 rounded-full border-2 ${column.theme === themeOption ? 'border-blue-500 scale-110 shadow-sm' : 'border-transparent'
                                            } ${themeOption === 'slate' ? 'bg-slate-400' :
                                                themeOption === 'blue' ? 'bg-blue-500' :
                                                    themeOption === 'green' ? 'bg-green-500' :
                                                        themeOption === 'amber' ? 'bg-amber-500' :
                                                            themeOption === 'purple' ? 'bg-purple-500' : 'bg-red-500'
                                            } transition-all`}
                                    />
                                ))}
                            </div>
                            <button
                                onClick={() => handleRemoveStatus(index)}
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
                        onClick={handleAddNewStatus}
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
