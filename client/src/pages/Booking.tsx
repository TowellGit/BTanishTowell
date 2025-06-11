import { motion } from "framer-motion";
import BookingForm from "@/components/BookingForm";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, MessageCircle, MapPin, Clock } from "lucide-react";

export default function Booking() {
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
              Book Your <span className="text-gradient">Experience</span>
            </h1>
            <p className="text-xl text-warm-gray leading-relaxed max-w-3xl mx-auto">
              Reserve your appointment with our master stylists and embark on a journey 
              of luxury and transformation at B Tanish Salon.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <BookingForm />
        </div>
      </section>

      {/* Quick Actions */}
      <section className="pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-3xl font-bold text-charcoal mb-4">
              Need Help with Booking?
            </h2>
            <p className="text-warm-gray text-lg">
              Our team is here to assist you with any questions or special requests
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <Card className="text-center p-6 bg-white rounded-2xl hover-scale cursor-pointer h-full">
                <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-serif text-lg font-semibold text-charcoal mb-2">
                  Call Us
                </h3>
                <p className="text-warm-gray mb-3 text-sm">
                  Speak directly with our booking team for personalized assistance
                </p>
                <a href="tel:+919876543210">
                  <Button className="luxury-gradient text-white hover:opacity-90 w-full">
                    +91 98765 43210
                  </Button>
                </a>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Card className="text-center p-6 bg-white rounded-2xl hover-scale cursor-pointer h-full">
                <div className="w-16 h-16 bg-rose rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-serif text-lg font-semibold text-charcoal mb-2">
                  WhatsApp
                </h3>
                <p className="text-warm-gray mb-3 text-sm">
                  Quick booking assistance and instant responses via WhatsApp
                </p>
                <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer">
                  <Button className="bg-green-500 hover:bg-green-600 text-white w-full">
                    Chat Now
                  </Button>
                </a>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <Card className="text-center p-6 bg-white rounded-2xl hover-scale cursor-pointer h-full">
                <div className="w-16 h-16 bg-charcoal rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-serif text-lg font-semibold text-charcoal mb-2">
                  Visit Us
                </h3>
                <p className="text-warm-gray mb-3 text-sm">
                  Experience our luxury salon in person and book on-site
                </p>
                <Button variant="outline" className="border-charcoal text-charcoal hover:bg-charcoal hover:text-white w-full">
                  Get Directions
                </Button>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Business Hours */}
      <section className="py-20 bg-pearl">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-3xl font-bold text-charcoal mb-4">
              Operating Hours
            </h2>
            <p className="text-warm-gray text-lg">
              We're here to serve you throughout the week
            </p>
          </motion.div>

          <Card className="bg-white rounded-3xl p-8 luxury-shadow">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="text-center md:text-left">
                <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center mx-auto md:mx-0 mb-6">
                  <Clock className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-charcoal mb-4">
                  Salon Hours
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-warm-gray">Monday - Friday</span>
                    <span className="font-semibold text-charcoal">9:00 AM - 8:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-warm-gray">Saturday</span>
                    <span className="font-semibold text-charcoal">10:00 AM - 7:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-warm-gray">Sunday</span>
                    <span className="font-semibold text-charcoal">10:00 AM - 6:00 PM</span>
                  </div>
                </div>
              </div>

              <div className="text-center md:text-left">
                <h3 className="font-serif text-xl font-semibold text-charcoal mb-4">
                  Booking Guidelines
                </h3>
                <ul className="space-y-3 text-warm-gray">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-gold rounded-full mr-3 mt-2"></div>
                    <span>Advance booking recommended for weekend appointments</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-gold rounded-full mr-3 mt-2"></div>
                    <span>24-hour cancellation policy for full refund</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-gold rounded-full mr-3 mt-2"></div>
                    <span>Group bookings available for special events</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-gold rounded-full mr-3 mt-2"></div>
                    <span>Consultation available before major services</span>
                  </li>
                </ul>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Location Preview */}
      <section className="py-20 bg-ivory">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-3xl font-bold text-charcoal mb-4">
              Visit Our Luxury Salon
            </h2>
            <p className="text-warm-gray text-lg max-w-2xl mx-auto">
              Located in the heart of Mumbai's fashion district, our salon offers 
              a serene escape from the bustling city.
            </p>
          </motion.div>

          <Card className="bg-white rounded-3xl overflow-hidden luxury-shadow">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-8 lg:p-12">
                <h3 className="font-serif text-2xl font-semibold text-charcoal mb-6">
                  B Tanish Salon
                </h3>
                <div className="space-y-4 mb-8">
                  <div className="flex items-start">
                    <MapPin className="w-5 h-5 text-gold mr-3 mt-1" />
                    <div>
                      <p className="font-semibold text-charcoal">Address</p>
                      <p className="text-warm-gray">
                        123 Luxury Plaza, Fashion District<br />
                        Mumbai, Maharashtra 400001
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Phone className="w-5 h-5 text-gold mr-3 mt-1" />
                    <div>
                      <p className="font-semibold text-charcoal">Phone</p>
                      <p className="text-warm-gray">+91 98765 43210</p>
                    </div>
                  </div>
                </div>
                <Button className="luxury-gradient text-white hover:opacity-90 px-8 py-3">
                  <MapPin className="w-4 h-4 mr-2" />
                  Get Directions
                </Button>
              </div>
              <div className="h-80 lg:h-auto">
                <img
                  src="https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"
                  alt="B Tanish Salon Interior"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}
