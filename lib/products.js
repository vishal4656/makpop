
import desiperi from "@/public/product/desiperi.png";
import desighee from "@/public/product/desighee.png";
import desimasala from "@/public/product/desimasala.png";
import desisalt from "@/public/product/desisalt.png";
import desicheese from "@/public/product/desicheese.png";
export const products = [
  {
    id: 1,
    slug: "peri-peri-makhana",
    name: "Peri Peri Makhana",
    price: 199,
    image: {src:desiperi},
    description: "Tangy and spicy peri peri flavoured roasted makhana",
    category: "Spicy",
    inStock: true,
    weight: "100g",
    benefits: ["High Protein", "Low Fat", "Gluten Free"],
    ingredients: ["Foxnuts (Makhana)", "Peri Peri Seasoning", "Rock Salt", "Edible Oil"],
    nutrition: {
      servingSize: "30g",
      calories: 120,
      protein: "4g",
      carbs: "18g",
      fat: "3g",
      fiber: "2g",
    }
  },
  {
    id: 2,
    slug: "cream-onion-makhana",
    name: "Cream & Onion Makhana",
    price: 70,
    image: {src:desighee},
    description: "Classic cream and onion flavour with roasted goodness",
    category: "Savory",
    inStock: true,
    weight: "50g",
    benefits: ["High Protein", "Low Fat", "No Preservatives"],
    ingredients: ["Foxnuts (Makhana)", "Cream & Onion Seasoning", "Rock Salt", "Edible Oil"],
    nutrition: {
      servingSize: "30g",
      calories: 118,
      protein: "4g",
      carbs: "17g",
      fat: "3.5g",
      fiber: "2g",
    }
  },
  {
    id: 3,
    slug: "tandoori-makhana",
    name: "Tandoori Makhana",
    price: 199,
    image: {src:desimasala},
    description: "Smoky tandoori masala flavoured healthy snack",
    category: "Spicy",
    inStock: true,
    weight: "100g",
    benefits: ["High Protein", "Low Fat", "No MSG"],
    ingredients: ["Foxnuts (Makhana)", "Tandoori Masala", "Rock Salt", "Edible Oil"],
    nutrition: {
      servingSize: "30g",
      calories: 115,
      protein: "4g",
      carbs: "18g",
      fat: "2.5g",
      fiber: "2g",
    }
  },
  {
    id: 4,
    slug: "himalayan-salt-makhana",
    name: "Himalayan Salt Makhana",
    price: 179,
    image: {src:desisalt},
    description: "Lightly salted with pure Himalayan pink salt",
    category: "Classic",
    inStock: true,
    weight: "100g",
    benefits: ["High Protein", "Low Calorie", "Natural"],
    ingredients: ["Foxnuts (Makhana)", "Himalayan Pink Salt", "Edible Oil"],
    nutrition: {
      servingSize: "30g",
      calories: 110,
      protein: "4g",
      carbs: "19g",
      fat: "2g",
      fiber: "2g",
    }
  },
  {
    id: 5,
    slug: "cheese-herbs-makhana",
    name: "Cheese & Herbs Makhana",
    price: 199,
    image: {src:desicheese},
    description: "Cheesy goodness with aromatic herbs",
    category: "Savory",
    inStock: true,
    weight: "100g",
    benefits: ["High Protein", "Low Fat", "Vegetarian"],
    ingredients: ["Foxnuts (Makhana)", "Cheese Powder", "Mixed Herbs", "Rock Salt", "Edible Oil"],
    nutrition: {
      servingSize: "30g",
      calories: 125,
      protein: "5g",
      carbs: "17g",
      fat: "4g",
      fiber: "2g",
    }
  },
]

export const getProductBySlug = (slug) => {
  //console.log(slug,'bdjbbjb');
  
  return products.find(p => p.slug === slug)
}

export const categories = ["All", "Spicy", "Savory", "Classic",];
