import { Stack, Text } from '@tamagui/core'
import { Product } from '../../model/Product'

export interface ProductDetailProps {
  product: Product
}

export const ProductDetail = ({ product }: ProductDetailProps) => {
  return (
    <Stack>
      <Text>{product.name}</Text>
    </Stack>
  )
}
