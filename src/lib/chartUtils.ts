import type { ChartDataPoint, LineChartOptions, LineChartData } from '../types/chart';

export const generateSampleData = (): ChartDataPoint[] => {
    return Array.from({ length: 24 }).map((_, i) => ({
        time: `${String(i + 1).padStart(2, '0')}:00`,
        green: Math.floor(Math.random() * 30) + 60,   // Range: 60 - 90
        orange: Math.floor(Math.random() * 100) - 50, // Range: -50 - 50
        blue: Math.floor(Math.random() * 5) + 3,      // Range: 3 - 8
    }));
};


export const getChartOptions = (): LineChartOptions => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            position: 'bottom' as const,
            labels: {
                padding: 20,
                usePointStyle: true,
                pointStyle: 'circle',
                font: {
                    size: 12,
                    weight: 'bold'
                },
                color: '#64748b'
            }
        },
        tooltip: {
            backgroundColor: '#fff',
            titleColor: '#1e293b',
            bodyColor: '#1e293b',
            borderColor: '#e2e8f0',
            borderWidth: 1,
            padding: 12,
            boxPadding: 6,
            usePointStyle: true,
            callbacks: {
                label: function (context) {
                    let label = context.dataset.label || '';
                    if (label) {
                        label += ': ';
                    }
                    if (context.parsed.y !== null) {
                        label += context.parsed.y;
                    }
                    return label;
                }
            }
        }
    },
    scales: {
        x: {
            grid: {
                display: false
            },
            ticks: {
                color: '#94a3b8',
                font: {
                    size: 10
                }
            }
        },
        yGreen: {
            type: 'linear',
            display: true,
            position: 'left',
            min: 0,
            max: 100,
            grid: {
                color: '#f1f5f9',
                drawTicks: false,
            },
            border: {
                display: false
            },
            ticks: {
                color: '#34d399',
                font: {
                    size: 11,
                    weight: 'bold'
                },
                padding: 10,
                callback: (value) => (value === 0 || value === 100 ? value : '')
            }
        },
        yOrange: {
            type: 'linear',
            display: true,
            position: 'left',
            min: -100,
            max: 100,
            grid: {
                display: false,
            },
            border: {
                display: false
            },
            ticks: {
                color: '#fbbf24',
                font: {
                    size: 11,
                    weight: 'bold'
                },
                padding: 10,
                callback: (value) => (value === -100 || value === 100 ? value : '')
            }
        },
        yBlue: {
            type: 'linear',
            display: true,
            position: 'left',
            min: 0,
            max: 10,
            grid: {
                display: false,
            },
            border: {
                display: false
            },
            ticks: {
                color: '#3b82f6',
                font: {
                    size: 11,
                    weight: 'bold'
                },
                padding: 10,
                callback: (value) => (value === 0 || value === 10 ? value : '')
            }
        }
    },
    interaction: {
        mode: 'index' as const,
        intersect: false,
    }
});


export const getGradient = (ctx: CanvasRenderingContext2D, type: 'green' | 'orange' | 'blue') => {
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    switch (type) {
        case 'green':
            gradient.addColorStop(0, 'rgba(52, 211, 153, 0.3)');
            gradient.addColorStop(1, 'rgba(52, 211, 153, 0)');
            break;
        case 'orange':
            gradient.addColorStop(0, 'rgba(251, 191, 36, 0.4)');
            gradient.addColorStop(1, 'rgba(251, 191, 36, 0)');
            break;
        case 'blue':
            gradient.addColorStop(0, 'rgba(59, 130, 246, 0.3)');
            gradient.addColorStop(1, 'rgba(59, 130, 246, 0)');
            break;
    }
    return gradient;
};
