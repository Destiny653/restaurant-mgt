'use client'
import React from 'react';
import { cartUtils, useCart } from '../../../Context/CartContext';
import { Minus, Plus, Trash2, ShoppingCart, ArrowLeft, Package, Truck } from 'lucide-react';
import Link from 'next/link';

const CartItem = ({ item, index, isLast, dispatch }) => (
  <div className="group">
    <div className="flex sm:flex-row flex-col gap-4 sm:gap-6">
      <div className="flex-shrink-0 w-full sm:w-32 h-48 sm:h-32">
        <img
          src={item?.image}
          alt={item?.name}
          className="rounded-lg w-full h-full object-cover"
        />
      </div>

      <div className="flex-1">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium text-gray-900 text-lg">{item?.name}</h3>
            <p className="mt-1 text-gray-500 text-sm">Item #: {item?.id}</p>
          </div>
          <button
            onClick={() => cartUtils.removeItem(dispatch, item?.id)}
            className="hover:bg-red-50 p-2 rounded-full text-gray-400 hover:text-red-500 transition-all duration-200"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>

        <p className="mt-2 font-semibold text-blue-600 text-lg">
          ${item?.price.toFixed(2)}
        </p>

        <div className="flex sm:flex-row flex-col sm:justify-between sm:items-center gap-4 mt-4">
          <div className="flex items-center bg-gray-50 shadow-sm border rounded-lg">
            <button
              onClick={() => cartUtils.updateQuantity(dispatch, item?.id, Math.max(0, item?.quantity - 1))}
              className="hover:bg-gray-100 disabled:opacity-50 p-3 rounded-l-lg transition-colors"
              disabled={item.quantity <= 1}
            >
              <Minus className="w-4 h-4" />
            </button>

            <span className="w-16 font-medium text-center">
              {item.quantity}
            </span>

            <button
              onClick={() => cartUtils.updateQuantity(dispatch, item?.id, item?.quantity + 1)}
              className="hover:bg-gray-100 p-3 rounded-r-lg transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          <p className="font-medium text-gray-600">
            Subtotal: <span className="text-gray-900">${(item.price * item.quantity).toFixed(2)}</span>
          </p>
        </div>
      </div>
    </div>
    {!isLast && <div className="my-6 border-b"></div>}
  </div>
);

const OrderSummary = ({ items, total, onCheckout }) => (
  <div className="lg:col-span-1">
    <div className="top-24 sticky bg-white shadow-sm rounded-xl overflow-hidden">
      <div className="space-y-6 p-6">
        <h2 className="font-bold text-xl">Order Summary</h2>

        <div className="space-y-4">
          <div className="flex justify-between text-gray-600">
            <span>Subtotal ({items.reduce((acc, item) => acc + item.quantity, 0)} items)</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Shipping</span>
            <span className="text-green-600">Free</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Tax</span>
            <span>${(total * 0.1).toFixed(2)}</span>
          </div>
        </div>

        <div className="pt-4 border-t">
          <div className="flex justify-between items-center">
            <span className="font-bold text-lg">Total</span>
            <div className="text-right">
              <span className="font-bold text-2xl text-blue-600">
                ${(total * 1.1).toFixed(2)}
              </span>
              <p className="text-gray-500 text-sm">including VAT</p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4 bg-gray-50 p-6">
        <div className="space-y-3">
          <div className="flex items-center text-gray-600 text-sm">
            <Truck className="mr-2 w-4 h-4" />
            Free shipping on all orders
          </div>
          <div className="flex items-center text-gray-600 text-sm">
            <Package className="mr-2 w-4 h-4" />
            Delivery within 2-4 business days
          </div>
        </div>
        <Link href={'/checkout'}>
          <button
            className="flex justify-center items-center bg-blue-600 hover:bg-blue-700 py-2 rounded-lg w-full font-medium text-lg text-white transition-colors"
            onClick={onCheckout}
          >
            Proceed to Checkout
          </button>
        </Link>

        <Link
          href="/menu"
          className="block py-2 font-medium text-blue-600 text-center hover:text-blue-700"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  </div>
);

const EmptyCart = () => (
  <div className="flex flex-col justify-center items-center space-y-6 bg-white shadow-sm p-8 rounded-xl h-[60vh]">
    <div className="relative">
      <div className="absolute -inset-1 bg-blue-50 rounded-full animate-pulse"></div>
      <ShoppingCart className="relative w-20 h-20 text-blue-600" />
    </div>
    <div className="text-center">
      <p className="mb-2 font-medium text-gray-800 text-xl">Your cart is empty</p>
      <p className="text-gray-500">Add some delicious items to start your order</p>
    </div>
    <Link
      href="/"
      className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-lg font-medium text-lg text-white transition-colors"
    >
      Browse Menu
    </Link>
  </div>
);

export default function Cart() {
  const { state, dispatch } = useCart();

  const handleCheckout = () => {
    alert('Proceeding to checkout...');
  };

  return (
    <div className="flex flex-col bg-gray-50 min-h-screen">
      {/* Sticky Header */}
      <header className="top-0 z-50 sticky bg-white shadow-sm">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link
                href="/"
                className="hover:bg-gray-100 p-2 rounded-full text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-6 h-6" />
              </Link>
              <h1 className="font-bold text-2xl">Shopping Cart</h1>
            </div>
            {state.items.length > 0 && (
              <button
                onClick={() => cartUtils.clearCart(dispatch)}
                className="hover:bg-red-50 px-4 py-2 rounded-lg font-medium text-red-500 text-sm hover:text-red-600 transition-colors"
              >
                Clear Cart
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="flex-grow mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full max-w-7xl">
        {state.items.length === 0 ? (
          <EmptyCart />
        ) : (
          <div className="gap-8 grid grid-cols-1 lg:grid-cols-3">
            {/* Cart Items Section */}
            <div className="space-y-6 lg:col-span-2">
              <div className="bg-white shadow-sm p-6 rounded-xl">
                <div className="space-y-6">
                  {state.items.map((item, index) => (
                    <CartItem
                      key={item.id}
                      item={item}
                      index={index}
                      isLast={index === state.items.length - 1}
                      dispatch={dispatch}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Order Summary Section */}
            <OrderSummary
              items={state.items}
              total={state.total}
              onCheckout={handleCheckout}
            />
          </div>
        )}
      </main>
    </div>
  );
}