import { Card, H3, H4, Image, ScrollView, XStack, YStack, Stack, useMedia } from '@corneflex/ui'
import { Animated } from 'react-native'
import { Images } from '../../images'
import { Product } from '../../model/Product'
import { NutrimentsGauges } from './gauges/NutrimentsGauges'
import { Header } from '../../components/header/Header'

export interface ProductDetailProps {
  product?: Product
}

export const ProductDetail = ({ product }: ProductDetailProps) => {
  const fatValue = new Animated.Value(0)

  const NutriScore = Images.nutriscore[product?.nutriscore ?? ''] ?? null
  const EcoScore = Images.ecoscore[product?.ecoscore ?? ''] ?? null
  const Nova = Images.nova[product?.novaGroup ?? ''] ?? null

  const media = useMedia()
  const cover = media.sm ? product?.image?.small : product?.image?.cover

  if (!product) return null

  const nutriments = [
    {
      name: 'protein',
      range: [0, 15, 20, 16],
    },
  ]

  return (
    <ScrollView>
      <Card overflow="hidden" margin="$4">
        <Card.Header f={1}>
          <Stack
            f={1}
            space
            ai="center"
            flexDirection="column"
            $gtSm={{ flexDirection: 'row' }}
            $gtMd={{ flexDirection: 'row' }}
          >
            <Header image={cover} title={product.name} subtitle={product.brands}></Header>

            <YStack f={1} ai="center" jc="center" overflow="hidden">
              <YStack>
                <YStack>
                  <XStack width={'100%'} height={100} space={'$2'}>
                    {NutriScore && <NutriScore width={80} height={'100%'}></NutriScore>}
                    {EcoScore && <EcoScore width={75} height={'100%'}></EcoScore>}
                    {Nova && <Nova width={24} height={'100%'}></Nova>}
                  </XStack>
                </YStack>
              </YStack>
              <NutrimentsGauges
                width={'100%'}
                size={media.sm ? 90 : 150}
                overflow="hidden"
                fat={product.saturedFat}
                sugar={product.sugar}
                protein={product.protein}
              ></NutrimentsGauges>
            </YStack>
          </Stack>
        </Card.Header>
      </Card>
    </ScrollView>
  )
}
