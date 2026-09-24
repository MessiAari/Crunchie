"use client";

import { TransitionLink as Link } from "@/components/PageTransition";
import ProductCard from "@/components/ProductCard";
import { PRODUCTS } from "@/data/products";
import { useWishlist } from "@/hooks/useWishlist";
import styles from "@/app/wishlist/wishlist.module.css";

export default function WishlistView() {
  const { wishlistIds, wishlistCount } = useWishlist();
  const products = PRODUCTS.filter((product) => wishlistIds.includes(product.id));

  return (
    <main className={styles.page}>
      <div className="wrap">
        <nav className={styles.breadcrumb} aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><b>Wishlist</b></nav>
        <header className={styles.header}>
          <div><p className="eyebrow">Saved Favourites</p><h1>Your Wishlist</h1></div>
          <p>{wishlistCount ? `${wishlistCount} ${wishlistCount === 1 ? "item" : "items"} saved for later.` : "Keep the snacks and gifts you love close at hand."}</p>
        </header>
        {products.length ? <section className={styles.grid} aria-label="Wishlist products">{products.map((product, index) => <ProductCard key={product.id} product={product} delay={(index % 4) + 1} />)}</section> : <section className={styles.empty} aria-label="Empty wishlist"><span aria-hidden="true">♡</span><h2>Nothing saved yet</h2><p>Tap the heart on any product to keep it here for later.</p><Link className="btn btn-emerald" href="/products">Explore products <span>→</span></Link></section>}
      </div>
    </main>
  );
}
