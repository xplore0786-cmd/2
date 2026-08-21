import React, { useState, useRef, useEffect } from 'react';
import { 
  X, 
  Download, 
  ZoomIn, 
  ZoomOut, 
  Maximize2, 
  Minimize2, 
  Split, 
  Columns, 
  Sparkles, 
  ArrowRight,
  ShieldCheck,
  Info
} from 'lucide-react';
import { ImageItem } from '../types';
import { calculateSavings, downloadBlob, formatBytes, generateOutputFilename, getFileExtension } from '../lib/compressor';

interface BeforeAfterModalProps {
  item: ImageItem | null;
  onClose: () => void;
}

export const BeforeAfterModal: React.FC<BeforeAfterModalProps> = ({ item, onClose }) => {
  const [sliderPosition, setSliderPosition] = useState(50); // percentage 0 - 100
  const [viewMode, setViewMode] = useState<'split' | 'side-by-side'>('split');
  const [zoom, setZoom] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!item || !item.compressedUrl) return null;

  const savings = calculateSavings(item.originalSize, item.compressedSize || item.originalSize);
  const outputExt = getFileExtension(item.compressedType || item.originalType).toUpperCase();
  const originalExt = getFileExtension(item.originalType).toUpperCase();

  const handlePointerMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percent);
  };

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  const handleDownload = () => {
    if (!item.compressedBlob) return;
    const filename = generateOutputFilename(
      item.name,
      item.compressedType || item.originalType,
      item.settings.filenameSuffix
    );
    downloadBlob(item.compressedBlob, filename);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200"
      id="before-after-modal"
    >
      <div className="relative w-full max-w-5xl h-[90vh] max-h-[850px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="truncate">
              <h3 className="text-base font-bold text-slate-900 dark:text-white truncate">
                {item.name}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Visual Quality & Pixel Fidelity Comparison
              </p>
            </div>
          </div>

          {/* View Controls & Close */}
          <div className="flex items-center gap-2">
            {/* View Mode Toggle */}
            <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
              <button
                type="button"
                onClick={() => setViewMode('split')}
                title="Split Slider View"
                className={`p-1.5 rounded-lg text-xs font-medium transition-all ${
                  viewMode === 'split'
                    ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                <Split className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode('side-by-side')}
                title="Side by Side View"
                className={`p-1.5 rounded-lg text-xs font-medium transition-all ${
                  viewMode === 'side-by-side'
                    ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                <Columns className="w-4 h-4" />
              </button>
            </div>

            {/* Zoom Controls */}
            <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
              <button
                type="button"
                onClick={() => setZoom((z) => Math.max(0.5, z - 0.25))}
                className="p-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                title="Zoom Out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="text-[11px] font-mono font-semibold px-1 text-slate-600 dark:text-slate-300">
                {Math.round(zoom * 100)}%
              </span>
              <button
                type="button"
                onClick={() => setZoom((z) => Math.min(3, z + 0.25))}
                className="p-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                title="Zoom In"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
            </div>

            {/* Close */}
            <button
              type="button"
              id="btn-close-modal"
              onClick={onClose}
              className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body / Image Viewport */}
        <div 
          className="flex-1 relative bg-slate-950/95 overflow-hidden flex items-center justify-center select-none"
          onMouseMove={(e) => isDragging && handlePointerMove(e.clientX)}
          onMouseUp={handleMouseUp}
          onTouchMove={(e) => {
            if (e.touches.length > 0) handlePointerMove(e.touches[0].clientX);
          }}
        >
          {viewMode === 'split' ? (
            /* Split Interactive Slider */
            <div 
              ref={containerRef}
              className="relative w-full h-full flex items-center justify-center overflow-hidden cursor-ew-resize"
              onMouseDown={(e) => {
                handleMouseDown();
                handlePointerMove(e.clientX);
              }}
              onTouchStart={(e) => {
                if (e.touches.length > 0) handlePointerMove(e.touches[0].clientX);
              }}
            >
              {/* Checkerboard transparency background */}
              <div 
                className="absolute inset-0 opacity-20 pointer-events-none"
                style={{
                  backgroundImage: `radial-gradient(#475569 1px, transparent 1px)`,
                  backgroundSize: '16px 16px',
                }}
              />

              {/* Compressed Image (Underneath) */}
              <div 
                className="absolute inset-0 flex items-center justify-center p-4 transition-transform duration-75"
                style={{ transform: `scale(${zoom})` }}
              >
                <img
                  src={item.compressedUrl}
                  alt="Compressed version"
                  className="max-w-full max-h-full object-contain pointer-events-none drop-shadow-2xl"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Original Image (Clipped overlay on left side) */}
              <div
                className="absolute inset-0 flex items-center justify-center p-4 overflow-hidden pointer-events-none"
                style={{
                  clipPath: `polygon(0% 0%, ${sliderPosition}% 0%, ${sliderPosition}% 100%, 0% 100%)`,
                }}
              >
                <div 
                  className="w-full h-full flex items-center justify-center transition-transform duration-75"
                  style={{ transform: `scale(${zoom})` }}
                >
                  <img
                    src={item.previewUrl}
                    alt="Original version"
                    className="max-w-full max-h-full object-contain drop-shadow-2xl"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>

              {/* Split Bar & Handle */}
              <div
                className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_10px_rgba(0,0,0,0.5)] z-20 pointer-events-none"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white text-slate-900 shadow-xl flex items-center justify-center border-2 border-indigo-600 pointer-events-auto cursor-ew-resize">
                  <div className="flex gap-0.5">
                    <span className="w-1 h-3 bg-slate-400 rounded-full" />
                    <span className="w-1 h-3 bg-slate-400 rounded-full" />
                  </div>
                </div>
              </div>

              {/* Dynamic Labels Floating on Screen */}
              <div className="absolute top-4 left-4 z-30 px-3 py-1.5 rounded-xl bg-slate-900/80 backdrop-blur border border-slate-700 text-white text-xs font-semibold flex items-center gap-1.5 shadow-lg">
                <span className="w-2 h-2 rounded-full bg-blue-400" />
                <span>Original ({formatBytes(item.originalSize)})</span>
              </div>

              <div className="absolute top-4 right-4 z-30 px-3 py-1.5 rounded-xl bg-slate-900/80 backdrop-blur border border-slate-700 text-white text-xs font-semibold flex items-center gap-1.5 shadow-lg">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>Compressed ({formatBytes(item.compressedSize || 0)})</span>
              </div>
            </div>
          ) : (
            /* Side by Side View */
            <div className="grid grid-cols-2 w-full h-full p-4 gap-4 overflow-auto">
              {/* Original */}
              <div className="relative flex flex-col items-center justify-center bg-slate-900/50 rounded-2xl border border-slate-800 p-2 overflow-hidden">
                <div className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded-lg bg-slate-900/80 backdrop-blur border border-slate-700 text-white text-xs font-medium">
                  Original • {formatBytes(item.originalSize)}
                </div>
                <div 
                  className="w-full h-full flex items-center justify-center transition-transform"
                  style={{ transform: `scale(${zoom})` }}
                >
                  <img
                    src={item.previewUrl}
                    alt="Original preview"
                    className="max-w-full max-h-full object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>

              {/* Compressed */}
              <div className="relative flex flex-col items-center justify-center bg-slate-900/50 rounded-2xl border border-slate-800 p-2 overflow-hidden">
                <div className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded-lg bg-emerald-950/80 backdrop-blur border border-emerald-700 text-emerald-300 text-xs font-medium">
                  Compressed • {formatBytes(item.compressedSize || 0)} (-{savings.percentSaved}%)
                </div>
                <div 
                  className="w-full h-full flex items-center justify-center transition-transform"
                  style={{ transform: `scale(${zoom})` }}
                >
                  <img
                    src={item.compressedUrl}
                    alt="Compressed preview"
                    className="max-w-full max-h-full object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer / Stats & Download */}
        <div className="p-4 sm:p-6 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Metrics comparison cards */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-slate-600 dark:text-slate-300">
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Original</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200">
                {item.originalWidth} × {item.originalHeight} px • {originalExt}
              </span>
            </div>

            <ArrowRight className="w-4 h-4 text-slate-400 hidden sm:block" />

            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Compressed</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200">
                {item.compressedWidth} × {item.compressedHeight} px • {outputExt}
              </span>
            </div>

            <div className="px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800">
              <span className="text-[10px] uppercase font-bold text-emerald-600 dark:text-emerald-400 block">Reduction</span>
              <span className="font-extrabold text-sm text-emerald-700 dark:text-emerald-300">
                Saved {formatBytes(savings.bytesSaved)} ({savings.percentSaved}%)
              </span>
            </div>
          </div>

          {/* Download Action */}
          <button
            type="button"
            id="btn-modal-download"
            onClick={handleDownload}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white text-sm font-bold shadow-lg shadow-indigo-600/20 transition-all"
          >
            <Download className="w-4 h-4" />
            <span>Download Compressed {outputExt}</span>
          </button>

        </div>

      </div>
    </div>
  );
};
