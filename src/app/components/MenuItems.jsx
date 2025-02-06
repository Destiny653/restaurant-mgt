'use client'
import React, { useState } from 'react';
import { Plus, Star, Clock, Flame, Heart, X } from 'lucide-react';  // Changed Fire to Flame
import { cartUtils, useCart } from '../../../Context/CartContext';
import Link from 'next/link';


const Toast = ({ item, onClose }) => (
  <div className="top-4 right-4 z-50 fixed animate-slide-in">
    <div className="flex items-start space-x-4 bg-white shadow-lg p-4 rounded-lg min-w-[320px]">
      <div className="flex-shrink-0 w-12 h-12">
        <img
          src={item.image}
          alt={item.name}
          className="rounded-md w-full h-full object-cover"
        />
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <div>
            <h4 className="font-medium text-gray-900">Added to Cart</h4>
            <p className="text-gray-600 text-sm">{item.name}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <Link
          href="/cart"
          className="inline-block mt-2 font-medium text-blue-600 text-sm hover:text-blue-700"
        >
          View Cart →
        </Link>
      </div>
    </div>
  </div>
);

const MenuItems = () => {
  const menuItems = [
    {
      id: '1',
      name: 'Wagyu Beef Burger',
      description: 'Premium Japanese wagyu beef patty with caramelized onions, truffle aioli, and aged cheddar',
      price: 24.99,
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=800',
      category: 'Signature Dishes',
      rating: 4.8,
      prepTime: '20 min',
      isSpicy: true,
      isPopular: true,
    },
    {
      id: '2',
      name: 'Mediterranean Seafood Paella',
      description: 'Fresh seafood medley with saffron-infused rice, bell peppers, and garden peas',
      price: 32.99,
      image: 'https://images.unsplash.com/photo-1534080564583-6be75777b70a?q=80&w=800',
      category: 'Main Course',
      rating: 4.9,
      prepTime: '30 min',
      isSpicy: false,
      isPopular: true,
    },
    {
      id: '3',
      name: 'Truffle Mushroom Risotto',
      description: 'Creamy Arborio rice with wild mushrooms, truffle oil, and aged Parmesan',
      price: 28.99,
      image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?q=80&w=800',
      category: 'Main Course',
      rating: 4.7,
      prepTime: '25 min',
      isSpicy: false,
      isPopular: true,
    },
    {
      id: '4',
      name: 'Pan-Seared Chilean Sea Bass',
      description: 'Wild-caught sea bass with lemon butter sauce and seasonal vegetables',
      price: 36.99,
      image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=800',
      category: 'Seafood',
      rating: 4.9,
      prepTime: '25 min',
      isSpicy: false,
      isPopular: true,
    },
    {
      id: '5',
      name: 'Spicy Thai Curry Bowl',
      description: 'Aromatic coconut curry with fresh vegetables and jasmine rice',
      price: 22.99,
      image: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?q=80&w=800',
      category: 'Asian Fusion',
      rating: 4.6,
      prepTime: '20 min',
      isSpicy: true,
      isPopular: false,
    },
    {
      id: '6',
      name: 'Grilled Tomahawk Steak',
      description: '32oz premium cut with roasted garlic and herbs',
      price: 89.99,
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800',
      category: 'Signature Dishes',
      rating: 5.0,
      prepTime: '35 min',
      isSpicy: false,
      isPopular: true,
    }
  ];

  const { dispatch } = useCart();
  const [toast, setToast] = useState(null);

  // Handle adding item to cart with notification
  const handleAddToCart = (item) => {
    cartUtils.addItem(dispatch, item);
    setToast(item);

    // Auto-dismiss toast after 3 seconds
    setTimeout(() => {
      setToast(null);
    }, 5000);
  };

  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen">
      {/* Toast Notification */}
      {toast && (
        <Toast
          item={toast}
          onClose={() => setToast(null)}
        />
      )}
      <div className="mx-auto px-4 py-16 container">
        <div className="mb-12 text-center">
          <h1 className="mb-4 font-bold font-playfair text-4xl text-gray-800">
            Culinary Excellence
          </h1>
          <p className="mx-auto max-w-2xl font-lato text-gray-600 text-lg">
            Discover our carefully curated selection of signature dishes, crafted with the finest ingredients
          </p>
        </div>

        <div className="gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {menuItems.map((item) => (
            <div
              key={item.id}
              className="bg-white shadow-lg rounded-xl transform overflow-hidden hover:scale-105 transition-transform duration-300"
            >
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-64 object-cover"
                />
                {item.isPopular && (
                  <div className="top-4 right-4 absolute bg-red-500 px-3 py-1 rounded-full font-semibold text-sm text-white">
                    Popular
                  </div>
                )}
              </div>

              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-playfair font-semibold text-gray-800 text-xl">
                    {item.name}
                  </h3>
                  <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-lg">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="ml-1 font-medium text-gray-700 text-sm">
                      {item.rating}
                    </span>
                  </div>
                </div>

                <p className="mb-4 font-lato text-gray-600 text-sm leading-relaxed">
                  {item.description}
                </p>

                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center text-gray-500 text-sm">
                    <Clock className="mr-1 w-4 h-4" />
                    {item.prepTime}
                  </div>
                  {item.isSpicy && (
                    <div className="flex items-center text-red-500 text-sm">
                      <Flame className="mr-1 w-4 h-4" />
                      Spicy
                    </div>
                  )}
                </div>

                <div className="flex justify-between items-center border-gray-100 pt-4 border-t">
                  <span className="font-bold text-2xl text-gray-800">
                    ${item.price}
                  </span>
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="flex items-center bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-medium text-white transition-colors duration-300">
                    <Plus className="mr-2 w-4 h-4" />
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MenuItems;