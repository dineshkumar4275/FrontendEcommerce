// components/SearchHeader.jsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { debounce } from '../utils/debounce';

export const SearchHeader = ({
  onSearch,
  placeholder = "Search for products, brands, and categories...",
  className = ""
}) => {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const inputRef = useRef(null);

  const debouncedSearch = useRef(
    debounce(async (searchQuery) => {
      if (onSearch) {
        setIsSearching(true);
        await onSearch(searchQuery);
        setIsSearching(false);
      }
    }, 500)
  ).current;

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    debouncedSearch(value);
  };

  const handleClear = () => {
    setQuery('');
    debouncedSearch('');
    inputRef.current?.focus();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() && onSearch) {
      onSearch(query);
    }
  };

  return (
    <div className={`relative ${className}`}>
      <form onSubmit={handleSubmit} className="relative">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder={placeholder}
          className="w-full px-5 py-3 pl-12 pr-12 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all bg-white shadow-sm"
        />
        <MagnifyingGlassIcon className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
        
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600 transition"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        )}
      </form>

      {isSearching && (
        <div className="absolute right-4 top-3.5">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-purple-600"></div>
        </div>
      )}
    </div>
  );
};