"use client";

import { Leaf, Heart, Zap, Shield, CheckCircle2, XCircle, Coffee, Dumbbell, Tv, Briefcase, Baby } from "lucide-react";
import SectionHeading from "@/components/common/SectionHeading";
import { motion } from "framer-motion";

// --- Animation Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1, 
    transition: { type: "spring", stiffness: 100 } 
  },
};

export default function WhyMakpopPage() {
  const benefits = [
    {
      icon: Leaf,
      title: "Low Calorie",
      description: "Only 110-125 calories per serving. Smart snacking defined.",
      color: "bg-green-100 text-green-800"
    },
    {
      icon: Heart,
      title: "Heart Healthy",
      description: "Low sodium & fat. Rich in antioxidants for cardiovascular support.",
      color: "bg-rose-100 text-rose-800"
    },
    {
      icon: Zap,
      title: "Energy Boost",
      description: "Complex carbs provide sustained energy without the sugar crash.",
      color: "bg-amber-100 text-amber-800"
    },
    {
      icon: Shield,
      title: "Gut Friendly",
      description: "Naturally gluten-free and easy to digest for all ages.",
      color: "bg-blue-100 text-blue-800"
    },
  ];

  const comparisons = [
    { category: "Calories (per 30g)", makhana: "110", chips: "160", namkeen: "180" },
    { category: "Fat Content", makhana: "3g", chips: "10g", namkeen: "12g" },
    { category: "Protein", makhana: "4g", chips: "2g", namkeen: "3g" },
    { category: "Preservatives", makhana: "Zero", chips: "High", namkeen: "High" },
  ];

  const moments = [
    { icon: Coffee, text: "Mid-morning tea time" },
    { icon: Briefcase, text: "Beating the 3 PM office slump" },
    { icon: Dumbbell, text: "Pre or post-workout fuel" },
    { icon: Baby, text: "Kids' lunch box snack" },
    { icon: Tv, text: "Guilt-free Netflix binge" },
  ];

  return (
    <div className="bg-cream-50 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        
        {/* --- Header --- */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <SectionHeading 
            title="Why Makhana?"
            subtitle="The Superfood Snack"
          />
          <p className="mt-4 text-charcoal-600 max-w-2xl mx-auto">
            Discover why ancient wisdom meets modern snacking. It's not just a snack; it's a lifestyle upgrade.
          </p>
        </motion.div>

        {/* --- 1. Benefits Grid --- */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24"
        >
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div 
                key={index} 
                variants={itemVariants}
                className="group bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 ${benefit.color} group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="h-7 w-7" strokeWidth={2} />
                </div>
                <h3 className="text-xl font-bold text-green-950 mb-2">{benefit.title}</h3>
                <p className="text-charcoal-600 leading-relaxed text-sm">
                  {benefit.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* --- 2. Comparison Section (The "Vs" Battle) --- */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-24"
        >
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-green-950">The Smart Choice</h2>
            <p className="text-charcoal-600 mt-2">See how Makpop stacks up against the competition.</p>
          </div>

          <div className="overflow-hidden rounded-3xl border border-green-900/10 shadow-lg bg-white">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-charcoal-50 border-b border-gray-100">
                    <th className="p-6 font-semibold text-charcoal-500 uppercase text-sm tracking-wider">Metric</th>
                    <th className="p-6 font-bold text-center text-green-900 bg-green-50/50 text-lg border-x border-green-100 w-1/4">Makpop</th>
                    <th className="p-6 font-semibold text-center text-charcoal-500">Fried Chips</th>
                    <th className="p-6 font-semibold text-center text-charcoal-500">Namkeen</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {comparisons.map((row, index) => (
                    <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                      <td className="p-6 font-medium text-charcoal-700">{row.category}</td>
                      
                      {/* Winner Column */}
                      <td className="p-6 text-center bg-green-50/30 border-x border-green-100">
                        <span className="inline-flex items-center gap-2 font-bold text-green-800 bg-white px-3 py-1 rounded-full shadow-sm border border-green-100">
                          {row.makhana === "None" || row.makhana === "Zero" ? <CheckCircle2 className="w-4 h-4"/> : null}
                          {row.makhana}
                        </span>
                      </td>

                      <td className="p-6 text-center text-charcoal-500">{row.chips}</td>
                      <td className="p-6 text-center text-charcoal-500">{row.namkeen}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>

        {/* --- 3. Best Moments (Visual List) --- */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-green-950 rounded-3xl p-8 md:p-16 text-center relative overflow-hidden"
        >
          {/* Background decoration */}
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
             <div className="absolute top-0 right-0 w-96 h-96 bg-green-400 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2"></div>
             <div className="absolute bottom-0 left-0 w-96 h-96 bg-green-600 rounded-full blur-[100px] -translate-x-1/2 translate-y-1/2"></div>
          </div>

          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-cream-50 mb-12">
              Perfect Snacking Moments
            </h2>
            
            <div className="flex flex-wrap justify-center gap-4 md:gap-6">
              {moments.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div 
                    key={index}
                    whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.15)" }}
                    className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/10 rounded-full px-6 py-3 text-cream-50 transition-all cursor-default"
                  >
                    <Icon className="w-5 h-5 text-green-300" />
                    <span className="font-medium">{item.text}</span>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}