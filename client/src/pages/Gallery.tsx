import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import GalleryCard from "@/components/GalleryCard";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Play, Star } from "lucide-react";
import type { Gallery } from "@shared/schema";

export default function Gallery() {
  const { data: gallery = [], isLoading } = useQuery<Gallery[]>({
    queryKey: ["/api/gallery"],
  });

  const categories = [...new Set(gallery.map(item => item.category))];
  const allCategories = ["All", ...categories];

  const filterGalleryByCategory = (category: string) => {
    if (category === "All") return gallery;
    return gallery.filter(item => item.category === category);
  };

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
              Client <span className="text-gradient">Transformations</span>
            </h1>
            <p className="text-xl text-warm-gray leading-relaxed max-w-3xl mx-auto">
              Witness the artistry of our master stylists through stunning before and after 
              transformations that showcase the magic of B Tanish Salon.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Gallery Tabs */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="All" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 md:grid-cols-4 mb-12">
              {allCategories.slice(0, 4).map((category) => (
                <TabsTrigger
                  key={category}
                  value={category}
                  className="data-[state=active]:bg-gold data-[state=active]:text-white"
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>

            {allCategories.map((category) => (
              <TabsContent key={category} value={category}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {isLoading
                    ? Array.from({ length: 6 }).map((_, i) => (
                        <Card key={i} className="h-80">
                          <Skeleton className="aspect-[4/3]" />
                          <CardContent className="p-6">
                            <Skeleton className="h-5 w-3/4 mb-2" />
                            <Skeleton className="h-4 w-full mb-4" />
                            <Skeleton className="h-4 w-1/2" />
                          </CardContent>
                        </Card>
                      ))
                    : filterGalleryByCategory(category).map((item, index) => (
                        <GalleryCard key={item.id} gallery={item} index={index} />
                      ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Video Testimonials Section */}
      <section className="py-20 bg-pearl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-serif text-4xl font-bold text-charcoal mb-6">
              Client <span className="text-gradient">Stories</span>
            </h2>
            <p className="text-xl text-warm-gray max-w-3xl mx-auto leading-relaxed">
              Hear directly from our valued clients about their luxury experience at B Tanish Salon.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <Card className="bg-white rounded-2xl p-8 hover-scale">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center mr-4">
                    <Play className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-serif text-lg font-semibold text-charcoal">Aisha Patel</h4>
                    <Badge className="bg-gold text-white text-xs">Gold Member</Badge>
                  </div>
                </div>
                <p className="text-charcoal italic mb-4 text-lg">
                  "The attention to detail and personalized service at B Tanish is unmatched. 
                  Every visit feels like a luxurious escape from the everyday."
                </p>
                <div className="flex text-gold">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Card className="bg-white rounded-2xl p-8 hover-scale">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center mr-4">
                    <Play className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-serif text-lg font-semibold text-charcoal">Riya Sharma</h4>
                    <Badge className="bg-charcoal text-white text-xs">Platinum Member</Badge>
                  </div>
                </div>
                <p className="text-charcoal italic mb-4 text-lg">
                  "From the moment I walk in, I'm treated like royalty. The results speak for 
                  themselves - absolutely stunning transformations every time!"
                </p>
                <div className="flex text-gold">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-ivory">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-gold mb-2">500+</div>
              <div className="text-warm-gray">Happy Clients</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-gold mb-2">15+</div>
              <div className="text-warm-gray">Expert Stylists</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-gold mb-2">5</div>
              <div className="text-warm-gray">Years Experience</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-gold mb-2">4.9</div>
              <div className="text-warm-gray">Average Rating</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-charcoal text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-serif text-4xl font-bold mb-6">
              Ready for Your Transformation?
            </h2>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Join hundreds of satisfied clients and experience the B Tanish difference. 
              Book your appointment today and let us create your perfect look.
            </p>
            <Button
              size="lg"
              className="luxury-gradient text-white hover:opacity-90 text-lg px-8 py-4"
            >
              Book Your Appointment
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
