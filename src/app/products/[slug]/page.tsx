import type { Metadata } from "next";
import { notFound } from "next/navigation";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import ToastContainer from "@/components/ToastContainer";
import CustomCursor from "@/components/CustomCursor";
import RevealOnScroll from "@/components/RevealOnScroll";
import ProductDetailsView from "@/components/products/ProductDetailsView";
import { getProductDetails } from "@/data/productDetails";

type ProductPageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductDetails(slug);
  if (!product) return { title: "Product Not Found | Crunchie Wunche" };
  return { title: `${product.name} | Crunchie Wunche`, description: product.description };
}

export default async function ProductDetailsPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductDetails(slug);
  if (!product) notFound();

  return (
    <>
      <TopBar />
      <Header />
      <ProductDetailsView product={product} />
      <Footer />
      <CartDrawer />
      <ToastContainer />
      <RevealOnScroll />
      <CustomCursor />
    </>
  );
}
