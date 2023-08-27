import { Children } from '@corneflex/compose-core'
import { Stack, XStackProps } from '@corneflex/ui'
import { ScrollViewProps, StyleSheet, Animated } from 'react-native'
import { Header } from './Header'
import { useState } from 'react'

export interface ScrollHeaderProps extends ScrollViewProps {
  height?: number
  topBarHeight?: number
  children: React.ReactNode
}

const { Value, event, createAnimatedComponent } = Animated

export const ScrollHeader: React.FC<ScrollHeaderProps> & ScrollHeaderComponents = ({
  height = 100,
  topBarHeight = 50,
  children,
  ...props
}) => {
  const [animatedScrollIndex] = useState(new Value(0))
  const scrollComponents = Children.getSubComponents<ScrollHeaderComponents>(children, ScrollHeader)
  return (
    <Stack f={1}>
      <Header
        f={1}
        width={'100%'}
        jc="center"
        position="absolute"
        height={height}
        topBarHeight={topBarHeight}
        scrollOffset={animatedScrollIndex}
      >
        {children}
      </Header>
      <Animated.ScrollView
        style={StyleSheet.absoluteFill}
        scrollEventThrottle={16}
        onScroll={event([
          {
            nativeEvent: {
              contentOffset: {
                y: animatedScrollIndex,
              },
            },
          },
        ])}
        {...props}
      >
        <Stack height={height + topBarHeight}></Stack>
        <>{scrollComponents.ScrollContent}</>
      </Animated.ScrollView>
    </Stack>
  )
}

const ScrollContent: React.FC<XStackProps> = ({ children, ...props }) => {
  return <Stack {...props}>{children}</Stack>
}

ScrollHeader.ScrollContent = ScrollContent

type ScrollHeaderComponents = {
  ScrollContent: typeof ScrollContent
}
