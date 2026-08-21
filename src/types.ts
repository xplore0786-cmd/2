export type ImageFormat = 'original' | 'image/jpeg' | 'image/png' | 'image/webp';

export type CompressionPreset = 'low' | 'medium' | 'high' | 'target' | 'custom';

export type ResizeMode = 'original' | 'percent' | 'dimensions';

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
  stripMetadata: boolean;
  filenameSuffix: string;
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
}

export type PageRoute = 
  | 'home' 
  | 'image-size-reducer' 
  | 'jpg-compressor' 
  | 'png-compressor' 
  | 'webp-compressor' 
  | 'privacy-policy' 
  | 'terms' 
  | 'contact';

export interface BatchStats {
  totalOriginalSize: number;
  totalCompressedSize: number;
  totalSavedBytes: number;
  totalReductionPercent: number;
  completedCount: number;
  totalCount: number;
  isCompressing: boolean;
}
