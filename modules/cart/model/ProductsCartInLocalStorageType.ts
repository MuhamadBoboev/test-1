import { SelectedAttributesType } from '@modules/product'
import { SelectedServicesShortType } from '@modules/cart/model/SelectedServicesType'

export interface ProductCartLocalStorage {
  productId: number
  selectedQuantity: number
  withAttribute: boolean
  selectedAttributes: SelectedAttributesType
  selectedServices: SelectedServicesShortType[]
}

export interface ProductsCartInLocalStorageType {
  // attributes-id or product-attribute-id
  [key: string]: ProductCartLocalStorage
}

const _: ProductsCartInLocalStorageType = {
  ['123-256-5989']: {
    productId: 1,
    selectedAttributes: {
      0: 123,
      1: 256,
      2: 5989,
    },
    selectedQuantity: 2,
    selectedServices: [],
    withAttribute: true,
  },
}