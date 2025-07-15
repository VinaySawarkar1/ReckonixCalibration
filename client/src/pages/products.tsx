import { useState, useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ProductCard from "../components/product-card";
import { Search } from "lucide-react";
import type { Product } from "../../../shared/schema";
import { useCategories } from "@/context/category-context";
import { Gauge, Ruler, Thermometer, Activity, Weight, Microscope, Compass, Wrench, ClipboardList, Layers, ListChecks, BookOpen, FileText, Settings, ChevronDown, ChevronUp } from "lucide-react";
import { useRef } from "react";

// Remove hardcoded categories and subcategories. Use dynamic fetch.

export default function Products() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const { categories, loading } = useCategories();

  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const safeProducts = Array.isArray(products) ? products : [];

  // Build sidebar category structure dynamically from fetched categories
  const sidebar = categories.map(category => ({
    name: category.name,
    subcategories: category.subcategories || []
  }));
  // Sidebar selection logic
  const [activeMain, setActiveMain] = useState("");
  const [activeSub, setActiveSub] = useState("");
  // Sidebar expand/collapse state
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  useEffect(() => {
    if (categories.length > 0) {
      setActiveMain(categories[0].name);
      setExpanded({ [categories[0].name]: true });
    }
  }, [categories]);
  const toggleExpand = (mainName: string) => {
    setExpanded(prev => ({ ...prev, [mainName]: !prev[mainName] }));
  };
  // Filter products based on sidebar selection
  const sidebarFilteredProducts = safeProducts.filter(product => {
    if (!activeMain) return true;
    if (activeMain && !activeSub) return product.category === activeMain;
    return product.category === activeMain && product.subcategory === activeSub;
  }).filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.shortDescription.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  // Sidebar icon mapping for main categories (maroon theme)
  const mainIcons = {
    "Calibration System": (isActive: boolean, isHovered: boolean) => <Gauge className={`inline-block mr-2 h-5 w-5 ${isActive || isHovered ? 'text-white' : 'text-black'}`} />,
    "Metrology Systems": (isActive: boolean, isHovered: boolean) => <Microscope className={`inline-block mr-2 h-5 w-5 ${isActive || isHovered ? 'text-white' : 'text-black'}`} />,
    "Measuring Systems": (isActive: boolean, isHovered: boolean) => <Ruler className={`inline-block mr-2 h-5 w-5 ${isActive || isHovered ? 'text-white' : 'text-black'}`} />,
  };
  // Sidebar icon mapping for subcategories (maroon theme, relevant icons)
  const subIcons: Record<string, (isActive: boolean, isHovered: boolean) => JSX.Element> = {
    "Dimensional Calibration": (isActive, isHovered) => <Ruler className={`inline-block mr-2 h-4 w-4 ${isActive || isHovered ? 'text-white' : 'text-black'}`} />,
    "Electrical Calibration": (isActive, isHovered) => <Activity className={`inline-block mr-2 h-4 w-4 ${isActive || isHovered ? 'text-white' : 'text-black'}`} />,
    "Thermal Calibration": (isActive, isHovered) => <Thermometer className={`inline-block mr-2 h-4 w-4 ${isActive || isHovered ? 'text-white' : 'text-black'}`} />,
    "Pressure Calibration": (isActive, isHovered) => <Gauge className={`inline-block mr-2 h-4 w-4 ${isActive || isHovered ? 'text-white' : 'text-black'}`} />,
    "Flow Calibration": (isActive, isHovered) => <Layers className={`inline-block mr-2 h-4 w-4 ${isActive || isHovered ? 'text-white' : 'text-black'}`} />,
    "Mass and Weight Calibration": (isActive, isHovered) => <Weight className={`inline-block mr-2 h-4 w-4 ${isActive || isHovered ? 'text-white' : 'text-black'}`} />,
    // Unimetro/Metrology Systems
    "Vision Measuring System": (isActive, isHovered) => <Compass className={`inline-block mr-2 h-4 w-4 ${isActive || isHovered ? 'text-white' : 'text-black'}`} />,
    "Pro Series Vision Measuring System": (isActive, isHovered) => <ClipboardList className={`inline-block mr-2 h-4 w-4 ${isActive || isHovered ? 'text-white' : 'text-black'}`} />,
    "Manual Vision Measuring System": (isActive, isHovered) => <ClipboardList className={`inline-block mr-2 h-4 w-4 ${isActive || isHovered ? 'text-white' : 'text-black'}`} />,
    "Compact CNC Vision Measuring System": (isActive, isHovered) => <Wrench className={`inline-block mr-2 h-4 w-4 ${isActive || isHovered ? 'text-white' : 'text-black'}`} />,
    "Gantry Large-Range CNC Vision Measuring System": (isActive, isHovered) => <Wrench className={`inline-block mr-2 h-4 w-4 ${isActive || isHovered ? 'text-white' : 'text-black'}`} />,
    "Tool Vision Measuring System": (isActive, isHovered) => <Wrench className={`inline-block mr-2 h-4 w-4 ${isActive || isHovered ? 'text-white' : 'text-black'}`} />,
    "Coordinate Measurement Machine": (isActive, isHovered) => <Compass className={`inline-block mr-2 h-4 w-4 ${isActive || isHovered ? 'text-white' : 'text-black'}`} />,
    "Fixture Kits": (isActive, isHovered) => <Layers className={`inline-block mr-2 h-4 w-4 ${isActive || isHovered ? 'text-white' : 'text-black'}`} />,
    // Polwax/Measuring Instruments
    "Dataloggers": (isActive, isHovered) => <ClipboardList className={`inline-block mr-2 h-4 w-4 ${isActive || isHovered ? 'text-white' : 'text-black'}`} />,
    "Transmitters": (isActive, isHovered) => <Settings className={`inline-block mr-2 h-4 w-4 ${isActive || isHovered ? 'text-white' : 'text-black'}`} />,
    "IoT Gateway": (isActive, isHovered) => <ListChecks className={`inline-block mr-2 h-4 w-4 ${isActive || isHovered ? 'text-white' : 'text-black'}`} />,
    // Fallback
  };
  function getSubIcon(sub: string, isActive: boolean, isHovered: boolean) {
    return (subIcons[sub] || ((ia, ih) => <FileText className={`inline-block mr-2 h-4 w-4 ${ia || ih ? 'text-white' : 'text-black'}`} />))(isActive, isHovered);
  }

  // For floating subcategory menu
  const [subMenuOpen, setSubMenuOpen] = useState<string | null>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
  // Detect mobile
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  // Add to component state:
  const [hoveredMain, setHoveredMain] = useState<string | null>(null);
  const [hoveredSub, setHoveredSub] = useState<string | null>(null);

  if (isLoading || loading) {
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
    <div className="min-h-screen relative bg-[linear-gradient(135deg,_#e6f0fa_60%,_#f7f7fa_100%)]">
      {/* Sidebar and Main Content in a flex row for correct sticky context */}
      <div className="flex flex-row bg-white">
        {/* Sidebar */}
        <div
          ref={sidebarRef}
          className="hidden md:flex sticky top-16 w-64 z-30 flex-col bg-[#e6f0fa] shadow-inner border-r border-maroon-900 shadow-xl max-h-[calc(100vh-64px)] overflow-hidden pr-4"
        >
          {/* Decorative SVG background shapes */}
          <div className="absolute inset-0 pointer-events-none z-0">
            <svg width="100%" height="100%" viewBox="0 0 256 1024" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <circle cx="60" cy="80" r="40" fill="#fff" fillOpacity="0.07" />
              <circle cx="200" cy="200" r="24" fill="#fff" fillOpacity="0.10" />
              <rect x="-40" y="400" width="120" height="120" rx="32" fill="#fff" fillOpacity="0.06" />
              <polygon points="180,700 220,740 180,780 140,740" fill="#fff" fillOpacity="0.08" />
              <ellipse cx="120" cy="900" rx="60" ry="24" fill="#fff" fillOpacity="0.05" />
              <line x1="30" y1="600" x2="230" y2="650" stroke="#fff" strokeWidth="8" opacity="0.06" />
            </svg>
          </div>
          {/* Raise z-index of menu content above shapes */}
          <div className="bg-transparent text-black font-bold px-6 py-3 text-lg tracking-wide shadow-lg relative z-10">Product Category</div>
          <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-maroon-200 scrollbar-track-maroon-900">
            <nav className="flex flex-col py-4 gap-1 relative z-10">
              {sidebar.map(main => (
                <div key={main.name} className="relative group">
                  <button
                    onMouseEnter={() => setHoveredMain(main.name)}
                    onMouseLeave={() => setHoveredMain(null)}
                    className={`flex items-center w-full px-6 py-2 text-sm font-medium transition-all duration-150 border-l-4 rounded-none text-left ${activeMain === main.name ? 'bg-maroon-900 text-black border-maroon-400' : 'text-black border-transparent hover:bg-maroon-800 hover:text-white'}`}
                    onClick={() => {
                      setActiveMain(main.name);
                      setActiveSub("");
                    }}
                    aria-current={activeMain === main.name ? 'page' : undefined}
                  >
                    {(mainIcons[main.name as keyof typeof mainIcons] || (() => <Gauge className="inline-block mr-2 h-5 w-5 text-black" />))(activeMain === main.name, hoveredMain === main.name)}
                    {main.name}
                  </button>
                  <ul className="pl-10 py-1">
                    {(main.subcategories || []).map(sub => (
                      <li key={typeof sub === 'string' ? sub : sub.id}>
                        <button
                          onMouseEnter={() => setHoveredSub(typeof sub === 'string' ? sub : sub.name)}
                          onMouseLeave={() => setHoveredSub(null)}
                          className={`flex items-center w-full py-1 text-xs font-medium text-left transition-all duration-150 border-l-4 ${activeMain === main.name && activeSub === (typeof sub === 'string' ? sub : sub.name) ? 'bg-maroon-900 text-black border-maroon-400' : 'text-black border-transparent hover:bg-maroon-700 hover:text-white'}`}
                          onClick={() => {
                            setActiveMain(main.name);
                            setActiveSub(typeof sub === 'string' ? sub : sub.name);
                          }}
                          aria-current={activeMain === main.name && activeSub === (typeof sub === 'string' ? sub : sub.name) ? 'page' : undefined}
                        >
                          {getSubIcon(typeof sub === 'string' ? sub : sub.name, activeMain === main.name && activeSub === (typeof sub === 'string' ? sub : sub.name), hoveredSub === (typeof sub === 'string' ? sub : sub.name))}
                          {typeof sub === 'string' ? sub : sub.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          </div>
        </div>
        {/* Main Content */}
        <div className="flex-1 md:ml-6 lg:ml-8 bg-white min-h-screen relative z-10">
          <main className="p-0 pt-0 mt-0">
            {/* Search Bar */}
            <div className="bg-white rounded-lg shadow-lg p-2 w-full">
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
              </div>
            </div>
        {/* Results Summary */}
            <div className="mb-8">
          <p className="text-gray-600">
                Showing {sidebarFilteredProducts.length} product{sidebarFilteredProducts.length !== 1 ? 's' : ''}
            {searchTerm && ` for "${searchTerm}"`}
                {activeMain && ` in ${activeMain}`}
                {activeSub && ` > ${activeSub}`}
              </p>
            </div>
            {/* Product Cards */}
            {sidebarFilteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sidebarFilteredProducts.map((product: Product, index: number) => (
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
        ) : (
              <div className="text-center py-16">
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
                    setActiveMain(sidebar[0]?.name || "");
                    setActiveSub("");
              }}
              className="bg-[#800000] text-white hover:bg-[#6b0000]"
            >
              Clear Filters
            </Button>
              </div>
        )}
          </main>
        </div>
      </div>
    </div>
  );
}
