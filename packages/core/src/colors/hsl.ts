function toHSLObject(hslStr) {
  const regex = /hsl\(\s*([\d.]+),\s*([\d.]+)%?,\s*([\d.]+)%?\)/i
  const match = hslStr.match(regex)

  if (!match) {
    throw new Error('Invalid HSL string format')
  }

  return {
    hue: parseFloat(match[1]),
    saturation: parseFloat(match[2]),
    lightness: parseFloat(match[3]),
  }
}

export const hslToHex = (h: number, s: number, l: number): string => {
  l /= 100
  const a = (s * Math.min(l, 1 - l)) / 100
  const f = (n) => {
    const k = (n + h / 30) % 12
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, '0') // convert to Hex and prefix "0" if needed
  }
  return `#${f(0)}${f(8)}${f(4)}`
}

export const convertHslToHex = (hslStr: string) => {
  const { hue, saturation, lightness } = toHSLObject(hslStr)
  return hslToHex(hue, saturation, lightness)
}
