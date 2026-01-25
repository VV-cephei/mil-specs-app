/**
 * DD Form 2326 Plugin
 * Plugin entry point for DoD Preservation and Packing Data Form
 */

import { DD2326Adapter } from '@/plugins/specs/adapter.js'

export default {
  id: 'dd2326',
  name: 'DD Form 2326',
  version: 'SEP1997',
  description: 'DoD Preservation and Packing Data Form',
  icon: 'mdi-file-document',

  routes: [
    {
      path: '/tools/dd2326/generator',
      name: 'dd2326-generator',
      component: () => import('@/views/FormGeneratorView.vue'),
      meta: {
        title: 'DD Form 2326 Generator',
        toolId: 'dd2326-generator'
      }
    },
    {
      path: '/tools/dd2326/decoder',
      name: 'dd2326-decoder',
      component: () => import('@/views/DecoderView.vue'),
      meta: {
        title: 'DD Form 2326 Decoder',
        toolId: 'dd2326-decoder'
      }
    },
    {
      path: '/specs/dd2326',
      name: 'dd2326-spec',
      component: () => import('@/components/dd2326/DD2326Form.vue'),
      meta: {
        title: 'DD Form 2326 Reference',
        specId: 'dd2326'
      }
    }
  ],

  components: {
    DD2326Form: () => import('@/components/dd2326/DD2326Form.vue'),
    DD2326Header: () => import('@/components/dd2326/DD2326Header.vue'),
    DD2326Footer: () => import('@/components/dd2326/DD2326Footer.vue'),
    FormGridInput: () => import('@/components/dd2326/FormGridInput.vue'),
    RawDataGrid: () => import('@/components/dd2326/RawDataGrid.vue')
  },

  composables: {
    useDD2326: () => import('./composables/useDD2326.js')
  },

  dataLoader: {
    async loadSection(sectionId) {
      // DD2326 doesn't have traditional sections like MIL-STD-2073
      // This is used for field definitions
      return this._getDefaultFields()
    },

    _getDefaultFields() {
      return {
        topFields: [
          { key: 'qup', label: 'Quality per Unit Pack', required: true, maxLength: 4 },
          { key: 'methodOfPreservation', label: 'Method of Preservation', required: true },
          { key: 'cleaningDrying', label: 'Cleaning & Drying', required: false },
          { key: 'preservativeMaterial', label: 'Preservative Materials', required: false },
          { key: 'wrappingMaterial', label: 'Wrapping Material', required: false },
          { key: 'cushioningMaterial', label: 'Cushioning Material', required: false },
          { key: 'cushioningThickness', label: 'Cushioning Thickness', required: false },
          { key: 'unitIntermediateContainer', label: 'Unit/Intermediate Container', required: false },
          { key: 'packingCode', label: 'Packing Code', required: false, maxLength: 4 }
        ],
        partA: [
          { key: 'a1', label: 'Contract No.', required: false },
          { key: 'a2', label: 'Control No.', required: false },
          { key: 'a3', label: 'Date', required: false },
          { key: 'a4', label: 'Requisition No.', required: false },
          { key: 'a5', label: 'Project No.', required: false }
        ],
        partB: [
          { key: 'b1', label: 'Name of Contractor', required: false },
          { key: 'b2', label: 'Address', required: false },
          { key: 'b3', label: 'Cage Code', required: false }
        ],
        partC: [
          { key: 'c1', label: 'Item Name', required: false },
          { key: 'c2', label: 'Part No.', required: false },
          { key: 'c3', label: 'NSN', required: false },
          { key: 'c4', label: 'Quantity', required: false },
          { key: 'c5', label: 'Unit', required: false }
        ],
        partD: [
          { key: 'd1', label: 'Remarks', required: false }
        ]
      }
    }
  },

  adapter: new DD2326Adapter(),

  fieldDefinitions: {
    topFields: [
      { key: 'qup', label: 'QTY Unit Pack', required: true },
      { key: 'methodOfPreservation', label: 'Method of Preservation', required: true },
      { key: 'cleaningDrying', label: 'Cleaning/Drying', required: false },
      { key: 'preservativeMaterial', label: 'Preservative Material', required: false },
      { key: 'wrappingMaterial', label: 'Wrapping Material', required: false },
      { key: 'cushioningMaterial', label: 'Cushioning Material', required: false },
      { key: 'cushioningThickness', label: 'Cushioning Thickness', required: false },
      { key: 'unitIntermediateContainer', label: 'Unit/Int. Container', required: false },
      { key: 'packingCode', label: 'Packing Code', required: false }
    ]
  }
}
