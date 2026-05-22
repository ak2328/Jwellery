import { useState, useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { Search, X } from "lucide-react";
import { useSearch } from "@/lib/SearchContext";
import { DEFAULT_PRODUCTS } from "@/lib/data/products";

export const SearchOverlay = (): JSX.Element | null => {
  const { isOpen, closeSearch } = useSearch();
  const [, setLocation] = useLocation();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = "";
      setQuery("");
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const results = query.trim() === "" 
    ? [] 
    : DEFAULT_PRODUCTS.filter(p => 
        p.name.toLowerCase().includes(query.toLowerCase()) || 
        p.category.toLowerCase().includes(query.toLowerCase())
      );

  const handleProductClick = (id: string) => {
    closeSearch();
    setLocation(`/product/${id}`);
  };

  return (
    <div className="fixed inset-0 z-[60] flex flex-col bg-[#fef9e9]/95 backdrop-blur-md">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-6 border-b border-[#1d1c12]/10">
        <div className="flex-1 max-w-[800px] mx-auto relative flex items-center">
          <Search className="w-6 h-6 text-[#1d1c12]/40 absolute left-4" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for jewellery, collections..."
            className="w-full bg-transparent border-none outline-none pl-14 pr-4 py-4 text-2xl md:text-4xl text-[#1d1c12] placeholder:text-[#1d1c12]/30 font-['Noto_Serif',Georgia,serif] italic"
          />
        </div>
        <button onClick={closeSearch} className="p-2 text-[#1d1c12] hover:opacity-70 transition-opacity">
          <X className="w-8 h-8" />
        </button>
      </div>

      {/* Results area */}
      <div className="flex-1 overflow-y-auto px-6 py-10">
        <div className="max-w-[1280px] mx-auto">
          {query.trim() !== "" && results.length === 0 && (
            <div className="text-center py-20">
              <p className="text-xl text-[#1d1c12]/60 font-['Noto_Serif',Georgia,serif]">No results found for "{query}"</p>
            </div>
          )}

          {results.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {results.map((product) => (
                <div 
                  key={product.id}
                  onClick={() => handleProductClick(product.id)}
                  className="group cursor-pointer flex flex-col gap-3"
                >
                  <div className="relative aspect-square overflow-hidden bg-[#f5f0e4]">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#c9a84c] mb-1 font-['Manrope',sans-serif]">
                      {product.category}
                    </p>
                    <h3 className="text-lg font-normal italic text-[#1d1c12] font-['Noto_Serif',Georgia,serif]">
                      {product.name}
                    </h3>
                    <p className="text-sm font-normal text-[#1d1c12]/70 font-['Noto_Serif',Georgia,serif] mt-1">
                      {product.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {query.trim() === "" && (
            <div className="text-center py-20 flex flex-col items-center gap-6">
               <h2 className="text-2xl text-[#1d1c12]/60 font-['Noto_Serif',Georgia,serif] italic">Start typing to discover...</h2>
               <div className="flex gap-4 flex-wrap justify-center max-w-lg">
                  {["Rings", "Pendants", "Necklaces", "Gold", "Aurelius"].map(term => (
                    <button 
                      key={term}
                      onClick={() => setQuery(term)}
                      className="px-4 py-2 border border-[#1d1c12]/20 rounded-full text-sm text-[#1d1c12]/70 hover:border-[#c9a84c] hover:text-[#c9a84c] transition-colors"
                    >
                      {term}
                    </button>
                  ))}
               </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
