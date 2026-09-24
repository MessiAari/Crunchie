import { TransitionLink as Link } from "@/components/PageTransition";
import styles from "@/app/products/products.module.css";

export default function EmptyState() {
  return (
    <div className={styles.emptyState} role="status">
      <h2>No products match your filters.</h2>
      <div><Link className="btn btn-primary" href="/products">Clear Filters</Link><Link className="btn btn-ghost" href="/products">Back to Products</Link></div>
    </div>
  );
}
