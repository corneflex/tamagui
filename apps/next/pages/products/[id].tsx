import Head from 'next/head'
import { ProductDetailScreen } from 'app/features/products/ProductDetailScreen'
export default function Page() {
  return (
    <>
      <Head>
        <title>Product</title>
      </Head>
      <ProductDetailScreen />
    </>
  )
}
