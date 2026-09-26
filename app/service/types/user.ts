export interface Address {
  street: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
}

export interface CreditCard {
  cardHolderName: string;
  cardNumber: string;
  expiryMonth: number;
  expiryYear: number;
  cvv: string;
  brand: "Visa" | "Mastercard" | "American Express" | "Discover";
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  address: Address;
  lastLogin: string;
  creditCard: CreditCard;
}
