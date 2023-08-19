import { fetcher } from '@corneflex/compose-core'
import { createParam } from 'solito/build'
import { useLink } from 'solito/link'
import { useRouter } from 'solito/router'
import useSWR from 'swr'
import { YStack, Text } from 'tamagui'
import { ProductDetail } from './ProductDetail'
import { productMapper } from './product.mapper'
import { ProductCard } from './ProductCard'
import { ScrollView } from 'react-native'
import { useProduct } from './hooks/useProduct'

const { useParam } = createParam<{ id: string }>()

export const ProductDetailScreen = () => {
  const [id] = useParam('id')
  const link = useLink({
    href: '/',
  })

  const { push, replace, back, parseNextPath } = useRouter()
  const { product, error, isLoading } = useProduct(id)

  if (isLoading)
    return (
      <YStack f={1} jc="center" ai="center">
        <Text>Loading....</Text>
      </YStack>
    )
  if (error) return <Text>Error</Text>

  return (
    <YStack f={1} jc="center" ai="center">
      <ScrollView>
        <ProductCard product={product} href="/products"></ProductCard>
      </ScrollView>
    </YStack>
  )
}
