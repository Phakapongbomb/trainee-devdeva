import React from 'react';
import { X, AlertTriangle, Info } from 'lucide-react';

interface ConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    description: string;
    confirmText?: string;
    cancelText?: string;
    type?: 'danger' | 'info';
    children?: React.ReactNode;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    title,
    description,
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    type = 'danger',
    children
}) => {
    if (!isOpen) return null;

    const isDanger = type === 'danger';

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200" 
                onClick={onClose} 
            />
            
            {/* Modal Content */}
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 relative z-10 animate-in fade-in zoom-in duration-200">
                <button 
                    onClick={onClose}
                    className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>

                <div className="flex flex-col items-center text-center space-y-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${isDanger ? 'bg-red-50 text-red-500' : 'bg-blue-50 text-blue-500'}`}>
                        {isDanger ? <AlertTriangle className="w-6 h-6" /> : <Info className="w-6 h-6" />}
                    </div>
                    
                    <div className="space-y-2">
                        <h3 className="text-slate-900 font-bold text-lg">{title}</h3>
                        <p className="text-slate-500 text-sm">{description}</p>
                    </div>

                    {children && (
                        <div className="w-full">
                            {children}
                        </div>
                    )}

                    <div className="grid grid-cols-2 gap-3 w-full pt-2">
                        <button
                            onClick={onClose}
                            className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold text-sm hover:bg-slate-50 transition-all"
                        >
                            {cancelText}
                        </button>
                        <button
                            onClick={onConfirm}
                            className={`px-4 py-2.5 rounded-xl text-white font-bold text-sm shadow-lg transition-all active:scale-95 ${
                                isDanger 
                                    ? 'bg-red-500 hover:bg-red-600 shadow-red-500/20' 
                                    : 'bg-blue-500 hover:bg-blue-600 shadow-blue-500/20'
                            }`}
                        >
                            {confirmText}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;
