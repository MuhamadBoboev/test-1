import { SearchParamsType } from '@shared/interfaces/SearchParamsType'
import { parseProductsRequestParams, Products, ProductsRequestInfoType } from '@modules/product'
import { Metadata } from 'next'
import { objectToBackendUrlString } from '@shared/lib/objectToBackendUrlString'
import { axiosInstance } from '@shared/api/axiosInstance'
import { AxiosResponse } from 'axios'

export async function generateMetadata({searchParams}: any): Promise<Metadata> {
  try {
    const params = parseProductsRequestParams(searchParams)
    const requestInfoUrl = `/products/info-request?` + objectToBackendUrlString(params as SearchParamsType)
    const response: AxiosResponse<ProductsRequestInfoType> = await axiosInstance.get(requestInfoUrl)

    let customTitle = response.data.title
    if (response.data.title === 'Все товары' && searchParams.view === 'collections') {
      customTitle = 'Все коллекции'
    }

    return {
      title: `${customTitle} | PRO Mebel`,
      description: 'В ассортименте есть все для производства мебели: ЛДСП, ЛМДФ, ЛХДФ, столешницы, шлифованные ДСП и МДФ, мебельная и лицевая фурнитура, мойки из искусственного камня, механизмы для шкафов-купе, напольный ламинат и многое другое.'
    }
  } catch (e) {
    return {}
  }
}

function Page({searchParams}: { searchParams: SearchParamsType }) {
  return (
    <Products searchParams={searchParams}/>
  )
}

export default Page