---
name: WealthLedger Core
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#45464d'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#76777d'
  outline-variant: '#c6c6cd'
  surface-tint: '#565e74'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#131b2e'
  on-primary-container: '#7c839b'
  inverse-primary: '#bec6e0'
  secondary: '#0051d5'
  on-secondary: '#ffffff'
  secondary-container: '#316bf3'
  on-secondary-container: '#fefcff'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#002113'
  on-tertiary-container: '#009668'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dae2fd'
  primary-fixed-dim: '#bec6e0'
  on-primary-fixed: '#131b2e'
  on-primary-fixed-variant: '#3f465c'
  secondary-fixed: '#dbe1ff'
  secondary-fixed-dim: '#b4c5ff'
  on-secondary-fixed: '#00174b'
  on-secondary-fixed-variant: '#003ea8'
  tertiary-fixed: '#6ffbbe'
  tertiary-fixed-dim: '#4edea3'
  on-tertiary-fixed: '#002113'
  on-tertiary-fixed-variant: '#005236'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  display-md:
    fontFamily: Inter
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 30px
    fontWeight: '600'
    lineHeight: 38px
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-lg:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.02em
  stat-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 40px
  xl: 64px
  gutter: 24px
  margin: 32px
---

## Brand & Style
This design system is built upon the pillars of **precision, transparency, and institutional trust**. The visual language adopts a **Corporate Modern** aesthetic, blending high-end financial professionalism with the streamlined efficiency of modern SaaS.

The brand personality is analytical and composed. It avoids decorative clutter, opting instead for a minimalist, card-based interface that empowers the user through clarity. The emotional response is one of calm control; the UI should feel like a high-end private banking portal reimagined for the digital age. Layouts prioritize data hierarchy, ensuring that critical financial figures are immediately accessible without cognitive overhead.

## Colors
The palette is anchored in **Deep Navy** and **Charcoal**, colors traditionally associated with stability and institutional reliability. These serve as the foundation for text and primary navigation elements.

- **Primary (Deep Navy):** Used for primary headings and core navigation backgrounds to establish authority.
- **Secondary (Royal Blue):** Reserved for "Wealth" indicators, primary actions, and focused states, providing a sophisticated technical feel.
- **Success (Emerald Green):** Specifically utilized for "Growth," positive trends, and successful transaction states. It provides a vibrant, high-contrast signal against the darker base colors.
- **Neutral/Background:** A clean **Light Grey/White** background ensures high legibility and a sense of "air," preventing the data-heavy dashboard from feeling cramped.

## Typography
This design system utilizes **Inter** for its exceptional readability and neutral, systematic character. It is specifically chosen for its "Tabular Numbers" (tnum) feature, which is essential for aligning financial figures in columns and lists.

**Hierarchy Rules:**
- **Financial Figures:** Use `stat-lg` or `display-md` for primary balances. Always ensure figures use lining totals to maintain alignment.
- **Headlines:** Keep weights at 600 or 700 to provide a strong anchor for card content.
- **Labels:** Use `label-sm` for table headers and secondary metadata, often in a muted charcoal color to maintain secondary hierarchy.

## Layout & Spacing
The layout follows a **Fixed-Fluid Hybrid** model. While the sidebar remains at a fixed width for structural stability, the main content area utilizes a 12-column fluid grid.

- **Grid:** 12 columns with 24px gutters.
- **Rhythm:** An 8px base unit governs all spacing. Vertical margins between cards are typically 24px (md), while internal card padding is consistently 24px to ensure financial data has enough "breathing room" to be analyzed without distraction.
- **Whitespace:** Prioritize generous top and bottom margins (lg) in the dashboard header to separate global navigation from the analytical workspace.

## Elevation & Depth
To maintain a minimalist and clean aesthetic, depth is communicated through **Tonal Layers** and **Ambient Shadows**.

- **Surface Tier 0:** The main background (#F8FAFC) serves as the lowest layer.
- **Surface Tier 1 (Cards):** Pure white (#FFFFFF) containers hold all interactive content.
- **Shadows:** Use a single, very soft, diffused shadow for cards: `0 4px 6px -1px rgba(15, 23, 42, 0.05), 0 2px 4px -2px rgba(15, 23, 42, 0.05)`. The tint is slightly pulled from the Deep Navy primary color to keep the shadow feeling integrated and natural.
- **Interactive Depth:** On hover, cards may subtly lift by increasing the shadow spread, but avoid heavy transitions to maintain a professional, "quiet" interface.

## Shapes
The shape language is defined by **Moderate Rounding**. This softens the "industrial" feel of financial data without appearing overly casual or consumer-focused.

- **Cards:** Use 12px corners (rounded-lg) to frame data sections cleanly.
- **Buttons & Inputs:** Use 8px corners (base) for a precise, crisp interaction point.
- **Progress Bars:** Use fully rounded (pill) ends to indicate fluid progress and growth.
- **Icons:** Use thin-line (1.5px or 2px stroke) icons with slightly rounded caps and joins to match the typography's terminal shapes.

## Components

- **Buttons:** Primary buttons use the Royal Blue background with white text. Secondary buttons use a transparent background with a 1px border in Navy. Button height should be 40px or 48px to remain accessible and substantial.
- **Cards:** The core of the design system. Every card must have a 1px border (#E2E8F0) and the defined ambient shadow. Card headers should use a 16px bottom margin to separate titles from data.
- **Inputs:** Fields should have a light grey background (#F1F5F9) and a 1px border that turns Royal Blue on focus. Labels must always be visible above the input.
- **Chips:** Used for transaction categories or status tags. Use low-saturation backgrounds (e.g., light green for 'income') with high-saturation text to ensure legibility while remaining subtle.
- **Data Tables:** Clean, no vertical borders. Horizontal borders should be 1px, very light (#F1F5F9). Row hover states should use a subtle tint of the background color.
- **Graphs/Charts:** Utilize the Emerald Green for positive trends and Royal Blue for projections. Grid lines should be minimal, using #F1F5F9.