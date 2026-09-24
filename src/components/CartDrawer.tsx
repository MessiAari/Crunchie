"use client";

import { useCart } from "@/hooks/useCart";
import { TransitionLink as Link } from "@/components/PageTransition";
import { PRODUCTS } from "@/data/products";
import { getProductDetails } from "@/data/productDetails";

export default function CartDrawer() {
  const { cart, addToCart, decrementCartItem, isOpen, closeCart, total } = useCart();

  return (
    <>
      <div className={`scrim ${isOpen ? "open" : ""}`} onClick={closeCart} />
      <aside className={`drawer ${isOpen ? "open" : ""}`} aria-label="Cart">
        <div className="drawer-h">
          <b>Your Cart</b>
          <button className="drawer-x" aria-label="Close" onClick={closeCart}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
        </div>
        <div className="drawer-body">
          {cart.length === 0 && <div className="drawer-empty">Your cart is empty - add something crunchy.</div>}
          {cart.map((item) => (
            <div key={item.id} className="citem in">
              <div className={`ci-art ${PRODUCTS.find((product) => product.id === item.id)?.art ?? "pm1"}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={getProductDetails(item.id)?.gallery[0] ?? "/assets/Images/Sales Images/Healthy Mix.png"} alt="" />
              </div>
              <div>
                <b>{item.name}</b>
                <div className="drawer-quantity" aria-label={`${item.name} quantity`}>
                  <button type="button" onClick={() => decrementCartItem(item.id)} aria-label={`Decrease ${item.name} quantity`}>-</button>
                  <span>{item.quantity}</span>
                  <button type="button" onClick={() => addToCart(item)} aria-label={`Increase ${item.name} quantity`}>+</button>
                </div>
              </div>
              <div className="ci-pr">{"\u20B9"}{(item.price * item.quantity).toLocaleString("en-IN")}</div>
            </div>
          ))}
        </div>
        <div className="drawer-f">
          <div className="drawer-tot">
            <span>Subtotal</span>
            <b>{"\u20B9"}{total.toLocaleString("en-IN")}</b>
          </div>
          <Link href="/checkout" onClick={closeCart} className="btn btn-emerald magnetic" style={{ width: "100%", justifyContent: "center" }}>
            Checkout <span className="arrow">{"\u2192"}</span>
          </Link>
        </div>
      </aside>
    </>
  );
}
