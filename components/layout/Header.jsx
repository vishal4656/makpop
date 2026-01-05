"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Menu,
  ShoppingCart,
  X,
  ChevronRight,
  LogOut,
  User,
  Package,
  Heart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge" // Unused in this snippet but okay to keep
import { useCartStore } from "@/lib/store";

// --- Firebase Imports ---
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/firebase";

// --- Shadcn UI Imports ---
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCartAnimating, setIsCartAnimating] = useState(false);

  // --- Auth State ---
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  console.log(user, "user");

  const router = useRouter();
  const itemCount = useCartStore((state) => state.getItemCount());
  const pathname = usePathname();

  // Handle Scroll Effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle Auth State
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Handle Sign Out
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  // Animate Cart Badge when items change
  useEffect(() => {
    if (itemCount > 0) {
      setIsCartAnimating(true);
      const timer = setTimeout(() => setIsCartAnimating(false), 300);
      return () => clearTimeout(timer);
    }
  }, [itemCount]);

  const navigation = [
    { name: "Shop", href: "/shop" },
    { name: "Why Makpop", href: "/why-makpop" },
    { name: "About", href: "/about" },
    { name: "FAQ", href: "/faq" },
    { name: "Contact", href: "/contact" },
  ];

  // Get Initials for Avatar Fallback
  const getInitials = (name) => {
    if (!name) return "MP";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ease-in-out border-b
        ${
          isScrolled
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
              <span className="text-cream-50 font-bold text-xl relative z-10">
                M
              </span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </div>
            <span className="font-bold text-xl text-green-900 hidden sm:block tracking-tight">
              Makpop
            </span>
          </Link>

          {/* --- Desktop Navigation --- */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`relative text-sm font-medium transition-colors duration-200 
                    ${
                      isActive
                        ? "text-green-900"
                        : "text-charcoal-900 hover:text-green-900"
                    }
                    group
                  `}
                >
                  {item.name}
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 bg-green-900 transition-all duration-300 ease-out
                      ${isActive ? "w-full" : "w-0 group-hover:w-full"}
                    `}
                  />
                </Link>
              );
            })}
          </div>

          {/* --- Right Actions (Cart & Auth) --- */}
          <div className="flex items-center space-x-3">
            {/* Cart Button */}
            <Link href="/cart">
              <Button
                variant="ghost"
                size="sm"
                className="relative hover:bg-green-900/10 transition-colors"
              >
                <ShoppingCart className="h-5 w-5 text-charcoal-900" />
                <span
                  className={`
                  absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-[10px] font-bold text-white bg-green-900 rounded-full border-2 border-cream-50
                  transition-transform duration-300
                  ${
                    itemCount === 0
                      ? "scale-0 opacity-0"
                      : "scale-100 opacity-100"
                  }
                  ${isCartAnimating ? "scale-125" : ""}
                `}
                >
                  {itemCount}
                </span>
              </Button>
            </Link>

            {/* --- Auth State Handling --- */}
            {!loading && (
              <>
                {!user ? (
                  /* SIGNED OUT: Show Sign In Button */
                  <button
                    onClick={() => router.push("/sign-in")}
                    className="group relative inline-flex h-10 sm:h-12 items-center justify-center overflow-hidden rounded-full bg-green-900 px-6 sm:px-8 font-bold text-white transition-all duration-300 hover:bg-green-800 hover:shadow-[0_0_20px_rgba(20,83,45,0.3)] hover:-translate-y-0.5 active:scale-95 active:translate-y-0 cursor-pointer"
                  >
                    <span className="relative z-10 flex items-center gap-2 text-sm sm:text-base tracking-wide">
                      Sign In
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
                    <div className="absolute inset-0 -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
                  </button>
                ) : (
                  /* SIGNED IN: Show User Dropdown */
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className="relative h-10 w-10 rounded-full p-0 overflow-hidden border-2 border-green-900/10 hover:border-green-900 transition-all cursor-pointer"
                      >
                        <Avatar className="h-full w-full">
                          <AvatarImage
                            src={user.photoURL}
                            alt={user.displayName || "User"}
                            referrerPolicy="no-referrer"
                          />
                          <AvatarFallback className="bg-green-100 text-green-900 font-bold">
                            {getInitials(user.displayName)}
                          </AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent
                      className="w-56 mt-2 bg-white/90 backdrop-blur-xl border border-green-100 shadow-xl rounded-xl"
                      align="end"
                      forceMount
                    >
                      <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col space-y-1">
                          <p className="text-sm font-bold leading-none text-green-950">
                            {user.displayName || "Snack Enthusiast"}
                          </p>
                          <p className="text-xs leading-none text-muted-foreground truncate opacity-70">
                            {user.email}
                          </p>
                        </div>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator className="bg-green-100" />

                      <DropdownMenuItem className="cursor-pointer text-charcoal-700 focus:text-green-900 focus:bg-green-50 rounded-lg my-1">
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer text-charcoal-700 focus:text-green-900 focus:bg-green-50 rounded-lg my-1">
                        <Package className="mr-2 h-4 w-4" />
                        <span>Orders</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer text-charcoal-700 focus:text-green-900 focus:bg-green-50 rounded-lg my-1">
                        <Heart className="mr-2 h-4 w-4" />
                        <span>Saved Flavors</span>
                      </DropdownMenuItem>

                      <DropdownMenuSeparator className="bg-green-100" />

                      <DropdownMenuItem
                        onClick={handleSignOut}
                        className="cursor-pointer text-red-600 focus:text-red-700 focus:bg-red-50 rounded-lg my-1 font-medium"
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </>
            )}

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-charcoal-900 hover:text-green-900 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <div className="relative w-6 h-6">
                <span
                  className={`absolute inset-0 transition-all duration-300 ${
                    mobileMenuOpen
                      ? "opacity-0 rotate-90"
                      : "opacity-100 rotate-0"
                  }`}
                >
                  <Menu className="h-6 w-6" />
                </span>
                <span
                  className={`absolute inset-0 transition-all duration-300 ${
                    mobileMenuOpen
                      ? "opacity-100 rotate-0"
                      : "opacity-0 -rotate-90"
                  }`}
                >
                  <X className="h-6 w-6" />
                </span>
              </div>
            </button>
          </div>
        </div>

        {/* --- Mobile Menu --- */}
        <div
          className={`
            md:hidden overflow-hidden transition-all duration-300 ease-in-out
            ${
              mobileMenuOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
            }
          `}
        >
          <div className="py-4 space-y-2 border-t border-charcoal-800/10 mt-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`
                    flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-all
                    ${
                      isActive
                        ? "bg-green-900/10 text-green-900 translate-x-2"
                        : "text-charcoal-900 hover:bg-green-50 hover:text-green-900 hover:translate-x-1"
                    }
                  `}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                  {isActive && <ChevronRight className="h-4 w-4" />}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>
    </header>
  );
}
