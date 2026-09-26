export type ProductStatus = "active" | "draft" | "archived";

export type ProductType = "physical" | "digital" | "service";

export interface ProductVariant {
  id: number;
  productId: number;
  title: string;
  sku: string;
  price: number;
  compareAtPrice?: number;
  costPrice: number;
  stock: number;
  weight: number;
  weightUnit: "kg" | "g";
  barcode?: string;
  options: Record<string, string>;
}

export interface Product {
  id: number;
  title: string;
  slug: string;
  description: string;
  type: ProductType;
  status: ProductStatus;
  vendor: string;
  category: string;
  tags: string[];
  images: string[];
  price: number;
  compareAtPrice?: number;
  costPrice: number;
  sku: string;
  barcode?: string;
  trackInventory: boolean;
  inventoryQuantity: number;
  variants: ProductVariant[];
  createdAt: string;
  updatedAt: string;
}
