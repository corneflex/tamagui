import { Children } from '@corneflex/compose-core'
import { Stack, XStackProps } from '@corneflex/ui'
import { ScrollViewProps, StyleSheet } from 'react-native'
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated'
import { Header } from './Header.native'

export interface ScrollHeaderProps extends ScrollViewProps {
  height?: number
  topBarHeight?: number
  children: React.ReactNode
}

export const ScrollHeader: React.FC<ScrollHeaderProps> & ScrollHeaderComponents = ({
  height = 100,
  topBarHeight = 50,
  children,
  ...props
}) => {
  const scrollOffset = useSharedValue(0)
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollOffset.value = event.contentOffset.y
    },
  })
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
        scrollOffset={scrollOffset}
      >
        {children}
      </Header>
      <Animated.ScrollView style={StyleSheet.absoluteFill} onScroll={scrollHandler} {...props}>
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
