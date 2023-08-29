import { ProductsScreen } from 'app/features/products'
import { Stack } from 'expo-router'
import Head from 'expo-router/head'

export default function Page() {
  return (
    <>
      <Stack.Screen
        options={{
          title: 'Products',
        }}
      />
      <ProductsScreen />
    </>
  )
}
