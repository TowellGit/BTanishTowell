import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar } from "lucide-react";
import { Link } from "wouter";
import type { Service } from "@shared/schema";

interface ServiceCardProps {
  service: Service;
  index: number;
}

export default function ServiceCard({ service, index }: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="bg-white rounded-2xl overflow-hidden luxury-shadow hover-scale group cursor-pointer h-full">
        <div className="aspect-square overflow-hidden">
          <img
            src={service.image || "/placeholder-service.jpg"}
            alt={service.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </div>
        <CardContent className="p-6">
          <h3 className="font-serif text-xl font-semibold text-charcoal mb-2">
            {service.name}
          </h3>
          <p className="text-warm-gray mb-4 text-sm">
            {service.description}
          </p>
          <div className="flex justify-between items-center mb-4">
            <span className="text-gold font-semibold text-lg">
              From ₹{service.price}
            </span>
            <span className="text-warm-gray text-sm">
              {service.duration} mins
            </span>
          </div>
          <div className="flex gap-2">
            <Link href="/booking" className="flex-1">
              <Button
                size="sm"
                className="w-full luxury-gradient text-white hover:opacity-90 transition-opacity duration-300"
              >
                <Calendar className="w-4 h-4 mr-2" />
                Book Now
              </Button>
            </Link>
            <Button
              variant="outline"
              size="sm"
              className="border-gold text-gold hover:bg-gold hover:text-white"
            >
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
