import type { ChartData, ChartOptions } from 'chart.js';

export interface ChartDataPoint {
    time: string;
    green: number;
    orange: number;
    blue: number;
}

export type LineChartData = ChartData<'line'>;
export type LineChartOptions = ChartOptions<'line'>;
