import { Children } from '@corneflex/compose-core'
import { StackProps, XStack, XStackProps, YStack, YStackProps } from '@corneflex/ui'
import React from 'react'
import { Animated } from 'react-native'

const TOP_BAR_HEIGHT = 50

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
  const headerSub = Children.getSubComponents<HeaderComponents>(children, Header)

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

  const headerOpacity = scrollOffset.interpolate({
    inputRange: [0, height],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  })

  const AnimatedYStack = Animated.createAnimatedComponent(YStack)
  const AnimatedXStack = Animated.createAnimatedComponent(XStack)

  return (
    <AnimatedYStack
      f={1}
      zIndex={1}
      {...props}
      backgroundColor={'$background'}
      style={[{ top, transform: [{ scale }] }]}
      height={bannerHeight}
    >
      <AnimatedXStack f={1} ai="center" style={[{ opacity: headerOpacity }]}>
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
