import { Stack } from '@corneflex/ui'
import { Product } from 'app/model/Product'
import { FlatList } from 'react-native'
import { ProductCard } from './ProductCard'
import { useCallback } from 'react'

export interface ProductProps {
  products: Product[]
  preload: (product: Product) => Promise<any>
}

export const Products: React.FC<ProductProps> = ({ products, preload = () => {} }) => {
  const handleViewableItemsChanged = useCallback(({ viewableItems }) => {
    viewableItems.map((item) => preload(item.item))
  }, [])

  return (
    <Stack flex={1} width="100%" ai="center" jc={'center'}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item: product }) => (
          <Stack margin="$2">
            <ProductCard href={`/products/${product.id}`} product={product} />
          </Stack>
        )}
        contentContainerStyle={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onViewableItemsChanged={handleViewableItemsChanged}
      />
    </Stack>
  )
}
