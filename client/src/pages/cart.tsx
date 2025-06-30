import { useState } from "react";
import { motion } from "framer-motion";
import { useCart } from "../context/cart-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Minus, Plus, Trash2, ShoppingCart } from "lucide-react";
import { Link } from "wouter";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function Cart() {
  const { cartItems, updateQuantity, removeFromCart, clearCart } = useCart();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [quoteForm, setQuoteForm] = useState({
    customerName: "",
    companyName: "",
    email: "",
    phone: "",
    requirements: "",
    urgency: "Standard"
  });

  const submitQuote = useMutation({
    mutationFn: async (quoteData: any) => {
      return apiRequest("POST", "/api/quotes", quoteData);
    },
    onSuccess: () => {
      toast({
        title: "Quote Request Submitted",
        description: "We'll get back to you within 24 hours.",
        variant: "default"
      });
      clearCart();
      setQuoteForm({
        customerName: "",
        companyName: "",
        email: "",
        phone: "",
        requirements: "",
        urgency: "Standard"
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to submit quote request",
        variant: "destructive"
      });
    }
  });

  const handleSubmitQuote = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const quoteData = {
      ...quoteForm,
      products: cartItems.map(item => ({
        productId: item.product.id,
        productName: item.product.name,
        quantity: item.quantity,
        specifications: item.product.specifications || []
      }))
    };

    await submitQuote.mutateAsync(quoteData);
    setIsSubmitting(false);
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <ShoppingCart className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">Your cart is empty</h3>
            <p className="mt-1 text-sm text-gray-500">
              Start by adding some products to your cart to request a quote.
            </p>
            <div className="mt-6">
              <Button asChild>
                <Link href="/products">Browse Products</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-8">
            <h1 className="font-cinzel text-3xl font-bold text-gray-900">Quote Request Cart</h1>
            <p className="mt-2 text-gray-600">Review your selected products and submit a quote request</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Cart Items */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Selected Products ({cartItems.length})</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.product.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                      <img
                        src={item.product.imageUrl || "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200"}
                        alt={item.product.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{item.product.name}</h3>
                        <p className="text-sm text-gray-500">{item.product.category}</p>
                        <Badge variant="outline" className="mt-1">
                          {item.product.specifications?.[0] || "Standard"}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Quote Form */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Request Quote</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmitQuote} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="customerName">Full Name *</Label>
                        <Input
                          id="customerName"
                          value={quoteForm.customerName}
                          onChange={(e) => setQuoteForm({ ...quoteForm, customerName: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="companyName">Company Name *</Label>
                        <Input
                          id="companyName"
                          value={quoteForm.companyName}
                          onChange={(e) => setQuoteForm({ ...quoteForm, companyName: e.target.value })}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={quoteForm.email}
                          onChange={(e) => setQuoteForm({ ...quoteForm, email: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          value={quoteForm.phone}
                          onChange={(e) => setQuoteForm({ ...quoteForm, phone: e.target.value })}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="urgency">Urgency Level</Label>
                      <Select
                        value={quoteForm.urgency}
                        onValueChange={(value) => setQuoteForm({ ...quoteForm, urgency: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Low">Low Priority</SelectItem>
                          <SelectItem value="Standard">Standard</SelectItem>
                          <SelectItem value="High">High Priority</SelectItem>
                          <SelectItem value="Urgent">Urgent</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="requirements">Additional Requirements</Label>
                      <Textarea
                        id="requirements"
                        value={quoteForm.requirements}
                        onChange={(e) => setQuoteForm({ ...quoteForm, requirements: e.target.value })}
                        placeholder="Please describe any specific requirements, customizations, or technical specifications needed..."
                        rows={4}
                      />
                    </div>

                    <div className="flex space-x-4">
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-1 bg-blue-500 hover:bg-blue-600"
                      >
                        {isSubmitting ? "Submitting..." : "Submit Quote Request"}
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={clearCart}
                        disabled={isSubmitting}
                      >
                        Clear Cart
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}