'use client'
import { Stack } from '@corneflex/ui'
import { Product } from 'app/model/Product'
import { useEffect, useRef, useState } from 'react'
import Masonry from 'react-masonry-css'
import { ProductCard } from './ProductCard'
import styles from './Products.module.css'
import { preload } from 'swr'
import { fetcher } from '@corneflex/compose-core'

export interface ProductProps {
  products: Product[]
  preload: (product: Product) => Promise<any>
}

export const Products: React.FC<ProductProps> = ({ products, preload = () => {} }) => {
  const [width, setWidth] = useState(0)
  const [columns, setColumns] = useState(0)
  const elementRef = useRef(null)

  const compute = () => {
    setWidth(elementRef?.current?.offsetWidth ?? 0)
    setColumns(Math.max(Math.floor(elementRef?.current?.offsetWidth / 350), 1))
  }
  useEffect(() => {
    compute()
    function handleResize() {
      compute()
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <Stack ref={elementRef} flex={1} width="100%" ai="center" jc={'center'} maxWidth={1400}>
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
