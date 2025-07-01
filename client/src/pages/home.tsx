import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import ProductCard from "../components/product-card";
import AnimatedCounter from "../components/animated-counter";
import CustomerLogo from "../components/customer-logo";
import IconCard from "../components/icon-card";
import {
  Medal,
  Lightbulb,
  Globe,
  Headphones,
  Play,
  Download,
} from "lucide-react";
import { Link } from "wouter";
import { useEffect } from "react";
import { apiRequest } from "@/lib/queryClient";

export default function Home() {
  const { data: products = [] } = useQuery({
    queryKey: ["/api/products"],
  });

  const { data: events = [] } = useQuery({
    queryKey: ["/api/events"],
  });

  // Record website view
  useEffect(() => {
    apiRequest("POST", "/api/analytics/website-views");
  }, []);

  const calibrationProducts = products
    .filter((p) => p.category === "Calibration Systems")
    .slice(0, 4);
  const testingProducts = products
    .filter((p) => p.category === "Testing Systems")
    .slice(0, 4);
  const measuringProducts = products
    .filter((p) => p.category === "Measuring Instruments")
    .slice(0, 4);

  const customerLogos = [
    "ACME Corp",
    "TechFlow",
    "IndustrialPlus",
    "PrecisionPro",
    "MegaManuf",
    "AutoTech",
    "AeroSpace Co",
    "MetalWorks",
    "FlowDynamics",
    "CalibratePro",
    "TestSolutions",
    "MeasureMax",
  ];

  const whyChooseUsItems = [
    {
      icon: Medal,
      title: "Quality",
      description:
        "ISO certified manufacturing with rigorous quality control processes",
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "Cutting-edge technology and continuous R&D investment",
    },
    {
      icon: Globe,
      title: "Global Reach",
      description: "Serving customers across 25+ countries with local support",
    },
    {
      icon: Headphones,
      title: "Fast Support",
      description: "24/7 technical support and rapid response times",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-bg text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              className="text-center lg:text-left"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-cinzel text-4xl md:text-6xl font-bold mb-6 leading-tight">
                We are manufacturers of{" "}
                <span className="text-yellow-300">Calibration Systems</span>,{" "}
                <span className="text-yellow-300">Testing Systems</span>, and{" "}
                <span className="text-yellow-300">Measuring Systems</span>
              </h2>
              <p className="text-xl mb-8 text-gray-200">
                Precision engineering meets cutting-edge technology. Trust
                Reckonix for all your calibration, testing, and measurement
                needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button
                  asChild
                  className="bg-yellow-500 text-black px-8 py-3 hover:bg-yellow-400 transform hover:scale-105 transition-all"
                >
                  <Link href="/products">View Products</Link>
                </Button>
                <Button
                  variant="outline"
                  className="border-2 border-white text-white px-8 py-3 hover:bg-white hover:text-maroon-500 transition-all"
                  onClick={() => {
                    const catalogSection = document.getElementById('download-catalog');
                    catalogSection?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download Catalog
                </Button>
              </div>
            </motion.div>
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <video
                src="https://cdn.pixabay.com/video/2016/07/23/3975-176000797_medium.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="rounded-xl shadow-2xl w-full h-auto transform hover:scale-[1.02] transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-xl"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Reckonix Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <img
                src="https://images.unsplash.com/photo-1565514020179-026b92b84bb6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
                alt="Advanced industrial precision equipment"
                className="rounded-xl shadow-lg w-full h-auto"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-cinzel text-3xl font-bold text-gray-900 mb-6">
                About Reckonix
              </h2>
              <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                With over two decades of excellence in precision engineering,
                Reckonix stands as a global leader in manufacturing
                state-of-the-art calibration systems, testing equipment, and
                measuring instruments.
              </p>
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                Our commitment to innovation and quality has earned us the trust
                of industries worldwide. From automotive to aerospace,
                pharmaceuticals to manufacturing, we deliver solutions that
                ensure accuracy, reliability, and compliance.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-maroon-500 rounded-full mr-2"></div>
                  <span className="font-semibold">ISO 9001:2015 Certified</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-maroon-500 rounded-full mr-2"></div>
                  <span className="font-semibold">Global Presence</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-maroon-500 rounded-full mr-2"></div>
                  <span className="font-semibold">24/7 Support</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-cinzel text-4xl font-bold text-gray-900 mb-4">
              Our Product Categories
            </h2>
            <p className="text-xl text-gray-600">
              Precision instruments designed for excellence across industries
            </p>
          </motion.div>

          {/* Calibration Systems */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="flex justify-between items-center mb-8">
              <h3 className="font-cinzel text-2xl font-bold text-maroon-500">
                Calibration Systems
              </h3>
              <Button
                variant="ghost"
                asChild
                className="text-maroon-500 hover:text-maroon-600"
              >
                <Link href="/products?category=Calibration Systems">
                  View All →
                </Link>
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {calibrationProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Testing Systems */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex justify-between items-center mb-8">
              <h3 className="font-cinzel text-2xl font-bold text-maroon-500">
                Testing Systems
              </h3>
              <Button
                variant="ghost"
                asChild
                className="text-maroon-500 hover:text-maroon-600"
              >
                <Link href="/products?category=Testing Systems">
                  View All →
                </Link>
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {testingProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Measuring Instruments */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="flex justify-between items-center mb-8">
              <h3 className="font-cinzel text-2xl font-bold text-maroon-500">
                Measuring Instruments
              </h3>
              <Button
                variant="ghost"
                asChild
                className="text-maroon-500 hover:text-maroon-600"
              >
                <Link href="/products?category=Measuring Instruments">
                  View All →
                </Link>
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {measuringProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="py-16 bg-gray-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-cinzel text-3xl font-bold text-gray-900 mb-4">
              Trusted By Industry Leaders
            </h2>
            <p className="text-lg text-gray-600">
              Companies worldwide rely on our precision instruments
            </p>
          </motion.div>

          <div className="relative">
            <div className="flex space-x-12 scroll-logos">
              {customerLogos.concat(customerLogos).map((logo, index) => (
                <CustomerLogo key={index} name={logo} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Recent Events Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-cinzel text-3xl font-bold text-gray-900 mb-4">
              Recent Company Events
            </h2>
            <p className="text-lg text-gray-600">
              Stay updated with our latest achievements and milestones
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.slice(0, 3).map((event, index) => (
              <motion.div
                key={event.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={event.imageUrl}
                    alt={event.title}
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 bg-maroon-500 text-white px-3 py-1 rounded-full text-sm">
                    {new Date(event.eventDate).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-cinzel text-xl font-bold text-gray-900 mb-3">
                    {event.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {event.description}
                  </p>
                  <div className="flex items-center text-maroon-500 font-medium">
                    <span className="text-sm">Read more</span>
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {events.length > 3 && (
            <div className="text-center mt-12">
              <Button 
                variant="outline" 
                className="border-maroon-500 text-maroon-500 hover:bg-maroon-500 hover:text-white"
              >
                View All Events
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-cinzel text-3xl font-bold text-gray-900 mb-4">
              Why Choose Us?
            </h2>
            <p className="text-lg text-gray-600">
              Excellence in every aspect of our service
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUsItems.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <IconCard {...item} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Stats Section */}
      <section className="py-16 hero-bg text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-cinzel text-3xl font-bold mb-4">
              Our Achievements
            </h2>
            <p className="text-lg text-gray-200">
              Numbers that speak for our excellence
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <AnimatedCounter
                end={500}
                suffix="+"
                className="text-4xl font-bold mb-2"
              />
              <div className="text-lg text-gray-200">
                Calibration Labs Setup
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <AnimatedCounter
                end={25}
                suffix="+"
                className="text-4xl font-bold mb-2"
              />
              <div className="text-lg text-gray-200">Countries Served</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <AnimatedCounter
                end={1000}
                suffix="+"
                className="text-4xl font-bold mb-2"
              />
              <div className="text-lg text-gray-200">Satisfied Customers</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <AnimatedCounter
                end={150}
                suffix="+"
                className="text-4xl font-bold mb-2"
              />
              <div className="text-lg text-gray-200">Team Members</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Download Catalog Section */}
      <section id="download-catalog" className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-cinzel text-3xl font-bold text-gray-900 mb-4">
              Download Our Complete Catalog
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Get detailed specifications, applications, and technical
              information for all our products
            </p>

            <div className="bg-white rounded-xl shadow-lg p-8 max-w-md mx-auto">
              <div className="mb-6">
                <Download className="text-maroon-500 h-16 w-16 mb-4 mx-auto" />
                <h3 className="font-semibold text-xl text-gray-900 mb-2">
                  Main Product Catalog
                </h3>
                <p className="text-gray-600">
                  Complete technical specifications and product details
                </p>
              </div>

              <Button className="bg-maroon-500 text-white px-8 py-3 hover:bg-maroon-600 transition-all transform hover:scale-105 w-full">
                <Download className="mr-2 h-4 w-4" />
                Download Catalog (PDF)
              </Button>

              <p className="text-sm text-gray-500 mt-4">
                File size: 15.2 MB | Last updated: Dec 2024
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
