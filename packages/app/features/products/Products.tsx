'use client'
import { Stack } from '@corneflex/ui'
import { Product } from 'app/model/Product'
import Masonry from 'react-masonry-css'
import { ProductCard } from './ProductCard'
import styles from './Products.module.css'
import { useDimensions } from '../../hooks/system/use-dimensions'

export interface ProductProps {
  products: Product[]
  preload: (product: Product) => Promise<any>
}

export const Products: React.FC<ProductProps> = ({ products, preload = () => {} }) => {
  const dimensions = useDimensions()
  const columns = Math.max(Math.floor(dimensions.window.width / 350), 1)

  return (
    <Stack flex={1} width="100%" ai="center" jc={'center'} maxWidth={1400}>
      {columns > 0 ? (
        <Masonry
          breakpointCols={columns}
          className={styles.myMasonryGrid}
          columnClassName={styles.myMasonryGridColumn}
        >
          {products?.map((product) => (
            <Stack
              key={product.id}
              marginTop="$3"
              marginLeft="$3"
              onHoverIn={() => preload(product)}
            >
              <ProductCard href={`/products/${product.id}`} product={product} />
            </Stack>
          ))}
        </Masonry>
      ) : null}
    </Stack>
  )
}
