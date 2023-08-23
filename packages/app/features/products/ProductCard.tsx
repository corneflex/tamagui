import { Card, H3, Paragraph, Stack, XStack, YStack, Image, Text } from '@corneflex/ui'
import { Link } from 'solito/link'
import { Product } from 'app/model/Product'
import React from 'react'
import { Images } from '../../images'

export interface ProductCardProps {
  width?: string | number
  height?: string | number
  product: Product
  href?: string
  onClick?: () => void
}

export const ProductCard: React.FC<any> = ({
  width = 350,
  height = 300,
  product,
  href,
  ...props
}) => {
  // const colors = useImageColors(product?.selected_images?.front.display.fr)
  const NutriScore = Images.nutriscore[product?.nutriscore ?? ''] ?? null
  const EcoScore = Images.ecoscore[product?.ecoscore ?? ''] ?? null
  const Nova = Images.nova[product?.novaGroup ?? ''] ?? null
  const thumb = product?.image?.thumb
  const imageWidth = thumb?.width ?? 200
  const imageHeight = thumb?.height ?? 200

  if (!product) return null
  return (
    <Link href={href}>
      <Card
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
    </Link>
  )
}
