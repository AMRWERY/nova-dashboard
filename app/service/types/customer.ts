export type CustomerStatus = "active" | "disabled";

export interface CustomerAddress {
  id: number;
  firstName: string;
  lastName: string;
  company?: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  phone?: string;
  isDefault: boolean;
}

export interface Customer {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  status: CustomerStatus;
  acceptsMarketing: boolean;
  totalOrders: number;
  totalSpent: number;
  currency: string;
  addresses: CustomerAddress[];
  tags: string[];
  notes?: string;
  createdAt: string;
  updatedAt: string;
  lastOrderAt?: string;
}
