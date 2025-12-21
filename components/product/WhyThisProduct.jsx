"use client"

import React from 'react'
import { Leaf, Flame, Heart, Wheat, Zap } from "lucide-react";
import { motion } from "framer-motion"

function WhyThisProduct() {
  return (
    <section className="bg-white py-16 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-30" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-black text-green-950 mb-4 tracking-tight">
              Why you'll <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-400">crave</span> it.
            </h2>
            <p className="text-lg text-charcoal-600 font-medium leading-relaxed">
              Engineered for the modern palate. Rooted in ancient wellness.
            </p>
          </motion.div>
        </div>

        {/* Compact Grid with gap-4 instead of gap-6 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-6xl mx-auto">
          
          {/* Card 1: The "Natural" Hero (Large) */}
          <motion.div
            whileHover={{ scale: 0.98 }}
            className="md:col-span-2 bg-[#F2F4F1] rounded-[2rem] p-6 md:p-8 relative overflow-hidden group cursor-default"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-green-200/40 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 group-hover:scale-110 transition-transform duration-1000" />
            
            <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center shadow-sm flex-shrink-0 group-hover:rotate-12 transition-transform duration-500">
                <Leaf className="w-7 h-7 text-green-700" strokeWidth={1.5} />
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-green-950 mb-2 tracking-tight">
                  100% Plant Power.
                </h3>
                <p className="text-base text-charcoal-800 leading-snug">
                  Harvested from the lotus flower. No artificial preservatives. Just pure, popped goodness.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Card 2: The "Roasted" (Tall Dark) */}
          <motion.div
            whileHover={{ y: -5 }}
            className="md:row-span-2 bg-charcoal-950 rounded-[2rem] p-6 md:p-8 flex flex-col relative overflow-hidden group text-white"
          >
            {/* Animated Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-orange-500/10 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
            
            <div className="relative z-10 flex flex-col h-full">
              <div className="mb-4">
                <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center mb-4 border border-white/10">
                  <Flame className="w-6 h-6 text-orange-400" />
                </div>
                <h3 className="text-2xl font-bold mb-1 text-charcoal-800">Slow Roasted.</h3>
                <h3 className="text-2xl font-bold text-charcoal-400 mb-4 text-charcoal-800">Never Fried.</h3>
              </div>
              
              <div className="mt-auto pt-6 border-t border-white/10 text-charcoal-800">
                <div className="flex items-end gap-2 mb-1">
                  <span className="text-4xl font-black text-orange-400">0%</span>
                  <span className="text-sm font-medium text-charcoal-300 mb-2">Trans Fat</span>
                </div>
                <p className="text-sm text-charcoal-400 leading-relaxed">
                  Air-roasted technology locks in crunch without grease.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Card 3: Gluten Free (Square) */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-amber-50 rounded-[2rem] p-6 flex flex-col justify-center items-center text-center relative overflow-hidden group border border-amber-100/50"
          >
            <Wheat className="w-10 h-10 text-amber-500 mb-3 group-hover:scale-110 transition-transform duration-300" strokeWidth={1.5} />
            <h3 className="text-xl font-bold text-amber-950 mb-1">Gluten Free</h3>
            <p className="text-amber-900/60 font-medium text-xs">Naturally Gut Friendly</p>
          </motion.div>

          {/* Card 4: Heart Healthy (Square) */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-rose-50 rounded-[2rem] p-6 flex flex-col justify-center items-center text-center relative overflow-hidden group border border-rose-100/50"
          >
            <Heart className="w-10 h-10 text-rose-500 mb-3 group-hover:animate-pulse" strokeWidth={1.5} />
            <h3 className="text-xl font-bold text-rose-950 mb-1">Heart Smart</h3>
            <p className="text-rose-900/60 font-medium text-xs">Low Sodium</p>
          </motion.div>

          {/* Card 5: Protein/Energy (Wide Bottom) */}
          <motion.div
            whileHover={{ scale: 0.98 }}
            className="md:col-span-2 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-[2rem] p-6 relative overflow-hidden border border-blue-100"
          >
             <div className="relative z-10 flex flex-row items-center justify-between gap-6">
               <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-100/50 text-blue-700 text-[10px] font-bold uppercase tracking-wider mb-2">
                    <Zap className="w-3 h-3" /> Performance Fuel
                  </div>
                  <h3 className="text-2xl font-bold text-blue-950 mb-1">Protein Packed.</h3>
                  <p className="text-blue-900/70 text-sm max-w-xs leading-snug">
                    Complete plant-based protein with 9 essential amino acids.
                  </p>
               </div>

               {/* Compact Visual Stats */}
               <div className="flex gap-2">
                  <div className="bg-white p-3 rounded-xl shadow-sm text-center min-w-[70px]">
                    <span className="block text-xl font-black text-blue-600">4g</span>
                    <span className="text-[10px] text-charcoal-500 font-bold uppercase">Protein</span>
                  </div>
                  <div className="bg-white p-3 rounded-xl shadow-sm text-center min-w-[70px]">
                    <span className="block text-xl font-black text-indigo-600">Low</span>
                    <span className="text-[10px] text-charcoal-500 font-bold uppercase">GI</span>
                  </div>
               </div>
             </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}

export default WhyThisProduct