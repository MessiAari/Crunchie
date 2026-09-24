"use client";

import { createContext, useCallback, useContext, useState, type ReactNode } from "react";

interface WishlistContextType {
  wishlistIds: string[];
  wishlistCount: number;
  isWishlisted: (id: string) => boolean;
  toggleWishlist: (id: string) => void;
}

const WishlistContext = createContext<WishlistContextType>({
  wishlistIds: [],
  wishlistCount: 0,
  isWishlisted: () => false,
  toggleWishlist: () => {},
});

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);

  const toggleWishlist = useCallback((id: string) => {
    setWishlistIds((currentIds) => currentIds.includes(id)
      ? currentIds.filter((currentId) => currentId !== id)
      : [...currentIds, id]);
  }, []);

  const isWishlisted = useCallback((id: string) => wishlistIds.includes(id), [wishlistIds]);

  return (
    <WishlistContext.Provider value={{ wishlistIds, wishlistCount: wishlistIds.length, isWishlisted, toggleWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  return useContext(WishlistContext);
}
