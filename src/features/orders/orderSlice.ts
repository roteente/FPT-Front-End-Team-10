import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface OrderProduct {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string; // Thêm thuộc tính image
}

export interface OrderInfo {
  products: OrderProduct[];
  receiverName: string;
  receiverAddress: string;
  receiverPhone: string;
  paymentMethod: string;
  total: number;
  note?: string;
  createdAt?: string;
}

interface OrderState {
  currentOrder: OrderInfo | null;
  orderSuccess: boolean;
}

const initialState: OrderState = {
  currentOrder: null,
  orderSuccess: false,
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setOrder(state, action: PayloadAction<OrderInfo>) {
      state.currentOrder = action.payload;
    },
    setOrderSuccess(state, action: PayloadAction<boolean>) {
      state.orderSuccess = action.payload;
    },
    resetOrder(state) {
      state.currentOrder = null;
      state.orderSuccess = false;
    },
  },
});

export const { setOrder, setOrderSuccess, resetOrder } = orderSlice.actions;
export default orderSlice.reducer;
