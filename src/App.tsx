import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { BeforeAfterModal } from './components/BeforeAfterModal';
import { HomePage } from './pages/HomePage';
import { ImageSizeReducerPage } from './pages/ImageSizeReducerPage';
import { JpgCompressorPage } from './pages/JpgCompressorPage';
import { PngCompressorPage } from './pages/PngCompressorPage';
import { WebpCompressorPage } from './pages/WebpCompressorPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsPage } from './pages/TermsPage';
import { ContactPage } from './pages/ContactPage';
import { ImageItem, ImageSettings, PageRoute } from './types';
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
  // Theme state
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('isr_theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  // Routing state
  const [currentRoute, setCurrentRoute] = useState<PageRoute>('home');

  // Images state
  const [items, setItems] = useState<ImageItem[]>([]);
  const [globalSettings, setGlobalSettings] = useState<ImageSettings>(DEFAULT_SETTINGS);
  const [isCompressing, setIsCompressing] = useState<boolean>(false);
  const [zipProgress, setZipProgress] = useState<number | null>(null);
  const [modalItem, setModalItem] = useState<ImageItem | null>(null);

  // Sync theme with HTML document class
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('isr_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('isr_theme', 'light');
    }
  }, [isDark]);

  // Sync URL Path with Route State on load and history navigation
  useEffect(() => {
    const syncRouteFromPath = () => {
      const path = window.location.pathname.replace(/^\/+|\/+$/g, '');
      const validRoutes: Record<string, PageRoute> = {
        '': 'home',
        'image-size-reducer': 'image-size-reducer',
        'jpg-compressor': 'jpg-compressor',
        'png-compressor': 'png-compressor',
        'webp-compressor': 'webp-compressor',
        'privacy-policy': 'privacy-policy',
        'terms': 'terms',
        'contact': 'contact',
      };
      if (validRoutes[path]) {
        setCurrentRoute(validRoutes[path]);
      }
    };

    syncRouteFromPath();
    window.addEventListener('popstate', syncRouteFromPath);
    return () => window.removeEventListener('popstate', syncRouteFromPath);
  }, []);

  // Update Document Title & Meta for SEO on route change
  useEffect(() => {
    const titles: Record<PageRoute, string> = {
      'home': 'Free Image Size Reducer Online – Compress Images',
      'image-size-reducer': 'Image Size Reducer – Target File Size Optimizer (100KB, 500KB)',
      'jpg-compressor': 'Free JPG Compressor Online – Reduce JPEG Size Without Losing Quality',
      'png-compressor': 'Free PNG Compressor Online – Lossless Transparent Image Optimizer',
      'webp-compressor': 'WebP Compressor & Converter – Reduce Web Image Size Up To 35%',
      'privacy-policy': 'Privacy Policy – 100% In-Browser Client-Side Processing',
      'terms': 'Terms and Conditions – Image Size Reducer',
      'contact': 'Contact Us – Image Size Reducer Support & Feedback',
    };

    if (titles[currentRoute]) {
      document.title = titles[currentRoute];
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentRoute]);

  const handleNavigate = (route: PageRoute) => {
    setCurrentRoute(route);
    const newPath = route === 'home' ? '/' : `/${route}`;
    if (window.location.pathname !== newPath) {
      window.history.pushState({}, '', newPath);
    }
  };

  // Compression Worker Runner
  const processImage = useCallback(async (item: ImageItem): Promise<ImageItem> => {
    try {
      const result = await compressSingleImage(item);
      return {
        ...item,
        status: 'done',
        compressedBlob: result.blob,
        compressedUrl: result.url,
        compressedSize: result.size,
        compressedWidth: result.width,
        compressedHeight: result.height,
        compressedType: result.mimeType,
        compressionRatio: result.ratio,
        errorMessage: undefined,
      };
    } catch (err: any) {
      return {
        ...item,
        status: 'error',
        errorMessage: err?.message || 'Compression error',
      };
    }
  }, []);

  // Handle Adding New Files
  const handleFilesSelected = async (newFiles: File[]) => {
    const newItems: ImageItem[] = [];

    for (const file of newFiles) {
      const previewUrl = URL.createObjectURL(file);
      let width = 0;
      let height = 0;

      try {
        const dims = await getImageDimensions(file);
        width = dims.width;
        height = dims.height;
      } catch {
        width = 800;
        height = 600;
      }

      newItems.push({
        id: `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
        file,
        name: file.name,
        originalSize: file.size,
        originalWidth: width,
        originalHeight: height,
        originalType: file.type || 'image/jpeg',
        previewUrl,
        status: 'compressing',
        settings: { ...globalSettings },
      });
    }

    setItems((prev) => [...prev, ...newItems]);
    setIsCompressing(true);

    // Process new items concurrently in batches of 3
    const processedList: ImageItem[] = [];
    for (let i = 0; i < newItems.length; i += 3) {
      const chunk = newItems.slice(i, i + 3);
      const results = await Promise.all(chunk.map((item) => processImage(item)));
      processedList.push(...results);

      // Incremental state update so UI shows progress immediately
      setItems((prev) =>
        prev.map((existing) => {
          const matched = results.find((r) => r.id === existing.id);
          return matched || existing;
        })
      );
    }

    setIsCompressing(false);
  };

  // Recompress Single Item
  const handleRecompressItem = async (id: string) => {
    const itemToUpdate = items.find((i) => i.id === id);
    if (!itemToUpdate) return;

    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: 'compressing' } : item))
    );

    const updated = await processImage({
      ...itemToUpdate,
      status: 'compressing',
    });

    setItems((prev) => prev.map((item) => (item.id === id ? updated : item)));
  };

  // Update Individual Item Settings
  const handleUpdateItemSettings = async (id: string, newSettings: ImageSettings) => {
    const itemToUpdate = items.find((i) => i.id === id);
    if (!itemToUpdate) return;

    const itemWithNewSettings: ImageItem = {
      ...itemToUpdate,
      settings: newSettings,
      status: 'compressing',
    };

    setItems((prev) =>
      prev.map((item) => (item.id === id ? itemWithNewSettings : item))
    );

    const updated = await processImage(itemWithNewSettings);
    setItems((prev) => prev.map((item) => (item.id === id ? updated : item)));
  };

  // Apply Global Settings To All Images and Re-compress
  const handleApplySettingsToAll = async () => {
    if (items.length === 0) return;
    setIsCompressing(true);

    const updatedQueue = items.map((item) => ({
      ...item,
      settings: { ...globalSettings },
      status: 'compressing' as const,
    }));

    setItems(updatedQueue);

    for (let i = 0; i < updatedQueue.length; i += 3) {
      const chunk = updatedQueue.slice(i, i + 3);
      const results = await Promise.all(chunk.map((item) => processImage(item)));
      setItems((prev) =>
        prev.map((existing) => {
          const matched = results.find((r) => r.id === existing.id);
          return matched || existing;
        })
      );
    }

    setIsCompressing(false);
  };

  // Remove Single Image
  const handleRemoveItem = (id: string) => {
    const target = items.find((i) => i.id === id);
    if (target) {
      if (target.previewUrl) URL.revokeObjectURL(target.previewUrl);
      if (target.compressedUrl) URL.revokeObjectURL(target.compressedUrl);
    }
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  // Clear All Images
  const handleClearAll = () => {
    items.forEach((item) => {
      if (item.previewUrl) URL.revokeObjectURL(item.previewUrl);
      if (item.compressedUrl) URL.revokeObjectURL(item.compressedUrl);
    });
    setItems([]);
  };

  // Download All as ZIP
  const handleDownloadAllZip = async () => {
    try {
      setZipProgress(0);
      await downloadAllAsZip(items, 'compressed-images.zip', (percent) => {
        setZipProgress(percent);
      });
      setTimeout(() => setZipProgress(null), 1200);
    } catch (err: any) {
      setZipProgress(null);
      alert(err.message || 'Failed to create ZIP archive');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      
      {/* Navigation Header */}
      <Navbar
        currentRoute={currentRoute}
        onNavigate={handleNavigate}
        isDark={isDark}
        onToggleTheme={() => setIsDark(!isDark)}
        queueCount={items.filter((i) => i.status === 'compressing').length}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        {currentRoute === 'home' && (
          <HomePage
            items={items}
            settings={globalSettings}
            onChangeSettings={setGlobalSettings}
            onFilesSelected={handleFilesSelected}
            onUpdateItemSettings={handleUpdateItemSettings}
            onRecompressItem={handleRecompressItem}
            onRemoveItem={handleRemoveItem}
            onPreviewItem={setModalItem}
            onApplySettingsToAll={handleApplySettingsToAll}
            onCompressAll={handleApplySettingsToAll}
            onDownloadAllZip={handleDownloadAllZip}
            onClearAll={handleClearAll}
            onNavigate={handleNavigate}
            isCompressing={isCompressing}
            zipProgress={zipProgress}
          />
        )}

        {currentRoute === 'image-size-reducer' && (
          <ImageSizeReducerPage
            items={items}
            settings={globalSettings}
            onChangeSettings={setGlobalSettings}
            onFilesSelected={handleFilesSelected}
            onUpdateItemSettings={handleUpdateItemSettings}
            onRecompressItem={handleRecompressItem}
            onRemoveItem={handleRemoveItem}
            onPreviewItem={setModalItem}
            onApplySettingsToAll={handleApplySettingsToAll}
            onCompressAll={handleApplySettingsToAll}
            onDownloadAllZip={handleDownloadAllZip}
            onClearAll={handleClearAll}
            onNavigate={handleNavigate}
            isCompressing={isCompressing}
            zipProgress={zipProgress}
          />
        )}

        {currentRoute === 'jpg-compressor' && (
          <JpgCompressorPage
            items={items}
            settings={globalSettings}
            onChangeSettings={setGlobalSettings}
            onFilesSelected={handleFilesSelected}
            onUpdateItemSettings={handleUpdateItemSettings}
            onRecompressItem={handleRecompressItem}
            onRemoveItem={handleRemoveItem}
            onPreviewItem={setModalItem}
            onApplySettingsToAll={handleApplySettingsToAll}
            onCompressAll={handleApplySettingsToAll}
            onDownloadAllZip={handleDownloadAllZip}
            onClearAll={handleClearAll}
            onNavigate={handleNavigate}
            isCompressing={isCompressing}
            zipProgress={zipProgress}
          />
        )}

        {currentRoute === 'png-compressor' && (
          <PngCompressorPage
            items={items}
            settings={globalSettings}
            onChangeSettings={setGlobalSettings}
            onFilesSelected={handleFilesSelected}
            onUpdateItemSettings={handleUpdateItemSettings}
            onRecompressItem={handleRecompressItem}
            onRemoveItem={handleRemoveItem}
            onPreviewItem={setModalItem}
            onApplySettingsToAll={handleApplySettingsToAll}
            onCompressAll={handleApplySettingsToAll}
            onDownloadAllZip={handleDownloadAllZip}
            onClearAll={handleClearAll}
            onNavigate={handleNavigate}
            isCompressing={isCompressing}
            zipProgress={zipProgress}
          />
        )}

        {currentRoute === 'webp-compressor' && (
          <WebpCompressorPage
            items={items}
            settings={globalSettings}
            onChangeSettings={setGlobalSettings}
            onFilesSelected={handleFilesSelected}
            onUpdateItemSettings={handleUpdateItemSettings}
            onRecompressItem={handleRecompressItem}
            onRemoveItem={handleRemoveItem}
            onPreviewItem={setModalItem}
            onApplySettingsToAll={handleApplySettingsToAll}
            onCompressAll={handleApplySettingsToAll}
            onDownloadAllZip={handleDownloadAllZip}
            onClearAll={handleClearAll}
            onNavigate={handleNavigate}
            isCompressing={isCompressing}
            zipProgress={zipProgress}
          />
        )}

        {currentRoute === 'privacy-policy' && (
          <PrivacyPolicyPage onNavigate={handleNavigate} />
        )}

        {currentRoute === 'terms' && (
          <TermsPage onNavigate={handleNavigate} />
        )}

        {currentRoute === 'contact' && (
          <ContactPage onNavigate={handleNavigate} />
        )}
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Before / After Inspection Modal */}
      {modalItem && (
        <BeforeAfterModal
          item={modalItem}
          onClose={() => setModalItem(null)}
        />
      )}

    </div>
  );
}
