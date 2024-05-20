import { createAsyncThunk } from '@reduxjs/toolkit'
import { IProduct } from '@modules/product'
import { getProductsCartLocalStorage } from '@modules/cart/lib/getProductsCartLocalStorage'
import { getProductsByIds } from '@modules/cart/api/getProductsByIds'
import { IService } from '@modules/service'
import { getServicesByIds } from '@modules/cart/api/getServicesByIds'

// фукнция для загрузки товаров который находится в корзине localStorage
export const loadProductsCart = createAsyncThunk<{ products: IProduct[], services: IService[] }>(
  'cart/loadProducts',
  async () => {
    try {
      const cartProductsLocalStorage = getProductsCartLocalStorage()
      const productsIds: number[] = []
      const servicesIds: number[] = []
      Object.keys(cartProductsLocalStorage).forEach((key) => {
        const {productId, selectedServices} = cartProductsLocalStorage[key]
        if (!productsIds.includes(productId)) {
          productsIds.push(productId)
        }
        selectedServices.forEach(({serviceId}) => {
          if (!servicesIds.includes(serviceId)) {
            servicesIds.push(serviceId)
          }
        })
      })
      const products = await getProductsByIds(productsIds)
      const services = await getServicesByIds(servicesIds)
      return {
        products: products || [],
        services: services || [],
      }
    } catch (e) {
      console.log(e)
      return {
        products: [],
        services: [],
      }
    }
  }
)