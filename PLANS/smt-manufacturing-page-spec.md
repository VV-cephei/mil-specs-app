# SMT Manufacturing Page - Comprehensive Specification

## Document Information
- **Version:** 1.0
- **Created:** 2026-02-02
- **Purpose:** Complete specification for building an interactive SMT Manufacturing page with DFM guidance

---

## Table of Contents
1. [Executive Summary](#1-executive-summary)
2. [Page Architecture](#2-page-architecture)
3. [Content Sections](#3-content-sections)
4. [Data Structure Specifications](#4-data-structure-specifications)
5. [Component Architecture](#5-component-architecture)
6. [Interactive Tools](#6-interactive-tools)
7. [Image Mapping](#7-image-mapping)
8. [Implementation Phases](#8-implementation-phases)

---

## 1. Executive Summary

### 1.1 Project Overview
Create a comprehensive, user-friendly SMT (Surface Mount Technology) Manufacturing page that provides design for manufacturing (DFM) guidance for both design engineers and manufacturing engineers. The page will follow the established patterns from the Wire Bonding page while incorporating SMT-specific content and interactive tools.

### 1.2 Target Audience
- **Design Engineers:** Need DFM guidelines, pad design rules, component spacing, stencil aperture calculations
- **Manufacturing Engineers:** Need process parameters, defect troubleshooting, quality inspection criteria
- **Quality Engineers:** Need IPC standards references, acceptance criteria, inspection guidelines

### 1.3 Key Features
- Comprehensive SMT process documentation
- Interactive calculators for stencil design and reflow profiles
- Defect troubleshooting guide with visual references
- IPC standards integration
- Material selection wizards
- DFM checklists

### 1.4 The 60-30-10 Rule
A fundamental principle that guides the page organization:
- **60%** of defects originate from **Stencil Printing**
- **30%** of defects originate from **Reflow Soldering**
- **10%** of defects originate from **Component Placement**

---

## 2. Page Architecture

### 2.1 Navigation Structure

```
SMT Manufacturing
├── Overview
│   ├── What is SMT?
│   ├── SMT vs Through-Hole
│   ├── The 60-30-10 Rule
│   └── Industry Standards
├── Materials
│   ├── PCB Substrates
│   ├── Surface Finishes
│   ├── Solder Alloys
│   └── Solder Paste
├── Process
│   ├── Stencil Printing
│   ├── Solder Paste Inspection
│   ├── Pick and Place
│   ├── Reflow Soldering
│   └── Post-Reflow Inspection
├── Quality & Standards
│   ├── IPC-A-610 Classes
│   ├── J-STD-001 Requirements
│   ├── Visual Inspection
│   └── AOI/X-Ray Inspection
├── Defects & Troubleshooting
│   ├── Printing Defects
│   ├── Placement Defects
│   ├── Reflow Defects
│   └── Root Cause Analysis
├── DFM Guidelines
│   ├── Pad Design
│   ├── Component Spacing
│   ├── Thermal Design
│   └── Panelization
├── Tools
│   ├── Stencil Calculator
│   ├── Reflow Profile Builder
│   ├── Defect Troubleshooter
│   └── DFM Checklist
└── Glossary
```

### 2.2 Page Layout

```
┌─────────────────────────────────────────────────────────────┐
│                      HEADER / NAV                           │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│                    HERO SECTION                             │
│   SMT Manufacturing Guide                                   │
│   [Stats Cards: Process Steps | Defect Types | Standards]   │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   ┌─────────────┐  ┌─────────────────────────────────────┐ │
│   │             │  │                                     │ │
│   │   STICKY    │  │         CONTENT AREA                │ │
│   │   TABLE OF  │  │                                     │ │
│   │   CONTENTS  │  │   [Section Components]              │ │
│   │             │  │                                     │ │
│   │   - Overview│  │                                     │ │
│   │   - Materials│ │                                     │ │
│   │   - Process │  │                                     │ │
│   │   - Quality │  │                                     │ │
│   │   - Defects │  │                                     │ │
│   │   - DFM     │  │                                     │ │
│   │   - Tools   │  │                                     │ │
│   │             │  │                                     │ │
│   └─────────────┘  └─────────────────────────────────────┘ │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                      FOOTER                                 │
└─────────────────────────────────────────────────────────────┘
```

### 2.3 URL Structure
- Main page: `/smt-manufacturing`
- Deep links: `/smt-manufacturing#section-id`

---

## 3. Content Sections

### 3.1 Overview Section

#### 3.1.1 What is SMT?
**Content:**
- Definition of Surface Mount Technology
- Historical context and evolution from through-hole
- Key advantages: smaller size, higher density, automated assembly, lower cost
- Process flow diagram showing complete SMT line

**Visual Elements:**
- Process flow diagram: `smt-assembly-process.jpeg`
- SMT line overview: `smt_process_line.png`

#### 3.1.2 SMT vs Through-Hole Comparison

| Aspect | SMT | Through-Hole |
|--------|-----|--------------|
| Component Size | Smaller (0201, 01005) | Larger |
| Assembly | Automated | Manual/Semi-auto |
| Board Density | Higher | Lower |
| Mechanical Strength | Lower | Higher |
| Rework | More difficult | Easier |
| Cost | Lower at volume | Higher |
| Double-sided | Easy | Difficult |

**Visual Elements:**
- Comparison diagram: `single-and-double-sided-smt.jpg`

#### 3.1.3 The 60-30-10 Rule
**Content:**
- 60% of defects from stencil printing
- 30% of defects from reflow soldering
- 10% of defects from component placement
- Implications for process control focus
- SPI importance for catching defects early

#### 3.1.4 Industry Standards Overview
**Standards to Reference:**
- **IPC-A-610:** Acceptability of Electronic Assemblies
- **J-STD-001:** Requirements for Soldered Electrical and Electronic Assemblies
- **IPC-7525/7526/7527:** Stencil Design Guidelines
- **IPC-7095:** Design and Assembly Process Implementation for BGAs
- **IPC-9701:** Performance Test Methods and Qualification Requirements

---

### 3.2 Materials Section

#### 3.2.1 PCB Substrate Materials

##### FR-4 (Standard)
- **Tg:** 130-140°C
- **Dk:** ~4.5 @ 1MHz
- **Df:** ~0.02
- **CTE (Z):** 60-70 ppm/°C
- **Applications:** General electronics, consumer products
- **Limitations:** Not suitable for high-frequency or high-temperature

##### FR-4 High-Tg
- **Tg:** 170-180°C
- **Applications:** Lead-free assembly, automotive, industrial
- **Benefits:** Better thermal stability during reflow

##### High-Frequency/RF Laminates
**PTFE-Based (Rogers, Taconic):**
- **Dk:** 2.2-10.2 (selectable)
- **Df:** 0.001-0.003
- **Applications:** RF/Microwave, 5G, radar
- **Considerations:** Special processing required, higher cost

##### Flexible & Rigid-Flex
**Polyimide (Kapton):**
- **Tg:** >250°C
- **Applications:** Flex circuits, wearables, aerospace
- **Benefits:** Excellent thermal stability, flexibility

**PET (Polyester):**
- **Applications:** Low-cost flex, single-use electronics
- **Limitations:** Lower temperature tolerance

##### High Power/Thermal Management
**Metal Core PCB (MCPCB):**
- **Core Materials:** Aluminum, Copper
- **Thermal Conductivity:** 1-8 W/mK
- **Applications:** LED lighting, power electronics

**Ceramic Substrates:**
- **Materials:** Alumina (Al₂O₃), AlN, BeO
- **Thermal Conductivity:** 20-270 W/mK
- **Applications:** High-power, RF, harsh environments

##### Material Selection Criteria Table

| Property | Symbol | FR-4 | High-Tg FR-4 | Rogers | Polyimide | MCPCB |
|----------|--------|------|--------------|--------|-----------|-------|
| Glass Transition | Tg | 130-140°C | 170-180°C | N/A | >250°C | N/A |
| Dielectric Constant | Dk | 4.5 | 4.5 | 2.2-10.2 | 3.4 | 4.5 |
| Dissipation Factor | Df | 0.02 | 0.02 | 0.001 | 0.003 | 0.02 |
| CTE (Z-axis) | CTE | 60-70 | 50-60 | 24-46 | 20-30 | 17-25 |
| Thermal Conductivity | k | 0.3 | 0.3 | 0.2-0.4 | 0.2 | 1-8 |

#### 3.2.2 Surface Finishes

##### HASL (Hot Air Solder Leveling)
- **Composition:** Sn63/Pb37 or Lead-free (SAC)
- **Thickness:** 1-40 μm
- **Shelf Life:** 12+ months
- **Pros:** Low cost, excellent solderability, multiple reflow capable
- **Cons:** Uneven surface, not suitable for fine-pitch
- **Applications:** General purpose, through-hole heavy designs

##### ENIG (Electroless Nickel Immersion Gold)
- **Composition:** 3-6 μm Ni + 0.05-0.1 μm Au
- **Shelf Life:** 12+ months
- **Pros:** Flat surface, excellent for fine-pitch, wire bondable
- **Cons:** Higher cost, black pad risk, gold embrittlement potential
- **Applications:** Fine-pitch, BGA, wire bonding, high-reliability

##### OSP (Organic Solderability Preservative)
- **Composition:** Organic coating (benzimidazole)
- **Thickness:** 0.2-0.5 μm
- **Shelf Life:** 6 months
- **Pros:** Flat surface, low cost, lead-free compatible
- **Cons:** Short shelf life, sensitive to handling, limited reflow cycles
- **Applications:** High-volume consumer electronics

##### Immersion Silver (ImAg)
- **Composition:** 0.1-0.4 μm Ag
- **Shelf Life:** 6-12 months
- **Pros:** Flat surface, good solderability, cost-effective
- **Cons:** Tarnish sensitive, requires careful handling
- **Applications:** Membrane switches, EMI shielding

##### Immersion Tin (ImSn)
- **Composition:** 0.8-1.2 μm Sn
- **Shelf Life:** 6 months
- **Pros:** Flat surface, press-fit compatible
- **Cons:** Tin whisker risk, limited shelf life
- **Applications:** Press-fit connectors, backplanes

##### ENEPIG (Electroless Nickel Electroless Palladium Immersion Gold)
- **Composition:** 3-6 μm Ni + 0.05-0.1 μm Pd + 0.03-0.05 μm Au
- **Shelf Life:** 12+ months
- **Pros:** No black pad, wire bondable, excellent solderability
- **Cons:** Highest cost
- **Applications:** Mixed technology (SMT + wire bonding), high-reliability

##### Surface Finish Selection Guide

| Finish | Fine Pitch | Wire Bond | Shelf Life | Cost | Reflow Cycles |
|--------|------------|-----------|------------|------|---------------|
| HASL | Poor | No | Excellent | Low | Multiple |
| ENIG | Excellent | Yes | Excellent | High | Multiple |
| OSP | Good | No | Limited | Low | 2-3 |
| ImAg | Good | No | Good | Medium | 2-3 |
| ImSn | Good | No | Limited | Medium | 2-3 |
| ENEPIG | Excellent | Yes | Excellent | Highest | Multiple |

#### 3.2.3 Solder Alloys

##### Lead-Based Alloys (Legacy/Exempt Applications)

**Sn63/Pb37 (Eutectic)**
- **Melting Point:** 183°C (eutectic - no pasty range)
- **Applications:** Aerospace, military, medical (RoHS exempt)
- **Properties:** Excellent wetting, self-alignment, easy rework

**Sn60/Pb40**
- **Melting Range:** 183-188°C
- **Applications:** General purpose legacy
- **Properties:** Slightly wider pasty range than eutectic

**Sn10/Pb90 (High-Lead)**
- **Melting Range:** 268-302°C
- **Applications:** Die attach, high-temperature
- **Properties:** High melting point, used in hierarchical soldering

##### Lead-Free SAC Family

**SAC305 (Sn96.5/Ag3.0/Cu0.5)**
- **Melting Range:** 217-220°C
- **Applications:** Most common lead-free alloy
- **Properties:** Good reliability, wide process window
- **Pasty Range:** ~3°C (helps reduce tombstoning)

**SAC105 (Sn98.5/Ag1.0/Cu0.5)**
- **Melting Range:** 217-227°C
- **Applications:** Cost-sensitive, drop-shock sensitive
- **Properties:** Better drop shock than SAC305, lower cost

**SAC405 (Sn95.5/Ag4.0/Cu0.5)**
- **Melting Range:** 217-220°C
- **Applications:** High-reliability
- **Properties:** Higher strength than SAC305

##### High-Reliability Alloys

**Innolot (SAC + Bi, Sb, Ni)**
- **Composition:** Sn/Ag3.8/Cu0.7/Bi3.0/Sb1.4/Ni0.15
- **Melting Range:** 206-218°C
- **Applications:** Automotive, aerospace, harsh environments
- **Properties:** Excellent thermal cycling, creep resistance

**SN100C (Sn/Cu0.7/Ni0.05+Ge)**
- **Melting Point:** 227°C
- **Applications:** Wave soldering, cost-sensitive
- **Properties:** Bright joints, good wetting

##### Low-Temperature Solders

**Sn42/Bi58**
- **Melting Point:** 138°C (eutectic)
- **Applications:** Temperature-sensitive components, rework
- **Properties:** Low melting, brittle, not for high-reliability

**Sn/Bi/Ag (Various)**
- **Melting Range:** 138-145°C
- **Applications:** Mixed alloy assemblies
- **Properties:** Improved ductility over Sn/Bi eutectic

##### Specialty/Exotic Alloys

**Au80/Sn20**
- **Melting Point:** 280°C
- **Applications:** Die attach, hermetic sealing, optoelectronics
- **Properties:** Fluxless soldering, excellent reliability

**Indium-Based (In/Sn, In/Pb)**
- **Melting Range:** 118-227°C (depending on composition)
- **Applications:** Cryogenic, thermal interface, die attach
- **Properties:** Soft, excellent thermal fatigue resistance

##### Solder Alloy Selection Matrix

| Alloy | Melting Point | Reliability | Cost | RoHS | Primary Use |
|-------|---------------|-------------|------|------|-------------|
| Sn63/Pb37 | 183°C | Excellent | Low | No | Aerospace/Military |
| SAC305 | 217-220°C | Good | Medium | Yes | General Lead-Free |
| SAC105 | 217-227°C | Good | Low | Yes | Consumer Electronics |
| Innolot | 206-218°C | Excellent | High | Yes | Automotive/Harsh |
| Sn42/Bi58 | 138°C | Poor | Medium | Yes | Low-Temp Assembly |
| Au80/Sn20 | 280°C | Excellent | Very High | Yes | Die Attach/Hermetic |

#### 3.2.4 Solder Paste

##### Composition
- **Metal Powder:** 85-92% by weight (typically 50% by volume)
- **Flux Vehicle:** 8-15% by weight
  - Rosin/Resin
  - Activators
  - Solvents
  - Thixotropic agents
  - Surfactants

##### Powder Types (IPC J-STD-005)

| Type | Particle Size Range | Typical Use |
|------|---------------------|-------------|
| Type 1 | 75-150 μm | Obsolete |
| Type 2 | 45-75 μm | Large apertures |
| Type 3 | 25-45 μm | Standard SMT (0.5mm pitch+) |
| Type 4 | 20-38 μm | Fine pitch (0.4mm) |
| Type 5 | 15-25 μm | Ultra-fine pitch (0.3mm) |
| Type 6 | 5-15 μm | Micro-BGA, 01005 |

##### Flux Classifications (J-STD-004)

| Classification | Activity | Residue | Cleaning |
|----------------|----------|---------|----------|
| ROL0 | Low | Rosin | Optional |
| ROL1 | Medium | Rosin | Optional |
| REM0 | Low | Resin | Optional |
| REM1 | Medium | Resin | Optional |
| REL0 | Low | Resin | No-Clean |
| REL1 | Medium | Resin | No-Clean |
| ORH0 | Low | Organic | Required |
| ORH1 | High | Organic | Required |

##### Rheology (Thixotropic Behavior)
- **At Rest:** High viscosity, paste holds shape
- **Under Shear:** Viscosity decreases, paste flows
- **Recovery:** Returns to high viscosity after shear removed
- **Importance:** Critical for stencil printing and slump resistance

##### Storage and Handling
- **Refrigerated Storage:** 0-10°C (32-50°F)
- **Shelf Life:** 6-12 months (refrigerated)
- **Warm-up Time:** 4-8 hours to room temperature before use
- **Stencil Life:** 8-24 hours (paste-dependent)
- **Working Life:** 24-72 hours on stencil
- **Never:** Mix old and new paste, return used paste to jar

---

### 3.3 Process Section

#### 3.3.1 Stencil Printing

##### Stencil Types

**Laser-Cut Stainless Steel**
- **Thickness:** 0.08-0.20 mm (3-8 mil)
- **Aperture Tolerance:** ±0.005 mm
- **Surface:** Electropolished or nanocoated
- **Applications:** Standard SMT, fine-pitch

**Electroformed Nickel**
- **Thickness:** 0.05-0.15 mm (2-6 mil)
- **Aperture Tolerance:** ±0.003 mm
- **Surface:** Inherently smooth
- **Applications:** Ultra-fine pitch, 01005, micro-BGA

**Visual Elements:**
- Stencil types: `smt-stencils.jpg`
- Framed vs frameless: `Framed-and-Frameless-SMT-Stencil.jpg`
- Laser cutting: `csm_StencilLaser_babccb9fa8.jpg`
- Stencil machine: `smt-stencil-machine-production.jpg`

##### Aperture Design Rules

**Area Ratio (AR) - For Circular/Square Apertures**
```
AR = Aperture Area / Sidewall Area
AR = D / (4 × t)

Where:
D = Aperture diameter or side length
t = Stencil thickness

Rule: AR > 0.66 for good release
```

**Aspect Ratio - For Rectangular Apertures**
```
Aspect Ratio = W / t

Where:
W = Aperture width (smallest dimension)
t = Stencil thickness

Rule: Aspect Ratio > 1.5 for good release
```

**Five-Ball Rule (Rectangular Apertures)**
- Aperture width ≥ 5 × largest powder diameter
- For Type 3 (45 μm max): Width ≥ 225 μm (9 mil)
- For Type 4 (38 μm max): Width ≥ 190 μm (7.5 mil)

**Eight-Ball Rule (Circular/Square Apertures)**
- Aperture diameter ≥ 8 × largest powder diameter
- For Type 3 (45 μm max): Diameter ≥ 360 μm (14 mil)
- For Type 4 (38 μm max): Diameter ≥ 304 μm (12 mil)

##### Print Parameters

| Parameter | Typical Range | Effect |
|-----------|---------------|--------|
| Squeegee Speed | 25-200 mm/s | Slower = better fill, slower throughput |
| Squeegee Pressure | 0.3-0.5 kg/cm | Too high = scooping, too low = skipping |
| Squeegee Angle | 45-60° | Affects paste roll and fill |
| Separation Speed | 0.5-3 mm/s | Slower = better release |
| Separation Distance | 2-3 mm | Allows clean break |
| Print Gap | 0 (contact) | Zero gap for best gasketing |

##### Transfer Efficiency
- **Definition:** Volume deposited / Aperture volume × 100%
- **Target:** 80-120% (ideal = 100%)
- **Acceptable Range:** 50-150%
- **Fine-Feature Range:** 40-140%

##### Common Printing Defects

| Defect | Cause | Solution |
|--------|-------|----------|
| Insufficient paste | Low AR, high speed, worn stencil | Reduce speed, check stencil |
| Bridging | Excessive paste, poor gasketing | Reduce aperture, check alignment |
| Scooping | Excessive pressure | Reduce squeegee pressure |
| Smearing | Paste on stencil bottom | Increase wipe frequency |
| Dog ears | Fast separation | Slow separation speed |

##### Stencil Cleaning
- **Frequency:** Every 5-10 prints (process dependent)
- **Methods:** Dry wipe, wet wipe, vacuum
- **Solvents:** IPA, specialized stencil cleaners
- **Underside Cleaning:** Critical for preventing smearing

#### 3.3.2 Solder Paste Inspection (SPI)

##### 3D SPI Technology
- **Measurement Method:** Laser triangulation, Moiré fringe, confocal
- **Resolution:** 10-20 μm (X/Y), 0.1-1 μm (Z)
- **Speed:** 20-60 cm²/s

##### Measured Parameters

| Parameter | Description | Typical Limits |
|-----------|-------------|----------------|
| Volume | Paste volume deposited | ±50% of nominal |
| Height | Peak height of deposit | ±50% of stencil thickness |
| Area | 2D coverage area | ±30% of aperture area |
| Offset X/Y | Position relative to pad | ±25% of pad dimension |
| Shape | Deposit shape quality | Pass/Fail |
| Bridge | Paste connecting pads | Detect/Alert |

##### SPI Acceptance Criteria
- **Volume:** 50-150% of aperture volume
- **Height:** 50-150% of stencil thickness
- **Area Coverage:** 70-130% of aperture area
- **Position Offset:** <25% of pad dimension

#### 3.3.3 Pick and Place

##### Machine Types

**Turret (Rotary Head)**
- **Speed:** 20,000-60,000 CPH
- **Accuracy:** ±50-100 μm
- **Best For:** High-volume, standard components
- **Limitations:** Limited component size range

**Gantry (Cartesian)**
- **Speed:** 5,000-30,000 CPH
- **Accuracy:** ±25-50 μm
- **Best For:** Mixed assembly, large components, fine-pitch
- **Advantages:** Flexible, high accuracy

**Visual Elements:**
- Pick and place motion: `pick-and-place-motion.gif`
- Component placement: `component-placement-process-2_orig.jpg`

##### Vision Systems
- **Fiducial Recognition:** Global and local fiducials
- **Component Inspection:** Lead coplanarity, presence, polarity
- **On-the-Fly:** Component inspection during transfer
- **Resolution:** 10-20 μm typical

##### Nozzle Selection
- **Material:** Ceramic, tungsten carbide, plastic
- **Types:** Standard, filter, custom
- **Selection Criteria:** Component size, weight, surface
- **Maintenance:** Regular cleaning, inspection for wear

##### Placement Parameters

| Parameter | Typical Value | Notes |
|-----------|---------------|-------|
| Placement Force | 1-10 N | Component dependent |
| Z-Height | 0.1-0.5 mm into paste | Critical for paste contact |
| Theta Accuracy | ±0.05° | Important for fine-pitch |
| Pick Delay | 20-50 ms | Vacuum stabilization |
| Place Delay | 10-30 ms | Paste adhesion |

##### Feeder Types
- **Tape & Reel:** Most common, 8-88 mm widths
- **Tray:** Matrix ICs, BGAs, odd-form
- **Tube/Stick:** Legacy, low-volume
- **Bulk:** High-volume passives

#### 3.3.4 Reflow Soldering

##### Oven Zones

**Zone 1-2: Preheat**
- **Purpose:** Gradual temperature rise, activate flux
- **Temperature:** 25°C → 150°C
- **Ramp Rate:** 1-3°C/second (max)
- **Duration:** 60-120 seconds

**Zone 3-4: Soak (Thermal Equilibration)**
- **Purpose:** Equalize temperature, flux activation
- **Temperature:** 150-200°C
- **Duration:** 60-120 seconds
- **Critical:** Minimize delta-T across board

**Zone 5-6: Reflow**
- **Purpose:** Melt solder, form joints
- **Peak Temperature:** 235-250°C (SAC alloys)
- **Time Above Liquidus (TAL):** 40-90 seconds
- **Critical:** Sufficient time for wetting, not too long

**Zone 7-8: Cooling**
- **Purpose:** Solidify joints, minimize stress
- **Cooling Rate:** 2-4°C/second (typical)
- **Maximum Rate:** 6°C/second
- **Critical:** Controlled cooling prevents thermal shock

##### Reflow Profile Parameters (SAC305)

| Parameter | Minimum | Typical | Maximum |
|-----------|---------|---------|---------|
| Preheat Ramp | 0.5°C/s | 1-2°C/s | 3°C/s |
| Soak Temp | 150°C | 150-200°C | 200°C |
| Soak Time | 60s | 60-120s | 120s |
| Peak Temp | 235°C | 240-245°C | 250°C |
| TAL (>217°C) | 40s | 60-90s | 120s |
| Cooling Rate | 2°C/s | 3-4°C/s | 6°C/s |

##### Profile Types

**Ramp-to-Peak (RTP/Linear)**
- Continuous temperature rise to peak
- Shorter overall time
- Better for graping prevention
- Recommended ramp: ~1°C/second

**Soak Profile**
- Extended time at 150-200°C
- Better for voiding reduction in BGAs
- Longer overall time
- Risk of increased oxidation

##### Nitrogen Atmosphere
- **Oxygen Level:** <1000 ppm (typical), <100 ppm (fine-pitch)
- **Benefits:** Reduced oxidation, better wetting, improved cosmetics
- **When Required:** Fine powder paste, PoP, ultra-fine pitch
- **Consideration:** Can exacerbate tombstoning

#### 3.3.5 Post-Reflow Inspection

##### Visual Inspection (IPC-A-610)
- **Class 1:** General electronics (least stringent)
- **Class 2:** Dedicated service electronics
- **Class 3:** High-reliability electronics (most stringent)

##### AOI (Automated Optical Inspection)
- **Technology:** 2D/3D cameras, structured light
- **Capabilities:** Component presence, polarity, solder joint quality
- **Limitations:** Cannot see under components (BGAs)

##### X-Ray Inspection
- **Technology:** 2D radiography, 3D CT
- **Capabilities:** BGA voids, hidden joints, internal defects
- **When Required:** BGAs, QFNs, any hidden joints

---

### 3.4 Quality & Standards Section

#### 3.4.1 IPC-A-610 Classifications

##### Class 1 - General Electronic Products
- Consumer electronics
- Some computer peripherals
- Cosmetic defects acceptable if function maintained

##### Class 2 - Dedicated Service Electronic Products
- Communications equipment
- Industrial controls
- Business machines
- Extended life, uninterrupted service expected

##### Class 3 - High-Performance Electronic Products
- Life support equipment
- Military/aerospace
- Critical systems
- Highest reliability required

#### 3.4.2 J-STD-001 Requirements

##### Solder Joint Acceptance Criteria
- **Wetting Angle:** <90° for acceptable wetting
- **Fillet Formation:** Concave fillet required
- **Coverage:** Minimum 75% of pad wetted
- **Surface:** Smooth, shiny (SnPb) or satin (Pb-free)

##### Workmanship Standards
- Cleanliness requirements
- Flux residue acceptance
- Marking and labeling
- ESD protection

#### 3.4.3 Acceptance Criteria by Component Type

##### Chip Components (0402, 0603, 0805, etc.)

| Criteria | Target | Acceptable | Defect |
|----------|--------|------------|--------|
| Side Overhang | 0% | <25% W | >50% W |
| End Overhang | 0% | <25% L | >50% L |
| Fillet Height | 100% H | >25% H | <25% H |
| Solder Thickness | 0.5-1.0 mm | >0.25 mm | <0.25 mm |

##### Gull-Wing Leads (QFP, SOIC)

| Criteria | Target | Acceptable | Defect |
|----------|--------|------------|--------|
| Toe Fillet | Present | Visible | None |
| Heel Fillet | Present | Visible | None |
| Side Fillet | 75% lead height | >50% | <50% |
| Solder Thickness | Visible | Thin acceptable | None |

##### BGA/CSP

| Criteria | Target | Acceptable | Defect |
|----------|--------|------------|--------|
| Voiding | <25% | <50% | >50% |
| Collapse | Uniform | ±20% variation | >30% variation |
| Bridging | None | None | Any |
| Missing Balls | None | None | Any |

---

### 3.5 Defects & Troubleshooting Section

#### 3.5.1 Printing Defects (60% of all defects)

##### Insufficient Solder
**Description:** Not enough solder paste deposited on pad
**Visual:** Thin, incomplete coverage

**Causes:**
- Low area ratio (<0.66)
- Excessive squeegee pressure (scooping)
- Worn or clogged stencil
- Paste viscosity too high
- Fast separation speed

**Solutions:**
- Increase aperture size or reduce stencil thickness
- Reduce squeegee pressure
- Clean or replace stencil
- Check paste viscosity, use fresh paste
- Slow separation speed

##### Bridging (Solder Shorts)
**Description:** Solder connecting adjacent pads
**Visual:** Continuous solder between pads

**Causes:**
- Excessive solder paste
- Poor gasketing
- Stencil misalignment
- Cold slump
- Reflow profile issues

**Solutions:**
- Reduce aperture size
- Check board support and stencil alignment
- Verify paste viscosity
- Optimize reflow profile

##### Scooping
**Description:** Paste removed from center of deposit
**Visual:** Concave or hollow deposit

**Causes:**
- Excessive squeegee pressure
- Squeegee angle too steep
- Worn squeegee blade

**Solutions:**
- Reduce squeegee pressure
- Adjust squeegee angle
- Replace squeegee blade

#### 3.5.2 Placement Defects (10% of all defects)

##### Component Misalignment
**Description:** Component not centered on pads
**Visual:** Offset from nominal position

**Causes:**
- Vision system calibration
- Nozzle wear or contamination
- Feeder issues
- Fiducial recognition problems

**Solutions:**
- Calibrate vision system
- Clean or replace nozzles
- Check feeder alignment
- Verify fiducial quality

##### Tombstoning (Manhattan Effect)
**Description:** Component stands on one end
**Visual:** Component vertical like a tombstone

**Visual Elements:**
- Component faults: `Component-faults.png`

**Causes:**
- Uneven solder paste volume
- Thermal imbalance during reflow
- Component misplacement
- Unequal pad sizes
- Unequal wetting forces

**Solutions:**
- Ensure consistent paste deposition (SPI)
- Use soak profile for thermal equilibration
- Verify placement accuracy
- Review pad design
- Consider home-plate aperture design

#### 3.5.3 Reflow Defects (30% of all defects)

##### Voiding
**Description:** Air pockets within solder joint
**Visual:** Dark spots on X-ray

**Visual Elements:**
- Solder defects: `Soldering-defects.png`
- Common defects: `solder-defects-common.png`

**Causes:**
- Trapped flux volatiles
- Reflow profile issues (too fast, too hot)
- Excessive solder paste
- Poor outgassing channels
- BTC/QFN design issues

**Solutions:**
- Optimize reflow profile (hot soak for BGAs)
- Use low-voiding solder paste
- Adjust stencil design (windowpane for BTCs)
- Consider vacuum reflow for critical applications

**Acceptance Criteria:**
- General: <50% void area, no single void >40%
- Thermal pads: <25% void area preferred
- Automotive: <10% void area may be required

##### Head-in-Pillow (HiP)
**Description:** BGA ball rests on paste without coalescence
**Visual:** Ball and paste dome visible but not merged

**Causes:**
- BGA warpage during reflow
- Oxidized BGA balls
- Insufficient paste volume
- Reflow profile issues
- Poor flux activity

**Solutions:**
- Work with BGA supplier on warpage
- Use HiP-resistant solder paste
- Optimize reflow profile (minimize TAL)
- Ensure adequate paste volume
- Consider nitrogen atmosphere

##### Graping
**Description:** Solder particles don't fully coalesce
**Visual:** Grainy, grape-like appearance

**Causes:**
- Oxidized solder particles
- Aggressive reflow profile
- Fine powder paste (Type 5, 6)
- Water-soluble flux (less oxidation barrier)
- Long time in oven

**Solutions:**
- Use fresh paste, proper storage
- Use ramp-to-peak profile
- Use coarser powder if possible
- Use no-clean flux chemistry
- Minimize total heat exposure

##### Cold Solder Joints
**Description:** Solder didn't fully reflow
**Visual:** Grainy, matte, rough surface

**Causes:**
- Inadequate peak temperature
- Insufficient TAL
- Expired or degraded paste
- Oxidized surfaces

**Solutions:**
- Increase peak temperature
- Extend TAL
- Use fresh paste
- Clean surfaces, use nitrogen

##### Solder Balling/Beading
**Description:** Small solder balls near joints
**Visual:** Spherical balls on board surface

**Causes:**
- Excessive paste under components
- Moisture in paste (spattering)
- Poor gasketing
- Fast preheat rate
- Stencil design issues

**Solutions:**
- Use home-plate aperture design
- Proper paste handling (warm-up time)
- Check stencil alignment
- Slow preheat ramp (<1.5°C/s)
- Reduce paste volume at component ends

##### Non-Wetting/Dewetting
**Description:** Solder fails to bond or pulls back
**Visual:** Exposed pad surface, irregular solder

**Visual Elements:**
- Open defects: `Open-type-defects.png`

**Causes:**
- Oxidized pads or leads
- Contaminated surfaces
- Insufficient flux activity
- Inappropriate reflow profile
- Expired components/boards

**Solutions:**
- Ensure fresh components and boards
- Clean surfaces
- Use more active flux
- Optimize reflow profile
- Check surface finish quality

#### 3.5.4 Defect Quick Reference Table

| Defect | Primary Cause | Key Solution | Detection |
|--------|---------------|--------------|-----------|
| Insufficient Solder | Low AR, scooping | Adjust stencil/pressure | SPI, Visual |
| Bridging | Excess paste, slump | Reduce aperture | SPI, AOI |
| Tombstoning | Uneven wetting | Soak profile, SPI | AOI, Visual |
| Voiding | Trapped volatiles | Profile optimization | X-Ray |
| HiP | BGA warpage | HiP-resistant paste | X-Ray |
| Graping | Oxidation | RTP profile, fresh paste | Visual, AOI |
| Cold Joint | Low temp/time | Increase peak/TAL | Visual, AOI |
| Solder Balls | Excess paste, moisture | Home-plate aperture | Visual, AOI |
| Non-Wet | Oxidation, contamination | Clean surfaces, flux | Visual, AOI |

**Visual Elements:**
- PCB level defects: `PCB-level-defects.png`
- Temperature faults: `Faults-due-to-inconsistent-temperature.png`
- Wiring errors: `Errors-in-the-wiring-Tracks.png`
- Corrosion: `Corrosion-defect.png`

---

### 3.6 DFM Guidelines Section

#### 3.6.1 Pad Design Guidelines

##### Chip Component Pads (0402, 0603, 0805)

| Component | Pad Length | Pad Width | Gap |
|-----------|------------|-----------|-----|
| 0201 | 0.25-0.30 mm | 0.25-0.30 mm | 0.15-0.20 mm |
| 0402 | 0.40-0.50 mm | 0.40-0.50 mm | 0.20-0.30 mm |
| 0603 | 0.60-0.80 mm | 0.60-0.80 mm | 0.30-0.50 mm |
| 0805 | 0.80-1.00 mm | 1.00-1.20 mm | 0.50-0.80 mm |

##### Fine-Pitch QFP/SOIC Pads
- **Pad Width:** 1.0-1.5× lead width
- **Pad Length:** Lead length + 0.5-1.0 mm
- **Pitch:** Match component pitch exactly

##### BGA Pads
- **Pad Diameter:** 80-100% of ball diameter
- **SMD vs NSMD:** NSMD preferred for fine-pitch
- **Via-in-Pad:** Filled and planarized if required

#### 3.6.2 Component Spacing Rules

##### Minimum Spacing Guidelines

| Component Type | Min Spacing (Class 2) | Min Spacing (Class 3) |
|----------------|----------------------|----------------------|
| Chip to Chip | 0.25 mm | 0.30 mm |
| Chip to IC | 0.30 mm | 0.40 mm |
| IC to IC | 0.50 mm | 0.75 mm |
| Component to Edge | 1.0 mm | 1.5 mm |
| Component to Via | 0.25 mm | 0.30 mm |

##### Thermal Considerations
- Keep similar thermal mass components together
- Avoid placing small components in shadow of large components
- Consider reflow direction for thermal balance

#### 3.6.3 Thermal Relief Design

##### Via-in-Pad Considerations
- **Filled Vias:** Required for BGA, QFN thermal pads
- **Fill Material:** Conductive or non-conductive epoxy
- **Planarization:** Required for stencil printing
- **Capping:** Optional copper cap over fill

##### Thermal Pad Design (QFN/BTC)
- **Segmented Pads:** Divide large pads for outgassing
- **Via Pattern:** Array of thermal vias
- **Solder Mask:** Define outgassing channels

#### 3.6.4 Fiducial Requirements

##### Global Fiducials
- **Quantity:** Minimum 2, preferably 3
- **Location:** Diagonal corners of board
- **Size:** 1.0-3.0 mm diameter
- **Clearance:** 3.0 mm minimum solder mask clearance

##### Local Fiducials
- **When Required:** Fine-pitch (<0.5 mm), BGA
- **Location:** Adjacent to component
- **Size:** 0.5-1.0 mm diameter

#### 3.6.5 Panelization Guidelines

##### Panel Design
- **Rail Width:** 5-10 mm
- **Tooling Holes:** 3 minimum, 3.0-4.0 mm diameter
- **Fiducials:** On rails, not individual boards
- **Breakaway:** V-score or tab routing

##### Depanelization Methods
- **V-Score:** Best for straight edges
- **Tab Routing:** For irregular shapes
- **Laser:** For sensitive assemblies

---

### 3.7 Material Interactions & Gotchas

#### 3.7.1 CTE Mismatch Issues
- **Problem:** Different expansion rates cause stress
- **Critical Pairs:** Ceramic BGA on FR-4, large BGAs
- **Solutions:** Underfill, corner staking, flexible joints

#### 3.7.2 Gold Embrittlement
- **Problem:** Excess gold dissolves into solder, forms brittle AuSn4
- **Threshold:** >3% Au in joint
- **Prevention:** Limit gold thickness (<0.5 μm), avoid multiple reflows on ENIG

#### 3.7.3 Popcorning (Moisture Sensitivity)
- **Problem:** Moisture in component vaporizes during reflow
- **Result:** Package cracking, delamination
- **Prevention:** Proper MSL handling, baking if exposed

##### MSL (Moisture Sensitivity Level) Guidelines

| MSL | Floor Life | Storage |
|-----|------------|---------|
| 1 | Unlimited | Ambient |
| 2 | 1 year | <60% RH |
| 2a | 4 weeks | <60% RH |
| 3 | 168 hours | <60% RH |
| 4 | 72 hours | <60% RH |
| 5 | 48 hours | <60% RH |
| 5a | 24 hours | <60% RH |
| 6 | Bake before use | Dry pack |

#### 3.7.4 Tin Whiskers
- **Problem:** Crystalline tin growths can cause shorts
- **Risk Factors:** Pure tin finish, compressive stress
- **Mitigation:** Conformal coating, matte tin, annealing

#### 3.7.5 Intermetallic Compound (IMC) Formation
- **Common IMCs:** Cu6Sn5, Cu3Sn, Ni3Sn4
- **Effect:** Necessary for bonding, excessive growth is brittle
- **Control:** Minimize reflow cycles, control peak temperature

---

## 4. Data Structure Specifications

### 4.1 JSON File Organization

```
public/data/smt-manufacturing/
├── overview.json
├── materials/
│   ├── substrates.json
│   ├── surface-finishes.json
│   ├── solder-alloys.json
│   └── solder-paste.json
├── process/
│   ├── stencil-printing.json
│   ├── spi.json
│   ├── pick-and-place.json
│   └── reflow.json
├── quality/
│   ├── ipc-classes.json
│   ├── acceptance-criteria.json
│   └── inspection-methods.json
├── defects/
│   ├── printing-defects.json
│   ├── placement-defects.json
│   ├── reflow-defects.json
│   └── troubleshooting-matrix.json
├── dfm/
│   ├── pad-design.json
│   ├── spacing-rules.json
│   └── thermal-design.json
└── glossary.json
```

### 4.2 Schema Definitions

#### 4.2.1 Substrate Material Schema
```json
{
  "id": "string",
  "name": "string",
  "category": "string",
  "properties": {
    "tg": { "value": "number", "unit": "°C" },
    "dk": { "value": "number", "frequency": "string" },
    "df": { "value": "number" },
    "cte": { "value": "number", "unit": "ppm/°C", "axis": "string" },
    "thermalConductivity": { "value": "number", "unit": "W/mK" }
  },
  "applications": ["string"],
  "limitations": ["string"],
  "costLevel": "low|medium|high|very-high"
}
```

#### 4.2.2 Solder Alloy Schema
```json
{
  "id": "string",
  "name": "string",
  "composition": {
    "elements": [{ "symbol": "string", "percentage": "number" }]
  },
  "meltingPoint": {
    "solidus": "number",
    "liquidus": "number",
    "unit": "°C"
  },
  "rohsCompliant": "boolean",
  "applications": ["string"],
  "properties": {
    "wetting": "poor|fair|good|excellent",
    "reliability": "poor|fair|good|excellent",
    "reworkability": "poor|fair|good|excellent"
  }
}
```

#### 4.2.3 Defect Schema
```json
{
  "id": "string",
  "name": "string",
  "category": "printing|placement|reflow",
  "description": "string",
  "visualDescription": "string",
  "images": ["string"],
  "causes": [{
    "cause": "string",
    "likelihood": "low|medium|high"
  }],
  "solutions": [{
    "solution": "string",
    "effectiveness": "low|medium|high"
  }],
  "detection": ["SPI", "AOI", "X-Ray", "Visual"],
  "ipcReference": "string"
}
```

#### 4.2.4 Reflow Profile Schema
```json
{
  "id": "string",
  "name": "string",
  "alloy": "string",
  "profileType": "ramp-to-peak|soak",
  "zones": [{
    "name": "string",
    "purpose": "string",
    "temperature": { "min": "number", "max": "number" },
    "duration": { "min": "number", "max": "number" },
    "rampRate": { "min": "number", "max": "number" }
  }],
  "criticalParameters": {
    "peakTemp": { "min": "number", "typical": "number", "max": "number" },
    "tal": { "min": "number", "typical": "number", "max": "number" },
    "coolingRate": { "min": "number", "max": "number" }
  }
}
```

### 4.3 Glossary Schema
```json
{
  "terms": [{
    "term": "string",
    "abbreviation": "string|null",
    "definition": "string",
    "category": "string",
    "relatedTerms": ["string"],
    "ipcReference": "string|null"
  }]
}
```

---

## 5. Component Architecture

### 5.1 Component Hierarchy

```
src/views/
└── SMTManufacturingView.vue          # Main page component

src/components/info/smt-manufacturing/
├── index.js                           # Component exports
├── SMTHeroSection.vue                 # Hero with stats
├── SMTTableOfContents.vue             # Sticky navigation
├── SMTOverviewSection.vue             # Overview content
├── SMTMaterialsSection.vue            # Materials content
│   ├── SubstratesTab.vue
│   ├── SurfaceFinishesTab.vue
│   ├── SolderAlloysTab.vue
│   └── SolderPasteTab.vue
├── SMTProcessSection.vue              # Process content
│   ├── StencilPrintingTab.vue
│   ├── SPITab.vue
│   ├── PickAndPlaceTab.vue
│   └── ReflowTab.vue
├── SMTQualitySection.vue              # Quality standards
├── SMTDefectsSection.vue              # Defects & troubleshooting
│   ├── DefectCard.vue
│   ├── DefectGallery.vue
│   └── TroubleshootingWizard.vue
├── SMTDFMSection.vue                  # DFM guidelines
└── tools/
    ├── StencilCalculator.vue
    ├── ReflowProfileBuilder.vue
    ├── DefectTroubleshooter.vue
    ├── AlloySelectionWizard.vue
    └── DFMChecklist.vue
```

### 5.2 Shared Components to Reuse

From existing codebase:
- `AccordionPanel.vue` - Expandable content sections
- `ComparisonTable.vue` - Side-by-side comparisons
- `ImageViewer.vue` - Image gallery with zoom
- `TabContainer.vue` - Tabbed content
- `TechnicalTooltip.vue` - Hover definitions

### 5.3 New Shared Components Needed

```vue
<!-- DataTable.vue - Sortable, filterable tables -->
<template>
  <table class="data-table">
    <thead>
      <tr>
        <th v-for="col in columns" @click="sort(col)">
          {{ col.label }}
          <span v-if="sortColumn === col.key">{{ sortDirection }}</span>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="row in sortedData">
        <td v-for="col in columns">{{ row[col.key] }}</td>
      </tr>
    </tbody>
  </table>
</template>
```

```vue
<!-- ProcessFlowDiagram.vue - Interactive process visualization -->
<template>
  <div class="process-flow">
    <div v-for="step in steps" class="process-step" :class="{ active: activeStep === step.id }">
      <div class="step-icon">{{ step.icon }}</div>
      <div class="step-label">{{ step.label }}</div>
      <div class="step-connector" v-if="!isLast(step)"></div>
    </div>
  </div>
</template>
```

### 5.4 Component Props Specifications

#### SMTHeroSection.vue
```typescript
interface Props {
  title: string;
  subtitle: string;
  stats: Array<{
    value: string;
    label: string;
    icon: string;
  }>;
  backgroundImage?: string;
}
```

#### SMTDefectsSection.vue
```typescript
interface Props {
  defects: Array<Defect>;
  categories: Array<string>;
  selectedCategory?: string;
}

interface Defect {
  id: string;
  name: string;
  category: string;
  description: string;
  causes: Array<Cause>;
  solutions: Array<Solution>;
  images: Array<string>;
}
```

#### StencilCalculator.vue
```typescript
interface Props {
  presets?: Array<{
    name: string;
    stencilThickness: number;
    apertureWidth: number;
    apertureLength: number;
    powderType: number;
  }>;
}

interface Emits {
  (e: 'calculate', result: CalculationResult): void;
}
```

---

## 6. Interactive Tools

### 6.1 Stencil Aperture Calculator

#### Purpose
Calculate area ratio, aspect ratio, and recommended powder type for stencil apertures.

#### Inputs
- Stencil thickness (mm or mil)
- Aperture width (mm or mil)
- Aperture length (mm or mil) - for rectangular
- Aperture diameter (mm or mil) - for circular
- Aperture shape (rectangular, circular, square)

#### Outputs
- Area Ratio (with pass/fail indicator)
- Aspect Ratio (with pass/fail indicator)
- Recommended powder type
- Five-ball/Eight-ball rule compliance
- Transfer efficiency prediction

#### Calculations
```javascript
// Area Ratio (circular/square)
areaRatio = diameter / (4 * thickness);

// Aspect Ratio (rectangular)
aspectRatio = width / thickness;

// Area Ratio (rectangular)
areaRatioRect = (width * length) / (2 * (width + length) * thickness);

// Five-ball rule
minWidth = 5 * maxPowderDiameter[powderType];

// Eight-ball rule
minDiameter = 8 * maxPowderDiameter[powderType];
```

#### UI Design
```
┌─────────────────────────────────────────────────────────────┐
│  STENCIL APERTURE CALCULATOR                                │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Aperture Shape: [Rectangular ▼]                            │
│                                                             │
│  ┌─────────────────┐  ┌─────────────────┐                  │
│  │ Stencil         │  │ Aperture        │                  │
│  │ Thickness       │  │ Width           │                  │
│  │ [0.100] mm      │  │ [0.200] mm      │                  │
│  └─────────────────┘  └─────────────────┘                  │
│                                                             │
│  ┌─────────────────┐  ┌─────────────────┐                  │
│  │ Aperture        │  │ Powder          │                  │
│  │ Length          │  │ Type            │                  │
│  │ [0.500] mm      │  │ [Type 3 ▼]      │                  │
│  └─────────────────┘  └─────────────────┘                  │
│                                                             │
│  [CALCULATE]                                                │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│  RESULTS                                                    │
│                                                             │
│  Area Ratio:    0.67  ✓ PASS (>0.66)                       │
│  Aspect Ratio:  2.00  ✓ PASS (>1.5)                        │
│  5-Ball Rule:   ✓ PASS (200 μm > 225 μm required)          │
│                                                             │
│  Recommended Powder: Type 3 or finer                        │
│  Expected Transfer Efficiency: 85-95%                       │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 6.2 Reflow Profile Builder

#### Purpose
Build and visualize reflow profiles with parameter validation.

#### Inputs
- Solder alloy selection
- Profile type (RTP or Soak)
- Zone temperatures
- Zone durations
- Ramp rates

#### Outputs
- Visual profile graph
- Parameter validation (pass/fail)
- Warnings for out-of-spec values
- Exportable profile data

#### Features
- Preset profiles for common alloys
- Real-time graph updates
- Temperature delta calculation
- TAL calculation
- Profile comparison mode

### 6.3 Defect Troubleshooter

#### Purpose
Interactive wizard to diagnose defects and suggest solutions.

#### Flow
1. Select defect type from visual gallery
2. Answer diagnostic questions
3. Receive ranked probable causes
4. Get specific corrective actions

#### UI Design
```
┌─────────────────────────────────────────────────────────────┐
│  DEFECT TROUBLESHOOTER                                      │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Step 1: Select the defect you're experiencing              │
│                                                             │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐           │
│  │ [img]   │ │ [img]   │ │ [img]   │ │ [img]   │           │
│  │Tombstone│ │ Voiding │ │ Bridge  │ │ HiP     │           │
│  └─────────┘ └─────────┘ └─────────┘ └─────────┘           │
│                                                             │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐           │
│  │ [img]   │ │ [img]   │ │ [img]   │ │ [img]   │           │
│  │ Graping │ │Solder   │ │Insuffic.│ │Non-Wet  │           │
│  │         │ │ Balls   │ │         │ │         │           │
│  └─────────┘ └─────────┘ └─────────┘ └─────────┘           │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│  Step 2: Answer these questions                             │
│                                                             │
│  Where is the defect occurring?                             │
│  ○ Chip components (0402, 0603, etc.)                       │
│  ○ Fine-pitch ICs (QFP, SOIC)                               │
│  ○ BGAs/CSPs                                                │
│  ○ QFNs/BTCs                                                │
│                                                             │
│  Is the defect consistent or random?                        │
│  ○ Same location every board                                │
│  ○ Random locations                                         │
│  ○ Clustered in certain areas                               │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│  DIAGNOSIS                                                  │
│                                                             │
│  Most Likely Causes:                                        │
│  1. [90%] Uneven solder paste volume                        │
│     → Check SPI data, verify stencil condition              │
│  2. [70%] Thermal imbalance during reflow                   │
│     → Review profile, check for heat sinks nearby           │
│  3. [40%] Component placement offset                        │
│     → Verify placement accuracy, check vision system        │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 6.4 Solder Alloy Selection Wizard

#### Purpose
Guide users to select appropriate solder alloy based on requirements.

#### Decision Criteria
- RoHS compliance requirement
- Operating temperature range
- Reliability requirements
- Cost constraints
- Rework considerations
- Special requirements (thermal, mechanical)

#### Output
- Recommended alloy(s)
- Comparison with alternatives
- Reflow profile recommendations
- Compatibility notes

### 6.5 DFM Checklist

#### Purpose
Interactive checklist for design review before manufacturing.

#### Categories
- Pad Design
- Component Spacing
- Thermal Considerations
- Stencil Compatibility
- Panelization
- Fiducials
- Test Points

#### Features
- Save/load checklist state
- Export to PDF
- Notes field for each item
- Pass/Fail/NA status
- Automatic scoring

---

## 7. Image Mapping

### 7.1 Image Organization

```
public/images/smt/
├── process/
│   ├── smt-assembly-process.jpeg
│   ├── smt_process_line.png
│   ├── component-placement-process-2_orig.jpg
│   ├── pick-and-place-motion.gif
│   └── single-and-double-sided-smt.jpg
├── stencils/
│   ├── smt-stencils.jpg
│   ├── smt-stencil-machine-production.jpg
│   ├── Framed-and-Frameless-SMT-Stencil.jpg
│   └── csm_StencilLaser_babccb9fa8.jpg
├── defects/
│   ├── Component-faults.png
│   ├── Soldering-defects.png
│   ├── solder-defects-common.png
│   ├── Open-type-defects.png
│   ├── Corrosion-defect.png
│   ├── Faults-due-to-inconsistent-temperature.png
│   ├── Errors-in-the-wiring-Tracks.png
│   └── PCB-level-defects.png
└── misc/
    ├── 1-s2.0-S2307187724000348-gr6.jpg
    ├── 1578020115162.jpeg
    ├── 6389312018872496077087203.jpg
    ├── mc889-background.jpg
    └── MTY4ODg1ODMyODUxOTAwNg_962880_L8o4AinYVS6rCQkq_1747037517.jpeg
```

### 7.2 Image Usage by Section

| Section | Images | Purpose |
|---------|--------|---------|
| Hero | `mc889-background.jpg` | Background |
| Overview | `smt-assembly-process.jpeg`, `smt_process_line.png` | Process flow |
| SMT vs TH | `single-and-double-sided-smt.jpg` | Comparison |
| Stencil Printing | `smt-stencils.jpg`, `Framed-and-Frameless-SMT-Stencil.jpg`, `csm_StencilLaser_babccb9fa8.jpg`, `smt-stencil-machine-production.jpg` | Stencil types |
| Pick & Place | `pick-and-place-motion.gif`, `component-placement-process-2_orig.jpg` | Process animation |
| Defects | `Component-faults.png`, `Soldering-defects.png`, `solder-defects-common.png`, `Open-type-defects.png` | Defect examples |
| Troubleshooting | `Faults-due-to-inconsistent-temperature.png`, `Errors-in-the-wiring-Tracks.png`, `PCB-level-defects.png`, `Corrosion-defect.png` | Root cause visuals |

---

## 8. Implementation Phases

### Phase 1: Foundation (Priority: Critical)
**Scope:** Core page structure and navigation

**Tasks:**
- [ ] Create `SMTManufacturingView.vue` main component
- [ ] Implement `SMTHeroSection.vue` with stats cards
- [ ] Implement `SMTTableOfContents.vue` with scroll spy
- [ ] Set up routing in Vue Router
- [ ] Create base CSS styles matching Wire Bonding page
- [ ] Set up JSON data file structure

**Deliverables:**
- Navigable page skeleton
- Working sticky navigation
- Hero section with placeholder content

### Phase 2: Content - Materials (Priority: High)
**Scope:** Materials section with all subsections

**Tasks:**
- [ ] Create `SMTMaterialsSection.vue` with tabs
- [ ] Implement substrates content and comparison table
- [ ] Implement surface finishes content and selection guide
- [ ] Implement solder alloys content with properties
- [ ] Implement solder paste content with specifications
- [ ] Create JSON data files for materials
- [ ] Add relevant images

**Deliverables:**
- Complete materials section
- Interactive comparison tables
- Material selection guidance

### Phase 3: Content - Process (Priority: High)
**Scope:** Process section with all subsections

**Tasks:**
- [ ] Create `SMTProcessSection.vue` with tabs
- [ ] Implement stencil printing content
- [ ] Implement SPI content
- [ ] Implement pick and place content
- [ ] Implement reflow soldering content
- [ ] Create process flow diagrams
- [ ] Add process images and animations

**Deliverables:**
- Complete process documentation
- Visual process flow
- Parameter tables

### Phase 4: Content - Quality & Defects (Priority: High)
**Scope:** Quality standards and defect troubleshooting

**Tasks:**
- [ ] Create `SMTQualitySection.vue`
- [ ] Implement IPC class descriptions
- [ ] Implement acceptance criteria tables
- [ ] Create `SMTDefectsSection.vue`
- [ ] Implement defect cards with causes/solutions
- [ ] Create defect image gallery
- [ ] Add all defect images

**Deliverables:**
- Quality standards reference
- Comprehensive defect guide
- Visual defect identification

### Phase 5: Content - DFM (Priority: Medium)
**Scope:** Design for Manufacturing guidelines

**Tasks:**
- [ ] Create `SMTDFMSection.vue`
- [ ] Implement pad design guidelines
- [ ] Implement spacing rules
- [ ] Implement thermal design guidance
- [ ] Implement panelization guidelines
- [ ] Create DFM reference tables

**Deliverables:**
- Complete DFM reference
- Design rule tables
- Best practices documentation

### Phase 6: Interactive Tools (Priority: Medium)
**Scope:** Calculator and wizard tools

**Tasks:**
- [ ] Implement `StencilCalculator.vue`
- [ ] Implement `ReflowProfileBuilder.vue`
- [ ] Implement `DefectTroubleshooter.vue`
- [ ] Implement `AlloySelectionWizard.vue`
- [ ] Implement `DFMChecklist.vue`
- [ ] Add tool result persistence

**Deliverables:**
- Working stencil calculator
- Interactive reflow profile builder
- Defect diagnosis wizard
- Alloy selection tool
- DFM checklist with export

### Phase 7: Polish & Optimization (Priority: Medium)
**Scope:** Final refinements and performance

**Tasks:**
- [ ] Implement glossary with tooltips
- [ ] Add print stylesheet
- [ ] Optimize images (WebP conversion)
- [ ] Add loading states
- [ ] Implement error boundaries
- [ ] Cross-browser testing
- [ ] Mobile responsiveness verification
- [ ] Accessibility audit (WCAG 2.1)

**Deliverables:**
- Production-ready page
- Optimized performance
- Accessible interface

### Phase 8: Documentation & Testing (Priority: Low)
**Scope:** Developer documentation and testing

**Tasks:**
- [ ] Write component documentation
- [ ] Create unit tests for calculators
- [ ] Create integration tests
- [ ] Document JSON data schemas
- [ ] Create maintenance guide

**Deliverables:**
- Developer documentation
- Test coverage
- Maintenance procedures

---

## Appendix A: Glossary Terms

Key terms to include in the glossary:

| Term | Definition |
|------|------------|
| AOI | Automated Optical Inspection |
| Area Ratio | Ratio of aperture area to sidewall area |
| Aspect Ratio | Ratio of aperture width to stencil thickness |
| BGA | Ball Grid Array |
| BTC | Bottom Termination Component |
| CTE | Coefficient of Thermal Expansion |
| Df | Dissipation Factor |
| Dk | Dielectric Constant |
| ENIG | Electroless Nickel Immersion Gold |
| ENEPIG | Electroless Nickel Electroless Palladium Immersion Gold |
| Graping | Defect where solder particles don't fully coalesce |
| HASL | Hot Air Solder Leveling |
| HiP | Head-in-Pillow defect |
| IMC | Intermetallic Compound |
| MSL | Moisture Sensitivity Level |
| NWO | Non-Wet Open |
| OSP | Organic Solderability Preservative |
| QFN | Quad Flat No-leads |
| RoHS | Restriction of Hazardous Substances |
| SAC | Tin-Silver-Copper (solder alloy family) |
| SMD | Solder Mask Defined |
| SMT | Surface Mount Technology |
| SPI | Solder Paste Inspection |
| TAL | Time Above Liquidus |
| Tg | Glass Transition Temperature |
| Tombstoning | Defect where component stands on one end |
| Transfer Efficiency | Ratio of deposited paste volume to aperture volume |

---

## Appendix B: IPC Standards Quick Reference

| Standard | Title | Relevance |
|----------|-------|-----------|
| IPC-A-610 | Acceptability of Electronic Assemblies | Inspection criteria |
| J-STD-001 | Requirements for Soldered Assemblies | Workmanship standards |
| IPC-7525 | Stencil Design Guidelines | Stencil design |
| IPC-7526 | Stencil and Misprinted Board Cleaning | Stencil maintenance |
| IPC-7527 | Requirements for Solder Paste Printing | Print process |
| IPC-7095 | Design and Assembly for BGAs | BGA guidelines |
| IPC-9701 | Performance Test Methods | Reliability testing |
| J-STD-004 | Requirements for Soldering Fluxes | Flux classification |
| J-STD-005 | Requirements for Soldering Pastes | Paste specifications |
| J-STD-006 | Requirements for Electronic Solders | Alloy specifications |

---

## Appendix C: Reflow Profile Templates

### SAC305 Standard Profile
```
Zone 1-2 (Preheat):    25°C → 150°C @ 1-2°C/s
Zone 3-4 (Soak):       150°C → 200°C, 60-90s
Zone 5-6 (Reflow):     Peak 240-245°C, TAL 60-90s
Zone 7-8 (Cooling):    245°C → 25°C @ 3-4°C/s
```

### SAC305 RTP Profile (Graping Prevention)
```
Zone 1-6 (Ramp):       25°C → 245°C @ 1°C/s (~220s)
Zone 7-8 (Cooling):    245°C → 25°C @ 3-4°C/s
TAL: 60-90s
```

### Sn63/Pb37 Standard Profile
```
Zone 1-2 (Preheat):    25°C → 150°C @ 1-2°C/s
Zone 3-4 (Soak):       150°C → 180°C, 60-90s
Zone 5-6 (Reflow):     Peak 210-225°C, TAL 45-75s
Zone 7-8 (Cooling):    225°C → 25°C @ 3-4°C/s
```

---

*End of Specification Document*
