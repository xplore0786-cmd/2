import React from 'react';
import { ShieldCheck, Lock, Cpu, EyeOff, ServerOff, CheckCircle2, ArrowLeft } from 'lucide-react';
import { PageRoute } from '../types';

interface PrivacyPolicyPageProps {
  onNavigate: (route: PageRoute) => void;
}

export const PrivacyPolicyPage: React.FC<PrivacyPolicyPageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-4xl mx-auto py-6 sm:py-10 space-y-8 animate-in fade-in duration-200">
      
      {/* Back to tool button */}
      <button
        type="button"
        onClick={() => onNavigate('home')}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Compressor</span>
      </button>

      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-bold">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span>Strict Privacy Commitment</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          Privacy Policy & Architecture
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Last updated: August 21, 2026 • 100% Client-Side In-Browser Processing Guarantee
        </p>
      </div>

      {/* Architecture Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center font-bold">
            <ServerOff className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-sm text-slate-900 dark:text-white">Zero Server Uploads</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            No image files, binary blobs, or image previews are ever uploaded to remote servers or cloud storage.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 flex items-center justify-center font-bold">
            <Cpu className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-sm text-slate-900 dark:text-white">Local CPU & Canvas</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            All compression, resampling, format encoding, and ZIP packaging run natively in your browser.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
          <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950 text-purple-600 flex items-center justify-center font-bold">
            <EyeOff className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-sm text-slate-900 dark:text-white">Metadata Stripping</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Sensitive EXIF data, GPS coordinates, and camera serial numbers are automatically stripped.
          </p>
        </div>
      </div>

      {/* Full Policy Body */}
      <div className="prose dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 space-y-6 text-sm leading-relaxed">
        
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">1. Introduction</h2>
          <p>
            Image Size Reducer was engineered from the ground up with an absolute, uncompromising commitment to user privacy. Unlike traditional cloud-based image converters that require uploading your sensitive photos to third-party servers, our application executes the entirety of its compression pipeline locally inside your client web browser.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">2. How Your Images Are Processed</h2>
          <p>
            When you select or drop an image file into the application:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
            <li>Your browser decodes the file using standard HTML5 Canvas and Web APIs directly in your local device memory.</li>
            <li>Compression quantization, color downsampling, and dimensions resizing are computed using your computer's local processor (CPU/GPU).</li>
            <li>The generated output file and ZIP archives are constructed strictly in client memory using Web Workers and Blob URLs.</li>
            <li>No network packets containing image bytes are dispatched across the internet.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">3. Information We Collect</h2>
          <p>
            We do not collect any personal data, images, filenames, IP addresses, or tracking logs. Your files exist only for the duration of your browser session and vanish immediately when you close or reload the tab.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">4. Offline Availability</h2>
          <p>
            Because all compression logic resides in static client JavaScript and HTML5 Canvas, the application continues to compress images even when your computer is completely disconnected from the internet.
          </p>
        </section>

      </div>
    </div>
  );
};
