'use client'
import React, { useState } from 'react';
import { Clock, DollarSign } from 'lucide-react';


 
const OrdersPage = () => {
  const [activeStatus, setActiveStatus] = useState('all');

  const orders = [
    {
      id: '1',
      customerName: 'John Doe',
      items: [
        { id: '1', name: 'Classic Burger', quantity: 2, price: 12.99 },
        { id: '2', name: 'French Fries', quantity: 1, price: 4.99 }
      ],
      total: 30.97,
      status: 'pending',
      time: '19:00',
      tableNumber: 5
    },
    // Add more orders here
  ];

  const statuses = ['all', 'pending', 'preparing', 'ready', 'completed'];

  return (
    <div className="mx-auto container">
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-bold text-2xl">Orders</h1>
      </div>

      {/* Status filters */}
      <div className="flex space-x-4 mb-6 pb-2 overflow-x-auto">
        {statuses.map((status) => (
          <button
            key={status}
            onClick={() => setActiveStatus(status)}
            className={`px-4 py-2 rounded-full capitalize ${
              activeStatus === status
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Orders Grid */}
      <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {orders
          .filter(order => activeStatus === 'all' || order.status === activeStatus)
          .map((order) => (
            <div key={order.id} className="bg-white shadow-sm rounded-lg">
              <div className="p-4 border-b">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold text-lg">Table {order.tableNumber}</h3>
                    <p className="text-gray-600">{order.customerName}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    order.status === 'completed'
                      ? 'bg-green-100 text-green-800'
                      : order.status === 'pending'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {order.status}
                  </span>
                </div>
                <div className="flex items-center text-gray-600 text-sm">
                  <Clock className="mr-2 w-4 h-4" />
                  {order.time}
                </div>
              </div>
              <div className="p-4">
                <div className="space-y-2 mb-4">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span>{item.quantity}x {item.name}</span>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between items-center pt-4 border-t">
                  <div className="flex items-center">
                    <DollarSign className="mr-1 w-4 h-4" />
                    <span className="font-semibold">{order.total.toFixed(2)}</span>
                  </div>
                  <div className="space-x-2">
                    <button className="bg-blue-600 px-4 py-2 rounded-lg text-sm text-white">
                      Update Status
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default OrdersPage;