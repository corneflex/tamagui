import { Product } from 'app/model/Product'
import { getLocales } from 'expo-localization'

export const getFields = (deviceLanguage) => ({
  id: 'id',
  productName: `product_name_${deviceLanguage}`,
  description: `generic_name_${deviceLanguage}`,
  images: 'images',
  selectedImages: 'selected_images',
  nutriscore: 'nutriscore_grade',
  ecoscore: 'ecoscore_grade',
  novaGroup: 'nova_group',
  frontImage: `front_${deviceLanguage}`,
  genericName: 'generic_name'
})

export const productMapper = (product: any, languageCode: string): Product => {
  const fields = getFields(languageCode)

  const productName = !!product?.[fields.productName]
    ? product?.[fields.productName]
    : product.product_name
  const genericName = !!product?.[fields.description]
    ? product?.[fields.description]
    : product.generic_name
  const size = product.images[fields.frontImage]?.sizes['400']
  const image = {
    url: product.selected_images.front.display[languageCode],
    width: size?.w ?? 0,
    height: size?.h ?? 0,
  }

  return new Product(
    product.id,
    productName,
    product.brands,
    genericName,
    image,
    product.nutriscore_grade,
    product.ecoscore_grade,
    product.nova_group
  )
}
