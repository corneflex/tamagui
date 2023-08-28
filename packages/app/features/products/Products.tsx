'use client'
import { Stack } from '@corneflex/ui'
import { Product } from 'app/model/Product'
import { useEffect, useState } from 'react'
import LayoutProvider from './LayoutProvider'
import { ProductCard } from './ProductCard'

import { DataProvider, RecyclerListView } from 'recyclerlistview'

export interface ProductProps {
  products?: Product[]
  preload: (product: Product) => Promise<any>
  onEndReached?: ((info: { distanceFromEnd: number }) => void) | null | undefined
  onEndReachedThreshold?: number
}

export const CARD_HEIGHT = 200

export const Products: React.FC<ProductProps> = ({
  products,
  preload = () => {},
  onEndReached,
  onEndReachedThreshold,
}) => {
  const [dataProvider, setDataProvider] = useState(
    new DataProvider((r1, r2) => {
      return r1 !== r2
    }).cloneWithRows(products || [])
  )

  useEffect(() => {
    setDataProvider(dataProvider.cloneWithRows(products || []))
  }, [products])

  const _layoutProvider = new LayoutProvider(dataProvider)

  const _renderRow = (type, data) => {
    return (
      <Stack f={1} m="$3">
        <ProductCard f={1} height={200} width="100%" href={`/products/${data.id}`} product={data} />
      </Stack>
    )
  }
  _layoutProvider.shouldRefreshWithAnchoring = false

  return (
    <Stack f={1} ai="center" jc="center">
      <RecyclerListView
        style={{ flex: 1 }}
        layoutProvider={_layoutProvider}
        dataProvider={dataProvider}
        rowRenderer={_renderRow}
        canChangeSize={true}
        useWindowScroll={true}
      />
    </Stack>
  )
}
