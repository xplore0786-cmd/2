import React from 'react';
import { ArrowLeft, FileText, CheckCircle2 } from 'lucide-react';
import { PageRoute } from '../types';

interface TermsPageProps {
  onNavigate: (route: PageRoute) => void;
}

export const TermsPage: React.FC<TermsPageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-4xl mx-auto py-6 sm:py-10 space-y-8 animate-in fade-in duration-200">
      <button
        type="button"
        onClick={() => onNavigate('home')}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Compressor</span>
      </button>

      <div className="space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold">
          <FileText className="w-4 h-4 text-indigo-500" />
          <span>Legal Agreement</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          Terms & Conditions
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Last updated: August 21, 2026
        </p>
      </div>

      <div className="prose dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 space-y-6 text-sm leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">1. Acceptance of Terms</h2>
          <p>
            By accessing or using the Image Size Reducer web application, you agree to be bound by these Terms and Conditions. If you disagree with any part of these terms, you may discontinue use of the service.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">2. Permitted Use</h2>
          <p>
            You are granted a free, non-exclusive, revocable license to use Image Size Reducer for personal, educational, or commercial purposes. You retain 100% full ownership and copyright over all image files processed through this application.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">3. Disclaimer of Warranties</h2>
          <p>
            The software is provided on an &quot;as is&quot; and &quot;as available&quot; basis without warranties of any kind, whether express or implied. While we strive to optimize image fidelity and file size reduction, we do not warrant that compression results will meet specific third-party portal criteria in every instance.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">4. Limitation of Liability</h2>
          <p>
            In no event shall Image Size Reducer or its developers be liable for any direct, indirect, incidental, or consequential damages resulting from the use or inability to use this web service.
          </p>
        </section>
      </div>
    </div>
  );
};
