import { ProductsRequestInfoType } from '@modules/product/model/ProductsRequestInfo'
import { AxiosResponse } from 'axios'
import { axiosInstance } from '@shared/api/axiosInstance'
import { ProductsFilterRequest } from '@modules/product/model/ProductsFilterRequest'
import { objectToBackendUrlString } from '@shared/lib/objectToBackendUrlString'
import { SearchParamsType } from '@shared/interfaces/SearchParamsType'

export async function getRequestInfoProducts(params: ProductsFilterRequest): Promise<ProductsRequestInfoType> {
  try {
    const url = `/products/info-request?` + objectToBackendUrlString(params as SearchParamsType)
    const response: AxiosResponse<ProductsRequestInfoType> = await axiosInstance.get(url)
    return response.data
  } catch (e) {
    return {title: 'Все товары'}
  }
}