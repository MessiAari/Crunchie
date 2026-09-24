"use client";

import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import Products from "@/components/Products";
import Mood from "@/components/Mood";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import ToastContainer from "@/components/ToastContainer";
import CustomCursor from "@/components/CustomCursor";
import Ambient from "@/components/Ambient";
import ScrollProgress from "@/components/ScrollProgress";
import RevealOnScroll from "@/components/RevealOnScroll";

export default function Home() {
  return (
    <>
        <ScrollProgress />
        <Ambient />
        <CustomCursor />
        <ToastContainer />
        <TopBar />
        <Header />
        <Hero />
        <Categories />
        <Products />
        <Mood />
        <Testimonials />
        <Footer />
        <CartDrawer />
        <RevealOnScroll />
    </>
  );
}
