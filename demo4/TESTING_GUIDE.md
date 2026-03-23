# Testing Guide - Luxury Furniture Showcase

## 🧪 Manual Testing Checklist

### 1. Desktop View (1920px+)

#### Navigation
- [ ] Header is transparent on page load
- [ ] Header becomes solid white with shadow on scroll
- [ ] Logo is visible and clickable
- [ ] All navigation links are visible
- [ ] Navigation links highlight on hover
- [ ] Active section is highlighted in navigation
- [ ] "Get In Touch" CTA button is visible and functional

#### Hero Section
- [ ] Hero takes full viewport height
- [ ] Background placeholder is visible
- [ ] Parallax effect works on scroll
- [ ] Text is centered and readable
- [ ] Both CTA buttons are visible
- [ ] Buttons animate on hover
- [ ] Scroll indicator animates (floating animation)

#### About Section
- [ ] Section header is centered
- [ ] Two-column layout displays properly
- [ ] Feature icons are visible
- [ ] Images have proper aspect ratios
- [ ] Stats section displays in 4 columns
- [ ] Scroll reveal animations trigger

#### Product Collections
- [ ] Category filter buttons are visible
- [ ] All products display in 4-column grid
- [ ] Product cards have hover effects (lift + shadow)
- [ ] Images zoom on card hover
- [ ] Quick view overlay appears on hover
- [ ] Product badges are positioned correctly
- [ ] Filter buttons work (click each category)
- [ ] "Load More" button is centered

#### Featured Carousel
- [ ] 3 slides visible simultaneously
- [ ] Previous/Next arrows are visible
- [ ] Arrows are clickable and navigate slides
- [ ] Pagination dots are visible
- [ ] Active dot is highlighted
- [ ] Carousel auto-plays (5 second interval)
- [ ] Auto-play pauses on hover
- [ ] Swipe/drag works with mouse

#### Materials & Craftsmanship
- [ ] Material cards display in 3-column grid
- [ ] Each card has image and features
- [ ] Craftsmanship section is two-column layout
- [ ] Numbered process steps are visible
- [ ] Images have proper layout

#### Sustainability
- [ ] Two-column layout (image + text)
- [ ] Eco features display in 2-column grid
- [ ] Feature icons are visible
- [ ] Certification badges display in 4 columns
- [ ] All content is readable

#### Quality Assurance
- [ ] Quality cards display in 3-column grid
- [ ] Testing process has dark background
- [ ] 4 testing steps display horizontally
- [ ] Warranty cards display in 2 columns
- [ ] Checkmark icons appear on warranty features

#### Testimonials
- [ ] Featured testimonial spans full width
- [ ] Regular testimonials display in 3 columns
- [ ] Star ratings are visible (gold color)
- [ ] Client avatars have initials
- [ ] Quote marks are visible (subtle opacity)

#### Journal
- [ ] Featured article spans full width (2-column layout)
- [ ] Regular articles display in 3 columns
- [ ] Category badges are visible
- [ ] Article metadata (date, read time) displays
- [ ] Hover effects work on articles
- [ ] "Read More" arrows animate on hover

#### Contact Section
- [ ] Two-column layout (form + info)
- [ ] Form fields are properly styled
- [ ] Labels are uppercase
- [ ] Required fields are marked with *
- [ ] Form validation works (try submitting empty)
- [ ] Contact info cards are visible
- [ ] Map placeholder is visible

#### Footer
- [ ] 4-column layout
- [ ] Logo and description are visible
- [ ] Social icons are visible and hover
- [ ] All link columns are organized
- [ ] Newsletter form is functional
- [ ] Footer bottom has copyright and legal links

### 2. Tablet View (768px)

#### Resize browser to 768px width

- [ ] Navigation collapses to hamburger menu
- [ ] Hamburger icon (3 lines) is visible
- [ ] Clicking hamburger opens mobile menu from right
- [ ] Mobile menu has dark overlay
- [ ] Mobile menu links are vertical
- [ ] Clicking overlay closes menu
- [ ] Clicking menu link closes menu and scrolls
- [ ] Products display in 2 columns
- [ ] Carousel shows 2 slides at a time
- [ ] Materials display in 2 columns
- [ ] Quality cards display in 2 columns
- [ ] Testimonials display in 2 columns
- [ ] Journal articles display in 2 columns
- [ ] Footer displays in 2 columns
- [ ] Contact form is single column
- [ ] All text remains readable

### 3. Mobile View (375px)

#### Resize browser to 375px width

- [ ] Hamburger menu is prominent
- [ ] Hero title scales appropriately
- [ ] Hero buttons stack vertically
- [ ] All sections use single column
- [ ] Product grid is single column
- [ ] Carousel shows 1 slide at a time
- [ ] Carousel arrows are smaller
- [ ] Touch swipe works on carousel
- [ ] About section text comes before image
- [ ] Stats display in 2 columns
- [ ] Material cards are single column
- [ ] Quality cards are single column
- [ ] Testimonials are single column
- [ ] Journal articles are single column
- [ ] Contact form is full width
- [ ] Contact info stacks vertically
- [ ] Footer stacks vertically
- [ ] All buttons are touch-friendly (min 44px height)
- [ ] No horizontal scrolling occurs
- [ ] Text is readable without zooming

### 4. Interactive Features

#### Navigation
- [ ] Smooth scroll to sections works
- [ ] URL updates when navigating
- [ ] Browser back button works
- [ ] Sticky header hides/shows on scroll (optional)

#### Product Filtering
- [ ] Click "Seating" - only seating products show
- [ ] Click "Tables" - only table products show
- [ ] Click "Storage" - only storage products show
- [ ] Click "Bedroom" - only bedroom products show
- [ ] Click "All Collections" - all products return
- [ ] Filtered products fade in/out smoothly

#### Carousel
- [ ] Auto-advance works (wait 5 seconds)
- [ ] Clicking next arrow advances slide
- [ ] Clicking previous arrow goes back
- [ ] Next button disables at last slide
- [ ] Previous button disables at first slide
- [ ] Clicking dots navigates to specific slide
- [ ] Keyboard arrows work (focus carousel first)
- [ ] Hover stops auto-play
- [ ] Mouse leave resumes auto-play

#### Forms
- [ ] Contact form: Try submitting empty
- [ ] Contact form: Enter invalid email (shows error)
- [ ] Contact form: Fill all required fields (submits)
- [ ] Newsletter: Try invalid email (error styling)
- [ ] Newsletter: Enter valid email (success message)
- [ ] Form buttons show loading states
- [ ] Success messages appear
- [ ] Forms reset after successful submission

#### Animations
- [ ] Scroll down page - elements reveal as they enter viewport
- [ ] Elements don't all appear at once (stagger effect)
- [ ] Hero has parallax effect (background moves slower)
- [ ] Product cards lift on hover
- [ ] Images zoom on hover (within cards)
- [ ] Button hover states are smooth
- [ ] No janky or laggy animations

### 5. Accessibility Testing

#### Keyboard Navigation
- [ ] Press Tab - focus moves through interactive elements
- [ ] Tab through header links
- [ ] Tab through product cards
- [ ] Tab through form fields
- [ ] Tab through footer links
- [ ] Press Shift+Tab - focus moves backward
- [ ] Focus outline is visible on all elements
- [ ] Skip navigation link appears on Tab (top-left)
- [ ] Pressing Enter on skip link scrolls to main content

#### Keyboard Shortcuts
- [ ] Focus carousel, press Right Arrow - next slide
- [ ] Focus carousel, press Left Arrow - previous slide
- [ ] Mobile menu open, press Escape - closes menu
- [ ] Focus form field, press Tab - moves to next field

#### Screen Reader Testing (Optional)
- [ ] Turn on screen reader (NVDA/JAWS/VoiceOver)
- [ ] Navigate through page
- [ ] All images have alt text or placeholders
- [ ] Form labels are announced
- [ ] Buttons have descriptive text
- [ ] Landmarks are properly announced (header, main, footer)

### 6. Performance Testing

#### Load Speed
- [ ] Page loads in under 3 seconds
- [ ] No visible layout shift (CLS)
- [ ] Images load progressively (lazy loading)
- [ ] Console shows no errors
- [ ] Console shows "Page loaded in X ms"

#### Smooth Scrolling
- [ ] Scroll through entire page
- [ ] No stuttering or lag
- [ ] Animations are smooth (60fps)
- [ ] No memory leaks (check DevTools)

### 7. Browser Compatibility

Test in each browser:

#### Chrome/Edge
- [ ] All features work
- [ ] No console errors
- [ ] Animations are smooth

#### Firefox
- [ ] All features work
- [ ] No console errors
- [ ] Animations are smooth

#### Safari (if available)
- [ ] All features work
- [ ] No console errors
- [ ] Backdrop blur works (mobile menu)

### 8. Edge Cases

- [ ] Disable JavaScript - basic content is still accessible
- [ ] Zoom in to 200% - layout doesn't break
- [ ] Zoom out to 50% - layout looks reasonable
- [ ] Print page - printer-friendly version appears
- [ ] Long product names don't break layout
- [ ] Many products don't break grid
- [ ] Resize window rapidly - no layout issues

## 🐛 Common Issues & Solutions

### Issue: Images not loading
- **Solution**: Images are placeholders. Replace with actual images in `assets/images/`

### Issue: Mobile menu not opening
- **Solution**: Check browser console for JavaScript errors

### Issue: Animations not working
- **Solution**: Check if `prefers-reduced-motion` is enabled in OS settings

### Issue: Form not submitting
- **Solution**: Forms are simulated. Connect to backend API in `js/form.js`

### Issue: Carousel not auto-playing
- **Solution**: Check if hovering over carousel (auto-play pauses on hover)

### Issue: Sticky header not working
- **Solution**: Scroll down at least 100px to trigger sticky state

## ✅ Sign-Off Checklist

Before considering the website complete:

- [ ] All 12 sections are present and functional
- [ ] Responsive design works on all breakpoints
- [ ] All animations are smooth
- [ ] Forms validate properly
- [ ] Navigation works correctly
- [ ] No console errors
- [ ] Accessibility features work
- [ ] Performance is acceptable
- [ ] Cross-browser compatible
- [ ] README documentation is complete

## 📝 Test Results Template

```
Date: ___________
Tester: ___________
Browser: ___________
Screen Size: ___________

Desktop Tests: ___/60 passed
Tablet Tests: ___/25 passed
Mobile Tests: ___/30 passed
Interactive: ___/20 passed
Accessibility: ___/15 passed
Performance: ___/8 passed
Browser Compat: ___/9 passed
Edge Cases: ___/8 passed

Total Score: ___/175 (___%)

Notes:
_________________________________
_________________________________
_________________________________
```

## 🎯 Priority Levels

- **Critical (P0)**: Must fix before launch
  - Navigation broken
  - Forms don't validate
  - Major layout issues
  - Accessibility violations

- **High (P1)**: Should fix soon
  - Minor animation glitches
  - Hover state issues
  - Image optimization

- **Medium (P2)**: Nice to have
  - Additional animations
  - Performance optimizations
  - Enhanced features

- **Low (P3)**: Future enhancements
  - PWA features
  - Advanced analytics
  - Additional integrations
