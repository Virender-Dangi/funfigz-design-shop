import { useState, useMemo } from "react";
import { Filter, Grid, List, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ProductCard } from "@/components/ProductCard";
import { products, categories } from "@/data/products";
import { Badge } from "@/components/ui/badge";
import { useSearchParams } from "react-router-dom";

export const Products = () => {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || '';
  
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [sortBy, setSortBy] = useState("name");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 });
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = useMemo(() => {
    let filtered = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === '' || product.category === selectedCategory;
      const matchesPrice = product.price >= priceRange.min && product.price <= priceRange.max;
      return matchesSearch && matchesCategory && matchesPrice;
    });

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        case "name":
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return filtered;
  }, [searchTerm, selectedCategory, priceRange, sortBy]);

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("");
    setPriceRange({ min: 0, max: 10000 });
    setSortBy("name");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-muted/30 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {selectedCategory ? 
              categories.find(cat => cat.id === selectedCategory)?.name || "Products" : 
              "All Products"
            }
          </h1>
          <p className="text-xl text-muted-foreground">
            Discover amazing toy blocks and building sets for endless creativity
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:w-80 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-card rounded-2xl p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold">Filters</h3>
                <Button variant="ghost" size="sm" onClick={clearFilters}>
                  Clear All
                </Button>
              </div>

              {/* Search */}
              <div className="mb-6">
                <label className="text-sm font-medium mb-2 block">Search</label>
                <Input
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Categories */}
              <div className="mb-6">
                <label className="text-sm font-medium mb-3 block">Categories</label>
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedCategory("")}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                      selectedCategory === "" ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                    }`}
                  >
                    All Categories
                  </button>
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center justify-between ${
                        selectedCategory === category.id ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                      }`}
                    >
                      <span>{category.name}</span>
                      <Badge variant="secondary" className="text-xs">
                        {category.count}
                      </Badge>
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <label className="text-sm font-medium mb-3 block">Price Range</label>
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    type="number"
                    placeholder="Min"
                    value={priceRange.min}
                    onChange={(e) => setPriceRange(prev => ({ ...prev, min: Number(e.target.value) }))}
                  />
                  <Input
                    type="number"
                    placeholder="Max"
                    value={priceRange.max}
                    onChange={(e) => setPriceRange(prev => ({ ...prev, max: Number(e.target.value) }))}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  Filters
                </Button>
                <p className="text-muted-foreground">
                  {filteredProducts.length} products found
                </p>
              </div>

              <div className="flex items-center gap-4">
                {/* Sort Dropdown */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 rounded-lg border border-input bg-background"
                >
                  <option value="name">Sort by Name</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>

                {/* View Mode Toggle */}
                <div className="flex border border-input rounded-lg">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Products Grid/List */}
            {filteredProducts.length > 0 ? (
              <div className={viewMode === "grid" ? "grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" : "space-y-4"}>
                {filteredProducts.map((product, index) => (
                  <div key={product.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.05}s` }}>
                    <ProductCard {...product} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Filter className="w-12 h-12 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">No products found</h3>
                <p className="text-muted-foreground mb-4">Try adjusting your filters or search terms</p>
                <Button onClick={clearFilters}>Clear Filters</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};