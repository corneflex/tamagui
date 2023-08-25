import NutriScoreA from './nutriscore-a.svg'
import NutriScoreB from './nutriscore-b.svg'
import NutriScoreC from './nutriscore-c.svg'
import NutriScoreD from './nutriscore-d.svg'
import NutriScoreE from './nutriscore-e.svg'
import EcoScoreA from './ecoscore-a.svg'
import EcoScoreB from './ecoscore-b.svg'
import EcoScoreC from './ecoscore-c.svg'
import EcoScoreD from './ecoscore-d.svg'
import EcoScoreE from './ecoscore-e.svg'
import Nova1 from './nova-group-1.svg'
import Nova2 from './nova-group-2.svg'
import Nova3 from './nova-group-3.svg'
import Nova4 from './nova-group-4.svg'
import { EcoScoreType, NovaGroupType, NutriScoreType } from 'app/model/Product'

export const Images: {
  nutriscore: { [k in NutriScoreType]: React.ReactNode }
  ecoscore: { [k in EcoScoreType]: React.ReactNode }
  nova: { [k in NovaGroupType]: React.ReactNode }
} = {
  nutriscore: {
    a: NutriScoreA,
    b: NutriScoreB,
    c: NutriScoreC,
    d: NutriScoreD,
    e: NutriScoreE,
  },
  ecoscore: {
    a: EcoScoreA,
    b: EcoScoreB,
    c: EcoScoreC,
    d: EcoScoreD,
    e: EcoScoreE,
  },
  nova: {
    1: Nova1,
    2: Nova2,
    3: Nova3,
    4: Nova4,
  },
}

export default NutriScoreA
