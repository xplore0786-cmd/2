import React, { useState, useEffect, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { BeforeAfterModal } from './components/BeforeAfterModal';
import { HomePage } from './pages/HomePage';
import { PresetPage } from './pages/PresetPage';
import { GovtJobsHubPage } from './pages/GovtJobsHubPage';
import { PassportPhotoHubPage } from './pages/PassportPhotoHubPage';
import { ResizeBySizeHubPage } from './pages/ResizeBySizeHubPage';
import { SocialMediaHubPage } from './pages/SocialMediaHubPage';
import { BlogHubPage } from './pages/BlogHubPage';
import { BlogPostPage } from './pages/BlogPostPage';
import { AboutPage } from './pages/AboutPage';
import { DisclaimerPage } from './pages/DisclaimerPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsPage } from './pages/TermsPage';
import { ContactPage } from './pages/ContactPage';
import { PricingPage } from './pages/PricingPage';
import { SupportPage } from './pages/SupportPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { ImageSizeReducerPage } from './pages/ImageSizeReducerPage';
import { JpgCompressorPage } from './pages/JpgCompressorPage';
import { PngCompressorPage } from './pages/PngCompressorPage';
import { WebpCompressorPage } from './pages/WebpCompressorPage';
import { SubscriptionModal } from './components/SubscriptionModal';
import { ImageItem, ImageSettings } from './types';
import { updatePageMeta } from './lib/seo';
import { SITE_NAME, SITE_URL } from './config';
import { getPresetBySlug, PRESETS } from './presets';
import { getBlogPostBySlug } from './blogData';
import { useI18n } from './lib/i18n';
import { 
  compressSingleImage, 
  downloadAllAsZip, 
  getImageDimensions 
} from './lib/compressor';

const DEFAULT_SETTINGS: ImageSettings = {
  preset: 'medium',
  quality: 0.75,
  format: 'original',
  resizeMode: 'original',
  resizePercent: 100,
  maintainAspectRatio: true,
  targetSizeKB: 100,
  stripMetadata: true,
  filenameSuffix: '-min',
};

export default function App() {
  const { t, language } = useI18n();

  // Theme state
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('isr_theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  // Routing state based on URL path
  const [currentRoute, setCurrentRoute] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname.replace(/^\/+|\/+$/g, '');
      return path || 'home';
    }
    return 'home';
  });

  // Images state for main compressor
  const [items, setItems] = useState<ImageItem[]>([]);
  const [globalSettings, setGlobalSettings] = useState<ImageSettings>(DEFAULT_SETTINGS);
  const [isCompressing, setIsCompressing] = useState<boolean>(false);
  const [zipProgress, setZipProgress] = useState<number | null>(null);
  const [modalItem, setModalItem] = useState<ImageItem | null>(null);

  // Sync theme with HTML document class
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      document.documentElement.style.colorScheme = 'dark';
      try { localStorage.setItem('isr_theme', 'dark'); } catch {}
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.style.colorScheme = 'light';
      try { localStorage.setItem('isr_theme', 'light'); } catch {}
    }
  }, [isDark]);

  // Handle URL navigation and popstate
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.replace(/^\/+|\/+$/g, '');
      setCurrentRoute(path || 'home');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigate = useCallback((route: string) => {
    const cleanRoute = route.replace(/^\/+|\/+$/g, '');
    const newPath = cleanRoute ? `/${cleanRoute}` : '/';
    
    if (window.location.pathname !== newPath) {
      window.history.pushState(null, '', newPath);
    }
    setCurrentRoute(cleanRoute || 'home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Update SEO Head Tags dynamically based on route
  useEffect(() => {
    const clean = currentRoute === 'home' ? '' : currentRoute;

    // Check if route is a preset
    const preset = getPresetBySlug(clean);
    if (preset) {
      updatePageMeta({
        title: `${preset.metaTitle} – ${SITE_NAME}`,
        description: preset.metaDescription,
        path: preset.slug,
        noindex: !preset.verified, // Exam & ID presets are verified:false -> noindex!
        breadcrumbs: [
          { name: 'Home', url: '/' },
          { name: preset.categoryLabel, url: `/${preset.category === 'govt-jobs' ? 'govt-jobs' : preset.category === 'passport-id' ? 'passport-photo' : 'resize-by-size'}` },
          { name: preset.title, url: `/${preset.slug}` }
        ],
        faqs: preset.faqs,
      });
      return;
    }

    // Check if route is a blog post
    if (clean.startsWith('blog/')) {
      const blogSlug = clean.replace('blog/', '');
      const post = getBlogPostBySlug(blogSlug);
      if (post) {
        updatePageMeta({
          title: `${post.metaTitle} – ${SITE_NAME}`,
          description: post.metaDescription,
          path: clean,
          isArticle: true,
          publishedDate: post.publishedDate,
          breadcrumbs: [
            { name: 'Home', url: '/' },
            { name: 'Blog', url: '/blog' },
            { name: post.title, url: `/blog/${post.slug}` }
          ],
        });
        return;
      }
    }

    // Static & Hub pages SEO
    switch (clean) {
      case '':
      case 'home':
        updatePageMeta({
          title: 'Resize Image to KB, Photo & Signature Resize for Govt Job Forms & Passports – FreeImageResize.online',
          description: 'Free online image resizer to reduce image to KB, crop and resize photos and signatures for govt job forms (SSC, UPSC, IBPS, Railways) and passport photos in your browser.',
          path: '',
        });
        break;

      case 'govt-jobs':
        updatePageMeta({
          title: `Govt Job Photo & Signature Resizers (SSC, UPSC, IBPS, Railways) – ${SITE_NAME}`,
          description: 'Resize photo and signature for SSC, UPSC, Bank PO/Clerk, Railway RRB, and Police recruitment forms online. Free and client-side private.',
          path: 'govt-jobs',
          breadcrumbs: [
            { name: 'Home', url: '/' },
            { name: 'Govt Jobs', url: '/govt-jobs' }
          ]
        });
        break;

      case 'passport-photo':
        updatePageMeta({
          title: `Passport Photo & ID Card Resizers (Indian Passport 35x45mm, US Visa, PAN) – ${SITE_NAME}`,
          description: 'Format passport and visa photos to official ICAO dimensions: 35x45 mm, 2x2 inch, 600x600 px, PAN card, and Aadhaar card. 100% free and in-browser.',
          path: 'passport-photo',
          breadcrumbs: [
            { name: 'Home', url: '/' },
            { name: 'Passport Photo', url: '/passport-photo' }
          ]
        });
        break;

      case 'resize-by-size':
        updatePageMeta({
          title: `Resize Image by KB Size & Dimensions (10KB, 20KB, 50KB, 100KB, 1080x1080) – ${SITE_NAME}`,
          description: 'Compress images to exact kilobyte limits (10KB to 1MB) or resize to custom dimensions, percentages, and centimeters at 300 DPI.',
          path: 'resize-by-size',
          breadcrumbs: [
            { name: 'Home', url: '/' },
            { name: 'Resize to KB', url: '/resize-by-size' }
          ]
        });
        break;

      case 'social-media-sizes':
        updatePageMeta({
          title: `Social Media Image Resizer (Instagram, YouTube Thumbnail, WhatsApp DP) – ${SITE_NAME}`,
          description: 'Resize images for Instagram posts (1080x1080) & stories (1080x1920), YouTube thumbnails (1280x720 under 2MB), WhatsApp DP, Facebook cover, and LinkedIn banners.',
          path: 'social-media-sizes',
          breadcrumbs: [
            { name: 'Home', url: '/' },
            { name: 'Social Media Sizes', url: '/social-media-sizes' }
          ]
        });
        break;

      case 'blog':
        updatePageMeta({
          title: `Image Resizing & Exam Upload Guides – ${SITE_NAME}`,
          description: 'Step-by-step guides on resizing photographs and signatures for SSC, UPSC, Bank, and Passport applications without rejection.',
          path: 'blog',
          breadcrumbs: [
            { name: 'Home', url: '/' },
            { name: 'Blog', url: '/blog' }
          ]
        });
        break;

      case 'about':
        updatePageMeta({
          title: `About Us – ${SITE_NAME}`,
          description: 'Learn about FreeImageResize: our mission to provide 100% free, private, client-side image compression for candidates and creators.',
          path: 'about',
          breadcrumbs: [
            { name: 'Home', url: '/' },
            { name: 'About', url: '/about' }
          ]
        });
        break;

      case 'disclaimer':
        updatePageMeta({
          title: `Official Disclaimer – ${SITE_NAME}`,
          description: 'Not affiliated with any government body or exam authority. Always verify photo and signature requirements with official notifications.',
          path: 'disclaimer',
          breadcrumbs: [
            { name: 'Home', url: '/' },
            { name: 'Disclaimer', url: '/disclaimer' }
          ]
        });
        break;

      case 'privacy-policy':
        updatePageMeta({
          title: `Privacy Policy – ${SITE_NAME}`,
          description: 'Zero server uploads. 100% client-side privacy architecture. Learn how all image compression executes in your local browser.',
          path: 'privacy-policy',
          breadcrumbs: [
            { name: 'Home', url: '/' },
            { name: 'Privacy Policy', url: '/privacy-policy' }
          ]
        });
        break;

      case 'terms':
        updatePageMeta({
          title: `Terms of Service – ${SITE_NAME}`,
          description: 'Terms of service and usage guidelines for FreeImageResize web application.',
          path: 'terms',
          breadcrumbs: [
            { name: 'Home', url: '/' },
            { name: 'Terms of Service', url: '/terms' }
          ]
        });
        break;

      case 'contact':
        updatePageMeta({
          title: `Contact Us – ${SITE_NAME}`,
          description: 'Get in touch with the FreeImageResize team for questions, feedback, or support.',
          path: 'contact',
          breadcrumbs: [
            { name: 'Home', url: '/' },
            { name: 'Contact', url: '/contact' }
          ]
        });
        break;

      case 'support':
        updatePageMeta({
          title: `Support FreeImageResize (UPI / Tip) – ${SITE_NAME}`,
          description: 'Support our free, independent tool. Help keep image resizing unlimited and free for students and job applicants across India.',
          path: 'support',
          breadcrumbs: [
            { name: 'Home', url: '/' },
            { name: 'Support', url: '/support' }
          ]
        });
        break;

      case 'pricing':
        updatePageMeta({
          title: `Pricing Plans – ${SITE_NAME}`,
          description: 'FreeImageResize is 100% free with unlimited image resizing. View optional plan details.',
          path: 'pricing',
          noindex: true,
        });
        break;

      case 'image-size-reducer':
      case 'jpg-compressor':
      case 'png-compressor':
      case 'webp-compressor':
        updatePageMeta({
          title: `${clean.replace(/-/g, ' ').toUpperCase()} Online – ${SITE_NAME}`,
          description: `Fast, client-side in-browser ${clean.replace(/-/g, ' ')}. Unlimited free compression without uploading to any server.`,
          path: clean,
          breadcrumbs: [
            { name: 'Home', url: '/' },
            { name: clean.replace(/-/g, ' '), url: `/${clean}` }
          ]
        });
        break;

      default:
        // 404 page: must have noindex!
        updatePageMeta({
          title: `404 Page Not Found – ${SITE_NAME}`,
          description: 'The requested page or tool preset does not exist.',
          path: clean,
          noindex: true,
        });
        break;
    }
  }, [currentRoute, language]);

  // Image processing handlers for main compressor on home
  const handleFilesSelected = async (newFiles: File[]) => {
    if (newFiles.length === 0) return;
    setIsCompressing(true);

    const newItems: ImageItem[] = [];
    for (const file of newFiles) {
      let origW = 800;
      let origH = 800;
      try {
        const dims = await getImageDimensions(file);
        origW = dims.width;
        origH = dims.height;
      } catch {
        // fallback
      }

      const newItem: ImageItem = {
        id: `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
        file,
        name: file.name,
        originalSize: file.size,
        originalWidth: origW,
        originalHeight: origH,
        originalType: file.type || 'image/jpeg',
        previewUrl: URL.createObjectURL(file),
        status: 'compressing',
        settings: { ...globalSettings },
      };

      try {
        const result = await compressSingleImage(newItem);
        newItem.compressedBlob = result.blob;
        newItem.compressedUrl = result.url;
        newItem.compressedSize = result.size;
        newItem.compressedWidth = result.width;
        newItem.compressedHeight = result.height;
        newItem.compressedType = result.mimeType;
        newItem.compressionRatio = result.ratio;
        newItem.status = 'done';
        newItem.meetsTargetRequirement = result.meetsRequirement;
        newItem.validationMessage = result.validationMessage;
      } catch (err: any) {
        newItem.status = 'error';
        newItem.errorMessage = err?.message || 'Compression failed';
      }

      newItems.push(newItem);
    }

    setItems((prev) => [...newItems, ...prev]);
    setIsCompressing(false);
  };

  const handleUpdateItemSettings = async (id: string, newSettings: ImageSettings) => {
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, settings: newSettings } : item)));
    const target = items.find((i) => i.id === id);
    if (!target) return;

    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, status: 'compressing' } : i)));
    try {
      const res = await compressSingleImage({ ...target, settings: newSettings });
      setItems((prev) => prev.map((i) => (i.id === id ? {
        ...i,
        compressedBlob: res.blob,
        compressedUrl: res.url,
        compressedSize: res.size,
        compressedWidth: res.width,
        compressedHeight: res.height,
        compressedType: res.mimeType,
        compressionRatio: res.ratio,
        status: 'done',
        meetsTargetRequirement: res.meetsRequirement,
        validationMessage: res.validationMessage,
      } : i)));
    } catch (err: any) {
      setItems((prev) => prev.map((i) => (i.id === id ? { ...i, status: 'error', errorMessage: err?.message } : i)));
    }
  };

  const handleRecompressItem = async (id: string) => {
    const target = items.find((i) => i.id === id);
    if (!target) return;
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, status: 'compressing' } : i)));
    try {
      const res = await compressSingleImage(target);
      setItems((prev) => prev.map((i) => (i.id === id ? {
        ...i,
        compressedBlob: res.blob,
        compressedUrl: res.url,
        compressedSize: res.size,
        compressedWidth: res.width,
        compressedHeight: res.height,
        compressedType: res.mimeType,
        compressionRatio: res.ratio,
        status: 'done',
        meetsTargetRequirement: res.meetsRequirement,
        validationMessage: res.validationMessage,
      } : i)));
    } catch (err: any) {
      setItems((prev) => prev.map((i) => (i.id === id ? { ...i, status: 'error', errorMessage: err?.message } : i)));
    }
  };

  const handleRemoveItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const handleApplySettingsToAll = async () => {
    if (items.length === 0) return;
    setIsCompressing(true);
    const updated = await Promise.all(
      items.map(async (item) => {
        const withNewSettings = { ...item, settings: { ...globalSettings } };
        try {
          const res = await compressSingleImage(withNewSettings);
          return {
            ...withNewSettings,
            compressedBlob: res.blob,
            compressedUrl: res.url,
            compressedSize: res.size,
            compressedWidth: res.width,
            compressedHeight: res.height,
            compressedType: res.mimeType,
            compressionRatio: res.ratio,
            status: 'done' as const,
            meetsTargetRequirement: res.meetsRequirement,
            validationMessage: res.validationMessage,
          };
        } catch (err: any) {
          return {
            ...withNewSettings,
            status: 'error' as const,
            errorMessage: err?.message,
          };
        }
      })
    );
    setItems(updated);
    setIsCompressing(false);
  };

  const handleClearAll = () => {
    items.forEach((i) => {
      if (i.previewUrl) URL.revokeObjectURL(i.previewUrl);
      if (i.compressedUrl) URL.revokeObjectURL(i.compressedUrl);
    });
    setItems([]);
  };

  const handleDownloadAllZip = async () => {
    if (items.length === 0) return;
    setZipProgress(0);
    await downloadAllAsZip(items, setZipProgress);
    setTimeout(() => setZipProgress(null), 1500);
  };

  // Route renderer
  const renderCurrentPage = () => {
    const clean = currentRoute === 'home' ? '' : currentRoute;

    // 1. Preset pages (SSC, UPSC, Indian Passport, 20KB, etc.)
    const preset = getPresetBySlug(clean);
    if (preset) {
      return (
        <PresetPage 
          preset={preset} 
          onNavigate={handleNavigate} 
          onOpenModal={(item) => setModalItem(item)} 
        />
      );
    }

    // 2. Individual Blog post
    if (clean.startsWith('blog/')) {
      const blogSlug = clean.replace('blog/', '');
      const post = getBlogPostBySlug(blogSlug);
      if (post) {
        return <BlogPostPage post={post} onNavigate={handleNavigate} />;
      }
      return <NotFoundPage onNavigate={handleNavigate} />;
    }

    // 3. Static & Hub pages
    switch (clean) {
      case '':
      case 'home':
        return (
          <HomePage
            items={items}
            settings={globalSettings}
            onChangeSettings={setGlobalSettings}
            onFilesSelected={handleFilesSelected}
            onUpdateItemSettings={handleUpdateItemSettings}
            onRecompressItem={handleRecompressItem}
            onRemoveItem={handleRemoveItem}
            onPreviewItem={(item) => setModalItem(item)}
            onApplySettingsToAll={handleApplySettingsToAll}
            onCompressAll={handleApplySettingsToAll}
            onDownloadAllZip={handleDownloadAllZip}
            onClearAll={handleClearAll}
            onNavigate={handleNavigate}
            isCompressing={isCompressing}
            zipProgress={zipProgress}
          />
        );

      case 'govt-jobs':
        return <GovtJobsHubPage onNavigate={handleNavigate} />;

      case 'passport-photo':
        return <PassportPhotoHubPage onNavigate={handleNavigate} />;

      case 'resize-by-size':
        return <ResizeBySizeHubPage onNavigate={handleNavigate} />;

      case 'social-media-sizes':
        return <SocialMediaHubPage onNavigate={handleNavigate} />;

      case 'blog':
        return <BlogHubPage onNavigate={handleNavigate} />;

      case 'about':
        return <AboutPage />;

      case 'disclaimer':
        return <DisclaimerPage />;

      case 'privacy-policy':
        return <PrivacyPolicyPage onNavigate={handleNavigate} />;

      case 'terms':
        return <TermsPage onNavigate={handleNavigate} />;

      case 'contact':
        return <ContactPage onNavigate={handleNavigate} />;

      case 'support':
        return <SupportPage onNavigate={handleNavigate} />;

      case 'pricing':
        return <PricingPage onNavigate={handleNavigate} />;

      case 'image-size-reducer':
        return <ImageSizeReducerPage onNavigate={handleNavigate} onFilesSelected={handleFilesSelected} />;

      case 'jpg-compressor':
        return <JpgCompressorPage onNavigate={handleNavigate} onFilesSelected={handleFilesSelected} />;

      case 'png-compressor':
        return <PngCompressorPage onNavigate={handleNavigate} onFilesSelected={handleFilesSelected} />;

      case 'webp-compressor':
        return <WebpCompressorPage onNavigate={handleNavigate} onFilesSelected={handleFilesSelected} />;

      default:
        return <NotFoundPage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors selection:bg-indigo-500 selection:text-white max-w-full overflow-x-clip">
      
      {/* Top Navbar */}
      <Navbar
        currentRoute={currentRoute}
        onNavigate={handleNavigate}
        isDark={isDark}
        onToggleTheme={() => setIsDark(!isDark)}
        queueCount={items.length}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 min-w-0">
        {renderCurrentPage()}
      </main>

      {/* Site Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Before/After Comparison Modal */}
      {modalItem && (
        <BeforeAfterModal
          item={modalItem}
          isOpen={!!modalItem}
          onClose={() => setModalItem(null)}
        />
      )}

      {/* Global Subscription Modal (hidden by default) */}
      <SubscriptionModal />

    </div>
  );
}
