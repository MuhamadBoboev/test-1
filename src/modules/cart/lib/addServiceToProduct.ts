import { createAsyncThunk } from '@reduxjs/toolkit'
import { IService } from '@modules/service'
import { addServiceToLocalStorage } from '@modules/cart/lib/addServiceToLocalStorage'

type Props = {
  productId: number
  productCartId: string
  service: IService
  serviceValue: number
  serviceQuantity: number
}

// добавить услугу к товару
export const addServiceToProduct = createAsyncThunk<Props, Props>(
  'cart/addServiceToProduct',
  async ({productId, productCartId, service, serviceValue, serviceQuantity}: Props) => {
    const selectedService = {
      productId,
      productCartId,
      selectedService: {
        service,
        serviceId: service.id,
        serviceValue,
        serviceQuantity,
      }
    }
    addServiceToLocalStorage(selectedService)
    return {
      productId,
      productCartId,
      service,
      serviceValue,
      serviceQuantity,
    }
  }
)