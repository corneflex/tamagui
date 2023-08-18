import { ProductsScreen } from 'app/features/products/ProductsScreen'
import Head from 'next/head'

export default function Page() {
  return (
    <>
      <Head>
        <title>Products</title>
      </Head>
      <ProductsScreen />
    </>
  )
}
