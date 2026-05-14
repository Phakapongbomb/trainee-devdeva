import type { ChartDataPoint } from '../features/charts/types/chart';

/**
 * Generates sample data for the line chart.
 * This is a pure helper function for generating mock data.
 * 
 * @returns {ChartDataPoint[]} Array of 24 data points representing 24 hours.
 */
export const generateSampleData = (): ChartDataPoint[] => {
    return Array.from({ length: 24 }).map((_, i) => ({
        time: `${String(i + 1).padStart(2, '0')}:00`,
        green: Math.floor(Math.random() * 30) + 60,   // Range: 60 - 90
        orange: Math.floor(Math.random() * 100) - 50, // Range: -50 - 50
        blue: Math.floor(Math.random() * 5) + 3,      // Range: 3 - 8
    }));
};
