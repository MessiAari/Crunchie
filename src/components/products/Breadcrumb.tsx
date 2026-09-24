import { TransitionLink as Link } from "@/components/PageTransition";
import styles from "@/app/products/products.module.css";

export default function Breadcrumb({ category }: { category?: string }) {
  return (
    <nav className={styles.breadcrumb} aria-label="Breadcrumb">
      <ol>
        <li><Link href="/">Home</Link></li>
        <li aria-hidden="true">/</li>
        <li>{category ? <Link href="/products">Products</Link> : <span aria-current="page">Products</span>}</li>
        {category && <><li aria-hidden="true">/</li><li><span aria-current="page">{category}</span></li></>}
      </ol>
    </nav>
  );
}
