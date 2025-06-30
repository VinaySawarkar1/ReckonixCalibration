
import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X, ShoppingCart } from "lucide-react";
import { useCart } from "../context/cart-context";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();
  const { cartItems } = useCart();

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Customers", href: "/customers" },
  ];

  const isActive = (href: string) => location === href;

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <motion.nav 
      className="bg-white/95 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-blue-100"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div 
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <Link href="/" className="flex-shrink-0">
              <div>
                <motion.h1 
                  className="font-cinzel text-2xl font-bold text-blue-600"
                  whileHover={{ color: "#2563eb" }}
                  transition={{ duration: 0.2 }}
                >
                  RECKONIX
                </motion.h1>
                <p className="text-xs text-gray-600 -mt-1">Test. Measure. Calibrator</p>
              </div>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navigation.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Link
                    href={item.href}
                    className={`relative px-3 py-2 text-sm font-medium transition-all duration-300 ${
                      isActive(item.href)
                        ? "text-blue-600"
                        : "text-gray-700 hover:text-blue-600"
                    }`}
                  >
                    {item.name}
                    {isActive(item.href) && (
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"
                        layoutId="activeTab"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </Link>
                </motion.div>
              ))}
              
              {/* Cart Icon with Animation */}
              <motion.div 
                className="relative"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href="/cart">
                  <Button variant="ghost" size="sm" className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300 flex items-center space-x-2">
                    <ShoppingCart className="h-5 w-5" />
                    <span className="font-medium">Cart</span>
                    {totalItems > 0 && (
                      <motion.span 
                        className="bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      >
                        {totalItems}
                      </motion.span>
                    )}
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <motion.div
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="ghost"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300"
              >
                <AnimatePresence mode="wait">
                  {mobileMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className="h-6 w-6" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="h-6 w-6" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </Button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="md:hidden bg-white/95 backdrop-blur-md shadow-lg border-t border-blue-100"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Link
                    href={item.href}
                    className={`block px-3 py-2 text-base font-medium rounded-md transition-all duration-300 ${
                      isActive(item.href)
                        ? "text-blue-600 bg-blue-50"
                        : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
              
              {/* Mobile Cart */}
              <motion.div 
                className="px-3 py-2"
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3, delay: navigation.length * 0.1 }}
              >
                <Link
                  href="/cart"
                  className="flex items-center justify-between text-gray-700 hover:text-blue-600 transition-all duration-300"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="font-medium">Cart</span>
                  <div className="flex items-center">
                    <ShoppingCart className="h-5 w-5 mr-1" />
                    <span className="text-sm">{totalItems}</span>
                  </div>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
