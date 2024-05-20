import { IOrder } from '@modules/order/model/IOrder'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface OrderState {
  isOpen: boolean
  activeOrder: IOrder | null
}

const initialState: OrderState = {
  isOpen: false,
  activeOrder: null
}

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    openOrder(state, action: PayloadAction<IOrder>) {
      state.isOpen = true
      state.activeOrder = action.payload
    },
    closeOrder(state) {
      state.isOpen = false
    }
  }
})

export const {openOrder, closeOrder} = orderSlice.actions