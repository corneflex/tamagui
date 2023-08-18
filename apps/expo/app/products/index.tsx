import { ProductsScreen } from 'app/features/products/ProductsScreen'
import { Stack } from 'expo-router'

export default function Screen() {
  return (
    <>
      <Stack.Screen
        options={{
          title: 'User',
        }}
      />
      <ProductsScreen />
    </>
  )
}
