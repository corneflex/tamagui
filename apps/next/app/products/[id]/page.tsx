'use client'
import Head from 'next/head'
import { ProductDetailScreen } from 'app/features/products/ProductDetailScreen'
export function ProductDetail() {
  return (
    <>
      <Head>
        <title>Product</title>
      </Head>
      <ProductDetailScreen />
    </>
  )
}

export default ProductDetail
