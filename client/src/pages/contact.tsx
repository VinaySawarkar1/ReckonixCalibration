import { useState } from "react";
import { motion } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Building, Factory, Phone, Mail, MapPin, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const { toast } = useToast();

  const submitMessage = useMutation({
    mutationFn: (data: typeof formData) => apiRequest("POST", "/api/messages", data),
    onSuccess: () => {
      toast({
        title: "Message Sent Successfully",
        description: "Thank you for contacting us. We'll get back to you soon!",
      });
      setFormData({ name: "", email: "", phone: "", message: "" });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    submitMessage.mutate(formData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-maroon-500 text-white py-6 overflow-hidden">
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
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-cinzel text-3xl md:text-4xl font-bold mb-6 heading-white">Get In Touch</h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Ready to discuss your calibration and testing needs? We're here to help you find the perfect solution.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-cinzel text-3xl font-bold text-gray-900 mb-8">Contact Information</h2>
              
              <div className="space-y-8">
                {/* Existing Corporate Office */}
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-maroon-500 rounded-full flex items-center justify-center mr-6 flex-shrink-0">
                    <Building className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900 mb-2">Corporate Office (Gera's Imperium Gateway)</h3>
                    <p className="text-gray-600 mb-2">
                      Gera's Imperium Gateway, office A-205,<br />
                      opp. Bhosari Metro Station, Nashik Phata,<br />
                      Pune, Maharashtra 411034
                    </p>
                    <p className="text-gray-600"><Phone className="inline h-4 w-4 mr-1" /> 9175240313</p>
                    <p className="text-gray-600"><Mail className="inline h-4 w-4 mr-1" /> sales@reckonix.com</p>
                    <a
                      href="https://www.google.com/maps/dir/?api=1&destination=Gera's+Imperium+Gateway,+office+A-205,+opp.+Bhosari+Metro+Station,+Nashik+Phata,+Pune,+Maharashtra+411034"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-maroon-500 hover:underline text-sm flex items-center mt-2"
                    >
                      <MapPin className="h-4 w-4 mr-1" /> Get Directions
                    </a>
                  </div>
                </div>
                {/* Workshop Address */}
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mr-6 flex-shrink-0">
                    <Factory className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900 mb-2">Workshop</h3>
                    <p className="text-gray-600 mb-2">
                      Plot No. BG/PAP3, Unit F2, MIDC,<br />
                      MIDC Road, Bhosari,<br />
                      Pune, Maharashtra 411026
                    </p>
                    <p className="text-gray-600"><Phone className="inline h-4 w-4 mr-1" /> 9175240313</p>
                    <p className="text-gray-600"><Mail className="inline h-4 w-4 mr-1" /> sales@reckonix.com</p>
                    <a
                      href="https://maps.app.goo.gl/g7b7fjFM8Wb4Ynrc8"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-maroon-500 hover:underline text-sm flex items-center mt-2"
                    >
                      <MapPin className="h-4 w-4 mr-1" /> Get Directions
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mr-6 flex-shrink-0">
                    <Mail className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900 mb-2">Sales & Support</h3>
                    <p className="text-gray-600">
                      <strong>Sales:</strong> sales@reckonix.com<br />
                      <strong>Support:</strong> support@reckonix.com<br />
                      <strong>General:</strong> info@reckonix.com
                    </p>
                  </div>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="mt-8">
                <h3 className="font-semibold text-lg text-gray-900 mb-4">Our Locations</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Corporate Office Map */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Corporate Office (Gera's Imperium Gateway)</h4>
                    <iframe
                      title="Corporate Office Map"
                      src="https://www.google.com/maps?q=Gera's+Imperium+Gateway,+office+A-205,+opp.+Bhosari+Metro+Station,+Nashik+Phata,+Pune,+Maharashtra+411034&output=embed"
                      width="100%"
                      height="200"
                      style={{ border: 0 }}
                      allowFullScreen={true}
                      loading="lazy"
                    ></iframe>
                    <a
                      href="https://www.google.com/maps/dir/?api=1&destination=Gera's+Imperium+Gateway,+office+A-205,+opp.+Bhosari+Metro+Station,+Nashik+Phata,+Pune,+Maharashtra+411034"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-maroon-500 hover:underline text-sm flex items-center mt-2"
                    >
                      <MapPin className="h-4 w-4 mr-1" /> Get Directions
                    </a>
                  </div>
                  {/* Workshop Map */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Workshop</h4>
                    <iframe
                      title="Workshop Map"
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3780.9394956883684!2d73.82740987417215!3d18.621790966076567!2m3!1f0!2f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2b9e5c1527d61%3A0x22027655dc385965!2sReckonix%20(%20Work%20Shop%20)!5e0!3m2!1sen!2sin!4v1751660068426!5m2!1sen!2sin"
                      width="100%"
                      height="200"
                      style={{ border: 0 }}
                      allowFullScreen={true}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                    <a
                      href="https://maps.app.goo.gl/g7b7fjFM8Wb4Ynrc8"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-maroon-500 hover:underline text-sm flex items-center mt-2"
                    >
                      <MapPin className="h-4 w-4 mr-1" /> Get Directions
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="shadow-lg">
                <CardContent className="p-8">
                  <h3 className="font-cinzel text-2xl font-bold text-gray-900 mb-6">Send us a Message</h3>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="name" className="text-sm font-medium text-gray-700 mb-2 block">
                          Name *
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Your full name"
                          className="h-12 focus:ring-maroon-500 focus:border-maroon-500"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email" className="text-sm font-medium text-gray-700 mb-2 block">
                          Email *
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="your.email@company.com"
                          className="h-12 focus:ring-maroon-500 focus:border-maroon-500"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="phone" className="text-sm font-medium text-gray-700 mb-2 block">
                        Phone
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+91 98765 43210"
                        className="h-12 focus:ring-maroon-500 focus:border-maroon-500"
                      />
                    </div>

                    <div>
                      <Label htmlFor="message" className="text-sm font-medium text-gray-700 mb-2 block">
                        Message *
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Tell us about your requirements..."
                        className="focus:ring-maroon-500 focus:border-maroon-500"
                      />
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full bg-maroon-500 text-white px-6 py-3 h-12 hover:bg-maroon-600 transition-all transform hover:scale-[1.02]"
                      disabled={submitMessage.isPending}
                    >
                      {submitMessage.isPending ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
