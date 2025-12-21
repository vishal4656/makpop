"use client";

import { Coffee, Monitor, Dumbbell, Users } from "lucide-react";
import SectionHeading from "@/components/common/SectionHeading";
import { motion } from "framer-motion";

// --- Animation Variants ---

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { y: 40, opacity: 0, scale: 0.9 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12,
    },
  },
};

// Specific animations for the icons when hovering the card
const iconMotion = {
  rest: { scale: 1, rotate: 0 },
  hover: { 
    scale: 1.15, 
    rotate: -10,
    transition: { type: "spring", stiffness: 300 } 
  },
};

export default function UsageOccasions() {
  const occasions = [
    {
      icon: Coffee,
      title: "Evening Cravings",
      description: "The perfect guilt-free tea-time companion.",
    },
    {
      icon: Monitor,
      title: "Office Snacks",
      description: "Stay focused and energized during work hours.",
    },
    {
      icon: Dumbbell,
      title: "Pre/Post Workout",
      description: "A crunchy protein boost for your fitness routine.",
    },
    {
      icon: Users,
      title: "Family Time",
      description: "Share healthy moments with the ones you love.",
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-white to-cream-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Animated Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 md:mb-16"
        >
          <SectionHeading
            subtitle="Best For"
            title="Perfect for Every Moment"
          />
        </motion.div>

        {/* Staggered Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-5 md:gap-8"
        >
          {occasions.map((occasion, index) => {
            const Icon = occasion.icon;
            return (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover="hover"
                initial="rest"
                animate="rest"
                className="group relative bg-white rounded-2xl p-6 md:p-8 text-center shadow-md hover:shadow-xl transition-shadow duration-300 border border-green-900/5"
              >
                {/* Background Hover Effect - subtle fill */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300 pointer-events-none" />

                <div className="relative z-10 flex flex-col items-center h-full">
                  {/* Icon Container */}
                  <motion.div 
                    variants={iconMotion}
                    className="w-16 h-16 md:w-20 md:h-20 mb-5 bg-cream-100 rounded-full flex items-center justify-center text-green-900 group-hover:bg-green-900 group-hover:text-cream-50 transition-colors duration-300"
                  >
                    <Icon className="h-8 w-8 md:h-10 md:w-10" />
                  </motion.div>

                  <h3 className="text-lg md:text-xl font-bold text-green-950 mb-2 group-hover:text-green-800 transition-colors">
                    {occasion.title}
                  </h3>
                  
                  <p className="text-sm md:text-base text-charcoal-600 leading-relaxed">
                    {occasion.description}
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