import React from 'react'
import { getColors } from 'react-native-image-colors'

function mapColors(colors, setColors) {
  switch (colors.platform) {
    case 'android':
    case 'web':
      setColors({
        lightVibrant: colors.lightVibrant,
        dominant: colors.dominant,
        vibrant: colors.vibrant,
        darkVibrant: colors.darkVibrant,
        rawResult: JSON.stringify(colors),
      })
      break
    case 'ios':
      setColors({
        lightVibrant: colors.background,
        dominant: colors.detail,
        vibrant: colors.primary,
        darkVibrant: colors.secondary,
        rawResult: JSON.stringify(colors),
      })
      break
    default:
      throw new Error('Unexpected platform')
  }
}

export const useImageColors = (url): any => {
  const [colors, setColors] = React.useState(null)

  React.useEffect(() => {
    if (url)
      getColors(url, {
        fallback: '#ffffff',
        cache: true,
        key: url,
      }).then((c) => {
        mapColors(c, setColors)
      })
  }, [url])

  return colors
}
