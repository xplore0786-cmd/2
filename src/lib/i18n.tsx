import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type SupportedLanguage = 'en' | 'fr-CA' | 'ar' | 'ur' | 'ru';

export interface LanguageOption {
  code: SupportedLanguage;
  name: string;
  nativeName: string;
  flag: string;
  dir: 'ltr' | 'rtl';
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'en', name: 'English (US/CA)', nativeName: 'English', flag: '🇨🇦/🇺🇸', dir: 'ltr' },
  { code: 'fr-CA', name: 'French (Canada)', nativeName: 'Français (Canada)', flag: '🇨🇦', dir: 'ltr' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦', dir: 'rtl' },
  { code: 'ur', name: 'Urdu', nativeName: 'اردو', flag: '🇵🇰', dir: 'rtl' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский', flag: '🇷🇺', dir: 'ltr' },
];

export const translations = {
  en: {
    // Brand & Common
    appName: 'freeimageresize',
    tagline: 'Browser-Based Compression',
    privateBadge: '100% Private',
    zeroUploads: 'Zero server uploads. 100% Client-Side.',
    activeQueue: 'active',
    home: 'Home',
    reducer: 'Reducer',
    jpg: 'JPG',
    png: 'PNG',
    webp: 'WebP',
    privacy: 'Privacy',
    terms: 'Terms',
    contact: 'Contact',
    language: 'Language',
    
    // Hero & Headers
    heroBadge: 'Next-Gen In-Browser Compression Engine',
    heroTitle: 'Free Image Size Reducer Online',
    heroSubtitle: 'Reduce JPG, PNG, and WebP image file sizes up to 90% without noticeably losing quality. 100% processed securely in your browser with zero server uploads.',
    instantProcessing: 'Instant Processing',
    targetFileSize: 'Target Max File Size',
    targetFileSizeBadge: 'Target File Size (e.g. 100 KB)',

    // Dropzone
    dropzoneTitle: 'Drag & drop images here',
    dropzoneSubtitle: 'or click to browse from your computer or paste from clipboard (Ctrl+V)',
    dropzoneSupport: 'Supports JPG, PNG, WebP, GIF, AVIF, BMP • Up to 50MB per file',
    dropzoneProcessing: 'Processing files in browser...',
    trySamplePhotos: 'Need test files? Try instantly:',
    sampleLandscape: 'High-Res Photo (JPG)',
    sampleLogo: 'Vector Illustration (PNG)',
    batchLimitHint: 'Multiple / Batch Files',

    // Global Settings & Controls
    compressionSettings: 'Compression & Optimization Settings',
    settingsDesc: 'Tune compression level, target file size, and output format for all images.',
    recompressAll: 'Re-Compress All',
    compressingStatus: 'Compressing...',
    downloadZip: 'Download ZIP',
    zippingProgress: 'Zipping',
    clearAll: 'Clear All',
    compressionMode: 'Compression Mode',
    targetMode: 'Target KB',
    presetLow: 'Low',
    presetMedium: 'Medium',
    presetHigh: 'High',
    qualityLabel: 'Quality Level',
    smallerFile: 'Smaller File (Low)',
    bestQuality: 'Best Quality (High)',
    outputFormat: 'Output Format',
    keepOriginal: 'Keep Original',
    metadataStripped: 'Metadata & EXIF stripped for privacy',
    resizeDimensions: 'Resize Dimensions',
    customDimensions: 'Custom Width / Height & Filename',
    maxWidth: 'Max Width (px)',
    maxHeight: 'Max Height (px)',
    outputSuffix: 'Output Suffix',
    lockAspectRatio: 'Lock Aspect Ratio',
    reapplyAll: 'Force Reapply Settings To All',

    // Features Section
    feature1Title: 'Zero Server Uploads',
    feature1Desc: 'Your pictures are never uploaded to any remote server or cloud database. All compression calculations occur right inside your browser memory, keeping confidential documents and personal photos 100% private.',
    feature2Title: 'Precise Target File Size',
    feature2Desc: 'Need an image under 100 KB for a job application or passport portal? Our intelligent binary search optimizer automatically calculates the exact quality and resolution needed to hit your target size.',
    feature3Title: 'Batch ZIP Compression',
    feature3Desc: 'Compress dozens of high-resolution images in parallel. Download individually with custom naming suffixes or export everything into a neat, compressed ZIP archive with one click.',

    // Image Card & Actions
    compareBeforeAfter: 'Compare',
    downloadSingle: 'Download',
    download: 'Download',
    dimensions: 'Dimensions',

    // Footer
    toolsAndFormats: 'Tools & Formats',
    securityAndPrivacy: 'Security & Privacy',
    noServerStorage: 'No backend storage',
    localCanvasEngine: 'Local HTML5 Canvas engine',
    supportAndLegal: 'Support & Legal',
    allRightsReserved: 'Free, open, and private web application.',
    footerTagline: 'Built for speed, privacy & performance',
  },

  'fr-CA': {
    // Brand & Common
    appName: 'freeimageresize',
    tagline: 'Compression dans le navigateur',
    privateBadge: '100% Privé',
    zeroUploads: 'Aucun téléversement. 100% côté client.',
    activeQueue: 'actif(s)',
    home: 'Accueil',
    reducer: 'Réducteur',
    jpg: 'JPG',
    png: 'PNG',
    webp: 'WebP',
    privacy: 'Confidentialité',
    terms: 'Conditions',
    contact: 'Contact',
    language: 'Langue',

    // Hero & Headers
    heroBadge: 'Moteur de compression nouvelle génération dans le navigateur',
    heroTitle: 'Réducteur de taille d’image gratuit en ligne',
    heroSubtitle: 'Réduisez la taille des fichiers JPG, PNG et WebP jusqu’à 90% sans perte visible de qualité. Traitement 100% sécurisé dans votre navigateur sans téléversement sur serveur.',
    instantProcessing: 'Traitement instantané',
    targetFileSize: 'Taille maximale ciblée',
    targetFileSizeBadge: 'Taille cible précise (ex: 100 Ko)',

    // Dropzone
    dropzoneTitle: 'Glissez et déposez vos images ici',
    dropzoneSubtitle: 'ou cliquez pour parcourir vos fichiers ou collez depuis le presse-papiers (Ctrl+V)',
    dropzoneSupport: 'Prend en charge JPG, PNG, WebP, GIF, AVIF, BMP • Jusqu’à 50 Mo par fichier',
    dropzoneProcessing: 'Traitement des fichiers dans le navigateur...',
    trySamplePhotos: 'Besoin de fichiers tests ? Essayez :',
    sampleLandscape: 'Photo HD (JPG)',
    sampleLogo: 'Illustration vectorielle (PNG)',
    batchLimitHint: 'Traitement par lot / Fichiers multiples',

    // Global Settings & Controls
    compressionSettings: 'Paramètres d’optimisation & compression',
    settingsDesc: 'Ajustez le niveau de compression, la taille cible et le format de sortie.',
    recompressAll: 'Recompresser tout',
    compressingStatus: 'Compression en cours...',
    downloadZip: 'Télécharger ZIP',
    zippingProgress: 'Création du ZIP',
    clearAll: 'Tout effacer',
    compressionMode: 'Mode de compression',
    targetMode: 'Cible Ko',
    presetLow: 'Faible',
    presetMedium: 'Moyen',
    presetHigh: 'Élevé',
    qualityLabel: 'Niveau de qualité',
    smallerFile: 'Fichier plus petit (Faible)',
    bestQuality: 'Meilleure qualité (Élevée)',
    outputFormat: 'Format de sortie',
    keepOriginal: 'Conserver l’original',
    metadataStripped: 'Métadonnées et EXIF supprimés pour votre confidentialité',
    resizeDimensions: 'Redimensionner les dimensions',
    customDimensions: 'Largeur / Hauteur personnalisées & Suffixe',
    maxWidth: 'Largeur max (px)',
    maxHeight: 'Hauteur max (px)',
    outputSuffix: 'Suffixe du fichier',
    lockAspectRatio: 'Verrouiller les proportions',
    reapplyAll: 'Réappliquer les paramètres à tous',

    // Features Section
    feature1Title: 'Zéro téléversement sur serveur',
    feature1Desc: 'Vos photos ne sont jamais envoyées sur un serveur distant. Toutes les opérations s’exécutent directement dans la mémoire de votre navigateur, assurant une confidentialité totale.',
    feature2Title: 'Taille de fichier cible exacte',
    feature2Desc: 'Besoin d’une image de moins de 100 Ko pour une candidature ou un visa ? Notre algorithme calcule automatiquement la qualité optimale nécessaire.',
    feature3Title: 'Compression ZIP par lot',
    feature3Desc: 'Compressez des dizaines de photos haute résolution simultanément. Téléchargez individuellement ou exportez une archive ZIP compressée en un clic.',

    // Image Card & Actions
    compareBeforeAfter: 'Comparer',
    downloadSingle: 'Télécharger',
    download: 'Télécharger',
    dimensions: 'Dimensions',

    // Footer
    toolsAndFormats: 'Outils & Formats',
    securityAndPrivacy: 'Sécurité & Confidentialité',
    noServerStorage: 'Aucun stockage serveur',
    localCanvasEngine: 'Moteur HTML5 Canvas local',
    supportAndLegal: 'Support & Mentions légales',
    allRightsReserved: 'Application web gratuite, ouverte et privée.',
    footerTagline: 'Conçu pour la vitesse, la confidentialité et la performance',
  },

  ar: {
    // Brand & Common
    appName: 'freeimageresize',
    tagline: 'ضغط فوري داخل المتصفح',
    privateBadge: 'خصوصية 100%',
    zeroUploads: 'بدون رفع للملفات. معالجة محلية بالكامل 100%.',
    activeQueue: 'قيد المعالجة',
    home: 'الرئيسية',
    reducer: 'تقليل الحجم',
    jpg: 'JPG',
    png: 'PNG',
    webp: 'WebP',
    privacy: 'الخصوصية',
    terms: 'الشروط',
    contact: 'اتصل بنا',
    language: 'اللغة',

    // Hero & Headers
    heroBadge: 'محرك ضغط الصور المتقدم داخل المتصفح',
    heroTitle: 'تقليل وتصغير حجم الصور مجاناً أونلاين',
    heroSubtitle: 'قلل حجم صور JPG و PNG و WebP بنسبة تصل إلى 90% مع الحفاظ التام على جودة الصورة. معالجة آمنة داخل متصفحك بنسبة 100% وبدون أي رفع للسيرفر.',
    instantProcessing: 'معالجة فورية',
    targetFileSize: 'الحد الأقصى لحجم الملف المستهدف',
    targetFileSizeBadge: 'تحديد الحجم بالكيلوبايت (مثال: 100 ك.ب)',

    // Dropzone
    dropzoneTitle: 'اسحب وأفلت الصور هنا',
    dropzoneSubtitle: 'أو انقر لاختيار الملفات من جهازك أو الصق من الحافظة (Ctrl+V)',
    dropzoneSupport: 'يدعم JPG و PNG و WebP و GIF و BMP • حتى 50 ميغابايت للملف',
    dropzoneProcessing: 'جاري معالجة الصور داخل المتصفح...',
    trySamplePhotos: 'هل تحتاج إلى ملفات تجريبية؟ جرب الآن:',
    sampleLandscape: 'صورة فائقة الدقة (JPG)',
    sampleLogo: 'رسم توضيحي فيكتور (PNG)',
    batchLimitHint: 'ضغط جماعي لعدة صور دفعة واحدة',

    // Global Settings & Controls
    compressionSettings: 'إعدادات الضغط والتحسين',
    settingsDesc: 'اضبط مستوى الضغط، والحجم المستهدف، وتنسيق الإخراج لجميع الصور.',
    recompressAll: 'إعادة ضغط الكل',
    compressingStatus: 'جاري الضغط...',
    downloadZip: 'تحميل ZIP',
    zippingProgress: 'جاري إنشاء ملف ZIP',
    clearAll: 'مسح الكل',
    compressionMode: 'وضع الضغط',
    targetMode: 'كيلوبايت محدد',
    presetLow: 'منخفض (جودة فائقة)',
    presetMedium: 'متوازن (موصى به)',
    presetHigh: 'عالي (حجم أصغر)',
    qualityLabel: 'مستوى الجودة',
    smallerFile: 'حجم أصغر (منخفض)',
    bestQuality: 'أعلى جودة (عالي)',
    outputFormat: 'تنسيق الإخراج',
    keepOriginal: 'الاحتفاظ بالتنسيق الأصلي',
    metadataStripped: 'إزالة بيانات EXIF الوصفية لحماية خصوصيتك',
    resizeDimensions: 'تغيير أبعاد الصورة',
    customDimensions: 'تخصيص العرض والارتفاع واسم الملف',
    maxWidth: 'أقصى عرض (بكسل)',
    maxHeight: 'أقصى ارتفاع (بكسل)',
    outputSuffix: 'لاحقة اسم الملف',
    lockAspectRatio: 'الحفاظ على تناسق الأبعاد',
    reapplyAll: 'تطبيق الإعدادات على جميع الصور',

    // Features Section
    feature1Title: 'بدون أي رفع إلى السيرفرات',
    feature1Desc: 'لا يتم إرسال صورك أو رفعها إطلاقاً إلى أي سيرفر أو قاعدة بيانات. تحدث جميع عمليات المعالجة بأمان تام داخل ذاكرة متصفحك.',
    feature2Title: 'تحديد دقيق لحجم الملف المستهدف',
    feature2Desc: 'هل تحتاج إلى صورة بحجم أقل من 100 كيلوبايت لتقديم طلب أو تأشيرة؟ يحسب خوارزمنا الذكي الجودة والدقة المطلوبة بدقة متناهية.',
    feature3Title: 'ضغط وتنزيل جماعي في ملف ZIP',
    feature3Desc: 'اضغط عشرات الصور عالية الدقة في نفس الوقت. قم بالتنزيل فردياً أو تصدير كل الصور في أرشيف مضغوط بنقرة واحدة.',

    // Image Card & Actions
    compareBeforeAfter: 'مقارنة',
    downloadSingle: 'تحميل',
    download: 'تحميل',
    dimensions: 'الأبعاد',

    // Footer
    toolsAndFormats: 'الأدوات والتنسيقات',
    securityAndPrivacy: 'الأمان والخصوصية',
    noServerStorage: 'بدون تخزين سحابي',
    localCanvasEngine: 'محرك HTML5 Canvas المحلي',
    supportAndLegal: 'الدعم والمعلومات القانونية',
    allRightsReserved: 'تطبيق ويب مجاني، مفتوح، وآمن بالكامل.',
    footerTagline: 'تم تصميمه للسرعة والخصوصية والأداء العالي',
  },

  ur: {
    // Brand & Common
    appName: 'freeimageresize',
    tagline: 'براؤزر میں تیز ترین کمپریشن',
    privateBadge: '100% پرائیویٹ',
    zeroUploads: 'کوئی سرور اپ لوڈ نہیں۔ 100% کلائنٹ سائیڈ۔',
    activeQueue: 'فعال',
    home: 'ہوم',
    reducer: 'سائز کم کریں',
    jpg: 'JPG',
    png: 'PNG',
    webp: 'WebP',
    privacy: 'پرائیویسی',
    terms: 'شرائط',
    contact: 'رابطہ',
    language: 'زبان',

    // Hero & Headers
    heroBadge: 'اگلی نسل کا جدید براؤزر بیسڈ کمپریشن انجن',
    heroTitle: 'آن لائن مفت امیج سائز ریڈیوسر',
    heroSubtitle: 'معیار کھوئے بغیر JPG، PNG، اور WebP تصاویر کے سائز میں 90% تک کمی کریں۔ زیرو سرور اپ لوڈز کے ساتھ آپ کے براؤزر میں 100% محفوظ پروسیسنگ۔',
    instantProcessing: 'فوری پروسیسنگ',
    targetFileSize: 'مطلوبہ زیادہ سے زیادہ فائل سائز',
    targetFileSizeBadge: 'مطلوبہ فائل سائز (مثلاً 100 KB)',

    // Dropzone
    dropzoneTitle: 'تصاویر یہاں ڈریگ اور ڈراپ کریں',
    dropzoneSubtitle: 'یا کمپیوٹر سے منتخب کرنے کے لیے کلک کریں یا کلپ بورڈ سے پیسٹ کریں (Ctrl+V)',
    dropzoneSupport: 'سپورٹ کرتا ہے JPG, PNG, WebP, GIF, BMP • فی فائل 50MB تک',
    dropzoneProcessing: 'براؤزر میں تصاویر پروسیس ہو رہی ہیں...',
    trySamplePhotos: 'ٹیسٹ تصاویر کی ضرورت ہے؟ آزمائیں:',
    sampleLandscape: 'ہائی ریزولوشن تصویر (JPG)',
    sampleLogo: 'ویکٹر السٹریشن (PNG)',
    batchLimitHint: 'ایک ساتھ متعدد تصاویر کو کمپریس کریں',

    // Global Settings & Controls
    compressionSettings: 'کمپریشن اور آپٹیمائزیشن سیٹنگز',
    settingsDesc: 'تمام تصاویر کے لیے کمپریشن لیول، ٹارگٹ سائز، اور آؤٹ پٹ فارمیٹ منتخب کریں۔',
    recompressAll: 'تمام کو دوبارہ کمپریس کریں',
    compressingStatus: 'کمپریس ہو رہا ہے...',
    downloadZip: 'ZIP ڈاؤن لوڈ کریں',
    zippingProgress: 'ZIP فائل بنائی جا رہی ہے',
    clearAll: 'سب صاف کریں',
    compressionMode: 'کمپریشن موڈ',
    targetMode: 'ٹارگٹ KB',
    presetLow: 'کم (بہترین کوالٹی)',
    presetMedium: 'متوازن (تجویز کردہ)',
    presetHigh: 'زیادہ (سب سے چھوٹا سائز)',
    qualityLabel: 'کوالٹی لیول',
    smallerFile: 'چھوٹی فائل (کم)',
    bestQuality: 'بہترین کوالٹی (زیادہ)',
    outputFormat: 'آؤٹ پٹ فارمیٹ',
    keepOriginal: 'اصل فارمیٹ برقرار رکھیں',
    metadataStripped: 'پرائیویسی کے لیے EXIF ڈیٹا ہٹا دیا گیا ہے',
    resizeDimensions: 'ڈائمینشنز کا سائز تبدیل کریں',
    customDimensions: 'کسٹم چوڑائی / اونچائی اور فائل کا نام',
    maxWidth: 'زیادہ سے زیادہ چوڑائی (px)',
    maxHeight: 'زیادہ سے زیادہ اونچائی (px)',
    outputSuffix: 'فائل کا لاحقہ (Suffix)',
    lockAspectRatio: 'تناسب برقرار رکھیں',
    reapplyAll: 'تمام تصاویر پر سیٹنگز لاگو کریں',

    // Features Section
    feature1Title: 'زیرو سرور اپ لوڈز',
    feature1Desc: 'آپ کی تصاویر کبھی بھی کسی ریموٹ سرور یا کلاؤڈ پر اپ لوڈ نہیں ہوتیں۔ تمام پروسیسنگ آپ کے براؤزر میموری میں مکمل طور پر محفوظ رہتی ہے۔',
    feature2Title: 'درست ٹارگٹ فائل سائز',
    feature2Desc: 'پاسپورٹ یا فارم کے لیے 100 KB سے کم سائز کی تصویر چاہیے؟ ہمارا الگورتھم خودکار طور پر مطلوبہ سائز کے مطابق ایڈجسٹ کرتا ہے۔',
    feature3Title: 'بیچ ZIP کمپریشن',
    feature3Desc: 'درجنوں تصاویر کو ایک ساتھ کمپریس کریں۔ انفرادی طور پر ڈاؤن لوڈ کریں یا ایک کلک میں تمام تصاویر ZIP فائل میں برآمد کریں۔',

    // Image Card & Actions
    compareBeforeAfter: 'موازنہ کریں',
    downloadSingle: 'ڈاؤن لوڈ',
    download: 'ڈاؤن لوڈ',
    dimensions: 'ڈائمینشنز',

    // Footer
    toolsAndFormats: 'ٹولز اور فارمیٹس',
    securityAndPrivacy: 'سیکیورٹی اور پرائیویسی',
    noServerStorage: 'کوئی سرور اسٹوریج نہیں',
    localCanvasEngine: 'مقامی HTML5 کینوس انجن',
    supportAndLegal: 'سپورٹ اور قانونی معلومات',
    allRightsReserved: 'مفت، اوپن اور مکمل طور پر پرائیویٹ ویب ایپلیکیشن۔',
    footerTagline: 'تیزی، پرائیویسی اور اعلیٰ کارکردگی کے لیے تیار کردہ',
  },

  ru: {
    // Brand & Common
    appName: 'freeimageresize',
    tagline: 'Сжатие прямо в браузере',
    privateBadge: '100% Приватно',
    zeroUploads: 'Без отправки на сервер. 100% на стороне клиента.',
    activeQueue: 'активно',
    home: 'Главная',
    reducer: 'Уменьшить размер',
    jpg: 'JPG',
    png: 'PNG',
    webp: 'WebP',
    privacy: 'Конфиденциальность',
    terms: 'Условия',
    contact: 'Контакты',
    language: 'Язык',

    // Hero & Headers
    heroBadge: 'Новейший движок сжатия изображений в браузере',
    heroTitle: 'Бесплатное уменьшение размера фото онлайн',
    heroSubtitle: 'Уменьшайте размер файлов JPG, PNG и WebP до 90% без заметной потери качества. 100% безопасная обработка в вашем браузере без загрузки на сервер.',
    instantProcessing: 'Мгновенная обработка',
    targetFileSize: 'Целевой максимальный размер файла',
    targetFileSizeBadge: 'Точный целевой размер (напр. 100 КБ)',

    // Dropzone
    dropzoneTitle: 'Перетащите изображения сюда',
    dropzoneSubtitle: 'или нажмите для выбора с компьютера или вставьте из буфера (Ctrl+V)',
    dropzoneSupport: 'Поддерживает JPG, PNG, WebP, GIF, BMP • До 50 МБ на файл',
    dropzoneProcessing: 'Обработка изображений в браузере...',
    trySamplePhotos: 'Нужны тестовые файлы? Попробуйте:',
    sampleLandscape: 'HD Фото (JPG)',
    sampleLogo: 'Векторная графика (PNG)',
    batchLimitHint: 'Пакетное сжатие нескольких файлов',

    // Global Settings & Controls
    compressionSettings: 'Параметры сжатия и оптимизации',
    settingsDesc: 'Настройте уровень сжатия, целевой размер файла и формат вывода для всех изображений.',
    recompressAll: 'Сжать все заново',
    compressingStatus: 'Сжатие...',
    downloadZip: 'Скачать ZIP',
    zippingProgress: 'Создание архива ZIP',
    clearAll: 'Очистить все',
    compressionMode: 'Режим сжатия',
    targetMode: 'Целевой КБ',
    presetLow: 'Низкое (Макс. качество)',
    presetMedium: 'Среднее (Рекомендуется)',
    presetHigh: 'Высокое (Мин. размер)',
    qualityLabel: 'Уровень качества',
    smallerFile: 'Меньше размер (Низкое)',
    bestQuality: 'Лучшее качество (Высокое)',
    outputFormat: 'Формат вывода',
    keepOriginal: 'Сохранить оригинал',
    metadataStripped: 'Метаданные и EXIF удалены для конфиденциальности',
    resizeDimensions: 'Изменение разрешения',
    customDimensions: 'Своя ширина / высота и суффикс файла',
    maxWidth: 'Макс. ширина (px)',
    maxHeight: 'Макс. высота (px)',
    outputSuffix: 'Суффиکس файла',
    lockAspectRatio: 'Сохранять пропорции',
    reapplyAll: 'Применить настройки ко всем файлам',

    // Features Section
    feature1Title: 'Никаких загрузок на сервер',
    feature1Desc: 'Ваши изображения никогда не отправляются на удаленные серверы или в облако. Вся оптимизация выполняется локально в оперативной памяти браузера.',
    feature2Title: 'Точный целевой размер в КБ',
    feature2Desc: 'Нужен файл размером менее 100 КБ для анкеты или визы? Наш алгоритм подбирает математически идеальное качество под нужный лимит.',
    feature3Title: 'Пакетное сжатие в ZIP',
    feature3Desc: 'Сжимайте десятки фотографий одновременно. Скачивайте по одной или экспортируйте весь набор в единый компактный ZIP-архив в один клик.',

    // Image Card & Actions
    compareBeforeAfter: 'Сравнить',
    downloadSingle: 'Скачать',
    download: 'Скачать',
    dimensions: 'Разрешение',

    // Footer
    toolsAndFormats: 'Инструменты и форматы',
    securityAndPrivacy: 'Безопасность и приватность',
    noServerStorage: 'Без серверного хранилища',
    localCanvasEngine: 'Локальный движок HTML5 Canvas',
    supportAndLegal: 'Поддержка и правовая информация',
    allRightsReserved: 'Бесплатное, открытое и приватное веб-приложение.',
    footerTagline: 'Создано для максимальной скорости, безопасности и качества',
  },
};

export type TranslationKey = keyof typeof translations.en;

interface I18nContextType {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: (key: TranslationKey) => string;
  isRtl: boolean;
  languages: LanguageOption[];
  currentLanguageOption: LanguageOption;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

const LANGUAGE_STORAGE_KEY = 'freeimageresize_lang';

export const I18nProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<SupportedLanguage>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(LANGUAGE_STORAGE_KEY) as SupportedLanguage;
      if (saved && SUPPORTED_LANGUAGES.some((l) => l.code === saved)) {
        return saved;
      }
      const navLang = navigator.language;
      if (navLang.startsWith('fr')) return 'fr-CA';
      if (navLang.startsWith('ar')) return 'ar';
      if (navLang.startsWith('ur')) return 'ur';
      if (navLang.startsWith('ru')) return 'ru';
    }
    return 'en';
  });

  const currentLanguageOption = SUPPORTED_LANGUAGES.find((l) => l.code === language) || SUPPORTED_LANGUAGES[0];
  const isRtl = currentLanguageOption.dir === 'rtl';

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = currentLanguageOption.dir;
    localStorage.setItem(LANGUAGE_STORAGE_KEY, language);

    if (isRtl) {
      document.body.classList.add('rtl');
    } else {
      document.body.classList.remove('rtl');
    }
  }, [language, currentLanguageOption, isRtl]);

  const setLanguage = (newLang: SupportedLanguage) => {
    setLanguageState(newLang);
  };

  const t = (key: TranslationKey): string => {
    const langDict = translations[language];
    if (langDict && (langDict as any)[key]) {
      return (langDict as any)[key];
    }
    return translations.en[key] || key;
  };

  return (
    <I18nContext.Provider
      value={{
        language,
        setLanguage,
        t,
        isRtl,
        languages: SUPPORTED_LANGUAGES,
        currentLanguageOption,
      }}
    >
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = (): I18nContextType => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
};
