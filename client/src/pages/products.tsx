import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ProductCard from "../components/product-card";
import { Search } from "lucide-react";
import type { Product } from "../../../shared/schema";
import { fetchCategories, Category as CategoryType } from "@/lib/utils";

// Remove hardcoded categories and subcategories. Use dynamic fetch.

export default function Products() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [categories, setCategories] = useState<CategoryType[]>([]);
  useEffect(() => {
    fetchCategories().then(setCategories);
  }, []);

  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const safeProducts = Array.isArray(products) ? products : [];

  const filteredProducts = safeProducts.filter((product: Product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.shortDescription.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    const matchesSubcategory = !selectedSubcategory || product.subcategory === selectedSubcategory;
    return matchesSearch && matchesCategory && matchesSubcategory;
  });

  const categoryNames = ["All", ...categories.map(cat => cat.name)];
  const groupedProducts = categories.reduce((acc, cat) => {
    acc[cat.name] = filteredProducts.filter((product: Product) => product.category === cat.name);
    return acc;
  }, {} as Record<string, Product[]>);
  const groupedBySubcategory = (category: string) => {
    const subcats = categories.find(cat => cat.name === category)?.subcategories || [];
    return subcats.reduce((acc, subcat) => {
      acc[subcat] = filteredProducts.filter((product: Product) => product.subcategory === subcat);
      return acc;
    }, {} as Record<string, Product[]>);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-maroon-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      {/* Header - moved outside container for full width */}
      <motion.div 
        className="relative bg-maroon-500 text-white py-6 overflow-hidden"
        style={{ borderRadius: 0, marginLeft: 0, marginRight: 0 }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Geometric Line Pattern Overlay */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30" width="100%" height="100%" viewBox="0 0 1440 400" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g stroke="white" strokeWidth="2" opacity="0.5">
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
          <div className="text-center">
            <h1 className="font-cinzel text-3xl font-bold mb-6 heading-white">Our Products</h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">Discover our comprehensive range of precision instruments</p>
          </div>
        </div>
      </motion.div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Minimalistic Search and Filter */}
        <motion.div 
          className="bg-white rounded-lg shadow-lg p-2 mb-8 w-full"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="flex flex-col sm:flex-row gap-2 items-center w-full">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 h-8 text-sm border-gray-300 rounded w-full"
              />
            </div>
            <div className="flex gap-1">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  className={`px-2 py-1 rounded border text-xs font-medium transition-all ${selectedCategory === cat.name ? 'bg-maroon-500 text-white border-maroon-500' : 'bg-white text-maroon-700 border-gray-300 hover:bg-maroon-50'}`}
                  onClick={() => {
                    setSelectedCategory(cat.name);
                    setSelectedSubcategory("");
                  }}
                >
                  {cat.name}
                </button>
              ))}
            </div>
            {selectedCategory && selectedCategory !== "All" && (
              <select
                className="border rounded px-2 py-1 text-xs min-w-[120px]"
                value={selectedSubcategory}
                onChange={e => setSelectedSubcategory(e.target.value)}
              >
                <option value="">All Subcategories</option>
                {(categories.find(cat => cat.name === selectedCategory)?.subcategories || []).map(subcat => (
                  <option key={subcat} value={subcat}>{subcat}</option>
                ))}
              </select>
            )}
          </div>
        </motion.div>
      </div>

        {/* Results Summary */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p className="text-gray-600">
            Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
            {searchTerm && ` for "${searchTerm}"`}
            {selectedCategory !== "All" && ` in ${selectedCategory}`}
          </p>
        </motion.div>

        {/* Products Display */}
        {selectedCategory === "All" ? (
          // Show products grouped by category
          <div className="space-y-16">
            {Object.entries(groupedProducts).map(([category, categoryProducts], categoryIndex) => (
              categoryProducts.length > 0 && (
                <motion.div 
                  key={category}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                >
                  <h2 className="font-cinzel text-2xl font-bold text-maroon-500 mb-8">{category}</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {categoryProducts.map((product: Product, index: number) => (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, delay: index * 0.05 }}
                      >
                        <ProductCard product={product} />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )
            ))}
          </div>
        ) : (
          // Show products grouped by subcategory for specific category
          <div className="space-y-12">
            {Object.entries(groupedBySubcategory(selectedCategory)).map(([subcat, subcatProducts], subcatIndex) => (
              subcatProducts.length > 0 && (
                <motion.div
                  key={subcat}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: subcatIndex * 0.1 }}
                >
                  <h3 className="font-cinzel text-xl font-bold text-maroon-600 mb-6">{subcat}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {subcatProducts.map((product: Product, index: number) => (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, delay: index * 0.05 }}
                      >
                        <ProductCard product={product} />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )
            ))}
          </div>
        )}

        {/* No Results */}
        {filteredProducts.length === 0 && (
          <motion.div 
            className="text-center py-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-gray-400 mb-4">
              <Search className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search terms or browse different categories
            </p>
            <Button 
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("All");
              }}
              className="bg-maroon-500 hover:bg-maroon-600"
            >
              Clear Filters
            </Button>
          </motion.div>
        )}
    </div>
  );
}
