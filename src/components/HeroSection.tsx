import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-blocks.jpg";

export const HeroSection = () => {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Colorful toy blocks"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 hero-gradient opacity-80" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-slide-up">
            Build Your
            <span className="block bg-gradient-to-r from-orange to-green bg-clip-text text-transparent animate-bounce-in">
              Imagination
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed animate-fade-in">
            Discover endless possibilities with our premium toy blocks. Create, learn, and play with designs that spark creativity and bring joy to every moment.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up">
            <Link to="/products">
              <Button variant="hero" size="xl" className="group">
                Shop Now
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            
            <Link to="/designer">
              <Button variant="outline" size="xl" className="bg-white/20 text-white border-white/30 hover:bg-white/30 backdrop-blur-sm">
                <Play className="w-5 h-5" />
                Start Designing
              </Button>
            </Link>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-16 h-16 bg-orange/20 rounded-lg backdrop-blur-sm animate-float hidden lg:block" />
        <div className="absolute top-40 right-20 w-12 h-12 bg-green/20 rounded-lg backdrop-blur-sm animate-float hidden lg:block" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-32 left-20 w-20 h-20 bg-blue/20 rounded-lg backdrop-blur-sm animate-float hidden lg:block" style={{ animationDelay: '2s' }} />
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};