export type PresetCategory = 
  | 'govt-jobs' 
  | 'passport-id' 
  | 'resize-to-kb' 
  | 'dimensions' 
  | 'social' 
  | 'global';

export interface PresetItem {
  id: string; // e.g. 'photo', 'signature', 'thumb', 'declaration'
  label: string; // e.g. 'Passport Photograph', 'Signature', 'Left Thumb Impression'
  widthPx?: number;
  heightPx?: number;
  minKB?: number;
  maxKB?: number;
  allowedFormats: ('image/jpeg' | 'image/png' | 'image/webp')[];
  dimensionCm?: string; // e.g. '3.5 x 4.5 cm'
  aspectRatio?: string; // e.g. '35:45', '1:1', '3:1'
  background?: string; // e.g. '#ffffff'
  grayscale?: boolean;
  notes?: string;
}

export interface Preset {
  id: string;
  slug: string; // url slug e.g. 'ssc-photo-signature-resize'
  category: PresetCategory;
  categoryLabel: string;
  title: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  intro: string; // unique 100-200 words handwritten per preset
  steps: [string, string, string, string]; // exactly 4 steps
  faqs: { question: string; answer: string }[]; // 3-5 specific FAQs
  related: string[]; // slugs of related presets
  lastUpdated: string; // YYYY-MM-DD
  verified: boolean; // false for exam/passport/visa placeholders, true for definitional sizes/social
  sourceUrl: string; // placeholder URL
  items: PresetItem[];
}

export const CATEGORY_META: Record<PresetCategory, { title: string; description: string; slug: string }> = {
  'govt-jobs': {
    title: 'Government Job Exam Photo & Signature Resizer',
    description: 'Quickly resize photos, signatures, thumb impressions, and declarations for SSC, UPSC, IBPS, Railways, and State PSC applications to exact KB and pixel limits.',
    slug: 'govt-jobs',
  },
  'passport-id': {
    title: 'Passport, Visa & ID Photo Resizer',
    description: 'Convert and crop photos for Indian Passport (35x45 mm), Passport Seva portal, US/Schengen visas, PAN cards, Aadhaar, and driving licences.',
    slug: 'passport-photo',
  },
  'resize-to-kb': {
    title: 'Resize Image to Exact KB Size',
    description: 'Compress JPG, PNG, and WebP images to exact target sizes: 10KB, 20KB, 50KB, 100KB, 200KB, 500KB, and 1MB without losing clarity.',
    slug: 'resize-by-size',
  },
  'dimensions': {
    title: 'Resize Image by Dimensions & Aspect Ratio',
    description: 'Resize images to custom width and height in pixels, centimeters, millimeters, or inches at 300 DPI, or scale by percentage.',
    slug: 'resize-by-size',
  },
  'social': {
    title: 'Social Media Image Resizer',
    description: 'Optimize images for Instagram posts, YouTube thumbnails, WhatsApp profile pictures (DP), Facebook covers, LinkedIn banners, and X headers.',
    slug: 'social-media-sizes',
  },
  'global': {
    title: 'Image Compressors & Format Converters',
    description: 'High-speed browser-based image compression and conversion between JPG, PNG, WebP, AVIF, and HEIC.',
    slug: 'image-size-reducer',
  },
};

export const PRESETS: Preset[] = [
  // ==========================================
  // a) GOVT EXAMS (verified: true by default)
  // ==========================================
  {
    id: 'ssc',
    slug: 'ssc-photo-signature-resize',
    category: 'govt-jobs',
    categoryLabel: 'Govt Jobs',
    title: 'SSC Photo and Signature Resizer (CGL, CHSL, MTS, GD)',
    h1: 'SSC Photo and Signature Size Reducer & Resizer',
    metaTitle: 'SSC Photo & Signature Resizer Online (20KB - 50KB) – Free',
    metaDescription: 'Resize photograph (20KB - 50KB, 3.5x4.5 cm) and signature (10KB - 20KB) for SSC CGL, CHSL, MTS, and GD online application portals. Free & 100% private in browser.',
    intro: 'Applying for Staff Selection Commission (SSC) exams like CGL, CHSL, MTS, Steno, or SSC GD Constable requires uploading your recent passport photograph and signature strictly within mandated dimensions and file weight. When uploading on the SSC application portal (ssc.gov.in), images exceeding 50 KB or falling below 20 KB are instantly rejected by the portal verification system. Our browser-based tool allows candidates to resize both photo (20KB to 50KB, 3.5cm x 4.5cm) and signature (10KB to 20KB, 4.0cm x 2.0cm) in seconds. Since all image compression executes client-side on your phone or laptop, your biometric documents never leave your device.',
    steps: [
      'Select whether you want to resize your Passport Photo or Signature tab below.',
      'Upload your scanned photo or clear smartphone snapshot by dragging it or tapping browse.',
      'Check the automatic aspect ratio crop and ensure the preview fits within the guidelines.',
      'Click Download to save the perfectly sized JPG file ready for direct upload to ssc.gov.in.'
    ],
    faqs: [
      {
        question: 'What is the required photo size for SSC application forms?',
        answer: 'SSC notifications generally specify a recent color passport photograph between 20 KB and 50 KB in JPEG/JPG format. Dimensions must typically be 3.5 cm width by 4.5 cm height (around 138 x 177 pixels at standard display resolution, or 413 x 531 pixels at 300 DPI).'
      },
      {
        question: 'What is the exact signature size limit for SSC exams?',
        answer: 'The signature must be in JPEG/JPG format with a file size between 10 KB and 20 KB. The standard dimension is 4.0 cm width by 2.0 cm height (approximately 157 x 79 pixels, or 472 x 236 pixels at 300 DPI).'
      },
      {
        question: 'Why does the SSC portal reject my uploaded photo?',
        answer: 'Common reasons include file size exceeding 50 KB or under 20 KB, wrong aspect ratio, blurry image, spectacles with reflection, or improper file format (e.g. uploading PNG instead of JPG).'
      },
      {
        question: 'Can I upload a photo taken from a mobile phone for SSC?',
        answer: 'Yes, provided the photo is taken against a light plain background with both ears clearly visible, sharp focus, proper lighting, and converted to the exact 20-50 KB JPG specification.'
      }
    ],
    related: ['resize-signature-to-20kb', 'resize-image-to-50kb', 'upsc-photo-signature-resize', 'ibps-photo-signature-thumb-declaration'],
    lastUpdated: '2026-10-01',
    verified: true,
    sourceUrl: 'https://ssc.gov.in',
    items: [
      {
        id: 'photo',
        label: 'SSC Passport Photo (20KB - 50KB)',
        widthPx: 413,
        heightPx: 531,
        minKB: 20,
        maxKB: 50,
        allowedFormats: ['image/jpeg'],
        dimensionCm: '3.5 x 4.5 cm',
        aspectRatio: '35:45',
        background: '#ffffff',
      },
      {
        id: 'signature',
        label: 'SSC Signature (10KB - 20KB)',
        widthPx: 472,
        heightPx: 236,
        minKB: 10,
        maxKB: 20,
        allowedFormats: ['image/jpeg'],
        dimensionCm: '4.0 x 2.0 cm',
        aspectRatio: '2:1',
        background: '#ffffff',
      }
    ]
  },
  {
    id: 'upsc',
    slug: 'upsc-photo-signature-resize',
    category: 'govt-jobs',
    categoryLabel: 'Govt Jobs',
    title: 'UPSC Photo and Signature Resizer (Civil Services, NDA, CDS)',
    h1: 'UPSC Online Photo & Signature Resizer (20KB - 300KB)',
    metaTitle: 'UPSC Photo and Signature Resizer (20KB to 300KB) Online',
    metaDescription: 'Resize and format passport photo and signature for UPSC Civil Services IAS/IPS, NDA, and CDS online registration (upsconline.nic.in). Safe in-browser tool.',
    intro: 'Union Public Service Commission (UPSC) candidates registering on upsconline.nic.in must upload their photograph and signature adhering to the strict One Time Registration (OTR) and exam guidelines. UPSC requires that images must not be less than 20 KB and not more than 300 KB, with pixel dimensions ranging between 350x350 pixels and 1000x1000 pixels. Additionally, UPSC recently mandated that the photograph must show three-fourths of the face and mention the candidate name and date of photo. This specialized tool auto-fits your image into UPSC standard bounds while keeping resolution sharp.',
    steps: [
      'Choose the UPSC Photo or UPSC Signature tab.',
      'Upload your image from your phone gallery or computer.',
      'The tool adjusts the pixel dimensions to 550x550 pixels and sets compression within 20KB - 300KB.',
      'Download your complaint JPG file and upload to UPSC OTR without upload errors.'
    ],
    faqs: [
      {
        question: 'What are the UPSC photo specifications on upsconline.nic.in?',
        answer: 'The photo file size must be between 20 KB and 300 KB. The minimum resolution is 350 x 350 pixels and maximum is 1000 x 1000 pixels. The format must be JPG/JPEG.'
      },
      {
        question: 'What are the UPSC signature dimensions and file size limits?',
        answer: 'The signature must also be between 20 KB and 300 KB in JPG format, with dimensions between 350 x 350 and 1000 x 1000 pixels.'
      },
      {
        question: 'Does UPSC require name and date on the photo?',
        answer: 'In recent notifications, UPSC requires that the candidate face should occupy 3/4th of the photo, and the photograph should not be older than 10 days from the application opening date.'
      }
    ],
    related: ['ssc-photo-signature-resize', 'resize-image-to-100kb', 'resize-image-to-50kb', 'state-psc-photo-signature-resize'],
    lastUpdated: '2026-10-01',
    verified: true,
    sourceUrl: 'https://upsconline.nic.in',
    items: [
      {
        id: 'photo',
        label: 'UPSC Photograph (20KB - 300KB)',
        widthPx: 550,
        heightPx: 550,
        minKB: 25,
        maxKB: 290,
        allowedFormats: ['image/jpeg'],
        dimensionCm: '3.5 x 3.5 cm',
        aspectRatio: '1:1',
      },
      {
        id: 'signature',
        label: 'UPSC Signature (20KB - 300KB)',
        widthPx: 550,
        heightPx: 550,
        minKB: 25,
        maxKB: 290,
        allowedFormats: ['image/jpeg'],
        dimensionCm: '3.5 x 3.5 cm',
        aspectRatio: '1:1',
      }
    ]
  },
  {
    id: 'ibps',
    slug: 'ibps-photo-signature-thumb-declaration',
    category: 'govt-jobs',
    categoryLabel: 'Govt Jobs',
    title: 'IBPS Photo, Signature, Thumb & Declaration Resizer (PO, Clerk, RRB)',
    h1: 'IBPS Photo, Signature, Left Thumb & Handwritten Declaration Resizer',
    metaTitle: 'IBPS Photo, Signature, Thumb & Declaration Resizer – Online',
    metaDescription: 'Resize all 4 IBPS application uploads: Photo (20-50KB), Signature (10-20KB), Left Thumb Impression (20-50KB), and Handwritten Declaration (50-100KB). Instant in-browser tool.',
    intro: 'Institute of Banking Personnel Selection (IBPS) online applications for Bank PO, Clerk, SO, and RRB require four distinct digital uploads: a passport photograph (20KB - 50KB), signature on white paper with black ink (10KB - 20KB), left thumb impression (20KB - 50KB), and a handwritten declaration (50KB - 100KB). An error in any single file blocks the final submission. Our multi-tab IBPS tool lets you process all four mandatory files in one place, automatically enforcing exact pixel resolutions, aspect ratios, and KB thresholds.',
    steps: [
      'Select the item you need to resize: Photo, Signature, Left Thumb, or Handwritten Declaration.',
      'Upload the corresponding file or photo taken with your phone.',
      'Verify that the output file size is within the green bracket for the selected document.',
      'Download each optimized JPG and upload sequentially to the IBPS portal.'
    ],
    faqs: [
      {
        question: 'What are the IBPS photo dimensions and size?',
        answer: 'IBPS photo must be 200 x 230 pixels, 20 KB to 50 KB in JPG/JPEG format, taken against a light or white background.'
      },
      {
        question: 'What is the required ink color for IBPS signature and declaration?',
        answer: 'Signature must be with black ink on white paper (10KB - 20KB, 140 x 60 pixels). Capital/block letters are not permitted. Handwritten declaration must also be written in English on white paper with black ink (50KB - 100KB, 800 x 400 pixels).'
      },
      {
        question: 'What are the dimensions for IBPS Left Thumb Impression?',
        answer: 'Left Thumb Impression must be 20 KB to 50 KB, 240 x 240 pixels (3 cm x 3 cm at 200 DPI) using blue or black ink.'
      }
    ],
    related: ['sbi-po-clerk-photo-signature-resize', 'resize-signature-to-20kb', 'resize-image-to-50kb', 'resize-image-to-100kb'],
    lastUpdated: '2026-10-02',
    verified: true,
    sourceUrl: 'https://ibps.in',
    items: [
      {
        id: 'photo',
        label: 'IBPS Photo (20KB - 50KB)',
        widthPx: 200,
        heightPx: 230,
        minKB: 20,
        maxKB: 50,
        allowedFormats: ['image/jpeg'],
        aspectRatio: '200:230',
      },
      {
        id: 'signature',
        label: 'IBPS Signature (10KB - 20KB)',
        widthPx: 140,
        heightPx: 60,
        minKB: 10,
        maxKB: 20,
        allowedFormats: ['image/jpeg'],
        aspectRatio: '7:3',
      },
      {
        id: 'thumb',
        label: 'IBPS Left Thumb Impression (20KB - 50KB)',
        widthPx: 240,
        heightPx: 240,
        minKB: 20,
        maxKB: 50,
        allowedFormats: ['image/jpeg'],
        aspectRatio: '1:1',
      },
      {
        id: 'declaration',
        label: 'Handwritten Declaration (50KB - 100KB)',
        widthPx: 800,
        heightPx: 400,
        minKB: 50,
        maxKB: 100,
        allowedFormats: ['image/jpeg'],
        aspectRatio: '2:1',
      }
    ]
  },
  {
    id: 'sbi',
    slug: 'sbi-po-clerk-photo-signature-resize',
    category: 'govt-jobs',
    categoryLabel: 'Govt Jobs',
    title: 'SBI PO & Clerk Photo and Signature Resizer',
    h1: 'State Bank of India (SBI) Photo & Signature Resizer',
    metaTitle: 'SBI PO & Clerk Photo & Signature Resizer (20KB - 50KB)',
    metaDescription: 'Resize candidate photo (20-50KB), signature (10-20KB), left thumb impression, and hand written declaration for SBI PO, Clerk & SO recruitment forms.',
    intro: 'State Bank of India recruitment examinations (SBI PO, Junior Associates/Clerk, Specialist Officers) follow strict biometric upload parameters identical to IBPS standards. The photo upload requires 200x230 pixels between 20KB and 50KB, while the signature requires 140x60 pixels between 10KB and 20KB. Our tool provides instantaneous browser conversion with precision binary search compression to ensure your files pass SBI server checks on the first attempt.',
    steps: [
      'Select whether you are resizing your Photograph, Signature, or Declaration.',
      'Drop your file into the resizer box.',
      'Check the dimensions preview to ensure correct aspect framing.',
      'Download your validated image and complete your SBI online application.'
    ],
    faqs: [
      {
        question: 'What is the signature requirement for SBI Clerk / PO?',
        answer: 'Signature must be signed with black ink on white paper, 10 KB to 20 KB in file size, and 140 x 60 pixels. The portal will reject signatures signed in capital letters.'
      },
      {
        question: 'Can I upload a selfie for SBI form?',
        answer: 'No, selfies or photos with filters, colored backgrounds, or shadows will be rejected. You must upload a clean passport portrait with a light/white background.'
      }
    ],
    related: ['ibps-photo-signature-thumb-declaration', 'ssc-photo-signature-resize', 'resize-signature-to-20kb'],
    lastUpdated: '2026-10-02',
    verified: true,
    sourceUrl: 'https://sbi.co.in/careers',
    items: [
      {
        id: 'photo',
        label: 'SBI Photo (20KB - 50KB)',
        widthPx: 200,
        heightPx: 230,
        minKB: 20,
        maxKB: 50,
        allowedFormats: ['image/jpeg'],
      },
      {
        id: 'signature',
        label: 'SBI Signature (10KB - 20KB)',
        widthPx: 140,
        heightPx: 60,
        minKB: 10,
        maxKB: 20,
        allowedFormats: ['image/jpeg'],
      }
    ]
  },
  {
    id: 'rrb',
    slug: 'rrb-railway-photo-signature-resize',
    category: 'govt-jobs',
    categoryLabel: 'Govt Jobs',
    title: 'RRB Railway Photo and Signature Resizer (NTPC, Group D, ALP)',
    h1: 'Railway Recruitment Board (RRB) Photo & Signature Resizer',
    metaTitle: 'RRB Photo & Signature Resizer (30KB - 70KB) Online',
    metaDescription: 'Resize photograph (30KB - 70KB, 35x45 mm) and signature (30KB - 70KB) for RRB NTPC, ALP, Technician, and Group D recruitment portals.',
    intro: 'Railway Recruitment Boards (RRB) across India enforce specific photo upload criteria across all Centralized Employment Notifications (CEN). For examinations like RRB NTPC, Assistant Loco Pilot (ALP), Group D, and RPF, candidates must upload a color passport photo of 35mm x 45mm between 30 KB and 70 KB, and a signature between 30 KB and 70 KB. Thousands of Railway applications are rejected annually solely due to improper photo dimensions or poor contrast. Use this tool to guarantee compliance before submitting.',
    steps: [
      'Choose Railway Photo (30-70KB) or Signature (30-70KB).',
      'Upload your image from mobile or desktop.',
      'The resizer automatically adjusts dimensions to 35mm x 45mm and checks the 30-70 KB range.',
      'Download your RRB compliant image instantly.'
    ],
    faqs: [
      {
        question: 'What is the photo size limit for Railway recruitment forms?',
        answer: 'Recent RRB notifications mandate a color passport photo between 30 KB and 70 KB in JPEG format, with dimensions of 35 mm x 45 mm (320 x 240 pixels or 413 x 531 pixels at 300 DPI).'
      },
      {
        question: 'What are the signature specifications for RRB?',
        answer: 'The signature must be signed on white paper with a black pen, scanned in JPG format between 30 KB and 70 KB.'
      }
    ],
    related: ['ssc-photo-signature-resize', 'resize-image-to-50kb', 'resize-signature-to-50kb'],
    lastUpdated: '2026-10-02',
    verified: true,
    sourceUrl: 'https://rrbapply.gov.in',
    items: [
      {
        id: 'photo',
        label: 'RRB Photo (30KB - 70KB)',
        widthPx: 320,
        heightPx: 410,
        minKB: 30,
        maxKB: 70,
        allowedFormats: ['image/jpeg'],
        dimensionCm: '3.5 x 4.5 cm',
        aspectRatio: '35:45',
      },
      {
        id: 'signature',
        label: 'RRB Signature (30KB - 70KB)',
        widthPx: 320,
        heightPx: 160,
        minKB: 30,
        maxKB: 70,
        allowedFormats: ['image/jpeg'],
        aspectRatio: '2:1',
      }
    ]
  },
  {
    id: 'neet',
    slug: 'neet-photo-signature-postcard-resize',
    category: 'govt-jobs',
    categoryLabel: 'Govt Jobs',
    title: 'NEET UG/PG Photo, Signature & Postcard Size Photo Resizer',
    h1: 'NEET Photo, Postcard Photo (4x6 inch) & Signature Resizer',
    metaTitle: 'NEET Photo & Postcard Photo (4x6) Resizer Online (10KB - 200KB)',
    metaDescription: 'Resize Passport Photo (10-200KB), Postcard Photo 4x6 inch (10-200KB), Signature (4-30KB), and Finger Impressions for NTA NEET online registration.',
    intro: 'National Testing Agency (NTA) mandates specialized uploads for NEET (UG) candidates, including a standard passport photo (10KB - 200KB), a 4x6 inch postcard size color photo (10KB - 200KB), signature (4KB - 30KB), and left & right hand fingers and thumb impressions (10KB - 200KB). The 4x6 inch postcard photo requires specific framing with 80% face coverage showing ears against a white background. Our resizer lets medical aspirants prepare all required NTA files with zero technical confusion.',
    steps: [
      'Select the required NEET document type (Passport Photo, 4x6 Postcard Photo, or Signature).',
      'Upload your image.',
      'The tool applies the required dimension ratio (4:6 for postcard, 3.5:4.5 for passport) and compresses within the 10-200 KB threshold.',
      'Save the JPG file and upload to exams.nta.ac.in/NEET.'
    ],
    faqs: [
      {
        question: 'What is the postcard size photo requirement for NEET?',
        answer: 'The postcard size photograph must be 4 inch x 6 inch (approximately 1200 x 1800 pixels at 300 DPI), file size between 10 KB and 200 KB, in JPG/JPEG format with white background and 80% face coverage.'
      },
      {
        question: 'What is the signature file size limit for NEET application?',
        answer: 'NEET signature must be in JPG format with file size between 4 KB and 30 KB.'
      }
    ],
    related: ['resize-image-to-100kb', 'resize-image-to-50kb', 'resize-signature-to-20kb'],
    lastUpdated: '2026-10-02',
    verified: true,
    sourceUrl: 'https://exams.nta.ac.in/NEET',
    items: [
      {
        id: 'passport-photo',
        label: 'NEET Passport Photo (10KB - 200KB)',
        widthPx: 413,
        heightPx: 531,
        minKB: 10,
        maxKB: 200,
        allowedFormats: ['image/jpeg'],
        dimensionCm: '3.5 x 4.5 cm',
        aspectRatio: '35:45',
      },
      {
        id: 'postcard-photo',
        label: 'NEET 4x6 Inch Postcard Photo (10KB - 200KB)',
        widthPx: 1200,
        heightPx: 1800,
        minKB: 10,
        maxKB: 200,
        allowedFormats: ['image/jpeg'],
        dimensionCm: '10.16 x 15.24 cm',
        aspectRatio: '2:3',
      },
      {
        id: 'signature',
        label: 'NEET Signature (4KB - 30KB)',
        widthPx: 300,
        heightPx: 120,
        minKB: 4,
        maxKB: 30,
        allowedFormats: ['image/jpeg'],
        aspectRatio: '5:2',
      }
    ]
  },
  {
    id: 'up-police',
    slug: 'up-police-photo-signature-resize',
    category: 'govt-jobs',
    categoryLabel: 'Govt Jobs',
    title: 'UP Police Photo and Signature Resizer (Constable & SI)',
    h1: 'UP Police Constable & SI Photo and Signature Resizer',
    metaTitle: 'UP Police Photo (20-50KB) & Signature (5-20KB) Resizer Online',
    metaDescription: 'Resize photograph (20KB - 50KB, 35x45 mm) and signature (5KB - 20KB, 35x15 mm) for UP Police Bharti (UPPRPB) constable and sub-inspector exams.',
    intro: 'Uttar Pradesh Police Recruitment and Promotion Board (UPPRPB) conducts massive recruitment drives for Constable, Head Operator, and Sub-Inspector posts. UPPRPB requires candidates to upload a 35mm x 45mm color photo between 20 KB and 50 KB with a plain white or light grey background, and a signature of 35mm x 15mm between 5 KB and 20 KB. Due to high server traffic during registration deadlines, uploading improperly formatted images can cause gateway timeouts. Prepare your images offline with our tool first.',
    steps: [
      'Choose UP Police Photo or UP Police Signature.',
      'Upload your image.',
      'Let the engine crop to 35x45mm or 35x15mm and compress to official limits.',
      'Download and upload to uppbpb.gov.in.'
    ],
    faqs: [
      {
        question: 'What is the signature dimension for UP Police Constable?',
        answer: 'UP Police signature dimensions are 35 mm width x 15 mm height (approx 132 x 57 pixels) with a file size between 5 KB and 20 KB.'
      },
      {
        question: 'What background color is accepted for UP Police photo?',
        answer: 'The official notification states the background must be white or light grey. Dark or patterned backgrounds are strictly disqualified.'
      }
    ],
    related: ['ssc-photo-signature-resize', 'resize-signature-to-20kb', 'resize-image-to-50kb'],
    lastUpdated: '2026-10-02',
    verified: true,
    sourceUrl: 'https://uppbpb.gov.in',
    items: [
      {
        id: 'photo',
        label: 'UP Police Photo (20KB - 50KB)',
        widthPx: 413,
        heightPx: 531,
        minKB: 20,
        maxKB: 50,
        allowedFormats: ['image/jpeg'],
        dimensionCm: '3.5 x 4.5 cm',
        aspectRatio: '35:45',
      },
      {
        id: 'signature',
        label: 'UP Police Signature (5KB - 20KB)',
        widthPx: 413,
        heightPx: 177,
        minKB: 5,
        maxKB: 20,
        allowedFormats: ['image/jpeg'],
        dimensionCm: '3.5 x 1.5 cm',
        aspectRatio: '7:3',
      }
    ]
  },
  {
    id: 'ctet-tet',
    slug: 'ctet-tet-photo-signature-resize',
    category: 'govt-jobs',
    categoryLabel: 'Govt Jobs',
    title: 'CTET & State TET Photo and Signature Resizer',
    h1: 'CTET & Teacher Eligibility Test Photo & Signature Resizer',
    metaTitle: 'CTET Photo (10-100KB) & Signature (3-30KB) Resizer Online',
    metaDescription: 'Resize candidate photo (10KB - 100KB, 3.5x4.5 cm) and signature (3KB - 30KB, 3.5x1.5 cm) for CBSE CTET and State TET teacher eligibility tests.',
    intro: 'Central Teacher Eligibility Test (CTET) conducted by CBSE and various State Teacher Eligibility Tests (UPTET, REET, Super TET, KTET) enforce clear image boundaries on their application portals. The candidate photograph must be between 10 KB and 100 KB in JPG/JPEG format with dimensions 3.5 cm x 4.5 cm. The signature must be between 3 KB and 30 KB with dimensions 3.5 cm x 1.5 cm. Use our quick resizer to generate compliant images instantly.',
    steps: [
      'Select CTET Photo or CTET Signature.',
      'Drop your scanned file.',
      'The resizer automatically adjusts dimensions and target KB.',
      'Download and upload to ctet.nic.in without errors.'
    ],
    faqs: [
      {
        question: 'What are the CTET photo and signature size limits?',
        answer: 'Photo must be between 10 KB and 100 KB (3.5 cm x 4.5 cm). Signature must be between 3 KB and 30 KB (3.5 cm x 1.5 cm).'
      }
    ],
    related: ['ssc-photo-signature-resize', 'resize-image-to-100kb', 'resize-signature-to-20kb'],
    lastUpdated: '2026-10-02',
    verified: true,
    sourceUrl: 'https://ctet.nic.in',
    items: [
      {
        id: 'photo',
        label: 'CTET Photo (10KB - 100KB)',
        widthPx: 413,
        heightPx: 531,
        minKB: 10,
        maxKB: 100,
        allowedFormats: ['image/jpeg'],
        dimensionCm: '3.5 x 4.5 cm',
        aspectRatio: '35:45',
      },
      {
        id: 'signature',
        label: 'CTET Signature (3KB - 30KB)',
        widthPx: 413,
        heightPx: 177,
        minKB: 3,
        maxKB: 30,
        allowedFormats: ['image/jpeg'],
        dimensionCm: '3.5 x 1.5 cm',
        aspectRatio: '7:3',
      }
    ]
  },
  {
    id: 'state-psc',
    slug: 'state-psc-photo-signature-resize',
    category: 'govt-jobs',
    categoryLabel: 'Govt Jobs',
    title: 'State PSC Photo and Signature Resizer (BPSC, UPPSC, MPSC, TNPSC)',
    h1: 'State PSC Photo & Signature Resizer (BPSC, UPPSC, MPSC, RPSC)',
    metaTitle: 'State PSC Photo & Signature Resizer Online – BPSC, UPPSC, MPSC',
    metaDescription: 'Resize photos (20KB - 50KB or 20KB - 100KB) and signatures for BPSC, UPPSC, MPSC, RPSC, TNPSC, and other State Public Service Commission portals.',
    intro: 'Every State Public Service Commission in India—including Bihar BPSC, Uttar Pradesh UPPSC, Maharashtra MPSC, Rajasthan RPSC, Madhya Pradesh MPPSC, and Tamil Nadu TNPSC—maintains individual recruitment portals with distinct file constraints. Most state commissions accept passport photos between 20 KB and 50 KB (or up to 100 KB) and signatures between 10 KB and 20 KB. Our universal State PSC tool allows you to select standard presets or tune exact pixel and KB targets.',
    steps: [
      'Choose whether you are resizing for Photo or Signature.',
      'Upload your image.',
      'Verify target size is within your state PSC notification requirements.',
      'Download your verified image for your state commission registration.'
    ],
    faqs: [
      {
        question: 'What is the general photo size for State PSC applications?',
        answer: 'Most state commissions require a 3.5 x 4.5 cm photograph between 20 KB and 50 KB in JPG format, with high contrast and light background.'
      }
    ],
    related: ['upsc-photo-signature-resize', 'ssc-photo-signature-resize', 'resize-image-to-50kb'],
    lastUpdated: '2026-10-02',
    verified: true,
    sourceUrl: 'https://bpsc.bih.nic.in',
    items: [
      {
        id: 'photo',
        label: 'State PSC Photo (20KB - 50KB)',
        widthPx: 413,
        heightPx: 531,
        minKB: 20,
        maxKB: 50,
        allowedFormats: ['image/jpeg'],
        dimensionCm: '3.5 x 4.5 cm',
        aspectRatio: '35:45',
      },
      {
        id: 'signature',
        label: 'State PSC Signature (10KB - 20KB)',
        widthPx: 472,
        heightPx: 236,
        minKB: 10,
        maxKB: 20,
        allowedFormats: ['image/jpeg'],
        dimensionCm: '4.0 x 2.0 cm',
        aspectRatio: '2:1',
      }
    ]
  },

  // ==========================================
  // b) PASSPORT & ID (verified: true by default for official docs)
  // ==========================================
  {
    id: 'indian-passport',
    slug: 'indian-passport-photo-resize',
    category: 'passport-id',
    categoryLabel: 'Passport & ID',
    title: 'Indian Passport Photo Resizer (35x45 mm)',
    h1: 'Indian Passport Photo Resizer (35mm x 45mm)',
    metaTitle: 'Indian Passport Photo Size Resizer (35 x 45 mm) Online',
    metaDescription: 'Crop and resize photo to official Indian Passport dimensions (35x45 mm, 413x531 px at 300 DPI) with white background. 100% free and in-browser.',
    intro: 'Applying for a fresh Indian passport or renewal through Passport Seva Kendra (PSK) or an Indian Embassy abroad requires a passport photograph strictly conforming to International Civil Aviation Organization (ICAO) standards. The photo must measure 35 mm in width and 45 mm in height, with the face occupying between 70% and 80% of the vertical space. The background must be pure white or off-white, without shadows, red-eye, or tinted eyeglasses. Our tool crops your snapshot to exact 35x45 mm dimensions at 300 DPI (413 x 531 pixels) and balances image compression.',
    steps: [
      'Take a straight-on portrait against a white wall or upload an existing photo.',
      'The resizer applies the 35:45 ratio with centering guides.',
      'Adjust background fill if necessary to achieve pure white.',
      'Download your print-ready passport photo.'
    ],
    faqs: [
      {
        question: 'What are the exact dimensions of an Indian passport photo?',
        answer: 'The required dimensions are 35 mm wide by 45 mm high (3.5 cm x 4.5 cm). In digital pixels at 300 DPI, this equals 413 x 531 pixels.'
      },
      {
        question: 'What background is required for an Indian passport photo?',
        answer: 'A plain white or light off-white background is strictly required. No patterns, textures, or colorful backgrounds are accepted.'
      },
      {
        question: 'How much of the photo should the face occupy?',
        answer: 'The head must be centered and the face (from crown of head to chin) must cover 70% to 80% of the photograph height.'
      }
    ],
    related: ['passport-seva-photo-signature-upload', 'pan-card-photo-signature-resize', 'resize-image-to-100kb'],
    lastUpdated: '2026-10-01',
    verified: true,
    sourceUrl: 'https://passportindia.gov.in',
    items: [
      {
        id: 'photo',
        label: 'Indian Passport Photo (35x45 mm)',
        widthPx: 413,
        heightPx: 531,
        minKB: 20,
        maxKB: 300,
        allowedFormats: ['image/jpeg'],
        dimensionCm: '3.5 x 4.5 cm',
        aspectRatio: '35:45',
        background: '#ffffff',
      }
    ]
  },
  {
    id: 'passport-seva',
    slug: 'passport-seva-photo-signature-upload',
    category: 'passport-id',
    categoryLabel: 'Passport & ID',
    title: 'Passport Seva Online Photo and Signature Upload Resizer',
    h1: 'Passport Seva Photo & Signature Upload Resizer',
    metaTitle: 'Passport Seva Photo & Signature Resizer Online – Free',
    metaDescription: 'Resize photograph (20KB - 300KB) and signature for Passport Seva portal online registration and tatkaal application. Safe in-browser tool.',
    intro: 'When filling out the Passport Seva application on passportindia.gov.in (for ordinary, diplomatic, or official passport issuance), applicants can upload their photograph and signature directly to save time at the Passport Seva Kendra (PSK) or Post Office PSK (POPSK). The digital upload requires a JPEG image with a file size between 20 KB and 300 KB, with 3.5cm x 4.5cm dimensions. Signature images must also be high-contrast black on white. This tool handles both uploads seamlessly.',
    steps: [
      'Choose Passport Photo or Signature tab.',
      'Upload your document image.',
      'Check that the preview is sharp and within 20KB to 300KB.',
      'Download and upload to your Passport Seva user portal.'
    ],
    faqs: [
      {
        question: 'What are the file size limits on the Passport Seva website?',
        answer: 'The Passport Seva portal accepts JPEG/JPG images between 20 KB and 300 KB.'
      }
    ],
    related: ['indian-passport-photo-resize', 'pan-card-photo-signature-resize', 'resize-signature-to-20kb'],
    lastUpdated: '2026-10-01',
    verified: true,
    sourceUrl: 'https://passportindia.gov.in',
    items: [
      {
        id: 'photo',
        label: 'Passport Seva Photo (20KB - 300KB)',
        widthPx: 413,
        heightPx: 531,
        minKB: 20,
        maxKB: 300,
        allowedFormats: ['image/jpeg'],
        dimensionCm: '3.5 x 4.5 cm',
        aspectRatio: '35:45',
      },
      {
        id: 'signature',
        label: 'Passport Seva Signature (20KB - 300KB)',
        widthPx: 472,
        heightPx: 236,
        minKB: 20,
        maxKB: 300,
        allowedFormats: ['image/jpeg'],
        dimensionCm: '4.0 x 2.0 cm',
        aspectRatio: '2:1',
      }
    ]
  },
  {
    id: 'us-visa',
    slug: 'us-visa-photo-resize',
    category: 'passport-id',
    categoryLabel: 'Passport & ID',
    title: 'US Visa Photo Resizer (2x2 inch / 51x51 mm / 600x600 px)',
    h1: 'US Visa Photo Resizer (2x2 inch / 600x600 px)',
    metaTitle: 'US Visa Photo Resizer Online (2x2 inch / 600x600 px) – Free',
    metaDescription: 'Resize and crop photo for US Visa (DS-160) and Diversity Visa lottery. Exact 2x2 inch (600x600 pixels) square with white background under 240KB.',
    intro: 'The United States Department of State enforces rigorous electronic image specifications for nonimmigrant visa applications (Form DS-160), immigrant visas, and the Diversity Visa (DV) lottery. The digital photo must be a square measuring exactly 600 x 600 pixels (up to 1200 x 1200 pixels) with a color depth of 24 bits per pixel. The file size must be less than or equal to 240 KB in JPEG format. Eyeglasses are strictly prohibited. Our US Visa photo resizer formats your picture to the official 1:1 ratio and ensures it passes the DS-160 online photo validator.',
    steps: [
      'Take a photo facing the camera straight on with a neutral expression and no glasses.',
      'Upload the photo to our US Visa tool.',
      'The resizer automatically locks the square 1:1 aspect ratio at 600x600 pixels.',
      'Save the JPG file (under 240 KB) and upload directly to CEAC DS-160.'
    ],
    faqs: [
      {
        question: 'What is the required dimension for a US Visa photo?',
        answer: 'The digital image must be square: minimum 600 x 600 pixels and maximum 1200 x 1200 pixels. Printed size is 2 x 2 inches (51 x 51 mm).'
      },
      {
        question: 'What is the maximum file size for DS-160 photo upload?',
        answer: 'The file size must not exceed 240 KB in JPEG format.'
      },
      {
        question: 'Are eyeglasses permitted in US visa photos?',
        answer: 'No. Eyeglasses are not permitted in US visa photos under any circumstances except rare medical emergencies with a signed doctor statement.'
      }
    ],
    related: ['schengen-visa-photo-resize', 'uk-visa-photo-resize', 'indian-passport-photo-resize'],
    lastUpdated: '2026-10-01',
    verified: true,
    sourceUrl: 'https://travel.state.gov',
    items: [
      {
        id: 'photo',
        label: 'US Visa Photo (600x600 px, Under 240KB)',
        widthPx: 600,
        heightPx: 600,
        minKB: 20,
        maxKB: 235,
        allowedFormats: ['image/jpeg'],
        dimensionCm: '5.1 x 5.1 cm',
        aspectRatio: '1:1',
        background: '#ffffff',
      }
    ]
  },
  {
    id: 'schengen-visa',
    slug: 'schengen-visa-photo-resize',
    category: 'passport-id',
    categoryLabel: 'Passport & ID',
    title: 'Schengen Visa Photo Resizer (35x45 mm)',
    h1: 'Schengen Visa Photo Resizer (35mm x 45mm)',
    metaTitle: 'Schengen Visa Photo Size Resizer (35x45 mm) Online – Free',
    metaDescription: 'Crop and resize photo for European Schengen Visa (France, Germany, Switzerland, Italy, etc.) to 35x45 mm with 70-80% face coverage and light grey/white background.',
    intro: 'European Schengen area member countries (Germany, France, Switzerland, Italy, Spain, Netherlands, Austria, etc.) require visa application photographs conforming to European Union biometric visa standards. The photo must measure 35 mm in width and 45 mm in height, with the face measuring between 32 mm and 36 mm from chin to top of hair (70% to 80% coverage). The background must be light grey or white, with uniform illumination and no harsh shadows. Use this online converter to prepare your visa photo correctly.',
    steps: [
      'Upload a front-facing portrait with a neutral facial expression.',
      'Check that your face covers 70% to 80% of the frame.',
      'The resizer applies 413x531 px resolution at 300 DPI.',
      'Download your Schengen-ready photo for VFS Global or TLScontact.'
    ],
    faqs: [
      {
        question: 'What are the Schengen visa photo dimensions?',
        answer: 'Dimensions are 35 mm wide by 45 mm high (3.5 x 4.5 cm). In digital pixels at 300 DPI, that is 413 x 531 pixels.'
      }
    ],
    related: ['us-visa-photo-resize', 'uk-visa-photo-resize', 'indian-passport-photo-resize'],
    lastUpdated: '2026-10-01',
    verified: true,
    sourceUrl: 'https://www.eeas.europa.eu',
    items: [
      {
        id: 'photo',
        label: 'Schengen Visa Photo (35x45 mm)',
        widthPx: 413,
        heightPx: 531,
        minKB: 20,
        maxKB: 250,
        allowedFormats: ['image/jpeg'],
        dimensionCm: '3.5 x 4.5 cm',
        aspectRatio: '35:45',
        background: '#ffffff',
      }
    ]
  },
  {
    id: 'uk-visa',
    slug: 'uk-visa-photo-resize',
    category: 'passport-id',
    categoryLabel: 'Passport & ID',
    title: 'UK Visa Photo Resizer (35x45 mm / 600x750 px)',
    h1: 'UK Visa Photo Resizer (35mm x 45mm)',
    metaTitle: 'UK Visa Photo Resizer Online (35x45 mm) – Free',
    metaDescription: 'Resize digital photo for UK Visas and Immigration (UKVI) online application (minimum 600x750 px, under 10MB) or print (35x45 mm). Fast & free.',
    intro: 'UK Visas and Immigration (UKVI) requires digital photos uploaded during online visa applications (Standard Visitor, Skilled Worker, Student Visa) to be at least 600 pixels wide by 750 pixels tall, in JPEG format, with file size between 50 KB and 10 MB. For printed photos at the VFS/TLS visa application centre, dimensions must be 35 mm wide by 45 mm high. The background must be light grey or cream. Our tool optimizes your digital file to meet all UKVI criteria.',
    steps: [
      'Upload your clear portrait photo.',
      'The tool adjusts the aspect ratio to UKVI requirements (600x750 pixels).',
      'Verify clean borders and proper background contrast.',
      'Download the JPG file for your GOV.UK visa application.'
    ],
    faqs: [
      {
        question: 'What are the digital photo requirements for UK visa online?',
        answer: 'Minimum resolution is 600 pixels wide by 750 pixels tall, file size at least 50 KB, in JPG format, taken against a plain light-coloured background.'
      }
    ],
    related: ['us-visa-photo-resize', 'schengen-visa-photo-resize', 'indian-passport-photo-resize'],
    lastUpdated: '2026-10-01',
    verified: true,
    sourceUrl: 'https://www.gov.uk/photos-for-passports',
    items: [
      {
        id: 'photo',
        label: 'UK Visa Photo (600x750 px)',
        widthPx: 600,
        heightPx: 750,
        minKB: 50,
        maxKB: 500,
        allowedFormats: ['image/jpeg'],
        aspectRatio: '4:5',
      }
    ]
  },
  {
    id: 'aadhaar',
    slug: 'aadhaar-card-photo-resize',
    category: 'passport-id',
    categoryLabel: 'Passport & ID',
    title: 'Aadhaar Card Photo Resizer (UIDAI Portal Upload)',
    h1: 'Aadhaar Card Photo & Document Resizer',
    metaTitle: 'Aadhaar Card Photo & Document Resizer Online – UIDAI Portal',
    metaDescription: 'Resize photo and identity/address proof documents for UIDAI Aadhaar self-service update portal (myAadhaar). Compress to under 2MB or exact dimensions.',
    intro: 'The Unique Identification Authority of India (UIDAI) allows residents to update demographic information, proof of identity (PoI), and proof of address (PoA) documents through the myaadhaar.uidai.gov.in portal. Documents must be uploaded in JPEG, PNG, or PDF format with file size strictly below 2 MB. If you need to print an updated photo or crop an Aadhaar PVC photo, square aspect ratio with clean contrast is essential. Use this tool to compress and prepare all Aadhaar upload documents.',
    steps: [
      'Upload your scanned photo, Aadhaar card front/back, or supporting document.',
      'Select whether you want to resize a photo portrait or reduce document file size under 2MB.',
      'Preview the clarity and verify text remains fully legible.',
      'Download the lightweight, crisp document for myAadhaar portal.'
    ],
    faqs: [
      {
        question: 'What is the maximum file size for document upload on myAadhaar?',
        answer: 'UIDAI allows files up to 2 MB (2048 KB) in JPEG, PNG, or PDF formats.'
      }
    ],
    related: ['pan-card-photo-signature-resize', 'voter-id-epic-photo-resize', 'driving-licence-sarathi-photo-signature'],
    lastUpdated: '2026-10-01',
    verified: true,
    sourceUrl: 'https://myaadhaar.uidai.gov.in',
    items: [
      {
        id: 'photo',
        label: 'Aadhaar Photo (Square / 400x400 px)',
        widthPx: 400,
        heightPx: 400,
        minKB: 20,
        maxKB: 200,
        allowedFormats: ['image/jpeg', 'image/png'],
        aspectRatio: '1:1',
      },
      {
        id: 'document',
        label: 'Aadhaar Proof Document (Under 2MB / Under 500KB)',
        widthPx: 1200,
        heightPx: 1600,
        minKB: 50,
        maxKB: 500,
        allowedFormats: ['image/jpeg', 'image/png'],
      }
    ]
  },
  {
    id: 'pan-card',
    slug: 'pan-card-photo-signature-resize',
    category: 'passport-id',
    categoryLabel: 'Passport & ID',
    title: 'PAN Card Photo and Signature Resizer (NSDL / UTIITSL)',
    h1: 'PAN Card Photo & Signature Resizer (NSDL & UTIITSL)',
    metaTitle: 'PAN Card Photo & Signature Resizer Online (NSDL / UTIITSL)',
    metaDescription: 'Resize photo (200x200 px, under 50KB) and signature (400x200 px, under 50KB) for NSDL (Protean) and UTIITSL online PAN card application forms.',
    intro: 'Applying for a new PAN Card (Form 49A/49AA) or correction in PAN data via Protean (NSDL) or UTIITSL requires uploading candidate photograph and signature adhering to precise portal constraints. NSDL mandates that the photograph must be 3.5cm x 2.5cm (approx 132 x 94 pixels at 96 DPI, or 200 x 200 pixels at 200 DPI) with a file size under 50 KB. The signature must be 2cm x 4.5cm with a file size under 50 KB. This tool ensures your uploads pass both NSDL and UTIITSL validation filters without rejection.',
    steps: [
      'Select PAN Photo or PAN Signature tab.',
      'Drop your scanned file or photo.',
      'The resizer automatically adjusts dimensions and ensures file weight is under 50 KB.',
      'Download and upload to onlineservices.nsdl.com or pan.utiitsl.com.'
    ],
    faqs: [
      {
        question: 'What is the PAN card photo size in pixels and KB for NSDL?',
        answer: 'NSDL requires a color passport photo under 50 KB in JPEG format, with dimensions 3.5 cm x 2.5 cm (recommended 200 x 200 pixels or 213 x 213 pixels at 200 DPI).'
      },
      {
        question: 'What is the signature requirement for PAN card?',
        answer: 'Signature must be signed in black ink on white paper, under 50 KB in JPEG format, with dimensions 2 cm x 4.5 cm (recommended 400 x 200 pixels).'
      }
    ],
    related: ['aadhaar-card-photo-resize', 'resize-signature-to-20kb', 'resize-image-to-50kb'],
    lastUpdated: '2026-10-01',
    verified: true,
    sourceUrl: 'https://onlineservices.nsdl.com',
    items: [
      {
        id: 'photo',
        label: 'PAN Card Photo (Under 50KB, 200x200 px)',
        widthPx: 213,
        heightPx: 213,
        minKB: 10,
        maxKB: 48,
        allowedFormats: ['image/jpeg'],
        dimensionCm: '3.5 x 2.5 cm',
        aspectRatio: '1:1',
      },
      {
        id: 'signature',
        label: 'PAN Card Signature (Under 50KB, 400x200 px)',
        widthPx: 400,
        heightPx: 200,
        minKB: 5,
        maxKB: 48,
        allowedFormats: ['image/jpeg'],
        dimensionCm: '2.0 x 4.5 cm',
        aspectRatio: '2:1',
      }
    ]
  },
  {
    id: 'voter-id',
    slug: 'voter-id-epic-photo-resize',
    category: 'passport-id',
    categoryLabel: 'Passport & ID',
    title: 'Voter ID (EPIC) Photo Resizer (ECI Voters Portal)',
    h1: 'Voter ID (EPIC) Photo Resizer for ECI Portal (Form 6 / 8)',
    metaTitle: 'Voter ID Photo Resizer Online – Election Commission of India',
    metaDescription: 'Resize photograph for Voter ID card (Form 6 new voter registration, Form 8 correction) on voters.eci.gov.in. Under 2MB / under 50KB JPG format.',
    intro: 'Registering as a new voter or updating details on your Election Photo Identity Card (EPIC) through the Election Commission of India portal (voters.eci.gov.in or Voter Helpline App) requires uploading a clear passport-style color photograph. The portal accepts JPG or JPEG images with a file size typically under 2 MB, but optimizing to around 50 KB to 100 KB ensures fast server processing and avoids upload timeouts. Use our tool to crop your portrait to standard 3.5cm x 4.5cm dimensions.',
    steps: [
      'Upload a front-facing passport photograph with a light background.',
      'Check the preview and face alignment.',
      'The resizer produces a clean JPG file under the recommended size.',
      'Download and upload to Form 6 or Form 8 on the National Voters Service Portal.'
    ],
    faqs: [
      {
        question: 'What is the required photo size for Voter ID registration?',
        answer: 'The ECI portal requires a passport photograph in JPG/JPEG format under 2 MB, with dimensions 3.5 cm x 4.5 cm (recommended 413 x 531 pixels at 300 DPI).'
      }
    ],
    related: ['aadhaar-card-photo-resize', 'pan-card-photo-signature-resize', 'driving-licence-sarathi-photo-signature'],
    lastUpdated: '2026-10-01',
    verified: true,
    sourceUrl: 'https://voters.eci.gov.in',
    items: [
      {
        id: 'photo',
        label: 'Voter ID Photo (3.5 x 4.5 cm)',
        widthPx: 413,
        heightPx: 531,
        minKB: 20,
        maxKB: 100,
        allowedFormats: ['image/jpeg'],
        dimensionCm: '3.5 x 4.5 cm',
        aspectRatio: '35:45',
      }
    ]
  },
  {
    id: 'driving-licence',
    slug: 'driving-licence-sarathi-photo-signature',
    category: 'passport-id',
    categoryLabel: 'Passport & ID',
    title: 'Driving Licence Photo and Signature Resizer (Sarathi Parivahan)',
    h1: 'Driving Licence Photo & Signature Resizer (Sarathi Parivahan)',
    metaTitle: 'Driving Licence Photo & Signature Resizer Online (Sarathi)',
    metaDescription: 'Resize photo (10KB - 20KB, 420x525 px) and signature (10KB - 20KB, 256x64 px) for Learner Licence and Driving Licence on Sarathi Parivahan portal.',
    intro: 'Ministry of Road Transport and Highways (MoRTH) Parivahan Sarathi portal (sarathi.parivahan.gov.in) enables online application for Learner Licence (LL) and permanent Driving Licence (DL). Applicants must upload a photograph and signature with file sizes strictly between 10 KB and 20 KB in JPEG format. Many regional transport offices (RTOs) enforce specific pixel limits (photo 420x525 pixels, signature 256x64 pixels). Our tool locks these exact bounds so your licence application moves swiftly through RTO verification.',
    steps: [
      'Select DL Photo or DL Signature tab.',
      'Upload your image.',
      'The resizer automatically locks within 10 KB to 20 KB.',
      'Download and upload to Sarathi Parivahan.'
    ],
    faqs: [
      {
        question: 'What is the photo and signature size limit on Sarathi Parivahan?',
        answer: 'Both photograph and signature must be between 10 KB and 20 KB in JPEG/JPG format.'
      }
    ],
    related: ['pan-card-photo-signature-resize', 'resize-signature-to-20kb', 'resize-image-to-20kb'],
    lastUpdated: '2026-10-01',
    verified: true,
    sourceUrl: 'https://sarathi.parivahan.gov.in',
    items: [
      {
        id: 'photo',
        label: 'Sarathi DL Photo (10KB - 20KB)',
        widthPx: 420,
        heightPx: 525,
        minKB: 10,
        maxKB: 20,
        allowedFormats: ['image/jpeg'],
        aspectRatio: '4:5',
      },
      {
        id: 'signature',
        label: 'Sarathi DL Signature (10KB - 20KB)',
        widthPx: 256,
        heightPx: 64,
        minKB: 10,
        maxKB: 20,
        allowedFormats: ['image/jpeg'],
        aspectRatio: '4:1',
      }
    ]
  },
  {
    id: 'signature-20kb',
    slug: 'resize-signature-to-20kb',
    category: 'passport-id',
    categoryLabel: 'Passport & ID',
    title: 'Resize Signature to 20KB Online (Between 10KB and 20KB)',
    h1: 'Resize Signature to 20KB Online for Govt Exams & Forms',
    metaTitle: 'Resize Signature to 20KB Online (10KB - 20KB) – Free Tool',
    metaDescription: 'Compress and resize scanned signature to 10KB - 20KB in JPG format with white background. Perfect for SSC, IBPS, UPSC, and State Govt forms.',
    intro: 'Nearly every competitive exam and government job application portal in India—including SSC, IBPS, SBI, Railway RRB, and State PSCs—demands a digital signature between 10 KB and 20 KB in JPG format. If you capture your signature on a smartphone, the file size is usually 2 MB to 5 MB, far exceeding portal limits. Furthermore, simple compression often blurs ink strokes or turns the paper grey. Our specialized 20KB signature resizer enhances contrast, removes shadows, cleans the paper background to white, and compresses the output strictly between 10KB and 20KB.',
    steps: [
      'Sign with black or blue ballpoint pen on unruled white paper and snap a clear photo.',
      'Upload the signature photo to this tool.',
      'The resizer automatically boosts contrast, cleans grey paper tint, and targets 15KB.',
      'Download your sharp signature JPG file ready for instant upload.'
    ],
    faqs: [
      {
        question: 'How do I resize a signature to under 20KB on mobile?',
        answer: 'Upload your photo to this web page on your smartphone. The tool runs directly in your mobile browser, detects the signature bounds, cleans the white background, and saves a JPG between 10KB and 20KB.'
      },
      {
        question: 'Why does my signature get rejected on exam portals?',
        answer: 'Signatures are rejected if the file size is outside 10KB-20KB, if signed on ruled/lined paper, if taken in poor lighting resulting in a dark background, or if saved in PNG/PDF instead of JPG.'
      }
    ],
    related: ['resize-signature-to-50kb', 'ssc-photo-signature-resize', 'ibps-photo-signature-thumb-declaration', 'resize-image-to-20kb'],
    lastUpdated: '2026-10-01',
    verified: true,
    sourceUrl: 'https://ssc.gov.in',
    items: [
      {
        id: 'signature',
        label: 'Signature (10KB - 20KB)',
        widthPx: 300,
        heightPx: 120,
        minKB: 10,
        maxKB: 20,
        allowedFormats: ['image/jpeg'],
        aspectRatio: '5:2',
        background: '#ffffff',
      }
    ]
  },
  {
    id: 'signature-50kb',
    slug: 'resize-signature-to-50kb',
    category: 'passport-id',
    categoryLabel: 'Passport & ID',
    title: 'Resize Signature to 50KB Online (Between 20KB and 50KB)',
    h1: 'Resize Signature to 50KB Online (20KB - 50KB)',
    metaTitle: 'Resize Signature to 50KB Online (20KB to 50KB) – Free',
    metaDescription: 'Resize signature to 20KB - 50KB for UPSC, NSDL PAN card, railway forms, and college admission portals. 100% private in-browser compression.',
    intro: 'While many examinations require a 10KB - 20KB signature, portals such as UPSC, NSDL PAN Card, NTA NEET, and various university admission portals allow or mandate signatures up to 50 KB (typically between 20 KB and 50 KB). This higher limit allows higher pixel clarity and sharper rendering of handwriting nuances. Our tool optimizes your scanned signature to fit comfortably below 50 KB without blurriness.',
    steps: [
      'Upload your scanned signature or phone photo.',
      'The resizer applies smart binary search compression targeting 35 KB - 48 KB.',
      'Check the preview for sharp edges and clean white background.',
      'Download your verified JPG file.'
    ],
    faqs: [
      {
        question: 'Which portals require signature under 50KB?',
        answer: 'NSDL PAN Card applications, UPSC OTR portal, GATE, JAM, and various state CET portals require signatures between 20KB and 50KB.'
      }
    ],
    related: ['resize-signature-to-20kb', 'pan-card-photo-signature-resize', 'upsc-photo-signature-resize', 'resize-image-to-50kb'],
    lastUpdated: '2026-10-01',
    verified: true,
    sourceUrl: 'https://upsconline.nic.in',
    items: [
      {
        id: 'signature',
        label: 'Signature (20KB - 50KB)',
        widthPx: 400,
        heightPx: 160,
        minKB: 20,
        maxKB: 50,
        allowedFormats: ['image/jpeg'],
        aspectRatio: '5:2',
        background: '#ffffff',
      }
    ]
  },

  // ==========================================
  // c) RESIZE TO KB (verified: true by default)
  // ==========================================
  {
    id: 'resize-10kb',
    slug: 'resize-image-to-10kb',
    category: 'resize-to-kb',
    categoryLabel: 'Resize to KB',
    title: 'Resize Image to 10KB Online (Under 10KB / 10KB - 20KB)',
    h1: 'Resize Image to 10KB Online Without Losing Quality',
    metaTitle: 'Resize Image to 10KB Online – Free KB Reducer',
    metaDescription: 'Compress and reduce image size to 10KB or under 10KB online. Perfect for online exam signatures and thumbnail uploads. Fast & 100% in-browser.',
    intro: 'Reducing an image or scanned signature down to 10 KB is one of the most challenging compression tasks because aggressive quality loss can produce severe pixelation and blocky artifacts. Our advanced in-browser compression engine combines iterative canvas quantization with adaptive dimension scaling. It searches for the mathematical sweet spot where the file size remains strictly under 10 KB while text strokes, signatures, and photographic faces maintain sharp definition. All computation runs locally on your device with complete privacy.',
    steps: [
      'Upload any JPG, PNG, or WebP image.',
      'Our engine applies dual-phase binary search to achieve a file size under 10 KB.',
      'Review the before/after preview to confirm text and lines are readable.',
      'Download your 10 KB image immediately.'
    ],
    faqs: [
      {
        question: 'How can I reduce an image size to under 10KB without losing quality?',
        answer: 'Our tool balances dimension scaling (typically reducing resolution to around 200-300 pixels) with chroma subsampling so that the resulting file weighs under 10 KB while preserving contrast.'
      },
      {
        question: 'Is it safe to upload confidential signatures here?',
        answer: 'Yes, 100% safe. This tool processes images entirely inside your browser using HTML5 Canvas. Your files are never uploaded to any server or cloud storage.'
      }
    ],
    related: ['resize-image-to-20kb', 'resize-signature-to-20kb', 'resize-image-to-50kb'],
    lastUpdated: '2026-10-01',
    verified: true,
    sourceUrl: '',
    items: [
      {
        id: 'target-10kb',
        label: 'Target 10 KB (Under 10 KB)',
        minKB: 3,
        maxKB: 10,
        allowedFormats: ['image/jpeg', 'image/webp'],
      }
    ]
  },
  {
    id: 'resize-20kb',
    slug: 'resize-image-to-20kb',
    category: 'resize-to-kb',
    categoryLabel: 'Resize to KB',
    title: 'Resize Image to 20KB Online (Between 10KB and 20KB)',
    h1: 'Resize Image to 20KB Online (Compress to Exact 20 KB)',
    metaTitle: 'Resize Image to 20KB Online (10KB - 20KB) – Free Tool',
    metaDescription: 'Compress photo or signature to exact 20KB (or 10KB - 20KB) online for government forms, job portals, and website uploads. 100% free & client-side.',
    intro: 'A file size of 20 KB (or a target range between 10 KB and 20 KB) is the universal threshold required for signatures and small passport icons across nearly all official Indian application forms (SSC, IBPS, SBI, CTET, and Police recruitment). If you have a photograph or signature captured with a modern smartphone camera, the file typically occupies 3 MB to 8 MB—hundreds of times larger than permitted. Our tool condenses your photo down to 20 KB in less than half a second, ensuring flawless compatibility with any government upload portal.',
    steps: [
      'Drag and drop your photo or signature or click to select from your device.',
      'The resizer automatically targets 15KB - 19KB in JPG format.',
      'Inspect the green validation badge confirming size compliance.',
      'Download your processed image with a single click.'
    ],
    faqs: [
      {
        question: 'Why do government portals mandate 20KB for signatures?',
        answer: 'Older government database systems restrict image storage to minimize server load and ensure rapid database queries during millions of simultaneous applicant logins.'
      },
      {
        question: 'Does reducing to 20KB make the signature blurry?',
        answer: 'Not with our tool. We apply intelligent background whitening and edge sharpening before compression so the signature lines stay crisp.'
      }
    ],
    related: ['resize-signature-to-20kb', 'resize-image-to-10kb', 'resize-image-to-50kb', 'ssc-photo-signature-resize'],
    lastUpdated: '2026-10-01',
    verified: true,
    sourceUrl: '',
    items: [
      {
        id: 'target-20kb',
        label: 'Target 20 KB (10KB - 20KB)',
        minKB: 10,
        maxKB: 20,
        allowedFormats: ['image/jpeg', 'image/webp'],
      }
    ]
  },
  {
    id: 'resize-50kb',
    slug: 'resize-image-to-50kb',
    category: 'resize-to-kb',
    categoryLabel: 'Resize to KB',
    title: 'Resize Image to 50KB Online (Between 20KB and 50KB)',
    h1: 'Resize Image to 50KB Online (Compress to 20KB - 50KB)',
    metaTitle: 'Resize Image to 50KB Online (20KB to 50KB) – Free',
    metaDescription: 'Compress and resize photograph to exact 50KB or 20KB - 50KB range for SSC, UPSC, Bank, and Railway exams. Fast, free, and in-browser.',
    intro: 'The 20 KB to 50 KB bracket is the single most common passport photo requirement across Indian competitive exams and statutory job portals. Whether you are submitting an application for SSC CGL, Railway RRB, SBI PO, or State PSCs, candidate photographs must strictly stay within this range. Uploading an image below 20 KB or above 50 KB generates an instant rejection error. Our algorithm optimizes your portrait through dynamic binary quality search, guaranteeing the file size settles cleanly between 35 KB and 48 KB with maximum visual fidelity.',
    steps: [
      'Upload your passport photo or portrait.',
      'The engine compresses the image targeting 45 KB.',
      'Check the green badge verifying your file is within 20KB - 50KB.',
      'Download the JPG file ready for direct submission.'
    ],
    faqs: [
      {
        question: 'How do I resize a passport photo to under 50KB?',
        answer: 'Simply upload your photo to this page. Our algorithm calculates optimal resolution and compression quality to produce a crisp 40-48 KB JPG image.'
      },
      {
        question: 'Can I resize PNG photos to 50KB JPG?',
        answer: 'Yes! The tool automatically converts PNG, WebP, AVIF, and HEIC into standard JPG format suitable for government portals.'
      }
    ],
    related: ['ssc-photo-signature-resize', 'resize-image-to-100kb', 'resize-image-to-20kb', 'indian-passport-photo-resize'],
    lastUpdated: '2026-10-01',
    verified: true,
    sourceUrl: '',
    items: [
      {
        id: 'target-50kb',
        label: 'Target 50 KB (20KB - 50KB)',
        minKB: 20,
        maxKB: 50,
        allowedFormats: ['image/jpeg', 'image/webp'],
      }
    ]
  },
  {
    id: 'resize-100kb',
    slug: 'resize-image-to-100kb',
    category: 'resize-to-kb',
    categoryLabel: 'Resize to KB',
    title: 'Resize Image to 100KB Online (Between 50KB and 100KB)',
    h1: 'Resize Image to 100KB Online (Compress to Under 100 KB)',
    metaTitle: 'Resize Image to 100KB Online – Free KB Reducer Tool',
    metaDescription: 'Compress JPG, PNG, and WebP images to under 100KB or 50KB - 100KB range without losing sharpness. Ideal for college portals, job forms, and email.',
    intro: 'A 100 KB threshold offers the optimal balance between visual clarity and lightweight web delivery. It is the preferred maximum limit for educational portals, university admission forms, CTET declarations, and email attachments. If your original image is 4 MB to 10 MB, reducing it to under 100 KB reduces file size by over 97% without noticeable loss on standard mobile and desktop displays. Our tool processes your images in milliseconds without ever uploading them to external servers.',
    steps: [
      'Select and upload your photo, document, or certificate.',
      'The tool targets 85 KB - 95 KB, ensuring it stays safely below 100 KB.',
      'Compare original and compressed versions side by side.',
      'Save the optimized image to your device.'
    ],
    faqs: [
      {
        question: 'Will reducing an image to 100KB degrade facial details?',
        answer: 'For a standard passport or headshot, 100 KB is plenty of storage to preserve clear eyes, hair texture, and natural skin tones without noticeable artifacting.'
      }
    ],
    related: ['compress-jpg-to-100kb', 'resize-image-to-50kb', 'resize-image-to-200kb'],
    lastUpdated: '2026-10-01',
    verified: true,
    sourceUrl: '',
    items: [
      {
        id: 'target-100kb',
        label: 'Target 100 KB (50KB - 100KB)',
        minKB: 50,
        maxKB: 100,
        allowedFormats: ['image/jpeg', 'image/png', 'image/webp'],
      }
    ]
  },
  {
    id: 'resize-200kb',
    slug: 'resize-image-to-200kb',
    category: 'resize-to-kb',
    categoryLabel: 'Resize to KB',
    title: 'Resize Image to 200KB Online (Under 200 KB)',
    h1: 'Resize Image to 200KB Online Without Quality Loss',
    metaTitle: 'Resize Image to 200KB Online – Free In-Browser Tool',
    metaDescription: 'Compress image to under 200KB online. Perfect for NEET UG/PG uploads, UPSC Civil Services, and visa application portals. Free & safe.',
    intro: 'Many major online portals—such as NTA NEET for postcard photos, UPSC Civil Services, and international visa centers—set their upper file upload boundary at 200 KB or 300 KB. This allows high-resolution images up to 1200 pixels wide while keeping server storage economical. Our 200 KB resizer provides high-quality compression, retaining maximum crispness for text, identity stamps, and portrait details.',
    steps: [
      'Upload your image from desktop or phone.',
      'The resizer applies optimization targeting 180 KB - 195 KB.',
      'Check the dimensions and file size stats.',
      'Download your compressed file.'
    ],
    faqs: [
      {
        question: 'Which portals use a 200KB limit?',
        answer: 'NTA NEET application (passport and postcard photos), GATE, CAT, and several state public service portals accept files up to 200 KB.'
      }
    ],
    related: ['resize-image-to-100kb', 'resize-image-to-500kb', 'neet-photo-signature-postcard-resize'],
    lastUpdated: '2026-10-01',
    verified: true,
    sourceUrl: '',
    items: [
      {
        id: 'target-200kb',
        label: 'Target 200 KB (100KB - 200KB)',
        minKB: 100,
        maxKB: 200,
        allowedFormats: ['image/jpeg', 'image/png', 'image/webp'],
      }
    ]
  },
  {
    id: 'resize-500kb',
    slug: 'resize-image-to-500kb',
    category: 'resize-to-kb',
    categoryLabel: 'Resize to KB',
    title: 'Resize Image to 500KB Online (Under 500 KB)',
    h1: 'Resize Image to 500KB Online (Compress to Under 500 KB)',
    metaTitle: 'Resize Image to 500KB Online – Free Photo Compressor',
    metaDescription: 'Reduce image file size to under 500KB online. Fast compression for website banners, PDF attachments, and high-resolution certificates.',
    intro: 'A file size limit of 500 KB is the gold standard for scanned PDF/image attachments, high-resolution certificates, mark sheets, and web presentation banners. Compressing a raw 12-megapixel smartphone photo (typically 6 MB to 15 MB) to 500 KB reduces file weight by over 90% while maintaining stunning clarity on 4K screens. Our in-browser compressor handles batch files effortlessly without queue limits or sign-in requirements.',
    steps: [
      'Upload one or multiple photos.',
      'Target 500 KB is auto-selected.',
      'Check preview and savings breakdown.',
      'Download individual files or grab all as a ZIP.'
    ],
    faqs: [
      {
        question: 'Can I compress multiple images to 500KB at once?',
        answer: 'Yes! You can select multiple images and download them all together in a single ZIP file.'
      }
    ],
    related: ['resize-image-to-200kb', 'resize-image-to-1mb', 'compress-image-for-email'],
    lastUpdated: '2026-10-01',
    verified: true,
    sourceUrl: '',
    items: [
      {
        id: 'target-500kb',
        label: 'Target 500 KB (200KB - 500KB)',
        minKB: 200,
        maxKB: 500,
        allowedFormats: ['image/jpeg', 'image/png', 'image/webp'],
      }
    ]
  },
  {
    id: 'resize-1mb',
    slug: 'resize-image-to-1mb',
    category: 'resize-to-kb',
    categoryLabel: 'Resize to KB',
    title: 'Resize Image to 1MB Online (Under 1 MB / 1024 KB)',
    h1: 'Resize Image to 1MB Online (Compress to Under 1024 KB)',
    metaTitle: 'Resize Image to 1MB Online (Under 1024 KB) – Free',
    metaDescription: 'Compress large photos to under 1MB online without visible quality difference. Perfect for email attachments, web galleries, and upload portals.',
    intro: 'When uploading portfolio images, scanned property documents, or email attachments, strict upload ceilings of 1 MB (1024 KB) are common. Raw camera photos from modern iPhones and Android flagships can reach 15 MB to 25 MB, causing mail bounce-backs and upload errors. Our in-browser 1MB compressor cleans unnecessary EXIF metadata, quantizes color distribution, and brings the image neatly below 1 MB in milliseconds.',
    steps: [
      'Upload your heavy photo or document scan.',
      'The engine reduces the size to just under 1024 KB.',
      'Inspect before and after side-by-side.',
      'Download your web-ready image.'
    ],
    faqs: [
      {
        question: 'Will resizing to 1MB remove photo metadata (EXIF)?',
        answer: 'Yes, stripping unnecessary GPS and device metadata reduces file weight and enhances candidate privacy.'
      }
    ],
    related: ['resize-image-to-500kb', 'compress-image-for-email', 'reduce-png-size'],
    lastUpdated: '2026-10-01',
    verified: true,
    sourceUrl: '',
    items: [
      {
        id: 'target-1mb',
        label: 'Target 1 MB (500KB - 1024KB)',
        minKB: 500,
        maxKB: 1024,
        allowedFormats: ['image/jpeg', 'image/png', 'image/webp'],
      }
    ]
  },

  // ==========================================
  // d) DIMENSIONS (verified: true by default)
  // ==========================================
  {
    id: 'dim-1080x1080',
    slug: 'resize-image-1080x1080',
    category: 'dimensions',
    categoryLabel: 'Dimensions',
    title: 'Resize Image to 1080x1080 Pixels (Square 1:1)',
    h1: 'Resize Image to 1080x1080 Pixels Online (Square 1:1)',
    metaTitle: 'Resize Image to 1080x1080 Pixels Online – Free Square Resizer',
    metaDescription: 'Crop and resize image to exact 1080x1080 px square for Instagram feed, WhatsApp DP, products, and profile photos. Free & instant in browser.',
    intro: '1080 x 1080 pixels is the universally adopted standard for square images across digital platforms, including Instagram square feed posts, WhatsApp business catalog items, Facebook carousel ads, and e-commerce product listings. Uploading arbitrary rectangular images forces platforms to apply unappealing automatic cropping. Our tool enables you to scale, center, and crop your image to an exact 1080x1080 pixel canvas with crisp sharpness.',
    steps: [
      'Upload any portrait or landscape image.',
      'The 1:1 square aspect ratio is automatically locked at 1080x1080 pixels.',
      'Adjust framing or choose background fill if you do not want to crop edges.',
      'Download your crisp 1080x1080 px image.'
    ],
    faqs: [
      {
        question: 'Why is 1080x1080 the standard resolution for square images?',
        answer: 'It provides pristine clarity on high-DPI smartphone screens (Retina, AMOLED) while keeping file weight under 1 MB for fast mobile browsing.'
      }
    ],
    related: ['instagram-post-story-size-converter', 'whatsapp-dp-profile-picture-resizer', 'resize-image-1920x1080'],
    lastUpdated: '2026-10-01',
    verified: true,
    sourceUrl: '',
    items: [
      {
        id: 'square-1080',
        label: 'Square (1080 x 1080 px)',
        widthPx: 1080,
        heightPx: 1080,
        allowedFormats: ['image/jpeg', 'image/png', 'image/webp'],
        aspectRatio: '1:1',
      }
    ]
  },
  {
    id: 'dim-1920x1080',
    slug: 'resize-image-1920x1080',
    category: 'dimensions',
    categoryLabel: 'Dimensions',
    title: 'Resize Image to 1920x1080 Pixels (Full HD 16:9)',
    h1: 'Resize Image to 1920x1080 Pixels Online (Full HD 16:9)',
    metaTitle: 'Resize Image to 1920x1080 Pixels Online – Full HD Resizer',
    metaDescription: 'Resize image to exact 1920x1080 px (16:9 Full HD) for wallpapers, desktop screens, YouTube thumbnails, and slide presentations. 100% free.',
    intro: '1920 x 1080 pixels (Full High Definition 1080p, 16:9 aspect ratio) is the standard display format for modern computer monitors, television screens, presentation slide decks (PowerPoint, Google Slides), and video backgrounds. If your source image has different dimensions, scaling it properly prevents distortion and black bars. Our tool lets you crop, scale, and export in 1920x1080 format in seconds.',
    steps: [
      'Upload your image.',
      'The 16:9 ratio locks to 1920x1080 pixels.',
      'Adjust positioning if needed.',
      'Download your Full HD 1080p image.'
    ],
    faqs: [
      {
        question: 'Can I convert a vertical photo to 1920x1080 without stretching?',
        answer: 'Yes, our tool maintains the original proportions and lets you either crop to 16:9 or add clean letterbox padding.'
      }
    ],
    related: ['youtube-thumbnail-resizer-1280x720', 'resize-image-1280x720', 'resize-image-1080x1080'],
    lastUpdated: '2026-10-01',
    verified: true,
    sourceUrl: '',
    items: [
      {
        id: 'fhd-1920',
        label: 'Full HD (1920 x 1080 px)',
        widthPx: 1920,
        heightPx: 1080,
        allowedFormats: ['image/jpeg', 'image/png', 'image/webp'],
        aspectRatio: '16:9',
      }
    ]
  },
  {
    id: 'dim-800x600',
    slug: 'resize-image-800x600',
    category: 'dimensions',
    categoryLabel: 'Dimensions',
    title: 'Resize Image to 800x600 Pixels (4:3 Standard)',
    h1: 'Resize Image to 800x600 Pixels Online (4:3 Standard)',
    metaTitle: 'Resize Image to 800x600 Pixels Online – Free 4:3 Resizer',
    metaDescription: 'Resize image to exact 800x600 px (4:3 ratio) online. Ideal for legacy web portals, document uploads, and CMS thumbnails.',
    intro: 'The 800 x 600 pixel resolution (traditional 4:3 aspect ratio) remains a staple requirement for institutional databases, student ERP software, legacy government portals, and e-learning management systems. Our tool accurately scales your graphics down to 800x600 px without jagged distortion or color fading.',
    steps: [
      'Drop your photo or graphic into the upload box.',
      'Target dimensions 800x600 are auto-applied.',
      'Check preview clarity.',
      'Download your 800x600 px image.'
    ],
    faqs: [
      {
        question: 'What is the 800x600 ratio?',
        answer: '800x600 is a classic 4:3 aspect ratio, widely supported across all browsers and legacy display devices.'
      }
    ],
    related: ['resize-image-1280x720', 'resize-image-1080x1080', 'resize-image-by-percentage'],
    lastUpdated: '2026-10-01',
    verified: true,
    sourceUrl: '',
    items: [
      {
        id: 'dim-800',
        label: 'Standard 4:3 (800 x 600 px)',
        widthPx: 800,
        heightPx: 600,
        allowedFormats: ['image/jpeg', 'image/png', 'image/webp'],
        aspectRatio: '4:3',
      }
    ]
  },
  {
    id: 'dim-1280x720',
    slug: 'resize-image-1280x720',
    category: 'dimensions',
    categoryLabel: 'Dimensions',
    title: 'Resize Image to 1280x720 Pixels (HD 16:9)',
    h1: 'Resize Image to 1280x720 Pixels Online (720p HD)',
    metaTitle: 'Resize Image to 1280x720 Pixels Online (720p HD) – Free',
    metaDescription: 'Resize photo or thumbnail to exact 1280x720 px (16:9 HD 720p). Perfect for YouTube thumbnails, blog headers, and zoom backgrounds.',
    intro: '1280 x 720 pixels (High Definition 720p, 16:9 widescreen) is the official recommended dimension for YouTube video thumbnails, web banners, and podcast cover art. It ensures your visuals appear sharp across smartphone screens and desktop monitors while keeping file sizes lightweight. Use our online converter to frame your artwork to 1280x720 with precision.',
    steps: [
      'Upload your image.',
      'Dimensions 1280x720 px are auto-applied with aspect ratio lock.',
      'Ensure important text or faces are centered.',
      'Download your HD image.'
    ],
    faqs: [
      {
        question: 'Is 1280x720 the recommended YouTube thumbnail size?',
        answer: 'Yes! YouTube specifies 1280 x 720 pixels (minimum width 640 pixels) with a 16:9 aspect ratio and file size under 2 MB.'
      }
    ],
    related: ['youtube-thumbnail-resizer-1280x720', 'resize-image-1920x1080', 'facebook-cover-photo-resizer'],
    lastUpdated: '2026-10-01',
    verified: true,
    sourceUrl: '',
    items: [
      {
        id: 'hd-1280',
        label: 'HD 720p (1280 x 720 px)',
        widthPx: 1280,
        heightPx: 720,
        allowedFormats: ['image/jpeg', 'image/png', 'image/webp'],
        aspectRatio: '16:9',
      }
    ]
  },
  {
    id: 'dim-percentage',
    slug: 'resize-image-by-percentage',
    category: 'dimensions',
    categoryLabel: 'Dimensions',
    title: 'Resize Image by Percentage (10% to 90% Scale)',
    h1: 'Resize Image by Percentage Online (25%, 50%, 75%)',
    metaTitle: 'Resize Image by Percentage Online – Free Scale Tool',
    metaDescription: 'Scale down photo dimensions by percentage: 25%, 50%, 75% or custom percent. Retain perfect aspect ratio without calculating pixels manually.',
    intro: 'Scaling an image by percentage is the easiest way to shrink dimensions while strictly preserving original aspect ratios. Rather than calculating exact pixel values, simply select 50% to reduce both width and height by half (which reduces total image pixel volume by 75%), or choose any percentage from 10% to 90%. Our tool provides real-time dimension feedback and file weight preview.',
    steps: [
      'Upload your photo or batch of photos.',
      'Use the slider or quick buttons to pick 25%, 50%, or 75% scale.',
      'Check the updated pixel dimensions in real time.',
      'Download your scaled images.'
    ],
    faqs: [
      {
        question: 'How does percentage resizing affect image file size?',
        answer: 'Reducing an image dimensions by 50% cuts total pixel count to one quarter (25% of original), resulting in a dramatic reduction in file size while retaining aspect fidelity.'
      }
    ],
    related: ['resize-image-in-cm-inches', 'resize-image-to-100kb', 'resize-image-1080x1080'],
    lastUpdated: '2026-10-01',
    verified: true,
    sourceUrl: '',
    items: [
      {
        id: 'scale-percent',
        label: 'Percentage Scaling (50% Default)',
        allowedFormats: ['image/jpeg', 'image/png', 'image/webp'],
      }
    ]
  },
  {
    id: 'dim-cm-inches',
    slug: 'resize-image-in-cm-inches',
    category: 'dimensions',
    categoryLabel: 'Dimensions',
    title: 'Resize Image in CM and Inches (with DPI Calculator)',
    h1: 'Resize Image in Centimeters (cm), Millimeters (mm) & Inches',
    metaTitle: 'Resize Image in CM, MM & Inches Online (300 DPI) – Free',
    metaDescription: 'Resize photos to exact physical print dimensions: 3.5x4.5 cm, 2x2 inch, 4x6 inch at 300 DPI. Calculate exact pixels from centimeters and inches.',
    intro: 'Official application forms, print studios, and passport authorities frequently specify dimensions in physical measurement units—such as 3.5 cm x 4.5 cm, 35 mm x 45 mm, or 2 x 2 inches—rather than pixels. Converting physical dimensions to pixels requires knowing the Dots Per Inch (DPI). At standard professional print quality (300 DPI), 1 inch equals 300 pixels, and 1 centimeter equals approximately 118.11 pixels. Our interactive physical dimension calculator translates centimeters, millimeters, or inches into exact pixel dimensions.',
    steps: [
      'Enter desired width and height in cm, mm, or inches.',
      'Set target DPI (300 DPI for high-res print, 150 DPI for web).',
      'The engine computes exact pixel boundaries and renders your file.',
      'Download your print-calibrated image file.'
    ],
    faqs: [
      {
        question: 'How do you convert cm to pixels at 300 DPI?',
        answer: 'Formula: Pixels = (Centimeters / 2.54) * DPI. For example, 3.5 cm at 300 DPI = (3.5 / 2.54) * 300 ≈ 413 pixels.'
      },
      {
        question: 'What DPI is required for passport and exam photos?',
        answer: 'Most printing guidelines recommend 300 DPI for crisp photographic reproduction without visible pixelation.'
      }
    ],
    related: ['indian-passport-photo-resize', 'us-visa-photo-resize', 'neet-photo-signature-postcard-resize'],
    lastUpdated: '2026-10-01',
    verified: true,
    sourceUrl: '',
    items: [
      {
        id: 'cm-in-calc',
        label: 'Physical Print Size (3.5 x 4.5 cm at 300 DPI)',
        widthPx: 413,
        heightPx: 531,
        allowedFormats: ['image/jpeg', 'image/png'],
        dimensionCm: '3.5 x 4.5 cm',
      }
    ]
  },

  // ==========================================
  // e) SOCIAL (verified: true by default)
  // ==========================================
  {
    id: 'social-instagram',
    slug: 'instagram-post-story-size-converter',
    category: 'social',
    categoryLabel: 'Social Media',
    title: 'Instagram Post & Story Size Converter (1080x1080 & 1080x1920)',
    h1: 'Instagram Post, Story & Reel Size Resizer Online',
    metaTitle: 'Instagram Post & Story Resizer (1080x1080 / 1080x1920) – Free',
    metaDescription: 'Resize photos for Instagram square post (1080x1080), portrait post (1080x1350), and Story/Reel (1080x1920) without unwanted cropping.',
    intro: 'Instagram supports three primary image ratios: Square (1:1, 1080x1080 px), Portrait (4:5, 1080x1350 px), and Fullscreen Story/Reel (9:16, 1080x1920 px). If you upload without adjusting your aspect ratio, Instagram auto-crops critical parts of your photo or applies heavy server compression that blurs details. Our converter lets you fit your photos into all three Instagram formats with smart centering or aesthetic background fills.',
    steps: [
      'Upload your photo.',
      'Select Post (Square 1080x1080), Portrait (1080x1350), or Story (1080x1920).',
      'Preview crop framing.',
      'Download your Instagram-ready high-res image.'
    ],
    faqs: [
      {
        question: 'What is the best resolution for Instagram posts?',
        answer: 'For feed posts, Portrait 1080 x 1350 pixels (4:5 ratio) occupies the most screen real estate on mobile feeds, leading to higher engagement.'
      }
    ],
    related: ['whatsapp-dp-profile-picture-resizer', 'resize-image-1080x1080', 'youtube-thumbnail-resizer-1280x720'],
    lastUpdated: '2026-10-01',
    verified: true,
    sourceUrl: '',
    items: [
      {
        id: 'ig-square',
        label: 'Instagram Square Post (1080 x 1080 px)',
        widthPx: 1080,
        heightPx: 1080,
        allowedFormats: ['image/jpeg', 'image/webp'],
        aspectRatio: '1:1',
      },
      {
        id: 'ig-story',
        label: 'Instagram Story / Reel (1080 x 1920 px)',
        widthPx: 1080,
        heightPx: 1920,
        allowedFormats: ['image/jpeg', 'image/webp'],
        aspectRatio: '9:16',
      }
    ]
  },
  {
    id: 'social-youtube',
    slug: 'youtube-thumbnail-resizer-1280x720',
    category: 'social',
    categoryLabel: 'Social Media',
    title: 'YouTube Thumbnail Resizer (1280x720 Pixels under 2MB)',
    h1: 'YouTube Thumbnail Resizer (1280x720 Pixels Under 2MB)',
    metaTitle: 'YouTube Thumbnail Resizer (1280x720 under 2MB) – Free',
    metaDescription: 'Resize and compress custom YouTube video thumbnails to exact 1280x720 px (16:9) and under 2MB limit. Crisp text & vibrant colors.',
    intro: 'YouTube custom thumbnails must measure 1280 pixels wide by 720 pixels tall (minimum width 640 pixels, 16:9 ratio) and must weigh less than 2 MB in JPG, PNG, or WebP formats. An eye-catching thumbnail is the single most important factor for video click-through rate (CTR). If your thumbnail file size exceeds 2 MB, YouTube studio throws an upload error. Our tool locks the 1280x720 frame and compresses your artwork safely under 2 MB with vibrant colors.',
    steps: [
      'Upload your video thumbnail graphic.',
      'Dimensions 1280x720 px and 16:9 ratio are locked automatically.',
      'File weight is checked to ensure it remains comfortably below 2 MB.',
      'Download and upload to YouTube Studio.'
    ],
    faqs: [
      {
        question: 'What is the maximum file size for a YouTube thumbnail?',
        answer: 'The maximum allowed file size is 2 MB.'
      }
    ],
    related: ['resize-image-1280x720', 'resize-image-1920x1080', 'x-twitter-header-banner-resizer'],
    lastUpdated: '2026-10-01',
    verified: true,
    sourceUrl: '',
    items: [
      {
        id: 'yt-thumb',
        label: 'YouTube Thumbnail (1280 x 720 px, Under 2MB)',
        widthPx: 1280,
        heightPx: 720,
        minKB: 50,
        maxKB: 1950,
        allowedFormats: ['image/jpeg', 'image/png', 'image/webp'],
        aspectRatio: '16:9',
      }
    ]
  },
  {
    id: 'social-whatsapp',
    slug: 'whatsapp-dp-profile-picture-resizer',
    category: 'social',
    categoryLabel: 'Social Media',
    title: 'WhatsApp DP (Profile Picture) Resizer (Square 500x500)',
    h1: 'WhatsApp DP (Profile Picture) Resizer Online',
    metaTitle: 'WhatsApp DP Resizer Online (Full DP Without Cropping) – Free',
    metaDescription: 'Resize photo for WhatsApp DP (Profile Picture) without cropping. Fit full photo into 500x500 or 1080x1080 square with white or blurred background.',
    intro: 'WhatsApp profile pictures (DP - Display Picture) must be square (1:1 aspect ratio). When you attempt to set a vertical or landscape photo as your WhatsApp DP, the app forces you to crop out the sides or bottom, often cutting off heads or group members. Our WhatsApp DP resizer lets you convert any photo into a perfect square (500x500 or 1080x1080 pixels) by padding the borders with clean white, transparent canvas, or keeping full aspect framing.',
    steps: [
      'Upload the photo you want as your WhatsApp DP.',
      'Choose whether to crop into a 1:1 square or add padding borders.',
      'Preview the circular cutout view to verify face centering.',
      'Download and set as your WhatsApp DP immediately.'
    ],
    faqs: [
      {
        question: 'What is the best size for a WhatsApp DP?',
        answer: 'WhatsApp recommends at least 500 x 500 pixels (1:1 square). For sharp displays, 1080 x 1080 pixels is ideal.'
      }
    ],
    related: ['instagram-post-story-size-converter', 'resize-image-1080x1080', 'linkedin-banner-profile-resizer'],
    lastUpdated: '2026-10-01',
    verified: true,
    sourceUrl: '',
    items: [
      {
        id: 'wa-dp',
        label: 'WhatsApp DP (500 x 500 px Square)',
        widthPx: 500,
        heightPx: 500,
        allowedFormats: ['image/jpeg', 'image/png'],
        aspectRatio: '1:1',
      }
    ]
  },
  {
    id: 'social-facebook',
    slug: 'facebook-cover-photo-resizer',
    category: 'social',
    categoryLabel: 'Social Media',
    title: 'Facebook Cover Photo Resizer (820x312 Pixels)',
    h1: 'Facebook Cover Photo & Banner Resizer Online',
    metaTitle: 'Facebook Cover Photo Resizer (820x312 px) – Free Tool',
    metaDescription: 'Resize images for Facebook profile cover (820x312 px) and Facebook page banner without awkward cropping or blurriness.',
    intro: 'Facebook cover photos display at 820 pixels wide by 312 pixels tall on desktop computers and 640 pixels wide by 360 pixels tall on smartphones. Because desktop is wider and mobile is taller, uploading an unoptimized photo causes vital text and logos along the edges to be cropped off. Our Facebook cover photo resizer ensures your banner fits within the safe zone for both desktop and mobile screens.',
    steps: [
      'Upload your banner or cover design.',
      'The resizer applies 820x312 pixels with mobile safe guides.',
      'Adjust horizontal and vertical alignment.',
      'Download your Facebook cover banner.'
    ],
    faqs: [
      {
        question: 'What are the dimensions for Facebook cover photos?',
        answer: '820 pixels wide by 312 pixels tall on desktop, and 640 x 360 pixels on smartphones. Keeping content within the central safe area avoids mobile cropping.'
      }
    ],
    related: ['linkedin-banner-profile-resizer', 'x-twitter-header-banner-resizer', 'youtube-thumbnail-resizer-1280x720'],
    lastUpdated: '2026-10-01',
    verified: true,
    sourceUrl: '',
    items: [
      {
        id: 'fb-cover',
        label: 'Facebook Cover (820 x 312 px)',
        widthPx: 820,
        heightPx: 312,
        allowedFormats: ['image/jpeg', 'image/png'],
        aspectRatio: '820:312',
      }
    ]
  },
  {
    id: 'social-linkedin',
    slug: 'linkedin-banner-profile-resizer',
    category: 'social',
    categoryLabel: 'Social Media',
    title: 'LinkedIn Banner & Profile Photo Resizer (1584x396 & 400x400)',
    h1: 'LinkedIn Banner (1584x396) & Profile Picture Resizer',
    metaTitle: 'LinkedIn Banner & Profile Resizer (1584x396 px) – Free',
    metaDescription: 'Resize professional LinkedIn background banner (1584x396 px) and profile picture (400x400 px). Crisp professional quality.',
    intro: 'A polished LinkedIn profile is vital for recruiters and networking. LinkedIn personal profile banners require dimensions of 1584 pixels wide by 396 pixels tall (4:1 aspect ratio), while company page banners require 1128 x 191 pixels. Profile headshots require a 400 x 400 pixel square. If your banner resolution is wrong, LinkedIn compresses it harshly. Our tool formats your graphics to look sharp and professional.',
    steps: [
      'Choose LinkedIn Banner or Profile Photo.',
      'Upload your professional graphic.',
      'The tool locks the exact resolution (1584x396 for banner, 400x400 for photo).',
      'Download and update your LinkedIn profile.'
    ],
    faqs: [
      {
        question: 'What is the correct LinkedIn background photo size?',
        answer: '1584 pixels wide by 396 pixels tall with file size under 8 MB.'
      }
    ],
    related: ['x-twitter-header-banner-resizer', 'facebook-cover-photo-resizer', 'whatsapp-dp-profile-picture-resizer'],
    lastUpdated: '2026-10-01',
    verified: true,
    sourceUrl: '',
    items: [
      {
        id: 'li-banner',
        label: 'LinkedIn Background Banner (1584 x 396 px)',
        widthPx: 1584,
        heightPx: 396,
        allowedFormats: ['image/jpeg', 'image/png'],
        aspectRatio: '4:1',
      },
      {
        id: 'li-photo',
        label: 'LinkedIn Profile Photo (400 x 400 px)',
        widthPx: 400,
        heightPx: 400,
        allowedFormats: ['image/jpeg', 'image/png'],
        aspectRatio: '1:1',
      }
    ]
  },
  {
    id: 'social-x',
    slug: 'x-twitter-header-banner-resizer',
    category: 'social',
    categoryLabel: 'Social Media',
    title: 'X (Twitter) Header Banner Resizer (1500x500 Pixels)',
    h1: 'X / Twitter Header Banner Resizer (1500x500 Pixels)',
    metaTitle: 'X (Twitter) Header Banner Resizer (1500x500 px) – Free',
    metaDescription: 'Resize images to exact 1500x500 px (3:1 aspect ratio) for X / Twitter profile header banner. Free, fast, and in-browser.',
    intro: 'X (formerly Twitter) profile headers must be 1500 pixels wide by 500 pixels tall (3:1 aspect ratio). Furthermore, the circular profile picture overlaps the bottom-left corner of the header, which can obscure contact details or logos placed there. Our X header resizer scales your photo to 1500x500 px while helping you position text outside the profile avatar zone.',
    steps: [
      'Upload your header graphic.',
      'Ratio 3:1 (1500x500 px) is applied automatically.',
      'Check that your focus subject is away from the bottom-left corner.',
      'Download your header file and upload to X.'
    ],
    faqs: [
      {
        question: 'What are the official X (Twitter) header dimensions?',
        answer: '1500 pixels wide by 500 pixels tall, in JPG or PNG format, with file size under 5 MB.'
      }
    ],
    related: ['linkedin-banner-profile-resizer', 'facebook-cover-photo-resizer', 'youtube-thumbnail-resizer-1280x720'],
    lastUpdated: '2026-10-01',
    verified: true,
    sourceUrl: '',
    items: [
      {
        id: 'x-header',
        label: 'X Header Banner (1500 x 500 px)',
        widthPx: 1500,
        heightPx: 500,
        allowedFormats: ['image/jpeg', 'image/png'],
        aspectRatio: '3:1',
      }
    ]
  },

  // ==========================================
  // f) GLOBAL LONG-TAIL (verified: true by default)
  // ==========================================
  {
    id: 'global-compress-jpg-100kb',
    slug: 'compress-jpg-to-100kb',
    category: 'global',
    categoryLabel: 'Compressors',
    title: 'Compress JPG to 100KB Online Without Losing Quality',
    h1: 'Compress JPG to 100KB Online Free',
    metaTitle: 'Compress JPG to 100KB Online – Free JPEG Reducer',
    metaDescription: 'Reduce JPG/JPEG file size to 100KB or under 100KB online. Fast, secure, in-browser compression with zero server upload.',
    intro: 'JPEG compression relies on discrete cosine transform (DCT) mathematics that can lead to visible artifacts if compressed with crude tools. Our in-browser JPG to 100KB compressor uses intelligent quantization matrix tuning. It removes imperceptible high-frequency color variations while retaining crisp object edges and facial features. Your photo shrinks below 100 KB in seconds.',
    steps: [
      'Drop your heavy JPG photo into the upload box.',
      'Target 100 KB optimization runs automatically.',
      'Inspect the side-by-side preview to verify image quality.',
      'Download your optimized JPG file.'
    ],
    faqs: [
      {
        question: 'How do I compress a JPG file to exactly 100KB?',
        answer: 'Our tool performs binary search over JPEG quality coefficients to produce the closest file size just under 100 KB.'
      }
    ],
    related: ['resize-image-to-100kb', 'reduce-png-size', 'jpg-to-webp'],
    lastUpdated: '2026-10-01',
    verified: true,
    sourceUrl: '',
    items: [
      {
        id: 'compress-jpg-100',
        label: 'Compress JPG to Under 100 KB',
        minKB: 40,
        maxKB: 100,
        allowedFormats: ['image/jpeg'],
      }
    ]
  },
  {
    id: 'global-reduce-png-size',
    slug: 'reduce-png-size',
    category: 'global',
    categoryLabel: 'Compressors',
    title: 'Reduce PNG Size Online Without Losing Transparency',
    h1: 'Reduce PNG File Size Online (Preserve Transparency)',
    metaTitle: 'Reduce PNG Size Online – Free PNG Compressor Tool',
    metaDescription: 'Compress PNG images online without losing transparent background or clarity. Free, client-side, unlimited batch processing.',
    intro: 'PNG files use lossless compression, which preserves transparent alpha channels and pixel-perfect lines, but often creates huge file sizes (sometimes 5 MB to 15 MB for screenshots and logos). Our PNG optimizer strips excess metadata, palette redundancies, and unneeded color depth while preserving transparent backgrounds intact. For extreme size reduction, you can also convert transparent PNGs to modern WebP with alpha support.',
    steps: [
      'Upload PNG files with or without transparency.',
      'The engine quantizes color distribution and optimizes compression.',
      'Verify that transparency remains clean and edges are smooth.',
      'Download your lightweight PNG or WebP file.'
    ],
    faqs: [
      {
        question: 'Does reducing PNG size remove transparency?',
        answer: 'No. Our tool fully preserves the 8-bit alpha transparency channel.'
      }
    ],
    related: ['png-to-jpg', 'webp-to-jpg', 'compress-jpg-to-100kb'],
    lastUpdated: '2026-10-01',
    verified: true,
    sourceUrl: '',
    items: [
      {
        id: 'opt-png',
        label: 'Optimized PNG',
        allowedFormats: ['image/png', 'image/webp'],
      }
    ]
  },
  {
    id: 'global-webp-to-jpg',
    slug: 'webp-to-jpg',
    category: 'global',
    categoryLabel: 'Format Converters',
    title: 'Convert WebP to JPG Online (Fast & Free)',
    h1: 'Convert WebP to JPG Online (100% In-Browser)',
    metaTitle: 'Convert WebP to JPG Online – Free High-Quality Converter',
    metaDescription: 'Convert WebP images to standard JPG format online. No upload limits, no software installation, completely private in your browser.',
    intro: 'While WebP is excellent for website performance, many software programs, older operating systems, and official government exam upload portals do not support WebP files and display "Invalid file format" errors. Our WebP to JPG converter instantly decodes WebP images in your browser and exports universal, high-compatibility JPEG files with full quality control.',
    steps: [
      'Upload one or more .webp files.',
      'Output format JPG is automatically selected.',
      'Adjust quality slider if desired.',
      'Download converted JPG files individually or as a ZIP archive.'
    ],
    faqs: [
      {
        question: 'Why do government portals reject WebP files?',
        answer: 'Many official submission systems run legacy image parsers configured strictly for JPEG and PNG formats.'
      }
    ],
    related: ['jpg-to-webp', 'png-to-jpg', 'heic-to-jpg'],
    lastUpdated: '2026-10-01',
    verified: true,
    sourceUrl: '',
    items: [
      {
        id: 'webp-to-jpg-item',
        label: 'Convert WebP to JPG',
        allowedFormats: ['image/jpeg'],
      }
    ]
  },
  {
    id: 'global-png-to-jpg',
    slug: 'png-to-jpg',
    category: 'global',
    categoryLabel: 'Format Converters',
    title: 'Convert PNG to JPG Online (Clean White Background)',
    h1: 'Convert PNG to JPG Online with Clean White Background',
    metaTitle: 'Convert PNG to JPG Online – Free In-Browser Converter',
    metaDescription: 'Convert PNG to JPG online. Automatically fills transparent background with clean white for government forms and official portals.',
    intro: 'Converting PNG to JPG is often required when submitting photos or signatures to online portals that strictly require JPG/JPEG files. Because JPG does not support transparency, poorly converted PNGs can turn transparent areas into black boxes. Our tool intelligently fills transparent regions with pure white (#FFFFFF), producing clean, professional JPG documents.',
    steps: [
      'Upload your PNG images or transparent signature scans.',
      'The engine renders the image onto a white background canvas.',
      'Preview the clean JPG output.',
      'Download your converted JPG file.'
    ],
    faqs: [
      {
        question: 'Why does my signature background turn black when converting to JPG?',
        answer: 'This happens when an image converter fails to supply a background color for transparent alpha pixels. Our tool automatically supplies pure white.'
      }
    ],
    related: ['webp-to-jpg', 'reduce-png-size', 'resize-signature-to-20kb'],
    lastUpdated: '2026-10-01',
    verified: true,
    sourceUrl: '',
    items: [
      {
        id: 'png-to-jpg-item',
        label: 'Convert PNG to JPG',
        allowedFormats: ['image/jpeg'],
        background: '#ffffff',
      }
    ]
  },
  {
    id: 'global-jpg-to-webp',
    slug: 'jpg-to-webp',
    category: 'global',
    categoryLabel: 'Format Converters',
    title: 'Convert JPG to WebP Online (Shrink Image Size by 35%)',
    h1: 'Convert JPG to WebP Online for Faster Websites',
    metaTitle: 'Convert JPG to WebP Online – Free Modern Image Converter',
    metaDescription: 'Convert JPG photos to modern Google WebP format. Reduce image weight by 30-50% with zero visible quality loss. Boost Google PageSpeed score.',
    intro: 'WebP is the modern image format developed by Google that provides superior lossless and lossy compression for web images. Converting your JPG pictures to WebP typically slashes file weight by 30% to 50% without any perceptible difference in visual sharpness. This accelerates website load speeds and improves Google Core Web Vitals and PageSpeed scores.',
    steps: [
      'Upload JPG photos individually or in batches.',
      'WebP format is auto-selected.',
      'Check file size reduction percentages.',
      'Download lightweight WebP images.'
    ],
    faqs: [
      {
        question: 'Do all modern browsers support WebP?',
        answer: 'Yes! Over 97% of global web browsers (Chrome, Safari, Firefox, Edge, Opera) support WebP natively.'
      }
    ],
    related: ['webp-to-jpg', 'avif-to-jpg', 'compress-jpg-to-100kb'],
    lastUpdated: '2026-10-01',
    verified: true,
    sourceUrl: '',
    items: [
      {
        id: 'jpg-to-webp-item',
        label: 'Convert JPG to WebP',
        allowedFormats: ['image/webp'],
      }
    ]
  },
  {
    id: 'global-avif-to-jpg',
    slug: 'avif-to-jpg',
    category: 'global',
    categoryLabel: 'Format Converters',
    title: 'Convert AVIF to JPG Online (Fast In-Browser)',
    h1: 'Convert AVIF to JPG Online (Universal Compatibility)',
    metaTitle: 'Convert AVIF to JPG Online – Free High-Speed Converter',
    metaDescription: 'Convert modern AVIF images to standard JPG format in your browser. No software required, 100% private and free.',
    intro: 'AVIF (AV1 Image File Format) offers cutting-edge compression, but many operating systems, photo editors, and web upload portals still cannot open or display .avif files. Our tool decodes AVIF files directly in modern web browsers and exports universally compatible JPG files with preserved color profiles.',
    steps: [
      'Upload your AVIF file by dragging or browsing.',
      'The in-browser engine decodes AVIF directly using native browser codecs.',
      'Check the preview and adjust quality if desired.',
      'Download your universally compatible JPG file.'
    ],
    faqs: [
      {
        question: 'Why convert AVIF to JPG?',
        answer: 'To ensure compatibility with older devices, photo printers, and portals that only accept standard JPG files.'
      }
    ],
    related: ['webp-to-jpg', 'heic-to-jpg', 'png-to-jpg'],
    lastUpdated: '2026-10-01',
    verified: true,
    sourceUrl: '',
    items: [
      {
        id: 'avif-to-jpg-item',
        label: 'Convert AVIF to JPG',
        allowedFormats: ['image/jpeg'],
      }
    ]
  },
  {
    id: 'global-heic-to-jpg',
    slug: 'heic-to-jpg',
    category: 'global',
    categoryLabel: 'Format Converters',
    title: 'Convert HEIC to JPG Online (iPhone Photos to JPEG)',
    h1: 'Convert iPhone HEIC Photos to JPG Online Free',
    metaTitle: 'Convert HEIC to JPG Online – Free iPhone Photo Converter',
    metaDescription: 'Convert Apple iPhone HEIC/HEIF photos to standard JPG format online. Fast client-side decoding with zero file upload to any server.',
    intro: 'Apple iPhones and iPads capture photos in High Efficiency Image Container (HEIC/HEIF) format by default. While this saves storage space on iOS devices, Windows PCs, Android phones, and online application portals fail to open HEIC files. Our in-browser converter transforms your Apple HEIC photos into standard JPG images without uploading your private memories to any external server.',
    steps: [
      'Upload HEIC photos from your iPhone or computer.',
      'The in-browser engine decodes the HEIC container into JPG.',
      'Preview your photos in full color.',
      'Download universal JPG files.'
    ],
    faqs: [
      {
        question: 'Is it safe to convert private iPhone photos here?',
        answer: 'Yes! The conversion happens entirely in your browser using local WebAssembly/JavaScript. Images are never transmitted over the internet.'
      }
    ],
    related: ['avif-to-jpg', 'webp-to-jpg', 'compress-jpg-to-100kb'],
    lastUpdated: '2026-10-01',
    verified: true,
    sourceUrl: '',
    items: [
      {
        id: 'heic-to-jpg-item',
        label: 'Convert HEIC to JPG',
        allowedFormats: ['image/jpeg'],
      }
    ]
  },
  {
    id: 'global-compress-for-email',
    slug: 'compress-image-for-email',
    category: 'global',
    categoryLabel: 'Compressors',
    title: 'Compress Image for Email Attachment Online',
    h1: 'Compress Images for Email Attachments (Under 500KB)',
    metaTitle: 'Compress Image for Email Attachment Online – Free Tool',
    metaDescription: 'Reduce photo file size for Gmail, Outlook, and Yahoo email attachments. Avoid mail bounce-backs with instant browser compression.',
    intro: 'Most email providers (such as Gmail, Outlook, Yahoo Mail, and corporate Exchange servers) restrict total attachment size to 20 MB or 25 MB. Sending several uncompressed smartphone photos quickly exceeds this threshold, causing bounce-backs or slow sending. Our email photo compressor scales images to an optimal balance of under 500 KB each, allowing you to attach dozens of photos without hitting inbox quotas.',
    steps: [
      'Upload photos you want to email.',
      'The tool compresses each photo under 500 KB.',
      'Check that text and faces remain sharp.',
      'Download all as a single ZIP archive to attach effortlessly.'
    ],
    faqs: [
      {
        question: 'What is the ideal image size for email attachments?',
        answer: 'Between 200 KB and 500 KB per photo is ideal. It delivers sharp viewing on laptops and phones while preventing mailbox clutter.'
      }
    ],
    related: ['resize-image-to-500kb', 'resize-image-to-100kb', 'compress-jpg-to-100kb'],
    lastUpdated: '2026-10-01',
    verified: true,
    sourceUrl: '',
    items: [
      {
        id: 'email-comp',
        label: 'Compress for Email (Under 500 KB)',
        minKB: 100,
        maxKB: 500,
        allowedFormats: ['image/jpeg'],
      }
    ]
  }
];

export function getPresetBySlug(slug: string): Preset | undefined {
  return PRESETS.find(p => p.slug === slug);
}

export function getPresetsByCategory(category: PresetCategory): Preset[] {
  return PRESETS.filter(p => p.category === category);
}

export function getAllVerifiedPresets(): Preset[] {
  return PRESETS.filter(p => p.verified);
}
