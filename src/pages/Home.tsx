import { HeroSection } from "@/components/HeroSection";
import { CategoryCard } from "@/components/CategoryCard";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/data/products";
import featuredImage from "@/assets/featured-toys.jpg";
import saleImage from "@/assets/sale-toys.jpg";
import designImage from "@/assets/design-blocks.jpg";

export const Home = () => {
  const bestSellerProducts = products.filter(product => product.isBestSeller).slice(0, 4);

  return (
    <div className="min-h-screen">
      <HeroSection />
      
      {/* Categories Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">
              Explore Our 
              <span className="bg-gradient-to-r from-primary to-blue bg-clip-text text-transparent"> Collections</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover handpicked toys that inspire creativity, learning, and endless fun for all ages
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <CategoryCard
              title="Featured"
              description="Discover our handpicked featured toys that bring creativity and fun to playtime!"
              image={featuredImage}
              href="/products?category=featured"
              variant="feature"
            />
            <CategoryCard
              title="On Sale"
              description="Grab exciting deals on top toys – limited time only, don't miss out!"
              image={saleImage}
              href="/products?category=sale"
              variant="sale"
            />
            <CategoryCard
              title="Design Studio"
              description="Let your imagination run wild – build, create, and innovate with our design sets."
              image={designImage}
              href="/designer"
              variant="design"
            />
          </div>
        </div>
      </section>

      {/* Best Sellers Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Best 
              <span className="bg-gradient-to-r from-orange to-green bg-clip-text text-transparent"> Sellers</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Explore our most-loved toys that kids and parents can't stop talking about
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestSellerProducts.map((product, index) => (
              <div key={product.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <ProductCard {...product} />
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <a
              href="/products?category=bestSeller"
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-semibold text-lg transition-colors"
            >
              View All Best Sellers
              <span className="text-2xl">→</span>
            </a>
          </div>
        </div>
      </section>

      {/* Custom Blocks CTA */}
      <section className="py-20 hero-gradient">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Custom Your Blocks
            </h2>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Make it yours! Personalize your toy blocks for a truly one-of-a-kind creation. 
              Our design studio lets you customize colors, shapes, and patterns.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/designer" className="inline-block">
                <button className="bg-white text-primary px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/90 transition-colors hover-bounce">
                  Start Designing
                </button>
              </a>
              <a href="/products" className="inline-block">
                <button className="bg-white/20 text-white px-8 py-4 rounded-lg font-semibold text-lg border border-white/30 hover:bg-white/30 transition-colors backdrop-blur-sm">
                  Browse Products
                </button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};