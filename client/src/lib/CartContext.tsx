import { createContext, useContext, useState, useCallback, ReactNode } from "react";

export interface CartItem {
  id: string;
  name: string;
  price: string;
  image: string;
  category: string;
  size?: string;
  quantity: number;
}

interface CartContextValue {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (id: string, size?: string) => void;
  updateQuantity: (id: string, size: string | undefined, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const addItem = useCallback((newItem: Omit<CartItem, "quantity">) => {
    setItems((prev) => {
      const existing = prev.find(
        (i) => i.id === newItem.id && (i.size ?? "") === (newItem.size ?? "")
      );
      if (existing) {
        return prev.map((i) =>
          i.id === newItem.id && (i.size ?? "") === (newItem.size ?? "")
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...prev, { ...newItem, quantity: 1 }];
    });
    setIsOpen(true);
  }, []);

  const removeItem = useCallback((id: string, size?: string) => {
    setItems((prev) => prev.filter((i) => !(i.id === id && (i.size ?? "") === (size ?? ""))));
  }, []);

  const updateQuantity = useCallback(
    (id: string, size: string | undefined, quantity: number) => {
      if (quantity <= 0) {
        setItems((prev) => prev.filter((i) => !(i.id === id && (i.size ?? "") === (size ?? ""))));
      } else {
        setItems((prev) =>
          prev.map((i) =>
            i.id === id && (i.size ?? "") === (size ?? "") ? { ...i, quantity } : i
          )
        );
      }
    },
    []
  );

  const clearCart = useCallback(() => setItems([]), []);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);

  const totalPrice = items.reduce((sum, i) => {
    const numericPrice = parseFloat(i.price.replace(/[^0-9.]/g, ""));
    return sum + numericPrice * i.quantity;
  }, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        openCart,
        closeCart,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
