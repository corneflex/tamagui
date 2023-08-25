import { EcoScoreType } from 'app/model/Product'
import { Images } from '../../../images'

export interface EcoScoreProps {
  value?: EcoScoreType
  size?: number
}

export const EcoScore: React.FC<EcoScoreProps> = ({ value: ecoscore, size: height = 30 }) => {
  const EcoScore = Images.ecoscore[ecoscore ?? ''] ?? null

  return <>{EcoScore && <EcoScore width={height * 0.9} height={height * 0.5}></EcoScore>}</>
}
