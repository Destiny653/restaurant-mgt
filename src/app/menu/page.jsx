 'use client'
import React, { useState } from 'react';
import { ChefHat, Clock, Flame, Heart, Star, X } from 'lucide-react';
import { cartUtils, useCart } from '../../../Context/CartContext';
import Link from 'next/link';
import { menuItems } from '../components/array';

// Toast Component remains the same
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

// Menu Item Card Component
const MenuItemCard = ({ item, onAddToCart, isFavorite, onToggleFavorite }) => (
  <div className="group flex flex-col bg-white shadow-sm hover:shadow-md rounded-xl h-full transition-shadow overflow-hidden">
    <div className="relative">
      <img
        src={item.image}
        alt={item.name}
        className="group-hover:scale-105 w-full h-48 transform transition-transform duration-300 object-cover"
      />
      <button
        onClick={() => onToggleFavorite(item.id)}
        className="top-4 right-4 absolute bg-white shadow-md p-2 rounded-full hover:scale-110 transition-transform"
      >
        <Heart
          className={`w-5 h-5 ${
            isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'
          }`}
        />
      </button>
      {item.isNew && (
        <span className="top-4 left-4 absolute bg-yellow-500 px-3 py-1 rounded-full font-semibold text-sm text-white">
          New
        </span>
      )}
    </div>

    <div className="flex flex-col flex-grow p-6">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold text-xl">{item.name}</h3>
        <span className="font-semibold text-yellow-600">
          ${item.price.toFixed(2)}
        </span>
      </div>

      <p className="flex-grow mb-4 text-gray-600 text-sm">
        {item.description}
      </p>

      <div className="mt-auto">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-gray-500 text-sm">
              <Clock className="mr-1 w-4 h-4" />
              {item.prepTime}
            </div>
            <div className="flex items-center text-gray-500 text-sm">
              <Star className="mr-1 w-4 h-4 text-yellow-400" />
              {item.rating}
            </div>
          </div>

          {item.spicyLevel && (
            <div className="flex items-center text-gray-500 text-sm">
              <Flame className={`w-4 h-4 mr-1 ${
                item.spicyLevel === 'hot' ? 'text-red-500' :
                item.spicyLevel === 'medium' ? 'text-orange-500' :
                'text-yellow-500'
              }`} />
              {item.spicyLevel}
            </div>
          )}
        </div>

        <button
          onClick={() => onAddToCart(item)}
          className="bg-yellow-500 hover:bg-yellow-600 py-2 rounded-lg w-full text-white transition-colors"
        >
          Add to Cart
        </button>
      </div>
    </div>
  </div>
);

const MenuPage = () => {
  const { dispatch } = useCart();
  const [selectedCategory, setSelectedCategory] = useState('main-courses');
  const [selectedDietary, setSelectedDietary] = useState('all');
  const [sortBy, setSortBy] = useState('recommended');
  const [favorites, setFavorites] = useState([]);
  const [toast, setToast] = useState(null);

  const handleAddToCart = (item) => {
    cartUtils.addItem(dispatch, item);
    setToast(item);
    setTimeout(() => setToast(null), 5000);
  };

  const toggleFavorite = (itemId) => {
    setFavorites(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const categoryItems = menuItems[selectedCategory] || [];
  const filteredItems = categoryItems.filter(item => {
    if (selectedDietary === 'all') return true;
    return item.dietary.includes(selectedDietary);
  });

  const sortedItems = [...filteredItems].sort((a, b) => {
    switch (sortBy) {
      case 'price-low': return a.price - b.price;
      case 'price-high': return b.price - a.price;
      case 'rating': return b.rating - a.rating;
      default: return 0;
    }
  });

  return (
    <div className="bg-gray-50 min-h-screen">
      {toast && <Toast item={toast} onClose={() => setToast(null)} />}

      <div className="mx-auto px-4 py-24 container">
        {/* Header Section */}
        <div className="mb-8 text-center">
          <h1 className="mb-4 font-bold font-playfair text-4xl">Our Menu</h1>
          <p className="mx-auto max-w-2xl text-gray-600">
            Discover our carefully curated selection of dishes, prepared with the finest ingredients
          </p>
        </div>

        {/* Filters Section */}
        <div className="bg-white shadow-sm mb-8 p-4 rounded-xl">
          <div className="flex sm:flex-row flex-col justify-between gap-4">
            <div className="flex sm:flex-row flex-col gap-4">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border-gray-300 bg-white px-3 py-2 border focus:border-transparent rounded-lg focus:ring-2 focus:ring-yellow-500 w-full sm:w-[180px]"
              >
                <option value="main-courses">Main Courses</option>
                <option value="appetizers">Appetizers</option>
                <option value="desserts">Desserts</option>
                <option value="drinks">Drinks</option>
              </select>

              <select
                value={selectedDietary}
                onChange={(e) => setSelectedDietary(e.target.value)}
                className="border-gray-300 bg-white px-3 py-2 border focus:border-transparent rounded-lg focus:ring-2 focus:ring-yellow-500 w-full sm:w-[180px]"
              >
                <option value="all">All Dietary Options</option>
                <option value="vegetarian">Vegetarian</option>
                <option value="vegan">Vegan</option>
                <option value="gluten-free">Gluten Free</option>
              </select>
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border-gray-300 bg-white px-3 py-2 border focus:border-transparent rounded-lg focus:ring-2 focus:ring-yellow-500 w-full sm:w-[180px]"
            >
              <option value="recommended">Recommended</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Menu Grid */}
        <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-12">
          {sortedItems.map((item) => (
            <MenuItemCard
              key={item.id}
              item={item}
              onAddToCart={handleAddToCart}
              isFavorite={favorites.includes(item.id)}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MenuPage;