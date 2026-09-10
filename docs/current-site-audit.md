# Current Site Audit — kirinyacouss.sc.ug

Source inspected: https://kirinyacouss.sc.ug (homepage, Background Information page). Platform: WordPress + Elementor + WordPress Download Manager plugin (for E-Library) + Joinchat (WhatsApp widget). Developed by "Bakh Technologies."

## 1. Existing functionality
- Static informational site with dropdown nav (About Us, Student Life submenus)
- Homepage hero slider (3 slides, school photos, "About Us" CTA)
- Headteacher's message excerpt + "Read More" link
- Animated counters: Students / Teachers / Years of Existence (counters render as "0+" in static fetch — likely JS-driven, unverified live values)
- "UACE 2025 Best Students" cards: name, combination, points, photo (4 students shown)
- News teaser grid (3 latest posts) linking to a full News archive
- Photo gallery strip (11 images) linking to full gallery page
- "Why Choose Us" bullet list (5 items)
- Footer with quick links, contact block, social icons
- External "Apply Online" button → Google Form (not a native application system)
- WhatsApp chat widget (Joinchat)
- E-Library section (built on WP Download Manager — implies downloadable files/resources)

## 2. Existing information architecture
```
Home
About Us
 ├─ Background Information
 ├─ Headteacher's Message
 └─ Our Team
Academics
Student Life
 ├─ Clubs and Societies
 ├─ School Uniform
 ├─ Sports Houses
 └─ Prefects and Council Body
E-Library
School-News
Gallery
Contact Us
```

## 3. Content worth migrating (verified from source pages)
- **Motto**: "Light for Life"
- **Founding**: established 2009 by Church of Uganda, Namirembe Diocese
- **Founding numbers**: opened with 2 students and 8 teachers; grew to 80 students by end of year 1
- **2010**: became a Government-Aided School under Uganda's USE programme; first Headteacher: Mrs. Simunyu Berna
- **Early infrastructure challenges**: 2 classroom blocks, no perimeter fence, no dedicated sanitation, no reliable water source, no shelter — documented history, useful for an authentic "our story" narrative
- **2015**: Rev. Mugwanga Luvumu David appointed Headteacher; school had ~400 students, 38 teachers at that time
- **Current stated scale** (as published, needs reconfirmation before launch): 1,269 students, 53 professional teachers; leadership team includes 2 Deputy Headteachers, Directors of Studies, HODs, Class Teachers, Prefectorial Body
- **Notable alumni-turned-staff**: Ms. Kobusingye Sharon Mary, Mr. Kato Faisal
- **Core Values**: Team work, Selfless service and Humility, Godliness and upholding Biblical family values, Integrity and Respect for all
- **Vision**: "To bring up academically excellent young people with Christian values"
- **Mission**: "To continue producing Holistic Professionals with Christian values in the country"
- **Differentiators** (as published): inclusive of all faiths/tribes/nationalities despite CoU founding; strong Christian values and discipline; co-curricular (Music, Dance & Drama, sports, leadership); practical skills subjects (Technical Drawing, Home Management)
- **"Why Choose Us"**: Christian Values, Quality Education, Experienced Teachers, Modern Learning Environment, Holistic Student Development
- **Contact**: location "Bweyogerere-Kirinya" / "Kirinya Bweyogerere"; phone +256 702916915 (listed twice, possibly two lines or a duplication error — verify); email is Cloudflare-obfuscated, could not be extracted from static fetch — must obtain directly from school
- **Social**: Facebook, X (Twitter), YouTube icons present — actual handle URLs not resolved in fetch, need verification
- **Apply Online** destination: https://forms.gle/unf98aNHKCN5NXP19 (external Google Form)
- **UACE 2025 "Best Students"**: 4 named students with combinations and points — this is real published exam data but must be re-confirmed with the school/UNEB before republishing, and needs parental/consent check before display on a redesigned platform
- **Gallery images**: filenames only (IMG_XXXX.JPG) referenced on the current site — actual files not to be scraped/republished without school authorization (see Section 19 of brief)

## 4. Content requiring verification before migration
- Exact current enrollment/teacher counts (site shows "0+" animated counters with real figures likely injected by JS not captured here, and prose elsewhere says 1,269 / 53 — these two sources should be reconciled with the school)
- Phone number duplication (same number listed twice — confirm if a second distinct number was intended)
- Email address (obfuscated, needs direct source)
- Social media handles (icons present, URLs not resolved)
- UACE 2025 individual student results and photos — need explicit consent from students/guardians and confirmation of accuracy
- "Our Team" staff roster (page exists in nav, not yet fetched/audited)
- Academics page content (subjects, departments — not yet fetched)
- Student Life subpages (Clubs, Uniform, Sports Houses, Prefects — not yet fetched)
- E-Library actual resource list and licensing status of any files
- Gallery: photographer credit / usage rights for all images
- Legal/privacy policy — none found on current site

## 5. Existing visual patterns
- Elementor-built, generic multipurpose-theme aesthetic
- Hero slider with dark overlay + centered white serif/script accent text
- Card-based "Why Choose Us" and student-result blocks
- Standard 3-column footer
- Heavy reliance on stock plugin widgets (WhatsApp chat bubble, animated counters)

## 6. UX problems
- No clear visual identity beyond a logo crop — colors/typography feel like an unstyled theme default
- Redundant "About Us" CTA repeated on every hero slide with no variation
- Counters render empty/placeholder without JS (poor no-JS/slow-network fallback)
- Deep content (Academics, Student Life sections) not represented on homepage at all — visitors must hunt through nav
- No visible search
- No breadcrumbs on subpages
- Apply Online routes to a generic Google Form with no in-site admissions context, requirements, or FAQ
- WhatsApp/Joinchat widget and third-party branding ("Powered by Joinchat") clutter the footer area

## 7. Performance opportunities
- Full-size JPEG hero images (scaled variants exist, e.g. "-scaled.jpeg" — but no evidence of AVIF/WebP or responsive `srcset` tuning)
- WordPress/Elementor stack typically ships large CSS/JS bundles — a Next.js SSR/static rebuild can cut payload significantly
- No indication of image lazy-loading strategy for the gallery strip

## 8. SEO opportunities
- Titles follow a plain "Page – Site Name" pattern with no structured data observed
- No Organization/EducationalOrganization schema detected
- No sitemap/robots reference visible in fetched markup
- Meta descriptions not present in fetched head data (only generator/canonical/robots/viewport tags observed)

## 9. Accessibility opportunities
- Slider text-over-image contrast not verifiable statically but common failure point on this theme type
- No skip-link destination content verified beyond "Skip to content" anchor
- Icon-only social links (Facebook/X/YouTube) with no confirmed accessible labels in fetched markup

## 10. Features that should be redesigned
- Hero slider → cinematic, editable hero with real CTAs (Discover Kirinya / Admissions)
- Enrollment counters → CMS-managed stats block sourced from verified figures, not decorative JS counters
- Apply Online → proper in-site Admissions section with process/requirements/FAQ, keeping the external form as a configurable CTA destination
- News/Gallery teasers → full CMS-driven News and Gallery systems with categories, search, albums
- Generic WhatsApp bubble → optional, deliberately placed contact affordance if the school still wants it

## 11. Features that should be preserved
- Full information architecture (About/Background/Headteacher/Team, Academics, Student Life subsections, E-Library, News, Gallery, Contact) — sound structure, just needs better execution
- "Apply Online" as a prominent, always-visible CTA
- Published history, vision, mission, core values, and "Why Choose Us" themes — genuine content worth carrying forward verbatim (with attribution to source page) after school sign-off
- Multi-channel contact (phone, email, social, WhatsApp) — a modern platform should still surface all of these

## 12. Proposed improvements
- Replace decorative counters with a "By the Numbers" section only once figures are reconfirmed with the school (avoid publishing an unverified 1,269/53 vs "0+" discrepancy)
- Turn the UACE results into a CMS-managed "Academic Results" entity so future years can be added without a developer, gated behind explicit publish approval for student data
- Build a real Admissions flow around the existing Google Form link (keep it as the CTA target initially, make it swappable later)
- Introduce sitemap.xml, robots.txt, Organization structured data, and per-page metadata
- Establish a formal media-rights register before any current-site photo is reused

## Pages not yet fetched (queued for full audit before migration)
Our Team, Headteacher's Message (full text), Academics, Clubs and Societies, School Uniform, Sports Houses, Prefects and Council Body, E-Library, School-News (archive), Gallery (full), Contact Us (full — to resolve email/phone/map).
