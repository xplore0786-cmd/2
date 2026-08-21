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
  suffix: string = '-min'
): string {
  const lastDotIndex = originalName.lastIndexOf('.');
  const baseName = lastDotIndex !== -1 ? originalName.substring(0, lastDotIndex) : originalName;
  const ext = getFileExtension(targetMimeType);
  return `${baseName}${suffix}.${ext}`;
}

export async function getImageDimensions(file: File): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
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
): { width: number; height: number } {
  let w = origW;
  let h = origH;

  if (settings.resizeMode === 'percent') {
    const p = Math.max(0.05, Math.min(1.0, (settings.resizePercent / 100) * scaleFactor));
    w = Math.round(origW * p);
    h = Math.round(origH * p);
  } else if (settings.resizeMode === 'dimensions') {
    const maxW = settings.maxWidth || origW;
    const maxH = settings.maxHeight || origH;

    if (settings.maintainAspectRatio) {
      const ratio = Math.min(maxW / origW, maxH / origH, 1.0) * scaleFactor;
      w = Math.max(1, Math.round(origW * ratio));
      h = Math.max(1, Math.round(origH * ratio));
    } else {
      w = Math.max(1, Math.round(maxW * scaleFactor));
      h = Math.max(1, Math.round(maxH * scaleFactor));
    }
  } else if (scaleFactor < 1.0) {
    w = Math.max(1, Math.round(origW * scaleFactor));
    h = Math.max(1, Math.round(origH * scaleFactor));
  }

  return { width: Math.max(1, w), height: Math.max(1, h) };
}

function renderToCanvas(
  img: HTMLImageElement,
  width: number,
  height: number,
  targetMime: string
): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d', { alpha: targetMime !== 'image/jpeg' });
  if (!ctx) throw new Error('Could not obtain canvas 2D context');

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';

  // If converting to JPEG, draw pure white background for transparent regions
  if (targetMime === 'image/jpeg') {
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, width, height);
  }

  ctx.drawImage(img, 0, 0, width, height);
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
}> {
  const { file, originalSize, settings } = item;
  const targetMime = getMimeType(settings.format, item.originalType);
  const img = await loadImageElement(file);
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

  // Handle Target File Size Mode (Binary Search Optimization)
  if (settings.preset === 'target' && settings.targetSizeKB && settings.targetSizeKB > 0) {
    const targetBytes = settings.targetSizeKB * 1024;
    let minQuality = 0.05;
    let maxQuality = 0.98;
    let bestBlob: Blob | null = null;
    let bestWidth = origW;
    let bestHeight = origH;
    let scale = 1.0;

    // First attempt quality binary search at current resolution
    for (let iteration = 0; iteration < 7; iteration++) {
      const q = (minQuality + maxQuality) / 2;
      const dims = calculateTargetDimensions(origW, origH, settings, scale);
      const canvas = renderToCanvas(img, dims.width, dims.height, targetMime);
      const blob = await canvasToBlob(canvas, targetMime, q);

      bestBlob = blob;
      bestWidth = dims.width;
      bestHeight = dims.height;

      if (blob.size > targetBytes) {
        // Too large, decrease quality
        maxQuality = q;
      } else {
        // Under target, check if close enough
        minQuality = q;
        if (targetBytes - blob.size < targetBytes * 0.08) {
          // Within 8% of target, good enough!
          break;
        }
      }
    }

    // If still larger than target even at low quality, scale dimensions down progressively
    if (bestBlob && bestBlob.size > targetBytes) {
      for (let scaleIter = 0; scaleIter < 5; scaleIter++) {
        scale *= 0.82; // Downscale slightly
        const dims = calculateTargetDimensions(origW, origH, settings, scale);
        const canvas = renderToCanvas(img, dims.width, dims.height, targetMime);
        const blob = await canvasToBlob(canvas, targetMime, Math.max(0.35, minQuality));
        bestBlob = blob;
        bestWidth = dims.width;
        bestHeight = dims.height;

        if (blob.size <= targetBytes) {
          break;
        }
      }
    }

    if (!bestBlob) {
      throw new Error('Could not optimize image to target size');
    }

    const compressedSize = bestBlob.size;
    const ratio = Math.round(((originalSize - compressedSize) / originalSize) * 100);
    const url = URL.createObjectURL(bestBlob);

    return {
      blob: bestBlob,
      url,
      size: compressedSize,
      width: bestWidth,
      height: bestHeight,
      mimeType: targetMime,
      ratio,
    };
  }

  // Standard Compression Mode
  const { width: outW, height: outH } = calculateTargetDimensions(origW, origH, settings, 1.0);
  const canvas = renderToCanvas(img, outW, outH, targetMime);
  const compressedBlob = await canvasToBlob(canvas, targetMime, targetQuality);

  const compressedSize = compressedBlob.size;
  const ratio = Math.round(((originalSize - compressedSize) / originalSize) * 100);
  const url = URL.createObjectURL(compressedBlob);

  return {
    blob: compressedBlob,
    url,
    size: compressedSize,
    width: outW,
    height: outH,
    mimeType: targetMime,
    ratio,
  };
}

export function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export async function downloadAllAsZip(
  items: ImageItem[],
  zipFilename: string = 'compressed-images.zip',
  onProgress?: (percent: number) => void
): Promise<void> {
  const zip = new JSZip();
  const completedItems = items.filter((item) => item.status === 'done' && item.compressedBlob);

  if (completedItems.length === 0) {
    throw new Error('No compressed images available to download');
  }

  const nameCounts: Record<string, number> = {};

  for (const item of completedItems) {
    if (!item.compressedBlob) continue;
    const targetMime = item.compressedType || getMimeType(item.settings.format, item.originalType);
    let outputName = generateOutputFilename(item.name, targetMime, item.settings.filenameSuffix);

    // Prevent duplicate filenames in ZIP
    if (nameCounts[outputName]) {
      const ext = getFileExtension(targetMime);
      const base = outputName.substring(0, outputName.lastIndexOf('.'));
      nameCounts[outputName]++;
      outputName = `${base}-${nameCounts[outputName]}.${ext}`;
    } else {
      nameCounts[outputName] = 1;
    }

    zip.file(outputName, item.compressedBlob);
  }

  const zipBlob = await zip.generateAsync(
    {
      type: 'blob',
      compression: 'DEFLATE',
      compressionOptions: { level: 6 },
    },
    (metadata) => {
      if (onProgress) {
        onProgress(Math.round(metadata.percent));
      }
    }
  );

  downloadBlob(zipBlob, zipFilename);
}
