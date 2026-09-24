"use client";

import ProductCard from "@/components/ProductCard";
import { TransitionLink as Link } from "@/components/PageTransition";
import { PRODUCTS } from "@/data/products";

export default function Products() {
  return (
    <section className="section" id="bestsellers">
      <div className="wrap">
        <div className="sec-head">
          <div>
            <div className="eyebrow pp reveal">Best Sellers</div>
            <h2 className="reveal" data-d="1" style={{ marginTop: 16 }}>Loved by the crowd.</h2>
          </div>
          <Link href="/products" className="view-all reveal" data-d="2">
            View all products
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </Link>
        </div>
        <div className="prod-grid">
          {PRODUCTS.slice(0, 4).map((product, index) => <ProductCard key={product.id} product={product} delay={index + 1} />)}
        </div>
      </div>
    </section>
  );
}
