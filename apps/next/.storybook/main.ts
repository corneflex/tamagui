import { join, dirname } from 'path'
import svgr from 'vite-plugin-svgr'

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value) {
  return dirname(require.resolve(join(value, 'package.json')))
}

const config = {
  stories: ['../stories/**/*.mdx', '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    getAbsolutePath('@storybook/addon-links'),
    getAbsolutePath('@storybook/addon-essentials'),
    getAbsolutePath('@storybook/addon-onboarding'),
    getAbsolutePath('@storybook/addon-interactions'),
  ],
  framework: {
    name: getAbsolutePath('@storybook/react-vite'),
    options: {},
  },
  viteFinal: async (config, { configType }) => {
    const { tamaguiPlugin } = require('@tamagui/vite-plugin')

    config.resolve.alias = {
      ...config.resolve.alias,
      'react-native-svg': 'react-native-svg-web',
      recyclerlistview: 'recyclerlistview/web',
    }

    config.plugins.push(
      tamaguiPlugin({
        config: '../tamagui.config.ts',
        components: ['tamagui'],
      })
    )

    config.plugins.push(svgr())

    return config
  },
  env: (config) => ({
    ...config,
    TAMAGUI_TARGET: 'web',
  }),
}
export default config
