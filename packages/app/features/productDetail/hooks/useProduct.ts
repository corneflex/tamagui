import { openFoodFetcher } from 'app/api/api'
import { Product } from 'app/models/Product'
import { getLocales } from 'expo-localization'
import useSWR, { preload } from 'swr'
import { productMapper } from '../../products/product.mapper'

export interface Loading<T> {
  data: T
  isLoading: boolean
  error: any
}

const constructUrl = (id, locale) => `/product/${id}`

const computeParams = (id: string | undefined) => {
  const locale = getLocales()?.[0]?.languageCode ?? 'en'

  const fetchProduct = (url) =>
    openFoodFetcher(url).then((data) => productMapper(data?.product, locale))
  return { url: id ? constructUrl(id, locale) : null, fetch: fetchProduct }
}

export const useProduct = (id: string | undefined): Loading<Product | undefined> => {
  const { url, fetch } = computeParams(id)
  const { data, error, isLoading } = useSWR<Product>(url, fetch, {
    revalidateOnFocus: true,
    revalidateIfStale: false,
  })
  return { data, isLoading, error }
}

export const preloadProduct = (id: string | undefined): Promise<Product> => {
  const { url, fetch } = computeParams(id)
  return preload(url, fetch)
}
