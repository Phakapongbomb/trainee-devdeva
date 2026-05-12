import React, { useMemo } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
    type ChartDataset
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import type { ReusableChartProps, LineChartData } from '../../types/chart';
import { generateSampleData, getChartOptions, getGradient, type ColorType } from '../../lib/chartUtils';
import { CHART_COLORS } from '../../constants/colors';

// Register Chart.js components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

const CHART_HEIGHT = 400;

const ReusableChart: React.FC<ReusableChartProps> = ({ data }) => {
    const finalData = useMemo(() => (data && data.length > 0 ? data : generateSampleData()), [data]);

    const chartData: LineChartData = useMemo(() => {
        const createDataset = (
            label: string,
            dataKey: keyof typeof finalData[0],
            color: string,
            colorType: ColorType,
            yAxisID: string
        ): ChartDataset<'line'> => ({
            label,
            data: finalData.map(d => d[dataKey] as number),
            borderColor: color,
            backgroundColor: (context) => getGradient(context.chart.ctx, colorType, CHART_HEIGHT),
            yAxisID,
            fill: true,
            tension: 0.4,
            pointRadius: 3,
            pointHoverRadius: 6,
            pointBackgroundColor: color,
            borderWidth: 2.5,
        });

        return {
            labels: finalData.map(d => d.time),
            datasets: [
                createDataset('สีเขียว', 'green', CHART_COLORS.GREEN, 'green', 'yGreen'),
                createDataset('สีส้ม', 'orange', CHART_COLORS.ORANGE, 'orange', 'yOrange'),
                createDataset('สีน้ำเงิน', 'blue', CHART_COLORS.BLUE, 'blue', 'yBlue'),
            ]
        };
    }, [finalData]);

    const options = useMemo(() => getChartOptions(), []);

    return (
        <div style={{ height: CHART_HEIGHT }} className="w-full">
            <Line data={chartData} options={options} />
        </div>
    );
};

export default ReusableChart;
