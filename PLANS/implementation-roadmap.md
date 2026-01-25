# DD Form 2326 UI Redesign - Implementation Roadmap

## Project Overview

Transform the DD Form 2326 Decoder page from a simple 4-section grid input to an accurate replica of the official DD Form 2326 (SEP 1997) layout.

## Current State
- Simple grid with 4 sections × 80 characters
- Generic "Section 1-4" labels
- Modern Material Design styling
- No official form structure

## Target State
- Official DD Form 2326 layout
- Structured Parts A, B, C, D
- Proper field labels and organization
- Black borders, white background
- Print-ready appearance

## Implementation Phases

### Phase 1: Foundation (Components Setup)
**Goal:** Create the basic component structure and styling framework

#### Tasks:
1. Create component directory structure
2. Set up shared styling (CSS variables, mixins)
3. Create base [`FormCell.vue`](src/components/dd2326/shared/FormCell.vue) component
4. Create base [`FormRow.vue`](src/components/dd2326/shared/FormRow.vue) component
5. Set up data model types/interfaces

**Deliverables:**
- Component file structure
- Shared CSS file
- Reusable cell and row components
- Data model definition

**Estimated Complexity:** Low

---

### Phase 2: Header and Footer (Visual Identity)
**Goal:** Implement the form's header and footer to establish visual identity

#### Tasks:
1. Create [`DD2326Header.vue`](src/components/dd2326/DD2326Header.vue)
   - Approval stamp section
   - Title and OMB notice text
   - OMB number box
   - Three-column table layout

2. Create [`DD2326Footer.vue`](src/components/dd2326/DD2326Footer.vue)
   - Form number and date
   - "PREVIOUS EDITIONS ARE OBSOLETE" text
   - Reset button

3. Style both components to match official form

**Deliverables:**
- Working header component
- Working footer component
- Matching visual appearance

**Estimated Complexity:** Low-Medium

---

### Phase 3: Top Fields Section (Configuration Data)
**Goal:** Implement the nomenclature and configuration fields

#### Tasks:
1. Create [`DD2326TopFields.vue`](src/components/dd2326/DD2326TopFields.vue)
2. Implement 2×2 field grid:
   - Nomenclature
   - Design Activity's Part Number
   - Manufacturer's Cage Code
   - Configuration Item Specification Number
3. Add proper labels and styling
4. Implement v-model binding

**Deliverables:**
- Working top fields component
- Data binding functionality
- Styled to match form

**Estimated Complexity:** Low

---

### Phase 4: Part A (Item Identification)
**Goal:** Build the most complex section with proper cell structure

#### Tasks:
1. Create [`DD2326PartA.vue`](src/components/dd2326/DD2326PartA.vue)
2. Implement column headers:
   - DOC CON
   - NATIONAL STOCK NUMBER (FSC, NIIN, ADDL)
   - ITEM WEIGHT (POUNDS, UNIT)
   - LENGTH (INCHES, 10th)
   - WIDTH (INCHES, 10th)
   - DEPTH (INCHES, 10th)
   - CAT
3. Create Row A with cells 1-40
4. Implement second row headers:
   - CODE, QUP, ICQ, CAGE
   - DRAWING OR PART NUMBER
   - P
5. Create continuation row with cells 41-80
6. Add cell numbering (1-80)
7. Implement input handling and auto-advance
8. Style borders and spacing

**Deliverables:**
- Complete Part A component
- 80 input cells with numbering
- Proper column headers
- Data binding

**Estimated Complexity:** High

---

### Phase 5: Part B (Preservation-Packing)
**Goal:** Implement preservation and packing data section

#### Tasks:
1. Create [`DD2326PartB.vue`](src/components/dd2326/DD2326PartB.vue)
2. Implement first row headers:
   - DOC CON
   - NATIONAL STOCK NUMBER
   - PRES METH, C, PRES MTL
   - WRAP MTL, CUSH DUNN, C
   - UNIT CONT
3. Create Row B with cells 1-40
4. Implement second row headers:
   - INT TYPE, U, SPEC MKG
   - PACKING (A, B, C)
   - UNIT PACK WEIGHT
   - UNIT PACK SIZE
   - UNIT PACK CUBE
   - O, P
5. Create continuation row with cells 41-80
6. Style and implement data binding

**Deliverables:**
- Complete Part B component
- Preservation/packing fields
- Proper styling

**Estimated Complexity:** High

---

### Phase 6: Part C (Supplemental Data)
**Goal:** Implement supplemental instructions section

#### Tasks:
1. Create [`DD2326PartC.vue`](src/components/dd2326/DD2326PartC.vue)
2. Implement headers:
   - DOC CON
   - NATIONAL STOCK NUMBER
   - SUPPLEMENTAL INSTRUCTIONS
3. Create Row C with cells 1-80
4. Add second row for supplemental instructions (cells 41-80)
5. Style large instruction field
6. Implement data binding

**Deliverables:**
- Complete Part C component
- Supplemental instruction fields
- Proper styling

**Estimated Complexity:** Medium

---

### Phase 7: Part D (Special Packaging)
**Goal:** Implement special packaging instruction section

#### Tasks:
1. Create [`DD2326PartD.vue`](src/components/dd2326/DD2326PartD.vue)
2. Implement first row headers:
   - DOC CON
   - NATIONAL STOCK NUMBER
   - PKG DESIGN ACT CAGE
   - SPI NUMBER
   - B, Y
3. Create Row D with cells 1-40
4. Implement second row headers:
   - SPI DATE
   - CONTAINER NATIONAL STOCK NUMBER
5. Create continuation row with cells 41-80
6. Style and implement data binding

**Deliverables:**
- Complete Part D component
- Special packaging fields
- Proper styling

**Estimated Complexity:** Medium

---

### Phase 8: Main Form Assembly
**Goal:** Assemble all components into complete form

#### Tasks:
1. Create [`DD2326Form.vue`](src/components/dd2326/DD2326Form.vue)
2. Import and integrate all section components
3. Implement master data model
4. Set up v-model for entire form
5. Add form-wide styling
6. Implement reset functionality
7. Add print styles

**Deliverables:**
- Complete assembled form
- Working data model
- Print-ready styling

**Estimated Complexity:** Medium

---

### Phase 9: Integration with DecoderView
**Goal:** Integrate new form into existing decoder page

#### Tasks:
1. Update [`DecoderView.vue`](src/views/DecoderView.vue)
2. Replace current grid with new form
3. Update decode logic to work with new data structure
4. Maintain existing features:
   - Multiple input methods (tabs)
   - Decode functionality
   - Results display
   - Export options
5. Add toggle between "Form View" and "Raw Grid View"
6. Update data parsing logic

**Deliverables:**
- Updated DecoderView
- Working decode functionality
- Preserved existing features

**Estimated Complexity:** Medium-High

---

### Phase 10: Testing and Refinement
**Goal:** Ensure quality and accuracy

#### Tasks:
1. Visual comparison with reference image
2. Test all input fields
3. Verify cell numbering accuracy
4. Test data binding and decode
5. Test print functionality
6. Cross-browser testing
7. Accessibility testing
8. Performance optimization
9. Fix any alignment issues
10. Polish styling details

**Deliverables:**
- Tested and validated form
- Bug fixes applied
- Performance optimized
- Documentation updated

**Estimated Complexity:** Medium

---

## File Structure

```
src/components/dd2326/
├── DD2326Form.vue              (Main container)
├── DD2326Header.vue            (Form header)
├── DD2326TopFields.vue         (Top configuration fields)
├── DD2326PartA.vue             (Item Identification)
├── DD2326PartB.vue             (Preservation-Packing)
├── DD2326PartC.vue             (Supplemental Data)
├── DD2326PartD.vue             (Special Packaging)
├── DD2326Footer.vue            (Form footer)
├── shared/
│   ├── FormCell.vue            (Reusable cell)
│   ├── FormRow.vue             (Reusable row)
│   └── CellNumbering.vue       (Cell numbers)
└── styles/
    └── dd2326-form.css         (Shared styles)
```

## Key Technical Decisions

### 1. Component Granularity
- **Decision:** Create separate components for each Part (A, B, C, D)
- **Rationale:** Each part has unique structure and field layout
- **Benefit:** Easier to maintain and test

### 2. Data Structure
- **Decision:** Use nested object structure matching form sections
- **Rationale:** Mirrors form organization, easier to understand
- **Benefit:** Clear data model, easier validation

### 3. Cell Input Approach
- **Decision:** Individual input elements for each cell
- **Rationale:** Better control, accessibility, and user experience
- **Benefit:** Auto-advance, validation, keyboard navigation

### 4. Styling Strategy
- **Decision:** Table-based layout with CSS borders
- **Rationale:** Best matches official form structure
- **Benefit:** Precise control over borders and alignment

### 5. Backward Compatibility
- **Decision:** Keep existing RawDataGrid as alternative input
- **Rationale:** Some users may prefer simple grid
- **Benefit:** No breaking changes, user choice

## Risk Mitigation

### Risk 1: Complex Layout Alignment
- **Mitigation:** Use tables with fixed widths, test early
- **Fallback:** Adjust cell sizes if needed

### Risk 2: Browser Compatibility
- **Mitigation:** Test in all major browsers early
- **Fallback:** Provide browser-specific CSS if needed

### Risk 3: Performance with Many Inputs
- **Mitigation:** Use event delegation, debounce updates
- **Fallback:** Virtual scrolling if needed

### Risk 4: Print Layout Issues
- **Mitigation:** Create dedicated print styles, test early
- **Fallback:** Provide PDF export option

## Success Metrics

1. ✅ Visual match: Form looks identical to reference image
2. ✅ Functionality: All inputs work correctly
3. ✅ Data integrity: Decode produces correct results
4. ✅ Performance: No lag when typing
5. ✅ Accessibility: Passes WCAG AA standards
6. ✅ Print quality: Prints correctly on paper
7. ✅ Browser support: Works in Chrome, Firefox, Safari, Edge
8. ✅ User feedback: Positive response from users

## Timeline Estimate

| Phase | Complexity | Estimated Time |
|-------|-----------|----------------|
| Phase 1: Foundation | Low | 2-3 hours |
| Phase 2: Header/Footer | Low-Medium | 2-3 hours |
| Phase 3: Top Fields | Low | 1-2 hours |
| Phase 4: Part A | High | 4-6 hours |
| Phase 5: Part B | High | 4-6 hours |
| Phase 6: Part C | Medium | 2-3 hours |
| Phase 7: Part D | Medium | 2-3 hours |
| Phase 8: Assembly | Medium | 2-3 hours |
| Phase 9: Integration | Medium-High | 3-4 hours |
| Phase 10: Testing | Medium | 3-4 hours |
| **Total** | | **25-37 hours** |

## Next Steps

1. Review and approve this plan
2. Set up development environment
3. Begin Phase 1: Foundation
4. Implement phases sequentially
5. Test after each phase
6. Iterate based on feedback

## Questions for Clarification

1. Should we maintain the existing RawDataGrid as an alternative input method?
2. Do we need to support form versioning (different DD 2326 editions)?
3. Are there specific validation rules we should implement?
4. Should the form be editable or read-only in certain contexts?
5. Do we need to support importing/exporting in specific formats?

## References

- [`PLANS/dd2326-ui-redesign.md`](PLANS/dd2326-ui-redesign.md) - Detailed design plan
- [`PLANS/current-vs-target-comparison.md`](PLANS/current-vs-target-comparison.md) - Current vs target analysis
- [`PLANS/component-specifications.md`](PLANS/component-specifications.md) - Component specifications
- [`src/views/DecoderView.vue`](src/views/DecoderView.vue) - Current implementation
- [`src/components/dd2326/RawDataGrid.vue`](src/components/dd2326/RawDataGrid.vue) - Existing grid component
