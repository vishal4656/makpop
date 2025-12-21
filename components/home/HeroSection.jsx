"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image"; 
import CTAButton from "@/components/common/CTAButton";
import { Leaf } from "lucide-react";
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
  useInView,
  animate,
} from "framer-motion";

// --- Animation Variants ---

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const fadeInUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", damping: 25, stiffness: 100 },
  },
};

const productImageVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.8 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      damping: 20,
      stiffness: 100,
    },
  },
};

// --- Helper Components ---

const Counter = ({ from, to, duration = 2 }) => {
  const count = useMotionValue(from);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (inView) {
      const controls = animate(count, to, { duration: duration });
      return controls.stop;
    }
  }, [count, to, inView, duration]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
};

// --- Main Component ---

export default function HeroSection() {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // 3D Tilt Logic (Keeps the whole group moving slightly, but no individual pop)
  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), {
    stiffness: 150,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), {
    stiffness: 150,
    damping: 20,
  });

  // ====================================================================
  // 🛠️ PRODUCTS CONFIGURATION
  // ====================================================================
  const products = [
    { 
      src: "/images/masala.png", 
      alt: "Chatpata Masala", 
      width: 1000, height: 533, 
      size: "w-[130%]", 
      className: "z-20 bottom-[1%] right-[20%] rotate-[-10deg]" 
    },
    { 
      src: "/images/ghee.png", 
      alt: "Desi Ghee Roasted", 
      width: 1000, height: 545, 
      size: "w-[135%]", 
      className: "z-30 top-1/3 left-1/9 -translate-x-1/2 -translate-y-1/2 drop-shadow-2xl",
      // Clip path kept for clean layout, though strictly not needed without hover
      clipPath: "inset(0% 20% 0% 20%)"
    },
    { 
      src: "/images/salt.png", 
      alt: "Himalayan Pink Salt", 
      width: 1000, height: 545, 
      size: "w-[133%]",
      className: "z-10 top-[5%] -right-[45%] rotate-[15deg]" 
    },
    { 
      src: "/images/cheese.png", 
      alt: "Cheese & Herbs", 
      width: 800, height: 695, 
      size: "w-[75%]", 
      className: "z-10 top-[10%] -left-[45%] rotate-[-15deg]" 
    },
    { 
      src: "/images/peri.png", 
      alt: "Peri Peri", 
      width: 800, height: 740, 
      size: "w-[75%]", 
      className: "z-20 bottom-[40%] left-[1%] rotate-[10deg]" 
    },
  ];

  return (
    <section className="relative bg-cream-100 overflow-hidden min-h-[90vh] flex items-center">
      {/* Background Blobs (Commented out as per your previous code) */}
      {/* <div className="absolute inset-0 pointer-events-none overflow-hidden">
        ...
      </div> */}

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* --- Left Content --- */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8 relative z-20"
          >
            <motion.div variants={fadeInUpVariants}>
              <div className="inline-flex items-center bg-green-900/90 backdrop-blur-sm text-cream-50 px-4 py-2 rounded-full text-sm font-medium shadow-sm hover:shadow-md transition-shadow">
                <Leaf className="h-4 w-4 mr-2 animate-pulse" />
                India's Premium Makhana
              </div>
            </motion.div>

            <motion.div variants={fadeInUpVariants}>
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-green-950 leading-[1.1] tracking-tight">
                Pop the
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-800 to-green-600">
                  Healthy Habit
                </span>
              </h1>
            </motion.div>

            <motion.p variants={fadeInUpVariants} className="text-lg md:text-xl text-charcoal-700 max-w-lg leading-relaxed">
              Roasted, crunchy, and guilt-free. The perfect pantry staple for
              health-conscious families looking for a smarter snack.
            </motion.p>

            <motion.div variants={fadeInUpVariants} className="flex flex-wrap gap-4 pt-4">
              <Link href="/shop">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <CTAButton className="shadow-lg shadow-green-900/20 hover:shadow-green-900/40 transition-all">
                    Shop Now
                  </CTAButton>
                </motion.div>
              </Link>
              <Link href="/why-makpop">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <CTAButton variant="secondary" className="bg-white/80 backdrop-blur-md shadow-sm hover:shadow-md">
                    Why Makhana?
                  </CTAButton>
                </motion.div>
              </Link>
            </motion.div>

            <motion.div variants={fadeInUpVariants} className="grid grid-cols-3 gap-6 border-t border-green-900/10 pt-8 max-w-md">
              <div className="text-left">
                <p className="text-3xl md:text-4xl font-bold text-green-900 tabular-nums"><Counter from={0} to={100} />%</p>
                <p className="text-xs md:text-sm font-medium text-charcoal-600 uppercase tracking-wider mt-1">Natural</p>
              </div>
              <div className="text-left border-l border-green-900/10 pl-6">
                <p className="text-3xl md:text-4xl font-bold text-green-900">Low</p>
                <p className="text-xs md:text-sm font-medium text-charcoal-600 uppercase tracking-wider mt-1">Calories</p>
              </div>
              <div className="text-left border-l border-green-900/10 pl-6">
                <p className="text-3xl md:text-4xl font-bold text-green-900">High</p>
                <p className="text-xs md:text-sm font-medium text-charcoal-600 uppercase tracking-wider mt-1">Protein</p>
              </div>
            </motion.div>
          </motion.div>

          {/* --- Right Image (Product Composition) --- */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.1, delayChildren: 0.5 } },
            }}
            className="relative lg:ml-auto lg:max-w-xl w-full aspect-square perspective-1000"
          >
            {/* 3D Tilt Container */}
            <motion.div
              // ref={ref}
              // onMouseMove={handleMouseMove}
              // onMouseLeave={handleMouseLeave}
              // style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
              // className="relative w-full h-full"
            >
              {/* Background Glow */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                className="absolute inset-4 bg-gradient-to-tr from-green-800/20 to-blush-300/30 rounded-full blur-2xl -z-10"
                style={{ transform: "translateZ(-50px)" }}
              />

              {/* Product Packets */}
              {products.map((product, index) => (
                <motion.div
                  key={index}
                  variants={productImageVariants}
                  // Cleaned up: No hover logic, no conditional animation
                  className={`absolute h-auto will-change-transform ${product.size} ${product.className}`}
                  style={{ 
                    transformStyle: "preserve-3d",
                    transform: "translateZ(30px)", // Fixed Z depth for 3D effect
                    clipPath: product.clipPath || "none"
                  }}
                >
                  <Image
                    src={product.src}
                    alt={product.alt}
                    width={product.width}
                    height={product.height}
                    className="w-full h-auto object-contain drop-shadow-2xl"
                    priority={index === 1} // Center image priority
                  />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}