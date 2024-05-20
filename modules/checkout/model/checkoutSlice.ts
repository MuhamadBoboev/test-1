import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IPaymentMethod } from '@modules/checkout/model/IPaymentMethod'
import { IShippingType } from '@modules/checkout/model/IShippingType'
import { IShippingLocation } from '@modules/checkout/model/IShippingLocation'
import { getPaymentMethods } from '@modules/checkout/api/getPaymentMethods'
import { getShippingLocations } from '@modules/checkout/api/getShippingLocations'
import { getShippingTypes } from '@modules/checkout/api/getShippingTypes'
import { DeliveryMethodsKey, IDeliveryMethod } from '@modules/checkout/model/IDeliveryMethod'

type Status = 'pending' | 'fulfilled' | 'rejected'

interface CheckoutState {
  data: {
    paymentMethods: IPaymentMethod[] | null
    shippingLocations: IShippingLocation[] | null
    shippingTypes: IShippingType[] | null
    deliveryMethods: IDeliveryMethod[]
    comment: string,
  }
  statuses: {
    paymentMethodsStatus: Status,
    shippingLocationsStatus: Status,
    shippingTypesStatus: Status,
  }
  paymentMethodId: number | null
  deliveryMethod: 'pickup' | 'shipping'
  shippingTypeId: number | null
  shippingLocationId: number | null
  clientAddress: string
}

const initialState: CheckoutState = {
  data: {
    paymentMethods: null,
    shippingLocations: null,
    shippingTypes: null,
    deliveryMethods: [
      {id: 'pickup', name: 'Самовывоз'},
      {id: 'shipping', name: 'Доставка'},
    ],
    comment: '',
  },
  statuses: {
    paymentMethodsStatus: 'pending',
    shippingLocationsStatus: 'pending',
    shippingTypesStatus: 'pending',
  },
  paymentMethodId: null,
  deliveryMethod: 'pickup',
  shippingTypeId: null,
  shippingLocationId: null,
  clientAddress: '',
}

export const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    selectPaymentMethod(state, action: PayloadAction<number>) {
      state.paymentMethodId = action.payload
    },
    selectShippingLocation(state, action: PayloadAction<number>) {
      state.shippingLocationId = action.payload

      const activeShippingType = state.data.shippingTypes?.find(({is_active}) => is_active)
      if (activeShippingType) {
        state.shippingTypeId = activeShippingType.id
      }
    },
    selectShippingType(state, action: PayloadAction<number>) {
      state.shippingTypeId = action.payload
    },
    selectDeliveryMethod(state, action: PayloadAction<DeliveryMethodsKey>) {
      state.deliveryMethod = action.payload
    },
    inputClientAddress(state, action: PayloadAction<string>) {
      state.clientAddress = action.payload
    },
    setCheckoutComment(state, action: PayloadAction<string>) {
      state.data.comment = action.payload
    }
  },
  extraReducers: builder => {
    // payment methods

    builder.addCase(getPaymentMethods.fulfilled, (state, action) => {
      const paymentMethods = action.payload
      state.data.paymentMethods = paymentMethods
      const activePaymentMethod = paymentMethods.find(({is_active}) => is_active)
      if (activePaymentMethod) {
        state.paymentMethodId = activePaymentMethod.id
      }
    })

    builder.addCase(getPaymentMethods.rejected, (state) => {
      state.statuses.paymentMethodsStatus = 'rejected'
    })

    // shipping locations
    builder.addCase(getShippingLocations.fulfilled, (state, action) => {
      state.data.shippingLocations = action.payload
    })

    builder.addCase(getShippingLocations.rejected, (state) => {
      state.statuses.shippingLocationsStatus = 'rejected'
    })

    // shipping types
    builder.addCase(getShippingTypes.fulfilled, (state, action) => {
      state.data.shippingTypes = action.payload
    })

    builder.addCase(getShippingTypes.rejected, (state) => {
      state.statuses.shippingTypesStatus = 'rejected'
    })
  }
})

export const {
  selectPaymentMethod,
  selectShippingLocation,
  selectShippingType,
  selectDeliveryMethod,
  setCheckoutComment,
  inputClientAddress,
} = checkoutSlice.actions