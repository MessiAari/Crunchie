"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FILTER_OPTIONS, normalizeCatalogSearchParams, PRICE_OPTIONS, PRODUCT_CATEGORIES } from "@/data/products";
import styles from "@/app/products/products.module.css";

const labels = new Map<string, string>([
  ...PRODUCT_CATEGORIES.map((option) => [option.slug, option.label] as const),
  ...PRICE_OPTIONS.map((option) => [option.value, option.label] as const),
  ...Object.values(FILTER_OPTIONS).flat().map((option) => [option.value, option.label] as const),
]);

export default function FilterChips() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const selected = normalizeCatalogSearchParams(new URLSearchParams(searchParams.toString()));
  const chips = [...selected.entries()].filter(([key]) => key !== "sort" && key !== "page");
  if (!chips.length) return null;

  const remove = (key: string, value: string) => {
    const next = new URLSearchParams(selected);
    const remaining = next.getAll(key).filter((item) => item !== value);
    next.delete(key);
    remaining.forEach((item) => next.append(key, item));
    next.delete("page");
    const query = next.toString();
    router.push(query ? pathname + "?" + query : pathname, { scroll: false });
  };

  return (
    <div className={styles.chips} aria-label="Active filters">
      {chips.map(([key, value]) => (
        <button key={key + value} type="button" onClick={() => remove(key, value)}>
          {labels.get(value) ?? value}<span aria-hidden="true">×</span><span className={styles.srOnly}>Remove filter</span>
        </button>
      ))}
      <button className={styles.clearAll} type="button" onClick={() => router.push(pathname, { scroll: false })}>Clear All</button>
    </div>
  );
}
