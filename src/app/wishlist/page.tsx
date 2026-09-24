import type { Metadata } from "next";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import WishlistView from "@/components/WishlistView";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import ToastContainer from "@/components/ToastContainer";
import RevealOnScroll from "@/components/RevealOnScroll";
import CustomCursor from "@/components/CustomCursor";

export const metadata: Metadata = {
  title: "Wishlist | Crunchie Wunche",
  description: "Your saved Crunchie Wunche favourites.",
};

export default function WishlistPage() {
  return <><TopBar /><Header /><WishlistView /><Footer /><CartDrawer /><ToastContainer /><RevealOnScroll /><CustomCursor /></>;
}
