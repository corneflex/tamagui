import { H3, Image, Stack, YStack } from '@corneflex/ui'
import { useState } from 'react'
import { Header } from '../../../components/scrollheader/Header.native'
import { ScrollHeader } from '../../../components/scrollheader'
import { Product } from '../../../model/Product'
import { NutrimentsGauges } from '../NutrimentGauges/NutrimentsGauges'
import { NutriScore } from '../scores/NutriScore'

export interface ProductDetailProps {
  product?: Product
}

export const ProductDetail = ({ product }: ProductDetailProps) => {
  const [on, setOn] = useState(false)

  if (!product) return null

  const image = product.image.small
  const imageHeight = image.height * 0.9
  const imageWidth = image.width * 0.9
  const gaugeSize = 90
  const bannerHeight = imageHeight + gaugeSize

  return (
    <ScrollHeader
      height={bannerHeight}
      topBarHeight={50}
      onScrollEndDrag={(event) => {
        if (event.nativeEvent.contentOffset.y < 0) setOn(!on)
      }}
    >
      <Header.Title>
        <H3 f={1} ellipse ml="$2">
          {product.name}
        </H3>
        <NutriScore size={90} value={product?.nutriscore}></NutriScore>
      </Header.Title>
      <Header.Content>
        <YStack ai="center" jc="center">
          <Image
            resizeMode="contain"
            borderRadius={10}
            source={{
              uri: image.url,
              width: imageWidth,
              height: imageHeight,
            }}
          ></Image>
          <NutrimentsGauges
            mt={-30}
            p={5}
            borderRadius={10}
            size={gaugeSize}
            overflow="hidden"
            fat={product.saturedFat}
            sugar={product.sugar}
            protein={product.protein}
            onPress={() => setOn(!on)}
            key={on + ''}
          ></NutrimentsGauges>
        </YStack>
      </Header.Content>
      <ScrollHeader.ScrollContent>
        <Stack height={10000}></Stack>
      </ScrollHeader.ScrollContent>
    </ScrollHeader>
  )
}
