# Responsive UI Update Plan

## Objective
Improve the application's responsiveness on mobile devices and update the landing page to reflect the current feature set (Tools Hub, DD2326, MilSpec).

## 1. Responsive Design Strategy

### Breakpoints
We will utilize Vuetify's standard breakpoint system:
- **xs**: < 600px (Mobile)
- **sm**: 600px > < 960px (Tablet)
- **md**: 960px > < 1280px (Desktop)
- **lg**: 1280px > < 1920px (Large Desktop)

### Component-Specific Strategies

#### AppHeader.vue
- **Current State**: Search bar has fixed width (`max-width: 400px`) and is always visible. Title hides on small screens.
- **Target State**:
  - **Mobile (xs)**: 
    - Hide the full search text field.
    - Show a "Search" icon button.
    - Clicking the icon toggles a full-width search bar or an overlay.
    - Ensure the "Menu" hamburger button remains accessible.
  - **Tablet/Desktop (sm+)**: Keep the current layout but ensure the search bar doesn't crowd the navigation links.

#### AppFooter.vue
- **Current State**: Stacks on mobile, but padding might be excessive.
- **Target State**:
  - **Mobile**: 
    - Reduce vertical padding (`py-6` instead of default).
    - Center all text.
    - Stack links vertically or in a tight grid to save space.
  - **Desktop**: Maintain the 3-column layout (Info, Links, Copyright).

#### AppNavigation.vue
- **Current State**: Temporary drawer.
- **Target State**: 
  - Ensure the drawer width is appropriate for mobile (max 80-90% of screen width or fixed 300px).
  - Verify all new routes (Tools, Specs) are present and correctly grouped.

## 2. HomeView.vue Updates

The current `HomeView.vue` contains generic placeholder content. We will update it to highlight the actual implemented features.

### Hero Section
- **Headline**: "Military Specification Tools & Compliance Hub"
- **Subheadline**: "Streamline your defense packaging workflow. Generate DD Form 2326, decode MIL-STD-2073 codes, and access critical specifications."
- **CTAs**:
  - Primary: "Open Tools Hub" -> `/tools`
  - Secondary: "Browse Specs" -> `/specs`

### Features Section
Replace generic features with:
1.  **DD Form 2326 Generator**
    - Icon: `mdi-file-document-edit`
    - Desc: "Create compliant preservation and packing data forms with real-time validation and PDF export."
2.  **MIL-STD-2073 Decoder**
    - Icon: `mdi-barcode-scan`
    - Desc: "Instantly decode military packaging codes to understand preservation, packing, and marking requirements."
3.  **Specification Library**
    - Icon: `mdi-library-shelves`
    - Desc: "Searchable access to MIL-STD-202, MIL-STD-2073, and other critical defense standards."

### Quick Links
Update the grid to point to active tools:
- **Generate Form**: `/tools/dd2326/generator`
- **Decode Data**: `/tools/dd2326/decoder`
- **MIL-STD-2073**: `/specs/mil-std-2073`
- **Tools Hub**: `/tools`

## 3. Implementation Steps

1.  **Update `AppHeader.vue`**:
    - Add state for `showMobileSearch`.
    - Use `v-if` or CSS classes to toggle between the text field and the icon button based on `display` breakpoints.
2.  **Update `AppFooter.vue`**:
    - Adjust classes for padding and alignment.
3.  **Update `HomeView.vue`**:
    - Rewrite the template text.
    - Update the `features`, `stats`, and `quickLinks` data arrays.
4.  **Verify `AppNavigation.vue`**:
    - Ensure the menu structure matches the `ToolsHub` and `HomeView` links.

## 4. Verification
- Use browser dev tools to simulate mobile devices (iPhone SE, Pixel, iPad).
- Verify no horizontal scrolling occurs on mobile.
- Verify touch targets (buttons/links) are large enough (min 44px height).
