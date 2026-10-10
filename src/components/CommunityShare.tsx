import React, { useState } from 'react';
import { 
  TELEGRAM_COMMUNITY_URL, 
  WHATSAPP_COMMUNITY_URL, 
  SITE_URL 
} from '../config';
import { Send, Share2, MessageCircle, Check, Copy } from 'lucide-react';

export interface CommunityShareProps {
  toolTitle?: string;
  toolUrl?: string;
}

export const CommunityShare: React.FC<CommunityShareProps> = ({ 
  toolTitle = 'Free Image Resizer & Compressor',
  toolUrl = typeof window !== 'undefined' ? window.location.href : SITE_URL,
}) => {
  const [copied, setCopied] = useState(false);

  const shareText = encodeURIComponent(
    `Check out ${toolTitle} - 100% free, private in-browser image and photo resizer for govt exams, passports, and KB limits: ${toolUrl}`
  );
  const whatsappShareUrl = `https://api.whatsapp.com/send?text=${shareText}`;

  const handleCopyLink = () => {
    try {
      navigator.clipboard.writeText(toolUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // fallback
    }
  };

  return (
    <div className="w-full my-6 p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Share2 className="w-4 h-4 text-indigo-500" />
            Share with Friends or Join Our Community
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Help other aspirants and friends easily resize photos for exam forms.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          {/* Share on WhatsApp */}
          <a
            href={whatsappShareUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors shadow-xs"
            title="Share on WhatsApp"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Share on WhatsApp</span>
          </a>

          {/* Join WhatsApp Channel */}
          {WHATSAPP_COMMUNITY_URL && (
            <a
              href={WHATSAPP_COMMUNITY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 transition-colors border border-emerald-200 dark:border-emerald-800"
              title="Join WhatsApp Group/Channel"
            >
              <span>WhatsApp Group</span>
            </a>
          )}

          {/* Join Telegram Community */}
          {TELEGRAM_COMMUNITY_URL && (
            <a
              href={TELEGRAM_COMMUNITY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-sky-700 dark:text-sky-300 bg-sky-50 dark:bg-sky-950/60 hover:bg-sky-100 transition-colors border border-sky-200 dark:border-sky-800"
              title="Join Telegram Channel"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Telegram Updates</span>
            </a>
          )}

          {/* Copy Link */}
          <button
            type="button"
            onClick={handleCopyLink}
            className="inline-flex items-center justify-center gap-1 px-3 py-2 rounded-xl text-xs font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            title="Copy Page Link"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied!' : 'Copy'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
