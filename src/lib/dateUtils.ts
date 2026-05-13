/**
 * Safely parses a date string or Date object into a Date object.
 * Handles standard date strings and shorthand mock data like "Oct 20".
 */
export const parseSafeDate = (dateStr: string | Date | null | undefined): Date | null => {
    if (dateStr instanceof Date) return dateStr;
    if (!dateStr) return null;
    
    // Try standard parsing (works for ISO and some locales)
    const date = new Date(dateStr);
    if (!isNaN(date.getTime())) return date;

    // Try parsing dd/mm/yyyy format explicitly
    if (typeof dateStr === 'string' && dateStr.includes('/')) {
        const parts = dateStr.split('/');
        if (parts.length === 3) {
            const day = parseInt(parts[0], 10);
            const month = parseInt(parts[1], 10) - 1; // 0-indexed months
            const year = parseInt(parts[2], 10);
            const d = new Date(year, month, day);
            if (!isNaN(d.getTime())) return d;
        }
    }

    // Fallback for mock data like "Oct 20"
    try {
        const currentYear = new Date().getFullYear();
        const fallbackDate = new Date(`${dateStr}, ${currentYear}`);
        if (!isNaN(fallbackDate.getTime())) return fallbackDate;
    } catch {
        return null;
    }
    
    return null;
};

/**
 * Formats a date to "dd/mm/yyyy"
 */
export const formatDateDisplay = (date: Date | string): string => {
    if (!date) return 'Today';
    const d = date instanceof Date ? date : new Date(date);
    if (isNaN(d.getTime())) return 'Today';
    
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    
    return `${day}/${month}/${year}`;
};
