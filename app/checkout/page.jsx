"use client";

import { useState, useEffect, use } from "react";
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
  CheckCircle2,
  ChevronRight
} from "lucide-react";
import { useAuth, useUser } from "@clerk/nextjs";
import { getAddress } from "@/api/checkout";
import { clerkClient } from "@clerk/nextjs/server";

export default function CheckoutPage() {
  const { items, getTotal, clearCart } = useCartStore();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const { isSignedIn } = useAuth()
  const { user } = useUser();
  console.log(user,'bkjhvvhjgg');
  

  const [formData, setFormData] = useState({
    name: user?.fullName || "",
    email: user?.primaryEmailAddress?.emailAddress || "",
    phone: user?.phoneNumbers[0]?.phoneNumber || "",
    address: "",
    city: "",
    pincode: "",
    state: "",
  });

  // Redirect if cart is empty
  useEffect(() => {
    if (items.length === 0) {
      router.push("/cart");
    }
  }, [items, router]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate API delay
    setTimeout(() => {
      alert("Order placed successfully! Welcome to the Makpop family.");
      clearCart();
      router.push("/");
      setIsProcessing(false);
    }, 2000);
  };
  useEffect(() => {
    if (!isSignedIn) { router.push('/sign-in') }
  }, [])

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

              {/* 3. Payment Method (Visual) */}
              <section className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100">
                <h2 className="text-lg font-bold text-green-950 mb-6 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-800 text-sm">3</div>
                  Payment Method
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* <div 
                     onClick={() => setPaymentMethod("card")}
                     className={`cursor-pointer p-4 rounded-xl border-2 flex items-center gap-3 transition-all ${paymentMethod === "card" ? "border-green-600 bg-green-50/50" : "border-gray-100 hover:border-gray-200"}`}
                   >
                     <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${paymentMethod === "card" ? "border-green-600" : "border-gray-300"}`}>
                        {paymentMethod === "card" && <div className="w-2.5 h-2.5 bg-green-600 rounded-full" />}
                     </div>
                     <CreditCard className="w-5 h-5 text-gray-600" />
                     <span className="font-medium text-gray-700">Card / UPI</span>
                   </div> */}

                  <div
                    onClick={() => setPaymentMethod("cod")}
                    className={`cursor-pointer p-4 rounded-xl border-2 flex items-center gap-3 transition-all ${paymentMethod === "cod" ? "border-green-600 bg-green-50/50" : "border-gray-100 hover:border-gray-200"}`}
                  >
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${paymentMethod === "cod" ? "border-green-600" : "border-gray-300"}`}>
                      {paymentMethod === "cod" && <div className="w-2.5 h-2.5 bg-green-600 rounded-full" />}
                    </div>
                    <Truck className="w-5 h-5 text-gray-600" />
                    <span className="font-medium text-gray-700">Cash on Delivery</span>
                  </div>
                </div>
              </section>

            </form>
          </motion.div>

          {/* --- RIGHT COLUMN: SUMMARY (Sticky) --- */}
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
                        {/* Ensure image path is valid string */}
                        <img
                          src={item.image.src.src}
                          alt={item.image.src.src}
                          className="object-cover w-full h-full"
                        />
                        <div className="absolute bottom-0 right-0 bg-gray-900 text-white text-[10px] px-1.5 py-0.5 rounded-tl-md font-bold">
                          x{item.quantity}
                        </div>
                      </div>
                      <div className="flex-1 flex flex-col justify-center">
                        <h4 className="font-semibold text-gray-900 text-sm">{item.name}</h4>
                        <p className="text-xs text-gray-500">{item.weight || '100g'}</p>
                      </div>
                      <div className="flex items-center">
                        <p className="font-bold text-gray-900">{formatPrice(item.price * item.quantity)}</p>
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