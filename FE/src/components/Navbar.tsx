import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

export const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [menuState, setMenuState] = useState<'closed' | 'desktop-dropdown' | 'mobile-fullscreen'>('closed');
  
  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (menuState === 'mobile-fullscreen') {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [menuState]);

  const sections = [
    { name: 'UsaGAG', href: '/' },
    { name: 'Crypto', href: '/' },
    { name: 'NFTs', href: '/' },
    { name: 'Game', href: '/' },
    { name: 'Photos', href: '/' },
    { name: 'Entertainment', href: '/' },
    { name: 'Sports', href: '/' },
    { name: 'Bussiness', href: '/' },
    { name: 'Opinion', href: '/' },
    { name: 'Science', href: '/' },
    { name: 'UsaGAG Style', href: '/' },
    { name: 'UsaGAG News', href: '/' },
    { name: 'Contact', href: '/' }
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Handle search logic here
      console.log('Searching for:', searchQuery);
    }
  };

  return (
    <nav className="bg-white shadow-lg border-b">
      <div className="container mx-auto px-4 py-3 sm:px-8 md:px-12 lg:px-16">
        {/* Mobile Search Expanded State */}
        {isMobileSearchOpen && (
          <div className="block md:hidden">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setIsMobileSearchOpen(false)}
                className="flex items-center justify-center w-10 h-10 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <form onSubmit={handleSearch} className="flex-1">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Tìm kiếm video..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-2 pl-10 pr-12 text-gray-700 bg-gray-50 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:bg-white"
                    autoFocus
                  />
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <button
                    type="submit"
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-indigo-600 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}



        {/* Normal Navbar State */}
        {!isMobileSearchOpen && menuState !== 'mobile-fullscreen' && (
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="text-2xl font-bold text-indigo-600 hover:text-indigo-700 transition-colors">
              USAGAG
            </Link>

            {/* Desktop Search Bar - Hidden on Mobile */}
            <div className="hidden md:flex flex-1 max-w-lg mx-6">
              <form onSubmit={handleSearch} className="w-full relative">
                <input
                  type="text"
                  placeholder="Tìm kiếm video..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 pl-10 pr-12 text-gray-700 bg-gray-50 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:bg-white"
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <button
                  type="submit"
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-indigo-600 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </form>
            </div>

            {/* Right Side - Mobile Search Icon + Desktop Dropdown */}
            <div className="flex items-center space-x-3">
              {/* Mobile Search Icon */}
              <button
                onClick={() => setIsMobileSearchOpen(true)}
                className="md:hidden flex items-center justify-center w-10 h-10 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-full transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>

              {/* Dropdown Menu */}
              <div className="relative">
                <button
                  onClick={() => {
                    if (menuState === 'closed') {
                      // Open appropriate menu based on screen size
                      if (window.innerWidth < 768) {
                        setMenuState('mobile-fullscreen');
                      } else {
                        setMenuState('desktop-dropdown');
                      }
                    } else {
                      // Close menu
                      setMenuState('closed');
                    }
                  }}
                  className="flex items-center px-4 py-2 text-gray-700 bg-gray-100 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
                >
                  <span className="mr-2 font-medium hidden sm:inline">Danh mục</span>
                  <svg
                    className={`w-4 h-4 transition-transform duration-200 ${
                      menuState !== 'closed' ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Desktop Dropdown Content */}
                {menuState === 'desktop-dropdown' && (
                  <div 
                    key="dropdown-menu"
                    className="hidden md:block absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-xl z-50"
                    style={{ 
                      animation: 'slideInFromTop 0.3s ease-out forwards',
                      transformOrigin: 'top right',
                      opacity: 0
                    }}>
                    <div className="py-2">
                      {sections.map((section, index) => (
                        <Link
                          key={`desktop-${section.name}-${index}`}
                          to={section.href}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-all duration-200 first:rounded-t-lg last:rounded-b-lg transform hover:translate-x-2 hover:scale-105"
                          onClick={() => setMenuState('closed')}
                          style={{ 
                            animation: `fadeIn 0.4s ease-out forwards`,
                            animationDelay: `${(index * 80) + 100}ms`,
                            opacity: 0
                          }}
                        >
                          {section.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Click outside to close dropdown - Only on desktop */}
      {menuState === 'desktop-dropdown' && (
        <div
          className="fixed inset-0 z-40 hidden md:block"
          onClick={() => setMenuState('closed')}
        />
      )}

      {/* Mobile Menu Fullscreen Overlay */}
      {menuState === 'mobile-fullscreen' && (
        <div 
          key="mobile-menu-overlay"
          className="fixed inset-0 z-50 bg-white block md:hidden"
          style={{ 
            animation: 'slideInFromRight 0.4s ease-out forwards',
            opacity: 0
          }}>
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between mb-8"
                 style={{ 
                   animation: 'fadeIn 0.6s ease-out forwards', 
                   animationDelay: '0.2s',
                   opacity: 0 
                 }}>
              <h1 className="text-2xl font-bold text-indigo-600">USAGAG</h1>
              <button
                onClick={() => setMenuState('closed')}
                className="flex items-center justify-center w-10 h-10 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-full transition-all duration-300 hover:rotate-180 hover:scale-110"
              >
                <svg className="w-6 h-6 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="space-y-1">
              {sections.map((section, index) => (
                <Link
                  key={`mobile-menu-${section.name}-${index}`}
                  to={section.href}
                  className="block px-4 py-4 text-lg text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-xl transition-all duration-300 font-medium border-b border-gray-100 last:border-b-0 transform hover:translate-x-3 hover:scale-105 hover:shadow-md group"
                  onClick={() => setMenuState('closed')}
                  style={{ 
                    animation: `slideInFromLeft 0.5s ease-out forwards`,
                    animationDelay: `${(index * 120) + 400}ms`,
                    opacity: 0
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span className="transform transition-transform duration-300 group-hover:translate-x-2">{section.name}</span>
                    <svg className="w-5 h-5 text-gray-400 transition-all duration-300 group-hover:translate-x-2 group-hover:text-indigo-600 group-hover:scale-125" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};