import { ScrollView } from 'react-native'
import { createParam } from 'solito/build'
import { useLink } from 'solito/link'
import { useRouter } from 'solito/router'
import { Text, YStack } from 'tamagui'
import { ProductCard } from './ProductCard'
import { useProduct } from './hooks/useProduct'

const { useParam } = createParam<{ id: string }>()

export const ProductDetailScreen = () => {
  const [id] = useParam('id')
  const link = useLink({
    href: '/',
  })

  const { back } = useRouter()
  const { data: product, error, isLoading } = useProduct(id)

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
        <ProductCard product={product}></ProductCard>
      </ScrollView>
    </YStack>
  )
}
