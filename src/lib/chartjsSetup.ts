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
import type { LineChartOptions } from '../types/chart';
import { CHART_COLORS, CHART_GRADIENTS } from '../constants/colors';

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

/**
 * Provides default Chart.js configuration options with optional overrides.
 * 
 * @param {Partial<LineChartOptions>} overrides - Custom options to override defaults.
 * @returns {LineChartOptions} Merged chart options.
 */
export const getChartOptions = (overrides: Partial<LineChartOptions> = {}): LineChartOptions => {
    const defaultOptions: LineChartOptions = {
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
                    color: CHART_COLORS.GREEN,
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
                    color: CHART_COLORS.ORANGE,
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
                    color: CHART_COLORS.BLUE,
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
    };

    return {
        ...defaultOptions,
        ...overrides,
        plugins: {
            ...defaultOptions.plugins,
            ...overrides.plugins,
        },
        scales: {
            ...defaultOptions.scales,
            ...overrides.scales,
        }
    };
};

export type ColorType = 'green' | 'orange' | 'blue';

const GRADIENT_MAP: Record<ColorType, { START: string; END: string }> = {
    green: CHART_GRADIENTS.GREEN,
    orange: CHART_GRADIENTS.ORANGE,
    blue: CHART_GRADIENTS.BLUE,
};

/**
 * Creates a linear gradient for the chart datasets.
 * 
 * @param {CanvasRenderingContext2D} ctx - Canvas context.
 * @param {ColorType} type - Key representing the color theme.
 * @param {number} height - Height of the gradient.
 * @returns {CanvasGradient}
 */
export const getGradient = (ctx: CanvasRenderingContext2D, type: ColorType, height: number = 400) => {
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    const colors = GRADIENT_MAP[type];

    if (colors) {
        gradient.addColorStop(0, colors.START);
        gradient.addColorStop(1, colors.END);
    }

    return gradient;
};

export { ChartJS };
