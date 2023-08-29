import { ChevronLeft } from '@tamagui/lucide-icons'
import debounce from 'lodash/debounce'
import React from 'react'
import { useLink } from 'solito/navigation'
import { Button, Spinner, Text, YStack } from 'tamagui'
import { useEndOfScroll } from '../../../hooks/ui/use-end-of-scroll/'
import { preloadProduct } from '../../productDetail/hooks/useProduct'
import { useProducts } from '../hooks/useProducts'
import { Products } from './Products'

export function ProductsScreen() {
  const link = useLink({
    href: '/',
  })

  const { data: products, error, isLoading, isValidating, size, setSize } = useProducts()
  const loadMore = debounce(function () {
    setSize(size + 1)
  }, 1000)
  useEndOfScroll(() => {
    //loadMore()
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
      <Products
        products={products}
        preload={(product) => preloadProduct(product.id)}
        onEndReached={loadMore}
      ></Products>
      {isValidating && <Spinner size="large"></Spinner>}
      <Button {...link} icon={ChevronLeft}>
        Go Home
      </Button>
    </YStack>
  )
}
