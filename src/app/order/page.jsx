'use client'
import React, { useState } from 'react';
import { 
  Search, 
  MapPin,
  User,
  Coffee,
  CheckCircle2,
  XCircle,
  Clock,
  Filter,
  ChevronRight,
  DollarSign,
  AlertCircle
} from 'lucide-react';

// Sample data
const sampleOrders = [
  {
    _id: '1',
    customer: {
      _id: 'u1',
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+1 234-567-8900'
    },
    items: [
      {
        menuItem: {
          _id: 'm1',
          name: 'Cappuccino',
          category: 'Beverages'
        },
        quantity: 2,
        price: 4.50,
        specialInstructions: 'Extra hot, no foam'
      },
      {
        menuItem: {
          _id: 'm2',
          name: 'Croissant',
          category: 'Pastries'
        },
        quantity: 1,
        price: 3.50,
        specialInstructions: 'Warmed up please'
      }
    ],
    totalAmount: 12.50,
    status: 'preparing',
    orderType: 'dine-in',
    createdAt: '2025-02-06T09:30:00Z'
  },
  {
    _id: '2',
    customer: {
      _id: 'u2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '+1 234-567-8901'
    },
    items: [
      {
        menuItem: {
          _id: 'm3',
          name: 'Chicken Sandwich',
          category: 'Food'
        },
        quantity: 1,
        price: 8.99,
        specialInstructions: 'No mayo'
      }
    ],
    totalAmount: 8.99,
    status: 'pending',
    orderType: 'delivery',
    createdAt: '2025-02-06T09:45:00Z'
  }
];

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  confirmed: 'bg-blue-100 text-blue-800',
  preparing: 'bg-purple-100 text-purple-800',
  ready: 'bg-green-100 text-green-800',
  delivered: 'bg-gray-100 text-gray-800',
  cancelled: 'bg-red-100 text-red-800'
};

const orderTypeIcons = {
  'dine-in': <Coffee className="w-4 h-4" />,
  'takeaway': <CheckCircle2 className="w-4 h-4" />,
  'delivery': <MapPin className="w-4 h-4" />
};

// Order Card Component
const OrderCard = ({ order, onClick }) => {
  const formattedDate = new Date(order.createdAt).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div 
      onClick={onClick}
      className="border-gray-200 bg-white shadow-sm hover:shadow-md p-4 border rounded-lg transition-shadow cursor-pointer"
    >
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-medium text-gray-900">Order #{order._id}</h3>
          <p className="text-gray-500 text-sm">{formattedDate}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[order.status]}`}>
          {order.status}
        </span>
      </div>

      <div className="flex items-center gap-4 mb-3">
        <div className="flex items-center text-gray-600">
          <User className="mr-1 w-4 h-4" />
          <span className="text-sm">{order.customer.name}</span>
        </div>
        <div className="flex items-center text-gray-600">
          {orderTypeIcons[order.orderType]}
          <span className="ml-1 text-sm capitalize">{order.orderType}</span>
        </div>
      </div>

      <div className="space-y-2">
        {order.items.map((item, index) => (
          <div key={index} className="flex justify-between text-sm">
            <span className="text-gray-600">
              {item.quantity}x {item.menuItem.name}
            </span>
            <span className="font-medium text-gray-900">
              ${(item.price * item.quantity).toFixed(2)}
            </span>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center border-gray-100 mt-3 pt-3 border-t">
        <span className="font-medium text-gray-900 text-sm">
          Total Amount
        </span>
        <span className="font-semibold text-blue-600 text-lg">
          ${order.totalAmount.toFixed(2)}
        </span>
      </div>
    </div>
  );
};

// Update Order Form Component
const UpdateOrderForm = ({ order, onUpdate, onCancel }) => {
  const [status, setStatus] = useState(order.status);
  const [customerName, setCustomerName] = useState(order.customer.name);
  const [customerPhone, setCustomerPhone] = useState(order.customer.phone);
  const [customerEmail, setCustomerEmail] = useState(order.customer.email);
  const [items, setItems] = useState(order.items);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedOrder = {
      ...order,
      status,
      customer: {
        ...order.customer,
        name: customerName,
        phone: customerPhone,
        email: customerEmail
      },
      items,
      totalAmount: items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    };
    onUpdate(updatedOrder);
  };

  const handleItemUpdate = (index, field, value) => {
    const updatedItems = [...items];
    if (field === 'quantity') {
      value = Math.max(1, parseInt(value) || 1);
    }
    if (field === 'price') {
      value = Math.max(0, parseFloat(value) || 0);
    }
    updatedItems[index] = { 
      ...updatedItems[index], 
      [field]: value 
    };
    setItems(updatedItems);
  };

  return (
    <div className="flex flex-col bg-white shadow-lg rounded-lg w-full max-w-2xl max-h-[90vh] overflow-hidden">
      <div className="border-gray-200 p-6 border-b">
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-gray-900 text-xl">Update Order #{order._id}</h2>
          <button onClick={onCancel} className="text-gray-400 hover:text-gray-500">
            <XCircle className="w-6 h-6" />
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
        <div className="space-y-6 p-6">
          {/* Status Update */}
          <div>
            <label className="block mb-2 font-medium text-gray-700 text-sm">
              Order Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="border-gray-300 px-3 py-2 border focus:border-transparent rounded-lg focus:ring-2 focus:ring-blue-500 w-full"
            >
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="preparing">Preparing</option>
              <option value="ready">Ready</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          {/* Customer Information */}
          <div>
            <h3 className="mb-4 font-medium text-gray-700 text-sm">Customer Information</h3>
            <div className="gap-4 grid grid-cols-1 sm:grid-cols-2">
              <div>
                <label className="block mb-1 text-gray-600 text-sm">Name</label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="border-gray-300 px-3 py-2 border focus:border-transparent rounded-lg focus:ring-2 focus:ring-blue-500 w-full"
                />
              </div>
              <div>
                <label className="block mb-1 text-gray-600 text-sm">Phone</label>
                <input
                  type="text"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="border-gray-300 px-3 py-2 border focus:border-transparent rounded-lg focus:ring-2 focus:ring-blue-500 w-full"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block mb-1 text-gray-600 text-sm">Email</label>
                <input
                  type="email"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  className="border-gray-300 px-3 py-2 border focus:border-transparent rounded-lg focus:ring-2 focus:ring-blue-500 w-full"
                />
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div>
            <h3 className="mb-4 font-medium text-gray-700 text-sm">Order Items</h3>
            <div className="space-y-4">
              {items.map((item, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg">
                  <div className="mb-3 font-medium text-gray-900">
                    {item.menuItem.name}
                  </div>
                  <div className="gap-4 grid grid-cols-2">
                    <div>
                      <label className="block mb-1 text-gray-600 text-sm">Quantity</label>
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => handleItemUpdate(index, 'quantity', e.target.value)}
                        className="border-gray-300 px-3 py-2 border focus:border-transparent rounded-lg focus:ring-2 focus:ring-blue-500 w-full"
                      />
                    </div>
                    <div>
                      <label className="block mb-1 text-gray-600 text-sm">Price</label>
                      <input
                        type="number"
                        step="0.01"
                        value={item.price}
                        onChange={(e) => handleItemUpdate(index, 'price', e.target.value)}
                        className="border-gray-300 px-3 py-2 border focus:border-transparent rounded-lg focus:ring-2 focus:ring-blue-500 w-full"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block mb-1 text-gray-600 text-sm">Special Instructions</label>
                      <input
                        type="text"
                        value={item.specialInstructions || ''}
                        onChange={(e) => handleItemUpdate(index, 'specialInstructions', e.target.value)}
                        className="border-gray-300 px-3 py-2 border focus:border-transparent rounded-lg focus:ring-2 focus:ring-blue-500 w-full"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="border-gray-200 p-6 border-t">
          <div className="flex gap-3">
            <button
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-white transition-colors"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 border-gray-300 hover:bg-gray-50 px-4 py-2 border rounded-lg text-gray-700 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

// Order Details Component
const OrderDetails = ({ order, onClose, onEdit }) => {
  const statusSteps = ['pending', 'confirmed', 'preparing', 'ready', 'delivered'];
  const currentStep = statusSteps.indexOf(order.status);

  return (
    <div className="flex flex-col bg-white shadow-lg rounded-lg w-full max-w-2xl max-h-[90vh] overflow-hidden">
      {/* Header */}
      <div className="border-gray-200 p-6 border-b">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="font-bold text-2xl text-gray-900">Order Details</h2>
            <p className="text-gray-500 text-sm">Order #{order._id}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <XCircle className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="space-y-6 p-6">
          {/* Progress Tracker */}
          <div>
            <div className="flex justify-between mb-2">
              {statusSteps.map((step, index) => (
                <div
                  key={step}
                  className={`flex flex-col items-center ${
                    index <= currentStep ? 'text-blue-600' : 'text-gray-400'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    index <= currentStep ? 'bg-blue-100' : 'bg-gray-100'
                  }`}>
                    {index < currentStep ? (
                      <CheckCircle2 className="w-5 h-5" />
                    ) : (
                      <div className="bg-current rounded-full w-3 h-3" />
                    )}
                  </div>
                  <span className="mt-1 text-xs capitalize">{step}</span>
                </div>
              ))}
            </div>
            <div className="relative bg-gray-100 rounded-full h-2">
              <div
                className="absolute bg-blue-500 rounded-full h-full transition-all duration-500"
                style={{ width: `${(currentStep / (statusSteps.length - 1)) * 100}%` }}
              />
            </div>
          </div>

          {/* Customer Information */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="mb-3 font-medium text-gray-900 text-sm">Customer Information</h3>
            <div className="gap-4 grid grid-cols-2">
              <div>
                <p className="text-gray-600 text-sm">Name</p>
                <p className="font-medium">{order.customer.name}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Phone</p>
                <p className="font-medium">{order.customer.phone}</p>
              </div>
              <div className="col-span-2">
                <p className="text-gray-600 text-sm">Email</p>
                <p className="font-medium">{order.customer.email}</p>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div>
            <h3 className="mb-3 font-medium text-gray-900 text-sm">Order Items</h3>
            <div className="space-y-3">
              {order.items.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-start bg-gray-50 p-3 rounded-lg"
                >
                  <div>
                    <div className="flex items-center">
                      <span className="font-medium">{item.menuItem.name}</span>
                      <span className="ml-2 text-gray-500 text-sm">x{item.quantity}</span>
                    </div>
                    {item.specialInstructions && (
                      <p className="mt-1 text-gray-500 text-sm">
                        Note: {item.specialInstructions}
                      </p>
                    )}
                  </div>
                  <span className="font-medium">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="border-gray-200 pt-4 border-t">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium">${order.totalAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-600">Tax</span>
              <span className="font-medium">${(order.totalAmount * 0.1).toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center font-semibold text-lg">
              <span>Total</span>
              <span className="text-blue-600">${(order.totalAmount * 1.1).toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-gray-200 p-6 border-t">
        {order.status !== 'delivered' && order.status !== 'cancelled' && (
          <div className="flex gap-3">
            <button
              onClick={onEdit}
              className="flex-1 bg-blue-600 hover:bg-blue-700 py-2 rounded-lg text-white transition-colors"
            >
              Edit Order
            </button>
            <button className="flex-1 border-gray-300 hover:bg-gray-50 py-2 border rounded-lg text-gray-700 transition-colors">
              Cancel Order
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// Main Order Management Component
const OrderManagement = () => {
  const [orders, setOrders] = useState(sampleOrders);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [orderTypeFilter, setOrderTypeFilter] = useState('all');

  const handleUpdateOrder = (updatedOrder) => {
    setOrders(orders.map(order => 
      order._id === updatedOrder._id ? updatedOrder : order
    ));
    setIsEditing(false);
    setSelectedOrder(null);
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        order._id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    const matchesType = orderTypeFilter === 'all' || order.orderType === orderTypeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 py-4 max-w-7xl">
          <div className="flex sm:flex-row flex-col sm:justify-between sm:items-center gap-4">
            <div>
              <h1 className="font-bold text-2xl text-gray-900">Orders</h1>
              <p className="text-gray-500 text-sm">Manage and track customer orders</p>
            </div>
            
            <div className="flex sm:flex-row flex-col gap-3">
              <div className="relative">
                <Search className="top-1/2 left-3 absolute w-5 h-5 text-gray-400 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search orders..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="py-2 pr-4 pl-10 border focus:border-transparent rounded-lg focus:ring-2 focus:ring-blue-500 w-full sm:w-64"
                />
              </div>
              
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border focus:border-transparent rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="preparing">Preparing</option>
                <option value="ready">Ready</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>

              <select
                value={orderTypeFilter}
                onChange={(e) => setOrderTypeFilter(e.target.value)}
                className="px-3 py-2 border focus:border-transparent rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Types</option>
                <option value="dine-in">Dine-in</option>
                <option value="takeaway">Takeaway</option>
                <option value="delivery">Delivery</option>
              </select>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-7xl">
        <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {filteredOrders.map(order => (
            <OrderCard
              key={order._id}
              order={order}
              onClick={() => setSelectedOrder(order)}
            />
          ))}
        </div>

        {/* Modal */}
        {(selectedOrder || isEditing) && (
          <div className="z-50 fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 p-4">
            {isEditing ? (
              <UpdateOrderForm
                order={selectedOrder}
                onUpdate={handleUpdateOrder}
                onCancel={() => setIsEditing(false)}
              />
            ) : (
              <OrderDetails
                order={selectedOrder}
                onClose={() => setSelectedOrder(null)}
                onEdit={() => setIsEditing(true)}
              />
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default OrderManagement;