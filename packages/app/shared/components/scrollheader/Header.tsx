import { Children } from '@corneflex/compose-core'
import { StackProps, XStack, XStackProps, YStack, YStackProps } from '@corneflex/ui'
import React, { cloneElement } from 'react'
import { Animated } from 'react-native'

const TOP_BAR_HEIGHT = 50
type ScrollProps<T> = T & { scrollOffset?: Animated.Value; headerHeight?: number }

const AnimatedYStack = Animated.createAnimatedComponent(YStack)
const AnimatedXStack = Animated.createAnimatedComponent(XStack)

export interface HeaderProps extends StackProps {
  height?: number
  topBarHeight?: number
  scrollOffset: Animated.Value
  children?: React.ReactNode | React.ReactNode[]
}

export const Header: React.FC<HeaderProps> & HeaderComponents = ({
  scrollOffset,
  height = 200,
  topBarHeight = TOP_BAR_HEIGHT,
  children,
  ...props
}) => {
  const headerSub = Children.getSubComponents(children, Header)

  const bannerHeight = height + topBarHeight

  const scale = scrollOffset.interpolate({
    inputRange: [-100, 0],
    outputRange: [1.2, 1],
    extrapolate: 'clamp',
  })

  const top = scrollOffset.interpolate({
    inputRange: [0, height],
    outputRange: [0, -height],
    extrapolate: 'clamp',
  })

  return (
    <AnimatedYStack
      f={1}
      {...props}
      backgroundColor={'$background'}
      style={[{ top, transform: [{ scale }] }]}
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

const Content: React.FC<ScrollProps<YStackProps>> = ({
  scrollOffset,
  headerHeight: height,
  children,
  style,
  ...props
}) => {
  const headerOpacity = scrollOffset?.interpolate({
    inputRange: [0, height ?? 0],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  })

  return (
    <AnimatedYStack f={1} ai="center" style={[style, { opacity: headerOpacity }]} {...props}>
      {children}
    </AnimatedYStack>
  )
}

Header.Content = Content

type HeaderComponents = {
  TopBar: typeof TopBar
  Content: typeof Content
}
