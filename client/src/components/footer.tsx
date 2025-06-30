import { Link } from "wouter";
import { Building, Factory, Phone, Mail, MapPin, Facebook, Linkedin, Twitter, Youtube } from "lucide-react";

export default function Footer() {
  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "About Us", href: "/about" },
    { name: "Contact Us", href: "/contact" },
    { name: "Customers", href: "/customers" },
  ];

  const socialLinks = [
    { name: "LinkedIn", icon: Linkedin, href: "#" },
    { name: "Facebook", icon: Facebook, href: "#" },
    { name: "Twitter", icon: Twitter, href: "#" },
    { name: "YouTube", icon: Youtube, href: "#" },
  ];

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="font-cinzel text-xl font-bold text-white mb-4">RECKONIX</h3>
            <p className="text-gray-300 mb-4 text-sm leading-relaxed">
              Leading manufacturer of precision calibration systems, testing equipment, and measuring instruments. 
              Trusted by industries worldwide for over two decades.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    className="text-gray-400 hover:text-white transition-all"
                    aria-label={social.name}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-all"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Corporate Office */}
          <div>
            <h4 className="font-semibold text-white mb-4 flex items-center">
              <Building className="h-5 w-5 mr-2" />
              Corporate Office
            </h4>
            <div className="text-gray-300 text-sm space-y-2">
              <p>
                123 Industrial Boulevard<br />
                Tech Park, Mumbai 400001<br />
                Maharashtra, India
              </p>
              <p className="flex items-center">
                <Phone className="h-4 w-4 mr-2" />
                +91 22 1234 5678
              </p>
              <p className="flex items-center">
                <Mail className="h-4 w-4 mr-2" />
                info@reckonix.com
              </p>
              <button className="text-maroon-400 hover:text-maroon-300 text-sm mt-2 flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                Get Directions
              </button>
            </div>
          </div>

          {/* Manufacturing Unit */}
          <div>
            <h4 className="font-semibold text-white mb-4 flex items-center">
              <Factory className="h-5 w-5 mr-2" />
              Manufacturing Unit
            </h4>
            <div className="text-gray-300 text-sm space-y-2">
              <p>
                456 Manufacturing Lane<br />
                Industrial Zone, Pune 411001<br />
                Maharashtra, India
              </p>
              <p className="flex items-center">
                <Phone className="h-4 w-4 mr-2" />
                +91 20 9876 5432
              </p>
              <p className="flex items-center">
                <Mail className="h-4 w-4 mr-2" />
                factory@reckonix.com
              </p>
              <button className="text-maroon-400 hover:text-maroon-300 text-sm mt-2 flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                Get Directions
              </button>
            </div>
          </div>
        </div>

        {/* Maps Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 pt-8 border-t border-gray-800">
          <div>
            <h5 className="font-semibold text-white mb-3">Mumbai Office Location</h5>
            <div className="bg-gray-800 h-48 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-8 w-8 text-maroon-500 mx-auto mb-2" />
                <p className="text-gray-400 text-sm">Interactive Google Map</p>
                <p className="text-gray-500 text-xs">Corporate Office Location</p>
              </div>
            </div>
          </div>
          <div>
            <h5 className="font-semibold text-white mb-3">Pune Factory Location</h5>
            <div className="bg-gray-800 h-48 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-8 w-8 text-maroon-500 mx-auto mb-2" />
                <p className="text-gray-400 text-sm">Interactive Google Map</p>
                <p className="text-gray-500 text-xs">Manufacturing Unit Location</p>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-6 text-center">
          <p className="text-gray-400 text-sm">
            © 2024 Reckonix. All rights reserved. | Privacy Policy | Terms of Service
          </p>
        </div>
      </div>
    </footer>
  );
}
