"use client";

import { Star, Award, Truck, ShieldCheck } from "lucide-react";
import SectionHeading from "@/components/common/SectionHeading";
import { motion } from "framer-motion";

// --- Animation Variants ---

// Stagger the entrance of the cards
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

// Smooth fade up for individual cards
const cardVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
    },
  },
};

// --- Custom Icon Animations per type ---

const iconAnimations = {
  Star: {
    hover: {
      rotate: 180,
      scale: 1.2,
      transition: { type: "spring", stiffness: 200 },
    },
  },
  Award: {
    hover: {
      rotate: [0, -15, 15, -15, 15, 0],
      transition: { duration: 0.5 },
    },
  },
  Truck: {
    hover: {
      x: [0, 5, -5, 10, 0], // A little "vroom" shake
      transition: { duration: 0.5 },
    },
  },
  ShieldCheck: {
    hover: {
      scale: [1, 1.2, 1], // Heartbeat pulse
      transition: { duration: 0.4 },
    },
  },
};

export default function CustomerTrust() {
  const trustBadges = [
    {
      icon: Star,
      name: "Star",
      title: "4.8/5 Customer Rating",
      sub: "Based on 1000+ Reviews",
    },
    {
      icon: Award,
      name: "Award",
      title: "FSSAI Certified",
      sub: "100% Food Safety Standard",
    },
    {
      icon: Truck,
      name: "Truck",
      title: "Free Shipping",
      sub: "On all orders above ₹499",
    },
    {
      icon: ShieldCheck,
      name: "ShieldCheck",
      title: "Quality Guarantee",
      sub: "Money back if not satisfied",
    },
  ];

  return (
    <section className="relative py-20 md:py-24 bg-[#022c22] overflow-hidden text-cream-50">
      {/* --- Animated Mesh Gradient Background --- */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{
            opacity: [0.1, 0.2, 0.1],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-green-800/30 rounded-full blur-[100px]"
        />
        <motion.div
          animate={{
            opacity: [0.1, 0.15, 0.1],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-emerald-900/40 rounded-full blur-[100px]"
        />
        {/* Grain overlay for texture */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Heading needs to be lighter manually since SectionHeading might default to dark text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 space-y-2"
        >
          <span className="text-blush-200 font-medium tracking-wider uppercase text-sm">
            Trusted by Thousands
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-cream-50">
            Why Our Customers Love Us
          </h2>
        </motion.div>

        {/* --- Grid --- */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {trustBadges.map((badge, index) => {
            const Icon = badge.icon;
            // Select the specific animation for this icon name
            const iconVariant = iconAnimations[badge.name] || {};

            return (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover="hover"
                className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:shadow-2xl hover:shadow-green-900/50"
              >
                {/* Glow effect behind icon */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-blush-200/20 rounded-full blur-xl group-hover:bg-blush-200/30 transition-all duration-500" />

                <motion.div
                  variants={iconVariant}
                  className="relative inline-flex items-center justify-center mb-4"
                >
                  <Icon className="h-10 w-10 md:h-12 md:w-12 text-blush-200 drop-shadow-lg" />
                </motion.div>

                <h3 className="text-lg font-semibold text-cream-50 mb-1">
                  {badge.title}
                </h3>
                <p className="text-sm text-cream-50/60 font-light">
                  {badge.sub}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}