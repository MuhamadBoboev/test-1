import { createAsyncThunk } from '@reduxjs/toolkit'
import { SelectedAttributesType } from '@modules/product'
import { axiosInstance } from '@shared/api/axiosInstance'
import { AxiosResponse } from 'axios'
import { IProduct } from '@modules/product/model/IProduct'
import { ProductCartState } from '@modules/cart/model/ProductCartState'
import { addProductToLocalStorage } from '@modules/cart/lib/addProductToLocalStorage'
import { getProductCartId } from '@modules/cart/lib/getProductCartId'
import { SelectedServicesType } from '@modules/cart/model/SelectedServicesType'

type Props = {
  slug: string
  selectedAttributes: SelectedAttributesType
  selectedQuantity: number
  selectedServices: SelectedServicesType[]
}

// добавить товар в корзину
export const addToCart = createAsyncThunk<ProductCartState, Props>(
  'cart/addToCart',
  async ({selectedQuantity, selectedAttributes, slug, selectedServices}: Props) => {
    const response: AxiosResponse<{ data: IProduct }> = await axiosInstance.get(`/products/${slug}`)
    const productCartId = getProductCartId({
      productId: response.data.data.id,
      selectedAttributes
    })
    const productCart: ProductCartState = {
      productCartId,
      product: response.data.data,
      selectedAttributes,
      selectedQuantity,
      selectedServices,
    }
    addProductToLocalStorage(productCart)
    return productCart
  }
)