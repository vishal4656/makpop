"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { useCartStore } from "@/lib/store";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Lock,
  MapPin,
  CreditCard,
  Truck,
  User,
  Smartphone,
  Mail,
  ChevronRight,
  Loader2,
} from "lucide-react";

// --- Firebase Imports ---
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase";

export default function CheckoutPage() {
  const { items, getTotal, clearCart } = useCartStore();
  const router = useRouter();

  // State
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [user, setUser] = useState(null);
  
  // Start with loading TRUE so we don't redirect immediately
  const [authLoading, setAuthLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
    state: "",
  });

  // --- 1. Listen for Auth Changes (Just update state) ---
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("Auth State Changed:", currentUser); // Debugging Log
      
      if (currentUser) {
        setUser(currentUser);
        // Pre-fill form if data is missing
        setFormData((prev) => ({
          ...prev,
          name: prev.name || currentUser.displayName || "",
          email: prev.email || currentUser.email || "",
          phone: prev.phone || currentUser.phoneNumber || "",
        }));
      } else {
        setUser(null);
      }
      
      // Stop loading once we know the state (logged in OR logged out)
      setAuthLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // --- 2. Handle Redirects (Only after loading is done) ---
  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        // Only redirect if loading is finished AND no user found
        router.push("/sign-in");
      } else if (items.length === 0) {
        // Redirect if cart is empty
        router.push("/cart");
      }
    }
  }, [authLoading, user, items, router]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      alert("Order placed successfully! Welcome to the Makpop family.");
      clearCart();
      router.push("/");
      setIsProcessing(false);
    }, 2000);
  };

  // --- Loading Spinner (Shows while checking Firebase) ---
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5F5F7]">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-10 h-10 animate-spin text-green-900" />
          <p className="text-sm text-gray-500 font-medium">Verifying User...</p>
        </div>
      </div>
    );
  }

  // Prevent rendering the rest if no user (wait for redirect)
  if (!user) return null;
  // Prevent rendering if empty cart (wait for redirect)
  if (items.length === 0) return null;

  const total = getTotal();
  const shipping = total >= 499 ? 0 : 49;
  const grandTotal = total + shipping;

  return (
    <div className="bg-[#F5F5F7] min-h-screen pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-20">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-green-950">Checkout</h1>
            <span className="text-gray-300">|</span>
            <span className="text-sm text-gray-500 flex items-center gap-1">
              <Lock className="w-3 h-3" /> Secure Connection
            </span>
          </div>
          <div className="text-sm font-medium text-green-900">
            Total: {formatPrice(grandTotal)}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* --- LEFT COLUMN: FORMS --- */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-7 space-y-8"
          >
            <form id="checkout-form" onSubmit={handleSubmit} className="space-y-8">
              
              {/* 1. Contact Info */}
              <section className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100">
                <h2 className="text-lg font-bold text-green-950 mb-6 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-800 text-sm">1</div>
                  Contact Information
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5 ml-1">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                      <Input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        className="pl-12 h-12 rounded-xl bg-gray-50 border-gray-200 focus:bg-white transition-colors"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5 ml-1">Phone Number</label>
                    <div className="relative">
                      <Smartphone className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                      <Input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 98765 43210"
                        className="pl-12 h-12 rounded-xl bg-gray-50 border-gray-200 focus:bg-white transition-colors"
                      />
                    </div>
                  </div>
                </div>
              </section>

              {/* 2. Shipping Address */}
              <section className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100">
                <h2 className="text-lg font-bold text-green-950 mb-6 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-800 text-sm">2</div>
                  Shipping Address
                </h2>
                <div className="space-y-4">
                  <div className="relative">
                    <User className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                    <Input
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Full Name"
                      className="pl-12 h-12 rounded-xl bg-gray-50 border-gray-200 focus:bg-white"
                    />
                  </div>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                    <Input
                      name="address"
                      required
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Address Line 1"
                      className="pl-12 h-12 rounded-xl bg-gray-50 border-gray-200 focus:bg-white"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="City"
                      className="h-12 rounded-xl bg-gray-50 border-gray-200 focus:bg-white"
                    />
                    <Input
                      name="pincode"
                      required
                      value={formData.pincode}
                      onChange={handleChange}
                      placeholder="Pincode"
                      className="h-12 rounded-xl bg-gray-50 border-gray-200 focus:bg-white"
                    />
                  </div>
                </div>
              </section>

              {/* 3. Payment Method */}
              <section className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100">
                <h2 className="text-lg font-bold text-green-950 mb-6 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-800 text-sm">3</div>
                  Payment Method
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div
                    onClick={() => setPaymentMethod("cod")}
                    className={`cursor-pointer p-4 rounded-xl border-2 flex items-center gap-3 transition-all ${
                      paymentMethod === "cod"
                        ? "border-green-600 bg-green-50/50"
                        : "border-gray-100 hover:border-gray-200"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                        paymentMethod === "cod"
                          ? "border-green-600"
                          : "border-gray-300"
                      }`}
                    >
                      {paymentMethod === "cod" && (
                        <div className="w-2.5 h-2.5 bg-green-600 rounded-full" />
                      )}
                    </div>
                    <Truck className="w-5 h-5 text-gray-600" />
                    <span className="font-medium text-gray-700">Cash on Delivery</span>
                  </div>
                </div>
              </section>

            </form>
          </motion.div>

          {/* --- RIGHT COLUMN: SUMMARY --- */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-5"
          >
            <div className="sticky top-24">
              <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                <div className="bg-gray-50 p-6 border-b border-gray-100">
                  <h3 className="font-bold text-lg text-green-950">Order Summary</h3>
                  <p className="text-sm text-gray-500">{items.length} Items in cart</p>
                </div>

                <div className="p-6 max-h-[400px] overflow-y-auto space-y-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <div className="relative w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 border border-gray-200">
                        {item.image?.src?.src ? (
                          <img
                            src={item.image.src.src}
                            alt={item.name}
                            className="object-cover w-full h-full"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-200 flex items-center justify-center text-xs text-gray-500">
                            No Img
                          </div>
                        )}
                        <div className="absolute bottom-0 right-0 bg-gray-900 text-white text-[10px] px-1.5 py-0.5 rounded-tl-md font-bold">
                          x{item.quantity}
                        </div>
                      </div>
                      <div className="flex-1 flex flex-col justify-center">
                        <h4 className="font-semibold text-gray-900 text-sm">{item.name}</h4>
                        <p className="text-xs text-gray-500">{item.weight || "100g"}</p>
                      </div>
                      <div className="flex items-center">
                        <p className="font-bold text-gray-900">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-gray-50 p-6 border-t border-gray-100 space-y-3">
                  <div className="flex justify-between text-gray-600 text-sm">
                    <span>Subtotal</span>
                    <span className="font-medium text-gray-900">{formatPrice(total)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600 text-sm">
                    <span>Shipping</span>
                    {shipping === 0 ? (
                      <span className="text-green-600 font-bold">Free</span>
                    ) : (
                      <span className="font-medium text-gray-900">{formatPrice(shipping)}</span>
                    )}
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t border-gray-200 mt-4">
                    <span className="text-lg font-bold text-gray-900">Total</span>
                    <div className="text-right">
                      <span className="text-2xl font-black text-green-900">{formatPrice(grandTotal)}</span>
                      <p className="text-[10px] text-gray-400">Including taxes</p>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <Button
                    form="checkout-form"
                    type="submit"
                    size="lg"
                    disabled={isProcessing}
                    className="w-full bg-green-900 hover:bg-green-800 text-white font-bold py-7 text-lg rounded-2xl shadow-lg transition-all active:scale-95 disabled:opacity-70 disabled:scale-100"
                  >
                    {isProcessing ? (
                      <span className="flex items-center gap-2">
                        <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Processing...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        Place Order <ChevronRight className="w-5 h-5" />
                      </span>
                    )}
                  </Button>
                  <p className="text-center text-xs text-gray-400 mt-4 flex items-center justify-center gap-1">
                    <Lock className="w-3 h-3" /> All transactions are secure and encrypted.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}