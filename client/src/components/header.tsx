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
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <div>
                <h1 className="font-cinzel text-2xl font-bold text-maroon-500">RECKONIX</h1>
                <p className="text-xs text-gray-600 -mt-1">Test. Measure. Calibrator</p>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-3 py-2 text-sm font-medium transition-all ${
                    isActive(item.href)
                      ? "text-maroon-500 border-b-2 border-maroon-500"
                      : "text-gray-700 hover:text-maroon-500"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              
              {/* Cart Icon */}
              <div className="relative">
                <Button variant="ghost" size="sm" className="text-gray-700 hover:text-maroon-500">
                  <ShoppingCart className="h-5 w-5" />
                  {totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 bg-maroon-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {totalItems}
                    </span>
                  )}
                </Button>
              </div>

              <Button asChild className="bg-maroon-500 text-white hover:bg-maroon-600">
                <Link href="/admin/login">Admin</Link>
              </Button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-700 hover:text-maroon-500"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="md:hidden bg-white shadow-lg"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`block px-3 py-2 text-base font-medium rounded-md transition-all ${
                    isActive(item.href)
                      ? "text-maroon-500 bg-maroon-50"
                      : "text-gray-700 hover:text-maroon-500 hover:bg-gray-50"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              {/* Mobile Cart */}
              <div className="px-3 py-2 flex items-center justify-between">
                <span className="text-gray-700">Quote Items</span>
                <div className="flex items-center">
                  <ShoppingCart className="h-5 w-5 text-gray-500 mr-1" />
                  <span className="text-sm text-gray-600">{totalItems}</span>
                </div>
              </div>

              <Link
                href="/admin/login"
                className="block px-3 py-2 text-base font-medium text-white bg-maroon-500 rounded-md hover:bg-maroon-600 transition-all"
                onClick={() => setMobileMenuOpen(false)}
              >
                Admin Login
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
