// // src/components/LanguageSelector.jsx
// 'use client';

// import { useState, useEffect, useRef } from 'react';
// import { useApp } from '../hooks/useApp';
// import { languages } from '../data/languages';

// export const LanguageSelector = () => {
//   const { language, setLanguage, t } = useApp();
//   const [isOpen, setIsOpen] = useState(false);
//   const [search, setSearch] = useState('');
//   const dropdownRef = useRef(null);

//   const selectedLanguage = languages.find(l => l.code === language);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setIsOpen(false);
//       }
//     };
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   const handleSelect = (languageCode) => {
//     setLanguage(languageCode);
//     setIsOpen(false);
//     setSearch('');
//   };

//   return (
//     <div className="relative" ref={dropdownRef}>
//       <button
//         onClick={() => setIsOpen(!isOpen)}
//         className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:border-purple-500 dark:hover:border-purple-400 transition-colors bg-white dark:bg-gray-800"
//         aria-label="Select language"
//       >
//         <span className="text-xl">{selectedLanguage?.flag}</span>
//         <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
//           {selectedLanguage?.nativeName}
//         </span>
//         <svg className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//         </svg>
//       </button>

//       {isOpen && (
//         <div className="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 z-50 max-h-96 flex flex-col">
//           <div className="p-3 border-b border-gray-200 dark:border-gray-700">
//             <div className="relative">
//               <input
//                 type="text"
//                 placeholder={t('search')}
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//                 className="w-full pl-9 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
//               />
//               <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//               </svg>
//             </div>
//           </div>

//           <div className="overflow-y-auto flex-1">
//             {languages.filter(l =>
//               l.name.toLowerCase().includes(search.toLowerCase()) ||
//               l.nativeName.toLowerCase().includes(search.toLowerCase()) ||
//               l.code.toLowerCase().includes(search.toLowerCase())
//             ).map((l) => (
//               <button
//                 key={l.code}
//                 onClick={() => handleSelect(l.code)}
//                 className={`w-full flex items-center gap-3 px-4 py-2.5 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors ${
//                   language === l.code ? 'bg-purple-50 dark:bg-purple-900/30' : ''
//                 }`}
//               >
//                 <span className="text-xl">{l.flag}</span>
//                 <div className="flex-1 text-left">
//                   <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{l.nativeName}</p>
//                   <p className="text-xs text-gray-500 dark:text-gray-400">{l.name}</p>
//                 </div>
//                 {language === l.code && (
//                   <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
//                     <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//                   </svg>
//                 )}
//               </button>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default LanguageSelector;
// src/components/LanguageSelector.jsx
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../providers/AppProvider';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

const LanguageSelector = () => {
  const { language, changeLanguage, t, languages } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const dropdownRef = useRef(null);

  const selectedLanguage = languages.find(l => l.code === language);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (languageCode) => {
    changeLanguage(languageCode);
    setIsOpen(false);
    setSearch('');
  };

  const filteredLanguages = languages.filter(l =>
    l.name.toLowerCase().includes(search.toLowerCase()) ||
    l.nativeName.toLowerCase().includes(search.toLowerCase()) ||
    l.code.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg border border-purple-500/30 hover:border-purple-500 transition-colors bg-slate-800/50 backdrop-blur-sm"
        aria-label="Select language"
      >
        <span className="text-lg">{selectedLanguage?.flag}</span>
        <span className="text-sm font-medium text-purple-200 hidden sm:block">
          {selectedLanguage?.nativeName}
        </span>
        <ChevronDownIcon className={`w-4 h-4 text-purple-400/60 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-64 bg-slate-800 rounded-xl shadow-2xl border border-purple-500/30 z-50 max-h-96 flex flex-col">
          <div className="p-3 border-b border-purple-500/20">
            <div className="relative">
              <input
                type="text"
                placeholder={t('search') || 'Search...'}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-lg border border-purple-500/30 bg-slate-700/50 text-purple-100 placeholder:text-purple-400/50 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
              />
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-400/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          <div className="overflow-y-auto flex-1">
            {filteredLanguages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleSelect(lang.code)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 hover:bg-purple-500/10 transition-colors ${
                  language === lang.code ? 'bg-purple-500/20' : ''
                }`}
              >
                <span className="text-xl">{lang.flag}</span>
                <div className="flex-1 text-left">
                  <p className="text-sm font-medium text-purple-100">{lang.nativeName}</p>
                  <p className="text-xs text-purple-400">{lang.name}</p>
                </div>
                {language === lang.code && (
                  <svg className="w-5 h-5 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;