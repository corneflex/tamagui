import { Card, Stack, YStack, useMedia, H3, XStack } from '@corneflex/ui'
import { useState } from 'react'
import { StyleSheet } from 'react-native'
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated'
import { Header } from '../../../components/header/Header'
import { Product } from '../../../model/Product'
import { NutrimentsGauges } from '../NutrimentGauges/NutrimentsGauges'
import { NutriScore } from '../scores/NutriScore'

export interface ProductDetailProps {
  product?: Product
}

export const ProductDetail = ({ product }: ProductDetailProps) => {
  const scrollOffset = useSharedValue(0)
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollOffset.value = event.contentOffset.y
    },
  })
  const [on, setOn] = useState(false)

  const media = useMedia()

  if (!product) return null

  return (
    <Stack f={1}>
      <Header
        f={1}
        width={'100%'}
        jc="center"
        position="absolute"
        image={product?.image?.small}
        title={product.name}
        subtitle={product.brands}
        scrollOffset={scrollOffset}
      >
        <Header.Title>
          <H3 f={1} ellipse>
            {product.name}
          </H3>
          <NutriScore size={90} value={product?.nutriscore}></NutriScore>
        </Header.Title>
      </Header>
      <Animated.ScrollView
        style={StyleSheet.absoluteFill}
        onScroll={scrollHandler}
        onScrollEndDrag={(event) => {
          if ((event.nativeEvent?.contentOffset?.y ?? 0) < 0) setOn(!on)
        }}
      >
        <Stack height={Math.max(product?.image?.small.height ?? 0, 150)}></Stack>
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
              <YStack f={1} ai="center" jc="center" overflow="hidden">
                <NutrimentsGauges
                  width={'100%'}
                  size={media.sm ? 90 : 150}
                  overflow="hidden"
                  fat={product.saturedFat}
                  sugar={product.sugar}
                  protein={product.protein}
                  onPress={() => setOn(!on)}
                  key={on + ''}
                ></NutrimentsGauges>
              </YStack>
            </Stack>
          </Card.Header>
          <Card.Background></Card.Background>
        </Card>
        <Stack height={10000}></Stack>
      </Animated.ScrollView>
    </Stack>
  )
}
