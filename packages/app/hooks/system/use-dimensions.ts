import { useState, useEffect } from 'react'
import { Dimensions as ReactDimensions, ScaledSize } from 'react-native'

const windowDimensions = ReactDimensions.get('window')
const screenDimensions = ReactDimensions.get('screen')

export interface Dimensions {
  window: ScaledSize
  screen: ScaledSize
}

export const useDimensions = () => {
  const [dimensions, setDimensions] = useState<Dimensions>({
    window: windowDimensions,
    screen: screenDimensions,
  })

  useEffect(() => {
    const subscription = ReactDimensions.addEventListener('change', ({ window, screen }) => {
      setDimensions({ window, screen })
    })
    return () => subscription?.remove()
  })
  return dimensions
}
