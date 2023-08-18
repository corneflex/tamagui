import { Card, H3, H4, Paragraph, Stack, XStack, YStack } from '@corneflex/ui'
import { LinearGradient } from '@tamagui/linear-gradient'
import { useImageColors } from 'app/hooks/use-image-colors'
import React from 'react'
import { Image, Text } from 'tamagui'
import { Images } from '../../images'
import { Product } from 'app/model/Product'
import { useLink } from 'solito/link'

export interface ProductCardProps {
  product: Product
  href: string
  as?: string
}

export const ProductCard: React.FC<ProductCardProps> = ({ href, as, product }) => {
  // const colors = useImageColors(product?.selected_images?.front.display.fr)
  const NutriScore = Images.nutriscore[product?.nutriscore ?? ''] ?? null
  const EcoScore = Images.ecoscore[product?.ecoscore ?? ''] ?? null
  const Nova = Images.nova[product?.novaGroup ?? ''] ?? null
  const linkProps = useLink({
    href,
    as,
  })

  if (!product) return null
  return (
    <Card
      elevate
      size="$2"
      bordered
      borderRadius={20}
      width={350}
      borderWidth="$1"
      overflow="hidden"
      backgroundColor="$background"
      hoverTheme
      {...linkProps}
    >
      <Card.Header padded flex={1} jc="center">
        <XStack width={'100%'} flex={1} space>
          <Stack jc="center" ai="center" height={'100%'}>
            {
              <Image
                margin="$2"
                borderRadius={10}
                overflow="hidden"
                source={{
                  uri: product.image?.url,
                  width: (product.image?.width ?? 0) * 0.4 ?? 200,
                  height: (product.image?.height ?? 0) * 0.4 ?? 200,
                }}
              />
            }
          </Stack>
          <YStack f={1} width={'100%'}>
            <XStack width={'100%'} height={50} jc="flex-end" space={5} ai="center">
              {NutriScore && <NutriScore width={70} height={'100%'}></NutriScore>}
              {EcoScore && <EcoScore width={60} height={'100%'}></EcoScore>}
              {Nova && <Nova width={15} height={'100%'}></Nova>}
            </XStack>
            <XStack flex={1} space flexWrap="wrap" jc="center" ai="center">
              <YStack f={1}>
                <Stack maxWidth={250}>
                  <H3 numberOfLines={4}>{product.name}</H3>
                  <Text theme="alt1">{product.brands}</Text>
                </Stack>
              </YStack>
            </XStack>
          </YStack>
        </XStack>
        <Paragraph mt="$3" size={'$2'}>
          {product.description}
        </Paragraph>
      </Card.Header>
    </Card>
  )
}
