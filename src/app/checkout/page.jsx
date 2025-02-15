'use client'
import React, { useState } from 'react';
import { cartUtils, useCart } from '../../../Context/CartContext';
import {
  ArrowLeft,
  CreditCard,
  Lock,
  Clock,
  Shield,
  Truck,
  CheckCircle2
} from 'lucide-react';
import Link from 'next/link';
import { localUrl } from '../components/Url';

const PaymentMethodCard = ({ method, selected, onSelect }) => (
  <div
    onClick={() => onSelect(method.id)}
    className={`cursor-pointer p-4 rounded-lg border-2 transition-all ${selected === method.id
      ? 'border-blue-600 bg-blue-50'
      : 'border-gray-200 hover:border-blue-200'
      }`}
  >
    <div className="flex items-center space-x-3">
      <div className="relative w-5 h-5">
        <div className="absolute inset-0 border-2 border-current rounded-full transition-colors duration-200"
          style={{ color: selected === method.id ? '#2563eb' : '#d1d5db' }}
        />
        {selected === method.id && (
          <div className="absolute inset-1 bg-blue-600 rounded-full" />
        )}
      </div>
      <div className="flex items-center space-x-3">
        <img src={method.icon} alt={method.name} className="w-8 h-8 object-contain" />
        <span className="font-medium">{method.name}</span>
      </div>
    </div>
  </div>
);

const FormInput = ({ label, type = "text", placeholder, name, value, onChange, error, required }) => (
  <div className="space-y-1">
    <label className="block font-medium text-gray-700 text-sm">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full px-4 py-2 rounded-lg border ${error
        ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
        : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
        } focus:ring-2 focus:outline-none transition-colors`}
    />
    {error && <p className="text-red-600 text-sm">{error}</p>}
  </div>
);

const OrderSummaryItem = ({ item }) => (
  <div className="flex justify-between py-3">
    <div className="flex space-x-4">
      <img
        src={item.image}
        alt={item.name}
        className="rounded-lg w-16 h-16 object-cover"
      />
      <div>
        <h4 className="font-medium text-gray-900">{item.name}</h4>
        <p className="text-gray-500 text-sm">Qty: {item.quantity}</p>
      </div>
    </div>
    <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
  </div>
);

const CheckoutSteps = ({ currentStep }) => {
  const steps = ['Cart', 'Details', 'Payment', 'Confirmation'];

  return (
    <div className="hidden md:flex justify-center items-center mb-8">
      {steps.map((step, index) => (
        <React.Fragment key={step}>
          <div className="flex items-center">
            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${index <= currentStep ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
              {index < currentStep ? (
                <CheckCircle2 className="w-5 h-5" />
              ) : (
                <span>{index + 1}</span>
              )}
            </div>
            <span className={`ml-2 text-sm font-medium 
            ${index <= currentStep ? 'text-gray-900' : 'text-gray-500'}`}
            >
              {step}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div className={`w-24 h-0.5 mx-2 ${index < currentStep ? 'bg-blue-600' : 'bg-gray-200'}`} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default function Checkout() {
  const { state, dispatch } = useCart();
  const [currentStep, setCurrentStep] = useState(2); // For demo, showing payment step

  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '', 
    postalCode: '',
    phone: '',
    role: '',
    userEmail:'',
    items: []
  });

  const [selectedPayment, setSelectedPayment] = useState('card');

  const paymentMethods = [
    { id: 'card', name: 'Credit Card', icon: '/credit-card-icon.png' },
    { id: 'paypal', name: 'PayPal', icon: '/paypal-icon.png' },
    { id: 'apple', name: 'Apple Pay', icon: '/apple-pay-icon.png' },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const subtotal = state.total;
  const tax = subtotal * 0.1;
  const shipping = 0;
  const total = subtotal + tax + shipping;

  const handleSubmit = async (e, req, res) => {
    e.preventDefault()
    formData.role = localStorage.getItem('role')
    formData.userEmail = localStorage.getItem('userEmail')
    formData.items = state.items
    try {
      res = await fetch(`${localUrl}/api/order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${localStorage.getItem('token')}` // Replace with your authentication token
        },
        body: JSON.stringify(formData)
      }),
        req = await res.json()
      if (!res.ok) {
        alert("Order error: " + req.message)
        return;
      }
      alert("Order created successfully")
      cartUtils.clearCart(dispatch)
      setFormData({
        email: '',
        firstName: '',
        lastName: '',
        address: '',
        city: '', 
        postalCode: '',
        phone: '',
        role: '',
        userEmail:'',
      })
      setCurrentStep(3) 
      return;
    } catch (error) {
      alert("Error: " + error.message)
      return;
    }
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link
                href="/cart"
                className="hover:bg-gray-100 p-2 rounded-full text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-6 h-6" />
              </Link>
              <h1 className="ml-4 font-bold text-2xl">Checkout</h1>
            </div>
            <div className="flex items-center text-gray-600">
              <Lock className="mr-2 w-5 h-5" />
              <span className="text-sm">Secure Checkout</span>
            </div>
          </div>
        </div>
      </header>
      <form onSubmit={handleSubmit} className="mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-7xl">
        <main className="mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-7xl">
          <CheckoutSteps currentStep={currentStep} />

          <div className="gap-8 grid grid-cols-1 lg:grid-cols-3">
            {/* Main Content */}
            <div className="space-y-8 lg:col-span-2">
              {/* Shipping Information */}
              <div className="bg-white shadow-sm p-6 rounded-xl">
                <h2 className="mb-6 font-bold text-xl">Shipping Information</h2>
                <div className="gap-6 grid grid-cols-1 md:grid-cols-2">
                  <FormInput
                    label="Email"
                    name={'email'}
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange(e)}
                    required
                  />
                  <FormInput
                    label="Phone"
                    name={'phone'}
                    type="tel"
                    placeholder="(123) 456-7890"
                    value={formData.phone}
                    onChange={(e) => handleInputChange(e)}
                    required
                  />
                  <FormInput
                    label="First Name"
                    name={'firstName'}
                    placeholder="John"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange(e)}
                    required
                  />
                  <FormInput
                    label="Last Name"
                    name={'lastName'}
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange(e)}
                    required
                  />
                  <div className="md:col-span-2">
                    <FormInput
                      label="Address"
                      name={'address'}
                      placeholder="123 Main St"
                      value={formData.address}
                      onChange={(e) => handleInputChange(e)}
                      required
                    />
                  </div>
                  <FormInput
                    label="City"
                    name={'city'}
                    placeholder="New York"
                    value={formData.city}
                    onChange={(e) => handleInputChange(e)}
                    required
                  />
                  <FormInput
                    label="Postal Code"
                    name={'postalCode'}
                    placeholder="10001"
                    value={formData.postalCode}
                    onChange={(e) => handleInputChange(e)}
                    required
                  />
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white shadow-sm p-6 rounded-xl">
                <h2 className="mb-6 font-bold text-xl">Payment Method</h2>
                <div className="space-y-4">
                  {paymentMethods.map(method => (
                    <PaymentMethodCard
                      key={method.id}
                      method={method}
                      selected={selectedPayment}
                      onSelect={setSelectedPayment}
                    />
                  ))}
                </div>

                {selectedPayment === 'card' && (
                  <div className="space-y-6 mt-6">
                    <FormInput
                      label="Card Number"
                      placeholder="1234 5678 9012 3456"
                      type="text"
                      required
                    />
                    <div className="gap-6 grid grid-cols-2">
                      <FormInput
                        label="Expiry Date"
                        placeholder="MM/YY"
                        type="text"
                        required
                      />
                      <FormInput
                        label="CVV"
                        placeholder="123"
                        type="text"
                        required
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="top-24 sticky bg-white shadow-sm p-6 rounded-xl">
                <h2 className="mb-6 font-bold text-xl">Order Summary</h2>

                <div className="mb-6 max-h-64 overflow-y-auto">
                  {state.items.map(item => (
                    <OrderSummaryItem key={item.id} item={item} />
                  ))}
                </div>

                <div className="space-y-3 pt-4 border-t">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className="text-green-600">Free</span>
                  </div>
                  <div className="pt-4 border-t">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-lg">Total</span>
                      <span className="font-bold text-blue-600 text-2xl">
                        ${total.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                <button 
                  type='submit'
                  className="bg-blue-600 hover:bg-blue-700 mt-6 px-6 py-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 w-full font-medium text-white transition-colors"
                  onClick={() => { alert('Processing payment...'); }}
                >
                  Place Order
                </button>

                <div className="space-y-4 mt-6">
                  <div className="flex items-center text-gray-600 text-sm">
                    <Shield className="mr-2 w-4 h-4" />
                    Secure SSL Encryption
                  </div>
                  <div className="flex items-center text-gray-600 text-sm">
                    <Clock className="mr-2 w-4 h-4" />
                    Delivery within 2-4 business days
                  </div>
                  <div className="flex items-center text-gray-600 text-sm">
                    <Truck className="mr-2 w-4 h-4" />
                    Free shipping on all orders
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </form>
    </div>
  );
}