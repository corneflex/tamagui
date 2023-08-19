import { openFoodFetcher } from 'app/api/api'
import { Product } from 'app/model/Product'
import { getLocales } from 'expo-localization'
import useSWR, { preload } from 'swr'
import { getFields, productMapper } from '../product.mapper'
import { Loading } from './loading.interface'

const constructUrl = (id, locale) => `/product/${id}?fields=${getFields(locale)}`

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
