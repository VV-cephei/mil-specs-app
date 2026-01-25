/**
 * Specification Adapter Pattern
 * Provides a standardized interface for interacting with different specification types
 */

/**
 * Base Specification Adapter
 * All spec adapters should extend this class
 */
export class BaseSpecAdapter {
  constructor(specId) {
    this.specId = specId
  }

  /**
   * Load data for the specification
   * @returns {Promise<object>} Loaded data
   */
  async loadData() {
    throw new Error('loadData() must be implemented by subclass')
  }

  /**
   * Get the schema/structure for the specification
   * @returns {object} Schema definition
   */
  getSchema() {
    throw new Error('getSchema() must be implemented by subclass')
  }

  /**
   * Validate data against the specification
   * @param {object} data - Data to validate
   * @returns {object} Validation result { valid: boolean, errors: array }
   */
  validate(data) {
    throw new Error('validate() must be implemented by subclass')
  }

  /**
   * Get the name of the specification
   * @returns {string} Specification name
   */
  getName() {
    return this.specId
  }

  /**
   * Get the version of the specification
   * @returns {string} Specification version
   */
  getVersion() {
    return '1.0'
  }

  /**
   * Normalize raw data to common format
   * @param {any} rawData - Raw data from source
   * @returns {object} Normalized data
   */
  normalize(rawData) {
    return rawData
  }

  /**
   * Export data to specified format
   * @param {object} data - Data to export
   * @param {string} format - Export format (json, csv, pdf)
   * @returns {any} Exported data
   */
  export(data, format = 'json') {
    switch (format) {
      case 'json':
        return JSON.stringify(data, null, 2)
      case 'csv':
        return this._exportToCsv(data)
      default:
        return data
    }
  }

  /**
   * Export data to CSV format
   * @param {object} data - Data to export
   * @returns {string} CSV string
   */
  _exportToCsv(data) {
    if (!Array.isArray(data)) {
      data = [data]
    }
    
    if (data.length === 0) return ''
    
    const headers = Object.keys(data[0])
    const rows = data.map(item => 
      headers.map(header => {
        const value = item[header] || ''
        return `"${String(value).replace(/"/g, '""')}"`
      }).join(',')
    )
    
    return [headers.join(','), ...rows].join('\n')
  }
}

/**
 * MIL-STD-2073 Adapter
 * Handles MIL-STD-2073 specific data operations
 */
export class MilSpecAdapter extends BaseSpecAdapter {
  constructor() {
    super('mil-std-2073')
    this.version = '1E'
    this.sections = ['methods', 'cleaning', 'preservation', 'wrapping', 'cushioning', 'containers']
  }

  /**
   * Load data for a specific section
   * @param {string} sectionId - Section to load
   * @returns {Promise<array>} Section data
   */
  async loadSectionData(sectionId) {
    const sectionMap = {
      methods: '/data/mil-std-2073/methods.json',
      cleaning: '/data/mil-std-2073/cleaning.json',
      preservation: '/data/mil-std-2073/preservation.json',
      wrapping: '/data/mil-std-2073/wrapping.json',
      cushioning: '/data/mil-std-2073/cushioning.json',
      containers: '/data/mil-std-2073/containers.json'
    }

    const url = sectionMap[sectionId]
    if (!url) {
      throw new Error(`Unknown section: ${sectionId}`)
    }

    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(`Failed to load ${sectionId}: ${response.statusText}`)
      }
      return await response.json()
    } catch (error) {
      console.error(`[MilSpecAdapter] Error loading ${sectionId}:`, error)
      throw error
    }
  }

  /**
   * Load all spec data
   * @returns {Promise<object>} All spec data
   */
  async loadData() {
    const data = {}
    for (const section of this.sections) {
      data[section] = await this.loadSectionData(section)
    }
    return data
  }

  /**
   * Get the schema for MIL-STD-2073
   * @returns {object} Schema definition
   */
  getSchema() {
    return {
      methods: {
        fields: ['code', 'description', 'category', 'specReference']
      },
      cleaning: {
        fields: ['code', 'description', 'type']
      },
      preservation: {
        fields: ['code', 'description', 'materialType', 'application']
      },
      wrapping: {
        fields: ['code', 'description', 'material', 'thickness']
      },
      cushioning: {
        fields: ['code', 'description', 'material', 'thickness', 'shockAbsorption']
      },
      containers: {
        fields: ['code', 'description', 'type', 'dimensions', 'material']
      }
    }
  }

  /**
   * Validate data against MIL-STD-2073 rules
   * @param {object} data - Data to validate
   * @param {string} sectionId - Optional section to validate
   * @returns {object} Validation result
   */
  validate(data, sectionId = null) {
    const errors = []
    
    if (sectionId) {
      // Validate specific section
      if (!this.sections.includes(sectionId)) {
        errors.push(`Unknown section: ${sectionId}`)
        return { valid: false, errors }
      }
      
      if (Array.isArray(data)) {
        data.forEach((item, index) => {
          const itemErrors = this._validateItem(item, sectionId)
          itemErrors.forEach(err => {
            errors.push(`[${index}]: ${err}`)
          })
        })
      } else {
        errors.push(...this._validateItem(data, sectionId))
      }
    } else {
      // Validate all sections
      for (const section of this.sections) {
        if (data[section]) {
          if (Array.isArray(data[section])) {
            data[section].forEach((item, index) => {
              const itemErrors = this._validateItem(item, section)
              itemErrors.forEach(err => {
                errors.push(`[${section}][${index}]: ${err}`)
              })
            })
          }
        }
      }
    }
    
    return {
      valid: errors.length === 0,
      errors
    }
  }

  /**
   * Validate a single item
   * @param {object} item - Item to validate
   * @param {string} section - Section name
   * @returns {array} Validation errors
   */
  _validateItem(item, section) {
    const errors = []
    const schema = this.getSchema()[section]
    
    if (!schema) return errors
    
    for (const field of schema.fields) {
      if (item[field] === undefined || item[field] === null) {
        // Skip validation for optional fields that don't exist
        continue
      }
      
      if (typeof item[field] !== 'string') {
        errors.push(`${field} must be a string`)
      }
    }
    
    // Check for required 'code' field
    if (item.code === undefined || item.code === null || item.code === '') {
      errors.push('code is required')
    }
    
    return errors
  }

  /**
   * Get spec name
   * @returns {string} Name
   */
  getName() {
    return 'MIL-STD-2073'
  }

  /**
   * Get spec version
   * @returns {string} Version
   */
  getVersion() {
    return this.version
  }
}

/**
 * DD2326 Adapter
 * Handles DD Form 2326 specific data operations
 */
export class DD2326Adapter extends BaseSpecAdapter {
  constructor() {
    super('dd2326')
    this.version = 'SEP1997'
    this.parts = ['A', 'B', 'C', 'D']
  }

  /**
   * Load field definitions for DD2326
   * @returns {Promise<object>} Field definitions
   */
  async loadData() {
    try {
      const response = await fetch('/data/dd2326/fields.json')
      if (!response.ok) {
        // Return default field definitions if file doesn't exist
        return this._getDefaultFields()
      }
      return await response.json()
    } catch (error) {
      console.error('[DD2326Adapter] Error loading fields:', error)
      return this._getDefaultFields()
    }
  }

  /**
   * Get default field definitions
   * @returns {object} Default fields
   */
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

  /**
   * Get schema for DD2326
   * @returns {object} Schema
   */
  getSchema() {
    return {
      fields: this._getDefaultFields()
    }
  }

  /**
   * Validate DD2326 form data
   * @param {object} data - Form data
   * @param {string} partId - Optional part to validate
   * @returns {object} Validation result
   */
  validate(data, partId = null) {
    const errors = []
    const fields = this._getDefaultFields()
    
    const validatePart = (partData, partName, fieldList) => {
      if (!partData) return
      
      for (const field of fieldList) {
        if (field.required && !partData[field.key]) {
          errors.push(`${partName}.${field.key} is required`)
        }
        if (field.maxLength && partData[field.key]?.length > field.maxLength) {
          errors.push(`${partName}.${field.key} exceeds max length of ${field.maxLength}`)
        }
      }
    }

    if (partId && fields[partId]) {
      validatePart(data[partId], partId, fields[partId])
    } else {
      // Validate all parts
      for (const [partName, fieldList] of Object.entries(fields)) {
        if (partName !== 'topFields') {
          validatePart(data[partName], partName, fieldList)
        }
      }
    }
    
    return {
      valid: errors.length === 0,
      errors
    }
  }

  /**
   * Generate raw data string for DD2326
   * @param {object} data - Form data
   * @returns {string} Raw data string
   */
  generateRawData(data) {
    const lines = []
    
    // Header
    lines.push('DD FORM 2326')
    lines.push(`DATE: ${new Date().toLocaleDateString()}`)
    lines.push('')
    
    // Top fields
    if (data.topFields) {
      lines.push('TOP FIELDS')
      for (const [key, value] of Object.entries(data.topFields)) {
        lines.push(`${key.toUpperCase()}: ${value || ''}`)
      }
      lines.push('')
    }
    
    // Parts
    for (const part of this.parts) {
      if (data[`part${part}`]) {
        lines.push(`PART ${part}`)
        for (const [key, value] of Object.entries(data[`part${part}`])) {
          lines.push(`${key.toUpperCase()}: ${value || ''}`)
        }
        lines.push('')
      }
    }
    
    return lines.join('\n')
  }

  /**
   * Decode raw DD2326 data string
   * @param {string} rawData - Raw data string
   * @returns {object} Parsed data
   */
  decodeRawData(rawData) {
    const result = { topFields: {}, partA: {}, partB: {}, partC: {}, partD: {} }
    const lines = rawData.split('\n').filter(line => line.trim())
    
    let currentSection = 'topFields'
    
    for (const line of lines) {
      if (line.startsWith('PART ')) {
        currentSection = `part${line.split(' ')[1]}`
        continue
      }
      
      const colonIndex = line.indexOf(':')
      if (colonIndex > 0) {
        const key = line.substring(0, colonIndex).trim().toLowerCase()
        const value = line.substring(colonIndex + 1).trim()
        
        if (key && value) {
          result[currentSection][key] = value
        }
      }
    }
    
    return result
  }

  /**
   * Get spec name
   * @returns {string} Name
   */
  getName() {
    return 'DD Form 2326'
  }

  /**
   * Get spec version
   * @returns {string} Version
   */
  getVersion() {
    return this.version
  }
}
