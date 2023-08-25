import { XStack, useTheme } from '@corneflex/ui'
import { StackProps } from '@tamagui/core'
import { NutriColors } from 'app/colors/nutriscore'
import { GaugeSVG as Gauge } from '../../../components/gauge/Gauge'

function generateParts(value, part = 5) {
  const step = value / part
  return Array.from({ length: part }, (_, i) => Math.round(i * step))
}

export interface NutrimentsGaugesProps extends StackProps {
  protein?: number
  fat?: number
  sugar?: number
  size?: number
}

const { A, B, C, D, E } = NutriColors

export const NutrimentsGauges = ({
  protein = 0,
  fat = 0,
  sugar = 0,
  size = 0,
  ...props
}: NutrimentsGaugesProps) => {
  const theme = useTheme()
  const gaugeColor = theme.backgroundFocus.get()

  return (
    <XStack jc="center" {...props}>
      <Gauge
        value={protein}
        animatedValueColor={{
          range: [0, 8, 100],
          output: [B, A, A],
        }}
        gaugeColor={gaugeColor}
        max={16}
        size={size}
        text="Protein"
        maxText="16g"
        maxTextColor={theme.green9.get()}
      ></Gauge>
      <Gauge
        value={fat}
        size={size}
        animatedValueColor={{
          range: [...generateParts(10), 100],
          output: [A, B, C, D, E, E],
        }}
        gaugeColor={gaugeColor}
        max={10}
        text="Fat"
        maxText="10g"
        maxTextColor={theme.red9.get()}
      ></Gauge>
      <Gauge
        value={sugar}
        size={size}
        animatedValueColor={{
          range: [...generateParts(45), 100],
          output: [A, B, C, D, E, E],
        }}
        gaugeColor={gaugeColor}
        max={45}
        text="Sugar"
        maxText="45g"
        maxTextColor={theme.red9.get()}
      ></Gauge>
    </XStack>
  )
}
