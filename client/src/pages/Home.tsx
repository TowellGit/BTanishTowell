import { motion } from "framer-motion";
import Hero from "@/components/Hero";
import ServiceCard from "@/components/ServiceCard";
import GalleryCard from "@/components/GalleryCard";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { ArrowRight, Star, Crown, Gem, CheckCircle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import type { Service, Gallery, Product, Membership } from "@shared/schema";

export default function Home() {
  const { data: services = [], isLoading: servicesLoading } = useQuery<Service[]>({
    queryKey: ["/api/services"],
  });

  const { data: gallery = [], isLoading: galleryLoading } = useQuery<Gallery[]>({
    queryKey: ["/api/gallery"],
  });

  const { data: products = [], isLoading: productsLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const { data: memberships = [], isLoading: membershipsLoading } = useQuery<Membership[]>({
    queryKey: ["/api/memberships"],
  });

  return (
    <div className="bg-ivory">
      {/* Hero Section */}
      <Hero />

      {/* Services Section */}
      <section className="py-20 lg:py-32 bg-pearl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-charcoal mb-6">
              Signature <span className="text-gradient">Services</span>
            </h2>
            <p className="text-xl text-warm-gray max-w-3xl mx-auto leading-relaxed">
              Indulge in our curated collection of premium beauty services, each designed to 
              elevate your natural radiance and provide an unforgettable luxury experience.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {servicesLoading
              ? Array.from({ length: 4 }).map((_, i) => (
                  <Card key={i} className="h-96">
                    <Skeleton className="aspect-square" />
                    <CardContent className="p-6">
                      <Skeleton className="h-6 w-3/4 mb-2" />
                      <Skeleton className="h-4 w-full mb-4" />
                      <Skeleton className="h-4 w-1/2" />
                    </CardContent>
                  </Card>
                ))
              : services.slice(0, 4).map((service, index) => (
                  <ServiceCard key={service.id} service={service} index={index} />
                ))}
          </div>

          <div className="text-center">
            <Link href="/services">
              <Button className="luxury-gradient text-white hover:opacity-90 px-8 py-3">
                View All Services
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Membership Section */}
      <section className="py-20 lg:py-32 bg-ivory">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-charcoal mb-6">
              Exclusive <span className="text-gradient">Membership</span>
            </h2>
            <p className="text-xl text-warm-gray max-w-3xl mx-auto leading-relaxed">
              Join our premium membership program and enjoy exclusive benefits, priority booking, 
              and special discounts on all services.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {membershipsLoading
              ? Array.from({ length: 3 }).map((_, i) => (
                  <Card key={i} className="h-96">
                    <CardContent className="p-8">
                      <Skeleton className="h-16 w-16 rounded-full mx-auto mb-4" />
                      <Skeleton className="h-6 w-1/2 mx-auto mb-4" />
                      <Skeleton className="h-8 w-3/4 mx-auto mb-6" />
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                      </div>
                    </CardContent>
                  </Card>
                ))
              : memberships.map((membership, index) => (
                  <motion.div
                    key={membership.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card
                      className={`text-center p-6 hover-scale relative ${
                        membership.isPopular
                          ? "luxury-gradient text-white"
                          : index === 0
                          ? "border-dusty-rose"
                          : "bg-charcoal text-white"
                      }`}
                    >
                      {membership.isPopular && (
                        <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-bronze text-white">
                          Most Popular
                        </Badge>
                      )}
                      <div
                        className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                          membership.isPopular
                            ? "bg-white bg-opacity-20"
                            : index === 0
                            ? "bg-dusty-rose"
                            : "bg-gold"
                        }`}
                      >
                        {index === 0 ? (
                          <Star className="w-6 h-6 text-white" />
                        ) : index === 1 ? (
                          <Crown className="w-6 h-6 text-white" />
                        ) : (
                          <Gem className="w-6 h-6 text-white" />
                        )}
                      </div>
                      <h4 className="font-serif text-xl font-semibold mb-2">
                        {membership.name}
                      </h4>
                      <p
                        className={`mb-4 ${
                          membership.isPopular
                            ? "text-white text-opacity-90"
                            : index === 0
                            ? "text-warm-gray"
                            : "text-gray-300"
                        }`}
                      >
                        {index === 0
                          ? "Perfect for occasional visits"
                          : index === 1
                          ? "For regular beauty enthusiasts"
                          : "Ultimate luxury experience"}
                      </p>
                      <div className="text-3xl font-bold mb-4">
                        ₹{membership.price}
                        <span
                          className={`text-sm font-normal ${
                            membership.isPopular
                              ? "text-white text-opacity-75"
                              : index === 0
                              ? "text-warm-gray"
                              : "text-gray-300"
                          }`}
                        >
                          /year
                        </span>
                      </div>
                      <ul className="text-left space-y-2 mb-6">
                        {(membership.benefits as string[]).map((benefit, i) => (
                          <li key={i} className="flex items-center">
                            <CheckCircle
                              className={`w-4 h-4 mr-2 ${
                                membership.isPopular
                                  ? "text-white"
                                  : index === 0
                                  ? "text-gold"
                                  : "text-gold"
                              }`}
                            />
                            <span className="text-sm">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                      <Button
                        className={`w-full ${
                          membership.isPopular
                            ? "bg-white text-gold hover:bg-opacity-90"
                            : index === 0
                            ? "border-2 border-dusty-rose text-dusty-rose hover:bg-dusty-rose hover:text-white"
                            : "luxury-gradient text-white hover:opacity-90"
                        } transition-all duration-300 font-semibold`}
                        variant={membership.isPopular || index === 2 ? "default" : "outline"}
                      >
                        Choose Plan
                      </Button>
                    </Card>
                  </motion.div>
                ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 lg:py-32 bg-pearl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-charcoal mb-6">
              Client <span className="text-gradient">Transformations</span>
            </h2>
            <p className="text-xl text-warm-gray max-w-3xl mx-auto leading-relaxed">
              Witness the artistry of our master stylists through stunning transformations 
              that showcase the magic of B Tanish Salon.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {galleryLoading
              ? Array.from({ length: 3 }).map((_, i) => (
                  <Card key={i} className="h-80">
                    <Skeleton className="aspect-[4/3]" />
                    <CardContent className="p-6">
                      <Skeleton className="h-5 w-3/4 mb-2" />
                      <Skeleton className="h-4 w-full mb-4" />
                      <Skeleton className="h-4 w-1/2" />
                    </CardContent>
                  </Card>
                ))
              : gallery.slice(0, 3).map((item, index) => (
                  <GalleryCard key={item.id} gallery={item} index={index} />
                ))}
          </div>

          <div className="text-center">
            <Link href="/gallery">
              <Button className="luxury-gradient text-white hover:opacity-90 px-8 py-3">
                View Full Gallery
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20 lg:py-32 bg-ivory">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-charcoal mb-6">
              Exclusive <span className="text-gradient">Products</span>
            </h2>
            <p className="text-xl text-warm-gray max-w-3xl mx-auto leading-relaxed">
              Take the luxury home with our curated collection of premium beauty products, 
              carefully selected by our expert stylists.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {productsLoading
              ? Array.from({ length: 4 }).map((_, i) => (
                  <Card key={i} className="h-96">
                    <Skeleton className="aspect-square" />
                    <CardContent className="p-6">
                      <Skeleton className="h-5 w-3/4 mb-2" />
                      <Skeleton className="h-4 w-full mb-4" />
                      <Skeleton className="h-4 w-1/2" />
                    </CardContent>
                  </Card>
                ))
              : products.slice(0, 4).map((product, index) => (
                  <ProductCard key={product.id} product={product} index={index} />
                ))}
          </div>

          <div className="text-center">
            <Link href="/products">
              <Button className="luxury-gradient text-white hover:opacity-90 px-8 py-3">
                Shop All Products
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32 bg-charcoal text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-serif text-4xl sm:text-5xl font-bold mb-6">
              Ready to Transform Your Look?
            </h2>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Book your appointment today and experience the luxury of B Tanish Salon. 
              Our master stylists are ready to create your perfect look.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/booking">
                <Button
                  size="lg"
                  className="luxury-gradient text-white hover:opacity-90 text-lg px-8 py-4"
                >
                  Book Your Appointment
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-white text-white hover:bg-white hover:text-charcoal text-lg px-8 py-4"
                >
                  Contact Us
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
