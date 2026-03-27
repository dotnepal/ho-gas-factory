export type GasKey = 'oxygen' | 'nitrogen' | 'hydrogen'

export type CylinderRow = {
  size: string
  capacity: string
  weight: string
  rent: boolean
  sale: boolean
}

export type GasProduct = {
  key: GasKey
  /** English-only placeholder use cases — not in i18n (content, not UI labels). */
  useCases: readonly string[]
  cylinders: readonly CylinderRow[]
}

export const PRODUCTS: readonly GasProduct[] = [
  {
    key: 'oxygen',
    useCases: [
      'Medical oxygen therapy',
      'Hospital ventilators & ICU',
      'Homecare & ambulance',
      'Industrial cutting & welding',
    ],
    cylinders: [
      { size: 'S',  capacity: '1.5 L', weight: '3 kg',  rent: true,  sale: true  },
      { size: 'M',  capacity: '5 L',   weight: '8 kg',  rent: true,  sale: true  },
      { size: 'L',  capacity: '10 L',  weight: '15 kg', rent: true,  sale: true  },
      { size: 'XL', capacity: '47 L',  weight: '60 kg', rent: false, sale: true  },
    ],
  },
  {
    key: 'nitrogen',
    useCases: [
      'Industrial manufacturing',
      'Food packaging & preservation',
      'Laboratory & research',
      'Metal fabrication',
    ],
    cylinders: [
      { size: 'S', capacity: '5 L',  weight: '8 kg',  rent: true,  sale: true },
      { size: 'M', capacity: '10 L', weight: '15 kg', rent: true,  sale: true },
      { size: 'L', capacity: '47 L', weight: '60 kg', rent: false, sale: true },
    ],
  },
  {
    key: 'hydrogen',
    useCases: [
      'Industrial processes',
      'Research & laboratories',
      'Chemical synthesis',
      'Fuel cell applications',
    ],
    cylinders: [
      { size: 'S', capacity: '5 L',  weight: '8 kg',  rent: false, sale: true },
      { size: 'M', capacity: '10 L', weight: '15 kg', rent: false, sale: true },
      { size: 'L', capacity: '47 L', weight: '60 kg', rent: false, sale: true },
    ],
  },
]
