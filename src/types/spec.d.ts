/**
 * TypeScript definitions for spec-related types
 */

/**
 * Specification plugin definition
 */
export interface SpecPlugin {
  /** Unique identifier for the spec */
  id: string
  /** Display name */
  name: string
  /** Version string */
  version: string
  /** Description */
  description?: string
  /** Icon name */
  icon?: string
  /** Routes defined by this spec */
  routes?: SpecRoute[]
  /** Components provided by this spec */
  components?: Record<string, () => Promise<{ default: any }>>
  /** Composables provided by this spec */
  composables?: Record<string, () => Promise<{ default: any }>>
  /** Data loader for the spec */
  dataLoader?: SpecDataLoader
  /** Adapter instance */
  adapter?: SpecAdapter
  /** Field definitions */
  fieldDefinitions?: Record<string, SpecField[]>
  /** Whether this is the default spec */
  isDefault?: boolean
}

/**
 * Route definition
 */
export interface SpecRoute {
  /** Route path */
  path: string
  /** Route name */
  name: string
  /** Route component */
  component: () => Promise<any>
  /** Route meta */
  meta?: {
    title?: string
    specId?: string
    toolId?: string
    disabled?: boolean
    [key: string]: any
  }
  /** Child routes */
  children?: SpecRoute[]
}

/**
 * Data loader interface
 */
export interface SpecDataLoader {
  /** Load a section of data */
  loadSection: (sectionId: string) => Promise<any>
  [key: string]: any
}

/**
 * Field definition
 */
export interface SpecField {
  /** Field key */
  key: string
  /** Display label */
  label: string
  /** Whether field is required */
  required?: boolean
  /** Maximum length for string fields */
  maxLength?: number
  /** Field width */
  width?: string
  /** Field type */
  type?: string
  /** Field category */
  category?: string
  /** Spec reference */
  specReference?: string
  /** Material type */
  materialType?: string
  /** Application method */
  application?: string
  /** Material */
  material?: string
  /** Thickness */
  thickness?: string
  /** Shock absorption rating */
  shockAbsorption?: string
  /** Container type */
  containerType?: string
  /** Dimensions */
  dimensions?: string
}

/**
 * Spec item (generic for all specs)
 */
export interface SpecItem {
  /** Item code */
  code: string
  /** Item description */
  description: string
  /** Category (optional) */
  category?: string
  /** Type (optional) */
  type?: string
  /** Spec reference (optional) */
  specReference?: string
  /** Material type (optional) */
  materialType?: string
  /** Application (optional) */
  application?: string
  /** Material (optional) */
  material?: string
  /** Thickness (optional) */
  thickness?: string
  /** Additional properties */
  [key: string]: any
}

/**
 * Table header definition
 */
export interface TableHeader {
  /** Column key */
  key: string
  /** Column label */
  label: string
  /** Column width */
  width?: string
  /** Sortable */
  sortable?: boolean
  /** Align */
  align?: 'start' | 'center' | 'end'
}

/**
 * Validation result
 */
export interface ValidationResult {
  /** Whether valid */
  valid: boolean
  /** Array of error messages */
  errors: string[]
}

/**
 * Form data structure
 */
export interface DD2326FormData {
  /** Top fields */
  topFields: Record<string, any>
  /** Part A data */
  partA: Record<string, any>
  /** Part B data */
  partB: Record<string, any>
  /** Part C data */
  partC: Record<string, any>
  /** Part D data */
  partD: Record<string, any>
}

/**
 * Decoded result
 */
export interface DecodedResult {
  /** Result ID */
  id: string
  /** Spec ID */
  specId: string
  /** Decoded data */
  data: any
  /** Creation timestamp */
  createdAt: string
  /** Source type */
  source: string
}

/**
 * Saved form
 */
export interface SavedForm {
  /** Form ID */
  id: string
  /** Spec ID */
  specId: string
  /** Form data */
  data: any
  /** Creation timestamp */
  createdAt: string
  /** Last update timestamp */
  updatedAt: string
  /** Form name */
  name: string
}

/**
 * Form template
 */
export interface FormTemplate {
  /** Template ID */
  id: string
  /** Template name */
  name: string
  /** Spec ID */
  specId: string
  /** Template data */
  data: any
  /** Creation timestamp */
  createdAt: string
  /** Last update timestamp */
  updatedAt?: string
}
