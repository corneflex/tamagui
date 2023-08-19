export class Product {
  readonly id: string
  readonly name: string
  readonly brands?: string
  readonly description?: string
  readonly image?: { url: string; width?: number; height?: number }
  readonly nutriscore?: 'a' | 'b' | 'c' | 'd' | 'e'
  readonly ecoscore?: 'a' | 'b' | 'c' | 'd' | 'e'
  readonly novaGroup?: 1 | 2 | 3 | 4


  constructor(
   data?: Partial<Product>
  ) {
    Object.assign(this, data);
  }
}
