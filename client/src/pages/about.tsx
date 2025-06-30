import { motion } from "framer-motion";
import { Building, Factory, Users, Globe } from "lucide-react";

export default function About() {
  const teamMembers = [
    { name: "Dr. Rajesh Kumar", role: "CEO & Founder", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400" },
    { name: "Priya Sharma", role: "CTO", image: "https://images.unsplash.com/photo-1494790108755-2616b169dcd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400" },
    { name: "Amit Patel", role: "Head of Engineering", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400" },
    { name: "Sarah Johnson", role: "VP International Sales", image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400" },
    { name: "Dr. Michael Chen", role: "R&D Director", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400" },
    { name: "Lisa Anderson", role: "Quality Assurance Manager", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400" }
  ];

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
            <h1 className="font-cinzel text-4xl md:text-5xl font-bold mb-6">About Reckonix</h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Two decades of precision engineering excellence, delivering world-class calibration, testing, and measuring solutions
            </p>
          </motion.div>
        </div>
      </section>

      {/* Company Description */}
      <section className="py-16">
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
                alt="Reckonix manufacturing facility" 
                className="rounded-xl shadow-lg w-full h-auto" 
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-cinzel text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                Founded in 2002, Reckonix began as a small precision instrument manufacturer with a vision to revolutionize calibration and testing technologies. Over two decades, we have grown into a global leader, serving industries across 25+ countries with our cutting-edge solutions.
              </p>
              <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                Our commitment to innovation, quality, and customer satisfaction has driven us to establish state-of-the-art manufacturing facilities and develop partnerships with leading research institutions worldwide.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                Today, Reckonix stands at the forefront of precision engineering, with over 500 calibration labs setup globally and a team of 150+ dedicated professionals working tirelessly to advance measurement science.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-cinzel text-3xl font-bold text-gray-900 mb-4">Vision & Mission</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div 
              className="bg-maroon-50 rounded-xl p-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-maroon-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Globe className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-cinzel text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
                <p className="text-gray-700 leading-relaxed">
                  To be the global leader in precision measurement technology, enabling industries worldwide to achieve unprecedented levels of accuracy, efficiency, and reliability in their operations.
                </p>
              </div>
            </motion.div>

            <motion.div 
              className="bg-blue-50 rounded-xl p-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-cinzel text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
                <p className="text-gray-700 leading-relaxed">
                  To deliver innovative, high-quality calibration and testing solutions that exceed customer expectations while fostering technological advancement and contributing to global industrial progress.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Locations */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-cinzel text-3xl font-bold text-gray-900 mb-4">Our Locations</h2>
            <p className="text-lg text-gray-600">Strategic locations to serve our global customer base</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div 
              className="bg-white rounded-xl shadow-lg p-8"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="flex items-start">
                <div className="w-12 h-12 bg-maroon-500 rounded-full flex items-center justify-center mr-6 flex-shrink-0">
                  <Building className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-xl text-gray-900 mb-3">Corporate Office</h3>
                  <p className="text-gray-600 mb-4">
                    123 Industrial Boulevard<br />
                    Tech Park, Mumbai 400001<br />
                    Maharashtra, India
                  </p>
                  <p className="text-gray-600 mb-2"><strong>Phone:</strong> +91 22 1234 5678</p>
                  <p className="text-gray-600 mb-4"><strong>Email:</strong> info@reckonix.com</p>
                  <div className="bg-gray-200 h-48 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <Globe className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-500 text-sm">Google Maps Integration</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="bg-white rounded-xl shadow-lg p-8"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="flex items-start">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mr-6 flex-shrink-0">
                  <Factory className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-xl text-gray-900 mb-3">Manufacturing Unit</h3>
                  <p className="text-gray-600 mb-4">
                    456 Manufacturing Lane<br />
                    Industrial Zone, Pune 411001<br />
                    Maharashtra, India
                  </p>
                  <p className="text-gray-600 mb-2"><strong>Phone:</strong> +91 20 9876 5432</p>
                  <p className="text-gray-600 mb-4"><strong>Email:</strong> factory@reckonix.com</p>
                  <div className="bg-gray-200 h-48 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <Globe className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-500 text-sm">Google Maps Integration</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-cinzel text-3xl font-bold text-gray-900 mb-4">Our Leadership Team</h2>
            <p className="text-lg text-gray-600">Meet the experts driving innovation at Reckonix</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div 
                key={member.name}
                className="bg-gray-50 rounded-xl p-6 text-center hover:shadow-lg transition-all"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="font-semibold text-lg text-gray-900 mb-2">{member.name}</h3>
                <p className="text-maroon-500 font-medium">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
