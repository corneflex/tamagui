import { ProductDetailScreen } from 'app/features/products/ProductDetailScreen'
import { Stack } from 'expo-router'
export default function Page() {
  return (
    <>
      <Stack.Screen
        options={{
          title: 'Détails',
        }}
      />
      <ProductDetailScreen />
    </>
  )
}
