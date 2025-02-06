import React from 'react';
import { Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="mx-auto px-4 py-12 container">
        <div className="gap-8 grid grid-cols-1 md:grid-cols-4">
          <div>
            <h3 className="mb-4 font-bold text-xl">FoodieSpot</h3>
            <p className="text-gray-400">
              Bringing the finest dining experience to your table since 2024.
            </p>
          </div>
          <div>
            <h4 className="mb-4 font-semibold text-lg">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-400 hover:text-white">Home</a></li>
              <li><a href="/menu" className="text-gray-400 hover:text-white">Menu</a></li>
              <li><a href="/about" className="text-gray-400 hover:text-white">About Us</a></li>
              <li><a href="/contact" className="text-gray-400 hover:text-white">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 font-semibold text-lg">Contact Info</h4>
            <ul className="space-y-2 text-gray-400">
              <li>123 Restaurant Street</li>
              <li>New York, NY 10001</li>
              <li>Phone: (555) 123-4567</li>
              <li>Email: info@foodiespot.com</li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 font-semibold text-lg">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Twitter className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
        <div className="border-gray-800 mt-8 pt-8 border-t text-center text-gray-400">
          <p>&copy; 2024 FoodieSpot. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;