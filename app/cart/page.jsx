"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { formatPrice } from "@/lib/utils"
import { useCartStore } from "@/lib/store"
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, Truck } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useAuth } from "@clerk/nextjs"

// Helper component for the free shipping bar
const FreeShippingBar = ({ current, target = 299 }) => {
  const progress = Math.min((current / target) * 100, 100)
  const remaining = target - current

  return (
    <div className="bg-white p-4 rounded-xl border border-green-100 shadow-sm mb-6">
      <div className="flex items-center gap-2 mb-2 text-sm">
        <div className="bg-green-100 p-1.5 rounded-full">
          <Truck className="w-4 h-4 text-green-700" />
        </div>
        {remaining > 0 ? (
          <span className="text-charcoal-700">
            Add <span className="font-bold text-green-700">{formatPrice(remaining)}</span> more for <span className="text-green-700 font-bold uppercase">Free Shipping</span>
          </span>
        ) : (
          <span className="text-green-700 font-bold">You've unlocked Free Shipping! 🎉</span>
        )}
      </div>
      <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={`h-full ${remaining > 0 ? "bg-green-500" : "bg-gradient-to-r from-green-500 to-emerald-400"}`}
        />
      </div>
    </div>
  )
}

export default function CartPage() {
  const { items, updateQuantity, removeItem, getTotal } = useCartStore()
  console.log(items, 'items');
  const {isSignedIn} = useAuth()

  const total = getTotal()

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-cream-50 px-4 text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6"
        >
          <ShoppingBag className="h-10 w-10 text-green-800" />
        </motion.div>
        <h2 className="text-3xl font-bold text-green-950 mb-3">Your cart is empty</h2>
        <p className="text-charcoal-600 mb-8 max-w-md">
          Looks like you haven't discovered our crunchy goodness yet.
        </p>
        <Link href="/shop">
          <Button size="lg" className="bg-green-900 hover:bg-green-800 text-white px-8 py-6 rounded-full text-lg shadow-lg hover:shadow-xl transition-all hover:scale-105">
            Start Shopping <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="bg-cream-50 min-h-screen py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-3xl md:text-4xl font-bold text-green-950 mb-8"
        >
          Shopping Cart <span className="text-lg font-normal text-charcoal-500 ml-2">({items.length} items)</span>
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Cart Items Column */}
          <div className="lg:col-span-2 space-y-6">

            <FreeShippingBar current={total} />

            <div className="space-y-4">
              <AnimatePresence>
                {items.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="border-none shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
                      <CardContent className="p-4 md:p-6">
                        <div className="flex gap-4 sm:gap-6">
                          {/* Image Wrapper */}
                          <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gray-50 rounded-xl flex-shrink-0 overflow-hidden relative">
                            {/* Using standard img tag as per your original code to avoid import errors if Next/Image isn't set up */}
                            <img
                              src={item.image.src.src}
                              alt={item.image.src.src}
                              className="w-full h-full object-cover"
                            />
                          </div>

                          {/* Item Details */}
                          <div className="flex-1 flex flex-col justify-between">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-bold text-lg text-green-950 mb-1">{item.name}</h3>
                                <p className="text-xs font-semibold uppercase tracking-wide text-charcoal-500 bg-gray-100 px-2 py-0.5 rounded w-fit">{item.weight}</p>
                              </div>
                              <button
                                onClick={() => removeItem(item.id)}
                                className="text-gray-400 hover:text-red-500 transition-colors p-2 hover:bg-red-50 rounded-full"
                                aria-label="Remove item"
                              >
                                <Trash2 className="h-5 w-5" />
                              </button>
                            </div>

                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-4">
                              {/* Quantity Controls */}
                              <div className="flex items-center bg-gray-50 rounded-lg border border-gray-200 w-fit">
                                <button
                                  onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                  className="w-10 h-10 flex items-center justify-center text-charcoal-600 hover:text-green-700 hover:bg-white rounded-l-lg transition-colors"
                                  disabled={item.quantity <= 1}
                                >
                                  <Minus className="h-4 w-4" />
                                </button>
                                <span className="w-8 text-center font-bold text-sm select-none">{item.quantity}</span>
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  className="w-10 h-10 flex items-center justify-center text-charcoal-600 hover:text-green-700 hover:bg-white rounded-r-lg transition-colors"
                                >
                                  <Plus className="h-4 w-4" />
                                </button>
                              </div>

                              {/* Price */}
                              <div className="text-right">
                                <p className="text-xl font-bold text-green-900">{formatPrice(item.price * item.quantity)}</p>
                                {item.quantity > 1 && (
                                  <p className="text-xs text-gray-400">{formatPrice(item.price)} each</p>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Order Summary Column */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card className="border-none shadow-lg bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-6 md:p-8 space-y-6">
                    <h2 className="text-xl font-bold text-green-950 pb-4 border-b border-gray-100">Order Summary</h2>

                    <div className="space-y-3">
                      <div className="flex justify-between text-charcoal-600">
                        <span>Subtotal</span>
                        <span className="font-semibold text-charcoal-900">{formatPrice(total)}</span>
                      </div>
                      <div className="flex justify-between text-charcoal-600">
                        <span>Shipping</span>
                        {total >= 299 ? (
                          <span className="font-bold text-green-600">Free</span>
                        ) : (
                          <span className="font-medium">{formatPrice(49)}</span>
                        )}
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                      <span className="text-lg font-bold text-green-950">Total</span>
                      <span className="text-2xl font-bold text-green-900">
                        {formatPrice(total + (total >= 299 ? 0 : 49))}
                      </span>
                    </div>
                    <div className="space-y-3 pt-4">
                      <Link href={isSignedIn?'/checkout':'/sign-in'}>
                        <Button size="lg" className="w-full bg-green-900 hover:bg-green-800 text-white font-bold py-6 text-lg rounded-xl shadow-md hover:shadow-lg transition-all active:scale-95">
                          Checkout Now
                        </Button>
                      </Link>
                      <Link href="/shop" className="block">
                        <Button variant="ghost" size="lg" className="w-full hover:bg-gray-50 text-charcoal-600">
                          Continue Shopping
                        </Button>
                      </Link>
                    </div>

                    <div className="flex items-center justify-center gap-2 mt-2 text-xs text-gray-400">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                      Secure Checkout
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}