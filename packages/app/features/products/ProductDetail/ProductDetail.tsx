import { H3, Image, Stack } from '@corneflex/ui'
import { LinearGradient } from '@tamagui/linear-gradient'
import { useState } from 'react'
import { StyleSheet, useColorScheme } from 'react-native'
import { ScrollHeader } from '../../../components/scrollheader'
import { Header } from '../../../components/scrollheader/Header'
import { useImageColors } from '../../../hooks/ui/use-image-colors'
import { Product } from '../../../model/Product'
import { NutrimentsGauges } from '../NutrimentGauges/NutrimentsGauges'
import { NutriScore } from '../scores/NutriScore'
export interface ProductDetailProps {
  product?: Product
}

export const ProductDetail = ({ product }: ProductDetailProps) => {
  const [on, setOn] = useState(false)
  const colors = useImageColors(product?.image.small.url)

  if (!product) return null

  const image = product.image.small
  const imageHeight = image.height * 0.9
  const imageWidth = image.width * 0.9
  const gaugeSize = 90
  const MARGIN_TOP = 20
  const bannerHeight = MARGIN_TOP + imageHeight + gaugeSize
  const colorScheme = useColorScheme()

  return (
    <ScrollHeader
      height={bannerHeight}
      topBarHeight={50}
      onScrollEndDrag={(event) => {
        if (event.nativeEvent.contentOffset.y < 0) setOn(!on)
      }}
    >
      <Header.TopBar>
        <H3 f={1} ellipse ml="$2">
          {product.name}
        </H3>
        <NutriScore size={90} value={product?.nutriscore}></NutriScore>
      </Header.TopBar>
      <Header.Content jc="flex-end">
        <LinearGradient
          style={StyleSheet.absoluteFill}
          colors={[
            colorScheme === 'dark' ? colors.darkVibrant : colors.lightVibrant,
            '$background',
          ]}
        />
        <Image
          resizeMode="contain"
          mt={MARGIN_TOP}
          borderRadius={10}
          source={{
            uri: image.url,
            width: imageWidth,
            height: imageHeight,
          }}
        ></Image>
        <NutrimentsGauges
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
      </Header.Content>
      <ScrollHeader.ScrollContent>
        <Stack height={10000}></Stack>
      </ScrollHeader.ScrollContent>
    </ScrollHeader>
  )
}
