import type { Metadata } from "next";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import ToastContainer from "@/components/ToastContainer";
import CustomCursor from "@/components/CustomCursor";
import CheckoutView from "@/components/checkout/CheckoutView";
import "./checkout.css";

export const metadata: Metadata = { title: "Checkout | Crunchie Wunche", description: "Complete your Crunchie Wunche order." };
export default function CheckoutPage() { return <><TopBar /><Header /><CheckoutView /><Footer /><CartDrawer /><ToastContainer /><CustomCursor /></>; }
