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
import { useEffect, useState } from "react";
import { apiRequest } from "@/lib/queryClient";
import type { Product, Customer, CompanyEvent } from "../../../shared/schema";

export default function Home() {
  const { data: products = [] } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const { data: events = [] } = useQuery<CompanyEvent[]>({
    queryKey: ["/api/events"],
  });

  const { data: customers = [] } = useQuery<Customer[]>({
    queryKey: ["/api/customers"],
  });

  // Record website view
  useEffect(() => {
    apiRequest("POST", "/api/analytics/website-views");
  }, []);

  const safeProducts = Array.isArray(products) ? products : [];
  const subcategories: Record<string, string[]> = {
    "Calibration Systems": [
      "Pressure Calibration",
      "Temperature Calibration",
      "Flow Calibration",
      "Electrical Calibration",
      "Mechanical Calibration",
      "Dimensional Calibration",
      "Mass and Weight Calibration",
      "Thermal Calibration"
    ],
    "Measuring Instruments": [
      "Dimensional Measurement Systems",
      "Optical Measurement Systems",
      "Coordinate Measurement Systems",
      "Roughness Measurement Systems",
      "Profile Measurement Systems"
    ],
    "Testing Systems": [
      "Universal Testing Machines",
      "Dynamic and Fatigue Testing Machines",
      "Torsion Testing Machines",
      "Single Purpose Test Machines",
      "Customized Testing Solutions"
    ]
  };

  const getProductsByCategory = (category: string) => {
    const categoryProducts = safeProducts.filter((p: Product) => p.category === category);
    
    // Get up to 4 products for the category
    // Prefer homeFeatured products first, then take the first available products
    const featuredProducts = categoryProducts.filter(p => p.homeFeatured);
    const regularProducts = categoryProducts.filter(p => !p.homeFeatured);
    
    // Combine featured and regular products, limiting to 4 total
    const selectedProducts = [...featuredProducts, ...regularProducts].slice(0, 4);
    
    return selectedProducts;
  };

  const featuredCustomers = customers.filter((customer: Customer) => customer.featured);

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

  const [newsOpen, setNewsOpen] = useState(false);
  useEffect(() => {
    setNewsOpen(true);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-primary text-white py-20 overflow-hidden">
        {/* Geometric Line Pattern Overlay */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30" width="100%" height="100%" viewBox="0 0 1440 400" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g stroke="white" stroke-width="2" opacity="0.5">
            <polyline points="0,100 300,100 400,200 700,200" />
            <polyline points="200,0 500,0 600,100 900,100" />
            <polyline points="400,200 700,200 800,300 1100,300" />
            <polyline points="600,100 900,100 1000,200 1300,200" />
            <polyline points="800,300 1100,300 1200,400 1440,400" />
            <polyline points="1000,200 1300,200 1400,300 1440,300" />
            {/* Additional similar structures for density */}
            <polyline points="100,50 400,50 500,150 800,150" />
            <polyline points="300,150 600,150 700,250 1000,250" />
            <polyline points="500,250 800,250 900,350 1200,350" />
            <polyline points="700,50 1000,50 1100,150 1400,150" />
            <polyline points="900,150 1200,150 1300,250 1440,250" />
            <polyline points="1100,250 1400,250 1440,350 1440,350" />
            <polyline points="0,200 200,200 300,300 500,300" />
            <polyline points="200,300 400,300 500,400 700,400" />
            <polyline points="600,350 900,350 1000,400 1200,400" />
          </g>
        </svg>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              className="text-left"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-xl md:text-3xl font-bold mb-4 leading-tight heading-white">
                We are manufacturers of Calibration Systems, Testing Systems, and Measuring Systems
              </h2>
              <p className="text-base md:text-lg mb-6 text-gray-100">
                Precision engineering meets cutting-edge technology. Trust
                Reckonix for all your calibration, testing, and measurement
                needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-start">
                <Button
                  asChild
                  className="bg-yellow-500 text-black px-8 py-3 hover:bg-yellow-400 transform hover:scale-105 transition-all"
                >
                  <Link href="/products">View Products</Link>
                </Button>
                <Button
                  variant="outline"
                  className="border-2 border-white bg-white text-primary px-8 py-3 hover:bg-primary hover:text-white transition-all"
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
        {/* Diagonal Divider */}
        <svg className="absolute bottom-0 left-0 w-full h-16" viewBox="0 0 100 16" preserveAspectRatio="none">
          <polygon fill="#EAFAEA" points="0,16 100,0 100,16" />
        </svg>
      </section>

      {/* About Reckonix Section */}
      <section className="py-6 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <img
                src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
                alt="Advanced industrial precision equipment"
                className="rounded-xl shadow-lg w-full max-w-xs h-auto mx-auto"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-xl font-semibold mb-2 text-gray-900">
                About Reckonix
              </h2>
              <p className="text-gray-600 text-base mb-4 leading-relaxed">
                With over two decades of excellence in precision engineering,
                Reckonix stands as a global leader in manufacturing
                state-of-the-art calibration systems, testing equipment, and
                measuring instruments.
              </p>
              <p className="text-gray-600 text-base mb-4 leading-relaxed">
                Our commitment to innovation and quality has earned us the trust
                of industries worldwide. From automotive to aerospace,
                pharmaceuticals to manufacturing, we deliver solutions that
                ensure accuracy, reliability, and compliance.
              </p>
              <div className="flex flex-wrap gap-2">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-gray-900 rounded-full mr-2"></div>
                  <span className="font-semibold text-sm">ISO 9001:2015 Certified</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-gray-900 rounded-full mr-2"></div>
                  <span className="font-semibold text-sm">Global Presence</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-gray-900 rounded-full mr-2"></div>
                  <span className="font-semibold text-sm">24/7 Support</span>
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
            <h2 className="text-xl font-semibold mb-2 text-center">
              Our Product Categories
            </h2>
            <p className="text-xl text-gray-600">
              Precision instruments designed for excellence across industries
            </p>
          </motion.div>

          {/* One row per main category, each with one product per subcategory */}
          {["Calibration Systems", "Testing Systems", "Measuring Instruments"].map((category, catIdx) => (
            <motion.div
              key={category}
              className="mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 * catIdx }}
            >
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900">{category}</h3>
                <Button
                  variant="ghost"
                  asChild
                  className="text-gray-900 hover:text-gray-700"
                >
                  <Link href={`/products?category=${encodeURIComponent(category)}`}>
                    View All →
                  </Link>
                </Button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {getProductsByCategory(category).map((product, index) => (
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
          ))}
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
            <h2 className="text-lg font-semibold text-black mb-1">
              Trusted By Industry Leaders
            </h2>
            <p className="text-base text-black">
              Companies worldwide rely on our precision instruments
            </p>
          </motion.div>

          <div className="relative">
            <div className="flex space-x-12 scroll-logos">
              {featuredCustomers.concat(featuredCustomers).map((customer, index) => (
                <CustomerLogo key={index} name={customer.name} logoUrl={customer.logoUrl} />
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
            <h2 className="text-lg font-semibold text-black mb-1">
              Recent Company Events
            </h2>
            <p className="text-base text-black">
              Stay updated with our latest achievements and milestones
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.slice(0, 3).map((event: CompanyEvent, index: number) => (
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
                  <h3 className="font-bold text-gray-900 mb-3">
                    {event.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {event.description}
                  </p>
                  <div className="flex items-center text-gray-900 font-medium">
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
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
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
      <section className="relative py-16 bg-primary text-white overflow-hidden">
        {/* Geometric Line Pattern Overlay */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30" width="100%" height="100%" viewBox="0 0 1440 400" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g stroke="white" stroke-width="2" opacity="0.5">
            <polyline points="0,100 300,100 400,200 700,200" />
            <polyline points="200,0 500,0 600,100 900,100" />
            <polyline points="400,200 700,200 800,300 1100,300" />
            <polyline points="600,100 900,100 1000,200 1300,200" />
            <polyline points="800,300 1100,300 1200,400 1440,400" />
            <polyline points="1000,200 1300,200 1400,300 1440,300" />
            <polyline points="100,50 400,50 500,150 800,150" />
            <polyline points="300,150 600,150 700,250 1000,250" />
            <polyline points="500,250 800,250 900,350 1200,350" />
            <polyline points="700,50 1000,50 1100,150 1400,150" />
            <polyline points="900,150 1200,150 1300,250 1440,250" />
            <polyline points="1100,250 1400,250 1440,350 1440,350" />
            <polyline points="0,200 200,200 300,300 500,300" />
            <polyline points="200,300 400,300 500,400 700,400" />
            <polyline points="600,350 900,350 1000,400 1200,400" />
          </g>
        </svg>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-4 text-white">
              Our Achievements
            </h2>
            <p className="text-lg text-gray-100">
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
              <div className="text-lg text-gray-100">
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
              <div className="text-lg text-gray-100">Countries Served</div>
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
              <div className="text-lg text-gray-100">Satisfied Customers</div>
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
              <div className="text-lg text-gray-100">Team Members</div>
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
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
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

              <Button 
                className="bg-maroon-500 text-white px-8 py-3 hover:bg-maroon-600 transition-all transform hover:scale-105 w-full"
                onClick={async () => {
                  try {
                    const response = await fetch('/api/catalog/main-catalog');
                    if (response.ok) {
                      const catalog = await response.json();
                      window.open(catalog.pdfUrl, '_blank');
                    } else {
                      alert('Catalog not available. Please contact support.');
                    }
                  } catch (error) {
                    alert('Error downloading catalog. Please try again.');
                  }
                }}
              >
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
