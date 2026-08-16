# Muzammil Ansari Portfolio

## Complete project handover and continuation brief

**Handover date:** 16 August 2026  
**Project owner:** Muzammil Ansari  
**Project type:** Personal design portfolio  
**Current framework:** Astro with TypeScript and selective React islands  
**Current hosted preview:** <https://muzammil-ansari-portfolio.muzammilvision10x.chatgpt.site>  
**Intended custom domain in the code:** <https://muzammil.design>  

> This document is the main source of context for any developer or AI continuing the project. Read it before changing the design, content, project structure, imagery, typography, or interactions.

## 1. What this project is

This is the personal portfolio of **Muzammil Ansari**, a computer engineer who moved into graphic design, UI/UX, brand identity, packaging, and campaign design.

The portfolio is not intended to feel like a generic template, a startup landing page, or a decorative agency website. It is intended to feel like a carefully art-directed designer portfolio with a strong editorial point of view.

The website has two jobs:

1. Present Muzammil as a thoughtful multidisciplinary designer whose engineering background brings structure and discipline to creative work.
2. Become a long-term home for real projects and case studies across UI/UX, brand identity, campaigns, and packaging.

The current site is a polished portfolio shell with real introductory content, real project names, real thumbnails for most existing work, strong interaction design, responsive behavior, accessibility support, and deployment configuration. The next major phase is adding complete case-study content, links, project documents, final social profiles, a resume, and the remaining thumbnails.

## 2. Original aim and creative direction

The approved direction is best described as:

- Swiss editorial
- Brutalist monochrome
- Modernist grid-based composition
- Strong typographic hierarchy
- Minimal but expressive motion
- Designer-led, not template-led
- Structured, intentional, and slightly experimental

The experience should feel like a printed editorial layout brought to life on the web. The design depends on scale, whitespace, alignment, hairline rules, typography, contrast, and motion. It should never depend on glossy effects.

The core philosophy behind the portfolio is:

> “Every brief deserves its own visual language.”

The site should communicate that different projects need different solutions. Do not use copy suggesting that every type of work is approached in exactly the same visual way.

## 3. Non-negotiable design rules

These rules have been established through repeated user feedback and must be preserved unless Muzammil explicitly changes them.

### Visual rules

- Keep the interface primarily monochrome.
- Use the paper color and near-black ink color as the main visual system.
- Full-color artwork is allowed inside real project thumbnails and case-study media.
- Do not add gradients to the website interface.
- Do not add drop shadows to interface components.
- Do not add rounded cards, rounded buttons, pills, glass effects, or soft SaaS styling.
- Circular shapes are allowed only where they are intentional ornaments, such as the cursor, coil, or circular graphic marks.
- Do not place text or interactive elements directly against viewport edges.
- Preserve generous responsive gutters.
- Use thin rules, double rules, grids, and sharp rectangular regions.
- Do not add numerical project indexes.
- Avoid decorative clutter that does not support hierarchy or interaction.

### Writing rules

- Do not use em dashes anywhere in website copy.
- Avoid AI-sounding phrases, generic creative clichés, and inflated claims.
- Write like a sharp human copywriter: specific, natural, concise, and confident.
- Keep meta labels lowercase.
- Keep headings short and visually decisive.
- Do not change real facts or company names without confirmation.

### Motion rules

- Use the easing curve `cubic-bezier(.22, 1, .36, 1)` for the main slow motion language.
- Motion should feel smooth, deliberate, and slightly luxurious.
- Every motion effect must have a reduced-motion fallback.
- Heavy smooth scrolling, parallax, magnetic motion, and custom cursor behavior must only run on suitable fine-pointer devices.
- Touch devices should remain direct, stable, and easy to use.

## 4. Final typography direction

### Primary display typeface: Barques

The user supplied and approved the **Barques** font family. The font files are self-hosted in `public/fonts/`.

Available weights:

| File | CSS weight | Intended use |
|---|---:|---|
| Barques-Thin.otf | 100 | Very light display accents |
| Barques-Light.otf | 300 | Light hero hierarchy |
| Barques-Regular.otf | 400 | Mid-weight display text |
| Barques-Bold.otf | 700 | Strong headings and brand mark |
| Barques-ExtraBold.otf | 800 | Primary hero emphasis |
| Barques-Heavy.otf | 900 | Rare maximum-impact display use |

Barques is the visual signature of the portfolio, but it has a strict usage rule:

**Barques must only be used in uppercase.**

The user does not like its lowercase letterforms. Use it for short display moments such as:

- Hero name
- Logo wordmark
- Section headings
- Project titles
- Category titles
- Ticker text
- Mobile navigation labels

Do not use Barques for long paragraphs, long quotations, multi-line descriptive copy, fact tables, or small metadata.

Barques has unusual display-font metrics. It can appear clipped when line-height is too tight or when an overflow mask has no internal breathing room. Preserve padding around masked text and use cautious line-height values. Always test uppercase headings at desktop and mobile sizes before shipping.

### Secondary typeface: Instrument Sans Variable

**Instrument Sans Variable** is the approved supporting sans-serif. It is loaded through `@fontsource-variable/instrument-sans` and used for:

- Body copy
- Long headlines
- About text
- Facts and metadata
- Navigation
- Project descriptions
- Contact copy
- Quote section
- Small labels

The pairing works because Barques provides identity and Instrument Sans provides clarity.

### Fonts that are not part of the current implementation

Earlier planning mentioned Bricolage Grotesque and Space Mono. They are not used in the current code. Do not reintroduce them without explicit approval. The current approved system is Barques plus Instrument Sans.

## 5. Color and layout tokens

The main tokens live in `src/styles/global.css`.

| Token | Value | Role |
|---|---|---|
| `--paper` | `#f2f0eb` | Main warm off-white background |
| `--ink` | `#11110f` | Main near-black foreground |
| `--muted` | `#716f69` | Secondary metadata |
| `--hairline` | `1px` | Rule and border language |
| `--gutter` | `clamp(1.15rem, 3vw, 3.25rem)` | Responsive page spacing |
| `--ease` | `cubic-bezier(.22, 1, .36, 1)` | Main motion curve |

The interface is intentionally almost monochrome. Project thumbnails may contain brand colors because they represent the actual work.

The layout uses responsive CSS grids, fluid type with `clamp()`, strong negative space, and horizontal project rails. Main breakpoints are approximately:

- Desktop and large tablet: above 900px
- Tablet: 621px to 900px
- Mobile: 620px and below

The smallest supported width is 320px.

## 6. Current page structure

The portfolio is currently a single-page experience plus a custom 404 page.

### Fixed header

- Barques wordmark: MUZAMMIL / ANSARI
- Desktop links: about, work, contact
- Mobile menu trigger with animated line treatment
- Difference blend mode for visibility over light and dark sections

### Hero

The hero introduces:

- MOHD
- MUZAMMIL
- ANSARI
- brand & UI/UX designer
- identity, campaigns, packaging
- Mumbai, working worldwide

The name uses a 12-column desktop grid with deliberate variation:

- MOHD: Barques Light, smaller and lighter
- MUZAMMIL: Barques ExtraBold, largest and strongest
- ANSARI: Barques Regular, medium emphasis

This weight and position variation is important. A previous version made the full name uniformly large and heavy, which looked awkward. Preserve the hierarchy and whitespace.

The hero also contains double rules and a repeating coil ornament.

### Capability ticker

The ticker repeats:

`UI/UX DESIGN ＊ CAMPAIGN CREATIVE ＊ BRAND GUIDELINES ＊ WEB DESIGN ＊ BRAND IDENTITY ＊ PACKAGING ＊`

It is a continuous uppercase Barques strip separated by asterisk symbols.

### About section

The section header reads:

- ABOUT ME
- designer, not decorator

Current main statement:

> I’m a computer engineer who found his way into design. I stayed for the balance of logic and expression.

Current biography:

> I started designing in college, first through graphics and later through UI/UX. Engineering taught me to ask how things work; design taught me to notice how they feel. Somewhere between the two, I found my way of working: structured, considered and never random. My professional experience includes campaigns and visual content for restaurants across the UK. Alongside that, I’ve worked directly with clients on brand identities, app interfaces and packaging, with every detail given a job to do.

Important content decision:

- The descriptive paragraph intentionally does not name Digital GB.
- The facts table intentionally does name Digital GB because the user asked to preserve that factual row.

Current facts:

| Label | Value |
|---|---|
| currently | Graphic Designer, Digital GB |
| since | July 2025 |
| background | Computer Engineering |
| focus | Brand identity & UI/UX |
| also | Packaging · Campaigns · Apps |
| tools | Figma · Adobe CC · Affinity · Canva |
| based | Mumbai, IN |

The user also works with Photoshop, Illustrator, AI tools such as ChatGPT and Claude, and other creative tools. The visible facts table is intentionally concise.

### Work introduction

Current heading:

> A closer look at what I make.

Current support text:

> Brand systems, interfaces, campaigns and packaging. Each shaped by its own brief, process and point of view.

This replaced the rejected phrase “Different formats. One way of thinking.” Do not restore that phrase. The user felt it incorrectly implied that every discipline receives the same thinking.

### Expandable work categories

The work browser has four categories:

1. UI/UX
2. Brand Identities
3. Campaigns
4. Packaging

The interaction is intentionally inline, not a modal and not a popup.

When a category is selected:

- The selected category expands directly below its own category row.
- The remaining categories move below the expanded archive.
- Only one category is open at a time.
- Multiple projects appear in a horizontal scroll-snap rail.
- Previous and next arrow controls move the rail smoothly.
- The layout remains touch-scrollable.

Do not replace this interaction with a popup, modal, full-screen overlay, or distant archive below every category. Those approaches were tried and rejected.

### Design philosophy section

The pre-footer statement is intentionally a single large quotation:

> “Every brief deserves its own visual language.”

Attribution:

> Muzammil Ansari

Do not attribute it to “Usman Ansari.” That was an accidental name used once in conversation. The correct portfolio name is Muzammil Ansari.

### Contact and footer

Current contact copy:

- Have a project in mind?
- Let’s make it matter.

The call to action opens an email to:

`AnsariUzamil3000@gmail.com`

Use that exact email unless the user provides a correction.

Instagram, LinkedIn, and the updated resume have not been supplied yet. Do not invent URLs for them.

## 7. Current real project content

Project data currently lives directly in `src/components/WorkCategories.tsx`.

### UI/UX

#### TWPAYZ Website

- Type: Website design
- Tool: Figma
- Description: A complete website design created in Figma for TWPAYZ, shaped around a clear structure and a smooth digital experience.
- Thumbnail: `public/images/projects/twpayz-website-v2.webp`
- Thumbnail status: Final 2400 × 1500 version supplied
- Missing: Figma link or full case study

#### My Swanand Pathology

- Type: Mobile app UI/UX
- Description: An end-to-end app interface for My Swanand Pathology Center, designed to make the service easier to understand and use.
- Thumbnail: `public/images/projects/my-swanand-pathology-v2.webp`
- Thumbnail status: Final 2400 × 1500 version supplied
- Missing: Full case study

### Brand Identities

The brand identity order is fixed as:

1. VisionSpace Reality
2. Prime Charge
3. RR Dhaba

#### VisionSpace Reality

- Keep “VisionSpace” as one word with capital V and capital S.
- Current title in code: VisionSpace Reality
- Description: A detailed identity guideline for a real estate agency, covering brand voice, logo usage, marks, colour theory and visual discipline.
- Thumbnail: `public/images/projects/vision-space-reality.webp`
- Missing: Full brand guideline document or case study
- Naming caution: The supplied artwork may visually read “Realty,” while the approved project title in the site currently reads “Reality.” Do not change this without asking the user.

#### Prime Charge

- Type: EV charging brand identity
- Description: A brand guideline for an EV charging company, bringing its logo, colour palette and typography into one consistent system.
- Thumbnail: `public/images/projects/prime-charge.webp`
- Missing: Brand guideline document or case study

#### RR Dhaba

- Correct spelling: RR Dhaba
- The letter R is repeated twice.
- Description: An early restaurant identity project covering the logo, colour palette, typography, banners and menu design.
- Thumbnail: `public/images/projects/rr-dhaba.webp`
- Missing: Full case study

### Campaigns

- No final campaign projects have been added.
- The user plans to select restaurant campaign posters from professional work.
- The current archive intentionally displays a “POSTER SELECTION IN PROGRESS” placeholder.
- Do not invent campaign projects or client names.

### Packaging

#### The Cleeds

- Type: Seed packaging and identity
- Description: Logo development and packaging design for a seed brand, organising its range clearly while building a consistent shelf presence.
- Missing: Final thumbnail and packaging case study

## 8. Project image rules

The project-card frame is fixed to a **16:10 aspect ratio**.

Recommended thumbnail specification:

- Dimensions: 2400 × 1500 pixels
- Aspect ratio: 16:10
- Preferred delivery: PNG from the designer, optimized to WebP for the website
- Color: Use the real project artwork as supplied
- Fit behavior: `object-fit: contain`
- Loading: Lazy
- Decoding: Async

The current two UI/UX images are exactly 2400 × 1500. Their files include intentional internal whitespace around the mockups. If the artwork looks visually small, that is not a CSS aspect-ratio error. Changing it requires either cropping the source artwork or deliberately zooming it. Ask the user before cropping.

Use new versioned filenames when replacing published images, such as `project-name-v2.webp`. This avoids old browser caches showing a previous asset.

The following older files remain in the repository but are no longer referenced:

- `my-swanand-pathology.webp`
- `twpayz-website.webp`

They may be removed during a later cleanup after confirming no deployment depends on them.

## 9. Interaction and motion system

The interaction layer is implemented in `src/components/InteractionLayer.tsx`.

### Current interactions

- Staggered hero word reveal on page load
- In-view reveal animations for major content blocks
- Continuous ticker animation
- Breathing coil ornament
- Custom desktop cursor ring with delayed follow movement
- Cursor expansion over interactive elements
- Cursor press response
- Arrow echo effect with three delayed arrow copies
- Magnetic movement on selected calls to action and text links
- Thin scroll-progress indicator at the top of the viewport
- Selective parallax on suitable desktop devices
- Lenis smooth scrolling on fine-pointer devices only
- Hover line reveals on navigation
- Hover movement on hero words
- Hover inversion on facts rows
- Hover animation on category cards and arrows
- Contact underline and asterisk motion
- Footer link and alignment movement
- Astro page transitions through `ClientRouter`
- Mobile menu using a sharp clip-path reveal

### Motion safety

All non-essential motion must respect `prefers-reduced-motion: reduce`.

Current reduced-motion behavior includes:

- Animations reduced to effectively zero duration
- Load and reveal elements immediately visible
- Smooth scroll disabled
- Parallax disabled
- Lenis not loaded
- Custom cursor not activated
- Work-category expansion changes immediately

## 10. Accessibility requirements

Accessibility is part of the design, not an optional polish pass.

Current provisions:

- Semantic sections and headings
- Skip-to-content link
- Keyboard-accessible buttons and links
- Focus-visible styles
- `aria-expanded` and `aria-controls` on category controls
- Accessible labels on project rail arrows
- Alt text for real project thumbnails
- Decorative ornaments hidden from assistive technology
- Reduced-motion support
- Minimum supported viewport width of 320px
- Touch-friendly mobile navigation and horizontal project rails

When adding new content, maintain meaningful heading order, alt text, keyboard access, and sufficient contrast.

## 11. Technical architecture

### Stack

- Astro
- TypeScript
- React only for interactive islands
- Motion for animation and layout transitions
- Lenis selectively for desktop smooth scrolling
- Tailwind CSS is installed, but most of the finished visual system is written as custom CSS
- Self-hosted Barques font files
- Self-hosted package copy of Instrument Sans Variable

### Why Astro

The website is content-led and visual rather than application-heavy. Astro keeps the default page mostly static and sends JavaScript only for the two parts that need it:

- `InteractionLayer` with `client:load`
- `WorkCategories` with `client:load`

This supports fast loading, low client-side JavaScript, and strong mobile performance while still allowing sophisticated interaction.

### Important files

| Path | Purpose |
|---|---|
| `src/pages/index.astro` | Main page content and section order |
| `src/pages/404.astro` | Custom 404 page |
| `src/layouts/BaseLayout.astro` | Metadata, canonical URL, Open Graph, JSON-LD, global CSS |
| `src/styles/global.css` | Complete visual system and responsive behavior |
| `src/components/WorkCategories.tsx` | Project data and expandable project browser |
| `src/components/InteractionLayer.tsx` | Cursor, motion, Lenis, parallax, menu, magnetic and arrow effects |
| `src/components/Header.astro` | Fixed navigation and wordmark |
| `src/components/Footer.astro` | Contact CTA and footer content |
| `src/components/Ticker.astro` | Capability ticker |
| `src/components/Rule.astro` | Single and double hairline rules |
| `src/components/SectionBar.astro` | Reusable section metadata bars |
| `public/fonts/` | Barques font family |
| `public/images/projects/` | Optimized project thumbnails |
| `public/og.jpg` | Social sharing image |
| `astro.config.ts` | Astro configuration and intended canonical domain |
| `scripts/prepare-sites.mjs` | Packages the static build for the current Sites deployment |
| `.openai/hosting.json` | Current Sites project binding |

## 12. Performance approach

The site should target excellent desktop and mobile performance.

Current performance choices:

- Static Astro rendering
- HTML compression
- Automatic stylesheet inlining where useful
- React limited to interactive islands
- Project images converted to WebP
- Project images lazy-loaded and asynchronously decoded
- Locally hosted fonts
- `font-display: swap`
- Lenis loaded dynamically only for suitable devices
- Passive pointer and scroll listeners where appropriate
- RequestAnimationFrame for cursor and scroll-linked effects
- No large UI libraries
- No analytics package yet

Future work should aim for a mobile Lighthouse score of 95 or better without flattening the design.

## 13. SEO and metadata

Current SEO support includes:

- Page title
- Meta description
- Canonical URL
- Open Graph metadata
- X large-image metadata
- Person JSON-LD
- Custom 404 page
- Social image at `public/og.jpg`

Important deployment note:

`astro.config.ts` currently declares `https://muzammil.design` as the canonical site. This is the intended custom domain, but it is not confirmed as purchased or connected. Before deploying permanently to another hostname, update the `site` value to the real production domain so canonical and social URLs are correct.

## 14. Local development and validation

Use the existing package manager and lockfile.

```bash
npm install
npm run dev
```

Standard validation:

```bash
npm run check
npm run build
```

The production build creates static assets and then runs `scripts/prepare-sites.mjs`, which places publishable static files in `dist/client` and creates the Sites worker entry in `dist/server`.

For a conventional static host such as Cloudflare Pages, the build command can remain `npm run build` and the static publish directory is `dist/client`.

Do not replace the Astro architecture with Next.js or a fully client-rendered React app unless the project requirements change substantially.

## 15. Current deployment state and future hosting

The latest working preview is currently hosted at:

<https://muzammil-ansari-portfolio.muzammilvision10x.chatgpt.site>

The user wants a free external deployment and prefers not to have a hosting company’s name in the final URL.

Important limitation:

- Free hosting providers normally use a provider-owned subdomain such as `pages.dev`, `vercel.app`, `github.io`, or `netlify.app`.
- A clean address such as `muzammil.design` requires ownership of a custom domain.
- Hosting can remain free after a custom domain is purchased and connected.

Recommended long-term setup:

1. Cloudflare Pages for free static hosting.
2. A purchased custom domain for the clean public URL.
3. Git-based continuous deployment for later portfolio updates.

Do not publish publicly, buy a domain, or change access settings without the user’s approval.

## 16. Known open issues and unresolved decisions

### UI/UX thumbnail perception

The latest UI/UX source images and rendered frames are both 16:10. The code was measured at the correct ratio. The artwork itself contains generous internal whitespace. The user still felt the dimensions looked wrong.

Before changing this, ask the user to choose between:

1. Preserve the full supplied artwork.
2. Crop or zoom the internal artwork so the mockups appear larger.

Do not assume cropping is allowed.

### Missing content

- Instagram URL
- LinkedIn URL
- Updated resume
- TWPAYZ Figma link
- Full TWPAYZ case study
- Full My Swanand Pathology case study
- VisionSpace brand document
- Prime Charge brand document
- RR Dhaba case study
- Campaign poster selection
- The Cleeds thumbnail and case study

### Possible naming confirmation

- Confirm “VisionSpace Reality” versus “VisionSpace Realty” before changing the project title.

### Time-sensitive employment information

- The facts table currently says Graphic Designer, Digital GB, since July 2025.
- The biography avoids the company name so it remains useful over time.
- When employment changes, update the factual table after user confirmation.

## 17. Recommended next phases

### Phase 1: Safe external deployment

- Connect the project to a Git repository.
- Deploy to Cloudflare Pages or another selected free host.
- Use the temporary provider subdomain initially.
- Connect a custom domain later if purchased.
- Correct the canonical domain before final public launch.

### Phase 2: Real contact and profile links

- Add LinkedIn.
- Add Instagram if appropriate for professional work.
- Add the updated resume.
- Decide whether the resume opens in a new tab or downloads.

### Phase 3: Project detail routes

- Create an individual case-study route for each mature project.
- Preserve the same editorial design system.
- Give every project its own visual language within the shared site framework.
- Add project-specific title, description, metadata, social image, role, year, deliverables, process, outcome, and gallery.
- Do not use one identical case-study layout mechanically for every discipline.

### Phase 4: Complete archives

- Add campaign posters after selection.
- Add The Cleeds thumbnail.
- Add brand guideline PDFs or curated image galleries.
- Replace placeholder action labels with real links.

### Phase 5: Final launch review

- Confirm every proper noun and client spelling.
- Confirm contact email.
- Test desktop, tablet, and mobile layouts.
- Test keyboard navigation.
- Test reduced motion.
- Check image loading and cache behavior.
- Run performance and accessibility audits.
- Verify canonical, Open Graph, and JSON-LD URLs.

## 18. Instructions for any AI continuing this project

1. Read this entire handover before making changes.
2. Inspect the current code and do not rely only on conversation summaries.
3. Preserve the Swiss editorial and brutalist direction.
4. Preserve Barques as the uppercase-only display font.
5. Use Instrument Sans for readable multi-line content.
6. Do not introduce gradients, shadows, rounded cards, or generic template sections.
7. Do not use em dashes in website copy.
8. Do not invent client facts, social links, case-study results, or metrics.
9. Keep category expansion inline below the selected category.
10. Keep reduced-motion behavior complete.
11. Keep interaction enhancements conditional for device capability.
12. Use 2400 × 1500 project thumbnails unless a new system is explicitly approved.
13. Use versioned filenames for replaced published images.
14. Run `npm run check` and `npm run build` after code changes.
15. Explain important visual decisions in plain language to the user.
16. Ask before any decision that changes artwork cropping, factual content, hosting access, or the core design direction.

## 19. Compact continuation prompt

The following prompt can be pasted into a new AI conversation together with the project folder:

```text
You are continuing Muzammil Ansari’s personal design portfolio. Read PROJECT-HANDOVER.md completely before taking action, then inspect the current Astro project. Treat the existing code and the handover as the source of truth.

Preserve the Swiss editorial and brutalist visual direction, warm monochrome interface, sharp rules, generous whitespace, grid-based layout, uppercase-only Barques display typography, Instrument Sans body typography, slow cubic-bezier(.22,1,.36,1) motion, inline expandable work categories, responsive precision, accessibility, and reduced-motion support.

Do not add gradients, shadows, rounded cards, numerical project indexes, generic template styling, invented content, or em dashes. Keep full-color imagery limited to real project media. Do not crop project artwork without confirmation.

Continue from the current implementation instead of rebuilding it. Preserve existing working behavior, run the project checks after changes, and explain any design-sensitive decision before changing the established direction.
```

## 20. Definition of done for future changes

A future change is complete only when:

- It matches the approved design system.
- It works on desktop and mobile.
- It remains usable with keyboard and touch input.
- It respects reduced-motion preferences.
- It does not introduce font clipping.
- It does not stretch or unintentionally crop project imagery.
- It uses verified content.
- It passes the project checks and production build.
- It is reflected in the handover when it materially changes project direction, architecture, content, or deployment.

