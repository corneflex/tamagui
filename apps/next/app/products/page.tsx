'use client'
import { ProductsScreen } from 'app/features/products/ProductsScreen'
import Head from 'next/head'

export function Producs() {
  return (
    <>
      <Head>
        <title>Products</title>
      </Head>
      <ProductsScreen />
    </>
  )
}

export default Producs
