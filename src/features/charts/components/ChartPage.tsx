import { useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import ReusableChart from './ReusableChart';

export default function ChartPage({ title = 'Daily Graph' }: { title: string }) {
    const chartContainerRef = useRef<HTMLDivElement>(null);

    const handleExportPDF = async () => {
        if (!chartContainerRef.current) return;

        try {
            const canvas = await html2canvas(chartContainerRef.current, {
                scale: 4, // Increased scale for better resolution
                useCORS: true,
                backgroundColor: '#ffffff',
                onclone: (clonedDoc) => {
                    // Hide the export button in the PDF
                    const exportBtn = clonedDoc.getElementById('export-pdf-button');
                    if (exportBtn) {
                        exportBtn.style.display = 'none';
                    }

                    // Handle oklch colors for html2canvas compatibility
                    const elements = clonedDoc.getElementsByTagName('*');
                    for (let i = 0; i < elements.length; i++) {
                        const el = elements[i] as HTMLElement;
                        const style = window.getComputedStyle(el);
                        if (style.color.includes('oklch')) el.style.color = '#64748b';
                        if (style.backgroundColor.includes('oklch')) el.style.backgroundColor = '#ffffff';
                        if (style.borderColor.includes('oklch')) el.style.borderColor = '#e2e8f0';
                        if (style.fill.includes('oklch')) el.style.fill = '#64748b';
                        if (style.stroke.includes('oklch')) el.style.stroke = '#64748b';
                    }
                }
            });

            const imgData = canvas.toDataURL('image/png', 1.0);
            const pdf = new jsPDF({
                orientation: 'landscape',
                unit: 'mm',
                format: 'a4'
            });

            const pageWidth = pdf.internal.pageSize.getWidth();
            const pageHeight = pdf.internal.pageSize.getHeight();

            // Calculate dimensions to fit A4 while preserving aspect ratio
            const imgWidth = canvas.width;
            const imgHeight = canvas.height;
            const ratio = Math.min(pageWidth / imgWidth, pageHeight / imgHeight);

            const finalWidth = imgWidth * ratio;
            const finalHeight = imgHeight * ratio;

            // Center the content
            const x = (pageWidth - finalWidth) / 2;
            const y = (pageHeight - finalHeight) / 2;

            pdf.addImage(imgData, 'PNG', x, y, finalWidth, finalHeight, undefined, 'FAST');
            pdf.save(`${title.toLowerCase().replace(/\s+/g, '-')}.pdf`);
        } catch (error) {
            console.error('Error exporting PDF:', error);
            alert('Could not export PDF. Please try again.');
        }
    };


    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-2 sm:p-4 font-sans">
            <div
                ref={chartContainerRef}
                className="w-full max-w-5xl bg-white rounded-xl shadow-sm border border-slate-200 p-4 sm:p-8"
            >
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
                    <h2 className="text-xl font-bold text-slate-500">{title}</h2>
                    <button
                        id="export-pdf-button"
                        onClick={handleExportPDF}
                        className="flex items-center justify-center space-x-2 text-purple-600 border border-purple-300 hover:bg-purple-50 px-4 py-2.5 rounded-lg text-sm font-medium transition-all shadow-sm active:scale-95"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <span>Export PDF</span>
                    </button>
                </div>

                <div className="bg-white text-slate-800 overflow-x-auto overflow-y-hidden">
                    <div className="min-w-[600px] sm:min-w-0">
                        <ReusableChart />
                    </div>
                </div>
            </div>
        </div>
    );
}