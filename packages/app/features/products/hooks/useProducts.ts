import { fetcher } from '@corneflex/compose-core'
import useSWR from 'swr'
import { getFields, productMapper } from '../product.mapper'
import { getLocales } from 'expo-localization'

export const useProducts = () => {
  const locale = getLocales()?.[0]?.languageCode ?? ''
  const f = (url) => fetcher(url).then((data) => data?.products?.map(item=>productMapper(item,locale)))
  const fields = Object.values(getFields(locale)).join(',')
  const { data, error, isLoading } = useSWR(`https://world.openfoodfacts.org?json=true&fields=${fields}`, f)

  return { products: data, isLoading, error }
}
