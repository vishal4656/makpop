"use client";
import Link from "next/link";
import { ArrowLeft, Star } from "lucide-react";
import React, { useState, useEffect } from "react"; // <--- Import useEffect
import { motion, AnimatePresence } from "framer-motion";
import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
  onAuthStateChanged // <--- Import this listener
} from "firebase/auth";
import { auth } from "@/firebase"; 
import { Eye, EyeOff, ArrowRight, Loader2, AlertTriangle } from "lucide-react";
import { useRouter } from "next/navigation"; 

// --- Animation Variants ---
const shakeVariant = {
  idle: { x: 0 },
  error: { x: [-10, 10, -10, 10, 0], transition: { duration: 0.4 } }
};

const formSwitchVariant = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 100 } },
  exit: { opacity: 0, y: -20, scale: 0.95, transition: { duration: 0.2 } }
};

export default function SignInPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  
  // New State: Checks if we are figuring out who the user is
  const [authChecking, setAuthChecking] = useState(true); 

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [resetSent, setResetSent] = useState(false);
  
  // Form Fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const router = useRouter();

  // --- 🔥 AUTH PROTECTION HOOK 🔥 ---
  // This runs once when the page loads.
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is ALREADY logged in. Redirect them!
        console.log("User detected, redirecting to home...");
        router.push("/");
      } else {
        // No user found. Show the login form.
        setAuthChecking(false);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [router]);

  // --- Handlers ---
  const handleGoogle = async () => {
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      router.push("/"); 
    } catch (err) {
      setError("Google ghosted us. Try again.");
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        router.push("/"); 
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        await sendEmailVerification(user);
        alert("Verification link sent. Please check your email.");
        router.push("/"); 
      }
    } catch (err) {
      console.error(err);
      let msg = "Glitch in the matrix.";
      if (err.code === "auth/invalid-credential") msg = "Wrong keys, intruder!";
      if (err.code === "auth/email-already-in-use") msg = "That alias is taken. Be unique.";
      if (err.code === "auth/weak-password") msg = "Weak password. Do you want to get hacked?";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setError("I need an email to send the rescue link.");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      setResetSent(true);
      setError("");
    } catch (err) {
      setError("Couldn't send reset. Is that a real email?");
    }
  };

  // --- ⏳ LOADING SCREEN ---
  // If we are still checking if the user is logged in, show this instead of the form.
  if (authChecking) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-cream-50">
        <Loader2 className="w-10 h-10 animate-spin text-green-900" />
      </div>
    );
  }

  // --- MAIN UI ---
  return (
    <div className="min-h-screen w-full grid grid-cols-1 lg:grid-cols-2 bg-cream-50">
      
      {/* Left Column: Welcome Back */}
      <div className="hidden lg:flex relative flex-col justify-center p-12 overflow-hidden bg-green-950 text-cream-50">
        <div className="absolute inset-0 pointer-events-none z-0">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-green-200/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,transparent,transparent_49px,#14532d05_50px)] opacity-50" />
        </div>

        <div className="relative z-10 max-w-lg mx-auto">
          <Link href="/" className="flex items-center gap-3 w-fit mb-12 group">
            <div className="w-12 h-12 bg-cream-50 rounded-full flex items-center justify-center text-green-950 font-bold text-2xl transition-transform group-hover:scale-110">
              M
            </div>
            <span className="font-bold text-3xl tracking-tight">Makpop</span>
          </Link>

          <h1 className="text-5xl md:text-6xl font-black leading-tight mb-6">
            Welcome <br />
            <span className="text-green-200">Back.</span>
          </h1>

          <p className="text-xl text-green-100/80 leading-relaxed mb-12">
            We missed you! Sign in to access your saved flavors and track your
            orders.
          </p>

          <div className="bg-green-900/50 backdrop-blur-md p-6 rounded-2xl border border-green-800/50">
            <div className="flex gap-1 text-orange-400 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <p className="text-lg font-medium italic text-green-50 mb-2">
              "The only snack subscription I've actually kept. Consistent
              quality every time."
            </p>
            <p className="text-sm font-bold text-green-200 uppercase tracking-wider">
              — Happy Snacker
            </p>
          </div>
        </div>
      </div>

      {/* Right Column: Sign In Form */}
      <div className="flex flex-col items-center justify-center p-6 relative bg-white lg:bg-cream-50">
        
        <div className="absolute top-6 right-6 lg:top-8 lg:right-8 z-20">
          <Link href="/">
            <button className="flex items-center gap-2 text-sm font-medium text-charcoal-500 hover:text-green-900 transition-colors bg-white px-4 py-2 rounded-full border border-green-900/5 shadow-sm hover:shadow-md cursor-pointer">
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </button>
          </Link>
        </div>

       <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-2xl border-2 border-green-900 overflow-hidden relative font-sans">
      
      <div className="absolute top-0 left-0 w-full h-2 bg-green-50 animate-pulse" />
      
      <div className="text-center mb-8">
        <h2 className="text-3xl font-black italic text-green-950 tracking-tighter uppercase transform -skew-x-6">
          {isLogin ? "Resume Chaos" : "Join the Cult"}
        </h2>
        <p className="text-charcoal-500 text-sm font-medium mt-1">
          {isLogin ? "Welcome back, legend." : "Prepare for obsession."}
        </p>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={isLogin ? "login" : "signup"}
          variants={formSwitchVariant}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleGoogle}
            type="button"
            className="w-full flex items-center justify-center gap-3 bg-white border-2 border-charcoal-200 text-charcoal-800 font-bold py-3 rounded-xl hover:border-green-600 hover:text-green-900 transition-all group relative overflow-hidden cursor-pointer"
          >
            <div className="absolute inset-0 w-full h-full bg-green-50 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300" />
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5 relative z-10" alt="G" />
            <span className="relative z-10">Summon Google</span>
          </motion.button>

          <div className="relative flex items-center gap-4 my-6">
            <div className="h-px bg-charcoal-100 flex-1"></div>
            <span className="text-[10px] font-black text-charcoal-300 uppercase tracking-widest">OR USE COMMS</span>
            <div className="h-px bg-charcoal-100 flex-1"></div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div className="space-y-1 group">
              <label className="text-[10px] font-black text-green-800 uppercase tracking-wider ml-1 group-focus-within:text-green-600">
                Codename (Email)
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="shinobi@hidden-leaf.com"
                className="w-full bg-charcoal-50 border-2 border-transparent focus:border-green-500 focus:bg-white px-4 py-3 rounded-xl font-bold text-charcoal-900 placeholder:text-charcoal-300 outline-none transition-all"
              />
            </div>

            <div className="space-y-1 group">
              <label className="text-[10px] font-black text-green-800 uppercase tracking-wider ml-1 group-focus-within:text-green-600">
                Secret Key
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-charcoal-50 border-2 border-transparent focus:border-green-500 focus:bg-white px-4 py-3 rounded-xl font-bold text-charcoal-900 placeholder:text-charcoal-300 outline-none transition-all pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-charcoal-400 hover:text-green-600 transition-colors cursor-pointer"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {isLogin && (
              <div className="flex justify-end">
                <button 
                  type="button"
                  onClick={handleForgotPassword}
                  className="text-xs font-bold text-charcoal-400 hover:text-green-600 hover:underline transition-colors cursor-pointer"
                >
                  Brain fog? Reset it.
                </button>
              </div>
            )}

            {resetSent && isLogin && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-green-600 font-bold text-center">
                🚀 Rescue link launched to your inbox!
              </motion.div>
            )}

            <AnimatePresence>
              {error && (
                <motion.div
                  variants={shakeVariant}
                  initial="idle"
                  animate="error"
                  className="flex items-center gap-2 text-red-500 text-xs font-black bg-red-50 p-3 rounded-lg border border-red-100"
                >
                  <AlertTriangle size={14} /> {error}
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button
              whileHover={{ scale: 1.03, rotate: -1 }}
              whileTap={{ scale: 0.95 }}
              disabled={loading}
              type="submit"
              className="w-full bg-green-900 text-white font-black italic text-lg py-3 rounded-xl shadow-[4px_4px_0px_0px_rgba(20,83,45,0.3)] hover:shadow-[2px_2px_0px_0px_rgba(20,83,45,0.3)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
            >
              {loading ? <Loader2 className="animate-spin" /> : (isLogin ? "ENTER THE LAIR" : "INITIATE")}
              {!loading && <ArrowRight size={20} className="stroke-[3px]" />}
            </motion.button>

          </form>
        </motion.div>
      </AnimatePresence>

      <div className="mt-6 text-center">
        <p className="text-xs font-bold text-charcoal-400">
          {isLogin ? "New here?" : "Already an agent?"}
          <button
            onClick={() => { setIsLogin(!isLogin); setError(""); setResetSent(false); }}
            className="ml-2 text-green-700 underline decoration-2 underline-offset-2 hover:text-green-900 cursor-pointer"
          >
            {isLogin ? "Create Account" : "Log In"}
          </button>
        </p>
      </div>

    </div>
      </div>
    </div>
  );
}