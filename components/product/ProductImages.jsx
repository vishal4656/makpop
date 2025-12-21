"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function ProductImages({ product }) {
  // Helper: Handle varying image data structures safely
  const getImageSrc = (img) => {
    return img?.src?.src || img?.src || img || "/placeholder.jpg";
  };

  // Mock multiple images for demonstration if the product doesn't have a gallery yet.
  // In a real app, you would use product.images array directly.
  const images = product.images?.length > 0 
    ? product.images 
    : [product.image, product.image, product.image, product.image];

  // --- State Change: Track the INDEX instead of the image object itself ---
  // This is crucial so that even if the mock images are identical, 
  // React knows which position is selected.
  const [selectedIndex, setSelectedIndex] = useState(0);
  const mainImage = images[selectedIndex];

  // --- Animation Variants for a premium feel ---
  const imageVariants = {
    enter: { 
      opacity: 0, 
      scale: 1.05, 
      filter: "blur(8px)" // Start slightly blurry
    },
    center: { 
      opacity: 1, 
      scale: 1, 
      filter: "blur(0px)" // Sharpen into focus
    },
    exit: { 
      opacity: 0, 
      scale: 0.98, // Slight shrink on exit
      filter: "blur(4px)",
      zIndex: 0
    },
  };

  const transitionSettings = {
    duration: 0.6,
    ease: [0.16, 1, 0.3, 1], // Custom bezier for a "spring-like" yet smooth stop (Apple-esque)
  };

  return (
    // Changed to sticky container to keep images in view while scrolling details
    <div className="flex flex-col-reverse lg:flex-row gap-4 lg:gap-6 sticky top-24">
      
      {/* --- Thumbnails --- */}
      <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 scrollbar-hide px-1 lg:px-0">
        {images.map((img, index) => {
          const src = getImageSrc(img);
          // Compare index to see if active
          const isActive = index === selectedIndex;
          
          return (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={`relative w-16 h-16 lg:w-20 lg:h-20 flex-shrink-0 rounded-2xl overflow-hidden border-2 transition-all duration-500 ease-out outline-none group ${
                isActive 
                  ? "border-green-900 ring-[3px] ring-green-900/30 scale-105 z-10 shadow-md" 
                  : "border-transparent opacity-70 hover:opacity-100 hover:scale-105 hover:shadow-sm hover:border-green-900/20"
              }`}
            >
              <Image 
                src={src} 
                alt={`${product.name} view ${index + 1}`} 
                fill 
                className={`object-cover transition-transform duration-700 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}
              />
            </button>
          );
        })}
      </div>

      {/* --- Main Image Display --- */}
      {/* Added deeper shadow and gradient border for premium look */}
      <div className="relative flex-1 aspect-[4/5] lg:aspect-square bg-white rounded-[2.5rem] overflow-hidden shadow-2xl shadow-green-900/5 border border-white/50 ring-1 ring-green-900/5 cursor-zoom-in group select-none">
        
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            // Using index + src as key ensures animation triggers even if src is same
            key={selectedIndex + getImageSrc(mainImage)} 
            variants={imageVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={transitionSettings}
            className="absolute inset-0"
          >
            <Image
              src={getImageSrc(mainImage)}
              alt={product.name}
              fill
              // Changed to contain for better presentation of various product shapes without cropping
              className="object-contain p-4 lg:p-8 transition-transform duration-700 group-hover:scale-105"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </motion.div>
        </AnimatePresence>
        
        {/* Floating Tag (Optional - kept from previous code) */}
        <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold text-green-950 border border-white/60 shadow-sm z-10">
          Premium Quality
        </div>
      </div>
    </div>
  );
}