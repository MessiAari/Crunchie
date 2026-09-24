"use client";

/* eslint-disable @next/next/no-img-element */

import { useRef, useState } from "react";
import { TransitionLink as Link } from "@/components/PageTransition";
import ProductCard from "@/components/ProductCard";
import { useCart } from "@/hooks/useCart";
import { useToast } from "@/hooks/useToast";
import { useWishlist } from "@/hooks/useWishlist";
import { getCompanionProducts, type ProductDetails } from "@/data/productDetails";
import { PRODUCT_CATEGORIES } from "@/data/products";
import styles from "@/app/products/[slug]/product-details.module.css";

const TRUST_POINTS = [
  ["Premium Ingredients", "Thoughtfully sourced for every batch"],
  ["Secure Packaging", "Sealed to protect freshness in transit"],
  ["Fast Shipping", "Dispatched quickly across India"],
  ["Quality Assured", "Made with care and checked before packing"],
];

const FAQS = [
  ["How long does it stay fresh?", "For the best crunch, enjoy within 60 days of packing and keep the pouch tightly sealed after opening."],
  ["Is it vegetarian?", "Yes. This product is made with vegetarian ingredients."],
  ["Does it contain preservatives?", "No artificial preservatives are added. Please refer to the ingredient list for the complete product information."],
  ["How should I store it?", "Store in a cool, dry place away from direct sunlight. Reseal the pack after every serving."],
];

function Stars({ rating }: { rating: number }) {
  return <span className={styles.stars} aria-label={`${rating} out of 5 stars`}>{"\u2605\u2605\u2605\u2605\u2605"}</span>;
}

export default function ProductDetailsView({ product }: { product: ProductDetails }) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isViewerZoomed, setIsViewerZoomed] = useState(false);
  const [pincode, setPincode] = useState("");
  const [pincodeMessage, setPincodeMessage] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const viewerRef = useRef<HTMLDialogElement>(null);
  const { cart, addToCart, decrementCartItem } = useCart();
  const { showToast } = useToast();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const quantity = cart.find((item) => item.id === product.id)?.quantity ?? 0;
  const companionProducts = getCompanionProducts(product.id);
  const categoryLabel = PRODUCT_CATEGORIES.find((category) => category.slug === product.category)?.label ?? product.category;
  const wishlisted = isWishlisted(product.id);

  const addCurrentProduct = () => {
    addToCart({ id: product.id, name: product.name, price: product.price });
    if (quantity === 0) showToast(`${product.name} added to cart`);
  };

  const verifyPincode = () => {
    setPincodeMessage(/^\d{6}$/.test(pincode) ? "Delivery is available to this pincode." : "Enter a valid 6-digit pincode.");
  };

  const addAll = () => {
    [product, ...companionProducts].forEach((item) => addToCart({ id: item.id, name: item.name, price: item.price }));
    showToast("Frequently bought together added to cart");
  };

  return (
    <main className={styles.page}>
      <div className="wrap">
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link href="/">Home</Link><span>/</span><Link href="/products">Products</Link><span>/</span><Link href={`/products?category=${product.category}`}>{categoryLabel}</Link><span>/</span><b>{product.name}</b>
        </nav>

        <section className={styles.hero}>
          <div className={styles.gallery}>
            <button className={styles.primaryImage} type="button" onClick={() => { setIsViewerZoomed(false); viewerRef.current?.showModal(); }} aria-label="Open full-screen product image">
              <img src={product.gallery[selectedImage]} alt={product.name} />
            </button>
            <div className={styles.thumbnails} aria-label="Product image gallery">
              {product.gallery.map((image, index) => (
                <button key={image} className={index === selectedImage ? styles.selectedThumbnail : ""} type="button" onClick={() => setSelectedImage(index)} aria-label={`Show product image ${index + 1}`}>
                  <img src={image} alt="" />
                </button>
              ))}
            </div>
          </div>

          <div className={styles.summary}>
            <p className="eyebrow">{product.cat}</p>
            <h1>{product.name}</h1>
            <div className={styles.rating}><Stars rating={product.rating} /><strong>{product.rating.toFixed(1)}</strong><span>({product.reviews} reviews)</span></div>
            <div className={styles.priceRow}><strong>{"\u20B9"}{product.price.toLocaleString("en-IN")}</strong>{product.oldPrice && <s>{"\u20B9"}{product.oldPrice.toLocaleString("en-IN")}</s>}</div>
            <p className={styles.shortDescription}>{product.description}</p>
            <ul className={styles.highlights}>{product.highlights.map((highlight) => <li key={highlight}><span>{"\u2713"}</span>{highlight}</li>)}</ul>

            <div className={styles.delivery}>
              <label htmlFor="pincode">Delivery pincode</label>
              <div><input id="pincode" value={pincode} onChange={(event) => setPincode(event.target.value.replace(/\D/g, "").slice(0, 6))} inputMode="numeric" placeholder="Enter pincode" /><button type="button" onClick={verifyPincode}>Check</button></div>
              <p>{pincodeMessage || "Free shipping on orders above \u20B9750."}</p>
            </div>

            {quantity > 0 ? (
              <div className={styles.quantityControl} aria-label={`${product.name} quantity`}>
                <button type="button" onClick={() => decrementCartItem(product.id)} aria-label="Decrease quantity">-</button><span aria-live="polite">{quantity}</span><button type="button" onClick={addCurrentProduct} aria-label="Increase quantity">+</button>
              </div>
            ) : <button className={`${styles.addButton} btn btn-emerald`} type="button" onClick={addCurrentProduct}>Add to Cart <span>{"\u2192"}</span></button>}
            <button className={`${styles.wishlistButton} ${wishlisted ? styles.wishlisted : ""}`} type="button" onClick={() => toggleWishlist(product.id)} aria-pressed={wishlisted}>{wishlisted ? "Saved to Wishlist" : "Add to Wishlist"}</button>
          </div>
        </section>

        <section className={styles.contentSection}>
          <p className="eyebrow">The Details</p><h2>Made for a better kind of break</h2><p className={styles.richCopy}>{product.longDescription}</p>
        </section>

        <section className={styles.twoColumnSection}>
          <div><p className="eyebrow">Ingredients</p><h2>Simple things, chosen well</h2><div className={styles.ingredientGrid}>{product.ingredientList.map((ingredient) => <span key={ingredient}>{ingredient}</span>)}</div></div>
          <div><p className="eyebrow">Nutrition Facts</p><h2>Per 30 g serving</h2><dl className={styles.nutrition}>{product.nutrition.map((item) => <div key={item.label}><dt>{item.label}</dt><dd>{item.value}</dd></div>)}</dl></div>
        </section>

        <section className={styles.contentSection}>
          <p className="eyebrow">Perfect For</p><h2>Wherever the day takes you</h2><div className={styles.chips}>{product.perfectFor.map((occasion) => <span key={occasion}>{occasion}</span>)}</div>
        </section>

        <section className={styles.bundle}>
          <div className={styles.bundleIntro}><p className="eyebrow">Frequently Bought Together</p><h2>Make a snack moment of it</h2><p>Three thoughtfully chosen favourites, ready to add in one step.</p><button className="btn btn-emerald" type="button" onClick={addAll}>Add All To Cart <span>{"\u2192"}</span></button></div>
          <div className={styles.bundleItems}>{[product, ...companionProducts].map((item, index) => <div className={styles.bundleItem} key={item.id}><div className={`${styles.bundleArt} ${item.art}`} /><b>{item.name}</b><span>{"\u20B9"}{item.price.toLocaleString("en-IN")}</span>{index < companionProducts.length && <i aria-hidden="true">+</i>}</div>)}</div>
        </section>

        <section className={styles.productSection}>
          <div className={styles.sectionHeading}><div><p className="eyebrow">You May Also Like</p><h2>More to discover</h2></div><Link href="/products">View all products {"\u2192"}</Link></div>
          <div className={styles.productRail}>{companionProducts.map((item, index) => <ProductCard key={item.id} product={item} delay={index + 1} />)}</div>
        </section>

        <section className={styles.reviewsSection}>
          <div className={styles.sectionHeading}><div><p className="eyebrow">Customer Reviews</p><h2>Good words from good snackers</h2></div><div className={styles.reviewScore}><Stars rating={product.rating} /><b>{product.rating.toFixed(1)} / 5</b></div></div>
          <div className={styles.reviewGrid}>{product.reviewsList.map((review) => <article key={review.name} className={styles.review}><div><b>{review.name}</b><span>Verified purchase</span></div><Stars rating={review.rating} /><p>{review.body}</p><time>{review.date}</time></article>)}</div>
        </section>

        <section className={styles.faqSection}>
          <p className="eyebrow">FAQ</p><h2>A few helpful answers</h2>
          <div className={styles.accordion}>{FAQS.map(([question, answer], index) => <div className={openFaq === index ? styles.faqOpen : ""} key={question}><button type="button" onClick={() => setOpenFaq(openFaq === index ? null : index)} aria-expanded={openFaq === index}><span>{question}</span><b>+</b></button><div><p>{answer}</p></div></div>)}</div>
        </section>

        <section className={styles.trustSection}>{TRUST_POINTS.map(([title, body]) => <article key={title}><span>{"\u2713"}</span><h3>{title}</h3><p>{body}</p></article>)}</section>
      </div>

      <dialog className={styles.viewer} ref={viewerRef} onClose={() => setIsViewerZoomed(false)} onClick={(event) => { if (event.target === event.currentTarget) viewerRef.current?.close(); }} aria-label="Full-screen product image">
        <div className={styles.viewerControls}>
          <button type="button" onClick={() => viewerRef.current?.close()} aria-label="Close image viewer">Close</button>
        </div>
        <button className={styles.viewerImageButton} type="button" onClick={() => setIsViewerZoomed((zoomed) => !zoomed)} aria-label={isViewerZoomed ? "Fit product image" : "Zoom product image"} aria-pressed={isViewerZoomed}>
          <img className={isViewerZoomed ? styles.viewerImageZoomed : ""} src={product.gallery[selectedImage]} alt={product.name} />
        </button>
      </dialog>
    </main>
  );
}
