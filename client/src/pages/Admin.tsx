import { useState } from "react";
import { motion } from "framer-motion";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Calendar, 
  Users, 
  ShoppingBag, 
  Settings, 
  Edit, 
  Trash2, 
  Plus,
  Eye,
  CheckCircle,
  XCircle,
  BarChart3
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import type { Booking, Service, Product, Stylist } from "@shared/schema";

export default function Admin() {
  const [activeTab, setActiveTab] = useState("overview");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: bookings = [], isLoading: bookingsLoading } = useQuery<Booking[]>({
    queryKey: ["/api/bookings"],
  });

  const { data: services = [], isLoading: servicesLoading } = useQuery<Service[]>({
    queryKey: ["/api/services"],
  });

  const { data: products = [], isLoading: productsLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const { data: stylists = [], isLoading: stylistsLoading } = useQuery<Stylist[]>({
    queryKey: ["/api/stylists"],
  });

  const updateBookingMutation = useMutation({
    mutationFn: async ({ id, status }: { id: number; status: string }) => {
      return await apiRequest("PATCH", `/api/bookings/${id}`, { status });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/bookings"] });
      toast({
        title: "Booking Updated",
        description: "Booking status has been updated successfully.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Update Failed",
        description: error.message || "Failed to update booking status.",
        variant: "destructive",
      });
    },
  });

  const pendingBookings = bookings.filter(booking => booking.status === "pending");
  const confirmedBookings = bookings.filter(booking => booking.status === "confirmed");
  const completedBookings = bookings.filter(booking => booking.status === "completed");

  const totalRevenue = completedBookings.reduce((sum, booking) => {
    const service = services.find(s => s.id === booking.serviceId);
    return sum + (service ? parseFloat(service.price) : 0);
  }, 0);

  const handleBookingStatusUpdate = (bookingId: number, newStatus: string) => {
    updateBookingMutation.mutate({ id: bookingId, status: newStatus });
  };

  return (
    <div className="bg-ivory pt-24 min-h-screen">
      {/* Header */}
      <section className="py-12 bg-pearl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-serif text-4xl font-bold text-charcoal mb-4">
              Admin <span className="text-gradient">Dashboard</span>
            </h1>
            <p className="text-lg text-warm-gray">
              Manage your salon operations, bookings, and business insights
            </p>
          </motion.div>
        </div>
      </section>

      {/* Dashboard Content */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="overview" className="data-[state=active]:bg-gold data-[state=active]:text-white">
                <BarChart3 className="w-4 h-4 mr-2" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="bookings" className="data-[state=active]:bg-gold data-[state=active]:text-white">
                <Calendar className="w-4 h-4 mr-2" />
                Bookings
              </TabsTrigger>
              <TabsTrigger value="services" className="data-[state=active]:bg-gold data-[state=active]:text-white">
                <Settings className="w-4 h-4 mr-2" />
                Services
              </TabsTrigger>
              <TabsTrigger value="products" className="data-[state=active]:bg-gold data-[state=active]:text-white">
                <ShoppingBag className="w-4 h-4 mr-2" />
                Products
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-8">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="bg-white">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-warm-gray text-sm">Total Bookings</p>
                        <p className="text-2xl font-bold text-charcoal">{bookings.length}</p>
                      </div>
                      <Calendar className="w-8 h-8 text-gold" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-warm-gray text-sm">Pending Bookings</p>
                        <p className="text-2xl font-bold text-charcoal">{pendingBookings.length}</p>
                      </div>
                      <Users className="w-8 h-8 text-rose" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-warm-gray text-sm">Total Revenue</p>
                        <p className="text-2xl font-bold text-charcoal">₹{totalRevenue.toLocaleString()}</p>
                      </div>
                      <BarChart3 className="w-8 h-8 text-green-500" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-warm-gray text-sm">Active Services</p>
                        <p className="text-2xl font-bold text-charcoal">{services.length}</p>
                      </div>
                      <Settings className="w-8 h-8 text-charcoal" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Bookings */}
              <Card className="bg-white">
                <CardHeader>
                  <CardTitle className="font-serif">Recent Bookings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {bookings.slice(0, 5).map((booking) => {
                      const service = services.find(s => s.id === booking.serviceId);
                      const stylist = stylists.find(s => s.id === booking.stylistId);
                      
                      return (
                        <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                            <p className="font-semibold text-charcoal">{booking.clientName}</p>
                            <p className="text-warm-gray text-sm">
                              {service?.name} • {stylist?.name || "Any Stylist"}
                            </p>
                            <p className="text-warm-gray text-sm">
                              {new Date(booking.appointmentDate).toLocaleDateString()} at {booking.appointmentTime}
                            </p>
                          </div>
                          <Badge 
                            variant={
                              booking.status === "confirmed" ? "default" :
                              booking.status === "completed" ? "secondary" :
                              booking.status === "cancelled" ? "destructive" : "outline"
                            }
                            className={
                              booking.status === "confirmed" ? "bg-green-500" :
                              booking.status === "completed" ? "bg-blue-500" :
                              booking.status === "cancelled" ? "bg-red-500" : "bg-yellow-500"
                            }
                          >
                            {booking.status}
                          </Badge>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Bookings Tab */}
            <TabsContent value="bookings" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="font-serif text-2xl font-bold text-charcoal">Manage Bookings</h2>
                <Button className="luxury-gradient text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Booking
                </Button>
              </div>

              <Card className="bg-white">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {bookingsLoading ? (
                      <p className="text-center text-warm-gray">Loading bookings...</p>
                    ) : bookings.length === 0 ? (
                      <p className="text-center text-warm-gray">No bookings found</p>
                    ) : (
                      bookings.map((booking) => {
                        const service = services.find(s => s.id === booking.serviceId);
                        const stylist = stylists.find(s => s.id === booking.stylistId);
                        
                        return (
                          <div key={booking.id} className="border rounded-lg p-4">
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex-1">
                                <h3 className="font-semibold text-charcoal">{booking.clientName}</h3>
                                <p className="text-warm-gray text-sm">{booking.clientEmail} • {booking.clientPhone}</p>
                              </div>
                              <Badge 
                                variant="outline"
                                className={
                                  booking.status === "confirmed" ? "border-green-500 text-green-500" :
                                  booking.status === "completed" ? "border-blue-500 text-blue-500" :
                                  booking.status === "cancelled" ? "border-red-500 text-red-500" : 
                                  "border-yellow-500 text-yellow-500"
                                }
                              >
                                {booking.status}
                              </Badge>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                              <div>
                                <p className="text-sm text-warm-gray">Service</p>
                                <p className="font-semibold">{service?.name || "Unknown Service"}</p>
                              </div>
                              <div>
                                <p className="text-sm text-warm-gray">Stylist</p>
                                <p className="font-semibold">{stylist?.name || "Any Available"}</p>
                              </div>
                              <div>
                                <p className="text-sm text-warm-gray">Date & Time</p>
                                <p className="font-semibold">
                                  {new Date(booking.appointmentDate).toLocaleDateString()} at {booking.appointmentTime}
                                </p>
                              </div>
                            </div>

                            {booking.specialRequests && (
                              <div className="mb-4">
                                <p className="text-sm text-warm-gray">Special Requests</p>
                                <p className="text-sm">{booking.specialRequests}</p>
                              </div>
                            )}

                            <div className="flex gap-2">
                              {booking.status === "pending" && (
                                <>
                                  <Button
                                    size="sm"
                                    onClick={() => handleBookingStatusUpdate(booking.id, "confirmed")}
                                    className="bg-green-500 hover:bg-green-600 text-white"
                                    disabled={updateBookingMutation.isPending}
                                  >
                                    <CheckCircle className="w-4 h-4 mr-1" />
                                    Confirm
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => handleBookingStatusUpdate(booking.id, "cancelled")}
                                    className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                                    disabled={updateBookingMutation.isPending}
                                  >
                                    <XCircle className="w-4 h-4 mr-1" />
                                    Cancel
                                  </Button>
                                </>
                              )}
                              {booking.status === "confirmed" && (
                                <Button
                                  size="sm"
                                  onClick={() => handleBookingStatusUpdate(booking.id, "completed")}
                                  className="bg-blue-500 hover:bg-blue-600 text-white"
                                  disabled={updateBookingMutation.isPending}
                                >
                                  <CheckCircle className="w-4 h-4 mr-1" />
                                  Mark Complete
                                </Button>
                              )}
                              <Button size="sm" variant="outline">
                                <Eye className="w-4 h-4 mr-1" />
                                View Details
                              </Button>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Services Tab */}
            <TabsContent value="services" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="font-serif text-2xl font-bold text-charcoal">Manage Services</h2>
                <Button className="luxury-gradient text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Service
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {servicesLoading ? (
                  <p className="col-span-full text-center text-warm-gray">Loading services...</p>
                ) : (
                  services.map((service) => (
                    <Card key={service.id} className="bg-white">
                      <div className="aspect-square overflow-hidden rounded-t-lg">
                        <img
                          src={service.image || "/placeholder-service.jpg"}
                          alt={service.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardContent className="p-6">
                        <h3 className="font-serif text-lg font-semibold text-charcoal mb-2">
                          {service.name}
                        </h3>
                        <p className="text-warm-gray text-sm mb-3">{service.description}</p>
                        <div className="flex justify-between items-center mb-4">
                          <span className="text-gold font-semibold">₹{service.price}</span>
                          <span className="text-warm-gray text-sm">{service.duration} mins</span>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="flex-1">
                            <Edit className="w-4 h-4 mr-1" />
                            Edit
                          </Button>
                          <Button size="sm" variant="outline" className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </TabsContent>

            {/* Products Tab */}
            <TabsContent value="products" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="font-serif text-2xl font-bold text-charcoal">Manage Products</h2>
                <Button className="luxury-gradient text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Product
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {productsLoading ? (
                  <p className="col-span-full text-center text-warm-gray">Loading products...</p>
                ) : (
                  products.map((product) => (
                    <Card key={product.id} className="bg-white">
                      <div className="aspect-square overflow-hidden rounded-t-lg relative">
                        <img
                          src={product.image || "/placeholder-product.jpg"}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                        {product.isNew && (
                          <Badge className="absolute top-2 left-2 bg-rose text-white">New</Badge>
                        )}
                        {product.isBestSeller && (
                          <Badge className="absolute top-2 left-2 bg-gold text-white">Best Seller</Badge>
                        )}
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-serif text-sm font-semibold text-charcoal mb-1">
                          {product.name}
                        </h3>
                        <p className="text-warm-gray text-xs mb-2 line-clamp-2">{product.description}</p>
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-charcoal font-bold">₹{product.price}</span>
                          <Badge variant={product.inStock ? "secondary" : "destructive"} className="text-xs">
                            {product.inStock ? "In Stock" : "Out of Stock"}
                          </Badge>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="flex-1 text-xs">
                            <Edit className="w-3 h-3 mr-1" />
                            Edit
                          </Button>
                          <Button size="sm" variant="outline" className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white">
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
}
