export type ImageFormat = 'original' | 'image/jpeg' | 'image/png' | 'image/webp';

export type CompressionPreset = 'low' | 'medium' | 'high' | 'target' | 'custom';

export type ResizeMode = 'original' | 'percent' | 'dimensions' | 'physical';

export type PhysicalUnit = 'cm' | 'mm' | 'inch';

export type CropAspectRatio = 'free' | '35:45' | '3:4' | '1:1' | '16:9' | '4:5' | '2:1' | '7:3' | 'custom';

export interface ImageSettings {
  preset: CompressionPreset;
  quality: number; // 0.01 to 1.0 (or 1 to 100 on slider)
  format: ImageFormat;
  resizeMode: ResizeMode;
  resizePercent: number; // 10 to 100
  maxWidth?: number;
  maxHeight?: number;
  maintainAspectRatio: boolean;
  targetSizeKB?: number; // e.g. 50, 100, 200, 500, 1024
  minKB?: number; // e.g. 20 (for 20KB - 50KB range)
  maxKB?: number; // e.g. 50
  stripMetadata: boolean;
  filenameSuffix: string;
  // Physical dimension properties (cm, mm, inch at DPI)
  physicalUnit?: PhysicalUnit;
  physicalWidth?: number;
  physicalHeight?: number;
  dpi?: number; // default 300
  // Visual effects & formatting
  grayscale?: boolean;
  backgroundColor?: string; // default '#ffffff'
  cropAspectRatio?: CropAspectRatio;
  // Association with presets
  presetSlug?: string;
  presetItemId?: string;
}

export interface ImageItem {
  id: string;
  file: File;
  name: string;
  originalSize: number;
  originalWidth: number;
  originalHeight: number;
  originalType: string;
  previewUrl: string;
  
  // Compression output
  compressedBlob?: Blob;
  compressedUrl?: string;
  compressedSize?: number;
  compressedWidth?: number;
  compressedHeight?: number;
  compressedType?: string;
  compressionRatio?: number; // e.g. -65%
  
  status: 'idle' | 'compressing' | 'done' | 'error';
  errorMessage?: string;
  settings: ImageSettings;

  // Preset validation state
  meetsTargetRequirement?: boolean;
  validationMessage?: string;
}

export type StaticPageRoute = 
  | 'home' 
  | 'govt-jobs'
  | 'passport-photo'
  | 'resize-by-size'
  | 'social-media-sizes'
  | 'blog'
  | 'pricing'
  | 'support'
  | 'about'
  | 'disclaimer'
  | 'privacy-policy' 
  | 'terms' 
  | 'contact'
  | 'image-size-reducer' 
  | 'jpg-compressor' 
  | 'png-compressor' 
  | 'webp-compressor';

export type PageRoute = StaticPageRoute | string;

export interface BatchStats {
  totalOriginalSize: number;
  totalCompressedSize: number;
  totalSavedBytes: number;
  totalReductionPercent: number;
  completedCount: number;
  totalCount: number;
  isCompressing: boolean;
}
