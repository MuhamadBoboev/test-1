import { IProduct, SelectedAttributesType } from '@modules/product'
import { SelectedServicesType } from '@modules/cart/model/SelectedServicesType'

export interface ProductCartState {
  productCartId: string // attributes-id or product-id
  selectedQuantity: number
  selectedAttributes: SelectedAttributesType
  product: IProduct
  selectedServices: SelectedServicesType[]
}