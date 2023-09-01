import { ReactComponent as NutriScoreA } from './nutriscore-a.svg'
import { ReactComponent as NutriScoreB } from './nutriscore-b.svg'
import { ReactComponent as NutriScoreC } from './nutriscore-c.svg'
import { ReactComponent as NutriScoreD } from './nutriscore-d.svg'
import { ReactComponent as NutriScoreE } from './nutriscore-e.svg'
import { ReactComponent as EcoScoreA } from './ecoscore-a.svg'
import { ReactComponent as EcoScoreB } from './ecoscore-b.svg'
import { ReactComponent as EcoScoreC } from './ecoscore-c.svg'
import { ReactComponent as EcoScoreD } from './ecoscore-d.svg'
import { ReactComponent as EcoScoreE } from './ecoscore-e.svg'
import { ReactComponent as Nova1 } from './nova-group-1.svg'
import { ReactComponent as Nova2 } from './nova-group-2.svg'
import { ReactComponent as Nova3 } from './nova-group-3.svg'
import { ReactComponent as Nova4 } from './nova-group-4.svg'
import { EcoScoreType, NovaGroupType, NutriScoreType } from 'app/models/Product'

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
