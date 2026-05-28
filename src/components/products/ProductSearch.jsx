// components/ProductSearchBar.jsx
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MagnifyingGlassIcon, XMarkIcon, ClockIcon, FireIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { debounce } from '../../utils/debounce';

export const ProductSearchBar = ({
  value,
  onChange,
  onSearch,
  onSelect,
  suggestions = [],
  trendingSearches = [],
  recentSearches = [],
  onClearRecent,
  isLoading = false,
  placeholder = "Search for products...",
  className = "",
  autoFocus = false,
  debounceDelay = 300,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [localValue, setLocalValue] = useState(value);
  const inputRef = useRef(null);
  const containerRef = useRef(null);

  // Debounced onChange
  const debouncedOnChange = useRef(
    debounce((val) => {
      onChange(val);
    }, debounceDelay)
  ).current;

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setLocalValue(newValue);
    debouncedOnChange(newValue);
    setSelectedIndex(-1);
  };

  // Sync local value with prop
  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    setIsOpen(localValue.length > 0 || suggestions.length > 0 || trendingSearches.length > 0);
  }, [localValue, suggestions, trendingSearches]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (localValue.trim()) {
      onSearch(localValue);
      setIsOpen(false);
    }
  };

  const handleKeyDown = (e) => {
    const totalItems = suggestions.length;
    
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => Math.min(prev + 1, totalItems - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => Math.max(prev - 1, -1));
    } else if (e.key === 'Enter' && selectedIndex >= 0 && suggestions[selectedIndex]) {
      e.preventDefault();
      onSelect?.(suggestions[selectedIndex]);
      onSearch(suggestions[selectedIndex].name);
      setIsOpen(false);
    } else if (e.key === 'Enter') {
      handleSubmit(e);
    } else if (e.key === 'Escape') {
      setIsOpen(false);
      setSelectedIndex(-1);
    }
  };

  const highlightMatch = (text, query) => {
    if (!query || !text) return text;
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);
    return parts.map((part, i) => 
      regex.test(part) ? 
        <mark key={i} className="bg-yellow-200 text-gray-900 font-semibold rounded px-0.5">{part}</mark> : 
        part
    );
  };

  return (
    <div ref={containerRef} className={`relative w-full ${className}`}>
      <form onSubmit={handleSubmit} className="relative">
        <input
          ref={inputRef}
          type="text"
          value={localValue}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          autoFocus={autoFocus}
          className="w-full px-5 py-3 pl-12 pr-12 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all bg-white shadow-sm"
        />
        <MagnifyingGlassIcon className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
        
        {localValue && (
          <button
            type="button"
            onClick={() => {
              setLocalValue('');
              onChange('');
              inputRef.current?.focus();
            }}
            className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600 transition"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        )}
      </form>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-100 rounded-xl shadow-2xl z-50 overflow-hidden"
          >
            {isLoading ? (
              <div className="p-8 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto" />
                <p className="mt-2 text-sm text-gray-500">Searching...</p>
              </div>
            ) : (
              <div className="max-h-96 overflow-y-auto">
                {/* Product Suggestions */}
                {suggestions.length > 0 && (
                  <div>
                    <div className="px-4 py-2 bg-gradient-to-r from-purple-50 to-pink-50">
                      <span className="text-xs text-purple-600 font-semibold">Products ({suggestions.length})</span>
                    </div>
                    {suggestions.map((item, idx) => (
                      <button
                        key={item.id}
                        onClick={() => {
                          onSelect?.(item);
                          onSearch(item.name);
                          setIsOpen(false);
                        }}
                        className={`w-full px-4 py-3 text-left hover:bg-purple-50 transition-colors flex items-center gap-3 border-b border-gray-50 ${
                          selectedIndex === idx ? 'bg-purple-50' : ''
                        }`}
                      >
                        {item.image_url && (
                          <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                            <img 
                              src={item.image_url} 
                              alt={item.name} 
                              className="w-full h-full object-cover"
                              onError={(e) => { e.target.src = 'https://via.placeholder.com/48'; }}
                            />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 line-clamp-1">
                            {highlightMatch(item.name, localValue)}
                          </p>
                          {item.price && (
                            <p className="text-purple-600 font-semibold text-sm mt-0.5">
                              ₹{item.price.toLocaleString()}
                            </p>
                          )}
                        </div>
                        <ArrowRightIcon className="h-4 w-4 text-gray-400 flex-shrink-0" />
                      </button>
                    ))}
                  </div>
                )}

                {/* Recent Searches */}
                {localValue.length === 0 && recentSearches.length > 0 && (
                  <div className="border-t border-gray-100">
                    <div className="flex justify-between items-center px-4 py-2 bg-gray-50">
                      <span className="text-xs text-gray-500 font-semibold flex items-center gap-1">
                        <ClockIcon className="h-3 w-3" />
                        Recent Searches
                      </span>
                      {onClearRecent && (
                        <button onClick={onClearRecent} className="text-xs text-red-500 hover:text-red-600">
                          Clear All
                        </button>
                      )}
                    </div>
                    {recentSearches.map((search, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setLocalValue(search);
                          onChange(search);
                          onSearch(search);
                          setIsOpen(false);
                        }}
                        className="w-full px-4 py-2 text-left hover:bg-purple-50 transition-colors flex items-center gap-3"
                      >
                        <ClockIcon className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-700">{search}</span>
                      </button>
                    ))}
                  </div>
                )}

                {/* Trending Searches */}
                {localValue.length === 0 && trendingSearches.length > 0 && (
                  <div className="border-t border-gray-100">
                    <div className="px-4 py-2 bg-gray-50">
                      <span className="text-xs text-gray-500 font-semibold flex items-center gap-1">
                        <FireIcon className="h-3 w-3 text-orange-500" />
                        Trending Now
                      </span>
                    </div>
                    <div className="p-3">
                      <div className="flex flex-wrap gap-2">
                        {trendingSearches.map((trend, idx) => (
                          <button
                            key={idx}
                            onClick={() => {
                              setLocalValue(trend);
                              onChange(trend);
                              onSearch(trend);
                              setIsOpen(false);
                            }}
                            className="px-3 py-1.5 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-purple-100 hover:text-purple-700 transition-colors"
                          >
                            {trend}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* No Results */}
                {suggestions.length === 0 && localValue.length > 1 && !isLoading && (
                  <div className="p-8 text-center">
                    <div className="text-5xl mb-3">🔍</div>
                    <p className="text-gray-500 font-medium">No products found for "{localValue}"</p>
                    <p className="text-sm text-gray-400 mt-1">Try different keywords</p>
                    <button
                      onClick={() => {
                        onSearch(localValue);
                        setIsOpen(false);
                      }}
                      className="mt-4 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg text-sm font-medium hover:shadow-lg transition"
                    >
                      Search for "{localValue}"
                    </button>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};