import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X, ShoppingCart, Home as HomeIcon, Box, Info, Mail, Users, Building } from "lucide-react";
import { useCart } from "../context/cart-context";
import { motion, AnimatePresence } from "framer-motion";
import TopNavbar from "./top-navbar";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();
  const { cartItems } = useCart();

  const navigation = [
    { name: "Home", href: "/", icon: <HomeIcon className="h-5 w-5 mr-2 text-primary" /> },
    { name: "Products", href: "/products", icon: <Box className="h-5 w-5 mr-2 text-primary" /> },
    { name: "About", href: "/about", icon: <Info className="h-5 w-5 mr-2 text-primary" /> },
    { name: "Contact", href: "/contact", icon: <Mail className="h-5 w-5 mr-2 text-primary" /> },
    { name: "Customers", href: "/customers", icon: <Users className="h-5 w-5 mr-2 text-primary" /> },
    { name: "Gallery", href: "/gallery", icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2 text-primary"><path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5V6a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 6v12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18V7.5zm0 0L8.25 12.75a2.25 2.25 0 0 0 3.18 0l2.07-2.07a2.25 2.25 0 0 1 3.18 0L21 15.75" /></svg> },
    { name: "Career", href: "/career", icon: <Users className="h-5 w-5 mr-2 text-primary" /> },
    { name: "Cart", href: "/cart", icon: <ShoppingCart className="h-5 w-5 mr-2 text-primary" /> },
  ];

  const isActive = (href: string) => location === href;

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <nav className="shadow-2xl sticky top-0 z-50" style={{ background:  '#f9f9f9' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="flex-shrink-0">
                <div>
                  <h1 className="text-2xl font-bold" style={{ fontFamily: 'Cinzel Decorative, serif', color: '#800000' }}>
                    RECKONIX
                  </h1>
                  <p className="text-xs -mt-1" style={{ fontFamily: 'Cinzel Decorative, serif', color: '#800000' }}>
                    Test. Measure. Calibrator
                  </p>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-6 flex items-baseline space-x-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`px-2 py-1 text-xs font-medium flex items-center transition-all ${
                      isActive(item.href)
                        ? "text-primary border-b-2 border-primary"
                        : "text-gray-700 hover:text-primary"
                    }`}
                  >
                    {item.icon}
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-white hover:text-primary"
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </nav>
      {location !== '/products' && <TopNavbar />}
      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="md:hidden" style={{ background: '#f5f5f5' }}
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
                  className={`block px-3 py-2 text-base font-medium rounded-md flex items-center transition-all ${
                    isActive(item.href)
                      ? "text-primary bg-gray-100"
                      : "text-gray-700 hover:text-primary hover:bg-gray-50"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.icon}
                  {item.name}
                </Link>
              ))}

              {/* Mobile Cart */}
              <div className="px-3 py-2 flex items-center justify-between">
                <span className="text-gray-700">Quote Items</span>
                <div className="flex items-center"></div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
