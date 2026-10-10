import JSZip from 'jszip';
import { ImageFormat, ImageItem, ImageSettings } from '../types';

export function formatBytes(bytes: number, decimals: number = 2): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

export function calculateSavings(original: number, compressed: number): {
  bytesSaved: number;
  percentSaved: number;
  isSmaller: boolean;
} {
  if (original <= 0 || compressed <= 0) {
    return { bytesSaved: 0, percentSaved: 0, isSmaller: false };
  }
  const diff = original - compressed;
  const percent = Math.round((diff / original) * 100);
  return {
    bytesSaved: diff,
    percentSaved: percent,
    isSmaller: diff > 0,
  };
}

export function getMimeType(format: ImageFormat, originalType: string): string {
  if (format === 'original') {
    if (['image/jpeg', 'image/png', 'image/webp'].includes(originalType)) {
      return originalType;
    }
    return 'image/jpeg';
  }
  return format;
}

export function getFileExtension(mimeType: string): string {
  switch (mimeType) {
    case 'image/jpeg':
    case 'image/jpg':
      return 'jpg';
    case 'image/png':
      return 'png';
    case 'image/webp':
      return 'webp';
    default:
      return 'jpg';
  }
}

export function generateOutputFilename(
  originalName: string,
  targetMimeType: string,
  suffix: string = '-min',
  presetSlug?: string
): string {
  const lastDotIndex = originalName.lastIndexOf('.');
  const baseName = lastDotIndex !== -1 ? originalName.substring(0, lastDotIndex) : originalName;
  const ext = getFileExtension(targetMimeType);
  
  if (presetSlug) {
    return `${presetSlug}-${baseName}${suffix}.${ext}`;
  }
  return `${baseName}${suffix}.${ext}`;
}

export function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Converts physical dimensions (cm, mm, inches) to pixels based on DPI
 */
export function physicalToPixels(value: number, unit: 'cm' | 'mm' | 'inch', dpi: number = 300): number {
  switch (unit) {
    case 'inch':
      return Math.round(value * dpi);
    case 'cm':
      return Math.round((value / 2.54) * dpi);
    case 'mm':
      return Math.round((value / 25.4) * dpi);
    default:
      return Math.round(value);
  }
}

/**
 * Converts pixels to physical dimensions (cm, mm, inches) based on DPI
 */
export function pixelsToPhysical(pixels: number, unit: 'cm' | 'mm' | 'inch', dpi: number = 300): number {
  switch (unit) {
    case 'inch':
      return parseFloat((pixels / dpi).toFixed(2));
    case 'cm':
      return parseFloat(((pixels / dpi) * 2.54).toFixed(2));
    case 'mm':
      return parseFloat(((pixels / dpi) * 25.4).toFixed(1));
    default:
      return pixels;
  }
}

/**
 * Handle HEIC/HEIF files if uploaded (lazy converts in-browser via heic2any)
 */
export async function normalizeImageFile(file: File): Promise<Blob> {
  const isHeic = 
    file.name.toLowerCase().endsWith('.heic') || 
    file.name.toLowerCase().endsWith('.heif') ||
    file.type === 'image/heic' || 
    file.type === 'image/heif';

  if (isHeic) {
    try {
      // Dynamically import heic2any to avoid loading on startup
      const heic2any = (await import('heic2any')).default;
      const converted = await heic2any({
        blob: file,
        toType: 'image/jpeg',
        quality: 0.95,
      });
      return Array.isArray(converted) ? converted[0] : converted;
    } catch (err) {
      console.warn('heic2any conversion failed, falling back to original blob', err);
      return file;
    }
  }

  return file;
}

export async function getImageDimensions(fileOrBlob: Blob): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(fileOrBlob);
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve({ width: img.naturalWidth || img.width, height: img.naturalHeight || img.height });
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Failed to decode image dimensions'));
    };
    img.src = url;
  });
}

function loadImageElement(fileOrBlob: Blob): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(fileOrBlob);
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Failed to load image for processing'));
    };
    img.src = url;
  });
}

function calculateTargetDimensions(
  origW: number,
  origH: number,
  settings: ImageSettings,
  scaleFactor: number = 1.0
): { width: number; height: number; cropSource?: { sx: number; sy: number; sw: number; sh: number } } {
  let targetW = origW;
  let targetH = origH;
  let cropSource: { sx: number; sy: number; sw: number; sh: number } | undefined;

  // Handle aspect ratio cropping if specified
  if (settings.cropAspectRatio && settings.cropAspectRatio !== 'free' && settings.cropAspectRatio !== 'custom') {
    let desiredRatio = 1.0;
    if (settings.cropAspectRatio === '35:45') desiredRatio = 35 / 45;
    else if (settings.cropAspectRatio === '3:4') desiredRatio = 3 / 4;
    else if (settings.cropAspectRatio === '1:1') desiredRatio = 1.0;
    else if (settings.cropAspectRatio === '16:9') desiredRatio = 16 / 9;
    else if (settings.cropAspectRatio === '4:5') desiredRatio = 4 / 5;
    else if (settings.cropAspectRatio === '2:1') desiredRatio = 2 / 1;
    else if (settings.cropAspectRatio === '7:3') desiredRatio = 7 / 3;

    const currentRatio = origW / origH;

    if (currentRatio > desiredRatio) {
      // Too wide, crop sides
      const sw = origH * desiredRatio;
      const sh = origH;
      const sx = (origW - sw) / 2;
      const sy = 0;
      cropSource = { sx, sy, sw, sh };
      origW = sw;
      origH = sh;
    } else if (currentRatio < desiredRatio) {
      // Too tall, crop top/bottom
      const sw = origW;
      const sh = origW / desiredRatio;
      const sx = 0;
      const sy = (origH - sh) / 2;
      cropSource = { sx, sy, sw, sh };
      origW = sw;
      origH = sh;
    }
  }

  // Physical mode (cm, mm, inches at DPI)
  if (settings.resizeMode === 'physical' && settings.physicalWidth && settings.physicalHeight) {
    const dpi = settings.dpi || 300;
    const unit = settings.physicalUnit || 'cm';
    targetW = physicalToPixels(settings.physicalWidth, unit, dpi);
    targetH = physicalToPixels(settings.physicalHeight, unit, dpi);
    return {
      width: Math.max(1, Math.round(targetW * scaleFactor)),
      height: Math.max(1, Math.round(targetH * scaleFactor)),
      cropSource,
    };
  }

  // Dimensions mode
  if (settings.resizeMode === 'dimensions') {
    const maxW = settings.maxWidth || origW;
    const maxH = settings.maxHeight || origH;

    if (settings.maintainAspectRatio) {
      const ratio = Math.min(maxW / origW, maxH / origH, 1.0) * scaleFactor;
      targetW = Math.max(1, Math.round(origW * ratio));
      targetH = Math.max(1, Math.round(origH * ratio));
    } else {
      targetW = Math.max(1, Math.round(maxW * scaleFactor));
      targetH = Math.max(1, Math.round(maxH * scaleFactor));
    }
  } else if (settings.resizeMode === 'percent') {
    const p = Math.max(0.05, Math.min(1.0, (settings.resizePercent / 100) * scaleFactor));
    targetW = Math.round(origW * p);
    targetH = Math.round(origH * p);
  } else if (scaleFactor < 1.0) {
    targetW = Math.max(1, Math.round(origW * scaleFactor));
    targetH = Math.max(1, Math.round(origH * scaleFactor));
  }

  return { 
    width: Math.max(1, targetW), 
    height: Math.max(1, targetH),
    cropSource 
  };
}

function renderToCanvas(
  img: HTMLImageElement,
  width: number,
  height: number,
  targetMime: string,
  options: {
    backgroundColor?: string;
    grayscale?: boolean;
    cropSource?: { sx: number; sy: number; sw: number; sh: number };
  } = {}
): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d', { alpha: targetMime !== 'image/jpeg' });
  if (!ctx) throw new Error('Could not obtain canvas 2D context');

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';

  // Fill background
  const bg = options.backgroundColor || (targetMime === 'image/jpeg' ? '#FFFFFF' : 'transparent');
  if (bg && bg !== 'transparent') {
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, width, height);
  }

  // Draw image with optional crop
  if (options.cropSource) {
    const { sx, sy, sw, sh } = options.cropSource;
    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, width, height);
  } else {
    ctx.drawImage(img, 0, 0, width, height);
  }

  // Grayscale effect if enabled
  if (options.grayscale) {
    const imgData = ctx.getImageData(0, 0, width, height);
    const data = imgData.data;
    for (let i = 0; i < data.length; i += 4) {
      const avg = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
      data[i] = avg;
      data[i + 1] = avg;
      data[i + 2] = avg;
    }
    ctx.putImageData(imgData, 0, 0);
  }

  return canvas;
}

function canvasToBlob(canvas: HTMLCanvasElement, mimeType: string, quality: number): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error('Canvas toBlob failed'));
        }
      },
      mimeType,
      quality
    );
  });
}

export async function compressSingleImage(
  item: ImageItem
): Promise<{
  blob: Blob;
  url: string;
  size: number;
  width: number;
  height: number;
  mimeType: string;
  ratio: number;
  meetsRequirement: boolean;
  validationMessage?: string;
}> {
  const { file, originalSize, settings } = item;
  
  // Normalize file (handles HEIC / HEIF)
  const normalizedBlob = await normalizeImageFile(file);
  const targetMime = getMimeType(settings.format, item.originalType);
  const img = await loadImageElement(normalizedBlob);
  const origW = img.naturalWidth || img.width;
  const origH = img.naturalHeight || img.height;

  // Determine initial quality based on preset or manual slider
  let targetQuality = settings.quality;
  if (settings.preset === 'low') {
    targetQuality = 0.88;
  } else if (settings.preset === 'medium') {
    targetQuality = 0.72;
  } else if (settings.preset === 'high') {
    targetQuality = 0.48;
  }

  const canvasOptions = {
    backgroundColor: settings.backgroundColor || '#FFFFFF',
    grayscale: settings.grayscale || false,
  };

  // Determine if a Target Size Range is set (e.g. minKB to maxKB or targetSizeKB)
  const maxKB = settings.maxKB || settings.targetSizeKB || 0;
  const minKB = settings.minKB || 0;

  let finalBlob: Blob | null = null;
  let finalWidth = origW;
  let finalHeight = origH;

  if ((settings.preset === 'target' || maxKB > 0) && maxKB > 0) {
    const maxBytes = maxKB * 1024;
    const minBytes = minKB > 0 ? minKB * 1024 : 0;
    
    // Target midpoint or max safe boundary
    const desiredTargetBytes = minBytes > 0 
      ? (minBytes + maxBytes) / 2 
      : maxBytes * 0.92;

    let minQ = 0.05;
    let maxQ = 0.98;
    let bestBlob: Blob | null = null;
    let scale = 1.0;

    // Phase 1: Binary search on JPEG/WebP quality at 100% scale
    for (let iter = 0; iter < 8; iter++) {
      const q = (minQ + maxQ) / 2;
      const dims = calculateTargetDimensions(origW, origH, settings, scale);
      const canvas = renderToCanvas(img, dims.width, dims.height, targetMime, {
        ...canvasOptions,
        cropSource: dims.cropSource,
      });
      const blob = await canvasToBlob(canvas, targetMime, q);

      bestBlob = blob;
      finalWidth = dims.width;
      finalHeight = dims.height;

      if (blob.size > maxBytes) {
        maxQ = q; // Too large, reduce quality
      } else if (minBytes > 0 && blob.size < minBytes) {
        minQ = q; // Too small, increase quality
      } else {
        // Comfortably within range!
        minQ = q;
        if (Math.abs(blob.size - desiredTargetBytes) < desiredTargetBytes * 0.08) {
          break;
        }
      }
    }

    // Phase 2: If file is still too big even at lowest quality (0.05), gradually downscale dimensions
    if (bestBlob && bestBlob.size > maxBytes) {
      for (let scaleIter = 0; scaleIter < 6; scaleIter++) {
        scale *= 0.80; // Downscale by 20%
        const dims = calculateTargetDimensions(origW, origH, settings, scale);
        const canvas = renderToCanvas(img, dims.width, dims.height, targetMime, {
          ...canvasOptions,
          cropSource: dims.cropSource,
        });
        const blob = await canvasToBlob(canvas, targetMime, Math.max(0.40, minQ));
        bestBlob = blob;
        finalWidth = dims.width;
        finalHeight = dims.height;

        if (blob.size <= maxBytes) {
          break;
        }
      }
    }

    // Check if target is impossible
    if (bestBlob && bestBlob.size > maxBytes * 1.05) {
      finalBlob = bestBlob;
      // It tried its best, still report
    } else {
      finalBlob = bestBlob;
    }
  }

  // Standard non-target mode or fallback
  if (!finalBlob) {
    const dims = calculateTargetDimensions(origW, origH, settings);
    const canvas = renderToCanvas(img, dims.width, dims.height, targetMime, {
      ...canvasOptions,
      cropSource: dims.cropSource,
    });
    finalBlob = await canvasToBlob(canvas, targetMime, targetQuality);
    finalWidth = dims.width;
    finalHeight = dims.height;
  }

  const finalSize = finalBlob.size;
  const ratio = originalSize > 0 
    ? Math.round(((finalSize - originalSize) / originalSize) * 100) 
    : 0;
  const url = URL.createObjectURL(finalBlob);

  // Validate compliance with preset requirements
  let meetsRequirement = true;
  let validationMessage: string | undefined;

  const currentSizeKB = Math.round(finalSize / 1024);
  if (maxKB > 0 && currentSizeKB > maxKB) {
    meetsRequirement = false;
    validationMessage = `Exceeds maximum limit (${currentSizeKB} KB > ${maxKB} KB)`;
  } else if (minKB > 0 && currentSizeKB < minKB) {
    meetsRequirement = false;
    validationMessage = `Below minimum required size (${currentSizeKB} KB < ${minKB} KB)`;
  } else {
    meetsRequirement = true;
    validationMessage = minKB > 0 
      ? `Meets requirement (${currentSizeKB} KB within ${minKB} - ${maxKB} KB)`
      : maxKB > 0 
        ? `Meets requirement (${currentSizeKB} KB ≤ ${maxKB} KB)`
        : 'Optimized successfully';
  }

  return {
    blob: finalBlob,
    url,
    size: finalSize,
    width: finalWidth,
    height: finalHeight,
    mimeType: targetMime,
    ratio,
    meetsRequirement,
    validationMessage,
  };
}

export async function downloadAllAsZip(
  items: ImageItem[],
  onProgress?: (percent: number) => void
): Promise<void> {
  const zip = new JSZip();
  const completedItems = items.filter((item) => item.status === 'done' && item.compressedBlob);

  if (completedItems.length === 0) return;

  const total = completedItems.length;
  completedItems.forEach((item, index) => {
    const mime = item.compressedType || getMimeType(item.settings.format, item.originalType);
    const filename = generateOutputFilename(
      item.name, 
      mime, 
      item.settings.filenameSuffix, 
      item.settings.presetSlug
    );
    zip.file(filename, item.compressedBlob!);
    if (onProgress) {
      onProgress(Math.round(((index + 1) / total) * 50));
    }
  });

  const content = await zip.generateAsync({ type: 'blob' }, (metadata) => {
    if (onProgress) {
      onProgress(50 + Math.round(metadata.percent * 0.5));
    }
  });

  const downloadUrl = URL.createObjectURL(content);
  const link = document.createElement('a');
  link.href = downloadUrl;
  link.download = `resized-photos-${Date.now()}.zip`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(downloadUrl);
}
