# Atelier de Lumière — Luxury Scented Candles Manufactory

A production-ready corporate website for a heritage luxury scented candles manufactory, embodying quiet luxury, editorial restraint, and museum-like composition.

## Overview

This website represents a century-old fragrance manufactory with heritage craftsmanship positioning. Designed for B2B partnerships, international buyers, luxury hospitality groups, and discerning corporate clients.

## Design Philosophy

- **Heritage**: Timeless European luxury aesthetic
- **Restraint**: Museum-like composition with generous negative space
- **Authority**: Corporate confidence without sales pressure
- **Craftsmanship**: Emphasis on artisanal excellence and tradition

## Technical Stack

- **HTML5**: Semantic, accessible markup
- **CSS3**: Modern layout with custom properties, no frameworks
- **Vanilla JavaScript**: Lightweight, performant interactions
- **External Assets**: Curated Unsplash imagery

## File Structure

```
├── index.html          # Main HTML structure
├── styles.css          # Complete stylesheet
├── script.js           # Interaction layer
└── README.md          # Documentation
```

## Features

### Sections

1. **Top Bar**: Establishes heritage (since 1892) with social links
2. **Header**: Sticky navigation with search and language switcher
3. **Hero**: Philosophical positioning statement
4. **Heritage**: Narrative about manufactory lineage
5. **Manufactory**: Four-step production process
6. **Collections**: 8 signature product lines (4×2 grid)
7. **Sustainability**: Environmental commitment and certifications
8. **Capabilities**: B2B services and corporate partnerships
9. **Global Presence**: International reach with statistics
10. **CTA**: Dignified call-to-action for inquiries
11. **News**: Editorial journal entries
12. **Footer**: Corporate contact and certifications

### Interactions

- **Search Bar**: Slides down from header on click
- **Smooth Scroll**: Elegant navigation to anchor links
- **Scroll Animations**: Subtle fade-in with 16px vertical movement
- **Stats Counter**: Animated number counting on scroll into view
- **Image Lazy Loading**: Performance-optimized asset loading
- **Dropdown Submenu**: Hover-activated navigation submenu
- **Hover States**: Refined transitions on interactive elements

### Typography

- **Headings**: Cormorant Garamond (editorial serif)
- **Body**: Inter (neutral sans-serif)
- **Hierarchy**: Clear type scale with generous spacing

### Color Palette

- **Wax Ivory**: #F5F3F0
- **Charcoal**: #2B2B2B
- **Smoke Gray**: #6B6B6B
- **Parchment**: #EAE7E1
- **Off-White**: #FAFAF8
- **Brass Accent**: #B8986A
- **Deep Charcoal**: #1A1A1A

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- CSS Grid and Flexbox required
- JavaScript ES6+ features utilized
- Graceful degradation for older browsers

## Accessibility

- WCAG 2.1 AA compliant
- Semantic HTML structure
- Keyboard navigation support
- Focus states on interactive elements
- Reduced motion support for accessibility preferences
- ARIA labels on icon buttons

## Performance

- Lightweight vanilla JavaScript (no frameworks)
- Throttled scroll listeners
- Intersection Observer for lazy loading
- Optimized image loading from Unsplash CDN
- Minimal external dependencies

## Responsive Design

- Desktop-first approach with mobile breakpoints
- Breakpoints: 1024px, 768px
- Flexible grid layouts adapt to viewport
- Touch-friendly interactive elements on mobile

## Installation & Usage

1. **Download Files**
   ```bash
   # Clone or download all files to a directory
   ```

2. **Open in Browser**
   ```bash
   # Simply open index.html in a web browser
   # Or serve with a local server:
   python -m http.server 8000
   # Then visit: http://localhost:8000
   ```

3. **No Build Process Required**
   - Pure HTML/CSS/JS implementation
   - No compilation or bundling needed
   - Ready for immediate deployment

## Customization

### Brand Identity

Edit `index.html` to change:
- Company name (currently "Atelier de Lumière")
- Heritage year (currently 1892)
- Contact information
- Product collection names

### Visual Style

Edit `styles.css` CSS variables at `:root`:
```css
--color-wax-ivory: #F5F3F0;
--color-charcoal: #2B2B2B;
--font-serif: 'Cormorant Garamond', serif;
--font-sans: 'Inter', sans-serif;
```

### Images

Replace Unsplash URLs in `index.html` with your own:
- Maintain aspect ratios for consistent layout
- Use high-quality imagery (minimum 1200px width)
- Optimize for web (compressed JPEG/WebP)

## Deployment

### Static Hosting

Compatible with:
- Netlify (drag & drop deployment)
- Vercel
- GitHub Pages
- AWS S3 + CloudFront
- Any static web server

### SEO Optimization

- Meta descriptions included
- Semantic HTML structure
- Clean URL structure ready
- Add `robots.txt` and `sitemap.xml` for production

## Motion Philosophy

All animations follow "nearly invisible" principles:
- Slow, intentional transitions (0.6s–0.8s)
- Subtle vertical movement (8px–16px)
- Cubic-bezier easing for premium feel
- Respects `prefers-reduced-motion`

## Corporate Tone

Language throughout maintains:
- Formal but approachable
- Confident without arrogance
- Technical without jargon
- Heritage-focused
- Partnership-oriented

## Credits

- **Typography**: Google Fonts (Cormorant Garamond, Inter)
- **Photography**: Unsplash (curated candle and craftsmanship imagery)
- **Icons**: Custom SVG graphics
- **Design**: Heritage luxury brand principles

## License

This is a demonstration project. Customize freely for commercial or personal use.

---

**Atelier de Lumière** — Where fragrance becomes legacy.
