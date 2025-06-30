import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingCart, Eye } from "lucide-react";
import { useCart } from "../context/cart-context";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import type { Product } from "@shared/schema";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product, 1);
    toast({
      title: "Added to Quote",
      description: `${product.name} has been added to your quote request.`,
    });
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Calibration Systems":
        return "bg-maroon-100 text-maroon-600";
      case "Testing Systems":
        return "bg-blue-100 text-blue-600";
      case "Measuring Instruments":
        return "bg-green-100 text-green-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all h-full">
        <Link href={`/products/${product.id}`}>
          <div className="relative">
            <img 
              src={product.imageUrl} 
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            <div className="absolute top-4 right-4">
              <div className="bg-white/90 rounded-full p-2 flex items-center text-xs text-gray-600">
                <Eye className="h-3 w-3 mr-1" />
                {product.views}
              </div>
            </div>
          </div>
        </Link>
        
        <CardContent className="p-6 flex flex-col h-full">
          <div className="mb-3">
            <Badge className={getCategoryColor(product.category)}>
              {product.category.replace(" Systems", "").replace(" Instruments", "")}
            </Badge>
          </div>
          
          <Link href={`/products/${product.id}`} className="flex-1">
            <h4 className="font-semibold text-lg text-gray-900 mb-2 hover:text-maroon-500 transition-colors line-clamp-2">
              {product.name}
            </h4>
            <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
              {product.shortDescription}
            </p>
          </Link>
          
          <div className="flex justify-between items-center mt-auto pt-4 border-t">
            <Link 
              href={`/products/${product.id}`}
              className="text-maroon-500 hover:text-maroon-600 font-medium text-sm transition-colors"
            >
              View Details
            </Link>
            <Button 
              onClick={handleAddToCart}
              size="sm"
              className="bg-maroon-500 text-white hover:bg-maroon-600 transition-all"
            >
              <ShoppingCart className="h-3 w-3 mr-1" />
              Add to Quote
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
