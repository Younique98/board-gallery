# Future Considerations

This document outlines improvements, missing features, and best practices that were not implemented within the 4-hour time constraint. These would be prioritized in a production-ready or polished version of the project.

---

## 1. Performance

- Reduce Largest Contentful Paint (LCP) issues by optimizing the initial image payload
- Fine-tune `sizes` and layout logic for responsive image rendering
- Remove unused layout JavaScript and defer non-critical logic
- Explore virtualization for large datasets if performance degrades further

---

## 2. UX & Interaction

- Trigger video playback on hover instead of requiring click
- Add search functionality for filtering assets
- Filter assets by board when a board is clicked
- Animate asset loading transitions for polish
- Add empty states and graceful error handling for fetch failures

---

## 3. Feature Completion

- Allow filtering assets by board title (top nav)
- Enable infinite scroll for boards, not just assets
- Complete tickets #8 and #9 (Board filtering, video interaction polish)
- Display board count dynamically and link each to its filtered content
- Vary asset heights to match an interlocking, masonry-style visual layout

---

## 4. Testing Strategy

- Add unit tests for `ClipCard`, `BoardCard`, and infinite scroll logic
- Validate accessibility with `jest-axe` or `axe-core`
- Add integration tests for scrolling, filtering, and video interaction
- Set up GitHub Actions for test and lint validation

---

## 5. Code Quality & Maintainability

- Modularize styling and logic for media components (photos vs videos)
- Use suspense boundaries for future lazy-loaded components
- Clean up types and avoid hardcoding (e.g., thumbnail selection logic)

---

## 6. Deployment & Monitoring

- Add Lighthouse CI to track performance regression over time
- Include basic telemetry or visual logs for error tracking (e.g. Sentry)
- Set up environment-specific builds and deployment previews via Vercel

---

## 7. Bonus Features (Stretch Goals)

- Ellipsis menu and context menu on hover/right-click
- Drag-to-select support using `react-drag-to-select`
- Drag-and-drop reordering or board reallocation
- Share, copy, and download interactions from asset cards

---

## 8. Accessibility

- Add semantic landmarks and aria-labels to dynamic content
- Improve tab navigation and focus management
- Add keyboard support for video interaction and hover menus

---

These will be tackled in follow-up iterations with the goal of maximizing performance, polish, and usability while maintaining a maintainable and testable codebase.
