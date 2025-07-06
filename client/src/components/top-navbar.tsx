import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "wouter";

export default function TopNavbar() {
  const [search, setSearch] = useState("");
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [results, setResults] = useState<any[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [location, setLocation] = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fetch all products once on mount
  useEffect(() => {
    fetch(`/api/products`)
      .then(res => res.json())
      .then(data => setAllProducts(Array.isArray(data) ? data : []));
  }, []);

  useEffect(() => {
    if (search.trim().length > 0) {
      const s = search.toLowerCase();
      const filtered = allProducts.filter(
        (product: any) =>
          product.name.toLowerCase().includes(s) ||
          (product.shortDescription && product.shortDescription.toLowerCase().includes(s))
      );
      setResults(filtered);
      setShowDropdown(true);
    } else {
      setResults([]);
      setShowDropdown(false);
    }
  }, [search, allProducts]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (id: string) => {
    setLocation(`/products/${id}`);
    setShowDropdown(false);
    setSearch("");
  };

  return (
    <div className="w-full bg-white border-b border-gray-200 px-4 py-2 text-sm">
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-2 md:gap-4">
        {/* Search Bar */}
        <div className="relative flex-1 max-w-md" ref={dropdownRef}>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Search products..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            onFocus={() => search && setShowDropdown(true)}
          />
          {showDropdown && (
            <div className="absolute left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
              {results.length > 0 ? (
                results.map(product => (
                  <div
                    key={product.id}
                    className="px-4 py-2 cursor-pointer hover:bg-primary hover:text-white transition"
                    onClick={() => handleSelect(product.id)}
                  >
                    <div className="font-semibold">{product.name}</div>
                    <div className="text-xs text-gray-500">{product.shortDescription}</div>
                  </div>
                ))
              ) : search.trim() !== "" ? (
                <div className="px-4 py-2 text-gray-500">No products found</div>
              ) : null}
            </div>
          )}
        </div>
        {/* Phone & Email */}
        <div className="flex flex-col md:flex-row items-end md:items-center gap-2 md:gap-6 ml-auto">
          <div className="flex items-center gap-2 text-primary font-semibold" style={{ fontFamily: 'Poppins, sans-serif' }}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h2.28a2 2 0 011.94 1.52l.3 1.2a2 2 0 01-.45 1.95l-.7.7a16.06 16.06 0 006.36 6.36l.7-.7a2 2 0 011.95-.45l1.2.3A2 2 0 0121 16.72V19a2 2 0 01-2 2h-1C9.163 21 3 14.837 3 7V5z" /></svg>
            <span>9175240313</span>
          </div>
          <div className="flex items-center gap-2 text-primary font-semibold" style={{ fontFamily: 'Poppins, sans-serif' }}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
            <span>sales@reckonix.co.in</span>
          </div>
        </div>
      </div>
    </div>
  );
} 