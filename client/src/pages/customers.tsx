import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import CustomerLogo from "../components/customer-logo";

export default function Customers() {
  const { data: customers = [] } = useQuery({
    queryKey: ["/api/customers"],
  });

  // Group customers by industry
  const customersByIndustry = customers.reduce((acc, customer) => {
    if (!acc[customer.industry]) {
      acc[customer.industry] = [];
    }
    acc[customer.industry].push(customer);
    return acc;
  }, {} as Record<string, typeof customers>);

  const industryIcons: Record<string, string> = {
    "Aerospace & Defense": "✈️",
    "Automotive Manufacturing": "🚗", 
    "Pharmaceutical & Biotech": "🧬",
    "Oil & Gas": "⚡",
    "Electronics & Semiconductors": "💻",
    "Research Institutions": "🔬"
  };

  const customerCategories = Object.keys(customersByIndustry).map(industry => ({
    title: industry,
    description: `Leading ${industry.toLowerCase()} companies trust our precision instruments`,
    icon: industryIcons[industry] || "🏭",
    customers: customersByIndustry[industry]
  }));

  

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="hero-bg text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-cinzel text-4xl md:text-5xl font-bold mb-6">Our Customers</h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Trusted by industry leaders worldwide for precision, reliability, and innovation
            </p>
          </motion.div>
        </div>
      </section>

      {/* Customer Categories */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-cinzel text-3xl font-bold text-gray-900 mb-4">Industries We Serve</h2>
            <p className="text-lg text-gray-600">Our solutions span across diverse industries and applications</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {customerCategories.map((category, index) => (
              <motion.div 
                key={category.title}
                className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-all transform hover:-translate-y-1"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="text-4xl mb-4">{category.icon}</div>
                <h3 className="font-cinzel text-xl font-bold text-gray-900 mb-3">{category.title}</h3>
                <p className="text-gray-600">{category.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Logos Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-cinzel text-3xl font-bold text-gray-900 mb-4">Trusted Partners</h2>
            <p className="text-lg text-gray-600">Companies that rely on our precision instruments</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {customers.map((customer, index) => (
              <motion.div
                key={customer.id}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <CustomerLogo name={customer.name} logoUrl={customer.logoUrl} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-cinzel text-3xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
            <p className="text-lg text-gray-600">Real feedback from industry professionals</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div 
              className="bg-white rounded-xl shadow-lg p-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="text-maroon-500 mb-4">⭐⭐⭐⭐⭐</div>
              <p className="text-gray-700 mb-6 italic">
                "Reckonix instruments have significantly improved our calibration accuracy and efficiency. Their support team is exceptional."
              </p>
              <div className="border-t pt-4">
                <p className="font-semibold text-gray-900">Quality Manager</p>
                <p className="text-gray-600">Aerospace Manufacturing</p>
              </div>
            </motion.div>

            <motion.div 
              className="bg-white rounded-xl shadow-lg p-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="text-maroon-500 mb-4">⭐⭐⭐⭐⭐</div>
              <p className="text-gray-700 mb-6 italic">
                "The precision and reliability of Reckonix testing systems have made them an integral part of our quality control process."
              </p>
              <div className="border-t pt-4">
                <p className="font-semibold text-gray-900">R&D Director</p>
                <p className="text-gray-600">Automotive Industry</p>
              </div>
            </motion.div>

            <motion.div 
              className="bg-white rounded-xl shadow-lg p-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="text-maroon-500 mb-4">⭐⭐⭐⭐⭐</div>
              <p className="text-gray-700 mb-6 italic">
                "Outstanding calibration equipment with excellent technical support. Reckonix has been our trusted partner for years."
              </p>
              <div className="border-t pt-4">
                <p className="font-semibold text-gray-900">Lab Manager</p>
                <p className="text-gray-600">Research Institution</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 hero-bg text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-cinzel text-3xl font-bold mb-6">Join Our Growing Family</h2>
            <p className="text-xl text-gray-200 mb-8">
              Become part of the global network of companies that trust Reckonix for their precision instrument needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="/contact"
                className="bg-yellow-500 text-black px-8 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-all transform hover:scale-105 inline-block"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Contact Us Today
              </motion.a>
              <motion.a
                href="/products"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-maroon-500 transition-all inline-block"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Our Products
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
