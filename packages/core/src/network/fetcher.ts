import axios from 'axios'

export const fetcher = async (url: string): Promise<any> => {
  const response = await axios(url)
  return response.data
}
