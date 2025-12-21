"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Menu, ShoppingCart, X, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCartStore } from "@/lib/store"
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs"

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isCartAnimating, setIsCartAnimating] = useState(false)
const router = useRouter();
  const itemCount = useCartStore((state) => state.getItemCount())
  const pathname = usePathname()

  // Handle Scroll Effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Animate Cart Badge when items change
  useEffect(() => {
    if (itemCount > 0) {
      setIsCartAnimating(true)
      const timer = setTimeout(() => setIsCartAnimating(false), 300)
      return () => clearTimeout(timer)
    }
  }, [itemCount])

  const navigation = [
    { name: "Shop", href: "/shop" },
    { name: "Why Makpop", href: "/why-makpop" },
    { name: "About", href: "/about" },
    { name: "FAQ", href: "/faq" },
    { name: "Contact", href: "/contact" },
  ]

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ease-in-out border-b
        ${isScrolled
          ? "bg-cream-50/90 backdrop-blur-md border-charcoal-800/10 py-2 shadow-sm"
          : "bg-cream-50/50 backdrop-blur-sm border-transparent py-4"
        }
      `}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* --- Logo Area --- */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="relative w-10 h-10 bg-green-900 rounded-full flex items-center justify-center overflow-hidden transition-transform duration-300 group-hover:scale-105 group-hover:shadow-lg">
              <span className="text-cream-50 font-bold text-xl relative z-10">M</span>
              {/* Subtle shine effect on logo */}
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </div>
            <span className="font-bold text-xl text-green-900 hidden sm:block tracking-tight">
              Makpop
            </span>
          </Link>

          {/* --- Desktop Navigation --- */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`relative text-sm font-medium transition-colors duration-200 
                    ${isActive ? "text-green-900" : "text-charcoal-900 hover:text-green-900"}
                    group
                  `}
                >
                  {item.name}
                  {/* Animated Underline */}
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 bg-green-900 transition-all duration-300 ease-out
                      ${isActive ? "w-full" : "w-0 group-hover:w-full"}
                    `}
                  />
                </Link>
              )
            })}
          </div>

          {/* --- Right Actions (Cart & Mobile Toggle) --- */}
          <div className="flex items-center space-x-3">
            <Link href="/cart">
              <Button
                variant="ghost"
                size="sm"
                className="relative hover:bg-green-900/10 transition-colors"
              >
                <ShoppingCart className="h-5 w-5 text-charcoal-900" />
                <span className={`
                  absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-[10px] font-bold text-white bg-green-900 rounded-full border-2 border-cream-50
                  transition-transform duration-300
                  ${itemCount === 0 ? "scale-0 opacity-0" : "scale-100 opacity-100"}
                  ${isCartAnimating ? "scale-125" : ""}
                `}>
                  {itemCount}
                </span>
              </Button>
            </Link>
            <SignedOut>

              <button onClick={()=>router.push('/sign-in')} className="group relative inline-flex h-10 sm:h-12 items-center justify-center overflow-hidden rounded-full bg-green-900 px-6 sm:px-8 font-bold text-white transition-all duration-300 hover:bg-green-800 hover:shadow-[0_0_20px_rgba(20,83,45,0.3)] hover:-translate-y-0.5 active:scale-95 active:translate-y-0 cursor-pointer">

                {/* Text Content */}
                <span className="relative z-10 flex items-center gap-2 text-sm sm:text-base tracking-wide">
                  Sign In
                  {/* Animated Arrow (Optional: Adds a nice directional cue) */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </span>

                {/* Shine Animation Overlay */}
                <div className="absolute inset-0 -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />

              </button>



            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>


            <button
              className="md:hidden p-2 text-charcoal-900 hover:text-green-900 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <div className="relative w-6 h-6">
                <span className={`absolute inset-0 transition-all duration-300 ${mobileMenuOpen ? "opacity-0 rotate-90" : "opacity-100 rotate-0"}`}>
                  <Menu className="h-6 w-6" />
                </span>
                <span className={`absolute inset-0 transition-all duration-300 ${mobileMenuOpen ? "opacity-100 rotate-0" : "opacity-0 -rotate-90"}`}>
                  <X className="h-6 w-6" />
                </span>
              </div>
            </button>
          </div>
        </div>

        {/* --- Mobile Menu (Smooth Slide) --- */}
        <div
          className={`
                md:hidden overflow-hidden transition-all duration-300 ease-in-out
                ${mobileMenuOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"}
            `}
        >
          <div className="py-4 space-y-2 border-t border-charcoal-800/10 mt-2">
            {navigation.map((item, index) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`
                            flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-all
                            ${isActive
                      ? "bg-green-900/10 text-green-900 translate-x-2"
                      : "text-charcoal-900 hover:bg-green-50 hover:text-green-900 hover:translate-x-1"
                    }
                        `}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                  {isActive && <ChevronRight className="h-4 w-4" />}
                </Link>
              )
            })}
          </div>
        </div>
      </nav>
    </header>
  )
}