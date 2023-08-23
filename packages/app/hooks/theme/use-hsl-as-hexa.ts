import { convertHslToHex } from '@corneflex/compose-core'
import { useMemo } from 'react'

export const useHslAsHexa = (hsl: string): string => {
  const hex = useMemo(() => convertHslToHex(hsl), [hsl])
  return hex
}
