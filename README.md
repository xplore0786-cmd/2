# Image Size Reducer & Image Compressor

A modern, blazing-fast, and 100% privacy-focused **Image Size Reducer / Image Compressor** web application. Reduce JPG, PNG, and WebP file sizes up to 90% without compromising visual fidelity—processed entirely client-side inside your browser with zero server uploads.

---

## Key Features

- **100% In-Browser Privacy**: Images and metadata never leave your local device. Processing uses HTML5 Canvas and WebAssembly.
- **Target File Size Optimizer**: Intelligently tunes compression and dimensions to hit exact kilobyte targets (e.g. 50 KB, 100 KB, 200 KB, 500 KB, 1 MB).
- **Multi-Format Support**:
  - **JPG / JPEG**: Photographic quantization with smooth color preservation.
  - **PNG**: Crisp alpha transparency preservation.
  - **WebP**: Next-gen compression saving up to 35% more space than JPEG.
- **Batch Processing & ZIP Export**: Compress multiple files simultaneously with one-click JSZip archive generation.
- **Interactive Before/After Comparison**: Real-time split comparison slider and side-by-side inspection mode with zoom (100%–300%).
- **Metadata Stripping**: Automatically removes sensitive camera EXIF data and GPS coordinates.
- **Dimension Resizing**: Scale by percentage (25%, 50%, 75%) or custom maximum width/height with aspect ratio locking.
- **Dark & Light Mode**: Seamless theme switching with local storage memory.
- **SEO & Web Standards**: Fully populated Open Graph, Twitter Cards, JSON-LD structured data, `robots.txt`, and `sitemap.xml`.

---

## Dedicated Pages & Routes

1. **Home (`/`)**: Main interactive compressor, drag & drop, batch list, format guide, and FAQ.
2. **Image Size Reducer (`/image-size-reducer`)**: Target KB mode optimized for government forms, visas, and passport photos.
3. **JPG Compressor (`/jpg-compressor`)**: Photographic compression presets.
4. **PNG Compressor (`/png-compressor`)**: Lossless and transparent graphic optimizer.
5. **WebP Compressor (`/webp-compressor`)**: Next-generation web image conversion.
6. **Privacy Policy (`/privacy-policy`)**: Detailed security breakdown of in-browser processing.
7. **Terms & Conditions (`/terms`)**: Transparent legal terms.
8. **Contact Us (`/contact`)**: Support, feedback, and issue reporting.

---

## Tech Stack

- **Framework**: React 19 + TypeScript
- **Bundler**: Vite
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **ZIP Engine**: JSZip
- **Processing**: HTML5 Canvas 2D API + Blob URLs

---

## Getting Started & Development

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Local Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Production Build & Static Prerender
```bash
npm run build
```
This runs `vite build` followed by `tsx scripts/prerender.ts`, automatically outputting:
- Static HTML files for every route in `dist/<route>/index.html` (with full crawlable content, meta tags, and JSON-LD).
- Up-to-date `dist/sitemap.xml` containing only verified and indexable routes.
- `dist/robots.txt`.

---

## Deployment Instructions

### 1. Deploying on Cloudflare Pages (Recommended)
1. Push your repository to GitHub or GitLab.
2. In Cloudflare Dashboard, go to **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.
3. Select your repository.
4. Set the Build Settings:
   - **Framework preset**: `Vite`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
5. Click **Save and Deploy**.
6. **Connecting Custom Domain (`www.freeimageresize.online`)**:
   - In your Cloudflare Pages project, go to **Custom domains** tab > **Set up a domain**.
   - Enter `www.freeimageresize.online` (and optionally `freeimageresize.online`).
   - If using Cloudflare DNS, DNS CNAME records are added automatically. If using an external registrar, create a CNAME record pointing `www` to your `<project>.pages.dev` domain.

### 2. Deploying on Vercel
1. Import your GitHub repository in the Vercel Dashboard.
2. Build Settings:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
3. Click **Deploy**.
4. **Connecting Custom Domain**:
   - Go to **Project Settings** > **Domains**.
   - Add `www.freeimageresize.online`.
   - Configure your DNS provider with the CNAME record `cname.vercel-dns.com` for `www` and `76.76.21.21` A-record for root apex.

### 3. Deploying on Netlify
1. Import your repository in the Netlify Dashboard.
2. Build Settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
3. Click **Deploy Site**.
4. **Connecting Custom Domain**:
   - Go to **Domain management** > **Add a domain**.
   - Enter `www.freeimageresize.online` and follow the DNS verification instructions.

---

## License

MIT License. Free for personal and commercial usage.
