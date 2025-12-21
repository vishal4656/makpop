"use client";

import { useState } from "react";
import SectionHeading from "@/components/common/SectionHeading";
import ProductGrid from "@/components/shop/ProductGrid";
import FilterBar from "@/components/shop/FilterBar";
import { products } from "@/lib/products";
import { motion, AnimatePresence } from "framer-motion";
import { SearchX } from "lucide-react";

export default function ShopPage() {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [activeCategory, setActiveCategory] = useState("All");

  const handleFilterChange = ({ category }) => {
    setActiveCategory(category);
    if (category === "All") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter((p) => p.category === category));
    }
  };

  return (
    <div className="bg-cream-50 min-h-screen relative overflow-hidden">
      {/* --- Ambient Background --- */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-green-100/40 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div
          className="absolute bottom-0 right-0
         w-[600px] h-[600px] bg-blush-100/40 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"
        />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-soft-light"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <SectionHeading
            title="Shop All Products"
            subtitle="Our Complete Range"
          />
          <p className="mt-4 text-charcoal-600 max-w-2xl mx-auto text-lg">
            From spicy crunch to sweet delight, explore our premium collection
            of roasted Makhana.
          </p>
        </motion.div>

        {/* Filter Section */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="sticky top-20 z-30 bg-cream-50/80 backdrop-blur-md py-4 -mx-4 px-4 md:mx-0 md:px-0 mb-8 rounded-xl border border-green-900/5 shadow-sm"
        >
          <div className="flex justify-center">
            <FilterBar onFilterChange={handleFilterChange} />
          </div>
        </motion.div>

        {/* Product Grid Area */}
        <div className="min-h-[400px]">
          <AnimatePresence mode="wait">
            {filteredProducts.length > 0 ? (
              <motion.div
                key={activeCategory} // Triggers animation on category change
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <ProductGrid products={filteredProducts} />
              </motion.div>
            ) : (
              // Empty State
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-20 text-center"
              >
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <SearchX className="h-10 w-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-bold text-charcoal-800">
                  No products found
                </h3>
                <p className="text-charcoal-500">
                  Try selecting a different category.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
