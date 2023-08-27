import { Children } from '@corneflex/compose-core'
import { StackProps, XStack, XStackProps, YStack, YStackProps } from '@corneflex/ui'
import React from 'react'
import Animated, { Extrapolation, interpolate, useAnimatedStyle } from 'react-native-reanimated'

const TOP_BAR_HEIGHT = 50
const AnimatedYStack = Animated.createAnimatedComponent(YStack)
const AnimatedXStack = Animated.createAnimatedComponent(XStack)

export interface HeaderProps extends StackProps {
  height?: number
  topBarHeight?: number
  scrollOffset?: Animated.SharedValue<number>
  children?: React.ReactNode | React.ReactNode[]
}

export const Header: React.FC<HeaderProps> & HeaderComponents = ({
  scrollOffset,
  height = 200,
  topBarHeight = TOP_BAR_HEIGHT,
  children,
  ...props
}) => {
  const headerSub = Children.getSubComponents<HeaderComponents>(children, Header)

  const bannerHeight = height + topBarHeight

  const scrollDownStyle = useAnimatedStyle(() => {
    const scale = interpolate(scrollOffset?.value ?? 0, [-100, 0], [1.2, 1], {
      extrapolateLeft: Extrapolation.CLAMP,
      extrapolateRight: Extrapolation.CLAMP,
    })

    const top = interpolate(scrollOffset?.value ?? 0, [0, height], [0, -height], {
      extrapolateRight: Extrapolation.CLAMP,
    })

    return { top, transform: [{ scale }] }
  }, [])

  const contentStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scrollOffset?.value ?? 0, [0, height], [1, 0], {
      extrapolateLeft: Extrapolation.CLAMP,
      extrapolateRight: Extrapolation.CLAMP,
    })

    return { opacity }
  }, [])

  return (
    <AnimatedYStack
      f={1}
      zIndex={1}
      {...props}
      backgroundColor={'$background'}
      style={[scrollDownStyle]}
      height={bannerHeight}
    >
      <AnimatedXStack f={1} style={[contentStyle]}>
        {headerSub.Content}
      </AnimatedXStack>
      <YStack height={topBarHeight}>{headerSub.Title}</YStack>
    </AnimatedYStack>
  )
}

const Title: React.FC<XStackProps> = ({ children, ...props }) => (
  <XStack ai="center" width={'100%'} {...props}>
    {children}
  </XStack>
)

Header.Title = Title

const Content: React.FC<YStackProps> = ({ children, ...props }) => (
  <YStack f={1} ai="center" jc={'center'} {...props}>
    {children}
  </YStack>
)

Header.Content = Content

type HeaderComponents = {
  Title: typeof Title
  Content: typeof Content
}
