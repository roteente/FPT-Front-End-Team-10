// Order types for UI display
export interface OrderProduct {
  id: string;
  title: string;
  price: number;
  quantity: number;
  image?: string;
}

export interface Order {
  id: string;
  status: string;
  total: number;
  createdAt: string;
  receiverName?: string;
  receiverAddress?: string;
  receiverPhone?: string;
  paymentMethod?: string;
  note?: string;
  products?: OrderProduct[];
}
