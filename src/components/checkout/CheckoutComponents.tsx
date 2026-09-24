"use client";

import Image from "next/image";
import { TransitionLink as Link } from "@/components/PageTransition";
import { useState } from "react";
import type { Product } from "@/data/products";

export type CheckoutItem = { id: string; name: string; price: number; quantity: number; image: string; art: Product["art"] };

export function ShippingForm() {
  const fields = [["firstName", "First Name", "text", true], ["lastName", "Last Name", "text", true], ["phone", "Phone Number", "tel", true], ["email", "Email Address", "email", true], ["address1", "Address Line 1", "text", true], ["address2", "Address Line 2 (optional)", "text", false], ["city", "City", "text", true], ["state", "State", "text", true], ["pincode", "Pincode", "text", true]] as const;
  return <section className="checkout-section" aria-labelledby="shipping-title"><div className="checkout-section-heading"><span>01</span><h2 id="shipping-title">Shipping information</h2></div><div className="shipping-grid">{fields.map(([name, label, type, required]) => <label key={name} className={name === "address1" || name === "address2" ? "checkout-field full" : "checkout-field"}>{label}<input name={name} type={type} required={required} autoComplete={name === "email" ? "email" : undefined} /></label>)}<label className="checkout-field full">Country<input value="India" readOnly aria-label="Country" /></label></div><label className="save-address"><input type="checkbox" /> <span>Save this address for later</span></label></section>;
}

type Option = { value: string; title: string; detail: string; price?: number };
function SelectableCards({ options, name, heading, step, onChange }: { options: Option[]; name: string; heading: string; step: string; onChange?: (value: string) => void }) {
  const [selected, setSelected] = useState(options[0].value);
  const choose = (value: string) => { setSelected(value); onChange?.(value); };
  return <section className="checkout-section" aria-labelledby={`${name}-title`}><div className="checkout-section-heading"><span>{step}</span><h2 id={`${name}-title`}>{heading}</h2></div><div className="selection-list">{options.map((option) => <label className={`selection-card ${selected === option.value ? "selected" : ""}`} key={option.value}><input type="radio" name={name} checked={selected === option.value} onChange={() => choose(option.value)} /><span className="selection-dot" aria-hidden="true" /><span><strong>{option.title}</strong><small>{option.detail}</small></span>{option.price !== undefined && <b>{option.price === 0 ? "Free" : `₹${option.price}`}</b>}</label>)}</div></section>;
}

export function DeliveryMethod({ onChange }: { onChange: (value: string) => void }) { return <SelectableCards name="delivery" heading="Delivery method" step="02" onChange={onChange} options={[{ value: "standard", title: "Standard Delivery", detail: "Estimated: 3–5 days", price: 60 }, { value: "express", title: "Express Delivery", detail: "Estimated: 1–2 days", price: 150 }]} />; }
export function PaymentMethod() { return <SelectableCards name="payment" heading="Payment method" step="03" options={[{ value: "upi", title: "UPI", detail: "Pay securely with your UPI app" }, { value: "card", title: "Credit / Debit Card", detail: "All major cards accepted" }, { value: "netbanking", title: "Net Banking", detail: "Choose your preferred bank" }, { value: "cod", title: "Cash on Delivery", detail: "Pay when your order arrives" }]} />; }

export function OrderSummary({ items, shipping }: { items: CheckoutItem[]; shipping: string }) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0); const shippingFee = shipping === "express" ? 150 : 60; const tax = Math.round(subtotal * .05); const total = subtotal + shippingFee + tax;
  return <aside className="order-summary" aria-labelledby="summary-title"><div className="summary-heading"><p className="eyebrow pp">Your order</p><h2 id="summary-title">Order summary</h2></div><div className="summary-items">{items.map((item) => <div className="summary-item" key={item.id}><div className={`summary-image ${item.art}`}><Image src={item.image} alt={item.name} width={68} height={68} /></div><div><strong>{item.name}</strong><small>Quantity {item.quantity} · ₹{item.price.toLocaleString("en-IN")}</small></div><b>₹{(item.price * item.quantity).toLocaleString("en-IN")}</b></div>)}</div><div className="coupon"><label htmlFor="coupon-code">Coupon code</label><div><input id="coupon-code" placeholder="Enter code" /><button type="button">Apply</button></div></div><dl className="order-totals"><div><dt>Subtotal</dt><dd>₹{subtotal.toLocaleString("en-IN")}</dd></div><div><dt>Shipping</dt><dd>₹{shippingFee}</dd></div><div><dt>Discount</dt><dd>₹0</dd></div><div><dt>Tax</dt><dd>₹{tax}</dd></div><div className="grand-total"><dt>Grand total</dt><dd>₹{total.toLocaleString("en-IN")}</dd></div></dl></aside>;
}

export function SuccessCard() { return <section className="success-card"><div className="success-mark" aria-hidden="true"><svg viewBox="0 0 72 72" fill="none"><circle cx="36" cy="36" r="32" /><path d="m21 37 10 10 21-23" /></svg></div><p className="eyebrow">Order confirmed</p><h1>Thank you for your order.</h1><p className="success-copy">Your Crunchie Wunche favourites are being prepared with care.</p><div className="success-details"><div><span>Order number</span><strong>CW-260722-184</strong></div><div><span>Estimated delivery</span><strong>27 July 2026</strong></div></div><div className="success-actions"><Link className="btn btn-emerald" href="/products">Continue shopping <span className="arrow">→</span></Link><button className="btn btn-ghost" type="button">Track order</button></div></section>; }
