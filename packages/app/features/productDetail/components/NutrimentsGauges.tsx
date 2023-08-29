import { XStack, XStackProps, useTheme } from '@corneflex/ui'
import { GaugeSVG as Gauge } from '../../../shared/components/gauge/Gauge'

function generateParts(value, part = 5) {
  const step = value / part
  return Array.from({ length: part }, (_, i) => Math.round(i * step))
}

export interface NutrimentsGaugesProps extends XStackProps {
  protein?: number
  fat?: number
  sugar?: number
  size?: number
}

const nutriScoreColors = { A: '#26803D', B: '#87BD25', C: '#F6CC03', D: '#EF7D01', E: '#E63313' }
const { A, B, C, D, E } = nutriScoreColors

export const NutrimentsGauges = ({
  protein = 0,
  fat = 0,
  sugar = 0,
  size = 0,
  ...props
}: NutrimentsGaugesProps) => {
  const theme = useTheme()
  const gaugeColor = theme.backgroundFocus.get()
  const fillColor = theme.background.get()
  const red = theme.red9.get()
  const green = theme.green9.get()

  return (
    <XStack jc="center" {...props}>
      <Gauge
        value={protein}
        animatedValueColor={{
          range: [0, 8, 100],
          output: [B, A, A],
        }}
        fillColor={fillColor}
        gaugeColor={gaugeColor}
        max={16}
        size={size}
        text="Protein"
        maxText="16g"
        maxTextColor={green}
      ></Gauge>
      <Gauge
        value={fat}
        size={size}
        fillColor={fillColor}
        animatedValueColor={{
          range: [...generateParts(10), 100],
          output: [A, B, C, D, E, E],
        }}
        gaugeColor={gaugeColor}
        max={10}
        text="Fat"
        maxText="10g"
        maxTextColor={red}
      ></Gauge>
      <Gauge
        value={sugar}
        size={size}
        fillColor={fillColor}
        animatedValueColor={{
          range: [...generateParts(45), 100],
          output: [A, B, C, D, E, E],
        }}
        gaugeColor={gaugeColor}
        max={45}
        text="Sugar"
        maxText="45g"
        maxTextColor={red}
      ></Gauge>
    </XStack>
  )
}
