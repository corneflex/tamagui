'use client'
import { ProductsScreen } from 'app/features/products'
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
