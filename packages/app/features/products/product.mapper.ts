import { Product } from 'app/models/Product'
import get from 'lodash.get'

export const mapping = {
  id: 'id',
  name: 'product_name_${locale}',
  brands: 'brands',
  description: 'generic_name_${locale}',
  image: {
    thumb: {
      width: 'images.front_${locale}.sizes.["100"].w',
      height: 'images.front_${locale}.sizes.["100"].h',
      url: 'selected_images.front.small.${locale}',
    },
    small: {
      width: 'images.front_${locale}.sizes.["200"].w',
      height: 'images.front_${locale}.sizes.["200"].h',
      url: 'selected_images.front.small.${locale}',
    },
    cover: {
      width: 'images.front_${locale}.sizes.["400"].w',
      height: 'images.front_${locale}.sizes.["400"].h',
      url: 'selected_images.front.display.${locale}',
    },
  },
  nutriscore: 'nutriscore_grade',
  ecoscore: 'ecoscore_grade',
  novaGroup: 'nova_group',
  protein: 'nutriments.proteins',
  sugar: 'nutriments.sugars',
  fat: 'nutriments.fat',
  saturedFat: 'nutriments.saturated-fat',
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
      for (const l of [locale, 'en', 'es', 'pt', 'it', 'de', 'da', 'cs', 'sr']) {
        obj[key] = get(json, value.replace('${locale}', l))
        if (obj[key]) break
      }
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
