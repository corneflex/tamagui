import { NutriScoreType } from 'app/model/Product'
import { Images } from '../../../images'

export interface NutriScoreProps {
  value?: NutriScoreType
  size?: number
}

export const NutriScore: React.FC<NutriScoreProps> = ({ value: nutriscore, size: height = 30 }) => {
  const NutriScore = Images.nutriscore[nutriscore ?? ''] ?? null

  return <>{NutriScore && <NutriScore width={height} height={height * 0.5}></NutriScore>}</>
}
