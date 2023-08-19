import { openFoodFetcher } from 'app/api/api'
import { getLocales } from 'expo-localization'
import useSWR from 'swr'
import { getFields, productMapper } from '../product.mapper'
import { Product } from 'app/model/Product'
import { Loading } from './loading.interface'

export interface ProductsLoading {
  roducts: Product[]
  isLoading: boolean
  error: any
}

const getKey = (pageIndex, previousPageData) => {
  if (previousPageData && !previousPageData.length) return null // reached the end
  return `/users?page=${pageIndex}&limit=10`                    // SWR key
}

export const useProducts = (): Loading<Product[]> => {
  const locale = getLocales()?.[0]?.languageCode ?? ''
  const f = (url) =>
    openFoodFetcher(url).then((data) => data?.products?.map((item) => productMapper(item, locale)))
  const { data, error, isLoading } = useSWR(`/search?fields=${getFields(locale)}`, f, {
    revalidateOnFocus: true,
    revalidateIfStale: false,
  })

  return { data, isLoading, error }
}
