import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Instagram, 
  Facebook, 
  Youtube, 
  MessageCircle,
  Send
} from "lucide-react";

export default function Contact() {
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
              Visit Our <span className="text-gradient">Salon</span>
            </h1>
            <p className="text-xl text-warm-gray leading-relaxed max-w-3xl mx-auto">
              Experience luxury at our beautifully designed salon in the heart of Mumbai. 
              We're here to make your beauty dreams come true.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Information & Form */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Card className="bg-white rounded-2xl p-8 luxury-shadow">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 luxury-gradient rounded-full flex items-center justify-center mr-4">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-serif text-xl font-semibold text-charcoal">Location</h3>
                      <p className="text-warm-gray">Find us in the premium district</p>
                    </div>
                  </div>
                  <div className="text-charcoal">
                    <p className="font-semibold mb-2">B Tanish Salon</p>
                    <p>123 Luxury Plaza, Fashion District</p>
                    <p>Mumbai, Maharashtra 400001</p>
                    <p>India</p>
                  </div>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card className="bg-white rounded-2xl p-8 luxury-shadow">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-rose rounded-full flex items-center justify-center mr-4">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-serif text-xl font-semibold text-charcoal">Working Hours</h3>
                      <p className="text-warm-gray">Always here for you</p>
                    </div>
                  </div>
                  <div className="space-y-3 text-charcoal">
                    <div className="flex justify-between">
                      <span>Monday - Friday</span>
                      <span className="font-semibold">9:00 AM - 8:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Saturday</span>
                      <span className="font-semibold">10:00 AM - 7:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sunday</span>
                      <span className="font-semibold">10:00 AM - 6:00 PM</span>
                    </div>
                  </div>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card className="bg-white rounded-2xl p-8 luxury-shadow">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-charcoal rounded-full flex items-center justify-center mr-4">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-serif text-xl font-semibold text-charcoal">Contact</h3>
                      <p className="text-warm-gray">Get in touch with us</p>
                    </div>
                  </div>
                  <div className="space-y-3 text-charcoal">
                    <div className="flex items-center">
                      <Phone className="w-4 h-4 text-gold mr-3" />
                      <a href="tel:+917796947777" className="hover:text-gold transition-colors">
                        +91 77969 47777
                      </a>
                    </div>
                    <div className="flex items-center">
                      <Mail className="w-4 h-4 text-gold mr-3" />
                      <a href="mailto:btanishsalon@gmail.com" className="hover:text-gold transition-colors">
                        btanishsalon@gmail.com
                      </a>
                    </div>
                    <div className="flex items-center">
                      <MessageCircle className="w-4 h-4 text-gold mr-3" />
                      <a href="https://wa.me/917796947777" className="hover:text-gold transition-colors">
                        WhatsApp Chat
                      </a>
                    </div>
                  </div>
                </Card>
              </motion.div>

              {/* Social Media */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Card className="bg-white rounded-2xl p-8 luxury-shadow">
                  <h3 className="font-serif text-xl font-semibold text-charcoal mb-6">Follow Us</h3>
                  <div className="flex space-x-4">
                    <a 
                      href="#" 
                      className="w-12 h-12 bg-rose rounded-full flex items-center justify-center hover:bg-dusty-rose transition-colors duration-300"
                    >
                      <Instagram className="w-5 h-5 text-white" />
                    </a>
                    <a 
                      href="#" 
                      className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors duration-300"
                    >
                      <Facebook className="w-5 h-5 text-white" />
                    </a>
                    <a 
                      href="#" 
                      className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors duration-300"
                    >
                      <Youtube className="w-5 h-5 text-white" />
                    </a>
                    <a 
                      href="#" 
                      className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors duration-300"
                    >
                      <MessageCircle className="w-5 h-5 text-white" />
                    </a>
                  </div>
                </Card>
              </motion.div>
            </div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="space-y-8"
            >
              <Card className="bg-white rounded-2xl p-8 luxury-shadow">
                <h3 className="font-serif text-2xl font-semibold text-charcoal mb-6">
                  Send us a Message
                </h3>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input 
                        id="firstName" 
                        placeholder="Your first name"
                        className="focus:border-gold focus:ring-gold"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input 
                        id="lastName" 
                        placeholder="Your last name"
                        className="focus:border-gold focus:ring-gold"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="your.email@example.com"
                      className="focus:border-gold focus:ring-gold"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input 
                      id="phone" 
                      type="tel" 
                      placeholder="+91 00000 00000"
                      className="focus:border-gold focus:ring-gold"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input 
                      id="subject" 
                      placeholder="How can we help you?"
                      className="focus:border-gold focus:ring-gold"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea 
                      id="message" 
                      placeholder="Tell us more about your inquiry..."
                      className="focus:border-gold focus:ring-gold h-32"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full luxury-gradient text-white hover:opacity-90 py-3 text-lg"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              </Card>

              {/* Salon Image */}
              <Card className="bg-white rounded-2xl overflow-hidden luxury-shadow">
                <img 
                  src="https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                  alt="B Tanish Salon Interior" 
                  className="w-full h-80 object-cover"
                />
                <CardContent className="p-6">
                  <h3 className="font-serif text-xl font-semibold text-charcoal mb-2">
                    Luxury Salon Experience
                  </h3>
                  <p className="text-warm-gray">
                    Step into our world of elegance and sophistication, where every detail 
                    is designed for your comfort and luxury experience.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-pearl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-4xl font-bold text-charcoal mb-6">
              Find Us on the Map
            </h2>
            <p className="text-xl text-warm-gray max-w-3xl mx-auto leading-relaxed">
              Conveniently located in Mumbai's fashion district with easy access 
              to public transportation and parking facilities.
            </p>
          </motion.div>

          <Card className="bg-white rounded-2xl overflow-hidden luxury-shadow">
            <div className="h-96 bg-gray-200 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-16 h-16 text-gold mx-auto mb-4" />
                <p className="text-charcoal font-semibold text-lg">Interactive Map</p>
                <p className="text-warm-gray">Click to open in Google Maps</p>
              </div>
            </div>
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="flex-1 luxury-gradient text-white hover:opacity-90">
                  <MapPin className="w-4 h-4 mr-2" />
                  Get Directions
                </Button>
                <Button variant="outline" className="flex-1 border-gold text-gold hover:bg-gold hover:text-white">
                  <Phone className="w-4 h-4 mr-2" />
                  Call for Directions
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-ivory">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-serif text-4xl font-bold text-charcoal mb-6">
              Frequently Asked <span className="text-gradient">Questions</span>
            </h2>
            <p className="text-xl text-warm-gray leading-relaxed">
              Quick answers to common questions about our salon and services
            </p>
          </motion.div>

          <div className="space-y-6">
            {[
              {
                question: "Do I need to book an appointment in advance?",
                answer: "Yes, we recommend booking in advance, especially for weekends and special services. Walk-ins are welcome based on availability."
              },
              {
                question: "What is your cancellation policy?",
                answer: "We require 24 hours notice for cancellations to receive a full refund. Same-day cancellations may incur a fee."
              },
              {
                question: "Do you offer bridal packages?",
                answer: "Yes, we offer comprehensive bridal packages including trial sessions, makeup, hair styling, and pre-wedding treatments."
              },
              {
                question: "Is parking available at the salon?",
                answer: "Yes, we have dedicated parking spaces for our clients. Valet parking is also available for premium members."
              },
              {
                question: "What safety measures do you follow?",
                answer: "We maintain the highest hygiene standards with sanitized tools, clean workstations, and follow all health protocols."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-white p-6 rounded-2xl luxury-shadow">
                  <h3 className="font-serif text-lg font-semibold text-charcoal mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-warm-gray leading-relaxed">
                    {faq.answer}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
