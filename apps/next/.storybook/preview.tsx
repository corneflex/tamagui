import { useColorScheme } from 'react-native'
import { TamaguiProvider, Theme } from 'tamagui'
import config from '../tamagui.config'

/** @type { import('@storybook/react').Preview } */
const preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
}

export default preview

export const decorators = [
  (Story) => {
    const colorScheme = useColorScheme()
    return (
      <TamaguiProvider config={config}>
        <Theme name={colorScheme === 'dark' ? 'dark' : 'light'}>
          <Story />
        </Theme>
      </TamaguiProvider>
    )
  },
]
