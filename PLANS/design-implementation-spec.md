# Military Specifications Hub - Design Implementation Specification

> **Document Purpose:** Complete implementation specification for the selected design approach. This document provides all CSS values, file structures, and implementation steps needed to execute the design.

---

## Table of Contents

1. [Final Design Decision](#final-design-decision)
2. [Color System](#color-system)
3. [Typography System](#typography-system)
4. [Spacing System](#spacing-system)
5. [Component Styles](#component-styles)
6. [CSS Architecture](#css-architecture)
7. [File Structure](#file-structure)
8. [Implementation Order](#implementation-order)

---

## Final Design Decision

### Selected Approach: Hybrid Design

After analyzing all five design concepts and the existing codebase, the **Hybrid Approach** is selected as the optimal solution. This combines:

| Source Concept | Elements Adopted | Rationale |
|----------------|------------------|-----------|
| **TechSpec Modern** | Layout structure, card design, modern interactions | Provides familiar SaaS patterns, excellent accessibility |
| **Clean Authority** | Typography hierarchy, content structure | Establishes credibility and readability |
| **Command Center** | Color accents, status indicators, dark mode | Resonates with military/defense audience |
| **Federal Standard** | Accessibility compliance, focus states | Ensures WCAG 2.1 AA compliance |

### Design Principles

1. **Professional Authority** - Convey trust and expertise through clean typography and structured layouts
2. **Modern Usability** - Implement familiar SaaS patterns for intuitive navigation
3. **Military Context** - Use subtle military-inspired accents without being heavy-handed
4. **Accessibility First** - Meet WCAG 2.1 AA standards throughout
5. **Performance** - Minimize CSS bundle size, use system fonts where possible

### Key Visual Characteristics

- Clean, card-based layouts with subtle shadows
- Navy blue primary color with gold accents for CTAs
- Inter font family for excellent readability
- Rounded corners (8px) for modern feel
- Generous whitespace for content breathing room
- Dark mode support with carefully balanced contrast

---

## Color System

### CSS Custom Properties

All colors are defined as CSS custom properties for easy theming and dark mode support.

```css
/* ===========================================
   COLOR SYSTEM - CSS Custom Properties
   =========================================== */

:root {
  /* ─────────────────────────────────────────
     PRIMARY COLORS
     ───────────────────────────────────────── */
  --color-primary-50: #E8EAF6;
  --color-primary-100: #C5CAE9;
  --color-primary-200: #9FA8DA;
  --color-primary-300: #7986CB;
  --color-primary-400: #5C6BC0;
  --color-primary-500: #1E3A5F;  /* Main primary */
  --color-primary-600: #1A3356;
  --color-primary-700: #152B4A;
  --color-primary-800: #10233D;
  --color-primary-900: #0A1628;
  
  /* ─────────────────────────────────────────
     ACCENT COLORS (Gold)
     ───────────────────────────────────────── */
  --color-accent-50: #FFF8E1;
  --color-accent-100: #FFECB3;
  --color-accent-200: #FFE082;
  --color-accent-300: #FFD54F;
  --color-accent-400: #FFCA28;
  --color-accent-500: #C9A227;  /* Main accent */
  --color-accent-600: #B8922A;
  --color-accent-700: #A67F24;
  --color-accent-800: #8D6B1F;
  --color-accent-900: #6B5118;
  
  /* ─────────────────────────────────────────
     SEMANTIC COLORS
     ───────────────────────────────────────── */
  --color-success-light: #E8F5E9;
  --color-success-main: #2E7D32;
  --color-success-dark: #1B5E20;
  
  --color-warning-light: #FFF3E0;
  --color-warning-main: #F57C00;
  --color-warning-dark: #E65100;
  
  --color-error-light: #FFEBEE;
  --color-error-main: #C62828;
  --color-error-dark: #B71C1C;
  
  --color-info-light: #E3F2FD;
  --color-info-main: #0288D1;
  --color-info-dark: #01579B;
  
  /* ─────────────────────────────────────────
     NEUTRAL COLORS
     ───────────────────────────────────────── */
  --color-neutral-0: #FFFFFF;
  --color-neutral-50: #F8FAFC;
  --color-neutral-100: #F1F5F9;
  --color-neutral-200: #E2E8F0;
  --color-neutral-300: #CBD5E1;
  --color-neutral-400: #94A3B8;
  --color-neutral-500: #64748B;
  --color-neutral-600: #475569;
  --color-neutral-700: #334155;
  --color-neutral-800: #1E293B;
  --color-neutral-900: #0F172A;
  --color-neutral-950: #020617;
  
  /* ─────────────────────────────────────────
     SURFACE COLORS (Light Theme)
     ───────────────────────────────────────── */
  --color-background: #F8FAFC;
  --color-surface: #FFFFFF;
  --color-surface-elevated: #FFFFFF;
  --color-surface-overlay: rgba(0, 0, 0, 0.5);
  
  /* ─────────────────────────────────────────
     TEXT COLORS (Light Theme)
     ───────────────────────────────────────── */
  --color-text-primary: #1E293B;
  --color-text-secondary: #64748B;
  --color-text-disabled: #94A3B8;
  --color-text-inverse: #FFFFFF;
  --color-text-link: #1E3A5F;
  --color-text-link-hover: #0A1628;
  
  /* ─────────────────────────────────────────
     BORDER COLORS
     ───────────────────────────────────────── */
  --color-border-light: #E2E8F0;
  --color-border-default: #CBD5E1;
  --color-border-dark: #94A3B8;
  --color-border-focus: #1E3A5F;
  
  /* ─────────────────────────────────────────
     SHADOW COLORS
     ───────────────────────────────────────── */
  --shadow-color: 220 3% 15%;
  --shadow-strength: 1%;
}

/* ─────────────────────────────────────────
   DARK THEME OVERRIDES
   ───────────────────────────────────────── */
[data-theme="dark"],
.v-theme--dark {
  --color-background: #0F172A;
  --color-surface: #1E293B;
  --color-surface-elevated: #334155;
  --color-surface-overlay: rgba(0, 0, 0, 0.7);
  
  --color-text-primary: #F1F5F9;
  --color-text-secondary: #94A3B8;
  --color-text-disabled: #64748B;
  --color-text-inverse: #0F172A;
  --color-text-link: #7986CB;
  --color-text-link-hover: #9FA8DA;
  
  --color-border-light: #334155;
  --color-border-default: #475569;
  --color-border-dark: #64748B;
  --color-border-focus: #5C6BC0;
  
  --shadow-color: 220 40% 2%;
  --shadow-strength: 25%;
  
  /* Adjusted semantic colors for dark mode */
  --color-success-light: #1B5E20;
  --color-warning-light: #E65100;
  --color-error-light: #B71C1C;
  --color-info-light: #01579B;
}
```

### Vuetify Theme Configuration

Update [`src/main.js`](src/main.js:19) with the new theme:

```javascript
const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        dark: false,
        colors: {
          primary: '#1E3A5F',
          'primary-darken-1': '#152B4A',
          'primary-darken-2': '#0A1628',
          'primary-lighten-1': '#2A4A73',
          'primary-lighten-2': '#3D5F8A',
          secondary: '#64748B',
          accent: '#C9A227',
          'accent-darken-1': '#A67F24',
          warning: '#F57C00',
          success: '#2E7D32',
          error: '#C62828',
          info: '#0288D1',
          background: '#F8FAFC',
          surface: '#FFFFFF',
          'on-primary': '#FFFFFF',
          'on-secondary': '#FFFFFF',
          'on-accent': '#0A1628',
          'on-background': '#1E293B',
          'on-surface': '#1E293B'
        }
      },
      dark: {
        dark: true,
        colors: {
          primary: '#5C6BC0',
          'primary-darken-1': '#3949AB',
          'primary-darken-2': '#1A237E',
          'primary-lighten-1': '#7986CB',
          'primary-lighten-2': '#9FA8DA',
          secondary: '#94A3B8',
          accent: '#FFD54F',
          'accent-darken-1': '#FFCA28',
          warning: '#FF9800',
          success: '#4CAF50',
          error: '#F44336',
          info: '#03A9F4',
          background: '#0F172A',
          surface: '#1E293B',
          'on-primary': '#FFFFFF',
          'on-secondary': '#0F172A',
          'on-accent': '#0A1628',
          'on-background': '#F1F5F9',
          'on-surface': '#F1F5F9'
        }
      }
    }
  }
})
```

---

## Typography System

### Font Imports

Add to [`index.html`](index.html) or create a fonts CSS file:

```html
<!-- Google Fonts - Add to index.html <head> -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
```

### Typography CSS Variables

```css
/* ===========================================
   TYPOGRAPHY SYSTEM
   =========================================== */

:root {
  /* ─────────────────────────────────────────
     FONT FAMILIES
     ───────────────────────────────────────── */
  --font-family-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  --font-family-mono: 'JetBrains Mono', 'Fira Code', 'Consolas', 'Monaco', monospace;
  
  /* ─────────────────────────────────────────
     FONT SIZES (using rem for accessibility)
     ───────────────────────────────────────── */
  --font-size-xs: 0.75rem;     /* 12px */
  --font-size-sm: 0.875rem;    /* 14px */
  --font-size-base: 1rem;      /* 16px */
  --font-size-lg: 1.125rem;    /* 18px */
  --font-size-xl: 1.25rem;     /* 20px */
  --font-size-2xl: 1.5rem;     /* 24px */
  --font-size-3xl: 1.875rem;   /* 30px */
  --font-size-4xl: 2.25rem;    /* 36px */
  --font-size-5xl: 3rem;       /* 48px */
  
  /* ─────────────────────────────────────────
     FONT WEIGHTS
     ───────────────────────────────────────── */
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
  
  /* ─────────────────────────────────────────
     LINE HEIGHTS
     ───────────────────────────────────────── */
  --line-height-tight: 1.25;
  --line-height-snug: 1.375;
  --line-height-normal: 1.5;
  --line-height-relaxed: 1.625;
  --line-height-loose: 2;
  
  /* ─────────────────────────────────────────
     LETTER SPACING
     ───────────────────────────────────────── */
  --letter-spacing-tighter: -0.05em;
  --letter-spacing-tight: -0.025em;
  --letter-spacing-normal: 0;
  --letter-spacing-wide: 0.025em;
  --letter-spacing-wider: 0.05em;
  --letter-spacing-widest: 0.1em;
}

/* ─────────────────────────────────────────
   TYPOGRAPHY UTILITY CLASSES
   ───────────────────────────────────────── */

/* Display Headings */
.text-display-1 {
  font-family: var(--font-family-sans);
  font-size: var(--font-size-5xl);
  font-weight: var(--font-weight-bold);
  line-height: var(--line-height-tight);
  letter-spacing: var(--letter-spacing-tight);
}

.text-display-2 {
  font-family: var(--font-family-sans);
  font-size: var(--font-size-4xl);
  font-weight: var(--font-weight-bold);
  line-height: var(--line-height-tight);
  letter-spacing: var(--letter-spacing-tight);
}

/* Headings */
.text-h1 {
  font-family: var(--font-family-sans);
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-semibold);
  line-height: var(--line-height-tight);
}

.text-h2 {
  font-family: var(--font-family-sans);
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-semibold);
  line-height: var(--line-height-snug);
}

.text-h3 {
  font-family: var(--font-family-sans);
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-semibold);
  line-height: var(--line-height-snug);
}

.text-h4 {
  font-family: var(--font-family-sans);
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  line-height: var(--line-height-normal);
}

/* Body Text */
.text-body-lg {
  font-family: var(--font-family-sans);
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-normal);
  line-height: var(--line-height-relaxed);
}

.text-body {
  font-family: var(--font-family-sans);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-normal);
  line-height: var(--line-height-normal);
}

.text-body-sm {
  font-family: var(--font-family-sans);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-normal);
  line-height: var(--line-height-normal);
}

/* Labels and Captions */
.text-label {
  font-family: var(--font-family-sans);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  line-height: var(--line-height-normal);
  letter-spacing: var(--letter-spacing-wide);
  text-transform: uppercase;
}

.text-caption {
  font-family: var(--font-family-sans);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-normal);
  line-height: var(--line-height-normal);
}

/* Code/Monospace */
.text-code {
  font-family: var(--font-family-mono);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-normal);
  line-height: var(--line-height-normal);
}
```

---

## Spacing System

### Spacing Scale

Based on a 4px base unit for consistency:

```css
/* ===========================================
   SPACING SYSTEM
   =========================================== */

:root {
  /* ─────────────────────────────────────────
     SPACING SCALE (4px base)
     ───────────────────────────────────────── */
  --space-0: 0;
  --space-px: 1px;
  --space-0-5: 0.125rem;   /* 2px */
  --space-1: 0.25rem;      /* 4px */
  --space-1-5: 0.375rem;   /* 6px */
  --space-2: 0.5rem;       /* 8px */
  --space-2-5: 0.625rem;   /* 10px */
  --space-3: 0.75rem;      /* 12px */
  --space-3-5: 0.875rem;   /* 14px */
  --space-4: 1rem;         /* 16px */
  --space-5: 1.25rem;      /* 20px */
  --space-6: 1.5rem;       /* 24px */
  --space-7: 1.75rem;      /* 28px */
  --space-8: 2rem;         /* 32px */
  --space-9: 2.25rem;      /* 36px */
  --space-10: 2.5rem;      /* 40px */
  --space-11: 2.75rem;     /* 44px */
  --space-12: 3rem;        /* 48px */
  --space-14: 3.5rem;      /* 56px */
  --space-16: 4rem;        /* 64px */
  --space-20: 5rem;        /* 80px */
  --space-24: 6rem;        /* 96px */
  --space-28: 7rem;        /* 112px */
  --space-32: 8rem;        /* 128px */
  
  /* ─────────────────────────────────────────
     COMPONENT-SPECIFIC SPACING
     ───────────────────────────────────────── */
  --spacing-card-padding: var(--space-6);
  --spacing-card-gap: var(--space-4);
  --spacing-section-padding: var(--space-12);
  --spacing-section-gap: var(--space-8);
  --spacing-input-padding-x: var(--space-4);
  --spacing-input-padding-y: var(--space-3);
  --spacing-button-padding-x: var(--space-6);
  --spacing-button-padding-y: var(--space-3);
  --spacing-nav-item-padding: var(--space-3) var(--space-4);
  
  /* ─────────────────────────────────────────
     LAYOUT WIDTHS
     ───────────────────────────────────────── */
  --width-container-sm: 640px;
  --width-container-md: 768px;
  --width-container-lg: 1024px;
  --width-container-xl: 1280px;
  --width-container-2xl: 1536px;
  --width-sidebar: 280px;
  --width-sidebar-collapsed: 64px;
}
```

---

## Component Styles

### Border Radius

```css
/* ===========================================
   BORDER RADIUS
   =========================================== */

:root {
  --radius-none: 0;
  --radius-sm: 0.25rem;    /* 4px */
  --radius-default: 0.5rem; /* 8px */
  --radius-md: 0.625rem;   /* 10px */
  --radius-lg: 0.75rem;    /* 12px */
  --radius-xl: 1rem;       /* 16px */
  --radius-2xl: 1.5rem;    /* 24px */
  --radius-full: 9999px;
}
```

### Shadows

```css
/* ===========================================
   SHADOW SYSTEM
   =========================================== */

:root {
  --shadow-xs: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-sm: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  --shadow-default: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --shadow-md: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
  --shadow-xl: 0 25px 50px -12px rgb(0 0 0 / 0.25);
  --shadow-inner: inset 0 2px 4px 0 rgb(0 0 0 / 0.05);
  
  /* Colored shadows for accent elements */
  --shadow-primary: 0 4px 14px 0 rgba(30, 58, 95, 0.25);
  --shadow-accent: 0 4px 14px 0 rgba(201, 162, 39, 0.25);
}
```

### Transitions

```css
/* ===========================================
   TRANSITIONS
   =========================================== */

:root {
  --transition-fast: 150ms ease;
  --transition-default: 200ms ease;
  --transition-slow: 300ms ease;
  --transition-slower: 500ms ease;
  
  /* Specific transitions */
  --transition-colors: color var(--transition-fast), background-color var(--transition-fast), border-color var(--transition-fast);
  --transition-transform: transform var(--transition-default);
  --transition-shadow: box-shadow var(--transition-default);
  --transition-opacity: opacity var(--transition-default);
}
```

### Button Styles

```css
/* ===========================================
   BUTTON COMPONENTS
   =========================================== */

/* Base Button Reset */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  padding: var(--spacing-button-padding-y) var(--spacing-button-padding-x);
  font-family: var(--font-family-sans);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  line-height: var(--line-height-normal);
  text-decoration: none;
  border: 1px solid transparent;
  border-radius: var(--radius-default);
  cursor: pointer;
  transition: var(--transition-colors), var(--transition-shadow);
  outline: none;
}

.btn:focus-visible {
  outline: 2px solid var(--color-border-focus);
  outline-offset: 2px;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Primary Button */
.btn-primary {
  background-color: var(--color-primary-500);
  color: var(--color-text-inverse);
  border-color: var(--color-primary-500);
}

.btn-primary:hover:not(:disabled) {
  background-color: var(--color-primary-600);
  border-color: var(--color-primary-600);
  box-shadow: var(--shadow-primary);
}

.btn-primary:active:not(:disabled) {
  background-color: var(--color-primary-700);
  border-color: var(--color-primary-700);
}

/* Accent Button */
.btn-accent {
  background-color: var(--color-accent-500);
  color: var(--color-primary-900);
  border-color: var(--color-accent-500);
}

.btn-accent:hover:not(:disabled) {
  background-color: var(--color-accent-400);
  border-color: var(--color-accent-400);
  box-shadow: var(--shadow-accent);
}

.btn-accent:active:not(:disabled) {
  background-color: var(--color-accent-600);
  border-color: var(--color-accent-600);
}

/* Outlined Button */
.btn-outlined {
  background-color: transparent;
  color: var(--color-primary-500);
  border-color: var(--color-primary-500);
}

.btn-outlined:hover:not(:disabled) {
  background-color: var(--color-primary-50);
}

.btn-outlined:active:not(:disabled) {
  background-color: var(--color-primary-100);
}

/* Ghost Button */
.btn-ghost {
  background-color: transparent;
  color: var(--color-text-primary);
  border-color: transparent;
}

.btn-ghost:hover:not(:disabled) {
  background-color: var(--color-neutral-100);
}

.btn-ghost:active:not(:disabled) {
  background-color: var(--color-neutral-200);
}

/* Button Sizes */
.btn-sm {
  padding: var(--space-2) var(--space-3);
  font-size: var(--font-size-xs);
}

.btn-lg {
  padding: var(--space-4) var(--space-8);
  font-size: var(--font-size-base);
}
```

### Card Styles

```css
/* ===========================================
   CARD COMPONENTS
   =========================================== */

.card {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  overflow: hidden;
  transition: var(--transition-shadow), var(--transition-transform);
}

.card-elevated {
  box-shadow: var(--shadow-default);
}

.card-interactive {
  cursor: pointer;
}

.card-interactive:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}

.card-interactive:active {
  transform: translateY(0);
}

.card-header {
  padding: var(--spacing-card-padding);
  border-bottom: 1px solid var(--color-border-light);
}

.card-header-primary {
  background: linear-gradient(135deg, var(--color-primary-500) 0%, var(--color-primary-600) 100%);
  color: var(--color-text-inverse);
}

.card-body {
  padding: var(--spacing-card-padding);
}

.card-footer {
  padding: var(--spacing-card-padding);
  border-top: 1px solid var(--color-border-light);
  background-color: var(--color-neutral-50);
}

/* Card with accent border */
.card-accent {
  border-left: 4px solid var(--color-accent-500);
}

/* Card status variants */
.card-success {
  border-left: 4px solid var(--color-success-main);
}

.card-warning {
  border-left: 4px solid var(--color-warning-main);
}

.card-error {
  border-left: 4px solid var(--color-error-main);
}
```

### Input Styles

```css
/* ===========================================
   INPUT COMPONENTS
   =========================================== */

.input-wrapper {
  display: flex;
  flex-direction: column;
  gap: var(--space-1-5);
}

.input-label {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-primary);
}

.input-label-required::after {
  content: ' *';
  color: var(--color-error-main);
}

.input {
  width: 100%;
  padding: var(--spacing-input-padding-y) var(--spacing-input-padding-x);
  font-family: var(--font-family-sans);
  font-size: var(--font-size-base);
  line-height: var(--line-height-normal);
  color: var(--color-text-primary);
  background-color: var(--color-surface);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-default);
  transition: var(--transition-colors);
  outline: none;
}

.input::placeholder {
  color: var(--color-text-disabled);
}

.input:hover:not(:disabled):not(:focus) {
  border-color: var(--color-border-dark);
}

.input:focus {
  border-color: var(--color-border-focus);
  box-shadow: 0 0 0 3px rgba(30, 58, 95, 0.1);
}

.input:disabled {
  background-color: var(--color-neutral-100);
  color: var(--color-text-disabled);
  cursor: not-allowed;
}

/* Input States */
.input-error {
  border-color: var(--color-error-main);
}

.input-error:focus {
  box-shadow: 0 0 0 3px rgba(198, 40, 40, 0.1);
}

.input-success {
  border-color: var(--color-success-main);
}

/* Input Helper Text */
.input-helper {
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
}

.input-error-text {
  font-size: var(--font-size-xs);
  color: var(--color-error-main);
}

/* Input with Icon */
.input-with-icon {
  position: relative;
}

.input-with-icon .input {
  padding-left: var(--space-10);
}

.input-icon {
  position: absolute;
  left: var(--space-3);
  top: 50%;
  transform: translateY(-50%);
  color: var(--color-text-secondary);
  pointer-events: none;
}
```

### Table Styles

```css
/* ===========================================
   TABLE COMPONENTS
   =========================================== */

.table-wrapper {
  overflow-x: auto;
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-lg);
}

.table {
  width: 100%;
  border-collapse: collapse;
  font-size: var(--font-size-sm);
}

.table th,
.table td {
  padding: var(--space-3) var(--space-4);
  text-align: left;
  border-bottom: 1px solid var(--color-border-light);
}

.table th {
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  background-color: var(--color-neutral-50);
  white-space: nowrap;
}

.table tbody tr:hover {
  background-color: var(--color-neutral-50);
}

.table tbody tr:last-child td {
  border-bottom: none;
}

/* Striped Table */
.table-striped tbody tr:nth-child(even) {
  background-color: var(--color-neutral-50);
}

/* Compact Table */
.table-compact th,
.table-compact td {
  padding: var(--space-2) var(--space-3);
}

/* Table with Status Column */
.table-status-cell {
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

.status-indicator {
  width: 8px;
  height: 8px;
  border-radius: var(--radius-full);
}

.status-indicator-active {
  background-color: var(--color-success-main);
}

.status-indicator-inactive {
  background-color: var(--color-neutral-400);
}

.status-indicator-warning {
  background-color: var(--color-warning-main);
}

.status-indicator-error {
  background-color: var(--color-error-main);
}
```

### Navigation Styles

```css
/* ===========================================
   NAVIGATION COMPONENTS
   =========================================== */

/* App Header */
.app-header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: linear-gradient(135deg, var(--color-primary-500) 0%, var(--color-primary-600) 100%);
  box-shadow: var(--shadow-sm);
}

.app-header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-3) var(--space-6);
  max-width: var(--width-container-xl);
  margin: 0 auto;
}

.app-logo {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  color: var(--color-text-inverse);
  text-decoration: none;
  font-weight: var(--font-weight-bold);
  font-size: var(--font-size-lg);
}

/* Navigation Links */
.nav-links {
  display: flex;
  align-items: center;
  gap: var(--space-1);
}

.nav-link {
  padding: var(--spacing-nav-item-padding);
  color: rgba(255, 255, 255, 0.85);
  text-decoration: none;
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  border-radius: var(--radius-default);
  transition: var(--transition-colors);
}

.nav-link:hover {
  color: var(--color-text-inverse);
  background-color: rgba(255, 255, 255, 0.1);
}

.nav-link-active {
  color: var(--color-text-inverse);
  background-color: rgba(255, 255, 255, 0.15);
}

/* Search Bar in Header */
.header-search {
  flex: 1;
  max-width: 400px;
  margin: 0 var(--space-6);
}

.header-search .input {
  background-color: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.2);
  color: var(--color-text-inverse);
}

.header-search .input::placeholder {
  color: rgba(255, 255, 255, 0.6);
}

.header-search .input:focus {
  background-color: rgba(255, 255, 255, 0.15);
  border-color: rgba(255, 255, 255, 0.4);
}

/* Mobile Navigation */
@media (max-width: 768px) {
  .nav-links {
    display: none;
  }
  
  .mobile-menu-toggle {
    display: flex;
  }
}

/* Footer */
.app-footer {
  background-color: var(--color-neutral-900);
  color: var(--color-neutral-300);
  padding: var(--space-12) var(--space-6);
}

.app-footer a {
  color: var(--color-neutral-300);
  text-decoration: none;
  transition: var(--transition-colors);
}

.app-footer a:hover {
  color: var(--color-text-inverse);
}
```

### Hero Section Styles

```css
/* ===========================================
   HERO SECTION
   =========================================== */

.hero {
  padding: var(--space-20) var(--space-6);
  background: linear-gradient(180deg, var(--color-neutral-50) 0%, var(--color-surface) 100%);
  text-align: center;
}

.hero-title {
  font-size: var(--font-size-4xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  margin-bottom: var(--space-4);
  line-height: var(--line-height-tight);
}

@media (min-width: 768px) {
  .hero-title {
    font-size: var(--font-size-5xl);
  }
}

.hero-subtitle {
  font-size: var(--font-size-lg);
  color: var(--color-text-secondary);
  max-width: 600px;
  margin: 0 auto var(--space-8);
  line-height: var(--line-height-relaxed);
}

.hero-actions {
  display: flex;
  justify-content: center;
  gap: var(--space-4);
  flex-wrap: wrap;
}

/* Hero with gradient background */
.hero-gradient {
  background: linear-gradient(135deg, var(--color-primary-500) 0%, var(--color-primary-700) 100%);
  color: var(--color-text-inverse);
}

.hero-gradient .hero-title {
  color: var(--color-text-inverse);
}

.hero-gradient .hero-subtitle {
  color: rgba(255, 255, 255, 0.85);
}
```

---

## CSS Architecture

### File Organization

```
src/
├── assets/
│   └── styles/
│       ├── main.css              # Main entry point, imports all others
│       ├── variables/
│       │   ├── _colors.css       # Color system variables
│       │   ├── _typography.css   # Typography variables
│       │   ├── _spacing.css      # Spacing scale
│       │   └── _index.css        # Variables barrel file
│       ├── base/
│       │   ├── _reset.css        # CSS reset/normalize
│       │   ├── _global.css       # Global element styles
│       │   └── _index.css        # Base barrel file
│       ├── components/
│       │   ├── _buttons.css      # Button styles
│       │   ├── _cards.css        # Card styles
│       │   ├── _inputs.css       # Form input styles
│       │   ├── _tables.css       # Table styles
│       │   ├── _navigation.css   # Nav/header/footer styles
│       │   └── _index.css        # Components barrel file
│       ├── layouts/
│       │   ├── _hero.css         # Hero section styles
│       │   ├── _sections.css     # Section layouts
│       │   └── _index.css        # Layouts barrel file
│       └── utilities/
│           ├── _helpers.css      # Utility classes
│           └── _index.css        # Utilities barrel file
```

### Main CSS Entry Point

```css
/* src/assets/styles/main.css */

/* Variables */
@import './variables/_index.css';

/* Base styles */
@import './base/_index.css';

/* Component styles */
@import './components/_index.css';

/* Layout styles */
@import './layouts/_index.css';

/* Utility classes */
@import './utilities/_index.css';
```

### Integration with Vuetify

The custom CSS system works alongside Vuetify. Key integration points:

1. **CSS Variables** - Define custom properties that can override Vuetify defaults
2. **Vuetify Theme** - Configure colors in [`main.js`](src/main.js:19) for Vuetify components
3. **Scoped Styles** - Component-specific styles remain in `.vue` files
4. **Global Overrides** - Use `main.css` for global Vuetify overrides

```css
/* Global Vuetify Overrides in main.css */

/* Override Vuetify card styles */
.v-card {
  border-radius: var(--radius-lg) !important;
  box-shadow: var(--shadow-sm) !important;
}

.v-card:hover {
  box-shadow: var(--shadow-default) !important;
}

/* Override Vuetify button styles */
.v-btn {
  text-transform: none !important;
  font-weight: var(--font-weight-medium) !important;
  letter-spacing: normal !important;
}

/* Override Vuetify input styles */
.v-field {
  border-radius: var(--radius-default) !important;
}

/* Override Vuetify app bar */
.v-app-bar {
  background: linear-gradient(135deg, var(--color-primary-500) 0%, var(--color-primary-600) 100%) !important;
}
```

---

## File Structure

### Files to Create

| File Path | Purpose |
|-----------|---------|
| `src/assets/styles/main.css` | Main CSS entry point |
| `src/assets/styles/variables/_colors.css` | Color system |
| `src/assets/styles/variables/_typography.css` | Typography system |
| `src/assets/styles/variables/_spacing.css` | Spacing scale |
| `src/assets/styles/variables/_index.css` | Variables barrel |
| `src/assets/styles/base/_reset.css` | CSS reset |
| `src/assets/styles/base/_global.css` | Global styles |
| `src/assets/styles/base/_index.css` | Base barrel |
| `src/assets/styles/components/_buttons.css` | Button styles |
| `src/assets/styles/components/_cards.css` | Card styles |
| `src/assets/styles/components/_inputs.css` | Input styles |
| `src/assets/styles/components/_tables.css` | Table styles |
| `src/assets/styles/components/_navigation.css` | Navigation styles |
| `src/assets/styles/components/_index.css` | Components barrel |
| `src/assets/styles/layouts/_hero.css` | Hero section |
| `src/assets/styles/layouts/_sections.css` | Section layouts |
| `src/assets/styles/layouts/_index.css` | Layouts barrel |
| `src/assets/styles/utilities/_helpers.css` | Utility classes |
| `src/assets/styles/utilities/_index.css` | Utilities barrel |

### Files to Modify

| File Path | Changes |
|-----------|---------|
| [`index.html`](index.html) | Add Google Fonts link |
| [`src/main.js`](src/main.js) | Update Vuetify theme, import main.css |
| [`src/App.vue`](src/App.vue) | Remove inline styles, use CSS classes |
| [`src/components/common/AppHeader.vue`](src/components/common/AppHeader.vue) | Apply new navigation styles |
| [`src/components/common/AppFooter.vue`](src/components/common/AppFooter.vue) | Apply new footer styles |
| [`src/views/HomeView.vue`](src/views/HomeView.vue) | Apply new hero and section styles |

---

## Implementation Order

### Phase 1: Foundation Setup

1. **Create CSS directory structure**
   - Create all directories under `src/assets/styles/`
   - Create barrel files (`_index.css`) for each directory

2. **Implement CSS variables**
   - Create `_colors.css` with complete color system
   - Create `_typography.css` with font variables
   - Create `_spacing.css` with spacing scale

3. **Update index.html**
   - Add Google Fonts preconnect and link tags

4. **Update main.js**
   - Import `main.css`
   - Update Vuetify theme configuration

### Phase 2: Base Styles

5. **Create base styles**
   - Implement `_reset.css` with CSS reset
   - Implement `_global.css` with element defaults

6. **Create main.css**
   - Import all CSS modules in correct order
   - Add Vuetify global overrides

### Phase 3: Component Styles

7. **Implement component styles**
   - Create `_buttons.css`
   - Create `_cards.css`
   - Create `_inputs.css`
   - Create `_tables.css`
   - Create `_navigation.css`

### Phase 4: Layout Styles

8. **Implement layout styles**
   - Create `_hero.css`
   - Create `_sections.css`

9. **Create utility classes**
   - Implement `_helpers.css` with common utilities

### Phase 5: Component Updates

10. **Update AppHeader.vue**
    - Apply new navigation styles
    - Update gradient and colors

11. **Update AppFooter.vue**
    - Apply new footer styles
    - Update colors and spacing

12. **Update HomeView.vue**
    - Apply new hero section styles
    - Update feature cards
    - Apply section styles

13. **Update App.vue**
    - Remove inline styles
    - Apply global classes

### Phase 6: Tool Components

14. **Update tool components**
    - Apply card styles to MilStd202Tool.vue
    - Apply card styles to SpecSupersedingTool.vue
    - Update table styles in tool views

### Phase 7: Testing and Refinement

15. **Test dark mode**
    - Verify all components work in dark mode
    - Adjust contrast ratios as needed

16. **Test responsive design**
    - Verify mobile layouts
    - Test tablet breakpoints

17. **Accessibility audit**
    - Check color contrast ratios
    - Verify focus states
    - Test keyboard navigation

---

## Summary

This implementation specification provides a complete design system for the Military Specifications Hub website. The hybrid approach combines:

- **Modern SaaS aesthetics** from TechSpec Modern for familiarity
- **Professional typography** from Clean Authority for credibility
- **Military-inspired accents** from Command Center for context
- **Accessibility compliance** from Federal Standard for inclusivity

Key implementation highlights:

- **CSS Custom Properties** for easy theming and dark mode
- **Modular CSS architecture** for maintainability
- **Vuetify integration** preserving existing component functionality
- **Phased implementation** for manageable rollout

The design maintains the existing Vue.js/Vuetify architecture while introducing a cohesive visual system that positions mil-specs.com as a professional, authoritative resource for military specifications.

---

*Document created: January 2026*
*Version: 1.0*
