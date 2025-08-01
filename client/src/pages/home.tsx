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
import { useCategories } from "@/context/category-context";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

  const { categories, loading } = useCategories();
  const [activeTab, setActiveTab] = useState("");

  // Record website view
  useEffect(() => {
    apiRequest("POST", "/api/analytics/website-views");
  }, []);

  // Set default active tab when categories load
  useEffect(() => {
    if (categories.length > 0 && !activeTab) {
      setActiveTab(categories[0].name);
    }
  }, [categories, activeTab]);

  const safeProducts = Array.isArray(products) ? products : [];
  // Remove hardcoded subcategories. Use fetched categories for category sections.
  // Example usage: categories.map(category => ...)

  const getProductsByCategory = (category: string) => {
    const categoryProducts = safeProducts.filter((p: Product) => p.category === category);
    
    // Products are already sorted by rank from the backend
    // Get up to 6 products for the category (more for better showcase)
    const selectedProducts = categoryProducts.slice(0, 6);
    
    return selectedProducts;
  };

  // Helper to get up to 4 featured products for a category
  const getFeaturedProductsByCategory = (category: string) => {
    return safeProducts
      .filter((p: Product) => p.category === category && p.homeFeatured)
      .slice(0, 4);
  };

  const featuredCustomers = customers.filter((customer: Customer) => customer.featured);

  const whyChooseUsItems = [
    {
      icon: Medal,
      title: "Quality",
      description:
        "Manufacturing with rigorous quality control processes and high accuracy standards",
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "Cutting-edge technology and continuous product development",
    },
    {
      icon: Globe,
      title: "Pan India Service",
      description: "Serving customers across India with comprehensive support",
    },
    {
      icon: Headphones,
      title: "Fast Support",
      description: "93% response rate with dedicated technical support",
    },
  ];

  const [newsOpen, setNewsOpen] = useState(false);
  useEffect(() => {
    setNewsOpen(true);
  }, []);

  // Sort categories for featured products section
  const categoryOrder = [
    'Calibration Systems',
    'Metrology Systems',
    'Measuring Instruments',
  ];
  const sortedCategories = [...categories].sort((a, b) => {
    const aIndex = categoryOrder.indexOf(a.name);
    const bIndex = categoryOrder.indexOf(b.name);
    if (aIndex === -1 && bIndex === -1) return a.name.localeCompare(b.name);
    if (aIndex === -1) return 1;
    if (bIndex === -1) return -1;
    return aIndex - bIndex;
  });

  return (
    <div>
      {/* Hero Section */}
      <section className="relative text-white py-20 overflow-hidden" style={{ background: 'transparent', minHeight: '60vh' }}>
        {/* Visible dark blurred effect over video, behind text */}
        <div className="absolute inset-0 z-10" style={{ background: 'rgba(10,10,10,0.7)', filter: 'blur(12px)' }} />
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
          style={{ objectFit: 'cover', minHeight: '100%', minWidth: '100%' }}
        >
          <source src="/hero-bg.mp4" type="video/mp4" />
        </video>
        {/* Optional: subtle overlay for text readability (can be removed if too strong) */}
        {/* <div className="absolute inset-0 bg-black bg-opacity-20 z-20 pointer-events-none" /> */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-30">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 py-12">
            <motion.div
              className="w-full md:w-1/2 text-left"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6 drop-shadow-lg" style={{ color: '#fff' }}>
                We are manufacturers of Calibration Systems, Testing Systems, and Measuring Systems.
              </h1>
            </motion.div>
            <motion.div
              className="w-full md:w-1/2 text-left md:text-right"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <p className="text-xl md:text-2xl mb-8 drop-shadow" style={{ color: '#fff' }}>
                Precision engineering meets cutting-edge technology. Trust Reckonix for all your calibration, testing, and measurement needs across Glob.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 md:justify-end mt-8">
                <Button
                  asChild
                  className="bg-[#800000] text-white px-8 py-3 hover:bg-[#6b0000] transform hover:scale-105 transition-all text-lg font-semibold shadow-lg"
                >
                  <Link href="/products">View Products</Link>
                </Button>
                <Button
                  variant="outline"
                  className="border-2 border-white bg-transparent text-white px-8 py-3 hover:bg-white hover:text-[#800000] transition-all text-lg font-semibold shadow-lg"
                  onClick={() => {
                    const catalogSection = document.getElementById('download-catalog');
                    catalogSection?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <Download className="mr-2 h-5 w-5" />
                  Download Catalog
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Reckonix Section */}
      <section className="py-6 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <img
                src="https://images.unsplash.com/photo-1606857521015-7f9fcf423740?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Advanced industrial precision equipment"
                className="rounded-xl shadow-lg w-full max-w-md h-auto mx-auto"
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
                Reckonix is a leading manufacturer and supplier of Calibration Systems, Testing Systems, and Measuring Systems. With a strong commitment to quality and innovation, we have established ourselves as a trusted name in the industry. Our products are designed to meet the highest standards of accuracy and reliability, serving a wide range of industries including automotive, aerospace, pharmaceuticals, and manufacturing.
              </p>
              <p className="text-gray-600 text-base mb-4 leading-relaxed">
                Our state-of-the-art manufacturing facility is equipped with advanced technology and a skilled workforce, enabling us to deliver customized solutions to our clients with a dedicated team providing 24/7 support to our customers.
              </p>
              <p className="text-gray-600 text-base mb-4 leading-relaxed">
                At Reckonix, we believe in continuous improvement and strive to exceed customer expectations through our commitment to excellence, integrity, and customer satisfaction. Our mission is to deliver world-class testing, measuring, and calibration systems, ensuring a seamless customer experience and building a strong global presence. We are proud to partner with industry leaders and to be recognized for our innovation, reliability, and service excellence.
              </p>
             
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Featured Products
            </h2>
            <p className="text-lg text-gray-600">
              Discover our precision instruments and calibration systems
            </p>
          </motion.div>
          <div className="space-y-12">
            {sortedCategories.map((category) => {
              const featuredProducts = getFeaturedProductsByCategory(category.name);
              if (featuredProducts.length === 0) return null;
              return (
                <div key={category.name}>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-2xl font-bold text-gray-900">{category.name}</h3>
                <Button
                  variant="ghost"
                  asChild
                  className="text-gray-900 hover:text-gray-700"
                >
                      <Link href={`/products?category=${encodeURIComponent(category.name)}`}>
                    View All →
                  </Link>
                </Button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {featuredProducts.map((product, index) => (
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
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="py-16 bg-white overflow-hidden">
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
      <section className="py-16 bg-white">
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
                    src={
                      index === 0
                        ? "https://images.unsplash.com/photo-1644637722708-74f8cdd75ce9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGV4cG98ZW58MHx8MHx8fDA%3D"
                        : index === 1
                        ? "https://images.unsplash.com/photo-1632383380175-812d44ec112b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZXhwb3xlbnwwfHwwfHx8MA%3D%3D"
                        : event.imageUrl
                    }
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
                <IconCard
                  icon={item.icon}
                  title={item.title}
                  description={item.description}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Stats Section */}
      <section className="relative py-16 bg-[#800000] text-white overflow-hidden">
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
      <section id="download-catalog" className="py-16 bg-white">
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
                className="bg-[#800000] text-white px-8 py-3 hover:bg-[#6b0000] transition-all transform hover:scale-105 w-full"
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
      {/* Highly Visible Section Divider */}
      <div className="w-full -mb-1">
        <svg viewBox="0 0 1440 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-24 drop-shadow-2xl">
          <path d="M0,90 Q720,200 1440,90 L1440,180 L0,180 Z" fill="#800000" />
        </svg>
      </div>
    </div>
  );
}
