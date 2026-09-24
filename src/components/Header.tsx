"use client";

import { useState, useEffect, useRef } from "react";
import { TransitionLink as Link } from "@/components/PageTransition";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import { PRODUCT_CATEGORIES } from "@/data/products";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const categoryMenuRef = useRef<HTMLDivElement>(null);
  const accountMenuRef = useRef<HTMLDivElement>(null);
  const { itemCount, openCart } = useCart();
  const { wishlistCount } = useWishlist();
  const isAuthenticated = false;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!isCategoryMenuOpen) return;

    const closeOnOutsideClick = (event: PointerEvent) => {
      if (!categoryMenuRef.current?.contains(event.target as Node)) setIsCategoryMenuOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsCategoryMenuOpen(false);
    };

    document.addEventListener("pointerdown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [isCategoryMenuOpen]);

  useEffect(() => {
    if (!isAccountMenuOpen) return;

    const closeOnOutsideClick = (event: PointerEvent) => {
      if (!accountMenuRef.current?.contains(event.target as Node)) setIsAccountMenuOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsAccountMenuOpen(false);
    };

    document.addEventListener("pointerdown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [isAccountMenuOpen]);

  return (
    <header className={`site ${scrolled ? "scrolled" : ""}`}>
      <div className="hd">
        <Link href="/" className="logo">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/logo.png" alt="Crunchie Wunche" />
        </Link>
        <nav className="nav">
          <div
            className={`category-dropdown ${isCategoryMenuOpen ? "open" : ""}`}
            ref={categoryMenuRef}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget)) setIsCategoryMenuOpen(false);
            }}
          >
            <button
              className="pill"
              type="button"
              aria-expanded={isCategoryMenuOpen}
              aria-controls="category-menu"
              onClick={() => setIsCategoryMenuOpen((open) => !open)}
            >
              Shop by Categories
              <svg className="car" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>
            <ul className="category-menu" id="category-menu" aria-label="Shop by category">
              {PRODUCT_CATEGORIES.map((category) => (
                <li key={category.slug}>
                  <Link href={`/products?category=${category.slug}`} onClick={() => setIsCategoryMenuOpen(false)}>{category.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <Link href="/products?category=protein-snacks" className="pill">Protein Snacks</Link>
          <Link href="/products?category=healthy-indulgences" className="pill">Healthy Indulgences</Link>
          <Link href="/products?category=gift-boxes" className="pill">Gift Boxes</Link>
          <Link href="/products?category=corporate-orders" className="pill">Corporate Orders</Link>
        </nav>
        <div className="hd-tools">
          <Link className="icbtn" href="/wishlist" aria-label="Wishlist">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden="true">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78Z" />
            </svg>
            <span className={`cart-badge ${wishlistCount > 0 ? "show" : ""}`}>{wishlistCount}</span>
          </Link>
          <button className="icbtn" aria-label="Cart" onClick={openCart}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9">
              <path d="M6 6h15l-1.5 9h-12z" /><path d="M6 6 5 3H2" /><circle cx="9" cy="20" r="1.4" /><circle cx="18" cy="20" r="1.4" />
            </svg>
            <span className={`cart-badge ${itemCount > 0 ? "show" : ""}`}>{itemCount}</span>
          </button>
          <div className={`account-dropdown ${isAccountMenuOpen ? "open" : ""}`} ref={accountMenuRef} onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setIsAccountMenuOpen(false); }}>
            <button className="icbtn" type="button" aria-label="Account" aria-expanded={isAccountMenuOpen} aria-controls="account-menu" onClick={() => setIsAccountMenuOpen((open) => !open)}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden="true">
                <circle cx="12" cy="8" r="3.5" /><path d="M4.5 21a7.5 7.5 0 0 1 15 0" />
              </svg>
            </button>
            <div className="account-menu" id="account-menu" role="menu" aria-label="Account menu">
              {isAuthenticated ? <>
                {["My Profile", "My Orders", "My Wishlist", "Addresses", "Logout"].map((label) => <button key={label} type="button" role="menuitem" onClick={() => setIsAccountMenuOpen(false)}>{label}</button>)}
              </> : <>
                <button type="button" role="menuitem" onClick={() => setIsAccountMenuOpen(false)}>Sign In</button>
                <button type="button" role="menuitem" onClick={() => setIsAccountMenuOpen(false)}>Create Account</button>
              </>}
            </div>
          </div>
          <button className="burger" aria-label="Menu">
            <span /><span /><span />
          </button>
        </div>
      </div>
    </header>
  );
}
