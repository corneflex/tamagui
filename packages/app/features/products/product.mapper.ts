import { Product } from 'app/model/Product'
import { getLocales } from 'expo-localization'



export const productMapper = (product: any): Product => {
  const deviceLanguage = getLocales()?.[0]?.languageCode ?? ''

  const productName = !!product?.[`product_name_${deviceLanguage}`]
    ? product?.[`product_name_${deviceLanguage}`]
    : product.product_name
  const genericName = !!product?.[`generic_name_${deviceLanguage}`]
    ? product?.[`generic_name_${deviceLanguage}`]
    : product.generic_name
  const size = product.images[`front_${deviceLanguage}`]?.sizes['400']
  const image = {
    url: product.selected_images.front.display[deviceLanguage],
    width: size?.w ?? 0,
    height: size?.h ?? 0,
  }
  console.log(productName)

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
