// 'use client';

// import { useState, useEffect, useCallback, useRef } from 'react';
// import { useRouter } from 'next/navigation';
// import { motion, AnimatePresence } from 'framer-motion';
// import { MagnifyingGlassIcon, XMarkIcon, ClockIcon, FireIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
// import { searchProducts } from '../../services/productService';
// import toast from 'react-hot-toast';

// export const AutoSuggestSearch = ({ onSelect, className = '', placeholder = "Search for products, brands, and categories..." }) => {
//   const router = useRouter();
//   const [query, setQuery] = useState('');
//   const [suggestions, setSuggestions] = useState([]);
//   const [recentSearches, setRecentSearches] = useState([]);
//   const [trendingSearches, setTrendingSearches] = useState([]);
//   const [isOpen, setIsOpen] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [selectedIndex, setSelectedIndex] = useState(-1);
//   const inputRef = useRef(null);
//   const suggestionsRef = useRef(null);

//   // Load recent searches from localStorage
//   useEffect(() => {
//     const saved = localStorage.getItem('recentSearches');
//     if (saved) {
//       try {
//         setRecentSearches(JSON.parse(saved));
//       } catch (e) {
//         console.error('Error parsing recent searches:', e);
//       }
//     }
//     // Popular trending searches
//     setTrendingSearches([
//       { name: 'Headphones', icon: '🎧', count: '2.5k' },
//       { name: 'Smart Watch', icon: '⌚', count: '1.8k' },
//       { name: 'Laptop', icon: '💻', count: '3.2k' },
//       { name: 'Shoes', icon: '👟', count: '4.1k' },
//       { name: 'T-Shirt', icon: '👕', count: '5.3k' },
//       { name: 'Mobile', icon: '📱', count: '6.2k' },
//       { name: 'Camera', icon: '📷', count: '1.2k' },
//       { name: 'Bags', icon: '👜', count: '2.1k' }
//     ]);
//   }, []);

//   // Fetch suggestions when query changes
//   useEffect(() => {
//     const delayDebounce = setTimeout(async () => {
//       if (query.length > 1) {
//         setIsLoading(true);
//         try {
//           const filters = { q: query, limit: 10 };
//           const results = await searchProducts(filters);
//           setSuggestions(results || []);
//           setIsOpen(true);
//         } catch (error) {
//           console.error('Error fetching suggestions:', error);
//           setSuggestions([]);
//         } finally {
//           setIsLoading(false);
//         }
//       } else {
//         setSuggestions([]);
//         if (query.length === 0) {
//           setIsOpen(true);
//         } else {
//           setIsOpen(false);
//         }
//       }
//     }, 300);

//     return () => clearTimeout(delayDebounce);
//   }, [query]);

//   // Close dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (suggestionsRef.current && !suggestionsRef.current.contains(event.target) &&
//           inputRef.current && !inputRef.current.contains(event.target)) {
//         setIsOpen(false);
//         setSelectedIndex(-1);
//       }
//     };
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   // Save search to recent
//   const saveToRecent = (searchTerm) => {
//     const updated = [searchTerm, ...recentSearches.filter(s => s !== searchTerm)].slice(0, 5);
//     setRecentSearches(updated);
//     localStorage.setItem('recentSearches', JSON.stringify(updated));
//   };

//   // Handle search
//   const handleSearch = useCallback((searchTerm) => {
//     if (!searchTerm?.trim()) return;
    
//     saveToRecent(searchTerm);
//     setQuery(searchTerm);
//     setIsOpen(false);
//     setSelectedIndex(-1);
    
//     if (onSelect) {
//       onSelect(searchTerm);
//     } else {
//       router.push(`/products?search=${encodeURIComponent(searchTerm)}`);
//     }
//   }, [onSelect, router]);

//   // Handle product click
//   const handleProductClick = (product) => {
//     saveToRecent(product.name);
//     setIsOpen(false);
//     setSelectedIndex(-1);
//     router.push(`/products/${product.id}`);
//   };

//   // Handle keyboard navigation
//   const handleKeyDown = (e) => {
//     const totalItems = suggestions.length;
    
//     if (e.key === 'ArrowDown') {
//       e.preventDefault();
//       setSelectedIndex(prev => Math.min(prev + 1, totalItems - 1));
//     } else if (e.key === 'ArrowUp') {
//       e.preventDefault();
//       setSelectedIndex(prev => Math.max(prev - 1, -1));
//     } else if (e.key === 'Enter' && selectedIndex >= 0 && suggestions[selectedIndex]) {
//       e.preventDefault();
//       handleProductClick(suggestions[selectedIndex]);
//     } else if (e.key === 'Enter' && query.trim()) {
//       e.preventDefault();
//       handleSearch(query);
//     } else if (e.key === 'Escape') {
//       setIsOpen(false);
//       setSelectedIndex(-1);
//     }
//   };

//   // Clear recent searches
//   const clearRecentSearches = () => {
//     setRecentSearches([]);
//     localStorage.removeItem('recentSearches');
//     toast.success('Recent searches cleared');
//   };

//   // Highlight matching text
//   const highlightMatch = (text, searchQuery) => {
//     if (!searchQuery || !text) return text;
//     const regex = new RegExp(`(${searchQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
//     const parts = text.split(regex);
//     return parts.map((part, i) => 
//       regex.test(part) ? 
//         <span key={i} className="bg-yellow-200 text-gray-900 font-semibold">{part}</span> : 
//         part
//     );
//   };

//   return (
//     <div className={`relative w-full ${className}`}>
//       <div className="relative">
//         <input
//           ref={inputRef}
//           type="text"
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//           onFocus={() => setIsOpen(true)}
//           onKeyDown={handleKeyDown}
//           placeholder={placeholder}
//           className="w-full px-5 py-3 pl-12 pr-12 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all bg-white"
//         />
//         <MagnifyingGlassIcon className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
        
//         {query && (
//           <button
//             onClick={() => {
//               setQuery('');
//               setSuggestions([]);
//               inputRef.current?.focus();
//             }}
//             className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600 transition"
//           >
//             <XMarkIcon className="h-5 w-5" />
//           </button>
//         )}
//       </div>

//       {/* Search Results Dropdown */}
//       <AnimatePresence>
//         {isOpen && (
//           <motion.div
//             initial={{ opacity: 0, y: -10 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -10 }}
//             transition={{ duration: 0.2 }}
//             ref={suggestionsRef}
//             className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-100 rounded-xl shadow-2xl z-50 overflow-hidden"
//           >
//             {isLoading ? (
//               <div className="p-8 text-center">
//                 <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
//                 <p className="mt-2 text-sm text-gray-500">Searching products...</p>
//               </div>
//             ) : (
//               <div className="max-h-96 overflow-y-auto">
//                 {/* Product Suggestions */}
//                 {suggestions.length > 0 && (
//                   <div>
//                     <div className="px-4 py-2 bg-gradient-to-r from-purple-50 to-pink-50 text-xs text-purple-600 font-semibold flex items-center justify-between">
//                       <span>Products ({suggestions.length})</span>
//                       <span className="text-gray-400 text-[10px]">Press Enter to see all</span>
//                     </div>
//                     {suggestions.map((item, idx) => (
//                       <button
//                         key={item.id}
//                         onClick={() => handleProductClick(item)}
//                         className={`w-full px-4 py-3 text-left hover:bg-purple-50 transition-colors flex items-center gap-3 border-b border-gray-50 ${
//                           selectedIndex === idx ? 'bg-purple-50' : ''
//                         }`}
//                       >
//                         {/* Product Image */}
//                         <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
//                           {item.image_url ? (
//                             <img 
//                               src={item.image_url} 
//                               alt={item.name} 
//                               className="w-full h-full object-cover"
//                               onError={(e) => { e.target.src = ''; }}
//                             />
//                           ) : (
//                             <div className="w-full h-full flex items-center justify-center text-gray-400 text-xl">
//                               📦
//                             </div>
//                           )}
//                         </div>
                        
//                         {/* Product Info */}
//                         <div className="flex-1 min-w-0">
//                           <p className="text-sm font-medium text-gray-900 line-clamp-1">
//                             {highlightMatch(item.name, query)}
//                           </p>
//                           <div className="flex items-center gap-2 mt-0.5">
//                             <span className="text-purple-600 font-semibold text-sm">
//                               ₹{item.price?.toLocaleString()}
//                             </span>
//                             {item.category && (
//                               <span className="text-xs text-gray-400">{item.category}</span>
//                             )}
//                             {item.stock > 0 ? (
//                               <span className="text-xs text-green-600">In Stock</span>
//                             ) : (
//                               <span className="text-xs text-red-600">Out of Stock</span>
//                             )}
//                           </div>
//                         </div>
                        
//                         <ArrowRightIcon className="h-4 w-4 text-gray-400 flex-shrink-0" />
//                       </button>
//                     ))}
//                   </div>
//                 )}

//                 {/* Recent Searches */}
//                 {query.length === 0 && recentSearches.length > 0 && (
//                   <div className="border-t border-gray-100">
//                     <div className="flex justify-between items-center px-4 py-2 bg-gradient-to-r from-gray-50 to-gray-100">
//                       <span className="text-xs text-gray-500 font-semibold flex items-center gap-1">
//                         <ClockIcon className="h-3 w-3" />
//                         Recent Searches
//                       </span>
//                       <button
//                         onClick={clearRecentSearches}
//                         className="text-xs text-red-500 hover:text-red-600 transition"
//                       >
//                         Clear All
//                       </button>
//                     </div>
//                     {recentSearches.map((search, idx) => (
//                       <button
//                         key={idx}
//                         onClick={() => handleSearch(search)}
//                         className="w-full px-4 py-2 text-left hover:bg-purple-50 transition-colors flex items-center gap-3"
//                       >
//                         <ClockIcon className="h-4 w-4 text-gray-400" />
//                         <span className="text-sm text-gray-700">{search}</span>
//                       </button>
//                     ))}
//                   </div>
//                 )}

//                 {/* Trending Searches */}
//                 {query.length === 0 && trendingSearches.length > 0 && (
//                   <div className="border-t border-gray-100">
//                     <div className="px-4 py-2 bg-gradient-to-r from-gray-50 to-gray-100">
//                       <span className="text-xs text-gray-500 font-semibold flex items-center gap-1">
//                         <FireIcon className="h-3 w-3 text-orange-500" />
//                         Trending Now
//                       </span>
//                     </div>
//                     <div className="p-3">
//                       <div className="flex flex-wrap gap-2">
//                         {trendingSearches.map((trend, idx) => (
//                           <button
//                             key={idx}
//                             onClick={() => handleSearch(trend.name)}
//                             className="px-3 py-1.5 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-purple-100 hover:text-purple-700 transition-colors flex items-center gap-1"
//                           >
//                             <span className="text-base">{trend.icon}</span>
//                             {trend.name}
//                             <span className="text-xs text-gray-400 ml-1">({trend.count})</span>
//                           </button>
//                         ))}
//                       </div>
//                     </div>
//                   </div>
//                 )}

//                 {/* No Results */}
//                 {suggestions.length === 0 && query.length > 1 && !isLoading && (
//                   <div className="p-8 text-center">
//                     <div className="text-5xl mb-3">🔍</div>
//                     <p className="text-gray-500 font-medium">No products found for "{query}"</p>
//                     <p className="text-sm text-gray-400 mt-1">Try different keywords or browse our categories</p>
//                     <button
//                       onClick={() => handleSearch(query)}
//                       className="mt-4 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg text-sm font-medium hover:shadow-lg transition"
//                     >
//                       Search for "{query}"
//                     </button>
//                   </div>
//                 )}

//                 {/* Initial State */}
//                 {query.length === 0 && recentSearches.length === 0 && trendingSearches.length > 0 && (
//                   <div className="p-6 text-center">
//                     <div className="text-5xl mb-3">🔍</div>
//                     <p className="text-gray-500 font-medium">Start typing to search for products</p>
//                     <p className="text-sm text-gray-400 mt-1">Try searching for "Headphones", "Laptop", "Shoes"</p>
//                   </div>
//                 )}
//               </div>
//             )}
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };
// src/components/products/AutoSuggestSearch.jsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';

export const AutoSuggestSearch = ({ placeholder = "Search products...", onSelect }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const router = useRouter();
  const searchRef = useRef(null);

  // Fetch search suggestions
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.length < 2) {
        setSuggestions([]);
        return;
      }

      setLoading(true);
      try {
        const response = await fetch(`/api/products/search?q=${encodeURIComponent(query)}&limit=5`);
        const data = await response.json();
        if (data.success) {
          setSuggestions(data.data);
        }
      } catch (error) {
        console.error('Search error:', error);
      } finally {
        setLoading(false);
      }
    };

    const debounce = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(debounce);
  }, [query]);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = () => {
    if (query.trim()) {
      // ✅ Navigate to products page with search query
      router.push(`/products?search=${encodeURIComponent(query)}`);
      if (onSelect) onSelect(query);
      setShowSuggestions(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSuggestionClick = (product) => {
    setQuery(product.name);
    router.push(`/products?search=${encodeURIComponent(product.name)}`);
    if (onSelect) onSelect(product.name);
    setShowSuggestions(false);
  };

  const clearSearch = () => {
    setQuery('');
    setSuggestions([]);
  };

  return (
    <div ref={searchRef} className="relative w-full">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowSuggestions(true);
          }}
          onKeyPress={handleKeyPress}
          onFocus={() => setShowSuggestions(true)}
          placeholder={placeholder}
          className="w-full px-4 py-3 pl-11 pr-10 bg-slate-800 border border-purple-500/30 rounded-xl text-purple-100 placeholder:text-purple-400/60 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
        />
        <MagnifyingGlassIcon 
          className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400/60 cursor-pointer hover:text-purple-300 transition"
          onClick={handleSearch}
        />
        {query && (
          <XMarkIcon
            className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400/60 cursor-pointer hover:text-purple-300 transition"
            onClick={clearSearch}
          />
        )}
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestions && (query.length >= 2 || suggestions.length > 0) && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-slate-800 border border-purple-500/30 rounded-xl shadow-2xl z-50 max-h-80 overflow-y-auto">
          {loading && (
            <div className="px-4 py-3 text-purple-400/60 text-sm">Searching...</div>
          )}
          
          {!loading && suggestions.length === 0 && query.length >= 2 && (
            <div className="px-4 py-3 text-purple-400/60 text-sm">
              No products found for "{query}"
            </div>
          )}
          
          {suggestions.map((product) => (
            <button
              key={product.id}
              onClick={() => handleSuggestionClick(product)}
              className="w-full px-4 py-3 text-left hover:bg-purple-500/10 transition flex items-center gap-3 border-b border-purple-500/20 last:border-0"
            >
              {product.image && (
                <img src={product.image} alt={product.name} className="w-10 h-10 object-cover rounded-lg" />
              )}
              <div className="flex-1">
                <div className="text-purple-100 font-medium">{product.name}</div>
                <div className="text-purple-400/60 text-sm">₹{product.price}</div>
              </div>
            </button>
          ))}
          
          <button
            onClick={handleSearch}
            className="w-full px-4 py-2 text-center text-purple-300 text-sm hover:bg-purple-500/10 transition font-medium"
          >
            See all results for "{query}" →
          </button>
        </div>
      )}
    </div>
  );
};