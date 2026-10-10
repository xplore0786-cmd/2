import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type SupportedLanguage = 'en' | 'hinglish';

export interface LanguageOption {
  code: SupportedLanguage;
  name: string;
  nativeName: string;
  flag: string;
  dir: 'ltr';
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧', dir: 'ltr' },
  { code: 'hinglish', name: 'Hinglish', nativeName: 'Hinglish', flag: '🇮🇳', dir: 'ltr' },
];

export const translations = {
  en: {
    // Brand & Common
    appName: 'FreeImageResize',
    tagline: 'In-Browser Image Resizer & Compressor',
    privateBadge: '100% Safe & In-Browser',
    zeroUploads: 'Zero server uploads. 100% Client-Side Privacy.',
    activeQueue: 'active',
    home: 'Home',
    govtJobs: 'Govt Jobs',
    passportPhoto: 'Passport Photo',
    resizeToKb: 'Resize to KB',
    socialSizes: 'Social Sizes',
    support: 'Support',
    blog: 'Blog',
    reducer: 'Image Reducer',
    jpg: 'JPG',
    png: 'PNG',
    webp: 'WebP',
    privacy: 'Privacy Policy',
    terms: 'Terms of Use',
    contact: 'Contact Us',
    about: 'About',
    disclaimer: 'Disclaimer',
    language: 'Language',

    // Hero & Headers
    heroBadge: 'Fast, In-Browser & 100% Free – Made for India & Worldwide',
    heroTitle: 'Free Image Size Reducer & KB Compressor',
    heroSubtitle: 'Compress and resize photos, signatures, and documents to exact 20KB, 50KB, 100KB, or custom dimensions. 100% private in your browser – photos are never uploaded to any server.',
    instantProcessing: 'Instant Processing',
    targetFileSize: 'Target Max File Size',
    targetFileSizeBadge: 'Target File Size (e.g. 50 KB / 20 KB)',

    // Dropzone
    dropzoneTitle: 'Drag & drop photos or signatures here',
    dropzoneSubtitle: 'or click to browse from device / paste from clipboard (Ctrl+V)',
    dropzoneSupport: 'Supports JPG, JPEG, PNG, WebP, AVIF, HEIC • Unlimited batch processing',
    dropzoneProcessing: 'Processing image in browser...',
    trySamplePhotos: 'Try instant test files:',
    sampleLandscape: 'Passport Portrait (JPG)',
    sampleLogo: 'Official Signature (PNG)',
    batchLimitHint: 'Batch Resize Multiple Photos',

    // Global Settings & Controls
    compressionSettings: 'Resize & Compression Settings',
    settingsDesc: 'Set dimensions, exact target KB, or quality level for all photos at once.',
    recompressAll: 'Re-Apply to All',
    compressingStatus: 'Compressing...',
    downloadZip: 'Download All (ZIP)',
    zippingProgress: 'Creating ZIP...',
    clearAll: 'Clear All',
    compressionMode: 'Optimization Mode',
    targetMode: 'Target KB',
    presetLow: 'Small (20-50KB)',
    presetMedium: 'Balanced (50-100KB)',
    presetHigh: 'High Quality',
    qualityLabel: 'Compression Quality',
    smallerFile: 'Smaller File (Fast)',
    bestQuality: 'Maximum Quality',
    outputFormat: 'Output Format',
    keepOriginal: 'Keep Original Format',
    metadataStripped: 'EXIF metadata removed for privacy & file reduction',
    resizeDimensions: 'Resize Dimensions',
    customDimensions: 'Custom Width / Height & Pixels',
    maxWidth: 'Width (px)',
    maxHeight: 'Height (px)',
    outputSuffix: 'File Suffix',
    lockAspectRatio: 'Lock Aspect Ratio',
    reapplyAll: 'Re-compress All Images',

    // Quick Target Size Presets
    quickPresets: 'Popular Indian Exam & Form Sizes:',
    preset20kb: '20 KB (Signature)',
    preset50kb: '50 KB (SSC/UPSC Photo)',
    preset100kb: '100 KB (Admit Card/Docs)',
    preset200kb: '200 KB (ID Proof)',
    presetPassport: '35x45 mm (Passport)',

    // Features Section
    feature1Title: 'Zero Server Uploads',
    feature1Desc: 'Your photos and signatures never leave your phone or computer. All resizing happens entirely inside your browser memory using HTML5 Canvas & WebAssembly.',
    feature2Title: 'Exact Target KB Engine',
    feature2Desc: 'Need strictly under 50KB or 20KB for SSC, UPSC, IBPS, or State PSC? Our smart binary-search compression hits your exact target size without guesswork.',
    feature3Title: 'Govt Form & Passport Ready',
    feature3Desc: 'Pre-configured dimensions in pixels and physical mm/cm for Indian passport photos (35x45 mm), signatures, thumb impressions, and admit cards.',
    feature4Title: 'Batch ZIP Download',
    feature4Desc: 'Resize multiple photos, signatures, and certificates in parallel and download everything together in one neat ZIP file with a single click.',

    // Trust badge
    trustNotice: 'Always confirm the size requirements in the official exam notification before submitting your form.',
    offlineNotice: 'Works offline. Zero data sent to servers.',
  },

  hinglish: {
    // Brand & Common
    appName: 'FreeImageResize',
    tagline: 'Browser Me Photo Resizer & KB Compressor',
    privateBadge: '100% Safe & Private (No Upload)',
    zeroUploads: 'Photos kisi bhi server par upload nahi hoti. 100% browser me compress hoti hain.',
    activeQueue: 'active',
    home: 'Home',
    govtJobs: 'Govt Jobs',
    passportPhoto: 'Passport Photo',
    resizeToKb: 'Resize to KB',
    socialSizes: 'Social Sizes',
    support: 'Support Karein',
    blog: 'Blog & Guides',
    reducer: 'Image Reducer',
    jpg: 'JPG',
    png: 'PNG',
    webp: 'WebP',
    privacy: 'Privacy Policy',
    terms: 'Niyam & Shartein',
    contact: 'Contact Karein',
    about: 'About Us',
    disclaimer: 'Disclaimer',
    language: 'Bhasha (Language)',

    // Hero & Headers
    heroBadge: 'Sarkari Job Forms & Passport Photo ke liye No. 1 Free Tool',
    heroTitle: 'Free Image Size Reducer & KB Compressor',
    heroSubtitle: 'Apni photo, signature aur documents ka size exact 20KB, 50KB ya 100KB me turant kam karein bina quality khoye. 100% free, safe aur unlimited.',
    instantProcessing: 'Turant Processing',
    targetFileSize: 'Target File Size (KB)',
    targetFileSizeBadge: 'Target Size (jaise 20 KB / 50 KB)',

    // Dropzone
    dropzoneTitle: 'Photo ya Signature yahan drag karein',
    dropzoneSubtitle: 'ya click karke mobile/laptop se chunein ya clipboard se paste karein (Ctrl+V)',
    dropzoneSupport: 'JPG, JPEG, PNG, WebP, AVIF, HEIC support • Ek sath multiple photos resize karein',
    dropzoneProcessing: 'Browser me photo process ho rahi hai...',
    trySamplePhotos: 'Test karne ke liye try karein:',
    sampleLandscape: 'Passport Photo (JPG)',
    sampleLogo: 'Official Signature (PNG)',
    batchLimitHint: 'Multiple Photos Ek Sath Resize Karein',

    // Global Settings & Controls
    compressionSettings: 'Resize & Compression Settings',
    settingsDesc: 'Photo ki dimensions, exact KB size ya quality apne hisab se set karein.',
    recompressAll: 'Sabhi par Apply Karein',
    compressingStatus: 'Compress ho raha hai...',
    downloadZip: 'Sabhi Download Karein (ZIP)',
    zippingProgress: 'ZIP ban rahi hai...',
    clearAll: 'Clear Karein',
    compressionMode: 'Optimization Mode',
    targetMode: 'Target KB',
    presetLow: 'Chhota Size (20-50KB)',
    presetMedium: 'Balanced (50-100KB)',
    presetHigh: 'High Quality',
    qualityLabel: 'Quality Level',
    smallerFile: 'Kam File Size',
    bestQuality: 'Best Quality',
    outputFormat: 'Output Format',
    keepOriginal: 'Same Format Rakhein',
    metadataStripped: 'Personal EXIF data hata di gayi hai safety ke liye',
    resizeDimensions: 'Resize Dimensions',
    customDimensions: 'Custom Width / Height & Pixels',
    maxWidth: 'Width (px)',
    maxHeight: 'Height (px)',
    outputSuffix: 'File ka Naam Suffix',
    lockAspectRatio: 'Aspect Ratio Lock Karein',
    reapplyAll: 'Sabhi Photos Re-compress Karein',

    // Quick Target Size Presets
    quickPresets: 'Sarkari Exam & Form ke Popular Sizes:',
    preset20kb: '20 KB (Signature)',
    preset50kb: '50 KB (SSC / UPSC Photo)',
    preset100kb: '100 KB (Admit Card / Certificate)',
    preset200kb: '200 KB (ID Proof / Marksheet)',
    presetPassport: '35x45 mm (Passport Size)',

    // Features Section
    feature1Title: 'Server Par Upload Nahi Hoti',
    feature1Desc: 'Aapki personal photos aur signature aapke phone ya computer se bahar nahi jate. Saari processing aapke browser me hoti hai.',
    feature2Title: 'Exact Target KB Engine',
    feature2Desc: 'SSC, UPSC, IBPS ya State PSC ke liye strictly 20KB ya 50KB chahiye? Hamara smart algorithm exact size par photo compress karta hai.',
    feature3Title: 'Govt Form & Passport Ready',
    feature3Desc: 'Indian passport (35x45 mm), signature aur thumb impression ke official sizes pehle se set hain taaki form reject na ho.',
    feature4Title: 'Batch ZIP Download',
    feature4Desc: 'Ek sath multiple photos aur documents ko resize karein aur 1 click me ZIP file me download karein.',

    // Trust badge
    trustNotice: 'Form bharne se pehle hamesha official notification me di gayi photo size zaroor check karein.',
    offlineNotice: 'Offline bhi chalta hai. Internet server pe data nahi jata.',
  },
};

export type TranslationKey = keyof typeof translations.en;

interface I18nContextType {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: (key: TranslationKey) => string;
  languages: LanguageOption[];
  currentLanguageOption: LanguageOption;
  isRtl: boolean;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

// Initial language detection: Hinglish if navigator.language starts with "hi" or timezone is Asia/Kolkata
const detectInitialLanguage = (): SupportedLanguage => {
  try {
    const saved = localStorage.getItem('fir_lang');
    if (saved === 'en' || saved === 'hinglish') {
      return saved as SupportedLanguage;
    }
  } catch {
    // ignore
  }

  try {
    if (typeof navigator !== 'undefined') {
      const navLang = (navigator.language || '').toLowerCase();
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
      if (navLang.startsWith('hi') || timezone === 'Asia/Kolkata' || timezone === 'Asia/Calcutta') {
        return 'hinglish';
      }
    }
  } catch {
    // ignore
  }

  return 'en';
};

export const I18nProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<SupportedLanguage>(detectInitialLanguage);

  useEffect(() => {
    // Set html lang attribute to en-IN as required
    if (typeof document !== 'undefined') {
      document.documentElement.lang = 'en-IN';
      document.documentElement.dir = 'ltr';
    }
  }, [language]);

  const setLanguage = (lang: SupportedLanguage) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('fir_lang', lang);
    } catch {
      // ignore
    }
  };

  const t = (key: TranslationKey): string => {
    const langDict = translations[language];
    if (langDict && langDict[key]) {
      return langDict[key];
    }
    return translations.en[key] || (key as string);
  };

  const currentLanguageOption =
    SUPPORTED_LANGUAGES.find((opt) => opt.code === language) || SUPPORTED_LANGUAGES[0];

  return (
    <I18nContext.Provider
      value={{
        language,
        setLanguage,
        t,
        languages: SUPPORTED_LANGUAGES,
        currentLanguageOption,
        isRtl: false,
      }}
    >
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
};
