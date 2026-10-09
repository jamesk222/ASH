export interface ProductVariant {
  id: string;
  sku: string;
  name: string;
  colorName?: string;
  colorHex?: string;
  size?: string;
  price?: number; // override if different
  inventory: number;
  image?: string;
}

export interface ProductReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  content: string;
  verifiedPurchase: boolean;
  helpfulCount: number;
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  slug: string;
  category: string;
  subcategory: string;
  price: number;
  compareAtPrice?: number;
  rating: number;
  reviewCount: number;
  shortDescription: string;
  description: string;
  features: string[];
  materials?: string;
  dimensions?: string;
  careInstructions?: string;
  images: string[];
  primaryImage: string;
  variants: ProductVariant[];
  inventory: number;
  badges?: ('NEW' | 'BEST SELLER' | 'TRENDING' | 'SALE' | 'LOW STOCK')[];
  tags: string[];
  weightLbs: number;
  marketplaceReady: {
    walmart: boolean;
    tiktokShop: boolean;
    poshmark: boolean;
    upc: string;
  };
}

export interface CartItem {
  product: Product;
  selectedVariant?: ProductVariant;
  quantity: number;
}

export interface OrderItem {
  productId: string;
  productName: string;
  sku: string;
  price: number;
  quantity: number;
  variantName?: string;
  image: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  status: 'Processing' | 'Shipped' | 'In Transit' | 'Out for Delivery' | 'Delivered';
  items: OrderItem[];
  subtotal: number;
  discount: number;
  shippingFee: number;
  tax: number;
  total: number;
  shippingAddress: {
    fullName: string;
    street: string;
    apt?: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  shippingMethod: string;
  trackingNumber: string;
  carrier: string;
  estimatedDelivery: string;
}

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  phone?: string;
  addresses: {
    id: string;
    isDefault: boolean;
    fullName: string;
    street: string;
    apt?: string;
    city: string;
    state: string;
    zipCode: string;
  }[];
}

export interface CategoryInfo {
  id: string;
  name: string;
  slug: string;
  description: string;
  image?: string;
  subcategories: {
    name: string;
    slug: string;
    itemCount?: number;
  }[];
}

export type PageRoute =
  | 'home'
  | 'shop'
  | 'product-detail'
  | 'cart'
  | 'checkout'
  | 'order-confirmation'
  | 'order-tracking'
  | 'account'
  | 'wishlist'
  | 'about'
  | 'contact'
  | 'faq'
  | 'shipping-policy'
  | 'returns-policy'
  | 'privacy-policy'
  | 'terms-conditions'
  | 'accessibility';
