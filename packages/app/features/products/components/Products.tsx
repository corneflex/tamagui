'use client'
import { Stack, useMedia } from '@corneflex/ui'
import { Product } from 'app/models/Product'
import { useEffect, useState } from 'react'
import LayoutProvider from './LayoutProvider'
import { ProductCard } from './ProductCard'

import { useColumns } from 'app/hooks/system/use-columns'
import { DataProvider, RecyclerListView } from 'recyclerlistview'
import { Link } from 'solito/link'

export interface ProductProps {
  products?: Product[]
  preload: (product: Product) => Promise<any>
  onEndReached?: (() => void) | null | undefined
}

export const CARD_HEIGHT = 200

export const Products: React.FC<ProductProps> = ({
  products,
  preload = () => {},
  onEndReached,
}) => {
  const media = useMedia()
  //  useScrollRestoration()
  const [dataProvider, setDataProvider] = useState(
    new DataProvider((r1, r2) => {
      return r1 !== r2
    }).cloneWithRows(products || [])
  )

  useEffect(() => {
    setDataProvider(dataProvider.cloneWithRows(products || []))
  }, [products])

  const columns = useColumns(330)

  const _layoutProvider = new LayoutProvider(dataProvider, columns, 300, 250)

  const _renderRow = (type, data) => {
    return (
      <Stack f={1} ai="center" padding="$3">
        <Link href={`/products/${data.id}`} viewProps={{ style: { width:'100%', height:'100%', flex: 1 } }}>
        <ProductCard width="100%" height="100%" product={data} />
        </Link>
      </Stack>
    )
  }
  _layoutProvider.shouldRefreshWithAnchoring = false

  return (
    <Stack f={1} width={'100%'}>
      <RecyclerListView
        style={{
          flex: 1,
        }}
        layoutProvider={_layoutProvider}
        dataProvider={dataProvider}
        rowRenderer={_renderRow}
        onEndReached={onEndReached ?? (() => {})}
        useWindowScroll={true}
        canChangeSize={true}
      />
    </Stack>
  )
}
