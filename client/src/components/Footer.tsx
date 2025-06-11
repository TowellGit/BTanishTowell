import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Instagram, Facebook, Youtube, MessageCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-charcoal text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-1 lg:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-12 h-12 luxury-gradient rounded-full flex items-center justify-center">
                <span className="text-white font-serif font-bold text-xl">B</span>
              </div>
              <span className="font-serif text-3xl font-semibold">B Tanish Salon</span>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Experience the pinnacle of luxury beauty services at B Tanish Salon. 
              Where elegance meets expertise, and every visit is a journey of transformation.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 bg-gold rounded-full flex items-center justify-center hover:bg-bronze transition-colors duration-300"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gold rounded-full flex items-center justify-center hover:bg-bronze transition-colors duration-300"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gold rounded-full flex items-center justify-center hover:bg-bronze transition-colors duration-300"
              >
                <Youtube className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gold rounded-full flex items-center justify-center hover:bg-bronze transition-colors duration-300"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-gray-300 hover:text-gold transition-colors duration-300">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-300 hover:text-gold transition-colors duration-300">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-gray-300 hover:text-gold transition-colors duration-300">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-gray-300 hover:text-gold transition-colors duration-300">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-gold transition-colors duration-300">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-6">Services</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-300 hover:text-gold transition-colors duration-300">
                  Hair Styling
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-gold transition-colors duration-300">
                  Spa Treatments
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-gold transition-colors duration-300">
                  Bridal Makeup
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-gold transition-colors duration-300">
                  Nail Care
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-gold transition-colors duration-300">
                  Memberships
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="border-t border-gray-700 pt-8 mb-8">
          <div className="max-w-md mx-auto text-center">
            <h4 className="font-serif text-xl font-semibold mb-4">Stay Updated</h4>
            <p className="text-gray-300 mb-6">
              Subscribe to receive exclusive offers and beauty tips
            </p>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-full text-charcoal focus:outline-none focus:ring-2 focus:ring-gold border-0"
              />
              <Button className="luxury-gradient px-6 py-3 rounded-full hover:opacity-90 transition-opacity duration-300 font-semibold">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-300 text-sm mb-4 md:mb-0">
            © 2024 B Tanish Salon. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm">
            <a href="#" className="text-gray-300 hover:text-gold transition-colors duration-300">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-300 hover:text-gold transition-colors duration-300">
              Terms of Service
            </a>
            <a href="#" className="text-gray-300 hover:text-gold transition-colors duration-300">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
