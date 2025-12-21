"use client";

import { Leaf, Heart, Shield, Sparkles } from "lucide-react";
import SectionHeading from "@/components/common/SectionHeading";
import { motion } from "framer-motion";

// --- Animation Variants ---

// Stagger container for the grid
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

// Animation for individual cards entering the screen
const cardVariants = {
  hidden: { y: 50, opacity: 0, scale: 0.9 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

// Animation for the icon when hovering over the card
const iconVariants = {
  idle: { scale: 1, rotate: 0 },
  hover: {
    scale: 1.2,
    rotate: [0, -10, 10, -5, 5, 0], // A playful "wiggle"
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
};

export default function WhyMakpop() {
  const benefits = [
    {
      icon: Leaf,
      title: "100% Natural",
      description: "Roasted to perfection with zero artificial preservatives.",
    },
    {
      icon: Heart,
      title: "Low Fat & Healthy",
      description: "Less than 5g fat per serving. The ultimate guilt-free snack.",
    },
    {
      icon: Shield,
      title: "High Protein",
      description: "Packed with plant-based protein to keep you energized all day.",
    },
    {
      icon: Sparkles,
      title: "Gluten Free",
      description: "Safe for everyone, including those with dietary restrictions.",
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-cream-100 relative overflow-hidden">
      {/* --- Ambient Background Element --- */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 45, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[20%] -right-[10%] w-[600px] h-[600px] bg-gradient-to-br from-green-100/40 to-transparent rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, -45, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[20%] -left-[10%] w-[500px] h-[500px] bg-gradient-to-tr from-blush-100/40 to-transparent rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 md:mb-16"
        >
          <SectionHeading
            subtitle="Why Choose Us"
            title="Why Makpop Makhana?"
          />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
        >
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover="hover" // Triggers the 'hover' variant for children (icon)
                className="group relative bg-white/60 backdrop-blur-md rounded-2xl p-8 text-center border border-green-900/5 shadow-sm hover:shadow-xl hover:bg-white transition-all duration-300"
              >
                {/* Decorative background blob inside card on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-50/0 to-green-50/0 group-hover:from-green-50/50 group-hover:to-transparent rounded-2xl transition-all duration-500" />

                <div className="relative relative z-10">
                  <motion.div
                    variants={iconVariants}
                    className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-green-900 to-green-800 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-green-900/30 transition-shadow"
                  >
                    <Icon className="h-10 w-10 text-cream-50" />
                  </motion.div>

                  <h3 className="text-xl font-bold text-green-950 mb-3 group-hover:text-green-700 transition-colors">
                    {benefit.title}
                  </h3>

                  <p className="text-charcoal-600 leading-relaxed text-sm md:text-base">
                    {benefit.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}