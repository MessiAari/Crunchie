export const PRODUCT_CATEGORIES = [
  { slug: "nuts", label: "Nuts" },
  { slug: "protein-snacks", label: "Protein Snacks" },
  { slug: "healthy-indulgences", label: "Healthy Indulgences" },
  { slug: "chakna-boxes", label: "Chakna Boxes" },
  { slug: "gift-boxes", label: "Gift Boxes" },
  { slug: "corporate-orders", label: "Corporate Orders" },
] as const;

export type ProductCategory = (typeof PRODUCT_CATEGORIES)[number]["slug"];
export type ProductFilterKey = "availability" | "occasion" | "ingredient" | "tag";

export interface Product {
  id: string;
  name: string;
  cat: string;
  category: ProductCategory;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  sales: number;
  badge?: string;
  badgeEm?: boolean;
  art: "pm1" | "pm2" | "pm3" | "pm4";
  availability: "in-stock" | "limited-stock";
  occasions: Array<"corporate" | "wedding" | "festive" | "house-party">;
  ingredients: Array<"dry-fruits" | "seeds" | "protein" | "spicy" | "sweet">;
  tags: Array<"best-seller" | "new" | "festive" | "limited">;
}

export const PRODUCTS: Product[] = [
  { id: "royal-chakna-box", name: "Royal Chakna Box", cat: "Chakna Box", category: "chakna-boxes", price: 899, oldPrice: 1099, rating: 4.9, reviews: 320, sales: 1820, badge: "Best Seller", badgeEm: true, art: "pm1", availability: "in-stock", occasions: ["house-party", "festive"], ingredients: ["dry-fruits", "spicy"], tags: ["best-seller"] },
  { id: "emerald-trail-mix", name: "Emerald Trail Mix", cat: "Trail Mix", category: "healthy-indulgences", price: 549, rating: 4.8, reviews: 210, sales: 1240, badge: "New", art: "pm2", availability: "in-stock", occasions: ["corporate"], ingredients: ["dry-fruits", "seeds", "protein"], tags: ["new"] },
  { id: "festive-gold-hamper", name: "Festive Gold Hamper", cat: "Hamper", category: "gift-boxes", price: 1499, rating: 5, reviews: 96, sales: 590, badge: "Festive", art: "pm3", availability: "limited-stock", occasions: ["festive", "wedding", "corporate"], ingredients: ["dry-fruits", "sweet"], tags: ["festive", "limited"] },
  { id: "fiery-masala-puffs", name: "Fiery Masala Puffs", cat: "Puffs", category: "protein-snacks", price: 349, rating: 4.7, reviews: 178, sales: 1440, badge: "Spicy", badgeEm: true, art: "pm4", availability: "in-stock", occasions: ["house-party"], ingredients: ["protein", "spicy"], tags: [] },
  { id: "paan-panache-almonds", name: "Paan Panache Almonds", cat: "Flavoured Nuts", category: "nuts", price: 649, rating: 4.8, reviews: 142, sales: 980, badge: "Best Seller", badgeEm: true, art: "pm1", availability: "in-stock", occasions: ["festive", "wedding"], ingredients: ["dry-fruits", "sweet"], tags: ["best-seller"] },
  { id: "nutri-blend-mix", name: "Nutri Blend Mix", cat: "Trail Mix", category: "nuts", price: 599, rating: 4.6, reviews: 87, sales: 1160, badge: "New", art: "pm2", availability: "in-stock", occasions: ["corporate"], ingredients: ["dry-fruits", "seeds", "protein"], tags: ["new"] },
  { id: "protein-power-bites", name: "Protein Power Bites", cat: "Protein Bites", category: "protein-snacks", price: 449, rating: 4.7, reviews: 115, sales: 1320, art: "pm3", availability: "in-stock", occasions: ["corporate"], ingredients: ["protein", "seeds"], tags: [] },
  { id: "sweet-crunch-clusters", name: "Sweet Crunch Clusters", cat: "Indulgent Bites", category: "healthy-indulgences", price: 399, rating: 4.5, reviews: 74, sales: 740, art: "pm4", availability: "in-stock", occasions: ["festive", "wedding"], ingredients: ["dry-fruits", "sweet"], tags: [] },
  { id: "wedding-welcome-box", name: "Wedding Welcome Box", cat: "Welcome Gift", category: "gift-boxes", price: 1799, rating: 4.9, reviews: 53, sales: 460, badge: "Limited", art: "pm1", availability: "limited-stock", occasions: ["wedding"], ingredients: ["dry-fruits", "sweet"], tags: ["limited"] },
  { id: "boardroom-gifting-set", name: "Boardroom Gifting Set", cat: "Corporate Gifting", category: "corporate-orders", price: 1299, rating: 4.8, reviews: 41, sales: 870, badge: "Best Seller", badgeEm: true, art: "pm2", availability: "in-stock", occasions: ["corporate"], ingredients: ["dry-fruits", "seeds"], tags: ["best-seller"] },
  { id: "house-party-namkeen-box", name: "House Party Namkeen Box", cat: "Namkeen Box", category: "chakna-boxes", price: 749, rating: 4.6, reviews: 129, sales: 1090, art: "pm3", availability: "in-stock", occasions: ["house-party"], ingredients: ["spicy"], tags: [] },
  { id: "festive-corporate-hamper", name: "Festive Corporate Hamper", cat: "Corporate Gifting", category: "corporate-orders", price: 1999, rating: 5, reviews: 28, sales: 380, badge: "Festive", art: "pm4", availability: "limited-stock", occasions: ["corporate", "festive"], ingredients: ["dry-fruits", "sweet"], tags: ["festive", "limited"] },
];

export const FILTER_OPTIONS = {
  availability: [{ value: "in-stock", label: "In stock" }, { value: "limited-stock", label: "Limited stock" }],
  rating: [{ value: "4", label: "4 stars & up" }, { value: "4.5", label: "4.5 stars & up" }],
  occasion: [{ value: "corporate", label: "Corporate" }, { value: "wedding", label: "Wedding" }, { value: "festive", label: "Festive" }, { value: "house-party", label: "House Party" }],
  ingredient: [{ value: "dry-fruits", label: "Dry Fruits" }, { value: "seeds", label: "Seeds" }, { value: "protein", label: "Protein" }, { value: "spicy", label: "Spicy" }, { value: "sweet", label: "Sweet" }],
  tag: [{ value: "best-seller", label: "Best Seller" }, { value: "new", label: "New" }, { value: "festive", label: "Festive" }, { value: "limited", label: "Limited" }],
} as const;

export const PRICE_OPTIONS = [
  { value: "under-500", label: "Under ₹500" },
  { value: "500-1000", label: "₹500 to ₹1,000" },
  { value: "over-1000", label: "Over ₹1,000" },
] as const;

export const SORT_OPTIONS = [
  { value: "popular", label: "Most Popular" }, { value: "newest", label: "Newest" }, { value: "selling", label: "Best Selling" },
  { value: "rating", label: "Highest Rated" }, { value: "price-asc", label: "Price Low to High" }, { value: "price-desc", label: "Price High to Low" }, { value: "arrivals", label: "Newest Arrivals" },
] as const;

export type SortValue = (typeof SORT_OPTIONS)[number]["value"];

const FILTER_VALUE_SETS: Record<ProductFilterKey, ReadonlySet<string>> = {
  availability: new Set(FILTER_OPTIONS.availability.map((option) => option.value)),
  occasion: new Set(FILTER_OPTIONS.occasion.map((option) => option.value)),
  ingredient: new Set(FILTER_OPTIONS.ingredient.map((option) => option.value)),
  tag: new Set(FILTER_OPTIONS.tag.map((option) => option.value)),
};

export function isProductCategory(value: string | undefined): value is ProductCategory {
  return PRODUCT_CATEGORIES.some((category) => category.slug === value);
}

export function normalizeCatalogSearchParams(input: URLSearchParams): URLSearchParams {
  const normalized = new URLSearchParams();
  const category = input.get("category") ?? undefined;
  if (isProductCategory(category)) normalized.set("category", category);

  const price = input.get("price");
  if (PRICE_OPTIONS.some((option) => option.value === price)) normalized.set("price", price as string);

  const rating = input.get("rating");
  if (FILTER_OPTIONS.rating.some((option) => option.value === rating)) normalized.set("rating", rating as string);

  for (const key of ["availability", "occasion", "ingredient", "tag"] as const) {
    const values = [...new Set(input.getAll(key))].filter((value) => FILTER_VALUE_SETS[key].has(value));
    values.forEach((value) => normalized.append(key, value));
  }

  const sort = input.get("sort");
  if (SORT_OPTIONS.some((option) => option.value === sort) && sort !== "popular") normalized.set("sort", sort as string);

  const page = Number.parseInt(input.get("page") ?? "1", 10);
  if (Number.isSafeInteger(page) && page > 1 && page <= 1000) normalized.set("page", String(page));
  return normalized;
}

export function filterProducts(params: URLSearchParams): Product[] {
  const category = params.get("category") ?? undefined;
  const price = params.get("price");
  const rating = Number(params.get("rating"));
  const sort = params.get("sort") as SortValue | null;
  const availability = params.getAll("availability");
  const occasions = params.getAll("occasion");
  const ingredients = params.getAll("ingredient");
  const tags = params.getAll("tag");
  const products = PRODUCTS.filter((product) => {
    if (isProductCategory(category) && product.category !== category) return false;
    if (availability.length && !availability.includes(product.availability)) return false;
    if (Number.isFinite(rating) && rating > 0 && product.rating < rating) return false;
    if (occasions.length && !occasions.some((value) => product.occasions.includes(value as Product["occasions"][number]))) return false;
    if (ingredients.length && !ingredients.some((value) => product.ingredients.includes(value as Product["ingredients"][number]))) return false;
    if (tags.length && !tags.some((value) => product.tags.includes(value as Product["tags"][number]))) return false;
    if (price === "under-500" && product.price >= 500) return false;
    if (price === "500-1000" && (product.price < 500 || product.price > 1000)) return false;
    if (price === "over-1000" && product.price <= 1000) return false;
    return true;
  });
  return [...products].sort((a, b) => {
    if (sort === "price-asc") return a.price - b.price;
    if (sort === "price-desc") return b.price - a.price;
    if (sort === "rating") return b.rating - a.rating;
    if (sort === "selling") return b.sales - a.sales;
    if (sort === "newest" || sort === "arrivals") return b.id.localeCompare(a.id);
    return b.reviews - a.reviews;
  });
}
