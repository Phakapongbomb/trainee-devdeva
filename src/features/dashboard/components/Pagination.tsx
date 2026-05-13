import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

interface PageInputProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const PageInput: React.FC<PageInputProps> = ({ currentPage, totalPages, onPageChange }) => {
    const [inputValue, setInputValue] = useState(currentPage.toString());

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const submitPageChange = () => {
        let page = parseInt(inputValue);
        if (isNaN(page) || page < 1) {
            page = 1;
        } else if (page > totalPages) {
            page = totalPages;
        }
        onPageChange(page);
        setInputValue(page.toString());
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            submitPageChange();
        }
    };

    return (
        <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onBlur={submitPageChange}
            className="w-14 h-10 text-center rounded-xl border border-slate-200 bg-white text-slate-900 font-bold text-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none"
        />
    );
};

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {

    return (
        <div className="flex justify-center items-center gap-4 mt-8 pb-4">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="w-10 h-10 flex items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-400 hover:bg-slate-50 disabled:opacity-50 transition-all shadow-sm active:scale-95"
            >
                <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-slate-500">Page</span>
                <div className="relative group">
                    <PageInput
                        key={currentPage}
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={onPageChange}
                    />
                </div>
                <span className="text-sm font-medium text-slate-500">of {totalPages}</span>
            </div>

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="w-10 h-10 flex items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-400 hover:bg-slate-50 disabled:opacity-50 transition-all shadow-sm active:scale-95"
            >
                <ChevronRight className="w-5 h-5" />
            </button>
        </div>
    );
};

export default Pagination;
