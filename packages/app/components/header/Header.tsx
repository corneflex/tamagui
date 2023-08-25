import { Children } from '@corneflex/compose-core'
import {
  StackProps,
  Image as TamaImage,
  XStack,
  XStackProps,
  YStackProps,
  YStack,
} from '@corneflex/ui'
import React from 'react'
import Animated, { Extrapolation, interpolate, useAnimatedStyle } from 'react-native-reanimated'
import { Image } from '../../model/Image'

const TOP_BAR_HEIGHT = 50

export interface HeaderProps extends StackProps {
  image?: Image
  title?: string
  subtitle?: string
  scrollOffset?: Animated.SharedValue<number>
  topBarHeight?: number
  children: React.ReactNode | React.ReactNode[]
}

export const Header: React.FC<HeaderProps> & HeaderComponents = ({
  image,
  title,
  subtitle,
  scrollOffset,
  topBarHeight = TOP_BAR_HEIGHT,
  children,
  ...props
}) => {
  const headerSub = Children.getSubComponents<HeaderComponents>(children, Header)

  const imageWidth = image?.width ?? 0
  const imageHeight = Math.max(image?.height ?? 0, 100)
  const bannerHeight = Math.max(imageHeight, 100) + TOP_BAR_HEIGHT

  const scrollDownStyle = useAnimatedStyle(() => {
    const scale = interpolate(scrollOffset?.value ?? 0, [-100, 0], [1.2, 1], {
      extrapolateLeft: Extrapolation.CLAMP,
      extrapolateRight: Extrapolation.CLAMP,
    })

    const top = interpolate(
      scrollOffset?.value ?? 0,
      [0, bannerHeight - TOP_BAR_HEIGHT],
      [0, -bannerHeight + TOP_BAR_HEIGHT],
      {
        extrapolateRight: Extrapolation.CLAMP,
      }
    )

    return { top, transform: [{ scale }] }
  }, [])

  const opacityStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollOffset?.value ?? 0,
      [0, bannerHeight - TOP_BAR_HEIGHT],
      [1, 0],
      {
        extrapolateLeft: Extrapolation.CLAMP,
        extrapolateRight: Extrapolation.CLAMP,
      }
    )

    return { opacity }
  }, [])

  const AnimatedYStack = Animated.createAnimatedComponent(YStack)
  const AnimatedXStack = Animated.createAnimatedComponent(XStack)

  return (
    <AnimatedYStack
      ai="center"
      jc="center"
      f={1}
      zIndex={20}
      {...props}
      backgroundColor={'$background'}
      style={[scrollDownStyle]}
    >
      <AnimatedXStack
        f={1}
        height={imageHeight}
        ai="center"
        space
        flexDirection="row-reverse"
        style={[opacityStyle]}
      >
        <XStack mr="$2">
          <TamaImage
            resizeMode="contain"
            borderRadius={10}
            source={{
              uri: image?.url,
              width: imageWidth * 0.9,
              height: imageHeight * 0.9,
            }}
          ></TamaImage>
        </XStack>
        {headerSub.Content}
      </AnimatedXStack>
      {headerSub.Title}
    </AnimatedYStack>
  )
}

const Title: React.FC<XStackProps> = ({ children, ...props }) => (
  <XStack height={TOP_BAR_HEIGHT} ai="center" width={'100%'} {...props}>
    {children}
  </XStack>
)

Header.Title = Title

const Content: React.FC<YStackProps> = ({ children, ...props }) => (
  <YStack f={1} ai="center" jc={'center'} backgroundColor={'yellow'} {...props}>
    {children}
  </YStack>
)

Header.Content = Content

type HeaderComponents = {
  Title: typeof Title
  Content: typeof Content
}
