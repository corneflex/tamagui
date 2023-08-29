import { GridLayoutProvider } from 'recyclerlistview'
import { Dimensions } from 'react-native'

const MAX_SPAN = 4
export default class LayoutProvider extends GridLayoutProvider {
  constructor(props, columns, width, height) {
    super(
      columns,
      (index) => {
        return 'product'
      },
      (index): number => {
        return 1
      },
      (index) => {
        return height
      }
    )
  }
}
