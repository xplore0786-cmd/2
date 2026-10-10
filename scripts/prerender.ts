import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { PRESETS } from '../src/presets.ts';
import { BLOG_POSTS } from '../src/blogData.ts';
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
  itemsSummary?: string;
}

// 1. Gather all routes
const routes: RouteInfo[] = [];

// Static Pages
routes.push({
  route: '',
  title: 'Free Image Size Reducer Online – Compress Photos to Exact KB & Dimensions',
  h1: 'Free Image Size Reducer & KB Compressor',
  description: 'Compress and resize photos, signatures, and documents to exact 20KB, 50KB, 100KB, or custom dimensions. 100% private in your browser – photos are never uploaded to any server.',
  intro: 'Welcome to FreeImageResize.online – the fast, 100% free, and completely client-side in-browser image size reducer and photo resizer. Designed especially for government exam applicants, students, and professionals in India and globally.',
  verified: true,
  lastmod: '2026-10-05',
});

routes.push({
  route: 'govt-jobs',
  title: `Govt Job Photo & Signature Resizers (SSC, UPSC, IBPS, Railways) – ${SITE_NAME}`,
  h1: 'Govt Job Photo & Signature Resizers',
  description: 'Resize photographs (20KB - 50KB) and signatures (10KB - 20KB) for SSC, UPSC, Bank PO/Clerk, Railway RRB, and Police recruitment forms online.',
  intro: 'Quickly crop and compress photos, signatures, thumb impressions, and handwritten declarations for SSC, UPSC, IBPS, Railways (RRB), State PSCs, NEET, and Police recruitment forms. 100% free and client-side private.',
  verified: true,
  lastmod: '2026-10-05',
});

routes.push({
  route: 'passport-photo',
  title: `Passport Photo & ID Card Resizers (Indian Passport 35x45mm, US Visa, PAN) – ${SITE_NAME}`,
  h1: 'Passport Photo & ID Card Resizers',
  description: 'Format passport and visa photos to official ICAO dimensions: 35x45 mm, 2x2 inch, 600x600 px, PAN card, and Aadhaar card. 100% free and in-browser.',
  intro: 'Crop and resize photos to official ICAO and government standards for Indian Passports (35x45 mm), Passport Seva portal, US/Schengen/UK Visas, Aadhaar card, PAN card, and Driving Licences.',
  verified: true,
  lastmod: '2026-10-05',
});

routes.push({
  route: 'resize-by-size',
  title: `Resize Image by KB Size & Dimensions (10KB, 20KB, 50KB, 100KB, 1080x1080) – ${SITE_NAME}`,
  h1: 'Resize Images by KB Size & Dimensions',
  description: 'Compress images to exact kilobyte limits (10KB to 1MB) or resize to custom dimensions, percentages, and centimeters at 300 DPI.',
  intro: 'Compress JPG, PNG, and WebP images to exact target kilobyte thresholds or scale to custom pixel resolutions, percentage ratios, and physical print centimeters/inches at 300 DPI.',
  verified: true,
  lastmod: '2026-10-05',
});

routes.push({
  route: 'social-media-sizes',
  title: `Social Media Image Resizer (Instagram, YouTube Thumbnail, WhatsApp DP) – ${SITE_NAME}`,
  h1: 'Social Media Image Resizers',
  description: 'Resize images for Instagram posts (1080x1080) & stories (1080x1920), YouTube thumbnails (1280x720 under 2MB), WhatsApp DP, Facebook cover, and LinkedIn banners.',
  intro: 'Optimize and format your images for Instagram posts and stories, YouTube thumbnails (1280x720 under 2MB), full WhatsApp profile pictures (DP) without cropping, Facebook covers, LinkedIn banners, and X headers.',
  verified: true,
  lastmod: '2026-10-05',
});

routes.push({
  route: 'blog',
  title: `Image Resizing & Exam Upload Guides – ${SITE_NAME}`,
  h1: 'Image Resizing & Exam Upload Guides',
  description: 'Step-by-step guides on resizing photographs and signatures for SSC, UPSC, Bank, and Passport applications without rejection.',
  intro: 'Comprehensive tutorials to help candidates, students, and professionals prepare compliant photographs, signatures, and biometric uploads for SSC, UPSC, Bank PO, Railways, and Passport portals.',
  verified: true,
  lastmod: '2026-10-05',
});

routes.push({
  route: 'about',
  title: `About Us – ${SITE_NAME}`,
  h1: 'Fast, Free & 100% Client-Side Image Resizer',
  description: 'Learn about FreeImageResize: our mission to provide 100% free, private, client-side image compression for candidates and creators.',
  intro: 'Built to make image resizing, passport photo formatting, and exact KB compression completely effortless, secure, and unlimited for students, job applicants, and professionals.',
  verified: true,
  lastmod: '2026-10-05',
});

routes.push({
  route: 'disclaimer',
  title: `Official Disclaimer – ${SITE_NAME}`,
  h1: 'Disclaimer & Official Notification Notice',
  description: 'Not affiliated with any government body or exam authority. Always verify photo and signature requirements with official notifications.',
  intro: 'FreeImageResize is an independent educational and utility web application developed to help users format and optimize images. We are NOT affiliated, associated, authorized, endorsed by, or in any way officially connected with any government body, ministry, or examination authority.',
  verified: true,
  lastmod: '2026-10-05',
});

routes.push({
  route: 'privacy-policy',
  title: `Privacy Policy – ${SITE_NAME}`,
  h1: 'Privacy Policy & Architecture',
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

// Presets
for (const preset of PRESETS) {
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
    itemsSummary: preset.items.map(i => `${i.label} (${i.minKB ? `${i.minKB}-${i.maxKB}KB` : `${i.maxKB}KB`})`).join(', '),
  });
}

// Blog Posts
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

// Function to generate static HTML document for a route
function prerenderRoute(templateHtml: string, routeInfo: RouteInfo): string {
  const cleanPath = routeInfo.route.replace(/^\/+|\/+$/g, '');
  const canonicalUrl = cleanPath ? `${SITE_URL}/${cleanPath}` : `${SITE_URL}/`;
  const isHome = !cleanPath;

  // Robots meta
  const robotsMeta = routeInfo.verified 
    ? '<meta name="robots" content="index, follow">' 
    : '<meta name="robots" content="noindex, follow">';

  // JSON-LD Graph
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
        'Govt job photo & signature resizer (SSC, UPSC, IBPS)',
        'Passport and Visa photo formatting (35x45mm, 2x2 inch)',
        'Batch processing with ZIP download'
      ]
    });
  }

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
  })}</script>`;

  // Build static semantic content visible with JS disabled
  let noscriptContent = `
    <header style="padding:16px 24px;border-bottom:1px solid #e2e8f0;display:flex;justify-content:space-between;align-items:center;">
      <a href="/" style="font-weight:800;font-size:18px;text-decoration:none;color:#0f172a;">${SITE_NAME}</a>
      <nav style="display:flex;gap:16px;font-size:14px;">
        <a href="/govt-jobs" style="text-decoration:none;color:#475569;">Govt Jobs</a>
        <a href="/passport-photo" style="text-decoration:none;color:#475569;">Passport Photo</a>
        <a href="/resize-by-size" style="text-decoration:none;color:#475569;">Resize to KB</a>
        <a href="/social-media-sizes" style="text-decoration:none;color:#475569;">Social Sizes</a>
        <a href="/blog" style="text-decoration:none;color:#475569;">Blog</a>
        <a href="/support" style="text-decoration:none;color:#e11d48;font-weight:700;">Support (UPI)</a>
      </nav>
    </header>

    <main style="max-width:960px;margin:32px auto;padding:0 20px;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;line-height:1.6;color:#1e293b;">
      <h1 style="font-size:32px;font-weight:900;margin-bottom:12px;color:#0f172a;">${routeInfo.h1}</h1>
      <p style="font-size:16px;color:#475569;margin-bottom:24px;">${routeInfo.description}</p>
  `;

  if (routeInfo.itemsSummary) {
    noscriptContent += `
      <div style="background:#eef2ff;padding:14px 18px;border-radius:10px;margin-bottom:24px;font-size:13px;color:#3730a3;">
        <strong>Supported Documents:</strong> ${routeInfo.itemsSummary}
      </div>
    `;
  }

  if (routeInfo.intro) {
    noscriptContent += `
      <section style="margin-bottom:28px;">
        <h2 style="font-size:20px;font-weight:800;color:#0f172a;margin-bottom:10px;">Overview & Guidelines</h2>
        <p style="color:#334155;font-size:15px;">${routeInfo.intro}</p>
      </section>
    `;
  }

  if (routeInfo.steps && routeInfo.steps.length > 0) {
    noscriptContent += `
      <section style="margin-bottom:28px;">
        <h2 style="font-size:20px;font-weight:800;color:#0f172a;margin-bottom:12px;">How to Resize (4 Steps)</h2>
        <ol style="padding-left:20px;font-size:14px;color:#334155;">
          ${routeInfo.steps.map(s => `<li style="margin-bottom:8px;">${s}</li>`).join('')}
        </ol>
      </section>
    `;
  }

  if (routeInfo.faqs && routeInfo.faqs.length > 0) {
    noscriptContent += `
      <section style="margin-bottom:28px;">
        <h2 style="font-size:20px;font-weight:800;color:#0f172a;margin-bottom:12px;">Frequently Asked Questions</h2>
        ${routeInfo.faqs.map(f => `
          <div style="background:#f8fafc;padding:14px 18px;border-radius:10px;margin-bottom:12px;border:1px solid #e2e8f0;">
            <h3 style="font-size:15px;font-weight:700;margin:0 0 6px;color:#0f172a;">${f.question}</h3>
            <p style="margin:0;font-size:14px;color:#475569;">${f.answer}</p>
          </div>
        `).join('')}
      </section>
    `;
  }

  noscriptContent += `
      <div style="background:#f1f5f9;padding:16px;border-radius:12px;font-size:12px;color:#64748b;margin-top:32px;">
        <strong>Candidate Notice:</strong> Always confirm the size requirements in the official notification before submitting your form.
      </div>
    </main>

    <footer style="margin-top:48px;padding:32px 24px;border-top:1px solid #e2e8f0;text-align:center;font-size:13px;color:#64748b;">
      <p>© ${new Date().getFullYear()} ${SITE_NAME}. All image compression is 100% in-browser. Zero server uploads.</p>
      <div style="display:flex;justify-content:center;gap:16px;margin-top:8px;">
        <a href="/privacy-policy" style="color:#64748b;">Privacy Policy</a>
        <a href="/terms" style="color:#64748b;">Terms</a>
        <a href="/disclaimer" style="color:#64748b;">Disclaimer</a>
        <a href="/contact" style="color:#64748b;">Contact</a>
      </div>
    </footer>
  `;

  // Inject meta tags into template
  let html = templateHtml;

  // Replace <title>
  html = html.replace(/<title>.*?<\/title>/i, `<title>${routeInfo.title}</title>`);

  // Replace canonical
  html = html.replace(/<link rel="canonical"[^>]*>/i, `<link rel="canonical" href="${canonicalUrl}" />`);

  // Replace meta description
  html = html.replace(/<meta name="description"[^>]*>/i, `<meta name="description" content="${routeInfo.description}" />`);

  // Replace OpenGraph
  html = html.replace(/<meta property="og:url"[^>]*>/i, `<meta property="og:url" content="${canonicalUrl}" />`);
  html = html.replace(/<meta property="og:title"[^>]*>/i, `<meta property="og:title" content="${routeInfo.title}" />`);
  html = html.replace(/<meta property="og:description"[^>]*>/i, `<meta property="og:description" content="${routeInfo.description}" />`);
  html = html.replace(/<meta property="og:image"[^>]*>/i, `<meta property="og:image" content="${SITE_URL}/og-default.png" />`);

  // Replace Twitter
  html = html.replace(/<meta name="twitter:title"[^>]*>/i, `<meta name="twitter:title" content="${routeInfo.title}" />`);
  html = html.replace(/<meta name="twitter:description"[^>]*>/i, `<meta name="twitter:description" content="${routeInfo.description}" />`);
  html = html.replace(/<meta name="twitter:image"[^>]*>/i, `<meta name="twitter:image" content="${SITE_URL}/og-default.png" />`);

  // Inject robots & JSON-LD in head
  html = html.replace('</head>', `${robotsMeta}\n    ${jsonLdScript}\n  </head>`);

  // Inject prerendered content into root
  html = html.replace('<div id="root"></div>', `<div id="root">${noscriptContent}</div>`);

  return html;
}

// 2. Generate sitemap.xml
// "Generate sitemap.xml (only verified and indexable pages, with lastmod)"
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

  for (const r of routes) {
    const rendered = prerenderRoute(templateHtml, r);
    const targetDir = r.route ? path.join(distDir, r.route) : distDir;
    
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    const targetFile = path.join(targetDir, 'index.html');
    fs.writeFileSync(targetFile, rendered, 'utf-8');
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
  console.log(`[prerender] sitemap.xml and robots.txt generated.`);
}

runPrerender().catch(err => {
  console.error('[prerender] Error during prerender:', err);
  process.exit(1);
});
