import React from 'react';
import { BLOG_POSTS, BlogPost } from '../blogData';
import { BookOpen, Calendar, Clock, ArrowRight, User } from 'lucide-react';

interface BlogHubPageProps {
  onNavigate: (route: string) => void;
}

export const BlogHubPage: React.FC<BlogHubPageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-5xl mx-auto space-y-10 py-6 sm:py-10">
      
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs font-bold">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Guides, Tutorials & Portal Updates</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          Image Resizing & Exam Upload Guides
        </h1>

        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          Comprehensive tutorials to help candidates, students, and professionals prepare compliant photographs, signatures, and biometric uploads for SSC, UPSC, Bank PO, Railways, and Passport portals.
        </p>
      </div>

      {/* Grid of Articles */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {BLOG_POSTS.map((post) => (
          <article
            key={post.slug}
            className="flex flex-col justify-between p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-indigo-300 dark:hover:border-indigo-700 transition-all group"
          >
            <div>
              <div className="flex items-center gap-3 text-[11px] text-slate-400 mb-3">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {post.publishedDate}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {post.readTime}
                </span>
              </div>

              <h2 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2 mb-2">
                {post.title}
              </h2>

              <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed mb-4">
                {post.excerpt}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80">
              <button
                type="button"
                onClick={() => onNavigate(`blog/${post.slug}`)}
                className="w-full inline-flex items-center justify-between text-xs font-bold text-indigo-600 dark:text-indigo-400 group-hover:text-indigo-700 dark:group-hover:text-indigo-300"
              >
                <span>Read Full Guide</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </article>
        ))}
      </div>

    </div>
  );
};
