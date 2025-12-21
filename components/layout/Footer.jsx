"use client";

import Link from "next/link";
import { Instagram, Facebook, Twitter, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

// --- Animation Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 50, damping: 20 },
  },
};

const linkVariants = {
  initial: { x: 0 },
  hover: { x: 5, color: "#ffffff", transition: { duration: 0.2 } },
};

export default function Footer() {
  const sections = {
    shop: [
      { name: "All Products", href: "/shop" },
      { name: "Best Sellers", href: "/shop?sort=popular" },
      { name: "New Arrivals", href: "/shop?sort=new" },
      { name: "Gift Bundles", href: "/shop?sort=bundles" },
    ],
    about: [
      { name: "Our Story", href: "/about" },
      { name: "Why Makpop", href: "/why-makpop" },
      { name: "Sustainability", href: "/sustainability" },
      { name: "Careers", href: "/careers" },
    ],
    support: [
      { name: "Contact Us", href: "/contact" },
      { name: "Shipping Policy", href: "/shipping" },
      { name: "Returns & Refunds", href: "/returns" },
      { name: "FAQs", href: "/faq" },
    ],
    legal: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
    ],
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative  bg-[#022c22] text-cream-100 overflow-hidden">

      {/* --- Ambient Background --- */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Deep Gradient Mesh */}
        <div className="absolute top-[-50%] left-[-20%] w-[1000px] h-[1000px] bg-green-900/30 rounded-full blur-[120px] mix-blend-screen opacity-40"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[800px] h-[800px] bg-emerald-900/20 rounded-full blur-[100px] mix-blend-screen opacity-30"></div>
        {/* Grain Overlay */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.07] mix-blend-overlay"></div>
      </div>

      {/* --- Massive Brand Watermark (Background) --- */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none pointer-events-none select-none opacity-[0.03]">
        <h1 className="text-[15vw] font-black text-center text-white tracking-tighter translate-y-[20%]">
          MAKPOP
        </h1>
      </div>

      <motion.div
        className="relative z-20 pt-10 pb-12"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8"




        >

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 lg:gap-8 mb-10">

            {/* --- Brand Column --- */}
            <motion.div variants={itemVariants} className="lg:col-span-5 space-y-8">
              <Link href="/" className="inline-block group">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white text-green-950 flex items-center justify-center rounded-full font-bold text-xl">M</div>
                  <span className="text-3xl font-bold tracking-tight text-white">Makpop.</span>
                </div>
              </Link>

              <p className="text-xl text-green-100/60 leading-relaxed max-w-md font-light">
                Elevating the art of snacking. We source the finest foxnuts to create a crunch that nourishes the soul.
              </p>

              <div className="flex gap-4 pt-4">
                {[Instagram, Facebook, Twitter].map((Icon, idx) => (
                  <a
                    key={idx}
                    href="#"
                    className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-green-950 hover:border-white transition-all duration-300 group"
                  >
                    <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  </a>
                ))}
              </div>
            </motion.div>

            {/* --- Links Grid --- */}
            <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-10">
              {[
                { title: "Shop", items: sections.shop },
                { title: "Company", items: sections.about },
                { title: "Support", items: sections.support },
              ].map((section, idx) => (
                <motion.div key={idx} variants={itemVariants}>
                  <h4 className="text-white font-semibold text-lg mb-6 tracking-wide">
                    {section.title}
                  </h4>
                  <ul className="space-y-4">
                    {section.items.map((link) => (
                      <li key={link.name} className="overflow-hidden">
                        <Link href={link.href}>
                          <motion.div
                            variants={linkVariants}
                            initial="initial"
                            whileHover="hover"
                            className="flex items-center gap-2 text-green-200/60 cursor-pointer group"
                          >
                            <span>{link.name}</span>
                            <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                          </motion.div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>

          {/* --- Bottom Bar (Glassmorphic) --- */}
          <motion.div
            variants={itemVariants}
            className="border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6"
          >
            <p className="text-sm text-green-200/40 font-medium">
              &copy; {currentYear} Makpop Foods. Crafted for wellness.
            </p>

            <div className="flex flex-wrap justify-center gap-8">
              {sections.legal.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm text-green-200/40 hover:text-white transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-px after:bg-white after:transition-all hover:after:w-full"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>

        </div>
      </motion.div>
    </footer>
  );
}