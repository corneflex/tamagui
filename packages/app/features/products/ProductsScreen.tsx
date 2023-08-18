import { Text, Button, Paragraph, Theme, YStack, Stack } from '@corneflex/ui'
import { ChevronLeft } from '@tamagui/lucide-icons'
import React from 'react'
import { useLink } from 'solito/link'
import { Products } from './Products'
import { productMapper } from './product.mapper'
import useSWR, { preload } from 'swr'
import { fetcher } from '@corneflex/compose-core'
import { useProducts } from './hooks/useProducts'

export function ProductsScreen() {
  const link = useLink({
    href: '/',
  })
  const { products, error, isLoading } = useProducts()

  if (isLoading)
    return (
      <YStack f={1} jc="center" ai="center">
        <Text>Loading....</Text>
      </YStack>
    )
  if (error) return <Text>Error</Text>

  return (
    <YStack f={1} jc="center" ai="center" space>
      <Products
        products={products}
        preload={(product) =>
          preload(`https://world.openfoodfacts.org/api/v2/product/${product.id}`, fetcher)
        }
      ></Products>
      <Button {...link} icon={ChevronLeft}>
        Go Home
      </Button>
    </YStack>
  )
}
