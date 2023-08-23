import { Stack } from 'expo-router'
import { ProductDetailScreen } from 'app/features/products/ProductDetailScreen'
import { Text } from 'react-native'
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
