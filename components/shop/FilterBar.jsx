"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { categories } from "@/lib/products"

export default function FilterBar({ onFilterChange }) {
  const [activeCategory, setActiveCategory] = useState("All")

  const handleCategoryClick = (category) => {
    setActiveCategory(category)
    onFilterChange({ category })
  }

  return (
    <div className="flex flex-wrap gap-3 mb-8">
      {categories.map((category) => (
        <Button
          key={category}
          variant={activeCategory === category ? "default" : "secondary"}
          onClick={() => handleCategoryClick(category)}
          size="sm"
        >
          {category}
        </Button>
      ))}
    </div>
  )
}
