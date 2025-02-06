'use client'
import React, { useState, useEffect } from 'react';
import { ShoppingCart, Menu, User, X, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/menu',  label: 'Menu', },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
    { href: '/login', label: 'Login' },
  ];

  return (
    <header className={`top-0 right-0 left-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-md fixed ' : 'bg-[#101011be] block'
    }`}>
      <div className="mx-auto px-4 container">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link 
            href="/" 
            className="group flex items-center space-x-2"
          >
            <div className="group-hover:rotate-12 flex justify-center items-center bg-yellow-500 rounded-lg w-10 h-10 transform transition-transform">
              <span className="font-bold text-white text-xl">F</span>
            </div>
            <span className={`font-bold text-xl transition-colors duration-300 ${
              isScrolled ? 'text-gray-800' : 'text-white'
            }`}>
              FoodieSpot
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="md:flex items-center space-x-8 hidden">
            {navLinks.map((link) => (
              <div key={link.href} className="group relative">
                <Link 
                  href={link.href}
                  className={`flex items-center space-x-1 py-2 group ${
                    isScrolled ? 'text-gray-600 hover:text-gray-900' : 'text-white hover:text-yellow-400'
                  } transition-colors`}
                >
                  <span>{link.label}</span> 
                </Link> 
              </div>
            ))}
          </nav>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-6">
            <Link 
              href="/cart" 
              className="group relative"
            >
              <ShoppingCart className={`w-6 h-6 transition-colors duration-300 ${
                isScrolled ? 'text-gray-600 group-hover:text-gray-900' : 'text-white group-hover:text-yellow-400'
              }`} />
              <span className="-top-2 -right-2 absolute flex justify-center items-center bg-yellow-500 rounded-full w-5 h-5 text-white text-xs animate-pulse">
                2
              </span>
            </Link>
            
            <Link 
              href="/profile"
              className="group"
            >
              <User className={`w-6 h-6 transition-colors duration-300 ${
                isScrolled ? 'text-gray-600 group-hover:text-gray-900' : 'text-white group-hover:text-yellow-400'
              }`} />
            </Link>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="group relative z-50 md:hidden"
            >
              {isMenuOpen ? (
                <X className={`w-6 h-6 ${
                  isScrolled ? 'text-gray-600' : 'text-white'
                }`} />
              ) : (
                <Menu className={`w-6 h-6 ${
                  isScrolled ? 'text-gray-600' : 'text-white'
                }`} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ${
        isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}>
        <div className={`absolute right-0 top-0 h-screen w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
          <div className="space-y-6 p-6">
            <div className="flex justify-between items-center mb-8">
              <span className="font-bold text-gray-800 text-xl">Menu</span>
              <button onClick={() => setIsMenuOpen(false)}>
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>
            
            <nav className="space-y-4">
              {navLinks.map((link) => (
                <div key={link.href} className="py-1">
                  <Link
                    href={link.href}
                    className="block text-gray-600 hover:text-gray-900 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </Link> 
                </div>
              ))}
            </nav>

            <div className="border-gray-200 pt-6 border-t">
              <Link
                href="/profile"
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <User className="w-5 h-5" />
                <span>My Profile</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;