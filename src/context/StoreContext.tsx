import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, ProductVariant, CartItem, Order, UserProfile, PageRoute } from '../types';
import { INITIAL_PRODUCTS } from '../data/products';

interface ToastItem {
  id: string;
  message: string;
  type?: 'success' | 'info' | 'warning';
}

interface CouponInfo {
  code: string;
  discountPercent: number;
  fixedDiscount?: number;
  isFreeShipping?: boolean;
}

interface StoreContextType {
  products: Product[];
  activeRoute: PageRoute;
  selectedProduct: Product | null;
  selectedCategory: string | null;
  searchQuery: string;
  cart: CartItem[];
  wishlist: string[];
  recentlyViewed: Product[];
  user: UserProfile | null;
  orders: Order[];
  coupon: CouponInfo | null;
  isCartDrawerOpen: boolean;
  quickViewProduct: Product | null;
  toasts: ToastItem[];
  
  // Actions
  navigateTo: (route: PageRoute, product?: Product | null, category?: string | null) => void;
  addToCart: (product: Product, variant?: ProductVariant, quantity?: number, openDrawer?: boolean) => void;
  removeFromCart: (productId: string, variantId?: string) => void;
  updateQuantity: (productId: string, variantId?: string, quantity?: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string | null) => void;
  setIsCartDrawerOpen: (open: boolean) => void;
  openQuickView: (product: Product) => void;
  closeQuickView: () => void;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  addOrder: (order: Order) => void;
  loginUser: (email: string, fullName: string) => void;
  logoutUser: () => void;
  showToast: (message: string, type?: 'success' | 'info' | 'warning') => void;
  removeToast: (id: string) => void;
  
  // Computed
  cartSubtotal: number;
  cartDiscount: number;
  shippingFee: number;
  estimatedTax: number;
  cartTotal: number;
  freeShippingThreshold: number;
  amountNeededForFreeShipping: number;
  totalCartItemCount: number;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const FREE_SHIPPING_THRESHOLD = 45.0; // Standard US Free shipping on qualifying orders >= $45

const DEFAULT_DEMO_ORDER: Order = {
  id: 'ord-demo-01',
  orderNumber: 'ASH-2026-8924',
  createdAt: '2026-10-06T14:30:00Z',
  status: 'In Transit',
  items: [
    {
      productId: 'ash-prod-001',
      productName: "Women's Ribbed Everyday Knit Cardigan",
      sku: 'ASH-WF-CARD-001-CRM-M',
      price: 29.99,
      quantity: 1,
      variantName: 'Cream / M',
      image: '/src/assets/images/category_fashion_apparel_1791567463391.jpg',
    },
    {
      productId: 'ash-prod-012',
      productName: '18K Gold Dipped Herringbone Layered Chain Necklace',
      sku: 'ASH-JW-NECK-012-GLD',
      price: 27.99,
      quantity: 1,
      variantName: '18K Yellow Gold',
      image: '/src/assets/images/hero_lifestyle_showcase_1791567447499.jpg',
    }
  ],
  subtotal: 57.98,
  discount: 5.80,
  shippingFee: 0,
  tax: 4.17,
  total: 56.35,
  shippingAddress: {
    fullName: 'Emily Watson',
    street: '742 Evergreen Terrace',
    city: 'Denver',
    state: 'CO',
    zipCode: '80202',
    country: 'United States'
  },
  shippingMethod: 'Standard U.S. Ground (USPS Priority)',
  trackingNumber: '9400111899562537829104',
  carrier: 'USPS Priority Mail',
  estimatedDelivery: 'Oct 11, 2026',
};

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products] = useState<Product[]>(INITIAL_PRODUCTS);
  const [activeRoute, setActiveRoute] = useState<PageRoute>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState<boolean>(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  // Cart with local storage persistence
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('ash_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Wishlist
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('ash_wishlist');
      return saved ? JSON.parse(saved) : ['ash-prod-001', 'ash-prod-008'];
    } catch {
      return ['ash-prod-001', 'ash-prod-008'];
    }
  });

  // Recently viewed
  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>(() => {
    return [INITIAL_PRODUCTS[0], INITIAL_PRODUCTS[3], INITIAL_PRODUCTS[7]];
  });

  // Coupon
  const [coupon, setCoupon] = useState<CouponInfo | null>(() => {
    return { code: 'WELCOME10', discountPercent: 10 };
  });

  // User
  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem('ash_user');
      return saved ? JSON.parse(saved) : {
        id: 'usr-demo-01',
        email: 'jamalshah199110@gmail.com',
        fullName: 'Jamal Shah',
        phone: '+44 7930452817',
        addresses: [
          {
            id: 'addr-01',
            isDefault: true,
            fullName: 'Jamal Shah',
            street: '30 N Gould St 67511',
            city: 'Sheridan',
            state: 'WY',
            zipCode: '82801',
          }
        ]
      };
    } catch {
      return null;
    }
  });

  // Orders
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('ash_orders');
      return saved ? JSON.parse(saved) : [DEFAULT_DEMO_ORDER];
    } catch {
      return [DEFAULT_DEMO_ORDER];
    }
  });

  // Save to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('ash_cart', JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('ash_wishlist', JSON.stringify(wishlist));
    } catch {
      // ignore
    }
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem('ash_orders', JSON.stringify(orders));
    } catch {
      // ignore
    }
  }, [orders]);

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem('ash_user', JSON.stringify(user));
      } else {
        localStorage.removeItem('ash_user');
      }
    } catch {
      // ignore
    }
  }, [user]);

  // Toast actions
  const showToast = (message: string, type: 'success' | 'info' | 'warning' = 'success') => {
    const id = Date.now().toString() + Math.random().toString();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 3800);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Navigation
  const navigateTo = (route: PageRoute, product: Product | null = null, category: string | null = null) => {
    setActiveRoute(route);
    if (product) {
      setSelectedProduct(product);
      // Add to recently viewed
      setRecentlyViewed((prev) => {
        const filtered = prev.filter((p) => p.id !== product.id);
        return [product, ...filtered].slice(0, 8);
      });
    }
    if (category !== undefined) {
      setSelectedCategory(category);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cart actions
  const addToCart = (
    product: Product,
    variant?: ProductVariant,
    quantity = 1,
    openDrawer = true
  ) => {
    const effectiveVariant = variant || (product.variants && product.variants[0]) || undefined;

    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          (effectiveVariant ? item.selectedVariant?.id === effectiveVariant.id : !item.selectedVariant)
      );

      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity,
        };
        return next;
      } else {
        return [...prev, { product, selectedVariant: effectiveVariant, quantity }];
      }
    });

    showToast(`Added "${product.name}" to cart`);
    if (openDrawer) {
      setIsCartDrawerOpen(true);
    }
  };

  const removeFromCart = (productId: string, variantId?: string) => {
    setCart((prev) =>
      prev.filter(
        (item) =>
          !(item.product.id === productId && (variantId ? item.selectedVariant?.id === variantId : true))
      )
    );
    showToast('Item removed from cart', 'info');
  };

  const updateQuantity = (productId: string, variantId?: string, quantity = 1) => {
    if (quantity <= 0) {
      removeFromCart(productId, variantId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => {
        if (item.product.id === productId && (variantId ? item.selectedVariant?.id === variantId : true)) {
          return { ...item, quantity };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  // Wishlist actions
  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed from wishlist', 'info');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Added to wishlist');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // Quick view
  const openQuickView = (product: Product) => setQuickViewProduct(product);
  const closeQuickView = () => setQuickViewProduct(null);

  // Coupons
  const applyCoupon = (code: string): { success: boolean; message: string } => {
    const clean = code.trim().toUpperCase();
    if (clean === 'WELCOME10') {
      setCoupon({ code: 'WELCOME10', discountPercent: 10 });
      showToast('10% discount applied!', 'success');
      return { success: true, message: 'WELCOME10 applied (10% off)' };
    }
    if (clean === 'SAVE15') {
      setCoupon({ code: 'SAVE15', discountPercent: 15 });
      showToast('15% discount applied!', 'success');
      return { success: true, message: 'SAVE15 applied (15% off)' };
    }
    if (clean === 'FREESHIP') {
      setCoupon({ code: 'FREESHIP', discountPercent: 0, isFreeShipping: true });
      showToast('Free shipping promo applied!', 'success');
      return { success: true, message: 'FREESHIP applied (Free U.S. Shipping)' };
    }
    return { success: false, message: 'Invalid or expired promotional code' };
  };

  const removeCoupon = () => {
    setCoupon(null);
    showToast('Promo code removed', 'info');
  };

  // Orders
  const addOrder = (order: Order) => {
    setOrders((prev) => [order, ...prev]);
  };

  // User
  const loginUser = (email: string, fullName: string) => {
    const newUser: UserProfile = {
      id: `usr-${Date.now()}`,
      email,
      fullName: fullName || email.split('@')[0],
      phone: '+44 7930452817',
      addresses: [
        {
          id: 'addr-new',
          isDefault: true,
          fullName: fullName || 'Customer',
          street: '30 N Gould St 67511',
          city: 'Sheridan',
          state: 'WY',
          zipCode: '82801',
        }
      ]
    };
    setUser(newUser);
    showToast(`Signed in as ${newUser.fullName}`);
  };

  const logoutUser = () => {
    setUser(null);
    showToast('Signed out successfully', 'info');
  };

  // Computed Cart Math
  const totalCartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const cartSubtotal = cart.reduce((acc, item) => {
    const unitPrice = item.selectedVariant?.price ?? item.product.price;
    return acc + unitPrice * item.quantity;
  }, 0);

  const discountPercent = coupon?.discountPercent || 0;
  const cartDiscount = (cartSubtotal * discountPercent) / 100;

  const isFreeShipPromo = coupon?.isFreeShipping || false;
  const qualifiesForFreeShip = cartSubtotal >= FREE_SHIPPING_THRESHOLD || isFreeShipPromo;
  const shippingFee = cart.length === 0 ? 0 : qualifiesForFreeShip ? 0 : 4.99;

  const amountNeededForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - cartSubtotal);

  // US sales tax standard estimation (~7%)
  const estimatedTax = cartSubtotal > 0 ? Number(((cartSubtotal - cartDiscount) * 0.065).toFixed(2)) : 0;
  const cartTotal = Number((cartSubtotal - cartDiscount + shippingFee + estimatedTax).toFixed(2));

  return (
    <StoreContext.Provider
      value={{
        products,
        activeRoute,
        selectedProduct,
        selectedCategory,
        searchQuery,
        cart,
        wishlist,
        recentlyViewed,
        user,
        orders,
        coupon,
        isCartDrawerOpen,
        quickViewProduct,
        toasts,
        navigateTo,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleWishlist,
        isInWishlist,
        setSearchQuery,
        setSelectedCategory,
        setIsCartDrawerOpen,
        openQuickView,
        closeQuickView,
        applyCoupon,
        removeCoupon,
        addOrder,
        loginUser,
        logoutUser,
        showToast,
        removeToast,
        cartSubtotal,
        cartDiscount,
        shippingFee,
        estimatedTax,
        cartTotal,
        freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
        amountNeededForFreeShipping,
        totalCartItemCount,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
