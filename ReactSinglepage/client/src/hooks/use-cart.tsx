import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Product } from "@shared/schema";

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextValue {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  clear: () => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

const STORAGE_KEY = "app_cart";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  // hydrate from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {}
  }, []);

  // persist
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {}
  }, [items]);

  const addItem = (product: Product, quantity: number = 1) => {
    setItems((prev) => {
      const idx = prev.findIndex((i) => i.product.id === product.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], quantity: next[idx].quantity + quantity };
        return next;
      }
      return [...prev, { product, quantity }];
    });
  };

  const removeItem = (productId: string) => {
    setItems((prev) => prev.filter((i) => i.product.id !== productId));
  };

  const clear = () => setItems([]);

  const value = useMemo<CartContextValue>(() => ({ items, addItem, removeItem, clear }), [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}


