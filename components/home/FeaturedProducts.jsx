"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import SectionHeading from "@/components/common/SectionHeading";
import { products } from "@/lib/products"; // Using your original data source
import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform } from "framer-motion";
import { Star, Minus, Plus, ShoppingCart, Images } from "lucide-react";
import { useCartStore } from "@/lib/store"

// --- Compact Custom Product Card ---
const CustomProductCard = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const {
    id,
    name = "Product Name",
    slug, // Use existing slug or generate one
    price = 199,
    salePrice = null,
    image,
    rating = 4.8,
    reviews = 24,
    isBestseller = false,
    isSale = false,
    description = "Roasted premium makhana snack.",
  } = product;
  console.log(image, "ssds");
   const addItem = useCartStore((state) => state.addItem)

  // Logic: Use provided slug, OR generate a URL-friendly slug from the name
  const productSlug = slug || name.toLowerCase().replace(/\s+/g, "-");

  // Logic: Calculate display price
  const displayPrice = salePrice || price;
  const hasDiscount = salePrice && salePrice < price;

  // Handlers for Quantity (Stop propagation prevents triggering the Link)
  const handleDecrease = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleIncrease = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setQuantity(quantity + 1);
  };

  const handleAddToCart = (product) => {
    // e.preventDefault();
    // e.stopPropagation();
    addItem(product, 1);
    // TODO: Connect to your global Cart Context here
    console.log(`Added ${quantity} of ${name} (Slug: ${productSlug}) to cart`);
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg hover:border-green-100 transition-all duration-300 w-full">
      {/* --- 1. Product Image (Linked to Detail Page) --- */}
      <Link
        href={`/product/${productSlug}`}
        className="group relative block w-full aspect-[4/5] bg-gray-50 overflow-hidden cursor-pointer"
      >
        <img
          src={image?.src?.src}
          alt={name}
          width={50}
          height={50}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
          {isSale && (
            <span className="bg-orange-500 text-white text-[9px] font-bold px-1.5 py-0.5 uppercase tracking-wider rounded-[2px] shadow-sm">
              Sale
            </span>
          )}
          {isBestseller && (
            <span className="bg-indigo-500 text-white text-[9px] font-bold px-1.5 py-0.5 uppercase tracking-wider rounded-[2px] shadow-sm">
              Hot
            </span>
          )}
        </div>

        {/* Hover Description Overlay */}
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-3 text-center">
          <p className="text-white text-xs font-medium leading-tight translate-y-2 group-hover:translate-y-0 transition-transform duration-300 line-clamp-4">
            {description}
          </p>
        </div>
      </Link>

      {/* --- 2. Product Details --- */}
      <div className="p-3 flex flex-col flex-grow">
        {/* Rating */}
        <div className="flex items-center gap-0.5 mb-1.5">
          <div className="flex text-orange-400">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={10}
                className={
                  i < Math.floor(rating) ? "fill-current" : "text-gray-300"
                }
              />
            ))}
          </div>
          <span className="text-[9px] text-gray-400 font-medium ml-1">
            ({reviews})
          </span>
        </div>

        {/* Title (Linked to Detail Page) */}
        <Link
          href={`/shop/${productSlug}`}
          className="group-hover:text-green-800 transition-colors"
        >
          <h3 className="text-gray-900 font-bold text-sm leading-tight mb-1 line-clamp-1">
            {name}
          </h3>
        </Link>

        {/* Price */}
        <div className="flex items-baseline gap-1.5 mb-3">
          {hasDiscount && (
            <span className="text-gray-400 text-[10px] line-through font-medium">
              ₹{price}
            </span>
          )}
          <span className="text-base font-bold text-gray-900">
            ₹{displayPrice}
          </span>
        </div>

        {/* --- 3. Actions (Interactive Buttons) --- */}
        <div className="mt-auto flex items-center gap-1.5">
          <div className="flex-1 flex items-center justify-between bg-gray-50 rounded-md border border-gray-200 p-0.5 group-hover:border-green-200 transition-colors">
            {/* Quantity Selectors */}
            {/* <div className="flex items-center">
                <button 
                  onClick={handleDecrease} 
                  type="button"
                  className="w-6 h-6 flex items-center justify-center rounded hover:bg-white text-gray-500 hover:text-green-700 transition-colors"
                >
                  <Minus size={10} />
                </button>
                <span className="w-4 text-center text-xs font-bold text-gray-900 select-none">{quantity}</span>
                <button 
                  onClick={handleIncrease} 
                  type="button"
                  className="w-6 h-6 flex items-center justify-center rounded hover:bg-white text-gray-500 hover:text-green-700 transition-colors"
                >
                  <Plus size={10} />
                </button>
              </div> */}

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              type="button"
              className="bg-white w-full text-green-900 hover:bg-green-600 hover:text-white border-l border-gray-200 h-7 rounded flex items-center justify-center transition-all shadow-sm gap-4"
              aria-label="Add to cart"
            >
              <span>Add To Cart</span>
              <ShoppingCart size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Main Section Component ---
export default function FeaturedProducts() {
  const sectionRef = useRef(null);

  // Parallax background movement setup
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const yBg1 = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const yBg2 = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-24 relative overflow-hidden bg-cream-50/50"
    >
      {/* Decorative Background */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          style={{ y: yBg1 }}
          className="absolute top-0 left-0 w-[500px] h-[500px] bg-green-100/40 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"
        />
        <motion.div
          style={{ y: yBg2 }}
          className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blush-100/30 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 text-center"
        >
          <SectionHeading subtitle="Our Flavours" title="Pick Your Favorite" />
        </motion.div>

        {/* --- Product Grid (Fits 5 items in one row on desktop) --- */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4 lg:gap-5"
        >
          {/* Slicing to 5 ensures we stick to that single row look if you have more data */}
          {products.slice(0, 5).map((product) => (
            <div key={product.id} className="w-full">
              <CustomProductCard product={product} />
            </div>
          ))}
        </motion.div>

        {/* Footer Link */}
        <div className="text-center mt-10">
          <Link href="/shop">
            <Button
              variant="secondary"
              size="sm"
              className="px-6 py-4 text-sm font-medium shadow-sm hover:shadow-md transition-all bg-white hover:bg-cream-50 text-green-950 border border-green-900/10"
            >
              View Full Menu
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
