export interface RestaurantResponse<T> {
  status: 'success' | 'fail';
  message: string;
  data: T;
}

export interface MenuItemAttributes {
  id: number;
  name: string;
  unitPrice: number;
  imageUrl: string;
  ingredients: string[];
  soldOut: boolean;
}

export interface OrderAttributes {
  customer: string;
  status: string;
  priority: boolean;
  cart: CartItemAttributes[];
  id: string;
  estimatedDelivery: string;
  orderPrice: number;
  priorityPrice: number;
}

export interface CartItemAttributes {
  pizzaId: number;
  name: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  addIngredients?: string[];
  removeIngredients?: string[];
}

export interface NewOrderAttributes {
  customer: string;
  phone: string;
  address: string;
  priority: boolean;
  cart: CartItemAttributes[];
}
