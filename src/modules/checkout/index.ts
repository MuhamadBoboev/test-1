import {
  checkoutSlice,
  selectPaymentMethod,
  selectShippingLocation,
  selectShippingType,
  selectDeliveryMethod,
  inputClientAddress,
} from '@modules/checkout/model/checkoutSlice'
import { getPaymentMethods } from '@modules/checkout/api/getPaymentMethods'
import { getShippingTypes } from '@modules/checkout/api/getShippingTypes'
import { getShippingLocations } from '@modules/checkout/api/getShippingLocations'
import { IPaymentMethod } from '@modules/checkout/model/IPaymentMethod'
import { IShippingLocation } from '@modules/checkout/model/IShippingLocation'
import { IShippingType } from '@modules/checkout/model/IShippingType'
import { Checkout } from '@modules/checkout/ui/Checkout'

export { Checkout }

export {
  checkoutSlice,
  getShippingTypes,
  getShippingLocations,
  getPaymentMethods,
  selectPaymentMethod,
  selectShippingLocation,
  selectShippingType,
  selectDeliveryMethod,
  inputClientAddress,
}

export type {
  IPaymentMethod,
  IShippingLocation,
  IShippingType,
}