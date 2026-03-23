# Luxury Furniture Showcase Website

A production-ready, immersive luxury furniture showcase website with premium aesthetics, smooth animations, and mobile-first responsive design.

## 🎨 Features

### Design & Aesthetics
- **Premium Visual Design** - Elegant serif/sans-serif typography pairing
- **Warm Color Palette** - Rich charcoal, champagne gold accents, warm neutrals
- **Smooth Animations** - Scroll-triggered reveals, parallax effects, hover states
- **Glassmorphism Effects** - Modern transparent overlays with backdrop blur

### Sections (12 Total)
1. **Hero Banner** - Full-viewport cinematic section with parallax
2. **About Us** - Brand heritage with editorial imagery layout
3. **Product Collections** - Filterable product grid with hover animations
4. **Featured Carousel** - Touch-enabled product slider
5. **Product Showcase** - Detailed product cards with quick-view
6. **Materials & Craftsmanship** - Material close-ups and process showcase
7. **Sustainability** - Eco-friendly practices and certifications
8. **Quality Assurance** - Testing standards and warranties
9. **Testimonials** - Client reviews with rating stars
10. **Journal** - Blog/news preview with editorial thumbnails
11. **Contact** - Form validation, map placeholder, contact details
12. **Footer** - Links, newsletter signup, social icons

### Technical Features
- **Mobile-First Responsive** - Breakpoints: 480px, 768px, 1024px, 1440px
- **Accessibility (WCAG 2.1 AA)** - Semantic HTML, ARIA labels, keyboard navigation
- **Performance Optimized** - Lazy loading, GPU acceleration, debounced handlers
- **SEO Ready** - Semantic structure, meta tags, Open Graph support
- **Cross-Browser Compatible** - Modern browsers with graceful fallbacks

## 📁 Project Structure

```
e:\acli-website\demo4\
├── index.html                    # Main entry point
├── css/
│   ├── variables.css             # Design tokens
│   ├── base.css                  # Reset & base styles
│   ├── layout.css                # Grid system & utilities
│   ├── animations.css            # Keyframes & animation classes
│   └── components/
│       ├── header.css            # Navigation & sticky header
│       ├── hero.css              # Full-screen hero
│       ├── about.css             # About section
│       ├── products.css          # Product grids & cards
│       ├── carousel.css          # Product carousel
│       ├── materials.css         # Materials & craftsmanship
│       ├── sustainability.css    # Eco-friendly section
│       ├── quality.css           # Quality assurance
│       ├── testimonials.css      # Client reviews
│       ├── journal.css           # Blog preview
│       ├── contact.css           # Contact form
│       └── footer.css            # Site footer
├── js/
│   ├── main.js                   # Initialization & orchestration
│   ├── navigation.js             # Sticky header, mobile menu
│   ├── animations.js             # Scroll reveals, parallax
│   ├── carousel.js               # Product carousel
│   └── form.js                   # Form validation
└── assets/
    └── images/                   # Image directories (to be populated)
        ├── hero/
        ├── products/
        ├── materials/
        ├── craftsmanship/
        ├── lifestyle/
        ├── sustainability/
        ├── team/
        └── clients/
```

## 🚀 Getting Started

### Quick Start
1. Open `index.html` in a modern web browser
2. The website works standalone with no build process required

### Adding Images
Replace the placeholder elements with actual images:

```html
<!-- Current placeholder -->
<div class="image-placeholder" data-image-type="product" 
     data-placeholder-text="Product Name" 
     data-dimensions="800x1000">
</div>

<!-- Replace with -->
<img src="assets/images/products/sofa-01.jpg" 
     alt="Artisan Chesterfield Sofa" 
     loading="lazy">
```

### Image Guidelines
- **Hero**: 1920x1080px (landscape, high quality)
- **Products**: 800x1000px (portrait, 4:5 ratio)
- **Materials**: 600x600px (square, texture detail)
- **Lifestyle**: 1200x800px (landscape, room scenes)
- **Optimize**: Use WebP format with JPG fallback, compress to <200KB

## 🎨 Design System

### Color Palette
```css
--color-primary: #1a1a1a          /* Rich charcoal */
--color-secondary: #c9a962        /* Champagne gold */
--color-background: #faf9f7       /* Warm white */
--color-surface: #ffffff          /* Pure white */
```

### Typography
- **Headings**: Cormorant Garamond (serif)
- **Body**: Inter (sans-serif)
- **Scale**: Fluid typography using clamp()

### Spacing
- **Base unit**: 8px
- **Section padding**: 120px desktop / 60px mobile
- **Container max-width**: 1440px

## 🔧 Customization

### Changing Colors
Edit `css/variables.css`:
```css
:root {
  --color-primary: #your-color;
  --color-secondary: #your-accent;
}
```

### Adjusting Animations
Edit `css/animations.css` or modify:
```css
--transition-base: 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
```

### Adding Products
Copy a product card in `index.html` and modify:
```html
<div class="product-card scroll-reveal" data-category="seating">
  <!-- Update content -->
</div>
```

## 📱 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari 14+, Chrome Mobile)

### Graceful Degradation
- CSS Grid fallback to Flexbox
- IntersectionObserver polyfill for older browsers
- Smooth scroll polyfill included

## ♿ Accessibility Features

- Semantic HTML5 landmarks
- ARIA labels for interactive elements
- Keyboard navigation support (Tab, Arrow keys, Escape)
- Focus-visible states
- Skip navigation link
- Color contrast ratios ≥ 4.5:1
- Respects `prefers-reduced-motion`

## 🔌 API Integration

### Contact Form
Replace the placeholder in `js/form.js`:
```javascript
const response = await fetch('/api/contact', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data)
});
```

### Newsletter Signup
Update endpoint in `js/form.js`:
```javascript
await fetch('/api/newsletter', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email })
});
```

## 📊 Analytics

Track events by uncommenting in `js/main.js`:
```javascript
if (typeof gtag !== 'undefined') {
  gtag('event', action, {
    'event_category': category,
    'event_label': label
  });
}
```

## 🎯 Performance Optimization

### Current Optimizations
- Native lazy loading for images
- CSS containment for complex sections
- Debounced scroll handlers
- GPU-accelerated animations (transform, opacity)
- RequestAnimationFrame for smooth animations

### Recommended Enhancements
1. Add WebP images with JPG fallback
2. Implement service worker for offline support
3. Use CDN for static assets
4. Minify CSS and JavaScript for production
5. Enable Gzip/Brotli compression on server

## 🧪 Testing Checklist

### Desktop Testing (1920px+)
- [ ] All 12 sections render correctly
- [ ] Sticky header scroll behavior works
- [ ] Carousel navigation arrows function
- [ ] Product card hover states animate smoothly
- [ ] Forms validate correctly

### Tablet Testing (768px)
- [ ] Navigation collapses to hamburger menu
- [ ] 2-column product grid displays properly
- [ ] Touch-friendly button sizes (min 44x44px)
- [ ] Carousel swipe gestures work

### Mobile Testing (375px)
- [ ] Single-column layout
- [ ] Mobile menu opens/closes smoothly
- [ ] Form inputs are usable
- [ ] No horizontal scroll
- [ ] Text remains readable

### Accessibility Testing
- [ ] Tab through all interactive elements
- [ ] Focus states are visible
- [ ] Skip navigation link works
- [ ] Screen reader compatible
- [ ] Keyboard shortcuts function (Arrow keys in carousel, Escape to close menu)

## 📝 License

This project is open source and available for personal and commercial use.

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

## 📞 Support

For questions or support, please contact the development team.

---

**Built with ❤️ for luxury furniture showcase**

Version 1.0.0 | Last Updated: January 2026
