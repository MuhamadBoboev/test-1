import { ProductCartState } from '@modules/cart/model/ProductCartState'
import { axiosInstance } from '@shared/api/axiosInstance'
import { transformCartProductsToOrderProducts } from '@modules/checkout/lib/transformCartProductsToOrderProducts'
import { OrderRequest } from '@modules/checkout/model/OrderRequest'
import { AxiosError } from 'axios'
import { SelectedServicesType } from '@modules/cart/model/SelectedServicesType'
import { transformServicesToOrder } from '@modules/checkout/lib/transformServicesToOrder'

interface Props {
  token: string
  payment_method_id: number
  comment?: string | null
  shipping_address?: string | null
  shipping_type_id?: number | null
  shipping_location_id?: number | null
  cartProducts: ProductCartState[]
  deliveryMethod: string
}

export async function storeOrder({
                                   token,
                                   cartProducts,
                                   comment,
                                   shipping_location_id,
                                   shipping_type_id,
                                   shipping_address,
                                   payment_method_id,
                                   deliveryMethod,
                                 }: Props) {
  try {
    const body: OrderRequest = {
      payment_method_id,
      products: transformCartProductsToOrderProducts(cartProducts),
    }
    if (comment) {
      body.comment = comment
    }
    if (deliveryMethod !== 'pickup') {
      if (shipping_location_id) {
        body.shipping_location_id = shipping_location_id
      }
      if (shipping_type_id) {
        body.shipping_type_id = shipping_type_id
      }
      if (shipping_address) {
        body.shipping_address = shipping_address
      }
    }

    const response = await axiosInstance.post('/orders', body, {
      headers: {
        Authorization: `Bearer ${token}`
      },
    })

    if (response.status !== 201) {
      return {
        success: false,
        message: response.data.message || 'Произошла ошибка'
      }
    }

    return {
      success: true,
      message: 'Ваш заказ успешно оформлен',
      data: response.data,
    }
  } catch (e) {
    const error = e as AxiosError<{ message: string }>
    return {
      success: false,
      message: error.response?.data.message || 'Произошла ошибка'
    }
  }
}