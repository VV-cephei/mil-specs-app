# Die Attach Page Implementation Plan

This document outlines the plan for implementing the new "Die Attach" resource page, following the architecture of the existing Wire Bonding and SMT Manufacturing pages.

## 1. Content Strategy & Data Structure

The content from `die-attach/die-attach-info.txt` will be structured into JSON files located in `public/data/die-attach/`.

### Data Files (`public/data/die-attach/`)

| JSON File | Content Source (Section in txt) | Description |
| :--- | :--- | :--- |
| `rf-performance.json` | 2. Critical RF Performance Variables | Inductance, Thermal Flux, BLT details. |
| `materials.json` | 3. Material Science | Comparison table (AuSn vs Ag Sintering vs Epoxy), Deep dive on Ag Sintering. |
| `specifications.json` | 4. Authoritative Specifications | Voiding criteria (MIL-STD-883), Mechanical Strength, Environmental. |
| `process-techniques.json` | 5. Process Techniques & Equipment | Eutectic Scrubbing, Vacuum Reflow, BLT Control. |
| `failure-modes.json` | 6. Common Failure Modes | Resin Bleed, Die Tilt, Epoxy Climb, Delamination. |
| `glossary.json` | Derived from text | Key terms like "Eutectic", "Sintering", "BLT", "Scrubbing". |

### Content Mapping

-   **Executive Summary**: Implemented as the **Hero Section** and **Intro Section** text (hardcoded or in a simple `overview.json`).
-   **Summary of Recommendations**: Implemented as a **"Best Practices"** or **"Conclusion"** section at the end.

## 2. Asset Management

Images will be moved from `die-attach/` to `public/images/die-attach/` and renamed for consistency (kebab-case).

| Source Image | Target Path (`public/images/die-attach/`) | Usage |
| :--- | :--- | :--- |
| `die-attach-background-image.jpg` | `background.jpg` | Hero Section Background |
| `die-attach-machine-inprocess.png` | `process-overview.png` | Intro / Process Section |
| `die-attach-diagram.png` | `process-diagram.png` | Process Techniques |
| `Silver-Sintering-Die-Attach.png` | `ag-sintering.png` | Material Science |
| `Epoxy-Die-attach.png` | `epoxy-dispensing.png` | Material Science |
| `die-attach-void-failure.jpg` | `failure-voiding.jpg` | Failure Modes / Specs |
| `die-attach-lifting-failure.png` | `failure-lifting.png` | Failure Modes |
| `die-attach-cracking-failure.jpg` | `failure-cracking.jpg` | Failure Modes |
| `die-attach-soft-solder-view.png` | `soft-solder-view.png` | RF Performance |
| `die-attach-solder-short-failure.png` | `failure-short.png` | Failure Modes |
| `die-attach-die-placement-failure.png` | `failure-placement.png` | Failure Modes |

## 3. Component Architecture

We will create a new view and a set of sub-components in `src/components/info/die-attach/`.

### View Component
-   **File**: `src/views/info/DieAttachView.vue`
-   **Responsibility**: Orchestrates data loading (using composable), manages state (loading/error), and renders the page layout with navigation.

### Sub-Components (`src/components/info/die-attach/`)

1.  **`DAHeroSection.vue`**: Title, subtitle, background image.
2.  **`DATableOfContents.vue`**: Navigation sidebar/menu.
3.  **`DARFPerformanceSection.vue`**: Covers Inductance, Thermal Flux, BLT (Section 2).
4.  **`DAMaterialsSection.vue`**: Comparison table and Ag Sintering deep dive (Section 3).
5.  **`DASpecificationsSection.vue`**: MIL-STD-883 criteria, Voiding, Shear Strength (Section 4).
6.  **`DAProcessTechniquesSection.vue`**: Scrubbing, Vacuum Reflow, BLT Control (Section 5).
7.  **`DAFailureModesSection.vue`**: Common failures table and images (Section 6).
8.  **`DASummarySection.vue`**: Recommendations and conclusion (Section 7).

### Composable
-   **File**: `src/composables/useDieAttachData.js`
-   **Responsibility**: Fetches JSON data, manages caching and loading states. Patterned after `useWireBondingData.js`.

## 4. Routing & Navigation

### Router Configuration
-   **File**: `src/router/index.js`
-   **Action**: Add new route definition.
    ```javascript
    {
      path: '/resources/die-attach',
      name: 'die-attach',
      component: () => import('@/views/info/DieAttachView.vue'),
      meta: {
        title: 'Die Attach Technology Guide - mil-specs.com',
        description: 'Comprehensive guide to RF die attach, materials, and process control.'
      }
    }
    ```

### Main Navigation
-   **File**: `src/components/common/AppHeader.vue`
-   **Action**: Add "Die Attach" link to the "Resources" dropdown menu.

### Home Page
-   **File**: `src/views/HomeView.vue`
-   **Action**: Add a new card to the "Technical Resources" section.
    -   **Icon**: Create a new `DieAttachIcon` component (e.g., representing a chip being placed).
    -   **Title**: "Die Attach Technology"
    -   **Description**: "Guide to RF die attach, sintering vs. eutectic, and voiding criteria."

## 5. Step-by-Step Implementation Guide

### Phase 1: Assets & Data
1.  Create directory `public/images/die-attach/`.
2.  Copy and rename selected images.
3.  Create directory `public/data/die-attach/`.
4.  Extract content from `die-attach-info.txt` and create JSON files (`rf-performance.json`, `materials.json`, etc.).

### Phase 2: Logic & State
5.  Create `src/composables/useDieAttachData.js`.
    -   Implement `fetchJson`, `loadData`, and reactive state refs.

### Phase 3: Components
6.  Create directory `src/components/info/die-attach/`.
7.  Create sub-components (`DAHeroSection.vue`, `DAMaterialsSection.vue`, etc.).
    -   Use `src/components/info/wire-bonding/` components as templates for styling and structure.

### Phase 4: View & Integration
8.  Create `src/views/info/DieAttachView.vue`.
    -   Import composable and sub-components.
    -   Implement scroll spy and smooth scrolling.
9.  Update `src/router/index.js` with the new route.
10. Update `src/components/common/AppHeader.vue` with the new menu item.
11. Update `src/views/HomeView.vue` with the new resource card.

### Phase 5: Verification
12. Verify data loading.
13. Check responsive layout.
14. Verify navigation links.
