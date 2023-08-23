import { createParam } from 'solito/build'
import { useLink } from 'solito/link'
import { Text, YStack } from '@corneflex/ui'
import { ProductDetail } from './ProductDetail'
import { useProduct } from './hooks/useProduct'

const { useParam } = createParam<{ id: string }>()

export const ProductDetailScreen = () => {
  const [id] = useParam('id')
  const link = useLink({
    href: '/',
  })

  const { data: product, error, isLoading } = useProduct(id)

  if (isLoading)
    return (
      <YStack f={1} jc="center" ai="center">
        <Text>Loading....</Text>
      </YStack>
    )
  if (error) return <Text>Error</Text>

  return (
    <YStack f={1}>
      <ProductDetail product={product}></ProductDetail>
    </YStack>
  )
}
