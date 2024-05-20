import { createAsyncThunk } from '@reduxjs/toolkit'
import { SelectedServicesType } from '@modules/cart/model/SelectedServicesType'
import { addServicesToLocalStorage } from '@modules/cart/lib/addServicesToLocalStorage'

type Props = {
  productId: number
  productCartId: string
  services: SelectedServicesType[]
}

// добавить услуги к товару
export const addServicesToProduct = createAsyncThunk<Props, Props>(
  'cart/addServicesToProduct',
  async ({productId, productCartId, services}: Props) => {
    addServicesToLocalStorage({
      productId,
      productCartId,
      services: services.map(selectedService => {
        const {service, ...otherProps} = selectedService
        return otherProps
      }),
    })
    return {
      productId,
      productCartId,
      services,
    }
  }
)