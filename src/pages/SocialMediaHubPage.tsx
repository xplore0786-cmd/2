import React from 'react';
import { getPresetsByCategory } from '../presets';
import { 
  Share2, 
  ArrowRight, 
  HelpCircle,
  FileCheck
} from 'lucide-react';

interface SocialMediaHubPageProps {
  onNavigate: (route: string) => void;
}

export const SocialMediaHubPage: React.FC<SocialMediaHubPageProps> = ({ onNavigate }) => {
  const socialPresets = getPresetsByCategory('social');

  const faqs = [
    {
      question: 'What is the best image resolution for Instagram posts in 2026?',
      answer: 'The optimal resolution for standard square Instagram feed posts is 1080 x 1080 pixels (1:1 aspect ratio). For vertical portrait posts that maximize mobile screen real estate, use 1080 x 1350 pixels (4:5 ratio). For Stories and Reels covers, use 1080 x 1920 pixels (9:16 ratio).'
    },
    {
      question: 'Why does YouTube reject thumbnail uploads over 2MB?',
      answer: 'YouTube Studio imposes a strict 2 MB maximum file limit for custom video thumbnails, alongside a 1280 x 720 pixel resolution requirement (minimum width of 640 pixels). If your PNG or JPG file exceeds 2048 KB, the creator upload dialog fails. Our YouTube preset automatically compresses the file beneath 2MB while keeping text and graphics crisp.'
    },
    {
      question: 'How can I make a full-size picture fit WhatsApp DP without cropping?',
      answer: 'WhatsApp profile pictures demand a 1:1 square crop. To display rectangular portrait or landscape photos as your DP without cutting off heads or backgrounds, use our WhatsApp DP preset. It adds complementary neutral padding to create a perfect square frame without cropping any part of your original photograph.'
    },
    {
      question: 'What are the recommended dimensions for LinkedIn company banners and profile pictures?',
      answer: 'LinkedIn personal profile banners require 1584 x 396 pixels (4:1 aspect ratio), while company page banners require 1128 x 191 pixels. Profile pictures should be formatted at 400 x 400 pixels under 8 MB.'
    }
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-12 py-6 sm:py-10">
      
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs font-bold">
          <Share2 className="w-3.5 h-3.5" />
          <span>Social Media Dimension Presets</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          Social Media Image Resizers
        </h1>

        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          Optimize and format your images for Instagram posts and stories, YouTube thumbnails (1280x720 under 2MB), full WhatsApp profile pictures (DP) without cropping, Facebook covers, LinkedIn banners, and X headers.
        </p>
      </div>

      {/* Unique In-Depth Intro (250+ Words) */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed space-y-4 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          Why Precise Social Media Image Dimensions and Compression Matter
        </h2>
        <p>
          In the modern social media ecosystem, visual content is the primary driver of digital engagement, brand perception, and click-through performance across platforms like Instagram, YouTube, WhatsApp, Facebook, LinkedIn, and X (formerly Twitter). However, each social platform employs distinct compression algorithms, viewport aspect ratios, and strict file weight restrictions that can severely degrade the visual quality of unoptimized photos.
        </p>
        <p>
          When you upload an oversized image to Instagram, YouTube, or WhatsApp, the platform's automated image ingestion pipeline forcefully downsamples and recompresses the file. This aggressive automated recompression frequently introduces unsightly JPEG artifacts, muddy color gradients, and awkward automated cropping that slices through facial features, typography, or critical compositional details. For example, YouTube thumbnails mandate an exact 16:9 widescreen ratio (1280x720 pixels) capped strictly at 2 MB; exceeding this limit results in failed uploads. Meanwhile, Instagram feeds favor the 1:1 square (1080x1080 pixels) or 4:5 portrait (1080x1350 pixels) format, and WhatsApp profile photos require a square crop to prevent annoying circular cutoff.
        </p>
        <p>
          FreeImageResize provides purpose-built, zero-compromise social media presets calibrated to the exact pixel dimensions and compression parameters demanded by each network. Instead of wrestling with complicated desktop photo editing suites or risking mobile upload errors, you can format, crop, and compress your banners, stories, posts, and thumbnails directly in your web browser. All image processing executes locally on your device using HTML5 Canvas, ensuring instant exports, zero server latency, and 100% privacy.
        </p>
      </div>

      {/* Grid of ALL Social Media Tools via plain <a href> */}
      <div className="space-y-4">
        <div className="border-b border-slate-200 dark:border-slate-800 pb-2">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <FileCheck className="w-5 h-5 text-indigo-500" />
            <span>Select Your Social Media Platform Preset</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Browse our dedicated presets to format, crop, and compress graphics for any social network.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {socialPresets.map((preset) => (
            <a
              key={preset.id}
              href={`/${preset.slug}`}
              onClick={(e) => {
                e.preventDefault();
                onNavigate(preset.slug);
              }}
              className="flex flex-col justify-between p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-indigo-400 dark:hover:border-indigo-600 hover:shadow-md transition-all group no-underline text-inherit"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-2.5 py-1 rounded-lg">
                    {preset.categoryLabel}
                  </span>
                  <span className="text-[10px] text-slate-400 font-semibold">
                    {preset.items[0]?.aspectRatio || 'Custom'}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors mb-2">
                  {preset.title}
                </h3>

                <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed mb-4">
                  {preset.metaDescription}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {preset.items.map((item) => (
                    <span 
                      key={item.id}
                      className="text-[10px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded-md"
                    >
                      {item.label}: {item.widthPx ? `${item.widthPx}x${item.heightPx}px` : 'Adaptive'}
                    </span>
                  ))}
                </div>
              </div>

              <div className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-indigo-600 group-hover:bg-indigo-700 transition-colors shadow-xs">
                <span>Format Image</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* FAQs Section */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm">
        <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-indigo-500" />
          Frequently Asked Questions About Social Media Dimensions
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
