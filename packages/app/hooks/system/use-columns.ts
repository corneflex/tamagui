import { useState, useEffect } from 'react'
import { Dimensions as ReactDimensions, ScaledSize } from 'react-native'

export interface Size {
  with: number
  height: number
}

export const useColumns = (width: number) => {
  const windowDimensions = ReactDimensions.get('window')
  const [columns, setColumns] = useState(Math.max(Math.floor(windowDimensions.width / width), 1))

  useEffect(() => {
    const subscription = ReactDimensions.addEventListener('change', ({ window }) => {
      setColumns(Math.max(Math.floor(window.width / width), 1))
    })
    return () => subscription?.remove()
  })
  return columns
}
