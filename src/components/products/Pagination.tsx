import { TransitionLink as Link } from "@/components/PageTransition";
import styles from "@/app/products/products.module.css";

export default function Pagination({ currentPage, totalPages, searchParams }: { currentPage: number; totalPages: number; searchParams: URLSearchParams }) {
  if (totalPages <= 1) return null;
  const hrefFor = (page: number) => {
    const next = new URLSearchParams(searchParams);
    if (page === 1) next.delete("page"); else next.set("page", String(page));
    const query = next.toString();
    return query ? "/products?" + query : "/products";
  };
  return (
    <nav className={styles.pagination} aria-label="Product results pages">
      <Link href={hrefFor(Math.max(1, currentPage - 1))} aria-disabled={currentPage === 1} tabIndex={currentPage === 1 ? -1 : undefined}>Previous</Link>
      {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => <Link key={page} href={hrefFor(page)} aria-current={page === currentPage ? "page" : undefined}>{page}</Link>)}
      <Link href={hrefFor(Math.min(totalPages, currentPage + 1))} aria-disabled={currentPage === totalPages} tabIndex={currentPage === totalPages ? -1 : undefined}>Next</Link>
    </nav>
  );
}
