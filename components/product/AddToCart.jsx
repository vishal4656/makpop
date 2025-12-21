"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Minus, Plus, ShoppingCart } from "lucide-react"
import { useCartStore } from "@/lib/store"
import { useRouter } from "next/navigation"

export default function AddToCart({ product }) {
  const [quantity, setQuantity] = useState(1)
  const addItem = useCartStore((state) => state.addItem)
  const router = useRouter()

  const handleAddToCart = () => {
    addItem(product, quantity)
    router.push('/cart')
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <span className="text-sm font-medium">Quantity:</span>
        <div className="flex items-center border-2 border-charcoal-800/20 rounded-lg">
          <Button
            variant=""
            size="sm"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            disabled={quantity <= 1}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="px-4 font-semibold">{quantity}</span>
          <Button
            variant="default"
            size="sm"
            onClick={() => setQuantity(Math.min(10, quantity + 1))}
            disabled={quantity >= 10}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Button 
        onClick={handleAddToCart}
        size="lg" 
        
        className="w-full hover:bg-green-700 hover:text-white"
        disabled={!product.inStock}
        
      >
        <ShoppingCart className="mr-2 h-5 w-5" />
        {product.inStock ? 'Add to Cart' : 'Out of Stock'}
      </Button>
    </div>
  )
}
