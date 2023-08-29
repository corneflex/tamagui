'use client'
import Head from 'next/head'
import { ProductDetailScreen } from 'app/features/productDetail'
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
