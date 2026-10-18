import React from 'react';
import { BlogPost } from '../blogData';
import { 
  Calendar, 
  Clock, 
  User, 
  ChevronRight, 
  ArrowLeft, 
  ArrowRight,
  BookOpen, 
  Sparkles,
  Layers
} from 'lucide-react';
import { AdSlot } from '../components/AdSlot';
import { CommunityShare } from '../components/CommunityShare';

interface BlogPostPageProps {
  post: BlogPost;
  onNavigate: (route: string) => void;
}

export const BlogPostPage: React.FC<BlogPostPageProps> = ({ post, onNavigate }) => {
  // Simple markdown renderer for headers, bold, bullet points, tables
  const renderFormattedContent = (content: string) => {
    const lines = content.trim().split('\n');
    const elements: React.ReactNode[] = [];
    let keyIdx = 0;

    let inTable = false;
    let tableRows: string[][] = [];

    const flushTable = () => {
      if (tableRows.length > 0) {
        const headerRow = tableRows[0];
        const bodyRows = tableRows.slice(1);
        elements.push(
          <div key={`table-${keyIdx++}`} className="my-6 overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
            <table className="min-w-full text-xs sm:text-sm text-left divide-y divide-slate-200 dark:divide-slate-800">
              <thead className="bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-bold">
                <tr>
                  {headerRow.map((cell, cIdx) => (
                    <th key={cIdx} className="px-4 py-3">{cell.replace(/\*\*/g, '').trim()}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 bg-white dark:bg-slate-950">
                {bodyRows.map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/50">
                    {row.map((cell, cIdx) => (
                      <td key={cIdx} className="px-4 py-3 text-slate-600 dark:text-slate-400">
                        {renderInlineFormatting(cell.trim())}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
        tableRows = [];
        inTable = false;
      }
    };

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // Table line
      if (line.trim().startsWith('|') && line.trim().endsWith('|')) {
        inTable = true;
        // Skip separator line | :--- | :--- |
        if (line.includes('---')) continue;
        const cells = line.split('|').slice(1, -1).map(c => c.trim());
        tableRows.push(cells);
        continue;
      } else if (inTable) {
        flushTable();
      }

      if (line.startsWith('### ')) {
        elements.push(
          <h2 key={keyIdx++} className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-3">
            {line.replace('### ', '')}
          </h2>
        );
      } else if (line.startsWith('#### ')) {
        elements.push(
          <h3 key={keyIdx++} className="text-lg font-bold text-slate-900 dark:text-white mt-6 mb-2">
            {line.replace('#### ', '')}
          </h3>
        );
      } else if (line.startsWith('---')) {
        elements.push(
          <hr key={keyIdx++} className="my-8 border-slate-200 dark:border-slate-800" />
        );
      } else if (line.startsWith('1. ') || line.startsWith('2. ') || line.startsWith('3. ') || line.startsWith('4. ') || line.startsWith('5. ')) {
        elements.push(
          <div key={keyIdx++} className="flex items-start gap-2 text-sm sm:text-base text-slate-700 dark:text-slate-300 my-2">
            <span className="font-bold text-indigo-600 dark:text-indigo-400 shrink-0">{line.substring(0, 3)}</span>
            <div>{renderInlineFormatting(line.substring(3))}</div>
          </div>
        );
      } else if (line.startsWith('- ')) {
        elements.push(
          <div key={keyIdx++} className="flex items-start gap-2 text-sm sm:text-base text-slate-700 dark:text-slate-300 my-1.5 pl-2">
            <span className="text-indigo-500 shrink-0">•</span>
            <div>{renderInlineFormatting(line.replace('- ', ''))}</div>
          </div>
        );
      } else if (line.trim().length > 0) {
        elements.push(
          <p key={keyIdx++} className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed my-3">
            {renderInlineFormatting(line)}
          </p>
        );
      }
    }

    if (inTable) flushTable();
    return elements;
  };

  const renderInlineFormatting = (text: string): React.ReactNode => {
    // Replace internal links markdown [Text](/url)
    const linkRegex = /\[(.*?)\]\((\/.*?)\)/g;
    const parts: React.ReactNode[] = [];
    let lastIndex = 0;
    let match;

    while ((match = linkRegex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(processBoldAndCode(text.substring(lastIndex, match.index)));
      }
      const label = match[1];
      const target = match[2].replace(/^\//, '');
      parts.push(
        <a
          key={`link-${match.index}`}
          href={`/${target}`}
          onClick={(e) => {
            e.preventDefault();
            onNavigate(target);
          }}
          className="font-semibold text-indigo-600 dark:text-indigo-400 underline hover:text-indigo-700 dark:hover:text-indigo-300 mx-0.5 inline-block text-left"
        >
          {label}
        </a>
      );
      lastIndex = linkRegex.lastIndex;
    }

    if (lastIndex < text.length) {
      parts.push(processBoldAndCode(text.substring(lastIndex)));
    }

    return parts.length > 0 ? parts : processBoldAndCode(text);
  };

  const processBoldAndCode = (str: string): React.ReactNode => {
    // Quick handle for **bold** and `code`
    const regex = /(\*\*.*?\*\*|`.*?`)/g;
    const pieces = str.split(regex);
    return pieces.map((piece, idx) => {
      if (piece.startsWith('**') && piece.endsWith('**')) {
        return <strong key={idx} className="font-bold text-slate-900 dark:text-white">{piece.slice(2, -2)}</strong>;
      }
      if (piece.startsWith('`') && piece.endsWith('`')) {
        return <code key={idx} className="px-1.5 py-0.5 text-xs bg-slate-100 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 rounded font-mono">{piece.slice(1, -1)}</code>;
      }
      return piece;
    });
  };

  return (
    <div className="max-w-4xl mx-auto py-6 sm:py-10 space-y-8">
      
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
        <a href="/" onClick={(e) => { e.preventDefault(); onNavigate('home'); }} className="hover:text-indigo-600 dark:hover:text-indigo-400">
          Home
        </a>
        <ChevronRight className="w-3.5 h-3.5" />
        <a href="/blog" onClick={(e) => { e.preventDefault(); onNavigate('blog'); }} className="hover:text-indigo-600 dark:hover:text-indigo-400">
          Blog
        </a>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-slate-900 dark:text-white font-medium truncate max-w-[200px] sm:max-w-none">
          {post.title}
        </span>
      </nav>

      {/* Header */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs font-bold">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Application Guide</span>
        </div>

        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {post.h1}
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-slate-400 pt-2 border-b border-slate-200 dark:border-slate-800 pb-4">
          <span className="flex items-center gap-1.5 font-medium text-slate-700 dark:text-slate-300">
            <User className="w-3.5 h-3.5 text-indigo-500" />
            {post.author}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            {post.publishedDate}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            {post.readTime}
          </span>
        </div>
      </div>

      {/* Top Ad */}
      <AdSlot position="top" />

      {/* Main Article Content */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-sm">
        <div className="prose dark:prose-invert max-w-none">
          {renderFormattedContent(post.content)}
        </div>

        {/* In-Article Ad */}
        <AdSlot position="inArticle" />

        {/* Related Tools Box */}
        {post.relatedTools && post.relatedTools.length > 0 && (
          <div className="my-8 p-6 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/60">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-3">
              <Layers className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              Direct Tool Links Mentioned in This Guide:
            </h3>
            <div className="flex flex-wrap gap-2">
              {post.relatedTools.map((tool, idx) => (
                <a
                  key={idx}
                  href={tool.url}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate(tool.url.replace(/^\//, ''));
                  }}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white dark:bg-slate-900 text-xs font-semibold text-indigo-600 dark:text-indigo-400 border border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700 shadow-2xs transition-colors"
                >
                  <span>{tool.label}</span>
                  <ArrowRight className="w-3 h-3 text-slate-400" />
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Community Share */}
        <CommunityShare toolTitle={post.title} />
      </div>

      {/* Back to Blog */}
      <div className="pt-4">
        <a
          href="/blog"
          onClick={(e) => {
            e.preventDefault();
            onNavigate('blog');
          }}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Guides</span>
        </a>
      </div>

    </div>
  );
};
