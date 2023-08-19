import { fetcher } from '@corneflex/compose-core'
import useSWR from 'swr'
import { getFields, productMapper } from '../product.mapper'
import { getLocales } from 'expo-localization'
import { Product } from 'app/model/Product'

export const useProduct = (id: string | undefined) => {
  const locale = getLocales()?.[0]?.languageCode ?? ''

  const fetchProduct = (url) => fetcher(url).then((data) => productMapper(data?.product, locale))
  
  const fields = Object.values(getFields(locale)).join(',')
  const url = `https://world.openfoodfacts.org/api/v2/product/${id}?fields=${fields}`

  const { data, error, isLoading } = useSWR(id ? url : null, fetchProduct)

  return { product: data as Product, isLoading, error }
}
