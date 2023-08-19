import { fetcher } from '@corneflex/compose-core'
import { apiConfig } from './config'

export const openFoodFetcher = (endpoint:string)=>{
  return fetcher(`${apiConfig.openFood.baseUrl}${endpoint}`)
}