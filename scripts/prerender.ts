import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { PRESETS, Preset } from '../src/presets.ts';
import { BLOG_POSTS, BlogPost } from '../src/blogData.ts';
import { SITE_URL, SITE_NAME } from '../src/config.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '../dist');

interface RouteInfo {
  route: string; // e.g. '', 'govt-jobs', 'ssc-photo-signature-resize', 'blog/ssc-guide'
  title: string;
  h1: string;
  description: string;
  intro?: string;
  steps?: string[];
  faqs?: { question: string; answer: string }[];
  verified: boolean;
  isArticle?: boolean;
  publishedDate?: string;
  lastmod: string;
  categoryLabel?: string;
  categorySlug?: string;
  categoryHubUrl?: string;
  itemsSummary?: string;
  hubCategory?: 'govt-jobs' | 'passport-id' | 'resize-by-size' | 'social';
  isBlogHub?: boolean;
}

// 1. Gather all routes
const routes: RouteInfo[] = [];

// Home Page
routes.push({
  route: '',
  title: 'Resize Image to KB, Photo & Signature Resize for Govt Job Forms & Passports – FreeImageResize.online',
  h1: 'Resize Image to KB, Photo & Signature Resize for Govt Job Forms & Passports',
  description: 'Free online image resizer to reduce image to KB, crop and resize photos and signatures for govt job forms (SSC, UPSC, IBPS, Railways) and passport photos in your browser.',
  intro: 'Welcome to FreeImageResize.online – the fast, 100% free, and completely client-side in-browser image size reducer and photo resizer. Designed especially for government exam applicants, job seekers, students, and professionals in India and globally to resize photographs, signatures, and identity documents to exact kilobyte and pixel constraints with zero server uploads.',
  verified: true,
  lastmod: '2026-10-05',
});

// Hub 1: Govt Jobs
routes.push({
  route: 'govt-jobs',
  title: `Govt Job Photo & Signature Resizers (SSC, UPSC, IBPS, Railways) – ${SITE_NAME}`,
  h1: 'Govt Job Photo & Signature Resizers',
  description: 'Resize photo and signature for SSC, UPSC, Bank PO/Clerk, Railway RRB, and Police recruitment forms online. Free and client-side private.',
  intro: `Every year, millions of ambitious aspirants across India prepare and apply for competitive central and state government recruitment examinations. These include high-stakes recruitment drives conducted by the Staff Selection Commission (SSC CGL, CHSL, MTS, CPO, GD Constable), Union Public Service Commission (UPSC Civil Services CSE, NDA, CDS, CMS), Institute of Banking Personnel Selection (IBPS PO, Clerk, SO, RRB), State Bank of India (SBI PO and Clerk), Railway Recruitment Boards (RRB NTPC, Group D, ALP, Technician), National Testing Agency (NEET, JEE, UGC NET), and numerous State Public Service Commissions such as BPSC, UPPSC, MPSC, TNPSC, and RPSC.

Because government job portals handle tens of millions of concurrent candidate registrations on high-traffic days, recruitment servers strictly enforce programmatic validation checks on every uploaded document. Applicant photographs must strictly comply with precise pixel dimensions, aspect ratios, and kilobyte weight ceilings, while handwritten signatures, left thumb impressions, and handwritten declarations must fall within even stricter boundary thresholds. If your uploaded JPEG image is merely one single kilobyte larger than the mandated limit, or if inappropriate aspect ratio stretching distorts key facial landmarks, the submission portal immediately triggers fatal validation errors or disqualifies your application form.

Historically, job seekers were forced to visit crowded local cyber cafes or purchase complex, expensive image editing software to resize their scanned photos. FreeImageResize completely solves this operational headache by offering specialized, automated image optimization presets for every major Indian recruitment exam. Utilizing high-performance client-side HTML5 Canvas and intelligent binary-search compression algorithms, our tool accurately crops and compresses your exam photographs and signatures to exact official specifications in under a second. Best of all, because 100% of the image processing executes locally within your browser sandbox, your personal identity files never leave your computer or smartphone, guaranteeing absolute privacy and data security.`,
  faqs: [
    {
      question: 'Why do government job application portals in India reject photo and signature uploads?',
      answer: 'Most portals run automated file validation scripts that inspect file size, pixel dimensions, and MIME headers. If your photo exceeds the upper kilobyte threshold, falls below the lower limit, uses incorrect aspect ratios, or has poor contrast, the server rejects the upload immediately.'
    },
    {
      question: 'Is it safe to compress biometric exam documents on this website?',
      answer: 'Yes, 100% safe. All image resizing, color conversion, and compression algorithms execute client-side directly within your browser. Your photographs, signatures, and personal documents are never transmitted to any external server or saved in the cloud.'
    },
    {
      question: 'Can I resize photos taken from my smartphone camera for govt exams?',
      answer: 'Yes. Modern smartphones produce photos between 3MB and 15MB. Our tool downsamples the resolution and optimizes JPEG quantization matrices so the image fits exact portal constraints while keeping facial features and signatures sharp.'
    },
    {
      question: 'What is the standard ink color required for signature uploads?',
      answer: 'Most statutory exam boards (such as SSC, IBPS, and State PSCs) mandate signing on plain unruled white paper with black or dark blue ink. Ruled paper or signatures written in block capital letters are generally disqualified.'
    }
  ],
  hubCategory: 'govt-jobs',
  verified: true,
  lastmod: '2026-10-05',
});

// Hub 2: Passport Photo
routes.push({
  route: 'passport-photo',
  title: `Passport Photo & ID Card Resizers (Indian Passport 35x45mm, US Visa, PAN) – ${SITE_NAME}`,
  h1: 'Passport Photo & ID Card Resizers',
  description: 'Format passport and visa photos to official ICAO dimensions: 35x45 mm, 2x2 inch, 600x600 px, PAN card, and Aadhaar card. 100% free and in-browser.',
  intro: `Official biometric travel and citizenship identification documents—such as national passports, consular tourist and business visas, Permanent Account Number (PAN) cards, Aadhaar cards, Voter ID (EPIC) cards, and state driving licences—must adhere rigorously to international biometric standards codified by the International Civil Aviation Organization (ICAO Doc 9303). Modern automated border inspection gates (e-Gates), high-throughput airport biometric scanners, and diplomatic consular review systems rely heavily on automated facial recognition software to match live traveler geometry against digital photos stored in microchips and government databases.

Even trivial photographic defects—such as improper head tilt, an unacceptable face-to-frame coverage ratio, reflections or glare across spectacles, faint background shadows, or non-compliant digital resolutions—cause immediate administrative rejections at Passport Seva Kendras (PSK), Post Office Passport Seva Kendras (POPSK), VFS Global visa application centers, or during online DS-160 visa portal processing. For instance, Indian passport and Schengen visa standards require an exact 35 mm by 45 mm dimension with the applicant face occupying between 70% and 80% of the vertical frame against an off-white background. In contrast, United States visa guidelines demand a 2 inch by 2 inch (600x600 pixels) square image under 240 KB with zero eyeglasses allowed under any circumstances.

FreeImageResize delivers precision-engineered digital formatting templates for every major international visa authority and Indian identity portal. Our smart browser-based engine automatically calibrates physical measurements into print-perfect 300 DPI pixel dimensions, crops to the required aspect ratio, and optimizes output JPEG quality to ensure guaranteed compliance. Most importantly, because our zero-upload architecture runs entirely client-side on your local device, your sensitive biometric photographs remain strictly private and secure.`,
  faqs: [
    {
      question: 'What are the official dimensions of an Indian passport photo?',
      answer: 'The Ministry of External Affairs mandates a physical size of 35 mm x 45 mm (3.5 cm x 4.5 cm). In digital pixels at 300 DPI, this corresponds to exactly 413 pixels wide by 531 pixels tall with a plain white or light off-white background.'
    },
    {
      question: 'What is the required face coverage ratio for biometric passport photos?',
      answer: 'According to International Civil Aviation Organization (ICAO Doc 9303) standards, the candidate face (from the bottom of the chin to the crown of the head) must cover between 70% and 80% of the vertical photo height.'
    },
    {
      question: 'Are eyeglasses allowed in US visa and passport photos?',
      answer: 'No. The US Department of State strictly prohibits eyeglasses in visa (DS-160) and passport photographs to eliminate flash reflections and obscurement of eye biometric markers.'
    },
    {
      question: 'Can I upload a smartphone portrait directly to Passport Seva or VFS Global?',
      answer: 'Yes, provided the image is centered, well-lit without shadows, captured against a clean white background, and formatted into the exact pixel resolution and kilobyte constraints required by the respective agency.'
    }
  ],
  hubCategory: 'passport-id',
  verified: true,
  lastmod: '2026-10-05',
});

// Hub 3: Resize by Size
routes.push({
  route: 'resize-by-size',
  title: `Resize Image by KB Size & Dimensions (10KB, 20KB, 50KB, 100KB, 1080x1080) – ${SITE_NAME}`,
  h1: 'Resize Images by KB Size & Dimensions',
  description: 'Compress images to exact kilobyte limits (10KB to 1MB) or resize to custom dimensions, percentages, and centimeters at 300 DPI.',
  intro: `In the modern digital landscape, image file weight and pixel dimensions dictate whether a digital document will be accepted by an online application portal, display crisply on high-density Retina and OLED screens, or transmit reliably across constrained mobile network bandwidth. High-resolution camera sensors on modern smartphones capture uncompressed photographs ranging from 12 megapixels to over 108 megapixels, generating raw output files that routinely span between 3 megabytes and 25 megabytes.

However, web portals—ranging from competitive university entrance exams and state recruitment forms to corporate human resource portals and web publishing systems—strictly limit file upload sizes to exact kilobyte thresholds like 20KB, 50KB, 100KB, or 200KB. Attempting to upload an image that exceeds these strict ceilings by even a single byte triggers immediate validation failure. Conversely, crude compression tools often degrade images into illegible, blurry artifacts with ruined text readability and muddy artifacts. Generic compression utilities only provide an ambiguous percentage slider, forcing users into tedious trial-and-error cycles.

FreeImageResize eliminates guesswork through mathematical binary-search compression algorithms. When you specify a target file weight—such as 10 KB, 20 KB, 50 KB, 100 KB, 200 KB, 500 KB, or 1 MB—our engine dynamically computes the optimal JPEG quantization tables and dimension downsampling ratios to fit your exact requirements while preserving maximum visual contrast. Furthermore, our dimensional resizer allows you to scale images by precise pixel widths and heights, proportional percentages, or physical print measurements (centimeters, millimeters, inches) at professional 300 DPI resolution. With instant client-side execution, you achieve perfect results without uploading files to any external server.`,
  faqs: [
    {
      question: 'How does binary search compression achieve exact target KB sizes?',
      answer: 'Our in-browser compression engine iteratively tests JPEG/WebP quality quantization parameters between 0.05 and 0.98. If an image is too large, it lowers quality; if under the target, it raises quality until the resulting file size sits comfortably just below your desired kilobyte threshold.'
    },
    {
      question: 'Will reducing an image to 20KB or 50KB make it blurry?',
      answer: 'Not if dimensions are proportional. Our engine balances canvas downsampling with chroma subsampling. By maintaining high contrast around text and facial features, the output remains sharp on standard screens.'
    },
    {
      question: 'How do you convert physical dimensions (cm/mm/inches) to digital pixels?',
      answer: 'At standard professional print resolution (300 DPI), 1 inch equals 300 pixels, and 1 centimeter equals approximately 118.11 pixels. Formula: Pixels = (Centimeters / 2.54) * DPI. Our tool performs this calculation automatically.'
    },
    {
      question: 'Can I compress images to an exact KB without uploading them to a server?',
      answer: 'Yes! FreeImageResize runs 100% inside your web browser using HTML5 Canvas and local JavaScript. Your images never leave your computer or phone.'
    }
  ],
  hubCategory: 'resize-by-size',
  verified: true,
  lastmod: '2026-10-05',
});

// Hub 4: Social Media Sizes
routes.push({
  route: 'social-media-sizes',
  title: `Social Media Image Resizer (Instagram, YouTube Thumbnail, WhatsApp DP) – ${SITE_NAME}`,
  h1: 'Social Media Image Resizers',
  description: 'Resize images for Instagram posts (1080x1080) & stories (1080x1920), YouTube thumbnails (1280x720 under 2MB), WhatsApp DP, Facebook cover, and LinkedIn banners.',
  intro: `In contemporary digital communication and branding, high-impact visual imagery serves as the primary driver of engagement, creator reach, and conversion across platforms including Instagram, YouTube, WhatsApp, Facebook, LinkedIn, and X (formerly Twitter). However, each social platform employs distinct proprietary compression pipelines, viewport aspect ratios, and strict upload ceilings that can dramatically degrade the quality of improperly formatted digital assets.

When an oversized or incorrectly proportioned graphic is uploaded to Instagram, YouTube, or WhatsApp, the platform automated server pipeline applies aggressive downsampling and lossy recompression. This unmanaged recompression produces severe JPEG compression artifacts, fuzzy typography, faded color palettes, and arbitrary cropping that frequently cuts off facial features or promotional headlines. For instance, YouTube video thumbnails demand an exact 16:9 widescreen layout (1280x720 pixels) capped strictly at 2 megabytes; exceeding this weight causes immediate upload errors in YouTube Studio. Similarly, Instagram rewards 1:1 square (1080x1080 pixels) and 4:5 portrait (1080x1350 pixels) formats, while WhatsApp requires square profile pictures to prevent circular border clipping.

FreeImageResize provides calibrated, platform-specific social media presets designed to match the current technical specifications of all leading social networks. Instead of opening complex desktop photo editors or risking mobile compression distortion, creators and businesses can format, crop, and compress their banners, stories, thumbnails, and profile pictures directly in their browser. Additionally, our integrated dimension presets handle LinkedIn personal and company banners, Facebook group covers, and X header graphics, ensuring your digital presence remains flawless across mobile and desktop devices without tedious manual calculation. All processing is powered by client-side HTML5 Canvas, guaranteeing rapid exports, pristine visual sharpness, zero server uploads, and total privacy for your creative media.`,
  faqs: [
    {
      question: 'What is the best image resolution for Instagram posts in 2026?',
      answer: 'The optimal resolution for standard square Instagram feed posts is 1080 x 1080 pixels (1:1 aspect ratio). For vertical portrait posts that maximize mobile screen real estate, use 1080 x 1350 pixels (4:5 ratio). For Stories and Reels covers, use 1080 x 1920 pixels (9:16 ratio).'
    },
    {
      question: 'Why does YouTube reject thumbnail uploads over 2MB?',
      answer: 'YouTube Studio imposes a strict 2 MB maximum file limit for custom video thumbnails, alongside a 1280 x 720 pixel resolution requirement (minimum width of 640 pixels). If your PNG or JPG file exceeds 2048 KB, the creator upload dialog fails. Our YouTube preset automatically compresses the file beneath 2MB while keeping text and graphics crisp.'
    },
    {
      question: 'How can I make a full-size picture fit WhatsApp DP without cropping?',
      answer: 'WhatsApp profile pictures demand a 1:1 square crop. To display rectangular portrait or landscape photos as your DP without cutting off heads or backgrounds, use our WhatsApp DP preset. It adds complementary neutral padding to create a perfect square frame without cropping any part of your original photograph.'
    },
    {
      question: 'What are the recommended dimensions for LinkedIn company banners and profile pictures?',
      answer: 'LinkedIn personal profile banners require 1584 x 396 pixels (4:1 aspect ratio), while company page banners require 1128 x 191 pixels. Profile pictures should be formatted at 400 x 400 pixels under 8 MB.'
    }
  ],
  hubCategory: 'social',
  verified: true,
  lastmod: '2026-10-05',
});

// Hub 5: Blog Hub
routes.push({
  route: 'blog',
  title: `Image Resizing & Exam Upload Guides – ${SITE_NAME}`,
  h1: 'Image Resizing & Exam Upload Guides',
  description: 'Step-by-step guides on resizing photographs and signatures for SSC, UPSC, Bank, and Passport applications without rejection.',
  intro: 'Comprehensive tutorials to help candidates, students, and professionals prepare compliant photographs, signatures, and biometric uploads for SSC, UPSC, Bank PO, Railways, and Passport portals without rejection.',
  isBlogHub: true,
  verified: true,
  lastmod: '2026-10-05',
});

// Static Informational Pages
routes.push({
  route: 'about',
  title: `About Us – ${SITE_NAME}`,
  h1: 'Fast, Free & 100% Client-Side Image Resizer',
  description: 'Learn about FreeImageResize: our mission to provide 100% free, private, client-side image compression for candidates and creators.',
  intro: 'Built to make image resizing, passport photo formatting, and exact KB compression completely effortless, secure, and unlimited for students, job applicants, and professionals worldwide.',
  verified: true,
  lastmod: '2026-10-05',
});

routes.push({
  route: 'disclaimer',
  title: `Official Disclaimer – ${SITE_NAME}`,
  h1: 'Disclaimer & Official Notification Notice',
  description: 'Not affiliated with any government body or exam authority. Always verify photo and signature requirements with official notifications.',
  intro: 'FreeImageResize is an independent utility application developed to help users format and optimize images. We are NOT affiliated, associated, authorized, endorsed by, or in any way officially connected with any government body, ministry, or examination authority.',
  verified: true,
  lastmod: '2026-10-05',
});

routes.push({
  route: 'privacy-policy',
  title: `Privacy Policy – ${SITE_NAME}`,
  h1: 'Privacy Policy & Zero Server Architecture',
  description: 'Zero server uploads. 100% client-side privacy architecture. Learn how all image compression executes in your local browser.',
  intro: 'Zero Server Uploads. All compression, resampling, format encoding, and ZIP packaging run natively in your browser.',
  verified: true,
  lastmod: '2026-10-05',
});

routes.push({
  route: 'terms',
  title: `Terms of Service – ${SITE_NAME}`,
  h1: 'Terms of Use',
  description: 'Terms of service and usage guidelines for FreeImageResize web application.',
  intro: 'Please review our terms of service and usage terms for the FreeImageResize in-browser compressor.',
  verified: true,
  lastmod: '2026-10-05',
});

routes.push({
  route: 'contact',
  title: `Contact Us – ${SITE_NAME}`,
  h1: 'Contact Us',
  description: 'Get in touch with the FreeImageResize team for questions, feedback, or support.',
  intro: 'Have a suggestion, bug report, or need help optimizing your photos? We would love to hear from you.',
  verified: true,
  lastmod: '2026-10-05',
});

routes.push({
  route: 'support',
  title: `Support FreeImageResize (UPI / Tip) – ${SITE_NAME}`,
  h1: 'Support FreeImageResize',
  description: 'Support our free, independent tool. Help keep image resizing unlimited and free for students and job applicants across India.',
  intro: 'FreeImageResize is and will always remain 100% free and unlimited. Built to help students and job aspirants across India and globally resize photos & signatures.',
  verified: true,
  lastmod: '2026-10-05',
});

// All Presets
for (const preset of PRESETS) {
  let hubUrl = `${SITE_URL}/resize-by-size`;
  if (preset.category === 'govt-jobs') hubUrl = `${SITE_URL}/govt-jobs`;
  else if (preset.category === 'passport-id') hubUrl = `${SITE_URL}/passport-photo`;
  else if (preset.category === 'social') hubUrl = `${SITE_URL}/social-media-sizes`;

  routes.push({
    route: preset.slug,
    title: `${preset.metaTitle} – ${SITE_NAME}`,
    h1: preset.h1,
    description: preset.metaDescription,
    intro: preset.intro,
    steps: preset.steps,
    faqs: preset.faqs,
    verified: preset.verified,
    lastmod: preset.lastUpdated,
    categoryLabel: preset.categoryLabel,
    categorySlug: preset.category,
    categoryHubUrl: hubUrl,
    itemsSummary: preset.items.map(i => `${i.label} (${i.minKB ? `${i.minKB}-${i.maxKB}KB` : `${i.maxKB}KB`})`).join(', '),
  });
}

// All Blog Posts
for (const post of BLOG_POSTS) {
  routes.push({
    route: `blog/${post.slug}`,
    title: `${post.metaTitle} – ${SITE_NAME}`,
    h1: post.h1,
    description: post.metaDescription,
    intro: post.excerpt,
    verified: true,
    isArticle: true,
    publishedDate: post.publishedDate,
    lastmod: post.publishedDate,
  });
}

// Helper to render preset card as plain <a> tag
function renderPresetCard(preset: Preset): string {
  const tags = preset.items.map(item => {
    const sizeStr = item.minKB ? `${item.minKB}-${item.maxKB}KB` : item.maxKB ? `≤${item.maxKB}KB` : item.dimensionCm || item.aspectRatio || 'Standard';
    return `<span style="display:inline-block;background:#f1f5f9;color:#334155;font-size:11px;font-weight:600;padding:3px 8px;border-radius:6px;margin:2px;">${item.label.split('(')[0].trim()}: ${sizeStr}</span>`;
  }).join(' ');

  return `
    <a href="/${preset.slug}" style="display:flex;flex-direction:column;justify-content:space-between;padding:20px;border-radius:16px;background:#ffffff;border:1px solid #e2e8f0;text-decoration:none;color:inherit;transition:all 0.2s;box-shadow:0 1px 3px rgba(0,0,0,0.05);">
      <div>
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
          <span style="font-size:11px;font-weight:700;color:#4f46e5;background:#eef2ff;padding:4px 8px;border-radius:6px;">${preset.categoryLabel}</span>
          <span style="font-size:11px;color:#94a3b8;">${preset.items.length} ${preset.items.length === 1 ? 'format' : 'formats'}</span>
        </div>
        <h3 style="font-size:16px;font-weight:700;color:#0f172a;margin:0 0 6px 0;">${preset.title}</h3>
        <p style="font-size:13px;color:#64748b;margin:0 0 12px 0;line-height:1.5;">${preset.metaDescription}</p>
        <div style="margin-bottom:16px;">
          ${tags}
        </div>
      </div>
      <div style="display:inline-flex;align-items:center;justify-content:center;padding:10px 16px;background:#4f46e5;color:#ffffff;border-radius:10px;font-size:13px;font-weight:700;text-align:center;">
        Open ${preset.title.split('(')[0].trim()} →
      </div>
    </a>
  `;
}

// Function to generate static HTML document for a route
function prerenderRoute(templateHtml: string, routeInfo: RouteInfo): string {
  const cleanPath = routeInfo.route.replace(/^\/+|\/+$/g, '');
  const canonicalUrl = cleanPath ? `${SITE_URL}/${cleanPath}` : `${SITE_URL}/`;
  const isHome = !cleanPath;

  // Robots meta
  const robotsMeta = routeInfo.verified 
    ? '<meta name="robots" content="index, follow">' 
    : '<meta name="robots" content="noindex, follow">';

  // 1. JSON-LD Graph Construction (Complete for EVERY page)
  const graph: any[] = [
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      'url': `${SITE_URL}/`,
      'name': SITE_NAME,
      'description': 'Free in-browser image size reducer and exact KB compressor.',
    },
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      'name': SITE_NAME,
      'url': `${SITE_URL}/`,
      'logo': `${SITE_URL}/og-default.png`,
    }
  ];

  // WebApplication on Home page
  if (isHome) {
    graph.push({
      '@type': 'WebApplication',
      '@id': `${SITE_URL}/#webapp`,
      'name': SITE_NAME,
      'url': `${SITE_URL}/`,
      'applicationCategory': 'MultimediaApplication',
      'operatingSystem': 'All',
      'browserRequirements': 'Requires JavaScript. Requires HTML5 Canvas.',
      'offers': {
        '@type': 'Offer',
        'price': '0',
        'priceCurrency': 'USD'
      },
      'featureList': [
        'Client-side in-browser image compression',
        'Target KB optimizer (20KB, 50KB, 100KB)',
        'Govt job photo & signature resizer (SSC, UPSC, IBPS, Railways)',
        'Passport and Visa photo formatting (35x45mm, 2x2 inch)',
        'Batch processing with ZIP download'
      ]
    });
  }

  // BreadcrumbList on EVERY page
  const breadcrumbElements: any[] = [
    {
      '@type': 'ListItem',
      'position': 1,
      'name': 'Home',
      'item': `${SITE_URL}/`
    }
  ];

  if (isHome) {
    // Single item breadcrumb on home
  } else if (routeInfo.categoryHubUrl && routeInfo.categoryLabel) {
    // Preset page (3 levels: Home -> Hub -> Preset)
    breadcrumbElements.push({
      '@type': 'ListItem',
      'position': 2,
      'name': routeInfo.categoryLabel,
      'item': routeInfo.categoryHubUrl
    });
    breadcrumbElements.push({
      '@type': 'ListItem',
      'position': 3,
      'name': routeInfo.h1,
      'item': canonicalUrl
    });
  } else if (routeInfo.isArticle) {
    // Blog post (3 levels: Home -> Blog -> Post)
    breadcrumbElements.push({
      '@type': 'ListItem',
      'position': 2,
      'name': 'Blog',
      'item': `${SITE_URL}/blog`
    });
    breadcrumbElements.push({
      '@type': 'ListItem',
      'position': 3,
      'name': routeInfo.h1,
      'item': canonicalUrl
    });
  } else {
    // Hub or static page (2 levels: Home -> Page)
    breadcrumbElements.push({
      '@type': 'ListItem',
      'position': 2,
      'name': routeInfo.h1,
      'item': canonicalUrl
    });
  }

  graph.push({
    '@type': 'BreadcrumbList',
    '@id': `${canonicalUrl}#breadcrumb`,
    'itemListElement': breadcrumbElements
  });

  // FAQPage on preset pages and hub pages with FAQs
  if (routeInfo.faqs && routeInfo.faqs.length > 0) {
    graph.push({
      '@type': 'FAQPage',
      '@id': `${canonicalUrl}#faq`,
      'mainEntity': routeInfo.faqs.map(f => ({
        '@type': 'Question',
        'name': f.question,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': f.answer
        }
      }))
    });
  }

  // Article schema on blog posts
  if (routeInfo.isArticle) {
    graph.push({
      '@type': 'Article',
      '@id': `${canonicalUrl}#article`,
      'headline': routeInfo.title,
      'description': routeInfo.description,
      'datePublished': routeInfo.publishedDate,
      'publisher': { '@id': `${SITE_URL}/#organization` },
      'mainEntityOfPage': { '@type': 'WebPage', '@id': canonicalUrl }
    });
  }

  const jsonLdScript = `<script type="application/ld+json" id="dynamic-jsonld">${JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': graph
  }, null, 2)}</script>`;

  // 2. Build Semantic HTML (Visible in prerendered HTML without JS)
  let noscriptContent = `
    <header style="padding:16px 24px;border-bottom:1px solid #e2e8f0;display:flex;justify-content:space-between;align-items:center;background:#ffffff;">
      <a href="/" style="font-weight:800;font-size:18px;text-decoration:none;color:#0f172a;">${SITE_NAME}</a>
      <nav style="display:flex;gap:16px;font-size:14px;flex-wrap:wrap;">
        <a href="/govt-jobs" style="text-decoration:none;color:#475569;font-weight:600;">Govt Jobs</a>
        <a href="/passport-photo" style="text-decoration:none;color:#475569;font-weight:600;">Passport Photo</a>
        <a href="/resize-by-size" style="text-decoration:none;color:#475569;font-weight:600;">Resize to KB</a>
        <a href="/social-media-sizes" style="text-decoration:none;color:#475569;font-weight:600;">Social Sizes</a>
        <a href="/blog" style="text-decoration:none;color:#475569;font-weight:600;">Blog</a>
        <a href="/support" style="text-decoration:none;color:#e11d48;font-weight:700;">Support (UPI)</a>
      </nav>
    </header>

    <main style="max-width:1080px;margin:32px auto;padding:0 20px;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;line-height:1.6;color:#1e293b;">
  `;

  // Breadcrumbs Bar in HTML
  if (!isHome) {
    noscriptContent += `
      <nav aria-label="Breadcrumb" style="font-size:12px;color:#64748b;margin-bottom:16px;">
        <a href="/" style="color:#64748b;text-decoration:none;">Home</a>
        ${routeInfo.categoryHubUrl ? ` &gt; <a href="${routeInfo.categoryHubUrl.replace(SITE_URL, '')}" style="color:#64748b;text-decoration:none;">${routeInfo.categoryLabel}</a>` : ''}
        ${routeInfo.isArticle ? ` &gt; <a href="/blog" style="color:#64748b;text-decoration:none;">Blog</a>` : ''}
        &gt; <span style="color:#0f172a;font-weight:600;">${routeInfo.h1}</span>
      </nav>
    `;
  }

  // Header Title & Description
  noscriptContent += `
    <h1 style="font-size:32px;font-weight:900;margin-bottom:12px;color:#0f172a;line-height:1.2;">${routeInfo.h1}</h1>
    <p style="font-size:16px;color:#475569;margin-bottom:28px;">${routeInfo.description}</p>
  `;

  // Hub Pages: 250+ Words Intro + Full Grid of Cards with plain <a href>
  if (routeInfo.hubCategory) {
    let presetsToRender: Preset[] = [];
    if (routeInfo.hubCategory === 'govt-jobs') {
      presetsToRender = PRESETS.filter(p => p.category === 'govt-jobs');
    } else if (routeInfo.hubCategory === 'passport-id') {
      presetsToRender = PRESETS.filter(p => p.category === 'passport-id');
    } else if (routeInfo.hubCategory === 'resize-by-size') {
      presetsToRender = PRESETS.filter(p => p.category === 'resize-to-kb' || p.category === 'dimensions');
    } else if (routeInfo.hubCategory === 'social') {
      presetsToRender = PRESETS.filter(p => p.category === 'social');
    }

    if (routeInfo.intro) {
      noscriptContent += `
        <section style="background:#ffffff;border:1px solid #e2e8f0;padding:24px 28px;border-radius:20px;margin-bottom:32px;box-shadow:0 1px 3px rgba(0,0,0,0.05);">
          <h2 style="font-size:20px;font-weight:800;color:#0f172a;margin-top:0;margin-bottom:12px;">Overview &amp; Standards</h2>
          <div style="font-size:15px;color:#334155;line-height:1.7;">
            ${routeInfo.intro.split('\n\n').map(p => `<p style="margin-bottom:14px;">${p}</p>`).join('')}
          </div>
        </section>
      `;
    }

    noscriptContent += `
      <section style="margin-bottom:36px;">
        <h2 style="font-size:22px;font-weight:800;color:#0f172a;margin-bottom:8px;">All Available Tools &amp; Presets in this Category</h2>
        <p style="font-size:14px;color:#64748b;margin-bottom:20px;">Click any preset below to format, crop, and compress your image directly in your browser:</p>
        <div style="display:grid;grid-template-columns:repeat(auto-fill, minmax(300px, 1fr));gap:20px;">
          ${presetsToRender.map(renderPresetCard).join('')}
        </div>
      </section>
    `;
  }

  // Blog Hub Page: List of ALL articles as plain <a href>
  if (routeInfo.isBlogHub) {
    if (routeInfo.intro) {
      noscriptContent += `
        <section style="margin-bottom:28px;">
          <p style="font-size:16px;color:#334155;">${routeInfo.intro}</p>
        </section>
      `;
    }

    noscriptContent += `
      <section style="margin-bottom:36px;">
        <h2 style="font-size:22px;font-weight:800;color:#0f172a;margin-bottom:20px;">All Image Resizing &amp; Upload Guides</h2>
        <div style="display:grid;grid-template-columns:repeat(auto-fill, minmax(320px, 1fr));gap:24px;">
          ${BLOG_POSTS.map(post => `
            <a href="/blog/${post.slug}" style="display:flex;flex-direction:column;justify-content:space-between;padding:24px;border-radius:18px;background:#ffffff;border:1px solid #e2e8f0;text-decoration:none;color:inherit;box-shadow:0 1px 3px rgba(0,0,0,0.05);">
              <div>
                <div style="font-size:12px;color:#94a3b8;margin-bottom:8px;">
                  📅 ${post.publishedDate} • ⏱️ ${post.readTime}
                </div>
                <h3 style="font-size:17px;font-weight:700;color:#0f172a;margin:0 0 8px 0;line-height:1.4;">${post.title}</h3>
                <p style="font-size:13px;color:#64748b;margin:0 0 16px 0;line-height:1.5;">${post.excerpt}</p>
              </div>
              <div style="color:#4f46e5;font-size:13px;font-weight:700;">
                Read Full Guide →
              </div>
            </a>
          `).join('')}
        </div>
      </section>
    `;
  }

  // Home Page: Highlights and Links to Categories
  if (isHome) {
    const popularPresets = PRESETS.slice(0, 8);
    noscriptContent += `
      <section style="background:#eef2ff;padding:24px 28px;border-radius:20px;margin-bottom:32px;">
        <h2 style="font-size:20px;font-weight:800;color:#1e1b4b;margin-top:0;margin-bottom:8px;">100% Free, Private In-Browser Image Resizer</h2>
        <p style="font-size:15px;color:#3730a3;margin-bottom:16px;">
          Compress images to exact KB thresholds (20KB, 50KB, 100KB) and resize photos &amp; signatures for SSC, UPSC, IBPS, Railways, and Indian Passport forms. Zero server uploads.
        </p>
        <div style="display:flex;gap:12px;flex-wrap:wrap;">
          <a href="/govt-jobs" style="padding:10px 18px;background:#4f46e5;color:#ffffff;border-radius:10px;text-decoration:none;font-weight:700;font-size:13px;">Browse Govt Exam Resizers</a>
          <a href="/passport-photo" style="padding:10px 18px;background:#ffffff;color:#4f46e5;border:1px solid #c7d2fe;border-radius:10px;text-decoration:none;font-weight:700;font-size:13px;">Passport &amp; Visa Tools</a>
          <a href="/resize-by-size" style="padding:10px 18px;background:#ffffff;color:#4f46e5;border:1px solid #c7d2fe;border-radius:10px;text-decoration:none;font-weight:700;font-size:13px;">Resize to Exact KB</a>
          <a href="/social-media-sizes" style="padding:10px 18px;background:#ffffff;color:#4f46e5;border:1px solid #c7d2fe;border-radius:10px;text-decoration:none;font-weight:700;font-size:13px;">Social Media Presets</a>
        </div>
      </section>

      <section style="margin-bottom:36px;">
        <h2 style="font-size:22px;font-weight:800;color:#0f172a;margin-bottom:16px;">Popular Exam &amp; ID Resizing Presets</h2>
        <div style="display:grid;grid-template-columns:repeat(auto-fill, minmax(280px, 1fr));gap:16px;">
          ${popularPresets.map(renderPresetCard).join('')}
        </div>
      </section>
    `;
  }

  // Preset Page specifics
  if (!isHome && !routeInfo.hubCategory && !routeInfo.isBlogHub && !routeInfo.isArticle) {
    if (routeInfo.itemsSummary) {
      noscriptContent += `
        <div style="background:#eef2ff;padding:14px 18px;border-radius:12px;margin-bottom:24px;font-size:13px;color:#3730a3;border:1px solid #c7d2fe;">
          <strong>Supported Documents:</strong> ${routeInfo.itemsSummary}
        </div>
      `;
    }

    if (routeInfo.intro) {
      noscriptContent += `
        <section style="background:#ffffff;border:1px solid #e2e8f0;padding:24px;border-radius:16px;margin-bottom:28px;">
          <h2 style="font-size:18px;font-weight:800;color:#0f172a;margin-top:0;margin-bottom:10px;">About this Preset</h2>
          <p style="color:#334155;font-size:14px;line-height:1.6;margin:0;">${routeInfo.intro}</p>
        </section>
      `;
    }

    if (routeInfo.steps && routeInfo.steps.length > 0) {
      noscriptContent += `
        <section style="margin-bottom:28px;">
          <h2 style="font-size:18px;font-weight:800;color:#0f172a;margin-bottom:12px;">How to Resize in 4 Simple Steps</h2>
          <ol style="padding-left:20px;font-size:14px;color:#334155;line-height:1.6;">
            ${routeInfo.steps.map(s => `<li style="margin-bottom:8px;">${s}</li>`).join('')}
          </ol>
        </section>
      `;
    }
  }

  // FAQs Section
  if (routeInfo.faqs && routeInfo.faqs.length > 0) {
    noscriptContent += `
      <section style="margin-top:32px;margin-bottom:32px;background:#ffffff;border:1px solid #e2e8f0;padding:24px 28px;border-radius:20px;">
        <h2 style="font-size:20px;font-weight:800;color:#0f172a;margin-top:0;margin-bottom:16px;">Frequently Asked Questions</h2>
        ${routeInfo.faqs.map(f => `
          <div style="background:#f8fafc;padding:14px 18px;border-radius:12px;margin-bottom:12px;border:1px solid #e2e8f0;">
            <h3 style="font-size:15px;font-weight:700;margin:0 0 6px;color:#0f172a;">${f.question}</h3>
            <p style="margin:0;font-size:14px;color:#475569;line-height:1.5;">${f.answer}</p>
          </div>
        `).join('')}
      </section>
    `;
  }

  noscriptContent += `
    </main>

    <footer style="margin-top:48px;padding:32px 24px;border-top:1px solid #e2e8f0;text-align:center;font-size:13px;color:#64748b;background:#f8fafc;">
      <p style="margin:0 0 8px 0;">© ${new Date().getFullYear()} ${SITE_NAME}. All image compression is 100% in-browser. Zero server uploads.</p>
      <div style="display:flex;justify-content:center;gap:16px;flex-wrap:wrap;">
        <a href="/privacy-policy" style="color:#64748b;text-decoration:none;">Privacy Policy</a>
        <a href="/terms" style="color:#64748b;text-decoration:none;">Terms</a>
        <a href="/disclaimer" style="color:#64748b;text-decoration:none;">Disclaimer</a>
        <a href="/contact" style="color:#64748b;text-decoration:none;">Contact</a>
        <a href="/support" style="color:#e11d48;font-weight:700;text-decoration:none;">Support (UPI)</a>
      </div>
    </footer>
  `;

  // 3. Inject into template HTML
  let html = templateHtml;

  // Remove any stale meta keywords tag if present
  html = html.replace(/<meta name="keywords"[^>]*>\s*/gi, '');

  // Set or replace author
  if (/<meta name="author"[^>]*>/i.test(html)) {
    html = html.replace(/<meta name="author"[^>]*>/i, `<meta name="author" content="FreeImageResize.online" />`);
  } else {
    html = html.replace('<head>', `<head>\n    <meta name="author" content="FreeImageResize.online" />`);
  }

  // Replace <title>
  html = html.replace(/<title>.*?<\/title>/i, `<title>${routeInfo.title}</title>`);

  // Replace canonical
  html = html.replace(/<link rel="canonical"[^>]*>/i, `<link rel="canonical" href="${canonicalUrl}" />`);

  // Replace meta description
  html = html.replace(/<meta name="description"[^>]*>/i, `<meta name="description" content="${routeInfo.description}" />`);

  // Replace OpenGraph
  html = html.replace(/<meta property="og:type"[^>]*>/i, `<meta property="og:type" content="${routeInfo.isArticle ? 'article' : 'website'}" />`);
  html = html.replace(/<meta property="og:url"[^>]*>/i, `<meta property="og:url" content="${canonicalUrl}" />`);
  html = html.replace(/<meta property="og:title"[^>]*>/i, `<meta property="og:title" content="${routeInfo.title}" />`);
  html = html.replace(/<meta property="og:description"[^>]*>/i, `<meta property="og:description" content="${routeInfo.description}" />`);
  html = html.replace(/<meta property="og:image"[^>]*>/i, `<meta property="og:image" content="/og-default.png" />`);

  // Replace Twitter
  html = html.replace(/<meta name="twitter:title"[^>]*>/i, `<meta name="twitter:title" content="${routeInfo.title}" />`);
  html = html.replace(/<meta name="twitter:description"[^>]*>/i, `<meta name="twitter:description" content="${routeInfo.description}" />`);
  html = html.replace(/<meta name="twitter:image"[^>]*>/i, `<meta name="twitter:image" content="/og-default.png" />`);

  // Replace or inject JSON-LD: remove existing static JSON-LD script from template
  html = html.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/i, '');
  html = html.replace(/<script type="application\/ld\+json" id="dynamic-jsonld">[\s\S]*?<\/script>/i, '');

  // Inject robots & fresh per-route dynamic JSON-LD in head
  html = html.replace('</head>', `    ${robotsMeta}\n    ${jsonLdScript}\n  </head>`);

  // Inject prerendered semantic content inside <div id="root">
  html = html.replace('<div id="root"></div>', `<div id="root">${noscriptContent}</div>`);

  return html;
}

// 2. Generate sitemap.xml
function generateSitemap(): string {
  const verifiedRoutes = routes.filter(r => r.verified);
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  for (const r of verifiedRoutes) {
    const loc = r.route ? `${SITE_URL}/${r.route}` : `${SITE_URL}/`;
    const priority = r.route === '' ? '1.0' : r.route.includes('/') ? '0.7' : '0.8';
    const changefreq = r.route === '' ? 'daily' : 'weekly';
    xml += `  <url>\n`;
    xml += `    <loc>${loc}</loc>\n`;
    xml += `    <lastmod>${r.lastmod}</lastmod>\n`;
    xml += `    <changefreq>${changefreq}</changefreq>\n`;
    xml += `    <priority>${priority}</priority>\n`;
    xml += `  </url>\n`;
  }

  xml += `</urlset>\n`;
  return xml;
}

// 3. Generate robots.txt
function generateRobots(): string {
  return `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`;
}

// Main execution
export async function runPrerender() {
  console.log(`[prerender] Starting static HTML generation for ${routes.length} routes...`);

  const templatePath = path.join(distDir, 'index.html');
  if (!fs.existsSync(templatePath)) {
    console.error(`[prerender] dist/index.html not found! Run "vite build" first.`);
    process.exit(1);
  }

  const templateHtml = fs.readFileSync(templatePath, 'utf-8');

  const generatedRoutesList: string[] = [];

  for (const r of routes) {
    const rendered = prerenderRoute(templateHtml, r);
    const targetDir = r.route ? path.join(distDir, r.route) : distDir;
    
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    const targetFile = path.join(targetDir, 'index.html');
    fs.writeFileSync(targetFile, rendered, 'utf-8');
    generatedRoutesList.push(r.route ? `/${r.route}` : '/');
  }

  // Generate sitemap & robots in dist and public
  const sitemapXml = generateSitemap();
  const robotsTxt = generateRobots();

  fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemapXml, 'utf-8');
  fs.writeFileSync(path.join(distDir, 'robots.txt'), robotsTxt, 'utf-8');

  const publicDir = path.resolve(__dirname, '../public');
  if (fs.existsSync(publicDir)) {
    fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapXml, 'utf-8');
    fs.writeFileSync(path.join(publicDir, 'robots.txt'), robotsTxt, 'utf-8');
  }

  console.log(`[prerender] Successfully generated static HTML files for all ${routes.length} routes!`);
  console.log(`[prerender] Total generated routes: ${generatedRoutesList.length}`);
  console.log(`[prerender] Generated routes list:`);
  generatedRoutesList.forEach((rt, idx) => console.log(`  ${idx + 1}. ${rt}`));
  console.log(`[prerender] sitemap.xml and robots.txt generated successfully.`);
}

runPrerender().catch(err => {
  console.error('[prerender] Error during prerender:', err);
  process.exit(1);
});
