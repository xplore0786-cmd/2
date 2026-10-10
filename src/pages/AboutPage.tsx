import React from 'react';
import { ShieldCheck, Cpu, Zap, Lock, Heart, CheckCircle2 } from 'lucide-react';
import { SITE_NAME } from '../config';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs font-semibold uppercase tracking-wider mb-4">
          <ShieldCheck className="w-4 h-4" />
          <span>About FreeImageResize</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Fast, Free & 100% Client-Side Image Resizer
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
          Built to make image resizing, passport photo formatting, and exact KB compression completely effortless, secure, and unlimited for students, job applicants, and professionals.
        </p>
      </div>

      {/* Mission / Background */}
      <div className="prose dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 space-y-6 text-sm sm:text-base leading-relaxed">
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Our Mission</h2>
          <p>
            Every year, millions of candidates in India and across the globe struggle with uploading photographs and signatures on official government recruitment portals (like SSC, UPSC, IBPS, State PSCs, and Railways) and passport sites. Strict limitations such as "must be between 20 KB and 50 KB" or "exact 35 x 45 mm at 300 DPI" force users to upload their sensitive biometric photos to insecure servers, pay expensive fees at cyber cafes, or battle complicated software.
          </p>
          <p className="mt-3">
            <strong>{SITE_NAME}</strong> was created with a clear philosophy: <em>image compression should be free, lightning fast, and 100% private</em>. By executing all image mathematics right inside your browser using modern WebAssembly and HTML5 Canvas, your files never touch any external server.
          </p>
        </div>

        {/* Core Principles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-600 mb-4">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">100% Private</h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Zero server uploads. Your photos, signatures, and personal ID cards are processed on your device's memory.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-950/60 flex items-center justify-center text-indigo-600 mb-4">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">Unlimited & Free</h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              No daily quotas, no mandatory sign-in walls, and no paywalls. Resize as many images as you need without friction.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-sky-100 dark:bg-sky-950/60 flex items-center justify-center text-sky-600 mb-4">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">Mathematical Precision</h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Binary search compression targets exact KB ranges (e.g. 20KB or 50KB) while retaining sharp readability of facial features and handwriting.
            </p>
          </div>
        </div>

        {/* Technology */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">How It Works Under the Hood</h2>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span><strong>HTML5 Canvas 2D:</strong> Renders image bitmaps with bicubic downsampling for ultra-clean lines.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span><strong>Binary Search Quantization:</strong> Automatically calculates the precise JPEG compression factor to match target KB limits.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span><strong>Client-Side Multi-Threading:</strong> Handles batch files smoothly on both low-end mobile phones and modern multi-core laptops.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
