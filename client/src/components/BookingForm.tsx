import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar, CheckCircle, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import type { Service, Stylist } from "@shared/schema";

const bookingSchema = z.object({
  clientName: z.string().min(2, "Name must be at least 2 characters"),
  clientEmail: z.string().email("Invalid email address"),
  clientPhone: z.string().min(10, "Phone number must be at least 10 digits"),
  serviceId: z.string().optional(),
  stylistId: z.string().optional(),
  appointmentDate: z.string().min(1, "Please select a date"),
  appointmentTime: z.string().min(1, "Please select a time"),
  specialRequests: z.string().optional(),
  agreeToTerms: z.boolean().refine(val => val === true, "You must agree to terms and conditions"),
});

type BookingFormData = z.infer<typeof bookingSchema>;

const timeSlots = [
  "10:00 AM - 12:00 PM",
  "12:00 PM - 2:00 PM",
  "2:00 PM - 4:00 PM",
  "4:00 PM - 6:00 PM",
  "6:00 PM - 8:00 PM",
];

export default function BookingForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: services = [], isLoading: servicesLoading } = useQuery<Service[]>({
    queryKey: ["/api/services"],
  });

  const { data: stylists = [], isLoading: stylistsLoading } = useQuery<Stylist[]>({
    queryKey: ["/api/stylists"],
  });

  const form = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      clientName: "",
      clientEmail: "",
      clientPhone: "",
      serviceId: "",
      stylistId: "",
      appointmentDate: "",
      appointmentTime: "",
      specialRequests: "",
      agreeToTerms: false,
    },
  });

  const bookingMutation = useMutation({
    mutationFn: async (data: BookingFormData) => {
      const bookingData = {
        ...data,
        serviceId: data.serviceId ? parseInt(data.serviceId) : undefined,
        stylistId: data.stylistId ? parseInt(data.stylistId) : undefined,
        appointmentDate: new Date(data.appointmentDate).toISOString(),
      };
      
      return await apiRequest("POST", "/api/bookings", bookingData);
    },
    onSuccess: () => {
      setIsSubmitted(true);
      queryClient.invalidateQueries({ queryKey: ["/api/bookings"] });
      toast({
        title: "Booking Confirmed!",
        description: "Your appointment has been successfully booked. You'll receive a confirmation email shortly.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Booking Failed",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: BookingFormData) => {
    bookingMutation.mutate(data);
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12"
      >
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h3 className="font-serif text-2xl font-bold text-charcoal mb-4">
          Booking Confirmed!
        </h3>
        <p className="text-warm-gray mb-6">
          Thank you for choosing B Tanish Salon. We'll contact you shortly to confirm your appointment details.
        </p>
        <Button
          onClick={() => {
            setIsSubmitted(false);
            form.reset();
          }}
          className="luxury-gradient text-white hover:opacity-90"
        >
          Book Another Appointment
        </Button>
      </motion.div>
    );
  }

  return (
    <Card className="bg-white rounded-3xl luxury-shadow">
      <CardHeader>
        <CardTitle className="font-serif text-2xl text-center">
          Book Your <span className="text-gradient">Experience</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-8">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="clientName">Full Name</Label>
              <Input
                id="clientName"
                {...form.register("clientName")}
                placeholder="Enter your full name"
                className="focus:border-gold focus:ring-gold"
              />
              {form.formState.errors.clientName && (
                <p className="text-red-500 text-sm">{form.formState.errors.clientName.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="clientPhone">Phone Number</Label>
              <Input
                id="clientPhone"
                {...form.register("clientPhone")}
                placeholder="+91 00000 00000"
                className="focus:border-gold focus:ring-gold"
              />
              {form.formState.errors.clientPhone && (
                <p className="text-red-500 text-sm">{form.formState.errors.clientPhone.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="clientEmail">Email Address</Label>
            <Input
              id="clientEmail"
              type="email"
              {...form.register("clientEmail")}
              placeholder="Enter your email"
              className="focus:border-gold focus:ring-gold"
            />
            {form.formState.errors.clientEmail && (
              <p className="text-red-500 text-sm">{form.formState.errors.clientEmail.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Select Service</Label>
              <Select onValueChange={(value) => form.setValue("serviceId", value)}>
                <SelectTrigger className="focus:border-gold focus:ring-gold">
                  <SelectValue placeholder="Choose your service" />
                </SelectTrigger>
                <SelectContent>
                  {servicesLoading ? (
                    <div className="flex items-center justify-center p-4">
                      <Loader2 className="w-4 h-4 animate-spin" />
                    </div>
                  ) : (
                    services.map((service) => (
                      <SelectItem key={service.id} value={service.id.toString()}>
                        {service.name} (₹{service.price})
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Preferred Stylist</Label>
              <Select onValueChange={(value) => form.setValue("stylistId", value)}>
                <SelectTrigger className="focus:border-gold focus:ring-gold">
                  <SelectValue placeholder="Any available stylist" />
                </SelectTrigger>
                <SelectContent>
                  {stylistsLoading ? (
                    <div className="flex items-center justify-center p-4">
                      <Loader2 className="w-4 h-4 animate-spin" />
                    </div>
                  ) : (
                    stylists.map((stylist) => (
                      <SelectItem key={stylist.id} value={stylist.id.toString()}>
                        {stylist.name} ({stylist.specialization})
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="appointmentDate">Preferred Date</Label>
              <Input
                id="appointmentDate"
                type="date"
                {...form.register("appointmentDate")}
                min={new Date().toISOString().split('T')[0]}
                className="focus:border-gold focus:ring-gold"
              />
              {form.formState.errors.appointmentDate && (
                <p className="text-red-500 text-sm">{form.formState.errors.appointmentDate.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label>Preferred Time</Label>
              <Select onValueChange={(value) => form.setValue("appointmentTime", value)}>
                <SelectTrigger className="focus:border-gold focus:ring-gold">
                  <SelectValue placeholder="Select time slot" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map((slot) => (
                    <SelectItem key={slot} value={slot}>
                      {slot}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {form.formState.errors.appointmentTime && (
                <p className="text-red-500 text-sm">{form.formState.errors.appointmentTime.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="specialRequests">Special Requests</Label>
            <Textarea
              id="specialRequests"
              {...form.register("specialRequests")}
              placeholder="Any special requests or notes for your appointment"
              className="focus:border-gold focus:ring-gold h-24"
            />
          </div>

          <div className="flex items-center space-x-3">
            <Checkbox
              id="agreeToTerms"
              checked={form.watch("agreeToTerms")}
              onCheckedChange={(checked) => form.setValue("agreeToTerms", checked as boolean)}
            />
            <Label htmlFor="agreeToTerms" className="text-warm-gray text-sm">
              I agree to the <a href="#" className="text-gold hover:text-bronze">Terms & Conditions</a> and{" "}
              <a href="#" className="text-gold hover:text-bronze">Privacy Policy</a>
            </Label>
          </div>
          {form.formState.errors.agreeToTerms && (
            <p className="text-red-500 text-sm">{form.formState.errors.agreeToTerms.message}</p>
          )}

          <div className="text-center">
            <Button
              type="submit"
              disabled={bookingMutation.isPending}
              className="luxury-gradient text-white px-12 py-4 rounded-full text-lg font-semibold hover:opacity-90 transition-all duration-300 hover:scale-105 luxury-shadow"
            >
              {bookingMutation.isPending ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Calendar className="w-5 h-5 mr-2" />
                  Confirm Booking
                </>
              )}
            </Button>
            <p className="text-warm-gray text-sm mt-4">
              You'll receive a confirmation email within 5 minutes
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
