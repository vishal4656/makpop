"use client";

import SectionHeading from "@/components/common/SectionHeading";
import { Heart, Users, Award, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

// --- Animation Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1, 
    transition: { type: "spring", stiffness: 80, damping: 20 } 
  },
};

export default function AboutPage() {
  const stats = [
    { label: "Happy Snackers", value: "10k+" },
    { label: "Natural Ingredients", value: "100%" },
    { label: "Premium Flavors", value: "5+" },
  ];

  return (
    <div className="bg-cream-50 min-h-screen relative overflow-hidden">
      
      {/* --- Background Elements --- */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-green-100/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blush-100/40 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3" />
        {/* Grain Texture Overlay */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-soft-light"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative z-10">
        
        {/* --- Header --- */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-20 text-center"
        >
          <SectionHeading 
            title="Our Story"
            subtitle="The Makpop Journey"
          />
        </motion.div>

        {/* --- Main Story Section (Centered Layout) --- */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center mb-24"
        >
          <motion.h3 variants={itemVariants} className="text-3xl md:text-5xl font-bold text-green-950 leading-tight mb-8">
            Reinventing an <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-800 to-green-600">Ancient Superfood</span> for the Modern World.
          </motion.h3>
          
          <motion.div variants={itemVariants} className="space-y-6 text-lg md:text-xl text-charcoal-700 leading-relaxed">
            <p>
              <span className="font-bold text-green-900">Makpop</span> was born from a simple frustration: healthy snacking was boring, and tasty snacking was guilty. We noticed Indian households were struggling to find the balance.
            </p>
            <p>
              Makhana (Foxnuts) has been a traditional Indian staple for centuries. We took this humble ingredient and gave it a modern makeover. Roasted to perfection (never fried) and dusted with bold, contemporary flavors.
            </p>
            <p>
              Today, every pack of Makpop represents our commitment to clean eating. No artificial preservatives, no MSG—just pure, crunchy goodness that loves you back.
            </p>
          </motion.div>

          {/* Stats Row */}
          <motion.div 
            variants={itemVariants} 
            className="mt-12 pt-10 flex flex-wrap justify-center gap-12 md:gap-20 border-t border-green-900/10"
          >
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-green-900 mb-1">{stat.value}</p>
                <p className="text-sm text-charcoal-500 font-medium uppercase tracking-wide">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* --- Values Grid --- */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto"
        >
          {[
            {
              icon: Heart,
              title: "Our Mission",
              desc: "To make healthy snacking accessible, affordable, and genuinely enjoyable for every Indian household.",
              bg: "bg-rose-50",
              color: "text-rose-900"
            },
            {
              icon: Users,
              title: "Our Community",
              desc: "We are building a tribe of conscious snackers who refuse to compromise between taste and health.",
              bg: "bg-blue-50",
              color: "text-blue-900"
            },
            {
              icon: Award,
              title: "Our Promise",
              desc: "100% natural ingredients. Zero artificial nonsense. If we wouldn't feed it to our family, we won't sell it to you.",
              bg: "bg-amber-50",
              color: "text-amber-900"
            }
          ].map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div 
                key={index}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden group text-center"
              >
                {/* Decorative top border */}
                <div className={`absolute top-0 left-0 w-full h-1 ${item.bg.replace('bg-', 'bg-gradient-to-r from-transparent via-') .replace('50', '400') + ' to-transparent'}`} />
                
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 mx-auto ${item.bg} ${item.color}`}>
                  <Icon className="h-8 w-8" />
                </div>
                
                <h3 className="text-xl font-bold text-green-950 mb-3">{item.title}</h3>
                <p className="text-charcoal-600 leading-relaxed text-sm md:text-base">
                  {item.desc}
                </p>
              </motion.div>
            )
          })}
        </motion.div>

        {/* --- Bottom Trust Strip --- */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-24 flex flex-wrap justify-center gap-4 md:gap-8 opacity-80"
        >
           {/* Trust Badges */}
           {["FSSAI Certified", "100% Vegan", "Gluten Free", "Non-GMO"].map((tag, i) => (
             <div key={i} className="flex items-center gap-2 text-green-900 font-semibold bg-white px-5 py-2.5 rounded-full border border-green-100 shadow-sm hover:shadow-md transition-shadow cursor-default">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                {tag}
             </div>
           ))}
        </motion.div>

      </div>
    </div>
  );
}