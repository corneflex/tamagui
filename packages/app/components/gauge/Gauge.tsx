import * as React from 'react'
import { useSpring, animated, InterpolatorArgs, InterpolatorConfig } from '../react-spring'
import Svg, { Path, Text } from 'react-native-svg'
import { NutriColors } from 'app/colors/nutriscore'

type validateValueType = (v: number, min?: number, max?: number) => number

export const validateValue: validateValueType = (value, min = 0, max = 100) => {
  const val = value > max ? max : value < min ? min : value
  return val
}

interface GaugeSVGProps {
  value: number
  gaugeColor?: string
  gaugeValueColor?: string
  gaugeStroke?: number
  gaugeValueStroke?: number
  insideTextColor?: string
  animatedValueColor?: InterpolatorConfig<string>
  animatedGaugeColor?: InterpolatorConfig<string>
  animatedTextColor?: InterpolatorConfig<string>
  size?: number
  children?: React.ReactNode
  max?: number
  text: string
  minText?: string
  minTextColor?: string
  maxText?: string
  maxTextColor?: string
}

export const GaugeSVG: React.FC<GaugeSVGProps> = ({
  value,
  gaugeColor = '#ff0',
  gaugeValueColor = '#666',
  gaugeStroke = 2,
  gaugeValueStroke = 2.5,
  children,
  insideTextColor = '#999',
  size = 100,
  animatedGaugeColor,
  animatedValueColor,
  animatedTextColor = animatedValueColor,
  max = 100,
  text,
  minText,
  maxText,
  minTextColor = '#ff0',
  maxTextColor = '#ff0',
}) => {
  const opts = {
    dialRadius: 40,
    dialStartAngle: 135,
  }

  function getAngle(gaugeSpanAngle: any) {
    return (validateValue(value, 0, max) * gaugeSpanAngle) / max
  }

  function getCartesian(cx: any, cy: any, radius: any, angle: any) {
    var rad = (angle * Math.PI) / 180
    return {
      x: Math.round((cx + radius * Math.cos(rad)) * 1000) / 1000,
      y: Math.round((cy + radius * Math.sin(rad)) * 1000) / 1000,
    }
  }

  function getDialCoords(radius: any, startAngle: any, endAngle: any) {
    var cx = 50,
      cy = 50
    return {
      end: getCartesian(cx, cy, radius, endAngle),
      start: getCartesian(cx, cy, radius, startAngle),
    }
  }

  function pathString(radius: any, startAngle: any, endAngle: any, largeArc: any) {
    var coords = getDialCoords(radius, startAngle, endAngle),
      start = coords.start,
      end = coords.end,
      largeArcFlag = typeof largeArc === 'undefined' ? 1 : largeArc

    return ['M', start.x, start.y, 'A', radius, radius, 0, largeArcFlag, 1, end.x, end.y].join(' ')
  }

  const { angle } = useSpring({
    from: { angle: 0 },
    to: { angle: getAngle(360 - Math.abs(136 - 45)) },
    config: { duration: 1000 },
  })

  const { animatedValue } = useSpring({
    from: { animatedValue: 0 },
    to: { animatedValue: value },
    config: { duration: 1000 },
  })

  const AnimatedPath = animated(Path)
  const AnimatedText = animated(Text)

  const gaugeColorAnim = animatedGaugeColor
    ? animatedValue.to<string>(animatedGaugeColor)
    : gaugeColor
  const gaugeValueColorAnim = animatedValueColor
    ? animatedValue.to<string>(animatedValueColor)
    : gaugeValueColor
  const textColorAnim = animatedTextColor
    ? animatedValue.to<string>(animatedTextColor)
    : insideTextColor

  const animatedColor = animatedValue.to({
    range: [0, 15, 30],
    output: ['green', 'yellow', 'red'],
  })

  return (
    <Svg height={size} width={size} viewBox="0 0 100 100">
      <AnimatedPath
        strokeDasharray="50,0,20,0"
        fill="none"
        stroke={gaugeColorAnim}
        strokeWidth={gaugeStroke}
        d="M 21.716 78.284 A 40 40 0 1 1 78.284 78.284"
        strokeLinecap="round"
      />
      {!!children ? (
        children
      ) : (
        <>
          <AnimatedText x={50} y={50} fill={textColorAnim} textAnchor="middle">
            {animatedValue.to((v) => v.toFixed(0))}
          </AnimatedText>
          <Text
            x={15}
            y={95}
            fontSize={16}
            fontWeight={'bold'}
            textAnchor="middle"
            fill={minTextColor}
          >
            {minText}
          </Text>
          <AnimatedText x={50} y={70} fill={textColorAnim} textAnchor="middle">
            {animatedValue.to(() => text)}
          </AnimatedText>
          <Text
            x={85}
            y={95}
            fontSize={16}
            fontWeight={'bold'}
            textAnchor="middle"
            fill={maxTextColor}
          >
            {maxText}
          </Text>
        </>
      )}
      <AnimatedPath
        strokeDasharray="50,0,20,0"
        fill="none"
        stroke={gaugeValueColorAnim}
        strokeWidth={gaugeValueStroke}
        d={angle.to((angleValue) =>
          pathString(
            opts.dialRadius,
            opts.dialStartAngle,
            angleValue + opts.dialStartAngle,
            angleValue <= 180 ? 0 : 1
          )
        )}
        strokeLinecap="round"
      />
    </Svg>
  )
}
