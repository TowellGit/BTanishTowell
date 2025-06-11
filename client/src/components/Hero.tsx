import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Calendar, Play, ChevronDown } from "lucide-react";
import { Link } from "wouter";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 parallax-bg"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&h=1080')`,
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Luxury Redefined
            <span className="block text-gold">Your Beauty Journey</span>
          </h1>
          <p className="text-xl sm:text-2xl text-white mb-8 max-w-3xl mx-auto leading-relaxed font-light">
            Experience the pinnacle of luxury beauty services in our award-winning salon, 
            where every detail is crafted for your ultimate transformation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/booking">
              <Button
                size="lg"
                className="luxury-gradient text-white hover:opacity-90 transition-all duration-300 hover:scale-105 luxury-shadow text-lg px-8 py-4"
              >
                <Calendar className="w-5 h-5 mr-2" />
                Book Your Experience
              </Button>
            </Link>
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-white text-white hover:bg-white hover:text-charcoal transition-all duration-300 text-lg px-8 py-4"
            >
              <Play className="w-5 h-5 mr-2" />
              Virtual Tour
            </Button>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-8 h-12 border-2 border-white rounded-full flex justify-center">
            <ChevronDown className="w-4 h-4 text-white mt-2 animate-pulse" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
