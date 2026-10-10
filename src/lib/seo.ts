import { SITE_URL, SITE_NAME } from '../config';

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface SeoMetaProps {
  title: string;
  description: string;
  path: string; // e.g. '' for home, 'ssc-photo-signature-resize', 'support'
  ogType?: 'website' | 'article';
  ogImage?: string;
  noindex?: boolean;
  breadcrumbs?: BreadcrumbItem[];
  faqs?: FaqItem[];
  isArticle?: boolean;
  publishedDate?: string;
}

export function updatePageMeta({
  title,
  description,
  path,
  ogType = 'website',
  ogImage = `${SITE_URL}/og-default.png`,
  noindex = false,
  breadcrumbs,
  faqs,
  isArticle = false,
  publishedDate,
}: SeoMetaProps) {
  if (typeof document === 'undefined') return;

  // Clean path: empty or '/' becomes trailing slash; any other route has NO trailing slash
  const cleanPath = path.replace(/^\/+|\/+$/g, '');
  const canonicalUrl = cleanPath ? `${SITE_URL}/${cleanPath}` : `${SITE_URL}/`;

  // 1. Update <title>
  document.title = title;

  // Helper to get or create tag
  const setMetaTag = (attrName: 'name' | 'property', attrValue: string, contentValue: string) => {
    let el = document.querySelector(`meta[${attrName}="${attrValue}"]`) as HTMLMetaElement | null;
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute(attrName, attrValue);
      document.head.appendChild(el);
    }
    el.setAttribute('content', contentValue);
  };

  // Helper to set or create <link> tag
  const setLinkTag = (rel: string, href: string) => {
    let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
    if (!el) {
      el = document.createElement('link');
      el.setAttribute('rel', rel);
      document.head.appendChild(el);
    }
    el.setAttribute('href', href);
  };

  // 2. Canonical tag
  setLinkTag('canonical', canonicalUrl);

  // 3. Standard Meta
  setMetaTag('name', 'description', description);
  setMetaTag('name', 'author', SITE_NAME);

  // 4. Robots
  if (noindex) {
    setMetaTag('name', 'robots', 'noindex, follow');
  } else {
    const robotsEl = document.querySelector('meta[name="robots"]');
    if (robotsEl) {
      robotsEl.setAttribute('content', 'index, follow');
    }
  }

  // 5. OpenGraph tags
  setMetaTag('property', 'og:type', ogType);
  setMetaTag('property', 'og:url', canonicalUrl);
  setMetaTag('property', 'og:title', title);
  setMetaTag('property', 'og:description', description);
  setMetaTag('property', 'og:site_name', SITE_NAME);
  setMetaTag('property', 'og:image', ogImage);

  // 6. Twitter tags
  setMetaTag('name', 'twitter:card', 'summary_large_image');
  setMetaTag('name', 'twitter:title', title);
  setMetaTag('name', 'twitter:description', description);
  setMetaTag('name', 'twitter:image', ogImage);

  // 7. Dynamic JSON-LD Structured Data
  const jsonLdGraph: any[] = [
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

  // WebApplication schema on home page
  if (!cleanPath) {
    jsonLdGraph.push({
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

  // Breadcrumbs schema
  if (breadcrumbs && breadcrumbs.length > 0) {
    jsonLdGraph.push({
      '@type': 'BreadcrumbList',
      '@id': `${canonicalUrl}#breadcrumb`,
      'itemListElement': breadcrumbs.map((crumb, index) => ({
        '@type': 'ListItem',
        'position': index + 1,
        'name': crumb.name,
        'item': crumb.url.startsWith('http') ? crumb.url : `${SITE_URL}${crumb.url.startsWith('/') ? crumb.url : `/${crumb.url}`}`
      }))
    });
  }

  // FAQ schema
  if (faqs && faqs.length > 0) {
    jsonLdGraph.push({
      '@type': 'FAQPage',
      '@id': `${canonicalUrl}#faq`,
      'mainEntity': faqs.map(faq => ({
        '@type': 'Question',
        'name': faq.question,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': faq.answer
        }
      }))
    });
  }

  // Article schema for blog posts
  if (isArticle) {
    jsonLdGraph.push({
      '@type': 'Article',
      '@id': `${canonicalUrl}#article`,
      'headline': title,
      'description': description,
      'datePublished': publishedDate || new Date().toISOString(),
      'publisher': {
        '@id': `${SITE_URL}/#organization`
      },
      'mainEntityOfPage': {
        '@type': 'WebPage',
        '@id': canonicalUrl
      }
    });
  }

  let scriptEl = document.getElementById('dynamic-jsonld') as HTMLScriptElement | null;
  if (!scriptEl) {
    scriptEl = document.createElement('script');
    scriptEl.id = 'dynamic-jsonld';
    scriptEl.type = 'application/ld+json';
    document.head.appendChild(scriptEl);
  }
  scriptEl.textContent = JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': jsonLdGraph
  });
}
