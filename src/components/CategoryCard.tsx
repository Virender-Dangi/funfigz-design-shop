import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CategoryCardProps {
  title: string;
  description: string;
  image: string;
  href: string;
  variant?: "feature" | "sale" | "design" | "bestseller";
}

export const CategoryCard = ({ 
  title, 
  description, 
  image, 
  href, 
  variant = "feature" 
}: CategoryCardProps) => {
  const getVariantStyles = () => {
    switch (variant) {
      case "sale":
        return "from-orange/10 to-orange/5 border-orange/20";
      case "design":
        return "from-green/10 to-green/5 border-green/20";
      case "bestseller":
        return "from-blue/10 to-blue/5 border-blue/20";
      default:
        return "from-primary/10 to-primary/5 border-primary/20";
    }
  };

  const getButtonVariant = () => {
    switch (variant) {
      case "sale":
        return "orange";
      case "design":
        return "green";
      case "bestseller":
        return "blue";
      default:
        return "default";
    }
  };

  return (
    <div className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${getVariantStyles()} border-2 hover-lift product-card`}>
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
      </div>
      
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
              {title}
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              {description}
            </p>
          </div>
        </div>

        <Link to={href} className="block">
          <Button 
            variant={getButtonVariant()} 
            className="w-full group/btn"
          >
            Explore {title}
            <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
          </Button>
        </Link>
      </div>

      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-background/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  );
};