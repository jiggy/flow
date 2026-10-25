# Public site theme

## Purpose

Make FLOW's capability compounding understandable while preserving the shared
documentation reading experience.

## Ownership

- `index.tsx` routes the homepage to its own composition and preserves the
  default documentation layout, context, brand title, and Markdown resource link.
- `home.tsx` renders canonical homepage content from `docs/flow/index.md`.
  Its scoped effects provide keyboard tabs, previous/next controls, and optional
  heading transitions. Listeners and timers end when the homepage unmounts.
  Generated Markdown retains every story panel and the complete narrative.
- `social-head.ts` supplies share-image defaults and each page's public URL.
  Product image data stays in `../flow/social.ts`. Native Rspress retains titles
  and descriptions. Frontmatter head tags can override individual defaults.
- `brand-title.tsx` composes the theme-selected decorative emblem with the live
  product name, which provides the navigation link's accessible name.
- `search.tsx` uses Rspress's native local search with conditional mounting,
  modal semantics, keyboard controls, focus containment, and focus restoration.
- `navigation.tsx` presents the flat primary links in a native mobile disclosure
  with Escape dismissal and a theme control. Configurations keep those links
  flat.
- `appearance.tsx` supplies a native theme button, retaining keyboard focus
  inside the mobile navigation so Escape can dismiss it after a theme change.
- `sidebar.tsx` gives native sidebar groups keyboard controls and expanded
  state, and removes collapsed links from the focus order.
- `tabs.tsx` adds keyboard tab semantics to native Rspress tabs while retaining
  language persistence and complete Markdown export.
- `code-themes.ts` retains the One Light and One Dark Pro palettes with native
  Shiki color replacements targeting 7:1 text contrast against their code
  backgrounds.
- `llms.ts` orders generated page links using the same sidebar as human readers.
  Unlisted public pages remain discoverable rather than silently disappearing.
- `fonts/` owns self-hosted OpenRunde Regular and Semibold for the homepage.
  It retains Latin variable Manrope and JetBrains Mono from Fontsource 5.3.0,
  plus Quicksand SemiBold and Bold for the Jig and FLOW wordmarks. Their individual OFL notices
  are copied to each site's `/font-licenses/` directory during assembly.
- `landing.css` composes each site's emblem with its live product wordmark in
  the balanced monochrome lockup.
- `accessible-markdown.ts` gives generated heading links accessible names and
  makes tables keyboard-focusable for horizontal scrolling.
- `diagram-images.ts` and `diagram-theme-loader.cjs` generate fixed light/dark
  variants of local Archify SVGs during HTML builds. Site appearance selects the
  visible image. Native zoom and the original Markdown image remain intact. This
  avoids relying on WebKit inheriting color schemes inside SVG images.
- Public prose stays in `docs/`. Shared documentation presentation stays in
  `../landing.css`. Homepage presentation stays in `../home.css`, scoped to
  `.flow-home` so it cannot restyle documentation.

## Local Contracts

- Preserve default documentation navigation, search, and accessibility.
- Homepage markup owns its navigation, skip link, main landmark, and footer.
  Keep all interactive content available in generated Markdown.
- Keep the shared nav lockup monochrome and balanced. Pair the Jig striped mark
  with Quicksand SemiBold `jig`. Pair the FLOW unstriped mark with Quicksand
  Bold `FLOW`. Keep the accessible product names as live text. Do not duplicate
  them inside the image assets.
- Keep both sites independent. Shared components contain no product prose.

## Work Guidance

- Prefer the default theme and small extensions over a copied theme.
- Lead from familiar Skills to application uses, reuse, comparison, design principles,
  a concrete example, and first use.
- Show reuse at a glance before explaining contracts. Repeat one recognizable
  method across app contexts and keep the mechanism in a short supporting line.
- Keep story changes manual. Preserve visible tabs, side controls, keyboard
  navigation, and a stable accessible hero heading. Reduced motion keeps one
  heading phrase visible. Heading transitions pause while the page is hidden.
- Keep runtime examples open-ended and host support distinct from requested
  integrations. Show code and instructions behind one caller-facing interface.

## Verification

- Build this repository's site and inspect homepages and guides in both themes at mobile and
  desktop widths, including 320px reflow and reduced motion.
- Exercise search, empty results, keyboard-only navigation, walkthrough tabs,
  and Markdown copying. Check browser errors and accessibility violations.
- Aim for WCAG AAA text contrast. Automated checks do not establish full WCAG
  conformance or comparative superiority. Preserve their precise scope.

## Child DOX Index

- None.
