import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle, ShieldCheck, Zap, Sparkles } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
  tag?: string;
}

const faqs: FaqItem[] = [
  {
    question: 'How does this Image Size Reducer compress files without uploading to a server?',
    answer:
      'Our tool operates 100% inside your web browser using modern WebAssembly and the HTML5 Canvas API. Your pictures are decoded, optimized, and compressed directly on your computer’s CPU/GPU. No images or metadata are ever transmitted across the internet, ensuring airtight privacy.',
    tag: 'Privacy',
  },
  {
    question: 'How do I reduce an image to a specific file size (like 100 KB or 500 KB)?',
    answer:
      'Select the "Target KB" compression mode in the settings panel, then choose a quick preset (e.g., 50 KB, 100 KB, 500 KB, 1 MB) or enter your exact desired kilobyte threshold. Our intelligent binary search algorithm iteratively balances quantization and resolution to achieve your target size accurately.',
    tag: 'Features',
  },
  {
    question: 'What is the difference between JPG, PNG, and WebP compression?',
    answer:
      'JPG is best for photographs with millions of colors; PNG preserves sharp lines, text, and transparent backgrounds using lossless compression; WebP is a next-generation format that achieves up to 35% smaller file sizes than JPG with identical visual quality and full transparency support.',
    tag: 'Formats',
  },
  {
    question: 'Are image EXIF metadata and GPS coordinates stripped for privacy?',
    answer:
      'Yes. When the canvas reconstructs the image pixels during compression, sensitive EXIF metadata (camera model, GPS geotag coordinates, timestamp, serial numbers) is automatically eliminated, ensuring your photos are safe to publish online.',
    tag: 'Security',
  },
  {
    question: 'Can I compress multiple images simultaneously and download them in a ZIP?',
    answer:
      'Yes. You can drag and drop dozens of images simultaneously. The batch engine compresses them concurrently and provides a one-click "Download All as ZIP" button with custom output filenames.',
    tag: 'Batch',
  },
  {
    question: 'Is there a limit on image resolution or file size?',
    answer:
      'Because compression runs locally on your device, there are no artificial server upload limits. You can compress high-resolution 4K, 8K, or 50MB+ photos quickly without waiting on slow network uploads.',
    tag: 'Performance',
  },
];

export const SeoFaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="w-full py-12 border-t border-slate-200 dark:border-slate-800" id="faq-section">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center space-y-3 mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Everything you need to know about Image Size Reduction
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
            Learn how client-side quantization, target file size tuning, and modern formats improve website speed and storage efficiency.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="border border-slate-200 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900/60 overflow-hidden transition-all shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 focus:outline-none"
                >
                  <div className="flex items-center gap-3">
                    {faq.tag && (
                      <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                        {faq.tag}
                      </span>
                    )}
                    <span className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                      {faq.question}
                    </span>
                  </div>
                  <div className="text-slate-400">
                    {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800/80 pt-3 animate-in fade-in duration-150">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
