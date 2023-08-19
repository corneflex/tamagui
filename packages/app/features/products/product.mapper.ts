import { Product } from 'app/model/Product'
import get from 'lodash.get'

export const mapping = {
  id: 'id',
  name: 'product_name_${locale}',
  brands: 'brands',
  description: 'generic_name_${locale}',
  image: {
    width: 'images.front_${locale}.sizes.["400"].w',
    height: 'images.front_${locale}.sizes.["400"].h',
    url: 'selected_images.front.display.${locale}',
  },
  nutriscore: 'nutriscore_grade',
  ecoscore: 'ecoscore_grade',
  novaGroup: 'nova_group',
}

export const getFieldsMap = (mapping) => {
  return Object.values(mapping).flatMap((val) => {
    if (typeof val === 'string') {
      return val.split('.')[0]
    } else {
      return getFieldsMap(val)
    }
  })
}

const toObj = (mapping: { [key: string]: string | any }, obj: Object, json, locale: string) => {
  Object.entries(mapping).forEach(([key, value]) => {
    if (typeof value === 'string') {
      obj[key] =
        get(json, value.replace('${locale}', locale)) ?? get(json, value.replace('${locale}', 'en'))
    } else {
      obj[key] = toObj(value, {}, json, locale)
    }
  })
  return obj
}

export const getFields = (locale: string) => {
  return getFieldsMap(mapping).join(',').replaceAll('${locale}', locale)
}

export const productMapper = (product: any, locale: string): Product => {
  return new Product(toObj(mapping, {}, product, locale))
}
