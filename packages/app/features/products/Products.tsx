'use client'
import { Stack } from '@corneflex/ui'
import { useColumns } from 'app/hooks/system/use-columns'
import { Product } from 'app/model/Product'
import { FlatList } from 'react-native'
import { ProductCard } from './ProductCard'
import LazyLoad from 'react-lazyload'
import { useState } from 'react'

export interface ProductProps {
  products?: Product[]
  preload: (product: Product) => Promise<any>
  onEndReached?: ((info: { distanceFromEnd: number }) => void) | null | undefined
  onEndReachedThreshold?: number
}

export const Products: React.FC<ProductProps> = ({
  products,
  preload = () => {},
  onEndReached,
  onEndReachedThreshold,
}) => {
  const columns = useColumns(350)
  const [isLoadingMore, setIsLoadingMore] = useState(false)

  return (
    <Stack flex={1} width="100%" ai="center" jc={'center'} maxWidth={1400}>
      {columns > 0 ? (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id}
          renderItem={({ item: product }) => (
            <Stack margin="$2" onHoverIn={() => preload(product)}>
              <LazyLoad height={300} once>
                <ProductCard href={`/products/${product.id}`} product={product} />
              </LazyLoad>
            </Stack>
          )}
          contentContainerStyle={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
          numColumns={columns}
          key={columns}
          onEndReached={onEndReached}
          onEndReachedThreshold={onEndReachedThreshold}
        />
      ) : null}
    </Stack>
  )
}
