import { PRODUCTS, type Product } from "@/data/products";

export interface ProductReview {
  name: string;
  rating: number;
  date: string;
  body: string;
}

export interface ProductDetails extends Product {
  description: string;
  longDescription: string;
  gallery: string[];
  highlights: string[];
  ingredientList: string[];
  nutrition: Array<{ label: string; value: string }>;
  perfectFor: string[];
  reviewsList: ProductReview[];
}

const GALLERY_BY_CATEGORY: Record<Product["category"], string[]> = {
  nuts: [
    "/assets/Images/Nuts/Nutri Blend HM/9427.jpg",
    "/assets/Images/Nuts/Nutri Blend HM/9388.jpg",
    "/assets/Images/Nuts/Nutri Blend HM/9374.jpg",
  ],
  "protein-snacks": [
    "/assets/Images/Puff/Multigrain Puff/Lime & Sriracha/web/front pack.jpg",
    "/assets/Images/Puff/Multigrain Puff/Lime & Sriracha/web/mood shot.jpg",
    "/assets/Images/Puff/Multigrain Puff/Lime & Sriracha/web/close up.jpg",
  ],
  "healthy-indulgences": [
    "/assets/Images/Sales Images/Healthy Mix.png",
    "/assets/Images/Sales Images/Blueberry Almond.png",
    "/assets/Images/Nuts/Nutri Blend HM/9388.jpg",
  ],
  "chakna-boxes": [
    "/assets/Images/Sales Images/Multigrain Bhel.png",
    "/assets/Images/Sales Images/Masala Bundi.png",
    "/assets/Images/Sales Images/Kerala Mixture.png",
  ],
  "gift-boxes": [
    "/assets/Images/Diwali/9986.jpg",
    "/assets/Images/Diwali/9971.jpg",
    "/assets/Images/Diwali/9921.jpg",
  ],
  "corporate-orders": [
    "/assets/Images/Diwali/9909.jpg",
    "/assets/Images/Diwali/9921.jpg",
    "/assets/Images/Diwali/9986.jpg",
  ],
};

const NUTRITION = [
  { label: "Calories", value: "178 kcal" },
  { label: "Protein", value: "6.4 g" },
  { label: "Carbohydrates", value: "18.2 g" },
  { label: "Fat", value: "8.9 g" },
  { label: "Fiber", value: "4.8 g" },
  { label: "Sugar", value: "5.1 g" },
  { label: "Sodium", value: "94 mg" },
];

const REVIEWS: ProductReview[] = [
  { name: "Aditi Mehra", rating: 5, date: "12 February 2026", body: "Fresh, balanced, and genuinely satisfying. It has become my desk-drawer essential." },
  { name: "Rohan Kapoor", rating: 5, date: "28 January 2026", body: "The packaging feels thoughtful and the mix stays crisp. Excellent for travel days." },
  { name: "Naina Shah", rating: 4, date: "08 January 2026", body: "A well-made snack with a nice variety in every handful. I would happily order it again." },
];

function ingredientsFor(product: Product) {
  const values = new Set<string>();
  if (product.ingredients.includes("dry-fruits")) values.add("Almonds");
  if (product.ingredients.includes("seeds")) values.add("Pumpkin Seeds");
  if (product.ingredients.includes("protein")) values.add("Roasted Chickpeas");
  if (product.ingredients.includes("spicy")) values.add("Signature Spice Blend");
  if (product.ingredients.includes("sweet")) values.add("Cranberries");
  values.add("Cashews");
  values.add("Raisins");
  return [...values];
}

export function getProductDetails(slug: string): ProductDetails | undefined {
  const product = PRODUCTS.find((item) => item.id === slug);
  if (!product) return undefined;

  const ingredients = ingredientsFor(product);

  return {
    ...product,
    description: `A thoughtfully balanced ${product.cat.toLowerCase()} made for bright, busy days and unhurried breaks.`,
    longDescription: `${product.name} brings together considered ingredients, vibrant flavour, and the satisfying crunch Crunchie Wunche is known for. Every batch is packed with care to stay fresh from your first bite to your last. Keep it close for a workday pause, a road trip, or an easy gesture of good taste.`,
    gallery: GALLERY_BY_CATEGORY[product.category],
    highlights: ["Premium ingredients", "Healthy and fresh", "Secure packaging", "Fast shipping"],
    ingredientList: ingredients,
    nutrition: NUTRITION,
    perfectFor: ["Office", "Travel", "Gym", "Kids", "Corporate Gifting", "Tea Time"],
    reviewsList: REVIEWS,
  };
}

export function getCompanionProducts(productId: string, count = 3) {
  return PRODUCTS.filter((product) => product.id !== productId).slice(0, count);
}
