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
                Gera's Imperium Gateway, office A-205,<br />
                opp. Bhosari Metro Station, Nashik Phata,<br />
                Pune, Maharashtra 411034
              </p>
              <p className="flex items-center">
                <Phone className="h-4 w-4 mr-2" />
                9175240313
              </p>
              <p className="flex items-center">
                <Mail className="h-4 w-4 mr-2" />
                sales@reckonix.com
              </p>
              <button
                className="text-maroon-400 hover:text-maroon-300 text-sm mt-2 flex items-center"
                onClick={() => window.open('https://www.google.com/maps/dir/?api=1&destination=Gera\'s+Imperium+Gateway,+office+A-205,+opp.+Bhosari+Metro+Station,+Nashik+Phata,+Pune,+Maharashtra+411034', '_blank')}
              >
                <MapPin className="h-4 w-4 mr-1" />
                Get Directions
              </button>
            </div>
          </div>

          {/* Workshop */}
          <div>
            <h4 className="font-semibold text-white mb-4 flex items-center">
              <Factory className="h-5 w-5 mr-2" />
              Workshop
            </h4>
            <div className="text-gray-300 text-sm space-y-2">
              <p>
                Plot No. BG/PAP3, Unit F2, MIDC,<br />
                MIDC Road, Bhosari,<br />
                Pune, Maharashtra 411026
              </p>
              <p className="flex items-center">
                <Phone className="h-4 w-4 mr-2" />
                9175240313
              </p>
              <p className="flex items-center">
                <Mail className="h-4 w-4 mr-2" />
                sales@reckonix.com
              </p>
              <button
                className="text-maroon-400 hover:text-maroon-300 text-sm mt-2 flex items-center"
                onClick={() => window.open('https://maps.app.goo.gl/g7b7fjFM8Wb4Ynrc8', '_blank')}
              >
                <MapPin className="h-4 w-4 mr-1" />
                Get Directions
              </button>
            </div>
          </div>
        </div>

        {/* Maps Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 pt-8 border-t border-gray-800">
          <div>
            <h5 className="font-semibold text-white mb-3">Corporate Office Location</h5>
            <div className="bg-gray-800 h-48 rounded-lg flex items-center justify-center mt-4">
              <iframe
                title="Corporate Office Map"
                src="https://www.google.com/maps?q=Gera's+Imperium+Gateway,+office+A-205,+opp.+Bhosari+Metro+Station,+Nashik+Phata,+Pune,+Maharashtra+411034&output=embed"
                width="100%"
                height="180"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
              ></iframe>
            </div>
          </div>
          <div>
            <h5 className="font-semibold text-white mb-3">Workshop Location</h5>
            <div className="bg-gray-800 h-48 rounded-lg flex items-center justify-center mt-4">
              <iframe
                title="Workshop Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3780.9394956883684!2d73.82740987417215!3d18.621790966076567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2b9e5c1527d61%3A0x22027655dc385965!2sReckonix%20(%20Work%20Shop%20)!5e0!3m2!1sen!2sin!4v1751660068426!5m2!1sen!2sin"
                width="100%"
                height="180"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
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
