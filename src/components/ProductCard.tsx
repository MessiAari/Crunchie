"use client";

import type { Product } from "@/data/products";
import { TransitionLink as Link } from "@/components/PageTransition";
import Image from "next/image";
import { useCart } from "@/hooks/useCart";
import { useToast } from "@/hooks/useToast";
import { useWishlist } from "@/hooks/useWishlist";
import { getProductDetails } from "@/data/productDetails";

export default function ProductCard({ product, delay }: { product: Product; delay?: number }) {
  const { cart, addToCart, decrementCartItem } = useCart();
  const { showToast } = useToast();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const quantity = cart.find((item) => item.id === product.id)?.quantity ?? 0;
  const wishlisted = isWishlisted(product.id);
  const productImage = getProductDetails(product.id)?.gallery[0];

  const handleAdd = () => {
    addToCart({ id: product.id, name: product.name, price: product.price });
    if (quantity === 0) showToast(`${product.name} added to cart`);
  };

  return (
    <article className="pcard reveal" data-d={delay ? String(delay) : undefined}>
      <Link className="product-detail-link" href={`/products/${product.id}`} aria-label={`View ${product.name}`} />
      <div className="pcard-media">
        {productImage ? <Image className="pcard-image" src={productImage} alt="" fill sizes="(max-width: 520px) 100vw, (max-width: 1080px) 50vw, 25vw" /> : <div className={`pcard-art ${product.art}`} />}
        {product.badge && <span className={`pbadge ${product.badgeEm ? "em" : ""}`}>{product.badge}</span>}
        <button className={`pfav ${wishlisted ? "active" : ""}`} type="button" aria-label={`${wishlisted ? "Remove" : "Add"} ${product.name} ${wishlisted ? "from" : "to"} wishlist`} aria-pressed={wishlisted} onClick={() => toggleWishlist(product.id)}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
            <path d="M12 21s-7-4.3-7-9.5A3.5 3.5 0 0 1 12 8a3.5 3.5 0 0 1 7 3.5C19 16.7 12 21 12 21Z" />
          </svg>
        </button>
      </div>
      <div className="pcard-body">
        <div className="pcat">{product.cat}</div>
        <h3>{product.name}</h3>
        <div className="prate">
          <span className="stars" aria-label={`${product.rating} out of 5 stars`}>{"\u2605\u2605\u2605\u2605\u2605"}</span>
          {product.rating.toFixed(1)}{" \u00B7 "}{product.reviews} reviews
        </div>
        <div className="pfoot">
          <div className="price">
            {"\u20B9"}{product.price.toLocaleString("en-IN")}
            {product.oldPrice && <s>{"\u20B9"}{product.oldPrice.toLocaleString("en-IN")}</s>}
          </div>
          {quantity > 0 ? (
            <div className="quantity-control" aria-label={`${product.name} quantity`}>
              <button type="button" onClick={() => decrementCartItem(product.id)} aria-label={`Decrease ${product.name} quantity`}>-</button>
              <span aria-live="polite">{quantity}</span>
              <button type="button" onClick={handleAdd} aria-label={`Increase ${product.name} quantity`}>+</button>
            </div>
          ) : (
            <button className="add" type="button" onClick={handleAdd} aria-label={`Add ${product.name} to cart`}>
              <span>Add</span>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true"><path d="M12 5v14M5 12h14" /></svg>
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
