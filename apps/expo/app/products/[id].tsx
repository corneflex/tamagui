import { Stack } from 'expo-router'
import { ProductDetailScreen } from 'app/features/products/ProductDetailScreen'

export default function Screen() {
  return (
    <>
      <Stack.Screen
        options={{
          title: 'Product Detail',
        }}
      />
      <ProductDetailScreen />
    </>
  )
}
