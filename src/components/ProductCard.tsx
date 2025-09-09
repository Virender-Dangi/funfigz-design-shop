import { useState } from "react";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  discount?: number;
  isNew?: boolean;
}

export const ProductCard = ({
  id,
  name,
  price,
  originalPrice,
  image,
  rating,
  reviews,
  discount,
  isNew
}: ProductCardProps) => {
  const [isFavorited, setIsFavorited] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleAddToCart = async () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Added to Cart!",
        description: `${name} has been added to your cart.`,
      });
    }, 500);
  };

  const handleToggleFavorite = () => {
    setIsFavorited(!isFavorited);
    toast({
      title: isFavorited ? "Removed from Favorites" : "Added to Favorites",
      description: `${name} ${isFavorited ? "removed from" : "added to"} your favorites.`,
    });
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating)
            ? "text-orange fill-orange"
            : "text-muted-foreground"
        }`}
      />
    ));
  };

  return (
    <div className="group relative bg-card rounded-2xl overflow-hidden product-card">
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-muted/30">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {isNew && (
            <Badge className="bg-green text-green-foreground">New</Badge>
          )}
          {discount && (
            <Badge className="bg-orange text-orange-foreground">
              {discount}% OFF
            </Badge>
          )}
        </div>

        {/* Favorite Button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm hover:bg-background"
          onClick={handleToggleFavorite}
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isFavorited ? "text-red-500 fill-red-500" : "text-muted-foreground"
            }`}
          />
        </Button>

        {/* Quick Add to Cart Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <Button
            variant="hero"
            onClick={handleAddToCart}
            disabled={isLoading}
            className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
          >
            <ShoppingCart className="w-4 h-4" />
            {isLoading ? "Adding..." : "Quick Add"}
          </Button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1">
            {renderStars(rating)}
          </div>
          <span className="text-sm text-muted-foreground">
            {rating} ({reviews})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-foreground">
              ₹{price.toLocaleString()}
            </span>
            {originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                ₹{originalPrice.toLocaleString()}
              </span>
            )}
          </div>
          
          <Button
            variant="outline"
            size="icon"
            onClick={handleAddToCart}
            disabled={isLoading}
            className="hover:bg-primary hover:text-primary-foreground"
          >
            <ShoppingCart className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};