import { Button, Text, YStack, Spinner } from 'tamagui'
import { ChevronLeft } from '@tamagui/lucide-icons'
import React, { useState } from 'react'
import { useLink } from 'solito/link'
import { Products } from './Products'
import { preloadProduct } from './hooks/useProduct'
import { useProducts } from './hooks/useProducts'
import { useEndOfScroll } from '../../hooks/ui/use-end-of-scroll/'
import debounce from 'lodash/debounce'

export function ProductsScreen() {
  const link = useLink({
    href: '/',
  })

  const { data: products, error, isLoading, isValidating, size, setSize } = useProducts()
  const loadMore = debounce(function () {
    setSize(size + 1)
  }, 1000)
  useEndOfScroll(() => {
    loadMore()
  })

  if (isLoading)
    return (
      <YStack f={1} jc="center" ai="center">
        <Text>Loading....</Text>
        <Spinner size="large"></Spinner>
      </YStack>
    )
  if (error) return <Text>Error</Text>

  return (
    <YStack f={1} jc="center" ai="center" space>
      <Products products={products} preload={(product) => preloadProduct(product.id)}></Products>
      {isValidating && <Spinner size="large"></Spinner>}
      <Button {...link} icon={ChevronLeft}>
        Go Home
      </Button>
    </YStack>
  )
}
