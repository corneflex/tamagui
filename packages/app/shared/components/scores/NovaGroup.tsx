import { NovaGroupType } from 'app/models/Product'
import { Images } from '../../../images'

export interface NovaGroupProps {
  value?: NovaGroupType
  size?: number
}

export const NovaGroup: React.FC<NovaGroupProps> = ({ value: novaGroup, size: height = 30 }) => {
  const Nova = Images.nova[novaGroup ?? ''] ?? null

  return <>{Nova && <Nova width={height * 0.3} height={height * 0.5}></Nova>}</>
}
