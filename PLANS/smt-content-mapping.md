# SMT Content Integration Plan

This plan outlines the steps to integrate the SMT manufacturing content from `smt-manufacturing/` into the application.

## 1. Data Mapping

The following new JSON files need to be created in `public/data/smt/` to cover the missing process steps found in `smt-process.txt`.

### A. `pick-and-place.json` (New)
**Source:** `smt-process.txt` (Section 5: Step 3: Pick and Place)
**Content Structure:**
```json
{
  "title": "Pick and Place",
  "description": "The speed step...",
  "mechanism": {
    "headTypes": [
      { "name": "Turret", "description": "Chip Shooters, fast, rotational" },
      { "name": "Gantry", "description": "Modular, slower, high precision" }
    ],
    "visionSystem": "Cameras look at bottom of part..."
  },
  "nozzles": [
    { "name": "Vacuum Nozzles", "description": "Standard" },
    { "name": "Gripper Nozzles", "description": "Mechanical fingers..." }
  ],
  "trenchInsight": "Nozzles are colour-coded. If nozzle tip is worn...",
  "fiducials": {
    "description": "Copper markers on PCB...",
    "types": ["Global Fiducials", "Local Fiducials"]
  }
}
```

### B. `spi.json` (New)
**Source:** `smt-process.txt` (Section 4: Step 2: Solder Paste Inspection)
**Content Structure:**
```json
{
  "title": "Solder Paste Inspection (SPI)",
  "standard": "IPC-7527",
  "technology": "3D SPI uses Moiré interferometry...",
  "keyMetrics": [
    { "name": "Volume", "target": "100%", "limits": "±50%" },
    { "name": "Height", "description": "Critical for Coplanarity..." },
    { "name": "Bridge Detection", "description": "Detects wet paste bridging..." }
  ]
}
```

### C. `inspection.json` (New)
**Source:** `smt-process.txt` (Section 7: Final Inspection & Criteria) + `smt-materials-info.txt` (AOI/AXI definitions if any)
**Content Structure:**
```json
{
  "title": "Final Inspection",
  "standards": ["IPC-A-610", "J-STD-001"],
  "methods": [
    { "id": "aoi", "name": "Automated Optical Inspection (AOI)", "description": "Camera-based..." },
    { "id": "axi", "name": "Automated X-ray Inspection (AXI)", "description": "X-ray for hidden joints..." }
  ],
  "classifications": [
    { "class": "Class 1", "name": "Consumer", "description": "Toys, cheap electronics..." },
    { "class": "Class 2", "name": "Dedicated Service", "description": "Laptops, microwaves..." },
    { "class": "Class 3", "name": "High Reliability", "description": "Aerospace, Medical, Military..." }
  ]
}
```

### D. Existing JSON Updates
- **`reflow-profiles.json`**: Ensure it covers the "Physics" and "Danger" points from `smt-process.txt` (Section 6).
- **`defects.json`**: Ensure all defects from `smt-process.txt` (Tombstoning, HiP, Graping, Voiding) are present with their "Root Cause" and "Fixes".

## 2. Image Mapping

Move and rename the following images from `smt-manufacturing/` to `public/images/smt/`.

| Source Filename | Target Filename | Description |
|-----------------|-----------------|-------------|
| `1-s2.0-S2307187724000348-gr6.jpg` | `inspection-qualified-vs-unqualified.jpg` | Qualified vs Unqualified products |
| `1578020115162.jpeg` | `stencil-step-up-down.jpg` | Step Up/Down Stencil Process |
| `6389312018872496077087203.jpg` | `aoi-inspection-screen.jpg` | AOI Machine Screen |
| `component-placement-process-2_orig.jpg` | `pick-and-place-head.jpg` | Pick and Place Head |
| `csm_StencilLaser_babccb9fa8.jpg` | `stencil-laser-cut.jpg` | Laser Cutting Stencil |
| `ideal_and_actual_solder_reflow_profiles.png` | `reflow-profile-comparison.png` | Ideal vs Actual Profile |
| `mc889-background.jpg` | `smt-background-hero.jpg` | Hero Background |
| `smt-reflow-profile.png` | `reflow-profile-zones.png` | Reflow Profile Zones |
| `sold-solder-joint-defect.jpeg` | `defect-cold-joint-example.jpg` | Cold Solder Joint Example |

**Note:** Verify if `public/images/smt/` already contains duplicates. If so, skip or overwrite based on quality.

## 3. Component Updates

### A. New Components
Create the following Vue components in `src/components/info/smt/`:

1.  **`SMTPickAndPlaceSection.vue`**
    *   Displays data from `pick-and-place.json`.
    *   Includes `pick-and-place-motion.gif` (already in public) and `pick-and-place-head.jpg`.

2.  **`SMTSPISection.vue`**
    *   Displays data from `spi.json`.
    *   Can be placed after `SMTSolderPasteSection` or integrated into it.

3.  **`SMTInspectionSection.vue`**
    *   Displays data from `inspection.json`.
    *   Includes `aoi-inspection-screen.jpg` and `inspection-qualified-vs-unqualified.jpg`.

### B. Updated Components
1.  **`src/views/info/SMTManufacturingView.vue`**
    *   Import and register the new components.
    *   Add them to the template in the correct process order:
        1.  Materials
        2.  Solder Paste
        3.  Stencil Design
        4.  **SPI (New)**
        5.  **Pick and Place (New)**
        6.  Reflow
        7.  **Inspection (New)**
        8.  Defects
        9.  Tools
        10. Standards
        11. Glossary
    *   Update `sections` array for Table of Contents navigation.

2.  **`src/composables/useSMTData.js`**
    *   Add `pickAndPlace`, `spi`, and `inspection` to `DATA_FILES`.
    *   Add state refs and fetch logic for the new files.
    *   Expose the new data in the return object.

3.  **`SMTStencilSection.vue`**
    *   Add the `stencil-step-up-down.jpg` image to the Stencil Types or Design Rules section if applicable.

## 4. Execution Order
1.  **Move Images**: Execute the image moves/renames.
2.  **Create JSONs**: Create the new JSON files with content extracted from text files.
3.  **Update Composable**: Update `useSMTData.js` to load new data.
4.  **Create Components**: Create the new Vue components.
5.  **Update View**: Integrate components into `SMTManufacturingView.vue`.
