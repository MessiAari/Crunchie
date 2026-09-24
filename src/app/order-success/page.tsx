import type { Metadata } from "next";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import ToastContainer from "@/components/ToastContainer";
import CustomCursor from "@/components/CustomCursor";
import ProductCard from "@/components/ProductCard";
import { SuccessCard } from "@/components/checkout/CheckoutComponents";
import { PRODUCTS } from "@/data/products";
import "../checkout/checkout.css";

export const metadata: Metadata = { title: "Order confirmed | Crunchie Wunche", description: "Your Crunchie Wunche order is confirmed." };
export default function OrderSuccessPage() { return <><TopBar /><Header /><main className="success-page"><div className="wrap"><SuccessCard /><section className="recommendations"><div><p className="eyebrow pp">A little more to love</p><h2>Recommended products</h2></div><div className="prod-grid">{PRODUCTS.slice(2, 6).map((product, index) => <ProductCard product={product} delay={index + 1} key={product.id} />)}</div></section></div></main><Footer /><CartDrawer /><ToastContainer /><CustomCursor /></>; }
