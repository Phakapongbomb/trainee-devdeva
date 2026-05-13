import { useState, useRef, useEffect, useMemo } from 'react';
import { ChevronDown, Check, Search } from 'lucide-react';

export interface SelectOption<T = string | number> {
    id: string | number;
    label: string;
    value: T;
    image?: string;
    subLabel?: string;
}

interface SelectPropsBase<T> {
    label?: string;
    options: SelectOption<T>[];
    placeholder?: string;
    required?: boolean;
    showAvatars?: boolean;
}

interface SingleSelectProps<T> extends SelectPropsBase<T> {
    multiple?: false;
    value: T | undefined | null;
    onChange: (value: T) => void;
}

interface MultipleSelectProps<T> extends SelectPropsBase<T> {
    multiple: true;
    value: T[];
    onChange: (value: T[]) => void;
}

type SelectProps<T> = SingleSelectProps<T> | MultipleSelectProps<T>;

function Select<T = string | number>(props: SelectProps<T>) {
    const {
        label,
        options,
        value,
        onChange,
        multiple = false,
        placeholder = "Select option",
        required = false,
        showAvatars = false
    } = props;
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleToggle = () => {
        setIsOpen(!isOpen);
        if (!isOpen) setSearchQuery('');
    };

    const handleSelect = (optionValue: T) => {
        if (multiple) {
            const currentValues = Array.isArray(value) ? value : [];
            const newValue = currentValues.includes(optionValue)
                ? currentValues.filter(v => v !== optionValue)
                : [...currentValues, optionValue];
            (onChange as (val: T[]) => void)(newValue);
        } else {
            (onChange as (val: T) => void)(optionValue);
            setIsOpen(false);
        }
    };

    const filteredOptions = useMemo(() => {
        return options.filter(opt =>
            opt.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (opt.subLabel && opt.subLabel.toLowerCase().includes(searchQuery.toLowerCase()))
        );
    }, [options, searchQuery]);

    const isSelected = (optionValue: T) => {
        if (multiple) {
            return Array.isArray(value) && value.includes(optionValue);
        }
        return value === optionValue;
    };

    const selectedValues = useMemo((): T[] => {
        if (multiple) return Array.isArray(value) ? value : [];
        return value !== undefined && value !== null ? [value as T] : [];
    }, [value, multiple]);

    const renderSelection = () => {
        if (selectedValues.length === 0) return <span className="text-gray-400 text-sm">{placeholder}</span>;

        if (multiple && showAvatars) {
            return (
                <div className="flex items-center -space-x-2 mr-2">
                    {selectedValues.slice(0, 3).map((val, idx) => {
                        const opt = options.find(o => o.value === val);
                        return opt?.image ? (
                            <img key={opt.id} src={opt.image} alt="" className="w-7 h-7 rounded-full border-2 border-white object-cover" />
                        ) : (
                            <div key={idx} className="w-7 h-7 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-400">
                                {opt?.label.charAt(0)}
                            </div>
                        );
                    })}
                    {selectedValues.length > 3 && (
                        <div className="w-7 h-7 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-600">
                            +{selectedValues.length - 3}
                        </div>
                    )}
                </div>
            );
        }

        if (multiple) {
            return <span className="text-sm text-gray-900 truncate">{selectedValues.length} selected</span>;
        }

        const option = options.find(opt => opt.value === value);
        return (
            <div className="flex items-center gap-2 overflow-hidden">
                {option?.image && (
                    <img src={option.image} alt="" className="w-6 h-6 rounded-full object-cover shrink-0" />
                )}
                <span className="truncate text-sm text-gray-900 font-medium">{option?.label}</span>
            </div>
        );
    };

    return (
        <div className="space-y-1.5 w-full" ref={containerRef}>
            {label && (
                <label className="block text-sm font-semibold text-gray-700">
                    {label} {required && <span className="text-[#ec5b13]">*</span>}
                </label>
            )}

            <div className="relative">
                <button
                    type="button"
                    onClick={handleToggle}
                    className={`w-full flex items-center justify-between rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-left transition-all outline-none hover:bg-gray-100/50 min-h-[50px] ${isOpen ? 'border-[#ec5b13] ring-4 ring-[#ec5b13]/10' : ''
                        }`}
                >
                    <div className="flex items-center overflow-hidden">
                        {renderSelection()}
                    </div>
                    <ChevronDown className={`w-4 h-4 text-gray-400 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 text-[#ec5b13]' : ''}`} />
                </button>

                {isOpen && (
                    <div className="absolute z-50 mt-2 w-full max-h-72 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-xl ring-1 ring-black/5 animate-in fade-in zoom-in duration-100 flex flex-col">
                        <div className="p-2 border-bottom border-gray-50 bg-gray-50/30">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    autoFocus
                                    type="text"
                                    placeholder="Search..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-9 pr-4 py-2 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-[#ec5b13] focus:ring-2 focus:ring-[#ec5b13]/10 transition-all"
                                />
                            </div>
                        </div>
                        <div className="flex-1 overflow-auto p-1 space-y-0.5">
                            {filteredOptions.length === 0 ? (
                                <div className="px-4 py-8 text-center text-gray-400 text-sm italic">No results found</div>
                            ) : (
                                filteredOptions.map((option) => (
                                    <button
                                        key={option.id}
                                        type="button"
                                        onClick={() => handleSelect(option.value)}
                                        className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors ${isSelected(option.value)
                                            ? 'bg-[#ec5b13]/5 text-[#ec5b13]'
                                            : 'text-gray-700 hover:bg-gray-50'
                                            }`}
                                    >
                                        <div className="flex items-center gap-3 overflow-hidden">
                                            {option.image && (
                                                <img src={option.image} alt="" className="w-8 h-8 rounded-full object-cover shrink-0 border border-gray-100 shadow-sm" />
                                            )}
                                            <div className="flex flex-col text-left overflow-hidden">
                                                <span className={`truncate ${isSelected(option.value) ? 'font-bold' : 'font-medium'}`}>{option.label}</span>
                                                {option.subLabel && <span className="text-[10px] text-gray-500 truncate">{option.subLabel}</span>}
                                            </div>
                                        </div>
                                        {isSelected(option.value) && (
                                            <div className="w-4 h-4 rounded-full bg-[#ec5b13] flex items-center justify-center">
                                                <Check className="w-2.5 h-2.5 text-white stroke-[3px]" />
                                            </div>
                                        )}
                                    </button>
                                ))
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Select;
