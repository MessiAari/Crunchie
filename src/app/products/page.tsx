import type { Metadata } from "next";
import ProductCard from "@/components/ProductCard";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import ToastContainer from "@/components/ToastContainer";
import RevealOnScroll from "@/components/RevealOnScroll";
import CustomCursor from "@/components/CustomCursor";
import Breadcrumb from "@/components/products/Breadcrumb";
import EmptyState from "@/components/products/EmptyState";
import FilterChips from "@/components/products/FilterChips";
import Pagination from "@/components/products/Pagination";
import { CategorySidebar, MobileFilters, SortDropdown } from "@/components/products/ProductFilters";
import { filterProducts, isProductCategory, normalizeCatalogSearchParams, PRODUCT_CATEGORIES } from "@/data/products";
import styles from "./products.module.css";

export const metadata: Metadata = {
  title: "Products | Crunchie Wunche",
  description: "Explore premium snacks, gifting boxes, festive hampers, and corporate gifting from Crunchie Wunche.",
};

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

function toUrlSearchParams(input: Awaited<SearchParams>) {
  const params = new URLSearchParams();
  Object.entries(input).forEach(([key, value]) => {
    if (Array.isArray(value)) value.forEach((item) => params.append(key, item));
    else if (value !== undefined) params.set(key, value);
  });
  return normalizeCatalogSearchParams(params);
}

export default async function ProductsPage({ searchParams }: { searchParams: SearchParams }) {
  const params = toUrlSearchParams(await searchParams);
  const categorySlug = params.get("category") ?? undefined;
  const category = isProductCategory(categorySlug) ? PRODUCT_CATEGORIES.find((item) => item.slug === categorySlug) : undefined;
  const heading = category?.label ?? "All Products";
  const filtered = filterProducts(params);
  const pageSize = 8;
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const requestedPage = Number.parseInt(params.get("page") ?? "1", 10);
  const currentPage = Math.min(Math.max(requestedPage, 1), totalPages);
  const products = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <>
      <TopBar />
      <Header />
      <main className={styles.page}>
        <div className="wrap">
          <Breadcrumb category={category?.label} />
          <header className={styles.pageHeader}>
            <div><div className="eyebrow">Our Collection</div><h1>{heading}</h1></div>
            <p>Thoughtfully curated snacks and gifts for everyday moments, celebrations, and meaningful business relationships.</p>
          </header>
          <div className={styles.toolbar}>
            <p aria-live="polite"><strong>{filtered.length}</strong> {filtered.length === 1 ? "product" : "products"}</p>
            <div className={styles.toolbarActions}><MobileFilters /><SortDropdown /></div>
          </div>
          <FilterChips />
          <div className={styles.catalogLayout}>
            <CategorySidebar />
            <section className={styles.results} aria-label="Products">
              {products.length ? <div className={styles.productGrid}>{products.map((product, index) => <ProductCard key={product.id} product={product} delay={(index % 4) + 1} />)}</div> : <EmptyState />}
              <Pagination currentPage={currentPage} totalPages={totalPages} searchParams={params} />
            </section>
          </div>
        </div>
      </main>
      <Footer />
      <CartDrawer />
      <ToastContainer />
      <RevealOnScroll />
      <CustomCursor />
    </>
  );
}
