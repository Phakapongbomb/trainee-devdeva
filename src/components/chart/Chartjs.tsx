import React, { useMemo, useRef } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import type { ReusableChartProps, LineChartData } from '../../types/chart';
import { generateSampleData, getChartOptions, getGradient } from '../../lib/chartUtils';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

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

export const ReusableChart: React.FC<ReusableChartProps> = ({ data }) => {
    const finalData = useMemo(() => (data && data.length > 0 ? data : generateSampleData()), [data]);

    const chartData: LineChartData = {
        labels: finalData.map(d => d.time),
        datasets: [
            {
                label: 'สีเขียว',
                data: finalData.map(d => d.green),
                borderColor: '#34d399',
                backgroundColor: (context) => getGradient(context.chart.ctx, 'green'),
                yAxisID: 'yGreen',
                fill: true,
                tension: 0.4,
                pointRadius: 3,
                pointHoverRadius: 6,
                pointBackgroundColor: '#34d399',
                borderWidth: 2.5,
            },
            {
                label: 'สีส้ม',
                data: finalData.map(d => d.orange),
                borderColor: '#fbbf24',
                backgroundColor: (context) => getGradient(context.chart.ctx, 'orange'),
                yAxisID: 'yOrange',
                fill: true,
                tension: 0.4,
                pointRadius: 3,
                pointHoverRadius: 6,
                pointBackgroundColor: '#fbbf24',
                borderWidth: 2.5,
            },
            {
                label: 'สีน้ำเงิน',
                data: finalData.map(d => d.blue),
                borderColor: '#3b82f6',
                backgroundColor: (context) => getGradient(context.chart.ctx, 'blue'),
                yAxisID: 'yBlue',
                fill: true,
                tension: 0.4,
                pointRadius: 3,
                pointHoverRadius: 6,
                pointBackgroundColor: '#3b82f6',
                borderWidth: 2.5,
            }
        ]
    };

    const options = useMemo(() => getChartOptions(), []);

    return (
        <div className="w-full h-[400px]">
            <Line data={chartData} options={options} />
        </div>
    );
};

export default function ChartJSPage({ title = 'Daily Graph' }: { title: string }) {
    const chartContainerRef = useRef<HTMLDivElement>(null);

    const handleExportPDF = async () => {
        if (!chartContainerRef.current) return;

        try {
            // html2canvas has issues with oklch() colors in Tailwind v4.
            // We use HEX colors in the style attributes of the export container to avoid this.
            const canvas = await html2canvas(chartContainerRef.current, {
                scale: 2,
                useCORS: true,
                backgroundColor: '#ffffff',
                // This helps avoid issues with oklch in the document
                onclone: (clonedDoc) => {
                    const elements = clonedDoc.getElementsByTagName('*');
                    for (let i = 0; i < elements.length; i++) {
                        const el = elements[i] as HTMLElement;
                        if (el.style && el.style.color && el.style.color.includes('oklch')) {
                            el.style.color = '#64748b';
                        }
                    }
                }
            });

            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF({
                orientation: 'landscape',
                unit: 'px',
                format: [canvas.width, canvas.height]
            });

            pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
            pdf.save(`${title}.pdf`);
        } catch (error) {
            console.error('Error exporting PDF:', error);
            alert('Could not export PDF due to color format issues. Try using a browser that supports oklch or wait for a library update.');
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans">
            <div className="w-full max-w-5xl bg-white rounded-xl shadow-sm border border-slate-200 p-8">
                <div className="flex justify-between items-center mb-8">
                    {/* We use inline styles with HEX to avoid oklch issues in html2canvas */}
                    <h2 style={{ color: '#64748b' }} className="text-xl font-bold">{title}</h2>
                    <button 
                        onClick={handleExportPDF}
                        className="flex items-center space-x-2 text-purple-600 border border-purple-300 hover:bg-purple-50 px-4 py-2 rounded-lg text-sm font-medium transition-all shadow-sm"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <span>Export PDF</span>
                    </button>
                </div>

                {/* The area to be captured by html2canvas */}
                <div 
                    ref={chartContainerRef}
                    style={{ backgroundColor: '#ffffff', color: '#1e293b' }}
                >
                    <ReusableChart />
                </div>
            </div>
        </div>
    );
}