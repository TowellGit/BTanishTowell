import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Gallery } from "@shared/schema";

interface GalleryCardProps {
  gallery: Gallery;
  index: number;
}

export default function GalleryCard({ gallery, index }: GalleryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="bg-white rounded-2xl overflow-hidden luxury-shadow hover-scale group h-full">
        <div className="aspect-[4/3] overflow-hidden relative">
          <img
            src={gallery.image || "/placeholder-gallery.jpg"}
            alt={gallery.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <Badge className="absolute top-4 left-4 bg-gold text-white">
            {gallery.category}
          </Badge>
        </div>
        <CardContent className="p-6">
          <h3 className="font-serif text-lg font-semibold text-charcoal mb-2">
            {gallery.title}
          </h3>
          <p className="text-warm-gray mb-4 text-sm">
            "{gallery.description}" - {gallery.clientName}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="flex text-gold">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="ml-2 text-warm-gray text-sm">
                {gallery.rating}
              </span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="text-gold hover:text-bronze transition-colors duration-300"
            >
              <ExternalLink className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
