# FLOW design

Use this guide when extending FLOW's website and related public interfaces.
The design should make useful know-how feel approachable, capable, and worth building on.
These defaults describe the visual language implemented by the website.

The [brand guide](.agents/brand.md) owns names, emblems, and lockup proportions.
The [communication guide](.agents/communication.md) owns positioning and narrative.
The [product compass](.agents/product-compass.md) governs both.
For package architecture, use [Design modular Flows](docs/flow/guide/design.md).

## Design principles

- Start with the reader's useful Skills and what they could build from them.
- Establish the benefit before comparison, features, or architecture.
- Give each section one job and each illustration one clear idea.
- Use generous space, rounded forms, restrained colour, and simple visuals.
- Connect accents to meaning across an icon, headline, and illustration.
- Keep examples explicitly illustrative and support claims tied to implemented behaviour.

## Narrative and voice

Address the builder directly, with familiar words and concrete outcomes.
Skills are already reusable and shareable.
Explain what a common callable boundary adds to applications, workflows, and agents.
Present FLOW as a proposed successor to SKILL.md, with its ambition and current availability clearly distinguished.

Develop the reader's understanding through connected questions:

| Reader's question | What the page should establish |
| --- | --- |
| Why should I care? | Useful know-how can become a capability software calls. |
| How would I use it? | Show a recognizable task inside an application, workflow, or agent. |
| What does FLOW add? | Offer a concise comparison before distinctive features. |
| How does that work? | Introduce composition, runtime independence, and a concrete example. |
| What can I do next? | Offer authoring guidance, verified supporting hosts, and integration paths. |

Carry ideas between sections so each section answers a question raised by the preceding one.
Keep architectural detail where it helps the reader understand or act.
Use short action labels that describe the destination or useful next step.

**Illustrative examples:** The homepage uses contact import across three contexts, then a billing decision to explain mixed implementations.
These examples demonstrate the progression and can change with the page's purpose.
Their domains, exact headlines, and section count are not required design patterns.

## Identity and surfaces

Use FLOW's existing unstriped emblem beside live uppercase `FLOW` text in Quicksand Bold.
Preserve the approved geometry and monochrome treatment.
Use emblem ink `#20242C` on light surfaces and paper `#F3F5F8` on dark surfaces.
Keep decorative emblem images separate from the accessible product name.

The homepage and documentation serve different reading tasks:

| Surface | Presentation |
| --- | --- |
| Homepage | Light canvas, OpenRunde, lavender actions, periwinkle atmosphere, expressive examples, and generous spacing. |
| Documentation | Manrope, native Rspress navigation and search, light/dark themes, and a denser reading layout. |

Documentation uses FLOW blue for links and active controls: `#0369A1` in light mode and `#38BDF8` in dark mode.
Keep homepage styles scoped to `.flow-home` so they cannot restyle guides or specifications.

## Typography

Use the existing self-hosted faces and preserve their licence notices.

| Role | Typeface | Current reference |
| --- | --- | --- |
| Homepage prose and UI | OpenRunde Regular and Semibold | Base `16px/1.5`, paragraph line-height `1.6`. |
| Documentation prose and UI | Manrope | Follow the documentation theme's type scale. |
| FLOW wordmark | Quicksand Bold, weight 700 | Live text, sized using the brand guide's lockup proportions. |
| Code and filenames | JetBrains Mono | Use for actual code and technical identifiers. |

Homepage headings use tight tracking and moderate weight.
The desktop hero uses `clamp(42px, 5vw, 60px)` with a `1.12` line-height.
Standard section headings are generally `39px/1.2` before responsive adjustments.
Component styles own their exact sizes and breakpoint overrides.

Preserve the homepage's readable secondary scale: 12px small text, 13px labels, and generally 14px text links.
Mobile prose generally uses 15px.
Reflow content before shrinking text or removing useful labels.
Judge SVG text at its rendered size, including on a 320px viewport.
Syntax-highlight any code snippets that are introduced.

## Homepage palette

Use a white canvas with quiet grey surfaces and lavender emphasis.
These values identify the current palette, rather than guaranteeing contrast in every combination.

| Role | Value | Typical use |
| --- | --- | --- |
| Ink | `#181925` | Headings and primary text. |
| Body grey | `#666773` | Supporting prose. |
| Muted | `#747580` | Secondary labels. |
| Line | `#E8E8EE` | Dividers and quiet borders. |
| Lavender | `#918DF6` | Primary actions and selected emphasis. |
| Mist | `#F5F5F7` | Soft surfaces. |
| Hero emphasis | `#7063C8` | Changing hero phrase. |
| Focus | `#6661BD` | Visible keyboard focus. |

Feature accents carry the same idea through the icon, label, and artwork.
The current feature cards use these combinations:

| Current example | Accent | Tint | Illustration highlight |
| --- | --- | --- | --- |
| Readable methods | `#14843F` | `#E5F4E9` | `#32BD65` |
| Flexible implementations | `#2565D2` | `#E6EEFF` | `#4585F6` |
| Composition | `#A06100` | `#FFF1D5` | `#ECAB39` |
| Live channels | `#BF2D84` | `#FBE5F2` | `#DF58AA` |

These mappings describe the current cards, not mandatory categories for future pages.
Pair status colours with text or symbols so colour never carries the meaning alone.

## Layout and rhythm

Keep a clear hierarchy between section introductions, explanatory copy, and visual examples.
Use whitespace to separate ideas and thin dividers where neighbouring sections need a stronger boundary.
Keep shadows subtle and reserve atmospheric imagery for broad backgrounds.

Current homepage geometry provides useful starting points:

| Element | Reference |
| --- | --- |
| Main content | Maximum width 1060px, with a 32px minimum desktop side gutter. |
| Compact margins | 24px at 850px and below, 18px at 640px and below. |
| Feature grid | Two columns with a 23px gap, stacking at 640px. |
| Feature cards | 19px radius, soft `#F7F7F8` surface, restrained decoration. |
| Actions, tags, and selected tabs | Pill shapes, usually a 99px radius. |
| Story navigation buttons | 44px square circular targets. |

Split story and runtime layouts stack at 640px.
Runtime tiles change from four columns to two at 1050px.
These measurements are implementation references, not a required grid for every new interface.
Preserve comfortable text measures and reading order when adapting them.

On phones, place story arrows near the lower corners with a centred position indicator.
Give the controls enough space to avoid covering content.
Simplify decorative details before sacrificing readable content.

## Component language

| Homepage component | Design intent |
| --- | --- |
| Navigation | Compact dark pill, monochrome FLOW identity, clear destinations, and an official GitHub mark. |
| Hero | One recognizable starting point, one useful promise, and a clear next action. |
| Story tabs | Visible tabs plus previous/next controls, with one coherent example across contexts. |
| Feature cards | One benefit and one simple visual, connected by an accent colour. |
| Comparison | Short capability rows, check/dash symbols, and a concise legend explaining their meaning. |
| Runtime example | An open `FLOW.<ext>` boundary, with named languages presented as examples. |
| Supporting hosts | Available implementations clearly separated from requested integrations. |
| Next steps | Concrete actions linked to the appropriate guide or supporting host. |

Prefer simple SVG shapes and illustrative interfaces over dense screenshots.
Use a limited palette, thin rounded strokes, and enough empty space to make the idea legible.
Keep technical architecture proportionate to the reader's question.
Use the cross relationship when explaining invocation and channels, without making it the whole visual story.

Show official host logos clearly, with balanced colour and a restrained supporting surface.
Requested integrations can use muted marks in a separate area.
Only advertise runtimes qualified by the named host's current release.
FLOW's runtime independence and a host's available runtimes are separate claims.

## Share graphics

Extend the homepage's atmosphere into social previews and the repository banner.
Use the official lockup, existing cloudscape, OpenRunde typography, and one clear promise.
Keep essential text readable when the image is reduced to a small feed card.
Leave generous space around the lockup and headline to tolerate platform crops.

| Asset | Export | Use |
| --- | --- | --- |
| `flow-social` | 1200 × 630 PNG and SVG | Default website share image. |
| `flow-readme` | 1600 × 600 PNG and SVG | Linked banner above the repository README. |

The [exporter](scripts/generate-social-assets.py) composes the artwork from repository-owned inputs.
SVG exports contain outlined lettering and an embedded texture, requiring no external fonts or images.
Commit both SVG sources and opaque PNG exports in `site/flow/public/social/`.
Use the PNG for crawler metadata and README rendering.
The current headline and proportions are examples, not mandatory templates for every future graphic.

Declare the default image and its text alternative in [product metadata](site/flow/social.ts).
Use absolute public image and page URLs in the generated HTML head.
Preserve each page's native title and description, with frontmatter overrides for page-specific previews.
Keep image dimensions, media type, and alternative text aligned with the actual export.
Follow the [Open Graph protocol](https://ogp.me/) when extending these fields.

## Interaction and accessibility

Keep story changes manual through tabs and previous/next controls.
Support Left/Right, Home/End, a roving tab index, labelled panels, and a live selection status.
Keep the hero's accessible heading stable while its visual phrase changes.

The current hero changes phrases every 3.6 seconds with a 350ms transition.
Reduced motion keeps the first phrase and disables decorative transitions and smooth scrolling.
Pause the heading timer while the page is hidden.
Remove listeners and timers when leaving the homepage.

Preserve visible focus, the skip link, landmarks, meaningful text alternatives, and complete keyboard access.
The homepage focus ring is 3px wide with a 5px offset.
Keep comparison meanings and host support understandable without colour or imagery.
Retain every tab's content in published Markdown.

Check text contrast against its actual surface, including text over atmospheric imagery.
Aim for the theme's strong contrast targets and report the scope of any accessibility verification.
Token choices alone do not establish WCAG conformance.

## Implementation and upkeep

| Owner | Responsibility |
| --- | --- |
| [Homepage content](docs/flow/index.md) | Canonical public narrative and semantic markup. |
| [Homepage CSS](site/home.css) | Homepage tokens, components, and responsive rules. |
| [Documentation CSS](site/landing.css) | Documentation presentation and shared font faces. |
| [Homepage interactions](site/theme/home.tsx) | Tabs, story controls, heading motion, and cleanup. |
| [Theme composition](site/theme/index.tsx) | Native layout, metadata, route behaviour, and document controls. |
| [Social metadata](site/theme/social-head.ts) | Shared preview defaults and per-page URL handling. |
| [Social artwork exporter](scripts/generate-social-assets.py) | Reproducible banner composition and committed image exports. |
| [Asset notices](site/flow/public/home/ASSET-NOTICES.md) | Artwork provenance, logo adaptations, and required notices. |

Keep native metadata and route behaviour when overriding the homepage layout.
Use existing fonts and official marks, retaining their notices and attribution requirements.
Keep build inputs inside this repository and its declared dependencies.

When changing the interface, inspect desktop and 320px layouts, keyboard navigation, reduced motion, and documentation in both themes.
Build into a fresh directory using the [site workflow](site/README.md).
Verify public links, assets, indexed Markdown, and exact machine resources.
Update this guide when the visual system changes, while keeping detailed component values in their owning stylesheets.
