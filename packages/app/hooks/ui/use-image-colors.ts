import React from 'react'
import { getColors } from 'react-native-image-colors'

type ImageColors = {
  lightVibrant: string
  dominant: string
  vibrant: string
  darkVibrant: string
  rawResult: string
}

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

export const useImageColors = (url): ImageColors => {
  const [colors, setColors] = React.useState<ImageColors>({lightVibrant:"#ffffff",dominant:"#ffffff",vibrant:"#ffffff",darkVibrant:"#ffffff",rawResult:""})

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
