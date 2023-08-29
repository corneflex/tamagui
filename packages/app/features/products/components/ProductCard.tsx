import { Card, H3, Image, Paragraph, Stack, Text, XStack, YStack } from '@corneflex/ui'
import { Product } from 'app/models/Product'
import React from 'react'
import { EcoScore, NovaGroup, NutriScore } from '../../../shared/components/scores'

export interface ProductCardProps {
  width?: string | number
  height?: string | number
  product: Product
  onClick?: () => void
}

export const ProductCard: React.FC<any> = ({ width, height, product, ...props }) => {
  // const colors = useImageColors(product?.selected_images?.front.display.fr)
  const thumb = product?.image?.thumb
  const imageWidth = thumb?.width ?? 200
  const imageHeight = thumb?.height ?? 200

  if (!product) return null
  return (
    <Card
      f={1}
      elevate
      size="$2"
      bordered
      borderRadius={20}
      borderWidth="$1"
      overflow="hidden"
      backgroundColor="$background"
      hoverTheme
      width={width}
      height={height}
      {...props}
    >
      <Card.Header padded flex={1} jc="center">
        <XStack width={'100%'} flex={1} space>
          <Stack jc="center" ai="center" height={'100%'} minWidth={imageWidth + 20}>
            {
              <Image
                margin="$2"
                borderRadius={10}
                overflow="hidden"
                source={{
                  uri: thumb?.url,
                  width: imageWidth,
                  height: imageHeight,
                }}
              />
            }
          </Stack>
          <YStack f={1} width={'100%'}>
            <XStack space="$1" jc="flex-end">
              <NutriScore size={70} value={product?.nutriscore}></NutriScore>
              <EcoScore size={70} value={product?.ecoscore}></EcoScore>
              <NovaGroup size={70} value={product?.novaGroup}></NovaGroup>
            </XStack>
            <XStack flex={1} space flexWrap="wrap" jc="center" ai="center">
              <YStack f={1}>
                <Stack maxWidth={250}>
                  <H3 numberOfLines={2}>{product.name}</H3>
                  <Text theme="alt1">{product.brands}</Text>
                </Stack>
              </YStack>
            </XStack>
          </YStack>
        </XStack>
        <Paragraph size={'$2'} minHeight={35} numberOfLines={2}>
          {product.description}
        </Paragraph>
      </Card.Header>
    </Card>
  )
}
