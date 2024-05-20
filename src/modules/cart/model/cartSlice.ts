import { ProductCartState } from '@modules/cart/model/ProductCartState'
import { createSlice } from '@reduxjs/toolkit'
import { addToCart } from '@modules/cart/lib/addToCart'
import { removeFromCart, removeProductFromCart } from '@modules/cart/lib/removeFromCart'
import { loadProductsCart } from '@modules/cart/lib/loadProductsCart'
import { formatProductsCart } from '@modules/cart/lib/formatProductsCart'
import { clearCart } from '@modules/cart/lib/clearCart'
import { changeQuantityProductCart } from '@modules/cart/lib/changeQuantityProductCart'
import { addServiceToProduct, removeServiceFromCart } from '@modules/cart'
import { addServicesToProduct } from '@modules/cart/lib/addServicesToProduct'
import { removeServicesFromCart } from '@modules/cart/lib/removeServicesFromCart'

interface CartSliceState {
  products: ProductCartState[]
  status: 'idle' | 'pending' | 'fulfilled' | 'rejected'
}

const initialState: CartSliceState = {
  products: [],
  status: 'pending'
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(loadProductsCart.pending, (state) => {
      state.status = 'pending'
    })

    builder.addCase(loadProductsCart.fulfilled, (state, action) => {
      const {services, products} = action.payload
      state.products = formatProductsCart({
        loadedProducts: products,
        loadedServices: services,
      })
      state.status = 'fulfilled'
    })

    builder.addCase(loadProductsCart.rejected, (state) => {
      state.status = 'rejected'
    })

    builder.addCase(addToCart.fulfilled, (state, action) => {
      const isExist = state.products.find(productCart => productCart.productCartId === action.payload.productCartId)
      if (!isExist) {
        state.products.push(action.payload)
      }
    })
    builder.addCase(removeFromCart.fulfilled, (state, action) => {
      const productCartIndex = state.products.findIndex(productCart => productCart.productCartId === action.payload)
      if (productCartIndex !== -1) {
        state.products.splice(productCartIndex, 1)
      }
    })

    builder.addCase(removeProductFromCart.fulfilled, (state, action) => {
      state.products = state.products.filter(productCart => productCart.product.id !== action.payload)
    })

    builder.addCase(clearCart.fulfilled, (state) => {
      state.products = []
    })

    builder.addCase(changeQuantityProductCart.fulfilled, (state, action) => {
      const {quantity, productCartId} = action.payload
      const productCartIndex = state.products.findIndex(productCart => productCart.productCartId === productCartId)
      if (productCartIndex !== -1) {
        state.products[productCartIndex] = {
          ...state.products[productCartIndex],
          selectedQuantity: quantity,
        }
      }
    })

    builder.addCase(addServiceToProduct.fulfilled, (state, action) => {
      const {serviceQuantity, service, serviceValue, productCartId} = action.payload

      // find index product cart
      const productCartIndex = state.products
        .findIndex(productCart => productCart.productCartId === productCartId)

      // product cart pointer
      const productCart = state.products[productCartIndex]

      // check for exists
      if (!productCart.selectedServices.some(selectedService => selectedService.serviceId === service.id)) {
        state.products[productCartIndex].selectedServices = [
          ...productCart.selectedServices,
          {
            serviceQuantity,
            service,
            serviceValue,
            serviceId: service.id
          }
        ]
      }
    })

    builder.addCase(addServicesToProduct.fulfilled, (state, action) => {
      const {productCartId, services} = action.payload
      // find index product cart
      const productCartIndex = state.products
        .findIndex(productCart => productCart.productCartId === productCartId)
      state.products[productCartIndex].selectedServices = services
    })

    // services
    builder.addCase(removeServiceFromCart.fulfilled, (state, action) => {
      const {productCartId, serviceId} = action.payload
      const productCartIndex = state.products
        .findIndex(productCart => productCart.productCartId === productCartId)

      const productCart = state.products[productCartIndex]
      state.products[productCartIndex].selectedServices = productCart.selectedServices
        .filter(selectedService => selectedService.serviceId !== serviceId)
    })

    builder.addCase(removeServicesFromCart.fulfilled, (state, action) => {
      const productCartIndex = state.products
        .findIndex(productCart => productCart.productCartId === action.payload)

      state.products[productCartIndex].selectedServices = []
    })
  }
})