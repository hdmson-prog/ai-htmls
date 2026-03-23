# 🚀 Quick Start Guide

## Instant Preview

1. **Open the website:**
   - Double-click `index.html` in Windows Explorer
   - OR right-click → Open with → Your preferred browser
   - OR drag `index.html` into your browser

2. **Test the features:**
   - Scroll through all 12 sections
   - Click the hamburger menu (mobile view)
   - Try the product category filters
   - Interact with the carousel (arrows, dots)
   - Fill out the contact form
   - Test navigation links

## 5-Minute Tour

### What You'll See

1. **Hero Section** (Full screen)
   - Elegant placeholder with text overlay
   - Two call-to-action buttons
   - Animated scroll indicator

2. **About Section** (Scroll down)
   - Brand story with stats
   - Feature highlights
   - Image placeholders

3. **Products Section**
   - 8 product cards
   - Category filter buttons
   - Hover effects on cards

4. **Featured Carousel**
   - 3 featured products
   - Auto-rotating slides
   - Navigation arrows

5. **More Sections...**
   - Materials & Craftsmanship
   - Sustainability
   - Quality Assurance
   - Testimonials
   - Journal/Blog
   - Contact Form
   - Footer

## Adding Your Content

### Step 1: Replace Images

Find placeholder elements like this:
```html
<div class="image-placeholder" data-image-type="product" 
     data-placeholder-text="Sofa Collection">
</div>
```

Replace with:
```html
<img src="assets/images/products/sofa-01.jpg" 
     alt="Artisan Chesterfield Sofa" 
     loading="lazy">
```

### Step 2: Update Text Content

Open `index.html` and search for:
- Company name: "Luxe Furniture"
- Contact details: Address, phone, email
- Product names and descriptions
- Testimonials and reviews

### Step 3: Customize Colors

Open `css/variables.css` and change:
```css
--color-primary: #1a1a1a;      /* Your brand color */
--color-secondary: #c9a962;    /* Your accent color */
```

### Step 4: Connect Forms

Open `js/form.js` and replace the placeholder:
```javascript
// Line ~47 - Contact Form
const response = await fetch('YOUR_API_ENDPOINT', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data)
});

// Line ~95 - Newsletter
await fetch('YOUR_NEWSLETTER_API', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email })
});
```

## Image Directory Setup

Create these folders and add your images:

```
assets/images/
├── hero/
│   └── hero-background.jpg (1920x1080)
├── products/
│   ├── sofa-01.jpg (800x1000)
│   ├── table-01.jpg (800x1000)
│   └── ... (more products)
├── materials/
│   ├── wood-texture.jpg (600x600)
│   ├── leather-texture.jpg (600x600)
│   └── fabric-texture.jpg (600x600)
├── craftsmanship/
│   ├── workshop.jpg (800x450)
│   └── artisan-detail.jpg (400x400)
├── sustainability/
│   └── forest.jpg (800x600)
├── testimonials/
│   └── client-project.jpg (800x450)
└── journal/
    ├── article-01.jpg (800x500)
    └── featured-article.jpg (800x800)
```

## Testing on Mobile

### Method 1: Resize Browser
1. Open browser DevTools (F12)
2. Click device toolbar icon (Ctrl+Shift+M)
3. Select device: iPhone, iPad, etc.
4. Test interactions

### Method 2: Real Device
1. Find your computer's IP address
2. Run a local server (see below)
3. Access from phone: `http://YOUR_IP:8000`

### Simple Local Server

**Option 1 - Python:**
```bash
python -m http.server 8000
```

**Option 2 - Node.js:**
```bash
npx http-server -p 8000
```

**Option 3 - PHP:**
```bash
php -S localhost:8000
```

Then visit: `http://localhost:8000`

## Common Customizations

### Change Fonts
In `css/variables.css`:
```css
--font-heading: 'Your Heading Font', serif;
--font-body: 'Your Body Font', sans-serif;
```

Import from Google Fonts in `css/base.css`:
```css
@import url('https://fonts.googleapis.com/css2?family=Your+Font&display=swap');
```

### Adjust Spacing
In `css/variables.css`:
```css
--section-padding-desktop: 120px;  /* Change to your preference */
--section-padding-mobile: 60px;
```

### Modify Animations
In `css/animations.css`:
```css
--transition-base: 300ms;  /* Speed up/slow down */
```

Or disable in `css/animations.css`:
```css
.scroll-reveal {
  opacity: 1 !important;  /* Always visible */
  transform: none !important;
}
```

### Add More Products

Copy any product card in `index.html`:
```html
<div class="product-card scroll-reveal" data-category="seating">
  <div class="product-image-wrapper image-zoom">
    <img src="your-image.jpg" alt="Product Name">
    <div class="product-badges">
      <span class="product-badge badge-new">New</span>
    </div>
  </div>
  <div class="product-info">
    <p class="product-category">Your Category</p>
    <h3 class="product-title">Your Product Name</h3>
    <p class="product-description">Description here</p>
    <div class="product-meta">
      <div class="product-price">$X,XXX</div>
      <div class="product-materials">Material</div>
    </div>
  </div>
</div>
```

## Deployment

### Option 1: Static Hosting (Recommended)
Upload to:
- **Netlify** (Free, drag & drop)
- **Vercel** (Free, GitHub integration)
- **GitHub Pages** (Free, version control)
- **Cloudflare Pages** (Free, fast CDN)

### Option 2: Traditional Hosting
1. Upload all files via FTP
2. Ensure `index.html` is in root
3. Set up `.htaccess` for clean URLs (optional)

### Option 3: WordPress Integration
1. Create a custom page template
2. Copy HTML sections
3. Convert to WordPress template tags
4. Enqueue CSS/JS properly

## Performance Optimization

### Before Launch:
1. **Optimize Images**
   - Use WebP format
   - Compress (TinyPNG, Squoosh)
   - Max 200KB per image

2. **Minify Files**
   - CSS: Use cssnano or clean-css
   - JS: Use terser or uglify-js
   - HTML: Use html-minifier

3. **Enable Compression**
   - Gzip or Brotli on server
   - Use CDN for static assets

4. **Add Analytics**
   - Google Analytics
   - Hotjar for heatmaps
   - Search Console for SEO

## Need Help?

### Check Console
Press F12 → Console tab to see any errors

### Common Issues:
- **Nothing shows**: Check file paths are correct
- **Animations don't work**: Disable reduced motion in OS
- **Mobile menu stuck**: Refresh page
- **Forms don't submit**: Normal (connect to backend)

### Resources:
- `README.md` - Full documentation
- `TESTING_GUIDE.md` - Complete testing checklist
- Browser DevTools - Inspect and debug

## Next Steps

1. ✅ Preview the website
2. ✅ Test on different devices
3. ✅ Add your images
4. ✅ Update all text content
5. ✅ Customize colors/fonts
6. ✅ Connect forms to backend
7. ✅ Add analytics
8. ✅ Optimize for production
9. ✅ Deploy to hosting
10. ✅ Launch! 🎉

---

**Questions?** Check the full `README.md` for detailed information.

**Ready to launch?** Use `TESTING_GUIDE.md` for final quality checks.
