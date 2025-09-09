export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  category: string;
  description: string;
  discount?: number;
  isNew?: boolean;
  isBestSeller?: boolean;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Creative Building Blocks Set",
    price: 2499,
    originalPrice: 3499,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
    rating: 4.5,
    reviews: 128,
    category: "bestSeller",
    description: "Premium building blocks set with 200+ pieces for endless creativity",
    discount: 29,
    isBestSeller: true
  },
  {
    id: "2",
    name: "Colorful Animal Blocks",
    price: 1899,
    image: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=400&h=400&fit=crop",
    rating: 4.8,
    reviews: 95,
    category: "animals",
    description: "Educational animal-themed building blocks for young learners",
    isNew: true
  },
  {
    id: "3",
    name: "Architecture Master Set",
    price: 3999,
    originalPrice: 5999,
    image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=400&fit=crop",
    rating: 4.7,
    reviews: 67,
    category: "buildings",
    description: "Build famous landmarks and architectural marvels",
    discount: 33,
    isBestSeller: true
  },
  {
    id: "4",
    name: "Rainbow Bridge Builder",
    price: 1599,
    image: "https://images.unsplash.com/photo-1572375992501-4b0892d50c69?w=400&h=400&fit=crop",
    rating: 4.3,
    reviews: 89,
    category: "bridges",
    description: "Colorful blocks to create amazing bridge structures",
    isNew: true
  },
  {
    id: "5",
    name: "Castle & Fort Kit",
    price: 2899,
    originalPrice: 3899,
    image: "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=400&h=400&fit=crop",
    rating: 4.6,
    reviews: 156,
    category: "forts",
    description: "Medieval castle and fort building experience",
    discount: 26
  },
  {
    id: "6",
    name: "Cartoon Character Set",
    price: 2199,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop",
    rating: 4.4,
    reviews: 203,
    category: "cartoons",
    description: "Build your favorite cartoon characters with these special blocks"
  },
  {
    id: "7",
    name: "Space Explorer Kit",
    price: 3299,
    originalPrice: 4299,
    image: "https://images.unsplash.com/photo-1516389573391-5620a0263801?w=400&h=400&fit=crop",
    rating: 4.9,
    reviews: 78,
    category: "bestSeller",
    description: "Explore the cosmos with rockets and space station builds",
    discount: 23,
    isBestSeller: true
  },
  {
    id: "8",
    name: "Vehicle Builder Pro",
    price: 1799,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
    rating: 4.2,
    reviews: 112,
    category: "vehicles",
    description: "Create cars, trucks, and construction vehicles"
  },
  {
    id: "9",
    name: "Garden & Nature Set",
    price: 1399,
    originalPrice: 1899,
    image: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=400&h=400&fit=crop",
    rating: 4.5,
    reviews: 134,
    category: "nature",
    description: "Build beautiful gardens, trees, and natural landscapes",
    discount: 26
  },
  {
    id: "10",
    name: "Superhero Headquarters",
    price: 2799,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop",
    rating: 4.7,
    reviews: 91,
    category: "cartoons",
    description: "Create epic superhero bases and battle scenes",
    isNew: true,
    isBestSeller: true
  }
];

export const categories = [
  { id: "bestSeller", name: "Best Sellers", count: 3 },
  { id: "animals", name: "Animals", count: 2 },
  { id: "buildings", name: "Buildings", count: 1 },
  { id: "bridges", name: "Bridges", count: 1 },
  { id: "forts", name: "Forts", count: 1 },
  { id: "cartoons", name: "Cartoons", count: 2 },
  { id: "vehicles", name: "Vehicles", count: 1 },
  { id: "nature", name: "Nature", count: 1 }
];