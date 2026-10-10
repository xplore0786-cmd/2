import React from 'react';
import { getPresetsByCategory } from '../presets';
import { 
  Maximize2, 
  ArrowRight, 
  Zap, 
  Layers, 
  HelpCircle,
  FileCheck
} from 'lucide-react';

interface ResizeBySizeHubPageProps {
  onNavigate: (route: string) => void;
}

export const ResizeBySizeHubPage: React.FC<ResizeBySizeHubPageProps> = ({ onNavigate }) => {
  const kbPresets = getPresetsByCategory('resize-to-kb');
  const dimPresets = getPresetsByCategory('dimensions');

  const faqs = [
    {
      question: 'How does binary search compression achieve exact target KB sizes?',
      answer: 'Our in-browser compression engine iteratively tests JPEG/WebP quality quantization parameters between 0.05 and 0.98. If an image is too large, it lowers quality; if under the target, it raises quality until the resulting file size sits comfortably just below your desired kilobyte threshold.'
    },
    {
      question: 'Will reducing an image to 20KB or 50KB make it blurry?',
      answer: 'Not if dimensions are proportional. Our engine balances canvas downsampling with chroma subsampling. By maintaining high contrast around text and facial features, the output remains sharp on standard screens.'
    },
    {
      question: 'How do you convert physical dimensions (cm/mm/inches) to digital pixels?',
      answer: 'At standard professional print resolution (300 DPI), 1 inch equals 300 pixels, and 1 centimeter equals approximately 118.11 pixels. Formula: Pixels = (Centimeters / 2.54) * DPI. Our tool performs this calculation automatically.'
    },
    {
      question: 'Can I compress images to an exact KB without uploading them to a server?',
      answer: 'Yes! FreeImageResize runs 100% inside your web browser using HTML5 Canvas and local JavaScript. Your images never leave your computer or phone.'
    }
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-12 py-6 sm:py-10">
      
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs font-bold">
          <Maximize2 className="w-3.5 h-3.5" />
          <span>Kilobyte Targets &amp; Dimensional Calibration</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          Resize Images by KB Size &amp; Dimensions
        </h1>

        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          Compress JPG, PNG, and WebP images to exact target kilobyte thresholds (10KB to 1MB) or scale to custom pixel resolutions, percentage ratios, and physical print centimeters or inches at 300 DPI.
        </p>
      </div>

      {/* Unique In-Depth Intro (250+ Words) */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed space-y-4 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          The Science of Precise Kilobyte and Dimensional Image Optimization
        </h2>
        <p>
          In the modern digital landscape, image file weight and pixel dimensions dictate whether a digital document will be accepted by an online application portal, display crisply on high-density Retina and OLED screens, or transmit reliably across constrained mobile network bandwidth. High-resolution camera sensors on modern smartphones capture uncompressed photographs ranging from 12 megapixels to over 108 megapixels, generating raw output files that routinely span between 3 megabytes and 25 megabytes.
        </p>
        <p>
          However, web portals—ranging from competitive university entrance exams and state recruitment forms to corporate human resource portals and web publishing systems—strictly limit file upload sizes to exact kilobyte thresholds like 20KB, 50KB, 100KB, or 200KB. Attempting to upload an image that exceeds these strict ceilings by even a single byte triggers immediate validation failure. Conversely, crude compression tools often degrade images into illegible, blurry artifacts with ruined text readability and muddy artifacts. Generic compression utilities only provide an ambiguous percentage slider, forcing users into tedious trial-and-error cycles.
        </p>
        <p>
          FreeImageResize eliminates guesswork through mathematical binary-search compression algorithms. When you specify a target file weight—such as 10 KB, 20 KB, 50 KB, 100 KB, 200 KB, 500 KB, or 1 MB—our engine dynamically computes the optimal JPEG quantization tables and dimension downsampling ratios to fit your exact requirements while preserving maximum visual contrast. Furthermore, our dimensional resizer allows you to scale images by precise pixel widths and heights, proportional percentages, or physical print measurements (centimeters, millimeters, inches) at professional 300 DPI resolution. With instant client-side execution, you achieve perfect results without uploading files to any external server.
        </p>
      </div>

      {/* Section 1: Resize to KB Grid with plain <a href> */}
      <div className="space-y-4">
        <div className="border-b border-slate-200 dark:border-slate-800 pb-2">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Zap className="w-5 h-5 text-indigo-500" />
            <span>Resize to Exact Kilobyte (KB) Limits</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Choose a target file weight to compress your image below portal upload ceilings.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {kbPresets.map((preset) => (
            <a
              key={preset.id}
              href={`/${preset.slug}`}
              onClick={(e) => {
                e.preventDefault();
                onNavigate(preset.slug);
              }}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs hover:border-indigo-400 dark:hover:border-indigo-600 hover:shadow-md transition-all flex flex-col justify-between no-underline text-inherit group"
            >
              <div>
                <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-2 py-0.5 rounded">
                  {preset.categoryLabel}
                </span>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white mt-2 mb-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {preset.title.split('Online')[0].trim()}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mb-3">
                  {preset.metaDescription}
                </p>
              </div>

              <div className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-semibold text-white bg-indigo-600 group-hover:bg-indigo-700 transition-colors">
                <span>Compress to {preset.items[0]?.maxKB} KB</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Section 2: Resize by Dimensions Grid with plain <a href> */}
      <div className="space-y-4">
        <div className="border-b border-slate-200 dark:border-slate-800 pb-2">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-indigo-500" />
            <span>Resize by Dimensions, Ratios &amp; Physical Units</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Pixel resolutions, aspect ratio cropping, percentage downscaling, and print-ready centimeters at 300 DPI.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {dimPresets.map((preset) => (
            <a
              key={preset.id}
              href={`/${preset.slug}`}
              onClick={(e) => {
                e.preventDefault();
                onNavigate(preset.slug);
              }}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs hover:border-indigo-400 dark:hover:border-indigo-600 hover:shadow-md transition-all flex flex-col justify-between no-underline text-inherit group"
            >
              <div>
                <span className="text-[10px] font-bold text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/60 px-2 py-0.5 rounded">
                  {preset.categoryLabel}
                </span>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white mt-2 mb-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {preset.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mb-3">
                  {preset.metaDescription}
                </p>
              </div>

              <div className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-semibold text-white bg-indigo-600 group-hover:bg-indigo-700 transition-colors">
                <span>Resize Dimensions</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* FAQs Section */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm">
        <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-indigo-500" />
          Frequently Asked Questions About KB Sizing &amp; Dimensions
        </h3>
        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div 
              key={idx} 
              className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800"
            >
              <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1.5">
                {faq.question}
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
