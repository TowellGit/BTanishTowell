import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import ServiceCard from "@/components/ServiceCard";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Scissors, Sparkles, Heart, HandMetal } from "lucide-react";
import type { Service } from "@shared/schema";

const serviceCategories = [
  {
    id: "hair",
    name: "Hair Care",
    icon: Scissors,
    description: "Professional styling and treatments",
    color: "bg-gold",
  },
  {
    id: "spa",
    name: "Spa Treatments",
    icon: Sparkles,
    description: "Rejuvenating wellness experiences",
    color: "bg-rose",
  },
  {
    id: "bridal",
    name: "Bridal Services",
    icon: Heart,
    description: "Complete wedding packages",
    color: "bg-dusty-rose",
  },
  {
    id: "nails",
    name: "Nail Care",
    icon: HandMetal,
    description: "Artistic nail designs",
    color: "bg-charcoal",
  },
];

export default function Services() {
  const { data: services = [], isLoading } = useQuery<Service[]>({
    queryKey: ["/api/services"],
  });

  const groupedServices = services.reduce((acc, service) => {
    const category = service.category.toLowerCase();
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(service);
    return acc;
  }, {} as Record<string, Service[]>);

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
              Premium <span className="text-gradient">Services</span>
            </h1>
            <p className="text-xl text-warm-gray leading-relaxed">
              Discover our comprehensive range of luxury beauty services, each meticulously 
              crafted to enhance your natural beauty and provide an unforgettable experience.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Service Categories */}
      <section className="py-16 bg-ivory">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {serviceCategories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="text-center p-6 bg-white hover-scale cursor-pointer">
                  <div className={`w-16 h-16 ${category.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <category.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-serif text-lg font-semibold text-charcoal mb-2">
                    {category.name}
                  </h3>
                  <p className="text-warm-gray text-sm">{category.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services by Category */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <Card key={i} className="h-96">
                  <Skeleton className="aspect-square" />
                  <CardContent className="p-6">
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-full mb-4" />
                    <Skeleton className="h-4 w-1/2" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            Object.entries(groupedServices).map(([categoryKey, categoryServices], categoryIndex) => {
              const category = serviceCategories.find(cat => 
                categoryKey.includes(cat.id) || cat.name.toLowerCase().includes(categoryKey)
              );
              
              return (
                <motion.div
                  key={categoryKey}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: categoryIndex * 0.2 }}
                  className="mb-16"
                >
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center">
                      {category && (
                        <div className={`w-12 h-12 ${category.color} rounded-full flex items-center justify-center mr-4`}>
                          <category.icon className="w-6 h-6 text-white" />
                        </div>
                      )}
                      <div>
                        <h2 className="font-serif text-3xl font-bold text-charcoal capitalize">
                          {categoryKey} Services
                        </h2>
                        <p className="text-warm-gray">
                          {category?.description || "Professional services"}
                        </p>
                      </div>
                    </div>
                    <Badge variant="secondary" className="bg-gold text-white">
                      {categoryServices.length} Service{categoryServices.length !== 1 ? 's' : ''}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {categoryServices.map((service, index) => (
                      <ServiceCard
                        key={service.id}
                        service={service}
                        index={index}
                      />
                    ))}
                  </div>
                </motion.div>
              );
            })
          )}
        </div>
      </section>

      {/* Service Packages */}
      <section className="py-20 bg-pearl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-serif text-4xl font-bold text-charcoal mb-6">
              Special <span className="text-gradient">Packages</span>
            </h2>
            <p className="text-xl text-warm-gray max-w-3xl mx-auto leading-relaxed">
              Save more with our carefully curated service packages designed for complete transformation.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Bridal Package */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <Card className="bg-white hover-scale h-full">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"
                    alt="Bridal Package"
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <Badge className="bg-rose text-white mb-3">Bridal Special</Badge>
                  <h3 className="font-serif text-xl font-semibold text-charcoal mb-3">
                    Complete Bridal Package
                  </h3>
                  <p className="text-warm-gray mb-4">
                    Full bridal makeup, hair styling, pre-wedding treatments, and trial sessions.
                  </p>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-2xl font-bold text-charcoal">₹25,000</span>
                      <span className="text-warm-gray line-through ml-2">₹35,000</span>
                    </div>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      Save 29%
                    </Badge>
                  </div>
                  <ul className="text-sm text-warm-gray space-y-1 mb-6">
                    <li>• Bridal makeup & hair styling</li>
                    <li>• Pre-wedding skincare treatment</li>
                    <li>• Trial session included</li>
                    <li>• Touch-up kit provided</li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            {/* Luxury Spa Package */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Card className="bg-white hover-scale h-full">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"
                    alt="Spa Package"
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <Badge className="bg-dusty-rose text-white mb-3">Spa Retreat</Badge>
                  <h3 className="font-serif text-xl font-semibold text-charcoal mb-3">
                    Ultimate Spa Experience
                  </h3>
                  <p className="text-warm-gray mb-4">
                    Full body massage, facial treatment, aromatherapy, and wellness consultation.
                  </p>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-2xl font-bold text-charcoal">₹8,500</span>
                      <span className="text-warm-gray line-through ml-2">₹12,000</span>
                    </div>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      Save 29%
                    </Badge>
                  </div>
                  <ul className="text-sm text-warm-gray space-y-1 mb-6">
                    <li>• 90-minute full body massage</li>
                    <li>• Deep cleansing facial</li>
                    <li>• Aromatherapy session</li>
                    <li>• Wellness consultation</li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            {/* Hair & Makeup Combo */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <Card className="bg-white hover-scale h-full">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1562322140-8baeececf3df?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"
                    alt="Hair & Makeup Package"
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <Badge className="bg-gold text-white mb-3">Popular Choice</Badge>
                  <h3 className="font-serif text-xl font-semibold text-charcoal mb-3">
                    Hair & Makeup Combo
                  </h3>
                  <p className="text-warm-gray mb-4">
                    Professional hair styling, makeup application, and nail art for special occasions.
                  </p>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-2xl font-bold text-charcoal">₹4,500</span>
                      <span className="text-warm-gray line-through ml-2">₹6,000</span>
                    </div>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      Save 25%
                    </Badge>
                  </div>
                  <ul className="text-sm text-warm-gray space-y-1 mb-6">
                    <li>• Professional hair styling</li>
                    <li>• Makeup application</li>
                    <li>• Nail art & polish</li>
                    <li>• Photos for social media</li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
