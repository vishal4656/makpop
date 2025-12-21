"use client";

import React from "react";
import { SignUp } from "@clerk/nextjs";
import Link from "next/link";
import { ArrowLeft, Star } from "lucide-react";

export default function SignUpPage() {
  return (
    <div className="min-h-screen w-full grid grid-cols-1 lg:grid-cols-2 bg-cream-50">
      
      {/* --- Left Column: Join Message --- */}
      <div className="hidden lg:flex relative flex-col justify-center p-12 overflow-hidden bg-green-950 text-cream-50">
        
        {/* Background Effects */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
           <div className="absolute top-[-20%] left-[-20%] w-[600px] h-[600px] bg-green-800/30 rounded-full blur-[100px]" />
           <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-emerald-900/40 rounded-full blur-[80px]" />
           <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-soft-light"></div>
        </div>

        <div className="relative z-10 max-w-lg mx-auto">
          <Link href="/" className="flex items-center gap-3 w-fit mb-12 group">
            <div className="w-12 h-12 bg-cream-50 rounded-full flex items-center justify-center text-green-950 font-bold text-2xl transition-transform group-hover:scale-110">
              M
            </div>
            <span className="font-bold text-3xl tracking-tight">Makpop</span>
          </Link>

          <h1 className="text-5xl md:text-6xl font-black leading-tight mb-6">
            Join the <br/>
            <span className="text-green-200">Family.</span>
          </h1>
          
          <p className="text-xl text-green-100/80 leading-relaxed mb-12">
            Create an account to start your healthy snacking journey, track your orders, and get exclusive member rewards.
          </p>

          {/* Trust Signal */}
          <div className="bg-green-900/50 backdrop-blur-md p-6 rounded-2xl border border-green-800/50">
            <div className="flex gap-1 text-orange-400 mb-3">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
            </div>
            <p className="text-lg font-medium italic text-green-50 mb-2">
              "I switched to Makpop for the health benefits, but I stayed for the taste."
            </p>
            <p className="text-sm font-bold text-green-200 uppercase tracking-wider">— Rohan M.</p>
          </div>
        </div>
      </div>

      {/* --- Right Column: Sign Up Form --- */}
      <div className="flex flex-col items-center justify-center p-6 relative bg-white lg:bg-cream-50">
        
        {/* Mobile Logo */}
        <div className="lg:hidden absolute top-6 left-6">
           <Link href="/" className="flex items-center gap-2 font-bold text-green-950 text-xl">
             <div className="w-8 h-8 bg-green-950 rounded-full flex items-center justify-center text-white text-sm">M</div>
             Makpop
           </Link>
        </div>

        {/* Back Button */}
        <div className="absolute top-6 right-6 lg:top-8 lg:right-8">
          <Link href="/">
            <button className="flex items-center gap-2 text-sm font-medium text-charcoal-500 hover:text-green-900 transition-colors bg-white px-4 py-2 rounded-full border border-green-900/5 shadow-sm hover:shadow-md">
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </button>
          </Link>
        </div>

        <div className="w-full max-w-md">
          <div className="text-center mb-8 lg:hidden">
            <h2 className="text-3xl font-bold text-green-950 mb-2">Create Account</h2>
            <p className="text-charcoal-500">Sign up to get started</p>
          </div>

          <SignUp 
            forceRedirectUrl="/cart"
         
            appearance={sharedAppearance} 
          />
        </div>
      </div>
    </div>
  );
}

// Consistent Styling
const sharedAppearance = {
  layout: {
    socialButtonsPlacement: "bottom",
    socialButtonsVariant: "blockButton",
  },
  variables: {
    colorPrimary: "#14532d", 
    colorText: "#052e16",
    fontFamily: "inherit",
    borderRadius: "0.75rem",
  },
  elements: {
    card: "bg-white/80 backdrop-blur-xl shadow-xl border border-white/50 w-full p-2 sm:p-8",
    headerTitle: "hidden", 
    headerSubtitle: "hidden",
    formFieldInput: "bg-white border-green-900/10 focus:border-green-600 focus:ring-green-600/20 rounded-xl py-3 text-charcoal-900 shadow-sm",
    formFieldLabel: "text-charcoal-600 font-medium",
    formButtonPrimary: "bg-green-900 hover:bg-green-800 text-cream-50 font-bold py-3 shadow-lg hover:shadow-green-900/20 transition-all transform active:scale-95",
    socialButtonsBlockButton: "bg-white border border-green-900/10 hover:bg-cream-50 text-charcoal-700 font-medium transition-colors",
    footerActionLink: "text-green-700 hover:text-green-900 font-semibold hover:underline",
    identityPreviewText: "text-charcoal-600",
    formFieldAction: "text-green-700 hover:text-green-900 font-medium",
    dividerLine: "bg-green-900/10",
    dividerText: "text-charcoal-400 font-medium"
  }
};