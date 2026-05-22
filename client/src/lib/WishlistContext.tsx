import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from "react";

export interface WishlistItem {
  id: string;
  name: string;
  price: string;
  image: string;
  category: string;
}

interface WishlistContextValue {
  items: WishlistItem[];
  isOpen: boolean;
  openWishlist: () => void;
  closeWishlist: () => void;
  addItem: (item: WishlistItem) => void;
  removeItem: (id: string) => void;
  toggle: (item: WishlistItem) => void;
  isWishlisted: (id: string) => boolean;
  count: number;
  clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextValue | null>(null);

const STORAGE_KEY = "mdoro_wishlist";

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<WishlistItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [isOpen, setIsOpen] = useState(false);

  // Persist to localStorage on every change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const openWishlist  = useCallback(() => setIsOpen(true),  []);
  const closeWishlist = useCallback(() => setIsOpen(false), []);

  const addItem = useCallback((item: WishlistItem) => {
    setItems(prev => prev.find(i => i.id === item.id) ? prev : [...prev, item]);
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems(prev => prev.filter(i => i.id !== id));
  }, []);

  const toggle = useCallback((item: WishlistItem) => {
    setItems(prev => {
      const exists = prev.find(i => i.id === item.id);
      return exists ? prev.filter(i => i.id !== item.id) : [...prev, item];
    });
  }, []);

  const isWishlisted = useCallback((id: string) => {
    return items.some(i => i.id === id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

  const clearWishlist = useCallback(() => setItems([]), []);

  return (
    <WishlistContext.Provider value={{
      items,
      isOpen,
      openWishlist,
      closeWishlist,
      addItem,
      removeItem,
      toggle,
      isWishlisted,
      count: items.length,
      clearWishlist,
    }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used inside WishlistProvider");
  return ctx;
}
