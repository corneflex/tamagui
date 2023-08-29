import { Children } from '@corneflex/compose-core'
import { StackProps, XStack, XStackProps, YStack, YStackProps } from '@corneflex/ui'
import React, { cloneElement } from 'react'
import Animated, {
  AnimateProps,
  Extrapolation,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated'

const TOP_BAR_HEIGHT = 50

export interface HeaderProps extends StackProps {
  height?: number
  topBarHeight?: number
  scrollOffset?: Animated.SharedValue<number>
  children?: React.ReactNode | React.ReactNode[]
}

const AnimatedYStack = Animated.createAnimatedComponent(YStack)

type ScrollProps<T> = T & { scrollOffset?: Animated.SharedValue<number>; headerHeight?: number }

export const Header: React.FC<HeaderProps> & HeaderComponents = ({
  scrollOffset,
  height = 200,
  topBarHeight = TOP_BAR_HEIGHT,
  children,
  ...props
}) => {
  const headerSub = Children.getSubComponents(children, Header)

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

  return (
    <AnimatedYStack
      f={1}
      {...props}
      backgroundColor={'$background'}
      style={[scrollDownStyle]}
      height={bannerHeight}
    >
      {cloneElement(headerSub.Content, { scrollOffset, headerHeight: height })}
      <YStack height={topBarHeight}>{headerSub.TopBar}</YStack>
    </AnimatedYStack>
  )
}

const TopBar: React.FC<XStackProps> = ({ children, ...props }) => (
  <XStack ai="center" width={'100%'} {...props}>
    {children}
  </XStack>
)

Header.TopBar = TopBar

const Content: React.FC<ScrollProps<AnimateProps<YStackProps>>> = ({
  children,
  headerHeight = 0,
  scrollOffset,
  ...props
}) => {
  const contentStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scrollOffset?.value ?? 0, [0, headerHeight], [1, 0], {
      extrapolateLeft: Extrapolation.CLAMP,
      extrapolateRight: Extrapolation.CLAMP,
    })

    return { opacity }
  }, [])
  return (
    <AnimatedYStack f={1} ai="center" jc="center" style={[contentStyle]} {...props}>
      {children}
    </AnimatedYStack>
  )
}

Header.Content = Content

type HeaderComponents = {
  TopBar: typeof TopBar
  Content: typeof Content
}
