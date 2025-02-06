'use client'
import React, { useState } from 'react';
import { Calendar, Clock, Users, Plus } from 'lucide-react';
 
const ReservationsPage = () => {
  const [activeTab, setActiveTab] = useState('upcoming');

  const reservations = [
    {
      id: '1',
      customerName: 'John Doe',
      date: '2025-02-04',
      time: '19:00',
      guests: 4,
      status: 'confirmed',
      tableNumber: 5
    },
    // Add more reservations here
  ];

  return (
    <div className="mx-auto container">
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-bold text-2xl">Reservations</h1>
        <button className="flex items-center bg-blue-600 px-4 py-2 rounded-lg text-white">
          <Plus className="mr-2 w-5 h-5" />
          New Reservation
        </button>
      </div>

      {/* Tabs */}
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setActiveTab('upcoming')}
          className={`px-4 py-2 rounded-lg ${
            activeTab === 'upcoming'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700'
          }`}
        >
          Upcoming
        </button>
        <button
          onClick={() => setActiveTab('past')}
          className={`px-4 py-2 rounded-lg ${
            activeTab === 'past'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700'
          }`}
        >
          Past
        </button>
      </div>

      {/* Reservations List */}
      <div className="bg-white shadow-sm rounded-lg">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 font-medium text-gray-500 text-left text-xs uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 font-medium text-gray-500 text-left text-xs uppercase tracking-wider">
                  Date & Time
                </th>
                <th className="px-6 py-3 font-medium text-gray-500 text-left text-xs uppercase tracking-wider">
                  Guests
                </th>
                <th className="px-6 py-3 font-medium text-gray-500 text-left text-xs uppercase tracking-wider">
                  Table
                </th>
                <th className="px-6 py-3 font-medium text-gray-500 text-left text-xs uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 font-medium text-gray-500 text-left text-xs uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {reservations.map((reservation) => (
                <tr key={reservation.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900 text-sm">
                      {reservation.customerName}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-gray-900 text-sm">
                      <Calendar className="mr-2 w-4 h-4" />
                      {reservation.date}
                      <Clock className="mr-2 ml-4 w-4 h-4" />
                      {reservation.time}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-gray-900 text-sm">
                      <Users className="mr-2 w-4 h-4" />
                      {reservation.guests}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-gray-900 text-sm">
                      Table {reservation.tableNumber}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      reservation.status === 'confirmed'
                        ? 'bg-green-100 text-green-800'
                        : reservation.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {reservation.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm whitespace-nowrap">
                    <button className="mr-3 text-blue-600 hover:text-blue-900">
                      Edit
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReservationsPage;