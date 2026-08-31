# Performance Considerations

## Lighthouse Scores

Tested in **Incognito Mode** via a Vercel preview deployment.

###  Desktop

- **Performance:** 92
- **Accessibility:** 100
- **Best Practices:** 100
- **SEO:** 100

###  Mobile

- **Performance:** 74 
- **Accessibility:** 100
- **Best Practices:** 100
- **SEO:** 100

## Optimizations Implemented

- `priority` prop added to hero image
- Responsive `sizes` attribute added
- Lazy loading preserved with blur placeholder
- Reduced layout shift by fixing image aspect ratios
- Tailwind classes cleaned for leaner CSS
- Switched to optimized usage of `<Image />` with responsive `sizes` and correct `decoding`, `loading` attributes
- Removed unnecessary React Query Devtools and reduced bundle weight via dynamic imports
- Reduced layout shift by eliminating first-image preload behavior and matching container aspect ratio
- Used `aspect-video` and `object-cover` consistently
- Debounced or deferred loading of heavier video previews
- Applied `preload="none"` to non-visible videos to avoid heavy early fetching


## Areas Still Needing Attention

### 1. **Largest Contentful Paint (LCP)**

- **Issue:** First image  still loading too slowly (12,390ms in one run)
- **Planned Fix:** Replace with a smaller thumbnail or use a CDN-limited size param like `?w=600&auto=format`

### 2. **Image Rendering Scale**

- Some images may still be larger than necessary
- Could generate resized variants (e.g., via imgix or Next.js loader)

### 3. **Unused JavaScript**

- `layout.tsx` includes `122.9 KiB` but only ~28 KiB is used
- **Next Step:** Break apart layout logic further using dynamic imports or remove stale providers

### 4. **Virtualization**

- Not yet implemented, but needed for optimal performance at scale (500+ items)
- **Next Step:** Integrate `@tanstack/react-virtual` for visible-only rendering

---

## Next Steps for Performance Gains

- Convert video card to load poster only until hovered/clicked
- Use dynamic import for ReactQueryProvider in layout.tsx
- Lazy load non-critical components like ClipCard if needed
- Set proper fetchPriority and decoding for images
- Still need virtualization for clips grid
- Still need image size throttling or fallback CDN sizing
- Still need first-image LCP optimization or manual preloading

Summary
Performance improved substantially, especially on desktop, but key bottlenecks remain on mobile due to LCP image and render load of too many DOM elements. These would be next targets in a post-submission optimization sprint.