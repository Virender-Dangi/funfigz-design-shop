import { useState } from "react";
import { Search, ShoppingCart, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Link, useLocation } from "react-router-dom";

export const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount] = useState(3); // Mock cart count
  const location = useLocation();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/designer", label: "Designer" },
    { href: "/about", label: "About" },
  ];

  const isActiveLink = (href: string) => {
    return location.pathname === href;
  };

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 hover-bounce">
            <div className="w-8 h-8 hero-gradient rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">F</span>
            </div>
            <span className="font-bold text-xl bg-gradient-to-r from-primary to-blue bg-clip-text text-transparent">
              FunFigz
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`font-medium transition-colors hover:text-primary ${
                  isActiveLink(link.href) ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Search Bar */}
          <div className="hidden lg:flex items-center space-x-2 flex-1 max-w-sm mx-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search toys..."
                className="pl-10 bg-muted/50 border-0 focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>

          {/* Cart & Mobile Menu */}
          <div className="flex items-center space-x-4">
            <Link to="/cart" className="relative hover-bounce">
              <Button variant="ghost" size="icon">
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-primary text-primary-foreground w-5 h-5 flex items-center justify-center p-0 text-xs">
                    {cartCount}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border/50 bg-background/95 backdrop-blur-sm animate-fade-in">
            <div className="px-4 py-4 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`block font-medium transition-colors hover:text-primary ${
                    isActiveLink(link.href) ? "text-primary" : "text-muted-foreground"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="relative pt-2">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search toys..."
                  className="pl-10 bg-muted/50 border-0"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};