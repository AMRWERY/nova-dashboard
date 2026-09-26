export type OrderStatus =
  | "pending"
  | "confirmed"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled"
  | "refunded";

export type PaymentStatus =
  | "pending"
  | "authorized"
  | "paid"
  | "partially_refunded"
  | "refunded"
  | "failed";

export type FulfillmentStatus =
  | "unfulfilled"
  | "partially_fulfilled"
  | "fulfilled";

export interface OrderItem {
  id: number;
  productId: number;
  variantId: number;
  title: string;
  variantTitle: string;
  sku: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface OrderAddress {
  firstName: string;
  lastName: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  phone?: string;
}

export interface Payment {
  id: number;
  provider: "stripe" | "paypal" | "cod";
  method: "credit_card" | "paypal" | "cash_on_delivery";
  status: PaymentStatus;
  amount: number;
  currency: string;
  transactionId?: string;
  last4?: string;
  cardBrand?: string;
  paidAt?: string;
}

export interface Shipping {
  method: string;
  carrier: string;
  price: number;
  trackingNumber?: string;
  trackingUrl?: string;
}

export interface Order {
  id: number;
  orderNumber: string;
  customerId: number;
  customerName: string;
  customerEmail: string;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  fulfillmentStatus: FulfillmentStatus;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  shippingCost: number;
  tax: number;
  total: number;
  currency: string;
  discountCode?: string;
  shippingAddress: OrderAddress;
  billingAddress: OrderAddress;
  payment: Payment;
  shipping: Shipping;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}
