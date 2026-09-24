"use client";

import type { ReactNode } from "react";
import { CartProvider } from "@/hooks/useCart";
import { ToastProvider } from "@/hooks/useToast";
import { WishlistProvider } from "@/hooks/useWishlist";
import PageTransitionProvider from "@/components/PageTransition";

export default function CatalogProviders({ children }: { children: ReactNode }) {
  return <PageTransitionProvider><CartProvider><WishlistProvider><ToastProvider>{children}</ToastProvider></WishlistProvider></CartProvider></PageTransitionProvider>;
}
