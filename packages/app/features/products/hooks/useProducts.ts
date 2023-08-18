import { fetcher } from '@corneflex/compose-core'
import useSWR from 'swr'
import { productMapper } from '../product.mapper'

export const useProducts = () => {
  const f = (url) => fetcher(url).then((data) => data?.products?.map(productMapper))
  const { data, error, isLoading } = useSWR('https://world.openfoodfacts.org?json=true', f)

  return { products: data, isLoading, error }
}
