import { Button, Text, YStack } from '@corneflex/ui'
import { ChevronLeft } from '@tamagui/lucide-icons'
import React from 'react'
import { useLink } from 'solito/link'
import { Products } from './Products'
import { preloadProduct } from './hooks/useProduct'
import { useProducts } from './hooks/useProducts'

export function ProductsScreen() {
  const link = useLink({
    href: '/',
  })

  const { data:products, error, isLoading } = useProducts()
  console.log('>>> Products')
  if (isLoading)
    return (
      <YStack f={1} jc="center" ai="center">
        <Text>Loading....</Text>
      </YStack>
    )
  if (error) return <Text>Error</Text>

  return (
    <YStack f={1} jc="center" ai="center" space>
      <Products products={products} preload={(product) => preloadProduct(product.id)}></Products>
      <Button {...link} icon={ChevronLeft}>
        Go Home
      </Button>
    </YStack>
  )
}
