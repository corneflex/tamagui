'use client'
import { Card, Stack, XStack, YStack, useMedia } from '@corneflex/ui'
import { Header } from '../../../components/scrollheader/Header.native'
import { Images } from '../../../images'
import { Product } from '../../../model/Product'
import { NutrimentsGauges } from '../NutrimentGauges/NutrimentsGauges'

export interface ProductDetailProps {
  product?: Product
}

export const ProductDetail = ({ product }: ProductDetailProps) => {
  const NutriScore = Images.nutriscore[product?.nutriscore ?? ''] ?? null
  const EcoScore = Images.ecoscore[product?.ecoscore ?? ''] ?? null
  const Nova = Images.nova[product?.novaGroup ?? ''] ?? null
  const media = useMedia()

  if (!product) return null

  return (
    <Stack f={1}>
      {media.md && (
        <Header
          width={'100%'}
          jc="center"
          image={product?.image?.small}
          title={product.name}
          subtitle={product.brands}
        ></Header>
      )}
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
            {media.gtMd && (
              <Header
                image={product?.image?.cover}
                title={product.name}
                subtitle={product.brands}
              ></Header>
            )}
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
      <Stack height={1000}></Stack>
    </Stack>
  )
}
