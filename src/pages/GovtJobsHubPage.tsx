import React from 'react';
import { getPresetsByCategory } from '../presets';
import { 
  Briefcase, 
  ArrowRight, 
  ShieldCheck, 
  FileCheck, 
  Zap,
  CheckCircle2,
  HelpCircle,
  AlertCircle
} from 'lucide-react';

interface GovtJobsHubPageProps {
  onNavigate: (route: string) => void;
}

export const GovtJobsHubPage: React.FC<GovtJobsHubPageProps> = ({ onNavigate }) => {
  const govtPresets = getPresetsByCategory('govt-jobs');

  const faqs = [
    {
      question: 'Why do government job application portals in India reject photo and signature uploads?',
      answer: 'Most portals run automated file validation scripts that inspect file size, pixel dimensions, and MIME headers. If your photo exceeds the upper kilobyte threshold, falls below the lower limit, uses incorrect aspect ratios, or has poor contrast, the server rejects the upload immediately.'
    },
    {
      question: 'Is it safe to compress biometric exam documents on this website?',
      answer: 'Yes, 100% safe. All image resizing, color conversion, and compression algorithms execute client-side directly within your browser. Your photographs, signatures, and personal documents are never transmitted to any external server or saved in the cloud.'
    },
    {
      question: 'Can I resize photos taken from my smartphone camera for govt exams?',
      answer: 'Yes. Modern smartphones produce photos between 3MB and 15MB. Our tool downsamples the resolution and optimizes JPEG quantization matrices so the image fits exact portal constraints while keeping facial features and signatures sharp.'
    },
    {
      question: 'What is the standard ink color required for signature uploads?',
      answer: 'Most statutory exam boards (such as SSC, IBPS, and State PSCs) mandate signing on plain unruled white paper with black or dark blue ink. Ruled paper or signatures written in block capital letters are generally disqualified.'
    }
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-12 py-6 sm:py-10">
      
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs font-bold">
          <Briefcase className="w-3.5 h-3.5" />
          <span>Government Job Exam Photo Tools</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          Govt Job Photo &amp; Signature Resizers
        </h1>

        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          Quickly crop and compress photos, signatures, thumb impressions, and handwritten declarations for SSC, UPSC, IBPS, Railways (RRB), State PSCs, NEET, and Police recruitment forms online. Free and client-side private.
        </p>
      </div>

      {/* Unique In-Depth Intro (250+ Words) */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed space-y-4 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          Why Online Recruitment Portals Require Strict Document Formatting
        </h2>
        <p>
          Every year, millions of ambitious aspirants across India prepare and apply for competitive central and state government recruitment examinations. These include high-stakes recruitment drives conducted by the Staff Selection Commission (SSC CGL, CHSL, MTS, CPO, GD Constable), Union Public Service Commission (UPSC Civil Services CSE, NDA, CDS, CMS), Institute of Banking Personnel Selection (IBPS PO, Clerk, SO, RRB), State Bank of India (SBI PO and Clerk), Railway Recruitment Boards (RRB NTPC, Group D, ALP, Technician), National Testing Agency (NEET, JEE, UGC NET), and numerous State Public Service Commissions such as BPSC, UPPSC, MPSC, TNPSC, and RPSC.
        </p>
        <p>
          Because government job portals handle tens of millions of concurrent candidate registrations on high-traffic days, recruitment servers strictly enforce programmatic validation checks on every uploaded document. Applicant photographs must strictly comply with precise pixel dimensions, aspect ratios, and kilobyte weight ceilings, while handwritten signatures, left thumb impressions, and handwritten declarations must fall within even stricter boundary thresholds. If your uploaded JPEG image is merely one single kilobyte larger than the mandated limit, or if inappropriate aspect ratio stretching distorts key facial landmarks, the submission portal immediately triggers fatal validation errors or disqualifies your application form.
        </p>
        <p>
          Historically, job seekers were forced to visit crowded local cyber cafes or purchase complex, expensive image editing software to resize their scanned photos. FreeImageResize completely solves this operational headache by offering specialized, automated image optimization presets for every major Indian recruitment exam. Utilizing high-performance client-side HTML5 Canvas and intelligent binary-search compression algorithms, our tool accurately crops and compresses your exam photographs and signatures to exact official specifications in under a second. Best of all, because 100% of the image processing executes locally within your browser sandbox, your personal identity files never leave your computer or smartphone, guaranteeing absolute privacy and data security.
        </p>
      </div>

      {/* Grid of ALL Govt Exam Tools Linking via plain <a href> */}
      <div className="space-y-4">
        <div className="border-b border-slate-200 dark:border-slate-800 pb-2">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <FileCheck className="w-5 h-5 text-indigo-500" />
            <span>Select Your Government Examination Tool</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Browse our dedicated exam presets to automatically format photographs, signatures, and certificates.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {govtPresets.map((preset) => (
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
                  <span className="text-[10px] text-slate-400">
                    {preset.items.length} {preset.items.length === 1 ? 'doc' : 'docs'}
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
                      {item.label.split('(')[0].trim()}: {item.minKB ? `${item.minKB}-${item.maxKB}KB` : `${item.maxKB}KB`}
                    </span>
                  ))}
                </div>
              </div>

              <div className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-indigo-600 group-hover:bg-indigo-700 transition-colors shadow-xs">
                <span>Open {preset.title.split('(')[0].trim()}</span>
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
          Frequently Asked Questions About Govt Exam Image Uploads
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
