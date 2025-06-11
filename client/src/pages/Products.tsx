import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "@/components/ProductCard";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Gift, Scissors, Sparkles, Palette, HandMetal } from "lucide-react";
import type { Product } from "@shared/schema";

const productCategories = [
  { id: "all", name: "All Products", icon: Filter },
  { id: "hair", name: "Hair Care", icon: Scissors },
  { id: "skincare", name: "Skincare", icon: Sparkles },
  { id: "makeup", name: "Makeup", icon: Palette },
  { id: "nail", name: "Nail Care", icon: HandMetal },
];

export default function Products() {
  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const categories = [...new Set(products.map(product => product.category))];
  const allCategories = ["All", ...categories];

  const filterProductsByCategory = (category: string) => {
    if (category === "All") return products;
    return products.filter(product => 
      product.category.toLowerCase().includes(category.toLowerCase())
    );
  };

  const bestSellers = products.filter(product => product.isBestSeller);
  const newProducts = products.filter(product => product.isNew);

  return (
    <div className="bg-ivory pt-24">
      {/* Header */}
      <section className="py-20 bg-pearl">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-serif text-5xl sm:text-6xl font-bold text-charcoal mb-6">
              Exclusive <span className="text-gradient">Products</span>
            </h1>
            <p className="text-xl text-warm-gray leading-relaxed max-w-3xl mx-auto">
              Take the luxury home with our curated collection of premium beauty products, 
              carefully selected by our expert stylists for professional results.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8 bg-ivory">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-warm-gray w-4 h-4" />
                <Input
                  placeholder="Search products..."
                  className="pl-10 focus:border-gold focus:ring-gold"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <Select>
                <SelectTrigger className="w-[180px] focus:border-gold focus:ring-gold">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="newest">Newest First</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-8 bg-ivory">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            {productCategories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="text-center p-4 bg-white hover-scale cursor-pointer">
                  <div className="w-12 h-12 luxury-gradient rounded-full flex items-center justify-center mx-auto mb-3">
                    <category.icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-serif text-sm font-semibold text-charcoal">
                    {category.name}
                  </h3>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Collections */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="All" className="w-full">
            <TabsList className="grid w-full max-w-lg mx-auto grid-cols-3 mb-12">
              <TabsTrigger
                value="All"
                className="data-[state=active]:bg-gold data-[state=active]:text-white"
              >
                All Products
              </TabsTrigger>
              <TabsTrigger
                value="bestsellers"
                className="data-[state=active]:bg-gold data-[state=active]:text-white"
              >
                Best Sellers
              </TabsTrigger>
              <TabsTrigger
                value="new"
                className="data-[state=active]:bg-gold data-[state=active]:text-white"
              >
                New Arrivals
              </TabsTrigger>
            </TabsList>

            <TabsContent value="All">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {isLoading
                  ? Array.from({ length: 8 }).map((_, i) => (
                      <Card key={i} className="h-96">
                        <Skeleton className="aspect-square" />
                        <CardContent className="p-6">
                          <Skeleton className="h-5 w-3/4 mb-2" />
                          <Skeleton className="h-4 w-full mb-4" />
                          <Skeleton className="h-4 w-1/2" />
                        </CardContent>
                      </Card>
                    ))
                  : products.map((product, index) => (
                      <ProductCard key={product.id} product={product} index={index} />
                    ))}
              </div>
            </TabsContent>

            <TabsContent value="bestsellers">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {bestSellers.map((product, index) => (
                  <ProductCard key={product.id} product={product} index={index} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="new">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {newProducts.map((product, index) => (
                  <ProductCard key={product.id} product={product} index={index} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Monthly Beauty Box */}
      <section className="py-20 bg-pearl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-serif text-4xl font-bold text-charcoal mb-6">
              Monthly <span className="text-gradient">Beauty Box</span>
            </h2>
            <p className="text-xl text-warm-gray max-w-3xl mx-auto leading-relaxed">
              Receive curated luxury beauty products delivered to your doorstep every month. 
              Each box contains 4-6 premium items worth over ₹5,000.
            </p>
          </motion.div>

          <Card className="bg-white rounded-3xl overflow-hidden luxury-shadow max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="p-8 lg:p-12">
                <Badge className="bg-gold text-white mb-4">
                  <Gift className="w-4 h-4 mr-2" />
                  Monthly Subscription
                </Badge>
                <h3 className="font-serif text-3xl font-bold text-charcoal mb-4">
                  Luxury Beauty Box
                </h3>
                <p className="text-lg text-warm-gray mb-6">
                  Curated selection of premium products including skincare, haircare, makeup, 
                  and exclusive salon items. Perfect for discovering new favorites.
                </p>
                <div className="flex items-center space-x-6 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-charcoal">₹2,499</div>
                    <div className="text-sm text-warm-gray">per month</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gold">₹5,000+</div>
                    <div className="text-sm text-warm-gray">value inside</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-charcoal">4-6</div>
                    <div className="text-sm text-warm-gray">products</div>
                  </div>
                </div>
                <ul className="space-y-2 mb-8 text-warm-gray">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-gold rounded-full mr-3"></div>
                    Premium skincare essentials
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-gold rounded-full mr-3"></div>
                    Professional haircare products
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-gold rounded-full mr-3"></div>
                    Exclusive makeup items
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-gold rounded-full mr-3"></div>
                    Free shipping & easy cancellation
                  </li>
                </ul>
                <Button className="luxury-gradient text-white hover:opacity-90 text-lg px-8 py-3">
                  <Gift className="w-5 h-5 mr-2" />
                  Subscribe Now
                </Button>
              </div>
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=500"
                  alt="Monthly Beauty Box"
                  className="w-full h-full object-cover lg:rounded-r-3xl"
                />
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-ivory">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <Gift className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-charcoal mb-3">
                Free Shipping
              </h3>
              <p className="text-warm-gray">
                Complimentary shipping on all orders above ₹2,000 across India
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-rose rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-charcoal mb-3">
                Expert Curated
              </h3>
              <p className="text-warm-gray">
                Every product personally selected and tested by our professional stylists
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-charcoal rounded-full flex items-center justify-center mx-auto mb-4">
                <HandMetal className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-charcoal mb-3">
                Satisfaction Guarantee
              </h3>
              <p className="text-warm-gray">
                30-day money-back guarantee if you're not completely satisfied
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
