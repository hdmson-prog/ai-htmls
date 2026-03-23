# Heritage Tea Manufactory – Corporate Website

A production-ready, luxury heritage brand website for a tea manufactory. Built with HTML, CSS, and JavaScript, emphasizing timeless design, quiet luxury, and museum-quality presentation.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Design Philosophy](#design-philosophy)
- [Features](#features)
- [File Structure](#file-structure)
- [Pages](#pages)
- [Getting Started](#getting-started)
- [Customization Guide](#customization-guide)
- [Browser Support](#browser-support)
- [Performance](#performance)
- [Accessibility](#accessibility)
- [Credits](#credits)

---

## 🎯 Overview

This website represents a luxury tea manufactory with 125+ years of heritage. The design prioritizes:

- **Timeless aesthetic** over trendy design
- **Editorial quality** over marketing hype
- **Restraint and refinement** over visual excess
- **Substance and authority** over playfulness

### Target Audience
- International tea buyers
- Luxury hospitality groups
- Corporate procurement teams
- Specialty distributors
- Industry professionals

### Business Objectives
- Establish long-term credibility
- Communicate craftsmanship and scale
- Attract global B2B partners
- Position as authoritative and refined

---

## 🎨 Design Philosophy

### Brand Personality
- **Calm** – Never rushed, never loud
- **Cultured** – Educated and sophisticated
- **Heritage-driven** – 125+ years of excellence
- **Meticulous** – Precision in every detail
- **Quietly Luxurious** – Confidence without ostentation

### Visual Language

#### Color Palette
```css
--color-tea-green: #2a3d2f;        /* Primary brand color */
--color-charcoal: #1a1a1a;         /* Deep black */
--color-warm-charcoal: #3a3a38;    /* Soft black */
--color-parchment: #f8f6f1;        /* Warm background */
--color-off-white: #fdfcf9;        /* Clean white */
--color-brass: #9d8b6c;            /* Accent color */
--color-earth: #6b6456;            /* Text secondary */
```

#### Typography
- **Headings:** Cormorant Garamond (Serif) – Editorial, heritage
- **Body:** Inter (Sans-serif) – Clean, readable, modern
- **Weight:** Light (300) for body, Medium (500) for emphasis

#### Motion Philosophy
- **Slow and intentional** – 600ms transitions
- **Subtle movements** – 8-16px translateY
- **No bounce or elastic** – Museum-like restraint
- **Fade-in with gentle slide** – Professional reveal

---

## ✨ Features

### Navigation
- ✅ Fixed sticky header with backdrop blur
- ✅ Responsive navigation (mobile/tablet/desktop)
- ✅ Search functionality with full-screen overlay
- ✅ Language switcher with 7 languages
- ✅ Smooth scroll with offset

### Homepage Sections (12)
1. **Hero** – Philosophical headline, CTA
2. **Heritage & Legacy** – Company story, timeline
3. **Manufactory Process** – 6-step production
4. **Featured Products** – 2×4 grid, 8 teas
5. **Video Showcase** – YouTube carousel (5 videos)
6. **Sustainability** – Organic, fair trade, carbon neutral
7. **Corporate Capabilities** – Export, scale, quality
8. **Global Presence** – Stats and reach
9. **Customer Logos** – 12 partner brands
10. **News & Updates** – Latest 3 articles
11. **Contact Form** – Validated inquiry form
12. **Image Showcase** – Masonry grid, 12 images

### Product Pages
- **Archive Page** – 24 products, filtering, pagination, sidebar
- **Detail Page** – Gallery, specs, brewing guide, tasting notes

### Content Pages
- **About** – Timeline, values, leadership, estate info
- **Contact** – Form, FAQ, location details
- **News Archive** – Featured article + grid
- **News Single** – Long-form article with sharing
- **Gallery** – 27 images, 5 categories, lightbox

### Utility Pages
- **Search Results** – Filtering, highlighting, pagination
- **404 Page** – Friendly error with suggestions
- **Page Template** – Starting point for new pages

---

## 📁 File Structure

```
heritage-tea-manufactory/
├── index.html                  # Homepage
├── products.html               # Product archive
├── product-detail.html         # Single product page
├── about.html                  # Company information
├── contact.html                # Contact form & info
├── news.html                   # News listing
├── news-single.html            # Single article
├── gallery.html                # Image gallery
├── search-results.html         # Search results
├── 404.html                    # Error page
├── page-template.html          # Template for new pages
│
├── styles.css                  # Main stylesheet (global)
├── products-page.css           # Product archive styles
├── product-detail.css          # Product detail styles
├── about.css                   # About page styles
├── contact.css                 # Contact page styles
├── news.css                    # News listing styles
├── news-single.css             # Article page styles
├── gallery.css                 # Gallery styles
├── search-results.css          # Search results styles
├── 404.css                     # Error page styles
├── page-template.css           # Template styles
│
├── script.js                   # Main JavaScript (global)
├── products-page.js            # Product filtering/pagination
├── product-detail.js           # Product interactions
├── gallery.js                  # Gallery & lightbox
├── news-single.js              # Article interactions
├── search-results.js           # Search filtering
│
└── README.md                   # This file
```

---

## 📄 Pages

### 1. Homepage (`index.html`)
**Sections:** 12 complete sections from hero to footer  
**Purpose:** Brand introduction, capability showcase  
**Key Features:** Video carousel, customer logos, news feed, contact form

### 2. Products Archive (`products.html`)
**Purpose:** Browse all tea products  
**Features:**
- 24 tea products
- Sidebar with category filter (7 categories)
- Top filter bar + sort options
- Pagination (12 per page)
- Contact widget in sidebar

### 3. Product Detail (`product-detail.html`)
**Purpose:** Individual product information  
**Features:**
- 4-image gallery with thumbnails
- Detailed specifications
- Brewing guide with 4 parameters
- Tasting profile with bar charts
- Product story section
- Related products (3)

### 4. About (`about.html`)
**Purpose:** Company history and team  
**Features:**
- Origin story
- Timeline (8 milestones from 1897-2024)
- 6 core values
- 4 leadership profiles
- Estate information with stats

### 5. Contact (`contact.html`)
**Purpose:** Corporate inquiries  
**Features:**
- Full contact form with validation
- Contact information (phone, email, address)
- Location section with estate visit info
- FAQ section (6 questions)

### 6. News Archive (`news.html`)
**Purpose:** Company news and updates  
**Features:**
- Featured article (large)
- 6 standard articles
- Pagination
- Categories: Sustainability, Quality, Harvest, etc.

### 7. News Single (`news-single.html`)
**Purpose:** Full article reading experience  
**Features:**
- Long-form content (~2,000 words)
- Pull quotes with citations
- Inline images
- Statistics grid
- Social sharing (LinkedIn, Twitter, Copy link)
- Related articles (3)
- Reading progress bar

### 8. Gallery (`gallery.html`)
**Purpose:** Visual showcase of estate/operations  
**Features:**
- 27 images across 5 categories
- Category filtering
- Lightbox with navigation
- Keyboard shortcuts (←/→, ESC)
- Touch swipe support
- Image counter

### 9. Search Results (`search-results.html`)
**Purpose:** Display search results  
**Features:**
- Inline search bar
- Type filters (All, Products, Articles, Pages)
- 12 example results with highlighting
- No results state
- Query persistence

### 10. 404 Error (`404.html`)
**Purpose:** Handle missing pages gracefully  
**Features:**
- Large "404" number
- Animated tea cup illustration
- Friendly error message
- 2 CTA buttons
- 6 helpful links

### 11. Page Template (`page-template.html`)
**Purpose:** Starting point for new pages  
**Features:**
- Complete navigation/footer
- Multiple layout options
- Pre-styled sections
- Responsive by default
- Well-commented

---

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Text editor (VS Code recommended)
- Basic knowledge of HTML/CSS/JavaScript

### Installation

1. **Download/Clone the project**
   ```bash
   # If using Git
   git clone [repository-url]
   cd heritage-tea-manufactory
   ```

2. **Open in browser**
   - Double-click `index.html` to open in default browser
   - Or use a local server:
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Node.js (using http-server)
   npx http-server
   ```

3. **View the website**
   - Open http://localhost:8000 in your browser

### No Build Process Required
This is a static website using vanilla HTML/CSS/JavaScript. No compilation, bundling, or build tools are needed.

---

## 🛠️ Customization Guide

### Updating Colors

Edit `styles.css` in the `:root` section:

```css
:root {
    --color-tea-green: #2a3d2f;     /* Change primary color */
    --color-brass: #9d8b6c;          /* Change accent color */
    /* ... other colors */
}
```

### Changing Typography

Update font imports in `styles.css`:

```css
@import url('https://fonts.googleapis.com/css2?family=Your+Font');

:root {
    --font-serif: 'Your Serif Font', Georgia, serif;
    --font-sans: 'Your Sans Font', sans-serif;
}
```

### Adding a New Page

1. **Copy the template:**
   ```bash
   cp page-template.html your-page.html
   cp page-template.css your-page.css
   ```

2. **Update HTML:**
   - Change `<title>` tag
   - Update meta description
   - Replace placeholder content
   - Link to your CSS file

3. **Customize sections:**
   - Keep sections you need
   - Remove unused sections
   - Add custom content

4. **Update navigation:**
   - Add link to main navigation in all pages

### Replacing Images

**All images use Unsplash placeholders. Replace with your own:**

```html
<!-- Before -->
<img src="https://images.unsplash.com/photo-xyz?w=800&q=90" alt="Tea estate">

<!-- After -->
<img src="images/tea-estate.jpg" alt="Tea estate">
```

**Image recommendations:**
- Format: JPEG (photos), PNG (logos), SVG (icons)
- Resolution: 2x for retina displays
- Optimization: Use tools like TinyPNG or ImageOptim
- Alt text: Always provide descriptive alt text

### Updating YouTube Videos

Edit `index.html` video carousel section:

```html
<iframe 
    src="https://www.youtube.com/embed/YOUR-VIDEO-ID" 
    title="Your Video Title"
    ...>
</iframe>
```

### Modifying Navigation

Edit navigation in all HTML files:

```html
<ul class="nav-links">
    <li><a href="your-page.html">Your Page</a></li>
    <!-- Add your links -->
</ul>
```

### Updating Contact Information

Replace placeholder contact details in:
- Footer (all pages)
- Contact page widgets
- Contact form email addresses

---

## 🌐 Browser Support

### Fully Supported
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

### Modern Features Used
- CSS Grid & Flexbox
- CSS Custom Properties (variables)
- IntersectionObserver API
- LocalStorage API
- CSS `backdrop-filter`
- CSS `aspect-ratio`

### Graceful Degradation
- Backdrop blur fallback to solid color
- Animation disabled for `prefers-reduced-motion`
- Lazy loading with fallback

---

## ⚡ Performance

### Optimization Strategies

#### Images
- Lazy loading with `loading="lazy"`
- Proper sizing (not oversized)
- Compressed (Unsplash optimized)
- Modern formats supported

#### CSS
- Single stylesheet for global styles
- Page-specific CSS loaded per page
- Minification ready
- No unused styles

#### JavaScript
- Vanilla JS (no framework overhead)
- Async/defer script loading
- Event delegation where possible
- LocalStorage for preferences

#### Best Practices
- Semantic HTML5
- Minimal HTTP requests
- Efficient selectors
- Optimized animations (GPU-accelerated)

### Performance Metrics (Target)
- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Time to Interactive: < 3.5s
- Cumulative Layout Shift: < 0.1

---

## ♿ Accessibility

### WCAG 2.1 AA Compliance

#### Color Contrast
- ✅ Body text: 7:1 ratio (AAA)
- ✅ Large text: 4.5:1 ratio (AA)
- ✅ UI elements: 3:1 ratio (AA)

#### Keyboard Navigation
- ✅ All interactive elements focusable
- ✅ Logical tab order
- ✅ Visible focus states
- ✅ Skip to content (where needed)

#### Screen Readers
- ✅ Semantic HTML5 elements
- ✅ ARIA labels where appropriate
- ✅ Alt text for all images
- ✅ Form labels properly associated

#### Motion
- ✅ Respects `prefers-reduced-motion`
- ✅ No auto-playing videos
- ✅ Pausable carousels

#### Forms
- ✅ Clear error messages
- ✅ Required fields marked
- ✅ Validation feedback
- ✅ Accessible error states

### Testing Tools
- WAVE Browser Extension
- axe DevTools
- Lighthouse (Chrome DevTools)
- Screen reader testing (NVDA, JAWS, VoiceOver)

---

## 🔧 Technical Details

### CSS Architecture

**Methodology:** Component-based with BEM-like naming

**Organization:**
1. Reset & base styles
2. CSS variables (design tokens)
3. Typography
4. Layout utilities
5. Components
6. Page-specific styles
7. Responsive breakpoints

**Breakpoints:**
```css
/* Desktop-first approach */
@media (max-width: 1024px) { /* Tablet */ }
@media (max-width: 768px)  { /* Mobile */ }
```

### JavaScript Patterns

**Organization:**
- Global functionality in `script.js`
- Page-specific scripts separate
- No jQuery or external libraries
- Module-like structure with IIFEs

**Key Features:**
- Intersection Observer for scroll animations
- LocalStorage for preferences
- Debouncing for performance
- Event delegation

### HTML Structure

**Semantic Elements:**
- `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`
- Proper heading hierarchy (h1 → h6)
- Lists for navigation
- Forms with proper labels

**SEO Optimization:**
- Meta descriptions on all pages
- Semantic markup
- Descriptive titles
- Alt text for images
- Clean URL structure

---

## 📦 Assets

### Fonts
- **Google Fonts:** Cormorant Garamond, Inter
- **Fallbacks:** Georgia, -apple-system, BlinkMacSystemFont

### Images
- **Source:** Unsplash (placeholder)
- **Format:** JPEG/PNG
- **Optimization:** Unsplash auto-optimization
- **Lazy Loading:** Native browser support

### Icons
- **Format:** Inline SVG
- **Style:** Simple line icons
- **Color:** Inherit from CSS

---

## 🎯 Use Cases

### B2B Corporate Website
Perfect for:
- Manufacturing companies
- Food & beverage brands
- Luxury goods manufacturers
- Heritage brands
- Export-focused businesses

### Adaptation Ideas
This template can be adapted for:
- Wine/spirits producers
- Artisan food manufacturers
- Textile mills
- Craft producers
- Heritage hospitality

---

## 📝 Content Guidelines

### Writing Style
- **Tone:** Calm, authoritative, refined
- **Voice:** Third person, professional
- **Length:** Substantial but not verbose
- **Structure:** Clear hierarchy, scannable

### Avoid
- ❌ Sales hype or urgency
- ❌ Exclamation marks
- ❌ Buzzwords or jargon
- ❌ "Click here" calls-to-action
- ❌ Trendy language

### Embrace
- ✅ Specific details
- ✅ Historical context
- ✅ Technical precision
- ✅ Understated confidence
- ✅ Long-term thinking

---

## 🤝 Contributing

### Adding Features
1. Maintain design consistency
2. Test across browsers
3. Ensure responsive behavior
4. Check accessibility
5. Update documentation

### Code Style
- **HTML:** Semantic, indented (4 spaces)
- **CSS:** BEM-like naming, organized logically
- **JavaScript:** Clear variable names, comments

---

## 📄 License

This is a demonstration project. For production use, ensure you have:
- Rights to all images used
- Proper font licenses
- Compliance with web standards
- Privacy policy and legal pages

---

## 🙏 Credits

### Design Inspiration
- Heritage European luxury brands
- Museum websites
- Editorial publications
- Premium corporate sites

### Technologies
- HTML5
- CSS3 (Grid, Flexbox, Custom Properties)
- Vanilla JavaScript (ES6+)
- Google Fonts
- Unsplash Images

### Created By
Rovo Dev – AI-Assisted Development

---

## 📞 Support

### Documentation
- This README
- Inline code comments
- Page template with examples

### Resources
- [MDN Web Docs](https://developer.mozilla.org/)
- [CSS-Tricks](https://css-tricks.com/)
- [Web.dev](https://web.dev/)

---

## 🗺️ Roadmap

### Potential Enhancements
- [ ] Multi-language support (i18n)
- [ ] CMS integration
- [ ] E-commerce functionality
- [ ] Blog system
- [ ] Newsletter integration
- [ ] Analytics integration
- [ ] Cookie consent
- [ ] Print stylesheets

---

**Version:** 1.0.0  
**Last Updated:** January 2024  
**Status:** Production Ready

---

*"True luxury is found in refinement, not abundance."*  
— Heritage Tea Manufactory Philosophy
