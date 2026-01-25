# Tools Expansion Plan: MIL-STD-202 & Spec Superseding Lookup

This document outlines the technical specifications and implementation plan for adding two new tools to the `mil-specs.com` application: the **MIL-STD-202 Viewer** and the **Spec Superseding Lookup**.

## 1. Overview

The goal is to integrate two new utilities into the existing Tools section (`/tools`). The application uses Vue 3 with Vuetify 3 for UI components and a plugin-based architecture for registering tools.

## 2. Data Structures

### 2.1. MIL-STD-202 Data
We will store the MIL-STD-202 data in a structured JSON format to allow for easy searching and rendering.

**File Location:** `public/data/mil-std-202/methods.json`

**Structure:**
```json
{
  "title": "MIL-STD-202",
  "description": "Test Method Standard: Electronic and Electrical Component Parts",
  "methods": [
    {
      "id": "101",
      "title": "Salt Atmosphere (Corrosion)",
      "purpose": "To determine the resistance of component parts to corrosion...",
      "conditions": [
        {
          "name": "Test Condition A",
          "description": "Salt solution concentration 5%",
          "duration": "96 hours"
        },
        {
          "name": "Test Condition B",
          "description": "Salt solution concentration 20%",
          "duration": "48 hours"
        }
      ],
      "requirements": [
        "Visual inspection after test",
        "No evidence of corrosion"
      ]
    }
    // ... more methods
  ]
}
```

### 2.2. Spec Superseding Lookup Data
This tool will rely on a lookup table mapping original specifications to their superseding counterparts.

**File Location:** `public/data/specs/superseding.json`

**Structure:**
```json
[
  {
    "original": "MIL-STD-123",
    "status": "Superseded",
    "replacement": "MIL-STD-456",
    "date": "2023-01-01",
    "notes": "Replaced due to updated requirements."
  },
  {
    "original": "MIL-SPEC-XYZ",
    "status": "Active",
    "replacement": null,
    "date": null,
    "notes": "Still in force."
  }
]
```
*Note: The actual data will be derived from user-provided text.*

## 3. Component Design

### 3.1. MIL-STD-202 Viewer (`src/views/tools/MilStd202View.vue`)

**Features:**
*   **Search/Filter:** Text input to filter methods by ID or Title.
*   **Method List:** A scrollable list or data table displaying available methods.
*   **Detail View:** A modal or expandable panel showing the full details (Purpose, Conditions, Requirements) of a selected method.

**UI Components (Vuetify):**
*   `v-text-field` for search.
*   `v-data-table` or `v-list` for the method list.
*   `v-card` for method details.
*   `v-dialog` (optional) for viewing details without navigating away.

### 3.2. Spec Superseding Lookup (`src/views/tools/SupersedingLookupView.vue`)

**Features:**
*   **Lookup Input:** A search box where the user types a spec number (e.g., "MIL-STD-123").
*   **Result Display:** clearly shows the status (Active/Superseded).
    *   If Superseded: Show the replacement spec and a link (if available).
    *   If Active: Confirm it is still valid.
    *   If Unknown: Indicate that the spec is not in the database.

**UI Components (Vuetify):**
*   `v-autocomplete` or `v-text-field` for input.
*   `v-alert` for status display (Green for Active, Orange for Superseded, Grey for Unknown).
*   `v-card` to contain the tool.

## 4. Integration Plan

### 4.1. Routing
We will add new routes to `src/router/index.js` under the `/tools` children.

```javascript
// src/router/index.js

// ... inside tools children
{
  path: 'mil-std-202',
  name: 'mil-std-202-tool',
  component: () => import('@/views/tools/MilStd202View.vue'),
  meta: { 
    title: 'MIL-STD-202 Viewer',
    description: 'Test Method Standard for Electronic Parts'
  }
},
{
  path: 'superseding-lookup',
  name: 'superseding-lookup',
  component: () => import('@/views/tools/SupersedingLookupView.vue'),
  meta: { 
    title: 'Spec Superseding Lookup',
    description: 'Check if a specification has been superseded'
  }
}
```

### 4.2. Registry (Optional but Recommended)
If the project uses `src/plugins/specs/registry.js` to populate the sidebar, we should ensure these new routes are registered there or that the sidebar logic in `src/views/tools/index.vue` picks them up from the router configuration.

*Current observation:* `src/views/tools/index.vue` uses `specRegistry.getAllRoutes()` but filters for `/tools/`. If we add them to the router directly, we might need to also add them to the registry or update the sidebar logic to include static routes defined in `router/index.js`.

**Strategy:** We will register them via the `specRegistry` to maintain consistency with the existing architecture.

## 5. Implementation Steps

1.  **Create Data Files:**
    *   Create `public/data/mil-std-202/methods.json` (placeholder content initially).
    *   Create `public/data/specs/superseding.json` (placeholder content initially).

2.  **Create Views:**
    *   Create `src/views/tools/MilStd202View.vue`.
    *   Create `src/views/tools/SupersedingLookupView.vue`.

3.  **Register Tools:**
    *   Update `src/plugins/specs/registry.js` (or create a new plugin file for these tools) to register them so they appear in the sidebar.
    *   Alternatively, add them directly to `src/router/index.js` and ensure the sidebar sees them.

4.  **Testing:**
    *   Verify navigation from the Tools sidebar.
    *   Verify data loading and display.
    *   Verify search functionality.

## 6. Questions for User
*   Do you have the raw text/data for MIL-STD-202 and the Superseding list ready to be converted to JSON?
*   Are there any specific visual requirements for how the "Superseded" status should be displayed (e.g., specific colors or icons)?
