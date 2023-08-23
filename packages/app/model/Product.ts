import { Image } from './Image'

export class Product {
  readonly id: string
  readonly name: string
  readonly brands?: string
  readonly description?: string
  readonly image?: { thumb: Image; cover: Image; small: Image }
  readonly nutriscore?: 'a' | 'b' | 'c' | 'd' | 'e'
  readonly ecoscore?: 'a' | 'b' | 'c' | 'd' | 'e'
  readonly novaGroup?: 1 | 2 | 3 | 4
  readonly protein?: number
  readonly sugar?: number
  readonly fat?: number
  readonly saturedFat?: number

  constructor(data?: Partial<Product>) {
    Object.assign(this, data)
  }
}
