import { Image } from './Image'

export type NutriScoreType = 'a' | 'b' | 'c' | 'd' | 'e'
export type EcoScoreType = 'a' | 'b' | 'c' | 'd' | 'e'
export type NovaGroupType = 1 | 2 | 3 | 4

export class Product {
  readonly id: string
  readonly name: string
  readonly brands?: string
  readonly description?: string
  readonly image?: { thumb: Image; cover: Image; small: Image }
  readonly nutriscore?: NutriScoreType
  readonly ecoscore?: EcoScoreType
  readonly novaGroup?: NovaGroupType
  readonly protein?: number
  readonly sugar?: number
  readonly fat?: number
  readonly saturedFat?: number

  constructor(data?: Partial<Product>) {
    Object.assign(this, data)
  }
}
