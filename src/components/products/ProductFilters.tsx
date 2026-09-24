"use client";

import { useRef } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  FILTER_OPTIONS,
  normalizeCatalogSearchParams,
  PRICE_OPTIONS,
  PRODUCT_CATEGORIES,
  SORT_OPTIONS,
  type ProductFilterKey,
} from "@/data/products";
import styles from "@/app/products/products.module.css";

const GROUPS = [
  { key: "availability", title: "Availability", options: FILTER_OPTIONS.availability },
  { key: "occasion", title: "Occasion", options: FILTER_OPTIONS.occasion },
  { key: "ingredient", title: "Ingredients", options: FILTER_OPTIONS.ingredient },
  { key: "tag", title: "Tags", options: FILTER_OPTIONS.tag },
] as const;

function Filters({ onChange }: { onChange?: () => void }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const selected = normalizeCatalogSearchParams(new URLSearchParams(searchParams.toString()));

  const navigate = (next: URLSearchParams) => {
    next.delete("page");
    const query = next.toString();
    router.push(query ? pathname + "?" + query : pathname, { scroll: false });
    onChange?.();
  };

  const setSingle = (key: string, value: string) => {
    const next = new URLSearchParams(selected);
    if (next.get(key) === value) next.delete(key); else next.set(key, value);
    navigate(next);
  };

  const toggleMultiple = (key: ProductFilterKey, value: string) => {
    const next = new URLSearchParams(selected);
    const values = next.getAll(key);
    next.delete(key);
    const updated = values.includes(value) ? values.filter((item) => item !== value) : [...values, value];
    updated.forEach((item) => next.append(key, item));
    navigate(next);
  };

  return (
    <div className={styles.filterGroups}>
      <fieldset className={styles.filterGroup}>
        <legend>Categories</legend>
        {PRODUCT_CATEGORIES.map((option) => (
          <label key={option.slug} className={styles.filterOption}>
            <input type="radio" name="category" checked={selected.get("category") === option.slug} onChange={() => setSingle("category", option.slug)} />
            <span>{option.label}</span>
          </label>
        ))}
      </fieldset>

      <fieldset className={styles.filterGroup}>
        <legend>Price</legend>
        {PRICE_OPTIONS.map((option) => (
          <label key={option.value} className={styles.filterOption}>
            <input type="radio" name="price" checked={selected.get("price") === option.value} onChange={() => setSingle("price", option.value)} />
            <span>{option.label}</span>
          </label>
        ))}
      </fieldset>

      <fieldset className={styles.filterGroup}>
        <legend>Rating</legend>
        {FILTER_OPTIONS.rating.map((option) => (
          <label key={option.value} className={styles.filterOption}>
            <input type="radio" name="rating" checked={selected.get("rating") === option.value} onChange={() => setSingle("rating", option.value)} />
            <span>{option.label}</span>
          </label>
        ))}
      </fieldset>

      {GROUPS.map((group) => (
        <fieldset key={group.key} className={styles.filterGroup}>
          <legend>{group.title}</legend>
          {group.options.map((option) => (
            <label key={option.value} className={styles.filterOption}>
              <input type="checkbox" checked={selected.getAll(group.key).includes(option.value)} onChange={() => toggleMultiple(group.key, option.value)} />
              <span>{option.label}</span>
            </label>
          ))}
        </fieldset>
      ))}
    </div>
  );
}

export function CategorySidebar() {
  return <aside className={styles.sidebar} aria-label="Product filters"><h2>Filters</h2><Filters /></aside>;
}

export function MobileFilters() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  return (
    <>
      <button className={styles.filterButton} type="button" onClick={() => dialogRef.current?.showModal()} aria-haspopup="dialog">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M4 7h16M7 12h10M10 17h4" /></svg>
        Filters
      </button>
      <dialog className={styles.filterDialog} ref={dialogRef} aria-labelledby="mobile-filter-title">
        <div className={styles.dialogHeader}>
          <h2 id="mobile-filter-title">Filters</h2>
          <button type="button" onClick={() => dialogRef.current?.close()} aria-label="Close filters">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" /></svg>
          </button>
        </div>
        <Filters onChange={() => dialogRef.current?.close()} />
      </dialog>
    </>
  );
}

export function SortDropdown() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const selected = normalizeCatalogSearchParams(new URLSearchParams(searchParams.toString()));
  const updateSort = (value: string) => {
    const next = new URLSearchParams(selected);
    next.delete("page");
    if (value === "popular") next.delete("sort"); else next.set("sort", value);
    const query = next.toString();
    router.push(query ? pathname + "?" + query : pathname, { scroll: false });
  };
  return (
    <label className={styles.sortControl}>
      <span>Sort by</span>
      <select value={selected.get("sort") ?? "popular"} onChange={(event) => updateSort(event.target.value)}>
        {SORT_OPTIONS.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
      </select>
    </label>
  );
}
