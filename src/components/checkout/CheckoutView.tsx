"use client";

import { useState } from "react";
import { TransitionLink as Link } from "@/components/PageTransition";
import { useCart } from "@/hooks/useCart";
import { PRODUCTS } from "@/data/products";
import { getProductDetails } from "@/data/productDetails";
import { DeliveryMethod, OrderSummary, PaymentMethod, ShippingForm, type CheckoutItem } from "./CheckoutComponents";

const fallbackItems = PRODUCTS.slice(0, 2).map((product) => ({ ...product, quantity: product.id === "royal-chakna-box" ? 1 : 2 }));
export default function CheckoutView() {
  const { cart } = useCart(); const [delivery, setDelivery] = useState("standard");
  const items: CheckoutItem[] = (cart.length ? cart : fallbackItems).map((item) => { const product = PRODUCTS.find((candidate) => candidate.id === item.id) ?? PRODUCTS[0]; return { ...item, art: product.art, image: getProductDetails(product.id)?.gallery[0] ?? "/assets/Images/Sales Images/Healthy Mix.png" }; });
  return <main className="checkout-page"><div className="wrap"><header className="checkout-header"><div><p className="eyebrow">A few final details</p><h1>Checkout</h1></div><Link href="/products" className="checkout-back">← Continue shopping</Link></header><div className="checkout-layout"><form className="checkout-form" onSubmit={(event) => event.preventDefault()}><ShippingForm /><DeliveryMethod onChange={setDelivery} /><PaymentMethod /><Link href="/order-success" className="place-order btn btn-emerald">Place order <span className="arrow">→</span></Link></form><OrderSummary items={items} shipping={delivery} /></div></div></main>;
}
