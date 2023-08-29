import { ProductDetailScreen } from 'app/features/productDetail'
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
