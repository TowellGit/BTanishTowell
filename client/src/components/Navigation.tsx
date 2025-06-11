import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Calendar, Phone } from "lucide-react";
import type { NavItem } from "@/lib/types";

const navItems: NavItem[] = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "Gallery", href: "/gallery" },
  { name: "Products", href: "/products" },
  { name: "Contact", href: "/contact" },
];

export default function Navigation() {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white shadow-lg"
          : "glass-effect"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 luxury-gradient rounded-full flex items-center justify-center">
              <span className="text-white font-serif font-bold text-lg">B</span>
            </div>
            <span className="font-serif text-2xl font-semibold text-charcoal">
              B Tanish
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`font-medium transition-colors duration-300 ${
                  location === item.href
                    ? "text-gold"
                    : "text-charcoal hover:text-gold"
                }`}
              >
                {item.name}
              </Link>
            ))}
            <Link href="/booking">
              <Button className="luxury-gradient text-white hover:opacity-90 transition-opacity duration-300 font-medium">
                <Calendar className="w-4 h-4 mr-2" />
                Book Now
              </Button>
            </Link>
            <a href="tel:+917796947777">
              <Button variant="outline" size="sm">
                <Phone className="w-4 h-4 mr-2" />
                Call
              </Button>
            </a>
          </div>

          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="md:hidden">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col space-y-4 mt-8">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`text-lg font-medium transition-colors duration-300 ${
                      location === item.href
                        ? "text-gold"
                        : "text-charcoal hover:text-gold"
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="pt-4 space-y-3">
                  <Link href="/booking" onClick={() => setIsOpen(false)}>
                    <Button className="w-full luxury-gradient text-white hover:opacity-90 transition-opacity duration-300 font-medium">
                      <Calendar className="w-4 h-4 mr-2" />
                      Book Now
                    </Button>
                  </Link>
                  <a href="tel:+917796947777">
                    <Button variant="outline" className="w-full">
                      <Phone className="w-4 h-4 mr-2" />
                      Call Us
                    </Button>
                  </a>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
