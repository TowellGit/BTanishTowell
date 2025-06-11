import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Star } from "lucide-react";
import type { Product } from "@shared/schema";

interface ProductCardProps {
  product: Product;
  index: number;
}

export default function ProductCard({ product, index }: ProductCardProps) {
  const discount = product.originalPrice 
    ? Math.round(((parseFloat(product.originalPrice) - parseFloat(product.price)) / parseFloat(product.originalPrice)) * 100)
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="bg-white rounded-2xl overflow-hidden luxury-shadow hover-scale group cursor-pointer h-full">
        <div className="aspect-square overflow-hidden relative">
          <img
            src={product.image || "/placeholder-product.jpg"}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          {discount > 0 && (
            <Badge className="absolute top-4 right-4 bg-gold text-white">
              -{discount}%
            </Badge>
          )}
          {product.isNew && (
            <Badge className="absolute top-4 left-4 bg-rose text-white">
              New
            </Badge>
          )}
          {product.isBestSeller && (
            <Badge className="absolute top-4 left-4 bg-dusty-rose text-white">
              Best Seller
            </Badge>
          )}
        </div>
        <CardContent className="p-6">
          <h3 className="font-serif text-lg font-semibold text-charcoal mb-2">
            {product.name}
          </h3>
          <p className="text-warm-gray text-sm mb-3">
            {product.description}
          </p>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <span className="text-charcoal font-bold text-lg">
                ₹{product.price}
              </span>
              {product.originalPrice && (
                <span className="text-warm-gray line-through text-sm">
                  ₹{product.originalPrice}
                </span>
              )}
            </div>
            <div className="flex text-gold text-sm items-center">
              <Star className="w-4 h-4 fill-current" />
              <span className="ml-1">{product.rating}</span>
            </div>
          </div>
          <Button
            className="w-full luxury-gradient text-white hover:opacity-90 transition-opacity duration-300 font-semibold text-sm"
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Add to Cart
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
