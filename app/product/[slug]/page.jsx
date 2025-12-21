import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/products";
import { formatPrice } from "@/lib/utils";
import ProductImages from "@/components/product/ProductImages";
import AddToCart from "@/components/product/AddToCart";
import NutritionTable from "@/components/product/NutritionTable";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Star, Truck, ShieldCheck, Leaf, Flame, Heart } from "lucide-react";
import WhyThisProduct from "@/components/product/WhyThisProduct";
export default async function ProductDetailPage({ params }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="bg-[#FAFAFA] min-h-screen selection:bg-green-100 selection:text-green-900">

      {/* 1. Hero Title Section (Centered) */}
      <div className="relative pt-24 pb-12 text-center overflow-hidden">
        {/* Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-green-200/20 rounded-full blur-[120px] pointer-events-none" />

        <div className="container relative z-10 px-4">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Badge variant="outline" className="border-green-900/20 text-green-900 px-4 py-1 rounded-full uppercase tracking-widest text-xs font-bold">
              {product.category} Series
            </Badge>
            {product.isBestseller && (
              <span className="bg-orange-500 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider shadow-lg shadow-orange-500/30">
                Bestseller
              </span>
            )}
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-green-950 tracking-tighter mb-4 leading-[0.9]">
            {product.name}
          </h1>
          <p className="text-xl md:text-2xl text-charcoal-500 font-medium max-w-2xl mx-auto">
            {product.description}
          </p>
        </div>
      </div>

      {/* 2. Main Visual & Purchase Section (Sticky) */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* Left: Giant Image Gallery (Spans 7 columns) */}
          <div className="lg:col-span-7 lg:sticky lg:top-8">
            <ProductImages product={product} />
          </div>

          {/* Right: Purchase Panel (Spans 5 columns) */}
          <div className="lg:col-span-5 space-y-10 lg:pt-12">

            {/* Price Block */}
            <div className="bg-white/60 backdrop-blur-xl border border-white/50 p-8 rounded-3xl shadow-sm">
              <div className="flex items-end justify-between mb-6">
                <div>
                  <p className="text-sm text-charcoal-500 font-medium mb-1">Price</p>
                  <p className="text-4xl font-bold text-green-950">{formatPrice(product.price)}</p>
                </div>
                <div className="text-right">
                  <div className="flex text-orange-400 mb-1 justify-end">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                  </div>
                  <p className="text-xs text-charcoal-400 font-medium">4.8 (128 Reviews)</p>
                </div>
              </div>

              <AddToCart product={product} />

              <div className="mt-6 flex items-center justify-center gap-6 text-xs font-medium text-charcoal-500">
                <span className="flex items-center gap-1.5"><Truck className="w-4 h-4" /> Fast Delivery</span>
                <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4" /> Secure Checkout</span>
              </div>
            </div>

            {/* Ingredients Pills */}
            <div>
              <h3 className="text-lg font-bold text-green-950 mb-4">Pure Ingredients</h3>
              <div className="flex flex-wrap gap-2">
                {product.ingredients?.map((item, i) => (
                  <span key={i} className="px-4 py-2 bg-white border border-gray-100 rounded-xl text-sm font-medium text-charcoal-600 shadow-sm hover:scale-105 transition-transform cursor-default">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Nutrition (Modern Bar Chart Style) */}
            <div className="pt-4">
              <h3 className="text-lg font-bold text-green-950 mb-4">Nutritional Value</h3>
              <NutritionTable nutrition={product.nutrition} />


              [Image of nutrition label breakdown]

            </div>

          </div>
        </div>
      </div>

      {/* 3. Bento Grid Features (Apple Style) */}
     
<WhyThisProduct/>
    </div>
  );
}