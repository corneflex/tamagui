import { openFoodFetcher } from 'app/api/api'
import { Product } from 'app/models/Product'
import { getLocales } from 'expo-localization'
import useSWRInfinite, { SWRInfiniteResponse } from 'swr/infinite'
import { getFields, productMapper } from '../product.mapper'

const getKey = (pageIndex, previousPageData) => {
  const locale = getLocales()?.[0]?.languageCode ?? ''
  if (previousPageData && !previousPageData.length) return null // reached the end
  return `/search?page=${pageIndex + 1}&page_size=50&fields=${getFields(locale)}` // SWR key
}

export const useProducts = (): SWRInfiniteResponse<Product> => {
  const locale = getLocales()?.[0]?.languageCode ?? ''
  const f = (url) =>
    openFoodFetcher(url).then((data) => data?.products?.map((item) => productMapper(item, locale)))
  const { data, ...res } = useSWRInfinite(getKey, f, {
    revalidateOnFocus: false,
    revalidateIfStale: false,
  })

  return { ...res, data: data?.flat() }
}
