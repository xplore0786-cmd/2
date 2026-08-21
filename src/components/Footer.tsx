import React from 'react';
import { ShieldCheck, Heart, Zap, Lock, Cpu, Globe } from 'lucide-react';
import { PageRoute } from '../types';

interface FooterProps {
  onNavigate: (route: PageRoute) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="w-full border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 transition-colors mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Col 1: About */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-sm">
                IR
              </div>
              <span className="font-bold text-slate-900 dark:text-white">Image Size Reducer</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Fast, privacy-first, in-browser image compression engine. Reduce image dimensions and file sizes up to 90% without compromising visual quality.
            </p>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400 pt-1">
              <ShieldCheck className="w-4 h-4" />
              <span>Zero server uploads. 100% Client-Side.</span>
            </div>
          </div>

          {/* Col 2: Compressors */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
              Tools & Formats
            </h4>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li>
                <button 
                  onClick={() => onNavigate('image-size-reducer')}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  Image Size Reducer
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('jpg-compressor')}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  JPG Compressor
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('png-compressor')}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  PNG Compressor & Optimizer
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('webp-compressor')}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  WebP Next-Gen Compressor
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Privacy & Security */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
              Security & Privacy
            </h4>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li className="flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-slate-400" />
                <span>No backend storage</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-slate-400" />
                <span>Local HTML5 Canvas engine</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-slate-400" />
                <span>Instant offline processing</span>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('privacy-policy')}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-medium underline"
                >
                  Read Privacy Architecture
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Legal & Contact */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
              Support & Legal
            </h4>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li>
                <button 
                  onClick={() => onNavigate('contact')}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  Contact & Feedback
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('privacy-policy')}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('terms')}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  Terms & Conditions
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-500">
          <p>© {new Date().getFullYear()} Image Size Reducer. Free, open, and private web application.</p>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1">
              Built for speed, privacy & performance
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};
