import React, { forwardRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { format } from 'date-fns';

interface CalendarProps {
    selectedDate: Date | null;
    onChange: (date: Date | null) => void;
    label?: string;
    placeholder?: string;
}

interface CustomInputProps {
    value?: string;
    onClick?: () => void;
    placeholder?: string;
}

const CustomDateInput = forwardRef<HTMLDivElement, CustomInputProps>(({ value, onClick, placeholder }, ref) => (
    <div
        ref={ref}
        onClick={onClick}
        className="relative flex items-stretch w-full rounded-lg border border-gray-200 bg-gray-50/50 focus-within:border-[#ec5b13] focus-within:ring-4 focus-within:ring-[#ec5b13]/10 transition-all cursor-pointer group"
    >
        <input
            readOnly
            tabIndex={-1}
            value={value}
            placeholder={placeholder}
            className="flex-1 appearance-none rounded-l-lg border-0 bg-transparent px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-0 cursor-pointer pointer-events-none"
        />
        <div className="flex items-center justify-center px-3 text-gray-400 border-l border-gray-100 group-hover:text-[#ec5b13] transition-colors">
            <CalendarIcon className="w-5 h-5" />
        </div>
    </div>
));

const Calendar: React.FC<CalendarProps> = ({ selectedDate, onChange, label = "Due Date", placeholder = "Select date" }) => {
    return (
        <div className="relative z-20 w-full">
            {label && (
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    {label}
                </label>
            )}

            <DatePicker
                selected={selectedDate}
                onChange={onChange}
                customInput={<CustomDateInput placeholder={placeholder} />}
                dateFormat="dd/MM/yyyy"
                wrapperClassName="w-full"
                showPopperArrow={false}
                popperPlacement="bottom-start"
                portalId="root"
                popperProps={{
                    strategy: 'fixed'
                }}
                renderCustomHeader={({
                    date,
                    decreaseMonth,
                    increaseMonth,
                    prevMonthButtonDisabled,
                    nextMonthButtonDisabled,
                }) => (
                    <div className="flex items-center justify-between px-2 py-2">
                        <button
                            onClick={decreaseMonth}
                            disabled={prevMonthButtonDisabled}
                            type="button"
                            className="p-1.5 hover:bg-gray-100 rounded-full text-gray-600 transition-colors disabled:opacity-50"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <span className="font-semibold text-gray-900 text-base">
                            {format(date, 'MMMM yyyy')}
                        </span>
                        <button
                            onClick={increaseMonth}
                            disabled={nextMonthButtonDisabled}
                            type="button"
                            className="p-1.5 hover:bg-gray-100 rounded-full text-gray-600 transition-colors disabled:opacity-50"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                )}
                calendarClassName="!border-gray-200 !rounded-xl !shadow-xl !p-2 !font-sans !bg-white"
                dayClassName={() =>
                    "!rounded-full !w-9 !h-9 !inline-flex !items-center !justify-center !m-0.5 !transition-colors !cursor-pointer"
                }
            />
        </div>
    );
};

export default Calendar;