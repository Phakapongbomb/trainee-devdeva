import React, { useState } from 'react';
import { BaseModal, Input } from '../../../components/common';
import type { User } from '../../../types/user';

interface UserModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialUser: User | null; // null means "Add Mode"
    onConfirm: (user: User) => void;
}

export const UserModal: React.FC<UserModalProps> = ({ isOpen, onClose, initialUser, onConfirm }) => {
    const [draftUser, setDraftUser] = useState<User>(() => {
        if (initialUser) return initialUser;

        const uniqueId = `user-${Date.now()}`;
        return {
            id: uniqueId,
            fullName: '',
            nickname: '',
            role: '',
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${uniqueId}`
        };
    });
    const [validationError, setValidationError] = useState<string | null>(null);

    const handleUpdateField = (field: keyof User, value: string) => {
        setDraftUser(prev => ({ ...prev, [field]: value }));
        setValidationError(null);
    };

    const validateAndConfirm = () => {
        const cleaned = {
            ...draftUser,
            fullName: draftUser.fullName.trim(),
            nickname: draftUser.nickname.trim(),
            role: draftUser.role?.trim() || 'Member'
        };

        if (cleaned.fullName === "") {
            setValidationError("Full Name is required.");
            return;
        }

        onConfirm(cleaned);
        onClose();
    };

    return (
        <BaseModal isOpen={isOpen} onClose={onClose} maxWidth="max-w-md">
            <div className="p-8">
                <div className="flex items-center gap-3 mb-6">
                    <div>
                        <h3 className="text-xl font-bold text-gray-900">
                            {initialUser ? 'Edit Member' : 'Add New Member'}
                        </h3>
                        <p className="text-sm text-gray-500">
                            {initialUser ? 'Update member details below.' : 'Create a new member for your workspace.'}
                        </p>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="flex justify-center mb-6">
                        <img src={draftUser.avatar} className="bg-white w-20 h-20 rounded-full border-4 border-white shadow-md ring-1 ring-gray-100" alt="Avatar Preview" />
                    </div>

                    <Input
                        label="Full Name"
                        value={draftUser.fullName}
                        onChange={(e) => handleUpdateField('fullName', e.target.value)}
                        placeholder="e.g. John Doe"
                    />
                    <Input
                        label="Nickname"
                        value={draftUser.nickname}
                        onChange={(e) => handleUpdateField('nickname', e.target.value)}
                        placeholder="e.g. Johnny"
                    />
                    <Input
                        label="Role / Designation"
                        value={draftUser.role || ''}
                        onChange={(e) => handleUpdateField('role', e.target.value)}
                        placeholder="e.g. Senior Developer"
                    />
                </div>

                {validationError && (
                    <div className="mt-4 p-3 bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl animate-in shake duration-300">
                        {validationError}
                    </div>
                )}

                <div className="mt-8 flex gap-3">
                    <button
                        onClick={onClose}
                        className="flex-1 py-3 bg-gray-100 text-gray-600 rounded-xl font-bold hover:bg-gray-200 transition-all"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={validateAndConfirm}
                        className="flex-[2] py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
                    >
                        {initialUser ? 'Save Changes' : 'Add Member'}
                    </button>
                </div>
            </div>
        </BaseModal>
    );
};
