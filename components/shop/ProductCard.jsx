"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"
import { formatPrice } from "@/lib/utils"
import { useCartStore } from "@/lib/store"

export default function ProductCard({ product }) {
  //console.log(product,'prodect');
  
  const addItem = useCartStore((state) => state.addItem)

  const handleAddToCart = (e) => {
    e.preventDefault()
    addItem(product, 1)
  }

  return (
    <Link href={`/product/${product.slug}`}>
      <Card className="group hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden border-charcoal-800/10 hover:border-green-900/30">
        <div className="relative aspect-square overflow-hidden bg-cream-100">
          <img
            src={product?.image?.src?.src}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {!product.inStock && (
            <Badge className="absolute top-2 right-2 bg-charcoal-900">
              Out of Stock
            </Badge>
          )}
        </div>
        <CardContent className="p-4">
          <Badge variant="outline" className="mb-2 text-xs">
            {product.category}
          </Badge>
          <h3 className="font-semibold text-lg text-green-950 mb-1">
            {product.name}
          </h3>
          <p className="text-sm text-charcoal-800 mb-3 line-clamp-2">
            {product.description}
          </p>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-green-900">
                {formatPrice(product.price)}
              </p>
              <p className="text-xs text-charcoal-800">{product.weight}</p>
            </div>
            <Button 
              size="sm" 
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className="group-hover:bg-green-800"
            >
              <ShoppingCart className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
